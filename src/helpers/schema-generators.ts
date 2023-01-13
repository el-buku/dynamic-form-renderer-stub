import { OnboardingEventName } from '../schemas/event-names';
import {
    FormNode,
    InterpolatedLabel,
    LabelNode,
    LayoutNode,
    LayoutOptions
} from '../schemas/layout-schema';

const formFooter = (isLastStep?: boolean, nextTransition?: OnboardingEventName): LayoutNode => ({
    type: 'layout',
    direction: 'horizontal',
    options: {
        p: 5,
        boxSizing: 'border-box',
        mt: 5,
        boxShadow: 'card',
        bgColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    elements: [
        {
            type: 'layout',
            direction: 'horizontal',
            options: {
                w: 'full',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 4
            },
            elements: [
                {
                    key: 'button-back',
                    variant: 'secondary',
                    type: 'button',
                    label: 'onboarding.actions.back',
                    transition: 'PREVIOUS'
                },
                {
                    key: 'button-save-for-later',
                    variant: 'text',
                    type: 'button',
                    label: 'onboarding.actions.saveForLater',
                    transition: 'SAVE'
                }
            ]
        },
        {
            key: 'button-next',
            variant: 'base',
            type: 'button',
            label: isLastStep ? 'onboarding.actions.finishStep' : 'onboarding.actions.next',
            transition: nextTransition || 'NEXT'
        }
    ]
});

const formActionButtons = (
    elements: { transition: OnboardingEventName; label: string }[]
): LayoutNode => ({
    type: 'layout',
    direction: 'horizontal',
    options: {
        pt: 8
    },
    elements: elements.map((el, index) => ({
        key: `button${index}`,
        variant: (index === 0 && 'secondary') || 'base',
        type: 'button',
        ...el
    }))
});

// generates base form card
const formCard = (
    options?: LayoutOptions,
    labelNode?: LabelNode,
    elements?: LayoutNode[]
): LayoutNode => ({
    type: 'layout',
    direction: 'vertical',
    options: { p: 5, boxShadow: 'card', mb: 8, bgColor: 'white', ...options },
    elements: elements || [],
    labelNode
});

// generates composable layouts containing infobox and admin notes components
const formCardInfoNotes = ({
    formNodes,
    infoboxText,
    infoboxTitle = 'onboarding.infoboxHeading',
    infoboxType = 'info',
    nodeKey
}: {
    formNodes: FormNode[];
    infoboxText?: InterpolatedLabel;
    infoboxTitle?: InterpolatedLabel;
    infoboxType?: 'info' | 'warning';
    nodeKey: string;
}): LayoutNode => ({
    type: 'layout',
    direction: 'horizontal',
    options: {
        wrap: 'wrap',
        justifyContent: 'start',
        p: 5,
        boxShadow: 'card',
        mb: 8,
        bgColor: 'white'
    },
    elements: [
        {
            type: 'layout',
            direction: 'vertical',
            options: {
                h: 'unset',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                w: 'unset',
                flexGrow: 2.5,
                mb: 0,
                maxWidth: {
                    xl: '67%'
                },
                pr: {
                    xl: '20px'
                }
            },
            elements: formNodes
        },
        {
            type: 'layout',
            direction: 'vertical',
            options: {
                w: 'unset',
                maxW: {
                    md: 'full',
                    xl: '33%'
                },
                p: 5,
                flexGrow: 1,
                alignItems: 'center',
                fontSize: 'sm'
            },
            elements: [
                {
                    key: `${nodeKey}.infobox`,
                    type: 'customComponent',
                    componentName: 'base.Infobox',
                    componentProps: {
                        infoboxTitle,
                        infoboxText,
                        infoboxType
                    }
                },
                {
                    key: `${nodeKey}.admin_notes`,
                    type: 'customComponent',
                    componentName: 'base.AdminNotes',
                    componentProps: {
                        nodeKey: `${nodeKey}.admin_notes`
                    }
                }
            ]
        }
    ]
});

export { formFooter, formCard, formCardInfoNotes, formActionButtons };
