import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url }) => {
  const siteName = 'DMCE Computer Engineering';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Datta Meghe College of Engineering (DMCE) - Department of Computer Engineering. Empowering engineers to lead, innovate, and excel in the global landscape of technology.';
  const defaultKeywords = 'DMCE, Datta Meghe College of Engineering, Computer Engineering, Airoli, Engineering College Mumbai, B.E. Computer, SIMS';
  const siteUrl = window.location.origin;
  const currentUrl = url ? `${siteUrl}${url}` : window.location.href;
  const defaultImage = `${siteUrl}/assets/dmce_logo_new.png`; // Fallback to dmce logo

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={currentUrl} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={defaultImage} />
    </Helmet>
  );
};

export default SEO;
