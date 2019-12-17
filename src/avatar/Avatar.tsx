import React, { useCallback, useMemo, useState } from 'react';
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

import { Theme as ThemeType, useTheme } from '../theming';

const getColor = (string: string) => {
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

const getInitials = (name: string) => {
  const initials = name.match(/\b\w/g) || [];

  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};

interface StyleProps {
  size: number;
  shape?: 'square' | 'circle';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

export interface Props extends ViewProps, StyleProps {
  name?: string;
  email?: string;
  image?: ImageSourcePropType;
  defaultImage?: ImageSourcePropType;
}

const Avatar: React.FC<Props> = ({
  size,
  name,
  email,
  shape,
  style,
  textStyle,
  imageStyle,
  image,
  defaultImage,
  ...props
}) => {
  const [imageSource, setImageSource] = useState(() => {
    if (image) {
      return image;
    } else if (email) {
      const h = md5(email.toLowerCase().trim());
      const s = PixelRatio.getPixelSizeForLayoutSize(size);

      return { uri: `https://www.gravatar.com/avatar/${h}?s=${s}&d=404` };
    }

    return defaultImage;
  });

  const onError = useCallback(() => setImageSource(defaultImage), [defaultImage]);

  const theme = useTheme();

  const styles = useMemo(
    () => createStyleSheet(theme, { size, shape, style, imageStyle, textStyle }),
    [theme, size, shape, style, imageStyle, textStyle],
  );

  if (name && imageSource === defaultImage) {
    const bgColor = {
      backgroundColor: getColor(name),
    };

    return (
      <View {...props} style={[styles.wrapper, bgColor]}>
        <Text style={styles.text} numberOfLines={1}>
          {getInitials(name)}
        </Text>
      </View>
    );
  }

  return !imageSource ? null : (
    <View {...props} style={styles.wrapper}>
      <Image style={styles.image} source={imageSource} onError={onError} />
    </View>
  );
};

Avatar.defaultProps = {
  shape: 'circle',
  defaultImage: require('./default.png'),
};

const createStyleSheet = ({ Colors, Fonts, Avatar: Theme }: ThemeType, props: StyleProps) =>
  StyleSheet.create({
    wrapper: {
      width: props.size,
      height: props.size,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: props.shape === 'circle' ? props.size / 2 : 0,
      ...(Theme && Theme.wrapper),
      ...(props.style as object),
    },
    image: {
      width: '100%',
      height: '100%',
      ...(Theme && Theme.image),
      ...(props.imageStyle as object),
    },
    text: {
      ...Fonts.bold,
      color: Colors.white,
      lineHeight: props.size / 2,
      fontSize: PixelRatio.roundToNearestPixel(props.size / 2.5),
      ...(Theme && Theme.text),
      ...(props.textStyle as object),
    },
  });

export default Avatar;
