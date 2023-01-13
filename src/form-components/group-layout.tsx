import {
  useCheckboxGroup,
  UseCheckboxGroupReturn,
  useRadioGroup,
  UseRadioGroupReturn,
} from "@chakra-ui/react";
import { ButtonGroupLayout } from "../schemas";

import React, { useContext } from "react";
import {
  ControllerRenderProps,
  useController,
  FieldValues,
} from "react-hook-form";
import { useFormContext } from "../form-context";
import { LayoutComponent } from "./layout";

export type TFormGroupContext = {
  getFieldProps:
    | UseCheckboxGroupReturn["getCheckboxProps"]
    | UseRadioGroupReturn["getRadioProps"];
};

const FormGroupContext = React.createContext<TFormGroupContext>({
  getFieldProps: () => ({}),
});

export const useFormGroupContext = () =>
  useContext<TFormGroupContext>(FormGroupContext);

const useGroupProps = (
  groupType: ButtonGroupLayout["groupType"],
  forKey: string,
  field: ControllerRenderProps<FieldValues, string>
) => {
  if (groupType === "radio") {
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: forKey,
      onChange: field.onChange,
      value: field.value,
    });
    return { getRootProps, getFieldProps: getRadioProps };
  }
  const { getCheckboxProps } = useCheckboxGroup({
    onChange: field.onChange,
    value: field.value,
  });
  return { getRootProps: () => ({}), getFieldProps: getCheckboxProps };
};

export function GroupLayoutComponent({
  children,
  ...layoutNode
}: React.PropsWithChildren<ButtonGroupLayout>) {
  const { groupType, forKey } = layoutNode;
  if (!forKey) throw new Error(`Missing 'forKey' in GroupLayout`);
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name: forKey,
    ...(layoutNode.defaultValue && { defaultValue: layoutNode.defaultValue }),
  });
  const { getRootProps, getFieldProps } = useGroupProps(
    groupType,
    forKey,
    field
  );
  return (
    <FormGroupContext.Provider value={{ getFieldProps }}>
      <LayoutComponent wrapperProps={getRootProps()} {...layoutNode}>
        {children}
      </LayoutComponent>
    </FormGroupContext.Provider>
  );
}
