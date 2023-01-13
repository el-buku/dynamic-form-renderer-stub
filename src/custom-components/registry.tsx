import { getNestedValue, NestedPath } from "../utils/nested-object";
import * as vatAndCustoms from "./vat-and-customs";
import * as technicalSetup from "./technical-setup";
import * as productDetails from "./product-details";
import * as base from "./base";
import { TCustomComponent } from "./types";

export const customComponentsRegistry = {
  vatAndCustoms,
  technicalSetup,
  productDetails,
  base,
};
export type TComponentsRegistry = typeof customComponentsRegistry;

/**
 * Auto-magically generated component names from module namespaces
 * `base.CountrySelect`
 */
export type CustomComponentName = NestedPath<
  TComponentsRegistry,
  TCustomComponent
>;

export function getCustomComponent(componentName: CustomComponentName) {
  return getNestedValue<
    TComponentsRegistry,
    CustomComponentName,
    TCustomComponent
  >(customComponentsRegistry, componentName);
}
