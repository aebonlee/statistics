import { useLanguage } from '../contexts/LanguageContext';
import { SITE_CONFIG as site } from '../config/site';
import type { ReactElement } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}

const SEOHead = ({ title, description, path = '', noindex = false }: SEOHeadProps): ReactElement => {
  const SITE = `${site.name} | ${site.nameKo}`;
  const BASE = site.url;
  const DEFAULT_DESC = site.description;
  const OG_IMAGE = `${BASE}/og-image.png`;
  const fullTitle = title ? `${title} | ${SITE}` : SITE;
  const desc = description || DEFAULT_DESC;

  useLanguage();

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`${BASE}${path}`} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`${BASE}${path}`} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </>
  );
};

export default SEOHead;
