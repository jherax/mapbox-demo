import {render, screen} from '@testing-library/react';

import Rentalscape from '../Rentalscape';

describe('Testing <Rentalscape/>', () => {
  test('renders 2 child sections', () => {
    render(<Rentalscape />);
    const container = screen.getByTestId('main_wrapper');
    expect(container.childNodes).toHaveLength(2);
    expect(container).toBeInTheDocument();
  });
});
