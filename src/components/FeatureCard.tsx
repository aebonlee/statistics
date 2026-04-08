import type { ReactElement } from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps): ReactElement {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <i className={`fa-solid ${icon}`} />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  );
}
