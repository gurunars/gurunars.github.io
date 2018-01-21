import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import SampleComponent from '.';

storiesOf('SampleComponent', module)
  .addDecorator(centered)
  .add('basic', () => (
    <SampleComponent title="Sample Title" onClick={action('onClick')} />
  ));
