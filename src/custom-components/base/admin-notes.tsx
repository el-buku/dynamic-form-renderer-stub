import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '~/mocked-auth-context';
import { ReactComponent as NotesButton } from '~/assets/icons/notes-button.svg';
import { useAuthDataQuery } from '~/api/hooks/users';
import { TCustomComponentProps } from '../types';

const ADMIN_NOTES_BG = 'rgba(255, 230, 0, 0.2);';
const ADMIN_NOTES_ACCENT = '#F6A200';

export type TNoteEntry = {
  name: string;
  date: string;
  text: string;
};

function NoteEditor() {
  return null;
}

function NoteEntry({ date, name, text }: TNoteEntry) {
  return (
    <>
      <Text fontWeight={400}>{`${date} ${name}`}</Text>
      <Text fontWeight={300}>{text}</Text>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AdminNotes(props: TCustomComponentProps) {
  // const { componentProps } = props;
  const { userType } = useAuthContext();
  const { data: authData } = useAuthDataQuery();

  // TODO this will change
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { firstName, lastName } = authData || {};
  const mockEntries = [
    {
      name: `${firstName} ${lastName}`,
      date: new Date().toLocaleDateString('en-US'),
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.'
    },
    {
      name: `${firstName} ${lastName}`,
      date: new Date().toLocaleDateString('en-US'),
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.'
    }
  ];

  const { t } = useTranslation();

  const [isEditing] = useState<number | false>(false);
  const [notesEntries] = useState<TNoteEntry[]>(
    Math.random() > 0.66 ? mockEntries : mockEntries.slice(0, 1)
  );

  // const startEditing = (index: number) => {
  //   const newEntry = {
  //     name: `${firstName} ${lastName}`,
  //     date: new Date().toDateString(),
  //     text: ''
  //   };
  //   if (notesEntries.length) {
  //     setNotesEntries(notes => notes.splice(index, 1, newEntry));
  //   } else setNotesEntries([newEntry]);
  //   setIsEditing(index);
  // };
  // const stopEditing = () => setIsEditing(false);
  return (
    userType === 'admin' && (
      <Box bgColor={ADMIN_NOTES_BG} p={3} pt='3px' position='relative'>
        <Box cursor='pointer' position='absolute' top='-1px' right='8px'>
          <NotesButton />
        </Box>
        <Text fontWeight='semibold' fontSize='8px' color={ADMIN_NOTES_ACCENT}>
          {t('onboarding.internalNotes').toUpperCase()}
        </Text>
        {notesEntries.map((entry, index) =>
          isEditing === index ? <NoteEditor /> : <NoteEntry {...entry} />
        )}
      </Box>
    )
  );
}
export default AdminNotes;
