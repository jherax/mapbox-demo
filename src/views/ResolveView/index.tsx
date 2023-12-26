import {type ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 50px;
`;

export default function ResolveView(props: ResolveViewProps) {
  if (props.loading) {
    return (
      <Wrapper className='ResolveView_loading'>
        <pre>Loading...</pre>
      </Wrapper>
    );
  }

  if (props.error) {
    if (typeof props.beforeRenderError === 'function') {
      props.beforeRenderError();
    }
    return (
      <Wrapper className='ResolveView_error'>
        <pre>{props.error.message}</pre>
      </Wrapper>
    );
  }

  return <>{props.children}</>;
}

export type ResolveViewProps = Readonly<
  Partial<{
    loading: boolean;
    error: {
      message: string;
    };
    children: ReactNode;
    beforeRenderError: () => void;
  }>
>;
