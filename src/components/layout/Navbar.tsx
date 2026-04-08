import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import type { ReactElement } from 'react';

const NAV_ITEMS = [
  { path: '/descriptive-statistics', ko: '기술통계', en: 'Descriptive' },
  { path: '/probability', ko: '확률론', en: 'Probability' },
  { path: '/inferential-statistics', ko: '추론통계', en: 'Inference' },
  { path: '/hypothesis-testing', ko: '가설검정', en: 'Hypothesis' },
  { path: '/regression', ko: '회귀분석', en: 'Regression' },
  { path: '/anova', ko: '분산분석', en: 'ANOVA' },
  { path: '/nonparametric', ko: '비모수통계', en: 'Nonparametric' },
  { path: '/bayesian', ko: '베이지안', en: 'Bayesian' },
];

export default function Navbar(): ReactElement {
  const { mode, toggleTheme, colorTheme, setColorTheme, COLOR_OPTIONS } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { isLoggedIn, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const isKo = language === 'ko';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e: Event) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) setShowColorPicker(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeIconClass = mode === 'auto' ? 'fa-circle-half-stroke' : mode === 'light' ? 'fa-sun' : 'fa-moon';

  const displayName = profile?.display_name || profile?.email?.split('@')[0] || '';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="logo-study">Stat</span>
            <span className="logo-master">Master</span>
          </Link>

          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                >
                  {isKo ? item.ko : item.en}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <div className="color-picker-wrapper" ref={colorPickerRef}>
              <button className="color-picker-btn" onClick={() => setShowColorPicker(!showColorPicker)} title="Color Theme">
                <div className="color-dot-preview" style={{ background: COLOR_OPTIONS.find(c => c.name === colorTheme)?.color }} />
              </button>
              <div className={`color-picker-dropdown ${showColorPicker ? 'show' : ''}`}>
                {COLOR_OPTIONS.map(opt => (
                  <button
                    key={opt.name}
                    className={`color-option ${colorTheme === opt.name ? 'active' : ''}`}
                    style={{ background: opt.color }}
                    onClick={() => { setColorTheme(opt.name); setShowColorPicker(false); }}
                    title={opt.name}
                  />
                ))}
              </div>
            </div>

            <button className="theme-toggle" onClick={toggleTheme} title={mode}>
              <i className={`fa-solid ${themeIconClass}`} />
            </button>

            <button className="lang-toggle" onClick={toggleLanguage}>
              {language === 'ko' ? 'EN' : 'KO'}
            </button>

            {isLoggedIn ? (
              <div className="nav-auth-group">
                <button className="user-avatar-btn" onClick={handleSignOut} title={isKo ? '로그아웃' : 'Sign Out'}>
                  {avatarLetter}
                </button>
              </div>
            ) : (
              <div className="nav-auth-group">
                <Link to="/login" className="nav-auth-btn nav-login-btn">
                  {isKo ? '로그인' : 'Login'}
                </Link>
              </div>
            )}

            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="mobile-nav-link">
                {isKo ? item.ko : item.en}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-actions">
          {isLoggedIn ? (
            <button className="nav-auth-btn" onClick={handleSignOut}>
              {isKo ? '로그아웃' : 'Sign Out'}
            </button>
          ) : (
            <Link to="/login" className="nav-auth-btn">
              {isKo ? '로그인' : 'Login'}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
