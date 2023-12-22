import styled from 'styled-components';

const Wrapper = styled.section`
  background: #fff;
  width: 300px;
  height: 100%;
  padding: 0px;
  box-sizing: border-box;
  text-decoration: none solid #091a26;
  color: #091a26;
  section {
    margin: 0 1rem;
    border-bottom: 1px solid #00a3a3;
  }
`;

const HeaderContainer = styled.header`
  section#box-titles {
    margin-top: 1.5rem;
    div#box-image {
      img {
        width: 75%;
        margin-bottom: 2rem;
      }
    }
    div#box-title {
      padding-bottom: 20px;
      h1 {
        margin: 0 0 -5px 0;
        font-size: 37.5px;
        font-weight: 700;
        line-height: 45px;
      }
      h2 {
        margin: 10px 0 0 0;
        font-size: 30px;
        font-weight: 300;
        line-height: 40px;
        letter-spacing: 3px;
        text-decoration: none solid #00a3a3;
        color: #00a3a3;
      }
    }
  }
  section#box-region-logo {
    padding: 20px 0;
    img {
      max-width: 100%;
    }
  }
`;

const StatsContainer = styled.article`
  ul {
    margin-top: -10px;
    padding-left: 0;
  }
`;

const StatsItem = styled.li<{$bulletColor?: string}>`
  list-style-type: none;
  position: relative;
  padding-left: 1.7rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5rem;
  span {
    margin-right: 6px;
    font-weight: 700;
  }
  &::before {
    content: ' ';
    margin-top: 0.25rem;
    position: absolute;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.$bulletColor ?? '#00aaab'};
    color: ${props => props.$bulletColor ?? '#00aaab'};
  }
`;

const LinksContainer = styled.article`
  section {
    border-bottom: none;
    padding: 1.25rem 0;
    h2 {
      margin: 0 0 0.75rem;
    }
    ul {
      margin: 0;
      padding-left: 1.25rem;
      color: #015976;
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.5rem;
      letter-spacing: 0.025em;
      li {
        margin-bottom: 0.5rem;
      }
      a {
        margin-left: 6px;
        word-break: break-all;
        color: inherit;
      }
    }
  }
`;

const FooterContainer = styled.footer`
  padding: 1rem 1.5rem;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 200;
  line-height: 1.25rem;
  background-color: #091a26;
  p {
    margin: 0;
  }
`;

export default function Sidebar(props: SidebarProps) {
  return (
    <Wrapper id='Sidebar'>
      <HeaderContainer>
        <section id='box-titles'>
          <div id='box-image'>
            <img
              alt='Rentalscape'
              src='https://placer-ca-str-public-portal.deckard.com/rental-scape-logo.png'
            />
          </div>
          <div id='box-title'>
            <h1>Short-Term Rental (STR)</h1>
            <h2>PUBLIC PORTAL</h2>
          </div>
        </section>
        <section id='box-region-logo'>
          <img src={props.regionLogo} alt='region logo' />
        </section>
      </HeaderContainer>

      <StatsContainer>
        <section>
          <h2>Program Stats</h2>
          <ul>
            {props.legends.map((item, i) => (
              <StatsItem key={`li-legend-${i}`} $bulletColor={item.bulletColor}>
                <div>
                  <span>{item.count}</span>
                  <label>{item.label}</label>
                </div>
              </StatsItem>
            ))}
          </ul>
        </section>
      </StatsContainer>

      <LinksContainer>
        <section>
          <h2>Useful Links</h2>
          <ul>
            {props.links.map((item, i) => (
              <li key={`li-link-${i}`}>
                <span>{item.label}</span>
                <a href={item.rawValue} rel='noopener noreferrer nofollow'>
                  {item.showValue}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </LinksContainer>

      <FooterContainer>
        <p>Powered by Rentalscape</p>
        <p>Engineered by DECKARD TECHNOLOGIES</p>
      </FooterContainer>
    </Wrapper>
  );
}

export type SidebarProps = Readonly<{
  regionLogo: string;
  legends: Array<{
    count: number;
    label: string;
    bulletColor: string;
  }>;
  links: Array<{
    label: string;
    showValue: string;
    rawValue: string;
  }>;
}>;
