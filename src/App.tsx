import React from 'react';
import { Hero } from './components/Hero';
import { Layout } from './components/Layout';

import { SignUp } from 'pages/SignUp';

function App() {
  return (
    <React.Fragment>
      <Hero />
      <Layout>
        <SignUp />
      </Layout>
    </React.Fragment>
  );
}

export default App;
