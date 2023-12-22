import {render, screen, within} from '@testing-library/react';

import Sidebar, {type SidebarProps} from '../index';

describe('Testing <Sidebar />', () => {
  it('should render correctly when all expected properties are present', async () => {
    const props: SidebarProps = {
      regionLogo:
        'https://images.wikia.com/halo/es/images/e/e3/BioShock_LE_Logo.png',
      legends: [
        {
          count: 3334,
          label: 'Licensed Short-Term Rental properties',
          bulletColor: '#00AAAB',
        },
      ],
      links: [
        {
          label: '24/7 hotline: ',
          showValue: '530-448-8003',
          rawValue: 'tel:530-448-8003',
        },
        {
          label: 'Complaint email: ',
          showValue: 'strcompliance@placer.ca.gov',
          rawValue: 'mailto:strcompliance@placer.ca.gov',
        },
      ],
    };

    const {asFragment} = render(<Sidebar {...props}></Sidebar>);
    const legends = getParent(screen.getByText('Program Stats'));
    const links = getParent(screen.getByText('Useful Links'));

    expect(within(legends).getAllByRole('listitem')).toHaveLength(1);
    expect(within(links).getAllByRole('listitem')).toHaveLength(2);
    expect(asFragment()).toMatchSnapshot();
  });
});

function getParent(element: HTMLElement): HTMLElement {
  return element.parentElement as HTMLElement;
}
