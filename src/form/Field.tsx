// @flow

import React from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface FieldProps {
  children: React.ReactNode;
  error: React.ReactNode;
  isError: boolean;
  style?: StyleProp<ViewStyle>;
  label?: string;
  separator?: boolean;
  separatorStyle?: StyleProp<ViewStyle>;
}

const Field: React.FC<Themed<typeof createStyleSheet, FieldProps>> = ({
  theme: { styles },
  error,
  isError,
  label,
  children,
  separator = true,
  separatorStyle,
}) => (
  <View style={styles.root}>
    {label && (
      <View style={styles.heading}>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
        {isError && (
          <Text style={[styles.label, styles.labelError]} numberOfLines={1}>
            {error}
          </Text>
        )}
      </View>
    )}
    <View style={styles.field}>
      {children}
      {isError && <Image style={styles.errorIcon} source={require('../assets/error.png')} />}
    </View>
    {separator && <View style={[styles.separator, separatorStyle]} />}
  </View>
);

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {},
    heading: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      ...fonts.semibold,
      height: 11,
      fontSize: 11,
      lineHeight: 11,
      flexShrink: 1,
      marginTop: 16,
      marginBottom: 8,
      color: colors.black,
      textTransform: 'uppercase',
      backgroundColor: colors.white,
    },
    labelError: {
      flexShrink: 0,
      marginLeft: 10,
      color: colors.red,
      textTransform: 'none',
    },
    field: {
      borderRadius: 5,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.gray6,
    },
    errorIcon: {
      width: 21,
      height: 21,
      marginRight: 8,
    },
    separator: {
      height: 20,
    },
  });

export default withTheme(Field, createStyleSheet, 'Field');
