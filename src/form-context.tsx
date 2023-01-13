import onboardingMachine, { FormSchema, OnboardingEventName } from "../schemas";
import { ajvResolver } from "@hookform/resolvers/ajv";
import { useNavigate, useLocation } from "@tanstack/react-location";
import React, { useContext, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { InterpreterFrom } from "xstate";
import { useOnboardingDataContext } from "./data-context";

export type TFormContext = Pick<
  UseFormReturn,
  | "register"
  | "handleSubmit"
  | "formState"
  | "getValues"
  | "setValue"
  | "watch"
  | "control"
> & {
  handleTransition: (transition: OnboardingEventName) => void;
  previousValues: Record<string, any>;
};

const FormContext = React.createContext<TFormContext>({} as TFormContext);

export const useFormContext = () => useContext(FormContext);

export function FormContextProvider({
  children,
  formSchema,
  formStepKey,
  onboardingService,
}: React.PropsWithChildren<{
  formSchema: FormSchema;
  formStepKey: string;
  // will be removed, we will use the mutation instead
  onboardingService: InterpreterFrom<typeof onboardingMachine>;
}>) {
  const navigate = useNavigate();
  const location = useLocation();

  const { onboardingData, setOnboardingData } = useOnboardingDataContext();

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setValue,
    watch,
    control,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: ajvResolver(formSchema as any),
    shouldUnregister: true,
  });

  const previousValues = useMemo(() => {
    const formValues = formStepKey && onboardingData?.[formStepKey];
    if (formValues) reset(formValues);
    return formValues || {};
  }, [onboardingData, reset, formStepKey]);

  const handleTransition = (transition: OnboardingEventName) => {
    if (formSchema) {
      if (transition === "PREVIOUS") {
        location.history.back();
      }
      if (transition === "SAVE") {
        const formValues = getValues();
        setOnboardingData(formValues);
        navigate({ to: "/onboarding" });
      }
      handleSubmit(
        (value: Record<keyof FormSchema["properties"], any>) => {
          onboardingService.send({
            type: transition,
            value,
          });
          setOnboardingData({ [formStepKey]: value });
        },
        (...args) => {
          // eslint-disable-next-line
          console.log("React hook form validation error:", args, getValues());
        }
      )();
    } else {
      onboardingService.send({
        type: transition,
        value: {},
      });
    }
  };
  return (
    (onboardingData && (
      <FormContext.Provider
        value={{
          register,
          handleSubmit,
          formState,
          getValues,
          setValue,
          handleTransition,
          watch,
          control,
          previousValues,
        }}
      >
        {children}
      </FormContext.Provider>
    )) ||
    null
  );
}

export default FormContextProvider;
