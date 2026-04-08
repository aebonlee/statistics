import { useLanguage } from '../contexts/LanguageContext';
import { signInWithGoogle, signInWithKakao } from '../utils/auth';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

export default function Login(): ReactElement {
  const { language } = useLanguage();
  const isKo = language === 'ko';

  return (
    <>
      <SEOHead title={isKo ? '로그인' : 'Login'} path="/login" />
      <div className="auth-page">
        <div className="auth-card">
          <h1>{isKo ? '로그인' : 'Sign In'}</h1>
          <p className="auth-subtitle">
            {isKo ? 'DreamIT Statistics에 로그인하세요' : 'Sign in to DreamIT Statistics'}
          </p>
          <div className="auth-buttons">
            <button className="auth-btn google" onClick={() => signInWithGoogle()}>
              <i className="fa-brands fa-google" />
              {isKo ? 'Google로 로그인' : 'Sign in with Google'}
            </button>
            <button className="auth-btn kakao" onClick={() => signInWithKakao()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.035 5.91l-.822 3.05a.5.5 0 0 0 .756.542l3.623-2.396c.787.104 1.59.157 2.408.157 5.523 0 10-3.477 10-7.763C22 6.477 17.523 3 12 3z"/></svg>
              {isKo ? '카카오로 로그인' : 'Sign in with Kakao'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
