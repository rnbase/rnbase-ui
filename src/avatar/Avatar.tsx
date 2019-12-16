import React from 'react';
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

import { Theme } from '../theming';
import ThemeContext from '../theming/ThemeContext';

export interface Props extends ViewProps {
  size: number;
  name?: string;
  email?: string;
  shape?: 'square' | 'circle';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  image?: ImageSourcePropType;
  defaultImage?: ImageSourcePropType;
}

interface State {
  imageSource?: ImageSourcePropType;
}

class AvatarImage extends React.PureComponent<Props, State> {
  static contextType = ThemeContext;
  static defaultProps = {
    name: undefined,
    email: undefined,
    shape: 'circle',
    style: undefined,
    image: undefined,
    defaultImage: require('./default.png'),
  };

  constructor(props: Props) {
    super(props);

    if (props.image) {
      this.state = {
        imageSource: props.image,
      };
    } else if (props.email) {
      const hash = md5(props.email.toLowerCase().trim());
      const size = PixelRatio.getPixelSizeForLayoutSize(props.size);

      this.state = {
        imageSource: { uri: `https://www.gravatar.com/avatar/${hash}?s=${size}&d=404` },
      };
    } else {
      this.state = {
        imageSource: props.defaultImage,
      };
    }
  }

  getColor = (string: string) => {
    let hash = 0;

    /* eslint-disable no-bitwise */
    if (string.length > 0) {
      for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
        hash &= hash;
      }
    }
    /* eslint-enable no-bitwise */

    return `hsl(${hash % 360}, 75%, 50%)`;
  };

  getInitials = (name: string) => {
    const initials = name.match(/\b\w/g) || [];

    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  };

  onError = () => {
    this.setState({ imageSource: this.props.defaultImage });
  };

  render() {
    const { imageSource } = this.state;
    const {
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
    } = this.props;

    const styles = createStyleSheet(this.context, this.props);

    if (name && imageSource === defaultImage) {
      const bgColor = {
        backgroundColor: this.getColor(name),
      };

      return (
        <View {...props} style={[styles.wrapper, bgColor, style]}>
          <Text style={[styles.text, textStyle]} numberOfLines={1}>
            {this.getInitials(name)}
          </Text>
        </View>
      );
    }

    return !imageSource ? null : (
      <View {...props} style={[styles.wrapper, style]}>
        <Image style={[styles.image, imageStyle]} source={imageSource} onError={this.onError} />
      </View>
    );
  }
}

const createStyleSheet = ({ Colors, Fonts }: Theme, { size, shape }: Props) =>
  StyleSheet.create({
    wrapper: {
      width: size,
      height: size,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: shape === 'circle' ? size / 2 : 0,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    text: {
      ...Fonts.bold,
      color: Colors.white,
      lineHeight: size / 2,
      fontSize: PixelRatio.roundToNearestPixel(size / 2.5),
    },
  });

export default AvatarImage;
