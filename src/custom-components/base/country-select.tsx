import React from 'react';
import Select from '~/components/select';
import { getCountryCodeLabelKeyPairs } from '~/helpers/country-codes';
import { TCustomComponentProps } from '../types';

function CountrySelect(props: TCustomComponentProps) {
  const { error, label, register } = props;
  return (
    <Select
      w='full'
      placeholder={label}
      error={error}
      {...register()}
      options={getCountryCodeLabelKeyPairs()}
    />
  );
}
export default CountrySelect;
