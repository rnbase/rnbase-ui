import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewProps,
} from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface RowProps extends ViewProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  activeOpacity?: number;
  underlayColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Row: React.FC<Themed<typeof createStyleSheet, RowProps>> = ({
  theme: { styles, colors },
  children,
  title,
  subtitle,
  activeOpacity = 1,
  underlayColor = colors.underlay,
  style,
  titleStyle,
  subtitleStyle,
  onPress,
  ...props
}) => {
  const titleText = title && (
    <Text key="title" style={[styles.title, titleStyle]} numberOfLines={1}>
      {title}
    </Text>
  );
  const subtitleText = subtitle && (
    <Text key="subtitle" style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
      {subtitle}
    </Text>
  );

  const label = !subtitle ? (
    titleText
  ) : (
    <View key="label" style={styles.label}>
      {titleText}
      {subtitleText}
    </View>
  );

  const content = (
    <View {...props} style={[styles.root, style]}>
      {label}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableHighlight
        onPress={onPress}
        activeOpacity={activeOpacity}
        underlayColor={underlayColor}
      >
        {content}
      </TouchableHighlight>
    );
  }

  return content;
};

const createStyleSheet = ({ colors, fonts }: Theme) =>
  StyleSheet.create({
    root: {
      minHeight: 43,
      flexWrap: 'nowrap',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
    },
    label: {
      minHeight: 50,
      justifyContent: 'center',
    },
    title: {
      ...fonts.normal,
      fontSize: 17,
      color: colors.black,
    },
    subtitle: {
      ...fonts.normal,
      fontSize: 12,
      marginTop: 3,
      color: colors.gray,
    },
  });

export default withTheme(Row, createStyleSheet, 'Form.Row');
