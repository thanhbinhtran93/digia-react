import React from 'react';
import { Hero } from './components/hero';
import { Layout } from './components/layout';
import { SEO } from './components/seo';

function App() {
  return (
    <>
      <Hero />
      <Layout>
        <SEO />
        <h1>List of participants</h1>
      </Layout>
    </>
  );
}

export default App;
