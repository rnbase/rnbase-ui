import React, { useCallback, useEffect, useMemo, useState } from 'react';
import md5 from 'js-md5';
import {
  Image,
  ImageStyle,
  ImageSourcePropType,
  PixelRatio,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import { Theme, useThemeStyles } from '../theming';

const getColor = (string: string): string => {
  let hash = 0;

  if (string.length > 0) {
    for (let i = 0; i < string.length; i += 1) {
      /* eslint-disable no-bitwise */
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash &= hash;
      /* eslint-enable no-bitwise */
    }
  }

  return `hsl(${hash % 360}, 75%, 50%)`;
};

const getInitials = (name: string): string => {
  const initials = name.match(/\b\w/g) || [];

  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};

export interface Props extends ViewProps {
  size: number;
  shape?: 'square' | 'circle';
  name?: string;
  email?: string;
  image?: ImageSourcePropType;
  defaultImage?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const Avatar: React.FC<Props> = ({
  size,
  shape,
  name,
  email,
  image,
  defaultImage,
  style,
  textStyle,
  imageStyle,
  ...props
}) => {
  const getImageSource = useCallback(() => {
    if (image) {
      return image;
    } else if (email) {
      const emailHash = md5(email.toLowerCase().trim());
      const pixelSize = PixelRatio.getPixelSizeForLayoutSize(size);
      return { uri: `https://www.gravatar.com/avatar/${emailHash}?s=${pixelSize}&d=404` };
    } else {
      return defaultImage;
    }
  }, [image, email, defaultImage, size]);

  const [imageSource, setImageSource] = useState(getImageSource);

  useEffect(() => setImageSource(getImageSource()), [getImageSource, setImageSource]);

  const onError = useCallback(() => setImageSource(defaultImage), [defaultImage]);

  const styles = useThemeStyles(createStyleSheet, 'Avatar');

  const rootShape = {
    width: size,
    height: size,
    borderRadius: shape === 'circle' ? size / 2 : 0,
  };

  const initials = useMemo(
    () =>
      name &&
      imageSource === defaultImage && {
        color: getColor(name),
        text: getInitials(name),
      },
    [defaultImage, imageSource, name],
  );

  if (initials) {
    const rootBgColor = {
      backgroundColor: initials.color,
    };

    const textFontSize = {
      fontSize: PixelRatio.roundToNearestPixel(size / 2.5),
    };

    return (
      <View {...props} style={[styles.root, rootShape, rootBgColor, style]}>
        <Text style={[styles.text, textFontSize, textStyle]} numberOfLines={1}>
          {initials.text}
        </Text>
      </View>
    );
  }

  return !imageSource ? null : (
    <View {...props} style={[styles.root, rootShape, style]}>
      <Image style={[styles.image, imageStyle]} source={imageSource} onError={onError} />
    </View>
  );
};

Avatar.defaultProps = {
  shape: 'circle',
  defaultImage: require('./default.png'),
};

const createStyleSheet = ({ Colors, Fonts }: Theme) =>
  StyleSheet.create({
    root: {
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.gray,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    text: {
      ...Fonts.bold,
      color: Colors.white,
    },
  });

export default Avatar;
