import {loadDevMessages, loadErrorMessages} from '@apollo/client/dev';

export default function loadApolloErrors() {
  if (!['prod', 'production'].includes(process.env.NODE_ENV)) {
    loadDevMessages();
    loadErrorMessages();
  }
}
