import { FlexProps } from '@chakra-ui/react';
import { OnboardingEventName } from './event-names';

// 'as const' assertion needed for type inference
const INPUT_TYPES = ['text', 'select', 'checkbox', 'radio', 'file', 'customComponent'] as const;
const LABEL_TYPES = ['h1', 'h2', 'h3', 'label'] as const;
const BUTTON_TYPES = ['button'] as const;
const LAYOUT_TYPES = ['layout'] as const;

export type ControlType = typeof INPUT_TYPES[number];
export type LabelType = typeof LABEL_TYPES[number];
export type ButtonType = typeof BUTTON_TYPES[number];

export type ElementType = ControlType | LabelType | ButtonType;
export type LayoutType = typeof LAYOUT_TYPES[number];

export type LinkLabel = { href?: string; targetBlank?: boolean };
export type CustomLabel = LinkLabel & { strong?: boolean; displayLabel: string };
export type InterpolatedLabel = string | (CustomLabel | string)[];

export type FileType = 'img' | 'csv' | 'pdf';

export type RuleBase = {
  // targetKey:true enables the rule regardless of value
  targetKey: string | true;
  targetValue?: any;
};
export type TFieldRule = RuleBase & {
  effect: 'DISABLE' | 'ENABLE';
};

export type TLayoutRule = RuleBase & {
  effect: 'SHOW' | 'HIDE';
};

export type TElementNode = {
  key: string;
  type: ElementType;
  label: string;
  rule?: TFieldRule;
};

export type InputNode = TElementNode & {
  type: 'text';
  isTextarea?: boolean;
};

export type SelectNode = TElementNode & {
  type: 'select';
  options: Record<string, string>;
};

export type FileNode = TElementNode & {
  type: 'file';
  fileTypes?: FileType[];
  multiple: boolean;
};

export type CheckboxNode = TElementNode & {
  type: 'checkbox';
  value?: string | number;
};

export type RadioNode = TElementNode & {
  type: 'radio';
  forKey: string;
  value: string | number;
};

export type LabelNode = Omit<TElementNode, 'label'> & {
  type: LabelType;
  label: InterpolatedLabel;
};

export type ButtonNode = TElementNode & {
  type: ButtonType;
  transition?: OnboardingEventName;
  variant?: ButtonVariant;
};

export type ButtonVariant = 'base' | 'secondary' | 'outline' | 'text' | 'error';

// TODO this will be imported
export type CustomComponentName = string;
export type CustomNode = Omit<TElementNode, 'label'> & {
  label?: string;
  type: 'customComponent';
  componentName: CustomComponentName;
  componentProps?: Record<string, any>;
};

export type ControlNode = InputNode | SelectNode | FileNode | CheckboxNode | RadioNode | CustomNode;

export type ElementNode = ControlNode | LabelNode | ButtonNode;

export type TLayoutNode = {
  type: LayoutType;
  elements: FormNode[];
  direction: LayoutDirection;
  options?: LayoutOptions;
  labelNode?: LabelNode;
  rule?: TLayoutRule;
};

export type LayoutOptions = Omit<FlexProps, 'direction'>;

export type LayoutDirection = 'horizontal' | 'vertical';

export type VerticalLayout = TLayoutNode & {
  direction: 'vertical';
};

export type HorizontalLayout = TLayoutNode & {
  direction: 'horizontal';
};

export type ButtonGroupLayout = TLayoutNode & {
  groupType: 'checkbox' | 'radio';
  forKey: string;
  defaultValue?: string | number;
};

export type LayoutNode = ButtonGroupLayout | VerticalLayout | HorizontalLayout;

export type FormNode = ElementNode | LayoutNode;

export type FormNodes = FormNode[];

export const formNodeFilters = {
  isField: (node: FormNode): node is ControlNode =>
    (INPUT_TYPES as readonly string[]).includes(node.type),
  isTextLabel: (node: FormNode): node is LabelNode =>
    (LABEL_TYPES as readonly string[]).includes(node.type),
  isLayout: (node: FormNode): node is LayoutNode =>
    (LAYOUT_TYPES as readonly string[]).includes(node.type),
  isGroupLayout: (node: FormNode): node is ButtonGroupLayout => {
    return 'groupType' in node;
  },
  isButton: (node: FormNode): node is ButtonNode => node.type === 'button',
  isCustomComponent: (node: FormNode): node is CustomNode => node.type === 'customComponent'
};

export default FormNodes;
