import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import type { ReactElement } from 'react';

export default function NotFound(): ReactElement {
  const { language } = useLanguage();
  const isKo = language === 'ko';

  return (
    <div style={{ textAlign: 'center', padding: '120px 20px 80px' }}>
      <h1 style={{ fontSize: 64, fontWeight: 900, color: 'var(--primary)' }}>404</h1>
      <p style={{ fontSize: 18, margin: '16px 0 32px', color: 'var(--text-secondary)' }}>
        {isKo ? '페이지를 찾을 수 없습니다.' : 'Page not found.'}
      </p>
      <Link to="/" className="btn btn-primary-large">
        {isKo ? '홈으로 돌아가기' : 'Go Home'}
      </Link>
    </div>
  );
}
