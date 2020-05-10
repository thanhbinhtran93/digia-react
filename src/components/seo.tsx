import React from 'react';
import { Helmet } from 'react-helmet';

export const SEO: React.FC = () => {
  return (
    <Helmet>
      <title>Digia React</title>
      <meta name="description" content="Digia React signup application" />
    </Helmet>
  );
};
