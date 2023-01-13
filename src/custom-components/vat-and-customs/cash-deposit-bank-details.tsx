import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Button from '~/components/button';

export default function CashDepositBankDetails() {
  return (
    <VStack w='full' spacing='1 ' justifyContent='flex-start' alignItems='flex-start' mb='1'>
      <HStack w='full' h='full' justifyContent='space-between' spacing='20px' alignItems='center'>
        <VStack w='full' h='full' alignItems='flex-start'>
          <Text>Einzahlung auf das</Text>
          <Text>
            Post Finance-Konto des BAZG: Nummer 30-704-6, IBAN CH72 0900 0000 3000 0704 6, BIC
          </Text>
          <Text>POFICHBEXXX</Text>
        </VStack>
        <Button variant='secondary'>Copy IBAN</Button>
      </HStack>
      <HStack w='full' h='full' justifyContent='space-between' alignItems='center' spacing='20px'>
        <VStack w='full' h='full' alignItems='flex-start'>
          <Text>oder auf das Konto</Text>
          <Text>
            SNB 15100.02202, IBAN CH56 0011 5001 5100 0220 2, BIC SNBZCHZZ80A bei der
            Schweizerischen Nationalbank in Zürich
          </Text>
        </VStack>
        <Button variant='secondary'>Copy IBAN</Button>
      </HStack>
      <Text>Wenn fertig mit Überweisung hier bitte hochladen.</Text>
    </VStack>
  );
}
