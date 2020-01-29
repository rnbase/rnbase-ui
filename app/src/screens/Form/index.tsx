import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, TextInput } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Button, Field, Theme, useTheme } from 'rnbase-ui';

type NavigationState = {
  params: {};
};

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

const FormScreen: React.FC<Props> = () => {
  const {
    theme: { styles },
  } = useTheme(createStyles);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Field label="Email" isError={true} error="invalid email">
          <TextInput value="invalid@email" style={styles.input} />
        </Field>
        <Field label="Name" isError={false} error="" separator={false}>
          <TextInput value="John Smith" style={styles.input} />
        </Field>
        <Button text="Update" style={styles.button} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      padding: 20,
    },
    input: {
      ...fonts.normal,
      height: 50,
      flexGrow: 1,
      fontSize: 18,
      flexShrink: 1,
      borderWidth: 0,
      paddingVertical: 0,
      paddingHorizontal: 15,
      backgroundColor: colors.transparent,
    },
    button: {
      marginTop: 25,
    },
  });

export default FormScreen;
