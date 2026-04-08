import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import type { ReactElement } from 'react';

export default function Footer(): ReactElement {
  const { language, t } = useLanguage();
  const isKo = language === 'ko';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="brand-study">Stat</span>
              <span className="brand-master"> Master</span>
            </div>
            <p className="footer-description">{t('footer.description')}</p>
            <p className="footer-description" style={{ marginTop: 8, fontSize: 13 }}>{t('footer.descriptionDetail')}</p>
          </div>

          <div className="footer-links">
            <h4>{t('footer.quickLinks')}</h4>
            <ul className="footer-link-list">
              <li><Link to="/descriptive-statistics">{isKo ? '기술통계학' : 'Descriptive'}</Link></li>
              <li><Link to="/probability">{isKo ? '확률론' : 'Probability'}</Link></li>
              <li><Link to="/inferential-statistics">{isKo ? '추론통계학' : 'Inference'}</Link></li>
              <li><Link to="/hypothesis-testing">{isKo ? '가설검정' : 'Hypothesis'}</Link></li>
              <li><Link to="/regression">{isKo ? '회귀분석' : 'Regression'}</Link></li>
              <li><Link to="/anova">{isKo ? '분산분석' : 'ANOVA'}</Link></li>
              <li><Link to="/nonparametric">{isKo ? '비모수통계' : 'Nonparametric'}</Link></li>
              <li><Link to="/bayesian">{isKo ? '베이지안통계' : 'Bayesian'}</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>{isKo ? '연락처' : 'Contact'}</h4>
            <p className="footer-email">
              <span className="footer-email-icon"><i className="fa-solid fa-envelope" /></span>
              <a href="mailto:aebon@dreamitbiz.com">aebon@dreamitbiz.com</a>
            </p>
            <p>010-3700-0629</p>
            <p>{isKo ? '카카오톡' : 'KakaoTalk'}: aebon</p>
            <p className="business-hours">{isKo ? '평일 09:00 ~ 18:00' : 'Weekdays 09:00 ~ 18:00'}</p>

            <div className="footer-family">
              <select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) window.open(e.target.value, '_blank');
                  e.target.value = '';
                }}
              >
                <option value="" disabled>Family Site</option>
                <option value="https://www.dreamitbiz.com">DreamIT Biz</option>
                <option value="https://teaching.dreamitbiz.com">Teaching AI</option>
                <option value="https://study.dreamitbiz.com">Study Master</option>
                <option value="https://safety.dreamitbiz.com">Safety Guard</option>
                <option value="https://eip.dreamitbiz.com">EIP Master</option>
              </select>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 DreamIT Biz. All rights reserved.</p>
          <p className="footer-bottom-info">
            Designed by Ph.D Aebon Lee | {isKo ? '대표이사' : 'CEO'}: {isKo ? '이애본' : 'Aebon Lee'}
          </p>
        </div>
      </div>
    </footer>
  );
}
