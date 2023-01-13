import { FormSchema } from '../../schemas/form-schema';
import * as schemaGenerators from '../../helpers/schema-generators';
import FormNodes, { LayoutNode } from '../../schemas/layout-schema';

const formAddressFields: LayoutNode = {
  type: 'layout',
  direction: 'vertical',
  groupType: 'checkbox',
  forKey: 'billing_address',
  options: {
    gap: 3
  },
  elements: [
    {
      key: 'street',
      type: 'text',
      label: 'onboarding.companyInformation.street'
    },
    {
      type: 'layout',
      direction: 'horizontal',
      options: {
        gap: 3
      },
      elements: [
        {
          key: 'no',
          type: 'text',
          label: 'onboarding.companyInformation.number'
        },
        {
          key: 'zipCode',
          type: 'text',
          label: 'onboarding.companyInformation.zipCode'
        }
      ]
    },
    {
      type: 'layout',
      direction: 'horizontal',
      options: {
        gap: 3
      },
      elements: [
        {
          key: 'city',
          type: 'text',
          label: 'onboarding.companyInformation.city'
        },
        {
          key: 'country',
          type: 'customComponent',
          componentName: 'base.CountrySelect'
        }
      ]
    },
    {
      key: 'billing_address',
      type: 'checkbox',
      label: 'onboarding.companyDetails.contactInformation.billingAddress'
    }
  ]
};

const formNodes: FormNodes = [
  {
    ...schemaGenerators.formCard(),
    elements: [
      { key: 'label1', type: 'h2', label: 'onboarding.companyDetails.contactInformation.title' },
      {
        type: 'layout',
        direction: 'vertical',
        options: {
          pt: 2,
          gap: 3
        },
        elements: [
          {
            key: 'label2',
            type: 'h3',
            label: 'users.company'
          },
          {
            key: 'company_name',
            type: 'text',
            label: 'onboarding.companyDetails.contactInformation.companyName'
          },
          {
            key: 'company_website',
            type: 'text',
            label: 'onboarding.companyDetails.contactInformation.website'
          },
          {
            key: 'company_email',
            type: 'text',
            label: 'onboarding.companyDetails.contactInformation.emailAddress'
          },
          {
            type: 'layout',
            direction: 'horizontal',
            options: {
              gap: 3,
              justifyContent: 'flex-start'
            },
            elements: [
              {
                key: 'country_code',
                type: 'customComponent',
                componentName: 'base.CountryCodesSelect'
              },
              { key: 'phone', type: 'text', label: 'onboarding.companyInformation.phone' }
            ]
          }
        ]
      },
      {
        type: 'layout',
        direction: 'vertical',
        options: {
          pt: 2,
          gap: 3
        },
        elements: [
          {
            key: 'label2',
            type: 'h3',
            label: 'onboarding.companyDetails.contactInformation.companyAddress'
          },
          {
            key: 'address',
            type: 'customComponent',
            componentName: 'base.IncrementedControlsArray',
            componentProps: {
              maxControlNodes: 1,
              forKey: 'company_address',
              controlNodes: [{ ...formAddressFields }],
              incrementerButtonNode: {
                key: 'add-address',
                type: 'button',
                variant: 'text',
                label: 'onboarding.companyDetails.contactInformation.addNewAddress'
              },
              decrementerButtonNode: {
                key: 'remove-address',
                type: 'button',
                variant: 'error',
                label: 'onboarding.companyDetails.contactInformation.removeAddress'
              }
            }
          }
        ]
      }
    ]
  },
  schemaGenerators.formFooter()
];

const formSchema: FormSchema = {
  type: 'object',
  properties: {
    company_name: {
      type: 'string',
      minLength: 1,
      errorMessage: {
        minLength: 'fieldIsRequired'
      }
    },
    company_website: {
      type: 'string',
      minLength: 1,
      errorMessage: {
        minLength: 'fieldIsRequired'
      }
    },
    company_email: {
      type: 'string',
      minLength: 1,
      errorMessage: {
        minLength: 'fieldIsRequired'
      }
    },
    country_code: {
      type: 'string',
      minLength: 1,
      errorMessage: {
        minLength: 'fieldIsRequired'
      }
    },
    phone: {
      type: 'string',
      minLength: 1,
      errorMessage: {
        minLength: 'fieldIsRequired'
      }
    },
    company_address: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              minLength: 'fieldIsRequired'
            }
          },
          no: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              minLength: 'fieldIsRequired'
            }
          },
          zipCode: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              minLength: 'fieldIsRequired'
            }
          },
          city: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              minLength: 'fieldIsRequired'
            }
          },
          country: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              minLength: 'fieldIsRequired'
            }
          }
        }
      }
    }
  },
  additionalProperties: true,
  required: [
    'company_name',
    'company_website',
    'company_email',
    'country_code',
    'phone',
    'company_address'
  ]
};

const formNodesAndSchema = {
  formNodes,
  formSchema
};

export default formNodesAndSchema;
