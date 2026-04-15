import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdminGuard from '../components/AdminGuard';
import type { ReactElement } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));

// Learning path pages
const DescriptiveStatistics = lazy(() => import('../pages/descriptive-statistics/DescriptiveStatistics'));
const Probability = lazy(() => import('../pages/probability/Probability'));
const InferentialStatistics = lazy(() => import('../pages/inferential-statistics/InferentialStatistics'));
const HypothesisTesting = lazy(() => import('../pages/hypothesis-testing/HypothesisTesting'));
const Regression = lazy(() => import('../pages/regression/Regression'));
const Anova = lazy(() => import('../pages/anova/Anova'));
const Nonparametric = lazy(() => import('../pages/nonparametric/Nonparametric'));
const Bayesian = lazy(() => import('../pages/bayesian/Bayesian'));

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));

function LoadingFallback(): ReactElement {
  return (
    <div className="loading-page">
      <div className="loading-spinner" />
    </div>
  );
}

export default function PublicLayout(): ReactElement {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="site-main">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Learning Paths */}
            <Route path="/descriptive-statistics" element={<DescriptiveStatistics />} />
            <Route path="/probability" element={<Probability />} />
            <Route path="/inferential-statistics" element={<InferentialStatistics />} />
            <Route path="/hypothesis-testing" element={<HypothesisTesting />} />
            <Route path="/regression" element={<Regression />} />
            <Route path="/anova" element={<Anova />} />
            <Route path="/nonparametric" element={<Nonparametric />} />
            <Route path="/bayesian" element={<Bayesian />} />

            <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
