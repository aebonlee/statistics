import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LEARNING_PATHS } from '../config/site';
import SEOHead from '../components/SEOHead';
import HeroBackground from '../components/HeroBackground';
import HeroCarousel from '../components/HeroCarousel';
import FeatureCard from '../components/FeatureCard';
import type { ReactElement } from 'react';

export default function Home(): ReactElement {
  const { language, t } = useLanguage();
  const isKo = language === 'ko';

  const carouselSlides = [
    {
      title: isKo ? '기술통계부터 베이지안통계까지' : 'From Descriptive to Bayesian Statistics',
      description: isKo
        ? '기술통계, 확률론, 추론통계, 가설검정, 회귀분석까지 — 통계학의 모든 것을 체계적으로 배웁니다.'
        : 'From descriptive statistics to probability, inference, hypothesis testing, and regression — learn everything about statistics.',
    },
    {
      title: isKo ? '이론과 실무를 아우르는 학습' : 'Theory Meets Practice',
      description: isKo
        ? '수학적 이론과 실무 데이터 분석을 병행하여 바로 활용할 수 있는 통계 역량을 키웁니다.'
        : 'Build practical statistical competencies through both mathematical theory and real-world data analysis.',
    },
    {
      title: isKo ? '데이터로 의사결정하는 힘' : 'Data-Driven Decision Making',
      description: isKo
        ? '통계적 사고력을 키워 데이터 기반의 올바른 의사결정을 내릴 수 있는 역량을 갖추세요.'
        : 'Develop statistical thinking skills to make sound data-driven decisions.',
    },
  ];

  return (
    <>
      <SEOHead path="/" />

      {/* Hero */}
      <section className="hero">
        <HeroBackground />
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fa-solid fa-chart-bar" />
            {t('hero.badge')}
          </div>
          <h1 className="hero-title">
            {t('hero.title')}
            <span className="hero-title-highlight">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="hero-actions">
            <Link to="/descriptive-statistics" className="btn btn-primary-large">{t('hero.cta')}</Link>
            <Link to="/probability" className="btn btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
              {t('hero.ctaSecondary')}
            </Link>
          </div>
          <HeroCarousel slides={carouselSlides} />
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('features.title')}</h2>
            <p className="section-subtitle">{t('features.subtitle')}</p>
          </div>
          <div className="features-grid">
            <FeatureCard icon="fa-chart-bar" title={t('features.descriptive.title')} description={t('features.descriptive.desc')} />
            <FeatureCard icon="fa-dice" title={t('features.probability.title')} description={t('features.probability.desc')} />
            <FeatureCard icon="fa-magnifying-glass-chart" title={t('features.inference.title')} description={t('features.inference.desc')} />
            <FeatureCard icon="fa-chart-line" title={t('features.analysis.title')} description={t('features.analysis.desc')} />
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="paths-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.pathsTitle')}</h2>
            <p className="section-subtitle">{t('home.pathsSubtitle')}</p>
          </div>
          <div className="paths-grid">
            {LEARNING_PATHS.map(path => (
              <Link key={path.id} to={path.path} className="path-card">
                <div className="path-card-header">
                  <div className="path-icon" style={{ background: path.color }}>
                    <i className={`fa-solid ${path.icon}`} />
                  </div>
                  <h3 className="path-name">{isKo ? path.nameKo : path.nameEn}</h3>
                </div>
                <p className="path-desc">{isKo ? path.descKo : path.descEn}</p>
                <div className="path-topics">
                  {path.topics.map((topic, i) => (
                    <span key={i} className="path-topic">{topic}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">8+</div>
              <div className="stat-label">{t('stats.guides')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">48+</div>
              <div className="stat-label">{t('stats.topics')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">{t('stats.categories')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="workflow-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.workflowTitle')}</h2>
            <p className="section-subtitle">{t('home.workflowSubtitle')}</p>
          </div>
          <div className="workflow-grid">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="workflow-step">
                <div className="workflow-number">{n}</div>
                <h3 className="workflow-title">{t(`home.step${n}`)}</h3>
                <p className="workflow-desc">{t(`home.step${n}desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">{t('cta.title')}</h2>
          <p className="cta-description">{t('cta.description')}</p>
          <Link to="/descriptive-statistics" className="btn btn-primary-large">{t('cta.button')}</Link>
        </div>
      </section>
    </>
  );
}
