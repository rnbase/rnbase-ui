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
  ViewStyle,
} from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

interface RowProps extends ViewProps {
  children?: React.ReactNode;
  height?: number;
  image?: ImageSourcePropType | React.ReactElement;
  title?: string;
  subtitle?: string;
  detail?: string | React.ReactElement;
  activeOpacity?: number;
  underlayColor?: string;
  disclosureIndicator?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  detailStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

const Row: React.FC<Themed<typeof createStyleSheet, RowProps>> = ({
  theme: { styles, colors },
  children,
  height,
  image,
  title,
  subtitle,
  detail,
  activeOpacity = 1,
  underlayColor = colors.underlay,
  disclosureIndicator,
  style,
  imageStyle,
  titleStyle,
  subtitleStyle,
  contentStyle,
  detailStyle,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}) => {
  let rowImage;
  let rowDetail;

  if (React.isValidElement(image)) {
    rowImage = <View style={[styles.imageView, imageStyle]}>{image}</View>;
  } else if (image) {
    rowImage = (
      <View style={styles.imageView}>
        <Image source={image} style={[styles.image, imageStyle]} />
      </View>
    );
  }

  if (React.isValidElement(detail)) {
    rowDetail = <View style={[styles.detailView, detailStyle]}>{detail}</View>;
  } else if (detail) {
    rowDetail = (
      <View style={styles.detailView}>
        <Text style={[styles.detail, detailStyle]} numberOfLines={1}>
          {detail}
        </Text>
      </View>
    );
  }

  const minHeight = height || subtitle ? 58 : 43;

  const container = (
    <View {...props} style={[{ minHeight }, styles.root, style]}>
      {rowImage}
      <View style={[styles.content, contentStyle]}>
        {children || [
          title && (
            <Text key="title" style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          ),
          subtitle && (
            <Text key="subtitle" style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
              {subtitle}
            </Text>
          ),
        ]}
      </View>
      {rowDetail}
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
        {container}
      </TouchableHighlight>
    );
  }

  return container;
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
    imageView: {
      flexShrink: 0,
      marginRight: 15,
    },
    image: {
      width: 29,
      height: 29,
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
    detailView: {
      marginLeft: 10,
    },
    detail: {
      ...fonts.normal,
      fontSize: 17,
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
