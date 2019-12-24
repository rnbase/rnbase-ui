import React from 'react';

import Button, { Props } from './Button';

const TextButton: React.FC<Props> = props => <Button themeKey="TextButton" {...props} />;

export default TextButton;
