import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from '~/components/image';

export default function InitialTariffing() {
  const { t } = useTranslation();
  return (
    <VStack w='full' h='full'>
      <HStack w='full'>
        <VStack w='full' alignItems='flex-start'>
          <Text fontWeight='bold'>
            {t('onboarding.productDetails.initialProductClassification.fromWarehouseLocation')}
          </Text>
          <Text>{t('onboarding.productDetails.initialProductClassification.czechRepublic')}</Text>
        </VStack>
        <VStack w='full' alignItems='flex-start'>
          <Text fontWeight='bold'>
            {t('onboarding.productDetails.initialProductClassification.tarifnumberAvailable')}
          </Text>
          <Image name='error-icon' alt='tariffnumber-available' />
        </VStack>
      </HStack>
      <HStack w='full'>
        <VStack w='full' alignItems='flex-start'>
          <Text fontWeight='bold'>To </Text>
          <Text> {t('onboarding.productDetails.initialProductClassification.switzerland')}</Text>
        </VStack>
        <VStack w='full' alignItems='flex-start'>
          <Text fontWeight='bold' opacity={0}>
            {t('onboarding.productDetails.initialProductClassification.tarifnumberAvailable')}
          </Text>
          <Image name='error-icon' alt='tariffnumber-available' />
        </VStack>
      </HStack>
    </VStack>
  );
}
