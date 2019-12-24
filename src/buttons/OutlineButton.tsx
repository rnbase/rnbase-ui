import React from 'react';

import Button, { Props } from './Button';

const OutlineButton: React.FC<Props> = props => <Button themeKey="OutlineButton" {...props} />;

export default OutlineButton;
