import React from "react";
import { ButtonNode } from "../schemas";
import { useTranslation } from "react-i18next";
import TextButton from "~/components/text-button";
import Button from "~/components/button";
import { useFormContext } from "../form-context";

export function ButtonComponent({
  node: { key, label, transition, variant },
  onClick,
  disabled = false,
}: {
  node: ButtonNode;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const { handleTransition } = useFormContext();
  const { t } = useTranslation();
  const onClickHandler = () =>
    (typeof onClick === "function" && onClick()) ||
    (transition && handleTransition(transition));
  switch (variant) {
    case "outline":
      // TODO
      return (
        <Button key={key} onClick={onClickHandler} disabled={disabled}>
          {t(label)}
        </Button>
      );
    case "text":
      return (
        <TextButton
          key={key}
          pt="6px"
          pb="2px"
          px="2px"
          onClick={onClickHandler}
          disabled={disabled}
        >
          {t(label)}
        </TextButton>
      );
    case "error":
      return (
        <TextButton
          key={key}
          pt="6px"
          pb="2px"
          px="2px"
          onClick={onClickHandler}
          color="red.500"
          disabled={disabled}
        >
          {t(label)}
        </TextButton>
      );
    case "secondary":
      return (
        <Button
          key={key}
          colorScheme="secondary"
          onClick={onClickHandler}
          disabled={disabled}
        >
          {t(label)}
        </Button>
      );
    default:
      return (
        <Button key={key} onClick={onClickHandler} disabled={disabled}>
          {t(label)}
        </Button>
      );
  }
}
