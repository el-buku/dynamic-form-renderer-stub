import * as schemaGenerators from '../../helpers/schema-generators';
import { FormSchema } from '../../schemas/form-schema';
import FormNodes, { LayoutNode } from '../../schemas/layout-schema';

const formAddressFields: LayoutNode = {
  type: 'layout',
  direction: 'vertical',
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
          key: 'number',
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
    }
  ]
};

const formContactPersonFields: LayoutNode = {
  type: 'layout',
  direction: 'vertical',
  elements: [
    {
      key: 'label1',
      type: 'h2',
      label: 'onboarding.companyDetails.contactPerson.title'
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
          key: 'first_name',
          type: 'text',
          label: 'users.firstName'
        },
        { key: 'last_name', type: 'text', label: 'users.lastName' },
        { key: 'position', type: 'text', label: 'users.position' },
        {
          key: 'email',
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
        },
        {
          key: 'address',
          type: 'customComponent',
          componentName: 'base.IncrementedControlsArray',
          componentProps: {
            maxControlNodes: 1,
            hasDefaultNodes: false,
            forKey: 'contact_person_address',
            controlNodes: [{ ...formAddressFields }],
            incrementerButtonNode: {
              key: 'add-address',
              type: 'button',
              variant: 'text',
              label: 'onboarding.companyDetails.contactPerson.addAddressforContactPerson'
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
    },
    {
      type: 'layout',
      direction: 'vertical',
      options: {
        py: 2,
        gap: 3
      },
      elements: [
        {
          key: 'label2',
          type: 'h3',
          label: 'onboarding.companyDetails.contactPerson.profilePicture'
        },
        {
          key: 'profile_photo',
          type: 'file',
          multiple: false,
          label: ''
        }
      ]
    }
  ]
};

const formNodes: FormNodes = [
  {
    ...schemaGenerators.formCard(),
    elements: [
      {
        key: 'contact-person',
        type: 'customComponent',
        componentName: 'base.IncrementedControlsArray',
        componentProps: {
          maxControlNodes: 1,
          forKey: 'contact_person',
          controlNodes: [{ ...formContactPersonFields }],
          incrementerButtonNode: {
            key: 'add-contact',
            type: 'button',
            variant: 'text',
            label: 'onboarding.companyDetails.contactPerson.addContactPerson'
          },
          decrementerButtonNode: {
            key: 'remove-contact',
            type: 'button',
            variant: 'error',
            label: 'onboarding.companyDetails.contactPerson.removeContactPerson'
          }
        }
      }
    ]
  },
  schemaGenerators.formFooter()
];

const formSchema: FormSchema = {
  type: 'object',
  properties: {
    contact_person: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          first_name: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              minLength: 'fieldIsRequired'
            }
          },
          last_name: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              minLength: 'fieldIsRequired'
            }
          },
          position: {
            type: 'string',
            minLength: 1,
            errorMessage: {
              minLength: 'fieldIsRequired'
            }
          },
          email: {
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
          contact_person_address: {
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
        }
      }
    }
  },
  additionalProperties: true,
  required: ['contact_person']
};

const formNodesAndSchema = {
  formNodes,
  formSchema
};

export default formNodesAndSchema;
