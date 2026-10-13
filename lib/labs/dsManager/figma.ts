import { daysBetween, isActive } from './metrics';
import type { Database, FigmaMapping, PropMapping, SystemItem } from './types';

/*
 * Figma ↔ code health: classifies each mapped property, rolls that up per
 * component, and generates Code Connect files from the same mapping, so the
 * view and the file can never disagree.
 */

export type RowStatus = 'mapped' | 'value-gap' | 'figma-only' | 'code-only' | 'by-design';
export type ConnectStatus = 'connected' | 'issues' | 'not-connected';

export function rowStatus(r: PropMapping): RowStatus {
  if (r.intentional) return 'by-design';
  if (r.figmaProp && !r.codeProp) return 'figma-only';
  if (!r.figmaProp && r.codeProp) return 'code-only';
  if (r.values?.some(([, c]) => c === null)) return 'value-gap';
  return 'mapped';
}

export const ROW_LABEL: Record<RowStatus, string> = {
  mapped: 'Mapped',
  'value-gap': 'Value missing in code',
  'figma-only': 'Figma only',
  'code-only': 'Code only',
  'by-design': 'By design',
};

const isIssue = (s: RowStatus) => s === 'value-gap' || s === 'figma-only' || s === 'code-only';

export interface ComponentFigmaHealth {
  item: SystemItem;
  mapping?: FigmaMapping;
  status: ConnectStatus;
  mapped: number;
  issues: number;
  /** Library hasn't been re-synced since the component last changed in code. */
  stale: boolean;
}

export function figmaHealth(db: Database): ComponentFigmaHealth[] {
  const bySlug = new Map(db.figma.map((m) => [m.itemSlug, m]));
  return db.items
    .filter((i) => isActive(i) && i.kind !== 'pattern')
    .map((item) => {
      const mapping = bySlug.get(item.slug);
      if (!mapping) return { item, status: 'not-connected' as const, mapped: 0, issues: 0, stale: false };
      const statuses = mapping.props.map(rowStatus);
      const issues = statuses.filter(isIssue).length;
      return {
        item,
        mapping,
        status: issues ? ('issues' as const) : ('connected' as const),
        mapped: statuses.filter((s) => s === 'mapped' || s === 'by-design').length,
        issues,
        stale: daysBetween(mapping.lastSynced, item.updatedAt) > 14,
      };
    });
}

export function figmaSummary(db: Database) {
  const h = figmaHealth(db);
  const connected = h.filter((x) => x.status !== 'not-connected');
  const rows = connected.flatMap((x) => x.mapping!.props.map(rowStatus));
  const instances = connected.reduce((s, x) => s + x.mapping!.figmaInstances, 0);
  const detached = connected.reduce((s, x) => s + x.mapping!.figmaInstances * x.mapping!.detachRate, 0);
  return {
    total: h.length,
    connected: connected.length,
    clean: h.filter((x) => x.status === 'connected').length,
    issues: rows.filter(isIssue).length,
    propsMapped: rows.filter((s) => s === 'mapped' || s === 'by-design').length,
    propsTotal: rows.length,
    instances,
    detachRate: instances ? detached / instances : 0,
  };
}

// ── Code Connect generation ─────────────────────────────────────

const pascal = (s: string) => s.replace(/(^|[\s_-]+)(\w)/g, (_, __, c: string) => c.toUpperCase());
const camel = (s: string) => {
  const p = pascal(s);
  return p[0].toLowerCase() + p.slice(1);
};
const literal = (v: string) => (v === 'true' || v === 'false' || /^\d+$/.test(v) ? v : `'${v}'`);
const isPlainEnum = (vals: string[]) => vals.every((v) => !/^\d+$/.test(v) && v !== 'true' && v !== 'false');
/** Swift/Kotlin can't express an enum with mixed boolean/number/string cases. */
const mixed = (vals: string[]) => !isPlainEnum(vals) && !vals.every((v) => /^\d+$/.test(v)) && !vals.every((v) => v === 'true' || v === 'false');

export function figmaUrl(m: FigmaMapping) {
  return `https://www.figma.com/design/DDLS/Daedalus-Core?node-id=${m.nodeId.replace(':', '-')}`;
}

function connectable(m: FigmaMapping) {
  return m.props.filter((r) => r.figmaProp && r.codeProp && !r.intentional);
}

function skipped(m: FigmaMapping, comment: string) {
  const s = m.props.filter((r) => rowStatus(r) !== 'mapped' && rowStatus(r) !== 'by-design');
  return s.map((r) => {
    const st = rowStatus(r);
    if (st === 'value-gap') {
      const gaps = (r.values ?? []).filter(([, c]) => c === null).map(([f]) => `"${f}"`);
      return `${comment} Left out: Figma "${r.figmaProp}" value ${gaps.join(', ')} has no code equivalent`;
    }
    return `${comment} Not connected: ${r.figmaProp ? `Figma "${r.figmaProp}"` : `code \`${r.codeProp}\``} — ${ROW_LABEL[st].toLowerCase()}`;
  });
}

export function codeConnectReact(item: SystemItem, m: FigmaMapping): string {
  const name = pascal(item.name);
  const rows = connectable(m);
  const props = rows.map((r) => {
    const prop = r.codeProp!;
    if (r.figmaType === 'VARIANT') {
      const key = (f: string) => (/^[A-Za-z_]\w*$/.test(f) ? f : `'${f}'`);
      const pairs = (r.values ?? []).filter(([, c]) => c !== null).map(([f, c]) => `${key(f)}: ${literal(c!)}`);
      return `    ${prop}: figma.enum('${r.figmaProp}', { ${pairs.join(', ')} }),`;
    }
    const fn = r.figmaType === 'BOOLEAN' ? 'boolean' : r.figmaType === 'TEXT' ? 'string' : 'instance';
    return `    ${prop}: figma.${fn}('${r.figmaProp}'),`;
  });
  const child = rows.find((r) => r.codeProp === 'label' || r.codeProp === 'message');
  const attrs = rows.filter((r) => r !== child).map((r) => `${r.codeProp}={props.${r.codeProp}}`);
  const open = `<${name}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
  return [
    `// ${name}.figma.tsx — generated by Keystone from the ${m.nodeName} mapping.`,
    `// Review, then publish with: npx figma connect publish`,
    ...skipped(m, '//'),
    `import figma from '@figma/code-connect';`,
    `import { ${name} } from '@daedalus/react';`,
    '',
    `figma.connect(${name}, '${figmaUrl(m)}', {`,
    `  props: {`,
    ...props,
    `  },`,
    `  example: (props) => ${child ? `${open}>{props.${child.codeProp}}</${name}>` : `${open} />`},`,
    `});`,
    '',
  ].join('\n');
}

export function codeConnectSwift(item: SystemItem, m: FigmaMapping): string {
  const name = `M${pascal(item.name)}`;
  const rows = connectable(m);
  const fields: string[] = [];
  const args: string[] = [];
  for (const r of rows) {
    const key = camel(r.codeProp!);
    if (r.figmaType === 'VARIANT') {
      const vals = (r.values ?? []).filter(([, c]) => c !== null) as [string, string][];
      if (mixed(vals.map(([, c]) => c))) {
        fields.push(`    // "${r.figmaProp}" mixes boolean and named states — map by hand.`);
        continue;
      }
      const numeric = vals.every(([, c]) => /^\d+$/.test(c));
      const mapping = vals.map(([f, c]) => `"${f}": ${numeric ? c : `.${camel(c)}`}`).join(', ');
      fields.push(`    @FigmaEnum("${r.figmaProp}", mapping: [${mapping}])`, `    var ${key}: ${numeric ? 'Int' : `${name}${pascal(r.codeProp!)}`} = ${numeric ? vals[0][1] : `.${camel(vals[0][1])}`}`, '');
    } else if (r.figmaType === 'BOOLEAN') fields.push(`    @FigmaBoolean("${r.figmaProp}")`, `    var ${key}: Bool = false`, '');
    else if (r.figmaType === 'TEXT') fields.push(`    @FigmaString("${r.figmaProp}")`, `    var ${key}: String = "${r.figmaProp}"`, '');
    else fields.push(`    @FigmaInstance("${r.figmaProp}")`, `    var ${key}: AnyView? = nil`, '');
    args.push(key);
  }
  const label = args.find((a) => a === 'label' || a === 'message');
  const rest = args.filter((a) => a !== label).map((a) => `${a}: ${a}`);
  return [
    `// ${name}+Figma.swift — generated by Keystone. Review before publishing.`,
    ...skipped(m, '//'),
    'import Figma',
    'import DaedalusUI',
    'import SwiftUI',
    '',
    `struct ${name}_connection: FigmaConnect {`,
    `    let component = ${name}.self`,
    `    let figmaNodeUrl = "${figmaUrl(m)}"`,
    '',
    ...fields,
    `    var body: some View {`,
    `        ${name}(${[...(label ? [label] : []), ...rest].join(', ')})`,
    `    }`,
    `}`,
    '',
  ].join('\n');
}

export function codeConnectCompose(item: SystemItem, m: FigmaMapping): string {
  const name = `M${pascal(item.name)}`;
  const rows = connectable(m);
  const fields: string[] = [];
  const args: string[] = [];
  for (const r of rows) {
    const key = camel(r.codeProp!);
    if (r.figmaType === 'VARIANT') {
      const vals = (r.values ?? []).filter(([, c]) => c !== null) as [string, string][];
      if (mixed(vals.map(([, c]) => c))) {
        fields.push(`    // "${r.figmaProp}" mixes boolean and named states — map by hand.`);
        continue;
      }
      const numeric = vals.every(([, c]) => /^\d+$/.test(c));
      const type = numeric ? 'Int' : `${name}${pascal(r.codeProp!)}`;
      fields.push(`    @FigmaProperty(FigmaType.Enum, "${r.figmaProp}")`, `    val ${key}: ${type} = Figma.mapping(`, ...vals.map(([f, c]) => `        "${f}" to ${numeric ? c : `${type}.${pascal(c)}`},`), `    )`, '');
    } else if (r.figmaType === 'BOOLEAN') fields.push(`    @FigmaProperty(FigmaType.Boolean, "${r.figmaProp}")`, `    val ${key}: Boolean = false`, '');
    else if (r.figmaType === 'TEXT') fields.push(`    @FigmaProperty(FigmaType.Text, "${r.figmaProp}")`, `    val ${key}: String = "${r.figmaProp}"`, '');
    else fields.push(`    @FigmaProperty(FigmaType.Instance, "${r.figmaProp}")`, `    val ${key}: @Composable () -> Unit = {}`, '');
    args.push(key);
  }
  const call = args.map((a) => (a === 'label' || a === 'message' ? `text = ${a}` : `${a} = ${a}`));
  return [
    `// ${name}Doc.kt — generated by Keystone. Review before publishing.`,
    ...skipped(m, '//'),
    'import com.figma.code.connect.*',
    `import daedalus.compose.${name}`,
    '',
    `@FigmaConnect(url = "${figmaUrl(m)}")`,
    `class ${name}Doc {`,
    ...fields,
    `    @Composable`,
    `    fun ComponentExample() {`,
    `        ${name}(${call.join(', ')})`,
    `    }`,
    `}`,
    '',
  ].join('\n');
}
