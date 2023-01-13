import React from 'react';
import Select from '~/components/select';
import { getCountryCodePhonePrefixKeyPairs } from '~/helpers/country-codes';
import { TCustomComponentProps } from '../types';

function CountryCodesSelect(props: TCustomComponentProps) {
  const { error, label, register } = props;
  return (
    <Select
      maxW='100'
      placeholder={label}
      error={error}
      {...register()}
      options={getCountryCodePhonePrefixKeyPairs()}
    />
  );
}
export default CountryCodesSelect;
