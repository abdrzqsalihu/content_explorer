import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return require('react').createElement('img', props);
  },
}));