import React from 'react';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/States';
import { FileText } from 'lucide-react';

export const DummyPage = ({ title, subtitle }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
    <div>
      <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-dark-blue)', lineHeight: 1.25 }}>{title}</h1>
      <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginTop: 4 }}>{subtitle}</p>
    </div>
    <Card padding="lg">
      <EmptyState
        icon={FileText}
        title={`${title} Module`}
        description="This route foundation is ready and will be connected to the backend database when Supabase integration begins."
      />
    </Card>
  </div>
);
