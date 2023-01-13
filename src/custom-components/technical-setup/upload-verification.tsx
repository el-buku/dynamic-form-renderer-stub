import { Flex, Progress, Text, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Column } from 'react-table';
import DataTable from '~/components/data-table';
import { ErrorCell } from '~/components/data-table/custom-cells';
import Image from '~/components/image';

interface RowError {
  value: any;
  error: string;
}
interface UploadVerificationOutput {
  id: number;
  category: string;
  number: number;
}

interface UploadVerificationOutputFormatted {
  id: number | RowError;
  category: string | RowError;
  number: number | RowError;
}

export default function UploadVerification() {
  const mockedData: UploadVerificationOutput[] = [
    {
      id: 1,
      category: 'Category 1',
      number: 10
    },
    {
      id: 2,
      category: 'Category 2',
      number: 40
    },
    {
      id: 3,
      category: 'Category 3',
      number: 15
    },
    {
      id: 4,
      category: 'Category 4',
      number: 20
    }
  ];
  const validations = ['string-length', 'order', 'others'];
  const errors = ['order'];

  const formattedData = mockedData.map(row => ({
    ...row,
    category: {
      value: row.category,
      error: errors[0]
    }
  }));

  const columns = useMemo<Column<UploadVerificationOutputFormatted>[]>(
    () => [
      {
        Header: 'Shipment Number',
        accessor: 'id',
        Cell: ErrorCell
      },
      {
        Header: 'Product Category',
        accessor: 'category',
        Cell: ErrorCell
      },
      {
        Header: 'Product Number',
        accessor: 'number',
        Cell: ErrorCell
      }
    ],
    []
  );

  return (
    <VStack w='full' h='full' spacing={6} alignItems='flex-start' justifyContent='flex-start'>
      <VStack w='full' alignItems='flex-start'>
        <VStack w='full' h='full' py={3} alignItems='flex-start'>
          <Text fontWeight='bold'>Checking your file</Text>
          <Progress w='full' size='xs' colorScheme='secondary' value={80} hasStripe />
        </VStack>
        <VStack maxH='260' w='auto' pb='2' position='relative'>
          <DataTable
            columns={columns}
            data={formattedData}
            hideDetailsLink
            hideFilter
            hidePagination
            hideBoxShadow
          />
        </VStack>
      </VStack>
      <VStack w='container.sm' alignItems='flex-start'>
        {validations.map(validation => (
          <Flex key={validation} gap='1' w='full'>
            <Image
              name={errors.includes(validation) ? 'error-icon' : 'check-icon'}
              alt={validation}
            />
            <Text textTransform='capitalize'>{validation}</Text>
          </Flex>
        ))}
      </VStack>
    </VStack>
  );
}
