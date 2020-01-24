import React from 'react';
import { Alert, StyleSheet, Switch, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Form, Theme, useTheme } from 'rnbase-ui';

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
    <View style={styles.root}>
      <Form.Title>Security</Form.Title>
      <Form.Fieldset>
        <Form.Row onPress={() => Alert.alert('Pressed')}>
          <Form.Label>Password</Form.Label>
          <Form.Action iconSource={require('../../assets/chevron-right.png')}>change</Form.Action>
        </Form.Row>
        <Form.Separator />
        <Form.Row>
          <Form.Label>Biometric sign in</Form.Label>
          <Switch />
        </Form.Row>
        <Form.Help>
          By enabling biometric sign in, you are approving that your password be saved to the device
          and protected by the device’s security.
        </Form.Help>
      </Form.Fieldset>
    </View>
  );
};

const createStyles = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    headerTitle: {
      ...fonts.bold,
      fontSize: 35,
      color: colors.black,
    },
  });

export default FormScreen;
