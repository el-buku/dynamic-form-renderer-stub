import React from "react";
import { FormNode, formNodeFilters } from "../schemas";
import { LayoutComponent } from "../form-components";
import { renderElement } from "./element";
import { GroupLayoutComponent } from "../form-components/group-layout";

export const renderNode = (node: FormNode) => {
  const isLayout = formNodeFilters.isLayout(node);
  const isGroupLayout = isLayout && formNodeFilters.isGroupLayout(node);

  if (isGroupLayout)
    return (
      <GroupLayoutComponent {...node}>
        {node.elements.map(renderNode)}
      </GroupLayoutComponent>
    );
  if (isLayout)
    return (
      <LayoutComponent {...node}>
        {node.elements.map(renderNode)}
      </LayoutComponent>
    );
  return renderElement(node);
};
