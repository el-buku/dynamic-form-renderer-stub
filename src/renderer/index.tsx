import React from "react";
import { FormNode } from "../schemas";
import { renderNode } from "./node";

const renderFormElements = (formNodes: FormNode[]) => {
  return <>{formNodes.map(renderNode)}</>;
};

export default renderFormElements;
