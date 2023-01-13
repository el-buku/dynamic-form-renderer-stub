import { ControlNode } from "../schemas";
import _ from "lodash";
import React, { useEffect } from "react";
import { FieldError, FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Checkbox from "~/components/checkbox";
import {
  CustomComponentName,
  getCustomComponent,
} from "~/components/generated-form/custom-components";
import RadioButton from "~/components/radio-button";
import Select from "~/components/select";
import TextArea from "~/components/text-area";
import TextField from "~/components/text-field";
import UploadFilesArea from "~/components/upload-files-area";
import { translateError } from "~/helpers/translate-error";
import { useFormContext } from "../form-context";
import { useFormGroupContext } from "./group-layout";

function ControlComponent({ node }: { node: ControlNode }) {
  const { t } = useTranslation();
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();
  const ruleMatched =
    node?.rule?.targetKey !== undefined &&
    (node?.rule?.targetKey === true ||
      watch(node?.rule?.targetKey) === node?.rule?.targetValue);
  const ruleEffect = node?.rule?.effect || undefined;
  const isDisabled =
    (ruleMatched && ruleEffect === "DISABLE") ||
    (!ruleMatched && ruleEffect === "ENABLE");
  const registerField = () => {
    return register(
      (node.type === "radio" ? node.forKey : node.key) as Path<FieldValues>
    );
  };
  const setFieldValue = (v: any) => setValue(node.key as Path<FieldValues>, v);
  useEffect(() => {
    if (isDisabled) setFieldValue(null);
  }, [isDisabled]);
  const fieldError = translateError(
    t,
    _.get(errors, node.key) as FieldError | undefined
  );
  switch (node.type) {
    case "text": {
      const { label, isTextarea } = node;
      return isTextarea ? (
        <TextArea
          isDisabled={isDisabled}
          placeholder={t(label)}
          error={fieldError}
          {...registerField()}
        />
      ) : (
        <TextField
          isDisabled={isDisabled}
          placeholder={t(label)}
          error={fieldError}
          {...registerField()}
        />
      );
    }

    case "select": {
      const { label, options } = node;
      return (
        <Select
          isDisabled={isDisabled}
          placeholder={t(label)}
          error={fieldError}
          options={options}
          {...registerField()}
        />
      );
    }

    case "file": {
      const { multiple, label, fileTypes } = node;
      const { ref } = registerField();
      return (
        <UploadFilesArea
          // @ts-ignore
          fileTypes={fileTypes}
          onFileAccepted={(acceptedFiles) => {
            // console.log(acceptedFiles);
            setFieldValue(acceptedFiles.map((file) => file.uploadedUrl));
          }}
          placeholder={label || ""}
          multiple={multiple}
          error={fieldError}
          ref={ref}
        />
      );
    }

    case "checkbox": {
      const { label, value } = node;
      const { getFieldProps } = useFormGroupContext();
      const fieldProps = getFieldProps({ value });
      const { name, onChange, ...componentProps } = fieldProps;
      return (
        <Checkbox
          name={name}
          value={value}
          onChange={onChange}
          isDisabled={isDisabled}
          error={fieldError}
          label={t(label)}
          {...componentProps}
        />
      );
    }

    case "radio": {
      const { label, value } = node;
      const { getFieldProps } = useFormGroupContext();
      const fieldProps = getFieldProps({ value });
      const { name, onChange, ...componentProps } =
        fieldProps?.name !== undefined ? fieldProps : registerField();
      return (
        <RadioButton
          name={name}
          value={value}
          onChange={onChange}
          isDisabled={isDisabled}
          w="min-intrinsic"
          error={fieldError}
          label={t(label)}
          {...componentProps}
        />
      );
    }

    case "customComponent": {
      const { componentName, componentProps, label } = node;
      const Component = getCustomComponent(
        componentName as CustomComponentName // TODO remove this type assertion
      );
      return (
        <Component
          {...{
            error: fieldError,
            label: t(label || ""),
            register: registerField,
            ...componentProps,
          }}
        />
      );
    }

    default:
      return null;
  }
}

export function ControlFieldComponent(props: { node: ControlNode }) {
  return <ControlComponent {...props} />;
}
