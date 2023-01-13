import { JSONSchema7 } from 'json-schema';

interface FormSchema extends JSONSchema7 {
  errorMessage?: Record<string, string | Record<string, string>>;
  properties?: Record<string, FormSchema>;
  items?: FormSchema;
}

export type { FormSchema };
