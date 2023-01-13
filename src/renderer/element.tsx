import React from "react";
import { ElementNode, formNodeFilters } from "../schemas";
import {
  ControlFieldComponent,
  InterpolatedLabelComponent,
  ButtonComponent,
} from "../form-components";

export const renderElement = (node: ElementNode) => {
  const isTextLabel = formNodeFilters.isTextLabel(node);
  const isField = formNodeFilters.isField(node);
  const isButton = formNodeFilters.isButton(node);
  return (
    (isTextLabel && (
      <InterpolatedLabelComponent node={node} key={node.key} />
    )) ||
    (isField && <ControlFieldComponent node={node} key={node.key} />) ||
    (isButton && <ButtonComponent node={node} key={node.key} />)
  );
};
