import {render, screen} from '@testing-library/react';

import ResolveView from '../index';

describe('Testing <ResolveView />', () => {
  it('should render the default view correctly', async () => {
    const {asFragment} = render(
      <ResolveView>
        <p>Default View</p>
      </ResolveView>,
    );

    expect(await screen.findByText('Default View')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when the loading is true', async () => {
    const {asFragment} = render(
      <ResolveView loading={true}>
        <p>Default View</p>
      </ResolveView>,
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Default View')).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when an error is present', async () => {
    const error = new Error('Something went wrong');
    const beforeError = jest.fn();
    const {asFragment} = render(
      <ResolveView error={error} beforeRenderError={beforeError}>
        <p>Default View</p>
      </ResolveView>,
    );

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('Default View')).not.toBeInTheDocument();
    expect(beforeError).toHaveBeenCalledTimes(1);
    expect(asFragment()).toMatchSnapshot();
  });
});
