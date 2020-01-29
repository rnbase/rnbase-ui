import React, { useCallback, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Formik } from 'formik';

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

  const [initialValues] = useState(() => ({
    email: 'john.smith@gmail.com',
    name: 'John Smith',
  }));

  const handleFormikSubmit = useCallback(() => {
    Alert.alert('Submitted');
  }, []);

  const validate = useCallback(values => {
    const errors: any = {};

    if (!values.email) {
      errors.email = 'required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'invalid email';
    }

    if (!values.name) {
      errors.name = 'required';
    }

    return errors;
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Formik initialValues={initialValues} onSubmit={handleFormikSubmit} validate={validate}>
          {({ handleBlur, handleChange, handleSubmit, isValid, errors, touched, values }) => (
            <View>
              <Field label="Email" touch={touched.email} error={errors.email}>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                />
              </Field>
              <Field label="Name" touch={touched.name} error={errors.name} separator={false}>
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.input}
                />
              </Field>
              <Button
                text="Update"
                style={styles.button}
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
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
