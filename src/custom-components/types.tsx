import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export type TCustomComponentProps = {
  error?: FieldError;
  label?: string;
  register: () => UseFormRegisterReturn;
  componentProps?: Record<string, any>;
};

export type TCustomComponent = (props: TCustomComponentProps) => JSX.Element;
