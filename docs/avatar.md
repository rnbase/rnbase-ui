---
id: avatar
title: Avatar
---

TODO: Add Avatar Description

## Usage

```js
import { Avatar } from 'rnbase-ui';

// Standard Avatar
<Avatar
  size={50}
  imageSource={{
    uri: 'https://randomuser.me/api/portraits/women/68.jpg'
  }}
/>

// Avatar with initials
<Avatar size={50} name="Elon Musk" colorize={true} />

// Gravatar
<Avatar size={50} email="user@email.com" />
```

## Props

- [`size`](#size)
- [`shape`](#shape)
- [`name`](#name)
- [`email`](#email)
- [`colorize`](#colorize)
- [`imageSource`](#imagesource)
- [`defaultImageSource`](#defaultimagesource)
- [`style`](#style)
- [`textStyle`](#textstyle)
- [`imageStyle`](#imagestyle)

---

## Reference

### `size`

TODO: Add `size` Property Description

| Type   | Default | Required |
| :----: | :-----: | :------: |
| number | -       | Yes      |

### `shape`

TODO: Add `shape` Property Description

| Type                     | Default  | Required |
| :----------------------: | :------: | :------: |
| enum(`square`, `circle`) | `circle` | No       |

### `name`

TODO: Add `name` Property Description

| Type   | Default | Required |
| :----: | :-----: | :------: |
| string | -       | No       |

### `email`

TODO: Add `email` Property Description

| Type   | Default | Required |
| :----: | :-----: | :------: |
| string | -       | No       |

### `colorize`

TODO: Add `colorize` Property Description

| Type    | Default | Required |
| :-----: | :-----: | :------: |
| boolean | false   | No       |

### `imageSource`

TODO: Add `imageSource` Property Description

| Type                | Default | Required |
| :-----------------: | :-----: | :------: |
| ImageSourcePropType | -       | No       |

### `defaultImageSource`

TODO: Add `defaultImageSource` Property Description

| Type                | Default | Required |
| :-----------------: | :-----: | :------: |
| ImageSourcePropType | -       | No       |

### `style`

TODO: Add `style` Property Description

| Type       | Default | Required |
| :--------: | :-----: | :------: |
| View.style | -       | No       |

### `textStyle`

TODO: Add `textStyle` Property Description

| Type       | Default | Required |
| :--------: | :-----: | :------: |
| Text.style | -       | No       |

### `imageStyle`

TODO: Add `imageStyle` Property Description

| Type        | Default | Required |
| :---------: | :-----: | :------: |
| Image.style | -       | No       |
