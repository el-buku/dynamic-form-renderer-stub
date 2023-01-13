import * as schemaGenerators from '../../helpers/schema-generators';
import FormNodes from '../../schemas/layout-schema';

const formNodes: FormNodes = [
  {
    ...schemaGenerators.formCard(),
    elements: [
      { key: 'label1', type: 'h2', label: 'onboarding.overview' },
      {
        key: 'label2',
        type: 'label',
        label: 'onboarding.companyDetails.overview.description'
      }
    ]
  },
  schemaGenerators.formFooter()
];

const formNodesAndSchema = {
  formNodes
};

export default formNodesAndSchema;
