import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { LayoutNode } from "../schemas";
import { InterpolatedLabelComponent } from "./interpolated-label";
import { useFormContext } from "../form-context";

const layoutNodeDefaults = {
  w: "full",
  h: "auto",
  alignItems: "flex-start",
  justifyContent: "space-between",
};

export function LayoutComponent({
  children,
  wrapperProps,
  ...layoutNode
}: React.PropsWithChildren<LayoutNode & { wrapperProps?: FlexProps }>) {
  const { direction, labelNode, rule } = layoutNode;
  const { watch } = useFormContext();
  const ruleMatched =
    rule?.targetKey !== undefined &&
    (rule?.targetKey === true || watch(rule?.targetKey) === rule?.targetValue);
  const ruleEffect = rule?.effect || undefined;
  const isHidden =
    (ruleMatched && ruleEffect === "HIDE") ||
    (!ruleMatched && ruleEffect === "SHOW");
  return (
    <>
      {labelNode && <InterpolatedLabelComponent node={labelNode} />}
      <Flex
        {...{
          ...layoutNodeDefaults,
          ...layoutNode.options,
          direction: direction === "horizontal" ? "row" : "column",
          ...wrapperProps,
          ...(isHidden && { display: "none" }),
        }}
      >
        {children}
      </Flex>
    </>
  );
}
