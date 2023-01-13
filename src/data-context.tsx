import React, { useContext, useEffect, useState } from 'react';
import { useOnboardingDataMutation, useOnboardingDataQuery } from '~/api/hooks/onboarding';

export type TOnboardingDataContext = {
  onboardingData: Record<string, any>;
  setOnboardingData: (v: Record<string, any>) => void;
};

const OnboardingDataContext = React.createContext<TOnboardingDataContext>({
  onboardingData: {},
  setOnboardingData: () => null
});

export const useOnboardingDataContext = () =>
  useContext<TOnboardingDataContext>(OnboardingDataContext);

export function OnboardingDataContextProvider({
  children,
  onboardingId
}: React.PropsWithChildren<{ onboardingId: number }>) {
  const { data: fetchedData, refetch } = useOnboardingDataQuery(onboardingId);
  const onboardingDataMutation = useOnboardingDataMutation(onboardingId);
  const [data, setData] = useState<Record<string, any>>({});

  useEffect(
    () =>
      setData(prevData => {
        return { ...fetchedData, ...prevData };
      }),
    [fetchedData]
  );

  return (
    <OnboardingDataContext.Provider
      value={{
        onboardingData: data,
        setOnboardingData: (value: Record<string, any>) => {
          setData(prevData => {
            const newData = { ...prevData, ...value };
            onboardingDataMutation.mutate(newData);
            refetch();
            return newData;
          });
        }
      }}
    >
      {children}
    </OnboardingDataContext.Provider>
  );
}

export default OnboardingDataContextProvider;
