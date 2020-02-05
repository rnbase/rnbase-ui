import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

import { Themed, withTheme } from '../theming';

interface RowImageProps extends ViewProps {
  children?: React.ReactNode;
  imageSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
}

const RowImage: React.FC<Themed<typeof createStyleSheet, RowImageProps>> = ({
  theme: { styles },
  children,
  imageSource = {},
  style,
  imageStyle,
  ...props
}) => (
  <View {...props} style={[styles.root, style]}>
    {children || <Image source={imageSource} style={[styles.image, imageStyle]} />}
  </View>
);

const createStyleSheet = () =>
  StyleSheet.create({
    root: {
      flexShrink: 0,
      marginRight: 15,
    },
    image: {
      width: 29,
      height: 29,
    },
  });

export default withTheme(RowImage, createStyleSheet, 'Table.RowImage');
