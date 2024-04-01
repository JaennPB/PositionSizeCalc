/**
 *
 * @format
 */

import React from 'react';
import Main from './src/screens/Main';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <Main />
    </GluestackUIProvider>
  );
}

export default App;
