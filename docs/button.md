---
id: button
title: Button
---

TODO: Add Button Description

## Usage

```js
import { Button, TextButton, OutlineButton } from 'rnbase-ui';

// Solid button
<Button
  text="Button"
  imageSource={require('./src/assets/Search.png')}
  onPress={() => Alert.alert('Pressed', 'Button')}
/>

// Text button
<TextButton
  text="Button"
  imageSource={require('./src/assets/Search.png')}
  onPress={() => Alert.alert('Pressed', 'Button')}
/>

// Outline button
<OutlineButton
  text="Button"
  imageAlignment="right"
  imageSource={require('./src/assets/Search.png')}
  onPress={() => Alert.alert('Pressed', 'Button')}
/>
```

## Props

- [`children`](#children)
- [`disabled`](#disabled)
- [`style`](#style)
- [`text`](#text)
- [`textStyle`](#textstyle)
- [`imageSource`](#imagesource)
- [`imageStyle`](#imagestyle)
- [`imageAlignment`](#imagealignment)
- [...other inherited props](https://facebook.github.io/react-native/docs/touchableopacity#reference)

---

## Reference

### `children`

TODO: Add `children` Description

| Type      | Default | Required |
| :-------: | :-----: | :------: |
| ReactNode | -       | No       |

### `disabled`

TODO: Add `disabled` Description

| Type    | Default | Required |
| :-----: | :-----: | :------: |
| boolean | false   | No       |

### `style`

TODO: Add `style` Property Description

| Type       | Default | Required |
| :--------: | :-----: | :------: |
| View.style | -       | No       |

### `text`

TODO: Add `text` Property Description

| Type   | Default | Required |
| :----: | :-----: | :------: |
| string | -       | No       |

### `textStyle`

TODO: Add `textStyle` Property Description

| Type       | Default | Required |
| :--------: | :-----: | :------: |
| Text.style | -       | No       |

### `imageSource`

TODO: Add `imageSource` Property Description

| Type                | Default | Required |
| :-----------------: | :-----: | :------: |
| ImageSourcePropType | -       | No       |

### `imageStyle`

TODO: Add `imageStyle` Property Description

| Type        | Default | Required |
| :---------: | :-----: | :------: |
| Image.style | -       | No       |

### `imageAlignment`

TODO: Add `imageAlignment` Property Description

| Type                  | Default | Required |
| :-------------------: | :-----: | :------: |
| enum(`left`, `right`) | `left`  | No       |
