import React from 'react';
import { Box } from '@chakra-ui/react';

export default function DeclarationOfAccessionPDF() {
  return (
    <Box w='100%'>
      <iframe
        src='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        title='PDF Viewer'
        width='750'
        height='500'
      />
    </Box>
  );
}
