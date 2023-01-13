import { Flex } from "@chakra-ui/react";
import { ButtonNode, ControlNode, FormNode } from "../schemas";
import React, { useEffect, useMemo, useState } from "react";
import { formNodeFilters } from "../schemas/src/models/layout-schema";
import { get } from "lodash";
import { ButtonComponent } from "../../form-components";
import renderFormElements from "../../renderer";
import { TCustomComponentProps } from "../types";
import { useFormContext } from "../../form-context";

export type IncrementedControlsArrayProps = TCustomComponentProps & {
  controlNodes: ControlNode[];
  incrementerButtonNode: ButtonNode;
  decrementerButtonNode?: ButtonNode;
  forKey: string;
  maxControlNodes?: number;
  hasDefaultNodes?: boolean;
};

function IncrementedControlsArray(props: IncrementedControlsArrayProps) {
  const {
    controlNodes,
    incrementerButtonNode,
    decrementerButtonNode,
    forKey,
    maxControlNodes,
    hasDefaultNodes = true,
  } = props;
  const defaultNodesQty = hasDefaultNodes ? 1 : 0;
  const { watch, setValue, previousValues } = useFormContext();
  const fieldArray: any[] | undefined = watch(forKey);
  const [counter, setCounter] = useState(fieldArray?.length || defaultNodesQty);

  useEffect(() => {
    const fieldValues = get(previousValues, forKey);
    if (fieldValues?.length) setCounter(fieldValues.length);
  }, [previousValues]);

  const isIncrementalButtonDisabled = useMemo(() => {
    return (
      maxControlNodes &&
      (counter >= maxControlNodes + 1 ||
        (!hasDefaultNodes && counter >= maxControlNodes))
    );
  }, [counter, hasDefaultNodes, maxControlNodes]);

  const addFieldSet = () => {
    if (isIncrementalButtonDisabled) return;
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeFieldSet = () => {
    fieldArray?.splice(-1);
    setValue(forKey, fieldArray);
    setCounter(
      (prevCounter) => (prevCounter > 2 && prevCounter - 1) || defaultNodesQty
    );
  };

  return (
    <>
      {Array.from(Array(counter).keys()).map((index) => {
        const fieldSetName = `${forKey}.[${index}]`;
        const mapKeys = (node: FormNode): FormNode =>
          formNodeFilters.isLayout(node)
            ? {
                ...node,
                elements: node.elements.map(mapKeys),
                ...(formNodeFilters.isGroupLayout(node) && {
                  forKey: node.forKey && `${fieldSetName}.${node?.forKey}`,
                }),
              }
            : {
                ...node,
                key: `${fieldSetName}.${node?.key}`,
                ...(formNodeFilters.isCustomComponent(node) &&
                  node.componentName === "base.IncrementedControlsArray" && {
                    componentProps: {
                      ...node.componentProps,
                      forKey:
                        node?.componentProps?.forKey &&
                        `${fieldSetName}.${node?.componentProps.forKey}`,
                    },
                  }),
              };
        const fieldSetNodes = controlNodes.map(mapKeys);
        return renderFormElements(fieldSetNodes);
      })}
      <Flex justifyContent="space-between" w="full">
        <ButtonComponent
          node={incrementerButtonNode}
          onClick={addFieldSet}
          disabled={!!isIncrementalButtonDisabled}
        />
        {counter > defaultNodesQty && decrementerButtonNode && (
          <ButtonComponent
            node={decrementerButtonNode}
            onClick={removeFieldSet}
          />
        )}
      </Flex>
    </>
  );
}
export default IncrementedControlsArray;
