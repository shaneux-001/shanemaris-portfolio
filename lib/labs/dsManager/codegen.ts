import type { Platform, SystemItem } from './types';

type Value = string | boolean | number;

const pascal = (s: string) => s.replace(/(^|[\s_-]+)(\w)/g, (_, __, c: string) => c.toUpperCase());
const camel = (s: string) => {
  const p = pascal(s);
  return p[0].toLowerCase() + p.slice(1);
};

interface Options {
  /** Prop rendered as children / the leading label argument. */
  childProp?: string;
  /** Component name in code, if it differs from the item's display name. */
  codeName?: string;
}

/**
 * Generates idiomatic usage for each platform from one set of prop values.
 * Only props that differ from their defaults are emitted, the way a
 * developer would actually write it.
 */
export function snippets(item: SystemItem, values: Record<string, Value>, defaults: Record<string, Value>, opts: Options = {}): Record<Platform, string> {
  const name = opts.codeName ?? pascal(item.name);
  const child = opts.childProp ? String(values[opts.childProp] ?? '') : '';
  const changed = Object.entries(values).filter(([k, v]) => k !== opts.childProp && v !== defaults[k] && v !== '' && v !== 'none');

  // React
  const jsxProps = changed.map(([k, v]) => (v === true ? k : typeof v === 'number' ? `${k}={${v}}` : v === false ? `${k}={false}` : `${k}="${v}"`));
  const open = `<${name}${jsxProps.length ? ' ' + jsxProps.join(' ') : ''}`;
  const web = `import { ${name} } from '@meridian/react';\n\n${child ? `${open}>${child}</${name}>` : `${open} />`}`;

  // SwiftUI
  const swiftArgs = [
    ...(child ? [`"${child}"`] : []),
    ...changed.map(([k, v]) => `${camel(k)}: ${typeof v === 'string' ? `.${camel(v)}` : v}`),
  ];
  const ios = `import MeridianUI\n\nM${name}(${swiftArgs.join(', ')})`;

  // Compose
  const ktArgs = [
    ...(child ? [`text = "${child}"`] : []),
    ...changed.map(([k, v]) => `${camel(k)} = ${typeof v === 'string' ? `M${name}${pascal(k)}.${pascal(v)}` : v}`),
  ];
  const android = `import meridian.compose.M${name}\n\nM${name}(${ktArgs.length > 2 ? '\n    ' + ktArgs.join(',\n    ') + '\n' : ktArgs.join(', ')})`;

  // Figma: variant properties as the instance panel shows them.
  const figmaProps = Object.entries(values)
    .filter(([k]) => k !== opts.childProp)
    .map(([k, v]) => `${pascal(k)}=${typeof v === 'string' ? pascal(v) : v}`);
  const figma = `Meridian / ${item.category} / ${item.name}\n${figmaProps.length ? figmaProps.join(', ') : 'Default'}${child ? `\nText: "${child}"` : ''}`;

  return { web, ios, android, figma };
}
