import * as React from 'react';
import { render } from '@testing-library/react';
import 'jest-canvas-mock';
import SimpleToastProvider from '../src/store';

describe('Simple toast provider render', () => {
  it('renders SimpleToastProvider without crashing', () => {
    render(
      <SimpleToastProvider>
        <div>Hello world!</div>
      </SimpleToastProvider>
    );
  });
});
