import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Select from '~/components/select';
import TextField from '~/components/text-field';

function Row({ label, children }: { label: string; children: React.ReactElement }) {
  return (
    <Flex justifyContent='space-between' w='full'>
      <Text width='50%'>{label}</Text>
      <Box width='50%'>{children}</Box>
    </Flex>
  );
}

export default function CalculationOfSecurityDeposit() {
  return (
    <VStack>
      <Row label='Sortiment'>
        <Select name='' options={{}} />
      </Row>
      <Row label='Number of items:'>
        <Flex>
          <TextField name='' />
          <Text w='100px' ml='10px'>
            / 60 days
          </Text>
        </Flex>
      </Row>
      <Row label='Average weight per item'>
        <Flex>
          <TextField name='' />
          <Text w='100px' ml='10px'>
            KG
          </Text>
        </Flex>
      </Row>
      <Row label='Avg. selling price / item in CHF (no VAT)'>
        <Flex>
          <TextField name='' />
          <Text w='100px' ml='10px'>
            CHF
          </Text>
        </Flex>
      </Row>
      <Row label='Sortiment'>
        <Text align='right'>140,00 CHF</Text>
      </Row>
      <Row label='Customs fee / 60 days'>
        <Text align='right'>1.600,00 CHF</Text>
      </Row>
      <Row label='Vorsteuer / 60 days'>
        <Text align='right'>5.400,00 CHF</Text>
      </Row>
      <Row label='Vorsteuer / 60 days'>
        <Text align='right'>7.140,00 CHF</Text>
      </Row>
    </VStack>
  );
}
