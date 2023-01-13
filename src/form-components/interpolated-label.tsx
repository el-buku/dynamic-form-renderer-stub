import React from "react";
import { InterpolatedLabel, CustomLabel } from "../schemas";
import { LabelNode } from "../schemas/src/models/layout-schema";
import { useTranslation } from "react-i18next";
import { Text } from "@chakra-ui/react";
import Link from "~/components/link";

// adds support for using /n as a linebreak inside any InterpolatedLabel
const parseLineBreaks = (label: string) => {
  const splitLines = label.split("/n");
  return splitLines.length === 1 ? (
    <span>{splitLines[0]}</span>
  ) : (
    <>
      {splitLines.map((line) => (
        <p>{line}</p>
      ))}
    </>
  );
};

const wrapWithStrong = (
  el: CustomLabel,
  renderString: (val: string) => JSX.Element
) =>
  el.strong ? (
    <Text as="span" fontWeight="semibold">
      {renderString(el.displayLabel)}
    </Text>
  ) : (
    <>{renderString(el.displayLabel)}</>
  );

const wrapWithLink = (
  el: CustomLabel & { href: string },
  renderString: (val: string) => JSX.Element
) => (
  <Link
    to={el.href}
    {...{
      target: (el.targetBlank && "_blank") || undefined,
      rel: (el.targetBlank && "noopener noreferrer") || undefined,
    }}
  >
    {wrapWithStrong(el, renderString)}
  </Link>
);

export const parseInterpolatedLabel = (
  label: InterpolatedLabel,
  t: (val: string) => string
): JSX.Element => {
  const renderString = (val: string) => parseLineBreaks(t(val));
  if (Array.isArray(label)) {
    return (
      <>
        {label.map((el) => {
          if (typeof el === "string") return <>{renderString(el)}</>;
          return el.href !== undefined
            ? wrapWithLink({ ...el, href: el.href }, renderString)
            : wrapWithStrong(el, renderString);
        })}
      </>
    );
  }
  return <>{renderString(label)}</>;
};

export function InterpolatedLabelComponent({
  node: { label, type },
}: {
  node: LabelNode;
}) {
  // TODO implement correct translation mechanism
  const { t } = useTranslation();
  return (
    <Text
      fontSize={
        (type === "h1" && "3xl") ||
        (type === "h2" && "2xl") ||
        (type === "h3" && "xl") ||
        undefined
      }
    >
      {parseInterpolatedLabel(label, t)}
    </Text>
  );
}

export default InterpolatedLabelComponent;
