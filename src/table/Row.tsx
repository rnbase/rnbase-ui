import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewProps,
} from 'react-native';

import { Theme, Themed, withTheme } from '../theming';
import RowImage from './RowImage';

interface RowProps extends ViewProps {
  children?: React.ReactNode;
  height?: number;
  title?: string;
  subtitle?: string;
  image?: ImageSourcePropType | React.ReactElement;
  activeOpacity?: number;
  underlayColor?: string;
  disclosureIndicator?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

const Row: React.FC<Themed<typeof createStyleSheet, RowProps>> = ({
  theme: { styles, colors },
  children,
  height,
  title,
  subtitle,
  image,
  activeOpacity = 1,
  underlayColor = colors.underlay,
  disclosureIndicator,
  style,
  titleStyle,
  subtitleStyle,
  imageStyle,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const minHeight = height || subtitle ? 58 : 43;

  let imageComponent;

  if (React.isValidElement(image)) {
    imageComponent = <RowImage style={imageStyle}>{image}</RowImage>;
  } else if (image) {
    imageComponent = <RowImage imageSource={image} imageStyle={imageStyle} />;
  }

  const content = (
    <View {...props} style={[{ minHeight }, styles.root, style]}>
      {imageComponent}
      <View style={styles.content}>
        {title && (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {children}
      {disclosureIndicator !== false && (onPress || disclosureIndicator) && (
        <Image
          source={require('./assets/disclosure-indicator.png')}
          style={styles.disclosureIndicator}
        />
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableHighlight
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
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
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
    },
    content: {
      flexGrow: 1,
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
    disclosureIndicator: {
      width: 8,
      height: 12,
      flexShrink: 0,
      marginLeft: 10,
      tintColor: colors.gray3,
    },
  });

export default withTheme(Row, createStyleSheet, 'Table.Row');
