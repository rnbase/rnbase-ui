import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { Themed, withTheme } from '../theming';

interface FieldsetProps extends ViewProps {}

const Fieldset: React.FC<Themed<typeof createStyleSheet, FieldsetProps>> = ({
  theme: { styles },
  children,
  style,
  ...props
}) => (
  <View {...props} style={[styles.root, style]}>
    {children}
  </View>
);

const createStyleSheet = () =>
  StyleSheet.create({
    root: {
      marginVertical: 15,
    },
  });

export default withTheme(Fieldset, createStyleSheet, 'Form.Fieldset');
