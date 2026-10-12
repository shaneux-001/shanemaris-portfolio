import type { FigmaMapping, FigmaPropType, PropMapping } from '../types';

/*
 * Figma ↔ code mappings (what Figma's Code Connect manages), plus library
 * usage from the last scan. The gaps are deliberate and consistent with the
 * rest of the seed: Figma still offers Text Field's removed floating label,
 * a Compact Card density code doesn't have (why admin teams detach Cards),
 * a "searchable" Select designers are mocking ahead of RM-111, and a Data
 * Table library that lags code.
 */

const v = (figmaProp: string, codeProp: string | undefined, values: [string, string | null][], extra: Partial<PropMapping> = {}): PropMapping => ({ figmaProp, figmaType: 'VARIANT', codeProp, values, ...extra });
const p = (figmaProp: string, figmaType: FigmaPropType, codeProp: string | undefined, extra: Partial<PropMapping> = {}): PropMapping => ({ figmaProp, figmaType, codeProp, ...extra });
const codeOnly = (codeProp: string, note: string, intentional = false): PropMapping => ({ codeProp, note, intentional });

let node = 100;
function map(itemSlug: string, category: string, name: string, props: PropMapping[], figmaInstances: number, detachRate: number, lastSynced = '2026-10-10'): FigmaMapping {
  node += 7;
  return { itemSlug, nodeName: `Meridian / ${category} / ${name}`, nodeId: `${node}:${(node * 13) % 997}`, props, lastSynced, figmaInstances, detachRate };
}

const STATE_NOTE = 'Hover, pressed and focus are drawn in Figma for specs; code renders them itself.';

export const figma: FigmaMapping[] = [
  map('button', 'Actions', 'Button', [
    v('Variant', 'variant', [['Primary', 'primary'], ['Secondary', 'secondary'], ['Tertiary', 'tertiary'], ['Danger', 'danger'], ['Ghost', null]], { note: 'Ghost was deprecated in code (3.0) but is still a variant in the library.' }),
    v('Size', 'size', [['Small', 'sm'], ['Medium', 'md'], ['Large', 'lg']]),
    v('State', undefined, [['Default', null], ['Hover', null], ['Pressed', null], ['Focus', null]], { intentional: true, note: STATE_NOTE }),
    p('Disabled', 'BOOLEAN', 'disabled'),
    p('Loading', 'BOOLEAN', 'loading'),
    p('Label', 'TEXT', 'label'),
    p('Icon start', 'INSTANCE_SWAP', 'iconStart'),
    codeOnly('fullWidth', 'Full width is a layout choice in Figma (resize the instance), so it has no property.', true),
  ], 4820, 0.02),
  map('icon-button', 'Actions', 'Icon Button', [v('Variant', 'variant', [['Standard', 'standard'], ['Filled', 'filled'], ['Outlined', 'outlined']]), p('Icon', 'INSTANCE_SWAP', 'icon')], 1900, 0.01),
  map('link', 'Actions', 'Link', [v('Variant', 'variant', [['Inline', 'inline'], ['Standalone', 'standalone']]), p('Label', 'TEXT', 'label')], 2100, 0.005),
  map('text-field', 'Inputs', 'Text Field', [
    p('Label', 'TEXT', 'label'),
    p('Helper text', 'TEXT', 'helperText'),
    p('Error text', 'TEXT', 'error'),
    p('Required', 'BOOLEAN', 'required'),
    p('Disabled', 'BOOLEAN', 'disabled'),
    p('Floating label', 'BOOLEAN', undefined, { note: 'Removed from code in Text Field 4.0, still in the library. Most Text Field detaches are people re-creating it.' }),
    codeOnly('prefix', 'No prefix/suffix slot in the Figma component; designers fake it with an overlapping text layer.'),
  ], 3100, 0.14),
  map('text-area', 'Inputs', 'Text Area', [p('Label', 'TEXT', 'label'), p('Character count', 'BOOLEAN', 'showCount')], 380, 0.03),
  map('select', 'Inputs', 'Select', [
    p('Label', 'TEXT', 'label'),
    p('Placeholder', 'TEXT', 'placeholder'),
    p('Searchable', 'BOOLEAN', undefined, { note: 'Added to the library for exploration. Searchable Select doesn’t exist in code yet (RM-111), so designs using it can’t be built.' }),
    v('State', undefined, [['Default', null], ['Open', null], ['Focus', null]], { intentional: true, note: STATE_NOTE }),
  ], 1400, 0.09),
  map('checkbox', 'Inputs', 'Checkbox', [v('Checked', 'checked', [['False', 'false'], ['True', 'true'], ['Indeterminate', 'indeterminate']]), p('Label', 'TEXT', 'label')], 900, 0.01),
  map('radio-group', 'Inputs', 'Radio Group', [p('Label', 'TEXT', 'label'), p('Disabled', 'BOOLEAN', 'disabled')], 520, 0.01),
  map('switch', 'Inputs', 'Switch', [p('On', 'BOOLEAN', 'checked'), p('Label', 'TEXT', 'label'), p('Disabled', 'BOOLEAN', 'disabled')], 610, 0.01),
  map('search-field', 'Inputs', 'Search Field', [p('Placeholder', 'TEXT', 'placeholder'), p('Show recent', 'BOOLEAN', 'showRecent')], 260, 0.04),
  map('tabs', 'Navigation', 'Tabs', [v('Style', 'style', [['Underline', 'underline'], ['Segmented', 'segmented']]), v('Tabs', 'count', [['2', '2'], ['3', '3'], ['4', '4'], ['5', '5']])], 830, 0.06),
  map('top-app-bar', 'Navigation', 'Top App Bar', [p('Title', 'TEXT', 'title'), p('Back button', 'BOOLEAN', 'showBack')], 640, 0.02),
  map('bottom-navigation', 'Navigation', 'Bottom Navigation', [v('Items', undefined, [['3', null], ['4', null], ['5', null]], { intentional: true, note: 'Code takes an items array; Figma uses fixed variants to lay them out.' })], 120, 0),
  map('side-navigation', 'Navigation', 'Side Navigation', [codeOnly('collapsed', 'Collapsible rail shipped in code (26.18); the library hasn’t caught up.')], 70, 0.05),
  map('breadcrumbs', 'Navigation', 'Breadcrumbs', [], 210, 0),
  map('pagination', 'Navigation', 'Pagination', [v('Size', undefined, [['Default', null], ['Compact', null]], { note: 'Compact was removed from code in 0.5; the library still offers it.' }), v('Page', 'page', [['1', '1'], ['2', '2'], ['3', '3']])], 90, 0.08, '2026-05-02'),
  map('alert', 'Feedback', 'Alert', [v('Tone', 'tone', [['Info', 'info'], ['Success', 'success'], ['Warning', 'warning'], ['Danger', 'danger']]), p('Title', 'TEXT', 'title'), p('Show action', 'BOOLEAN', 'action'), p('Dismissible', 'BOOLEAN', 'dismissible')], 1100, 0.03),
  map('toast', 'Feedback', 'Toast', [p('Message', 'TEXT', 'message'), p('Show undo', 'BOOLEAN', 'action')], 760, 0.02),
  map('progress-bar', 'Feedback', 'Progress Bar', [v('Value', 'value', [['0', '0'], ['25', '25'], ['50', '50'], ['75', '75'], ['100', '100']])], 140, 0.01),
  map('spinner', 'Feedback', 'Spinner', [v('Size', undefined, [['Small', null], ['Medium', null]], { note: 'Figma has two sizes; code has one and scales with font size. Pick one model.' })], 410, 0.05),
  map('skeleton', 'Feedback', 'Skeleton', [v('Shape', undefined, [['Line', null], ['Circle', null], ['Block', null]], { intentional: true, note: 'Code composes shapes from width/height; Figma needs presets.' })], 220, 0.02),
  map('modal', 'Overlays', 'Modal', [p('Title', 'TEXT', 'title'), v('Size', 'size', [['Small', 'sm'], ['Medium', 'md'], ['Large', 'lg']]), p('Destructive', 'BOOLEAN', 'destructive')], 690, 0.04),
  map('bottom-sheet', 'Overlays', 'Bottom Sheet', [v('Detent', 'detent', [['Medium', 'medium'], ['Large', 'large']])], 180, 0.07),
  map('tooltip', 'Overlays', 'Tooltip', [p('Text', 'TEXT', 'text'), v('Placement', 'placement', [['Top', 'top'], ['Bottom', 'bottom'], ['Left', 'left'], ['Right', 'right']])], 520, 0.01),
  map('popover-menu', 'Overlays', 'Popover Menu', [v('Items', undefined, [['3', null], ['4', null], ['5', null]], { intentional: true, note: 'Code takes an items array; Figma uses fixed variants.' })], 340, 0.06),
  map('badge', 'Data Display', 'Badge', [v('Tone', 'tone', [['Neutral', 'neutral'], ['Info', 'info'], ['Success', 'success'], ['Warning', 'warning'], ['Danger', 'danger']]), p('Label', 'TEXT', 'label')], 2400, 0.01),
  map('tag', 'Data Display', 'Tag', [v('Kind', 'kind', [['Filter', 'filter'], ['Removable', 'removable']]), p('Selected', 'BOOLEAN', 'selected')], 980, 0.03),
  map('avatar', 'Data Display', 'Avatar', [v('Size', 'size', [['Small', 'sm'], ['Medium', 'md'], ['Large', 'lg']]), p('Name', 'TEXT', 'name'), p('Has image', 'BOOLEAN', undefined, { intentional: true, note: 'Code shows the image when `src` is set; Figma needs a toggle.' })], 1500, 0.02),
  map('list-item', 'Data Display', 'List Item', [v('Trailing', 'trailing', [['Chevron', 'chevron'], ['Switch', 'switch'], ['Badge', 'badge']])], 2800, 0.04),
  map('data-table', 'Data Display', 'Data Table', [codeOnly('selectable', 'Row selection shipped in code 0.7; the library is still on 0.6.')], 160, 0.12, '2026-08-30'),
  map('card', 'Layout', 'Card', [
    v('Variant', 'variant', [['Outlined', 'outlined'], ['Elevated', 'elevated']]),
    p('Media', 'BOOLEAN', 'media'),
    p('Interactive', 'BOOLEAN', 'interactive'),
    v('Density', undefined, [['Comfortable', null], ['Compact', null]], { note: 'Figma has a Compact density code doesn’t support — the main reason admin teams detach Cards. Density tokens (RM-108) close this.' }),
  ], 3900, 0.18),
  map('divider', 'Layout', 'Divider', [], 2600, 0),
  map('accordion', 'Layout', 'Accordion', [p('Multi-expand', 'BOOLEAN', 'multiple'), v('Chevron', undefined, [['Left', null], ['Right', null]], { note: 'The left chevron only exists to match iOS’s drifted build. Remove it once iOS is fixed.' })], 300, 0.11),
];
