import * as React from 'react';
import { render } from '@testing-library/react';
import 'jest-canvas-mock';
import SimpleToastProvider from '../src/store';

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <SimpleToastProvider>
        <div>Hello world!</div>
      </SimpleToastProvider>
    );
  });
});
