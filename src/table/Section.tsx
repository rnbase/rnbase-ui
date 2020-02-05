import React, { Children, useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle, ViewProps } from 'react-native';

import { Theme, Themed, withTheme } from '../theming';

import Separator from './Separator';
import SectionHeader from './SectionHeader';
import SectionFooter from './SectionFooter';

interface SectionProps extends ViewProps {
  children: React.ReactNode;
  header?: string | React.ReactElement;
  footer?: string | React.ReactElement;
  separatorInsetLeft?: number;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  footerStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const Section: React.FC<Themed<typeof createStyleSheet, SectionProps>> = ({
  theme: { styles },
  children,
  header,
  footer,
  separatorInsetLeft,
  style,
  headerStyle,
  footerStyle,
  contentStyle,
  ...props
}) => {
  const [highlighted, setHighlighted] = useState();

  const rootStyles = [
    {
      marginTop: header ? 13 : 15,
      marginBottom: footer ? 9 : 20,
    },
    style,
  ];

  let rowIndex = 0;
  let imageInset = false;

  Children.forEach(children, child => {
    if (React.isValidElement(child) && child.props.image) {
      imageInset = true;
    }
  });

  let headerComponent;
  let footerComponent;

  if (React.isValidElement(header)) {
    headerComponent = <SectionHeader style={headerStyle}>{header}</SectionHeader>;
  } else if (header) {
    headerComponent = <SectionHeader text={header} textStyle={headerStyle} />;
  }

  if (React.isValidElement(footer)) {
    footerComponent = <SectionFooter style={footerStyle}>{footer}</SectionFooter>;
  } else if (header) {
    footerComponent = <SectionFooter text={footer} textStyle={footerStyle} />;
  }

  return (
    <View {...props} style={rootStyles}>
      {headerComponent}
      <View style={[styles.content, contentStyle]}>
        {Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return child;
          }

          let index = rowIndex++;

          const row = React.cloneElement(child, {
            imageInset,
            onPressIn: () => setHighlighted(index),
            onPressOut: () => setHighlighted(undefined),
          });

          if (index === 0) {
            return row;
          }

          return (
            <>
              <Separator
                insetLeft={imageInset ? 64 : separatorInsetLeft}
                highlighted={highlighted === index || highlighted === index - 1}
              />
              {row}
            </>
          );
        })}
      </View>
      {footerComponent}
    </View>
  );
};

const createStyleSheet = ({ colors }: Theme) =>
  StyleSheet.create({
    content: {
      backgroundColor: colors.white,
      borderColor: colors.separator,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });

export default withTheme(Section, createStyleSheet, 'Table.Section');
