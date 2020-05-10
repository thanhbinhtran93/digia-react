import React from 'react';
import { Hero } from './components/hero';
import { Layout } from './components/layout';
import { SEO } from './components/seo';
import { ParticipantList } from 'components/participant-list';
import { ParticipantProvider } from 'contexts/participant-context';
import { NewParticipant } from 'components/new-participant';

function App() {
  return (
    <>
      <Hero />
      <Layout>
        <SEO />
        <h1>List of participants</h1>
        <ParticipantProvider>
          <NewParticipant />
          <ParticipantList />
        </ParticipantProvider>
      </Layout>
    </>
  );
}

export default App;
