import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Foo from './Foo';

storiesOf('Button', module)
  .add('basic', () => (
    <Foo />
  )); 