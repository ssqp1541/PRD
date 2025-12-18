/**
 * 홈 페이지
 * 메인 페이지 컴포넌트
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { colors, fontSizes, fontWeights, spacing, borderRadius, shadows } from '../../constants/theme';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.title}>솔직한 한 잔</h1>
        <p style={styles.subtitle}>
          투명하고 윤리적인 커피 소비를 위한 플랫폼
        </p>
        <p style={styles.description}>
          원두의 생산자 수익 비율, 농장 위치, 환경 영향까지<br />
          모든 정보를 투명하게 확인하세요.
        </p>
        <div style={styles.buttonGroup}>
          <Link to="/products" style={styles.primaryButton}>
            상품 보기
          </Link>
          {!isAuthenticated && (
            <Link to="/register" style={styles.secondaryButton}>
              회원가입
            </Link>
          )}
        </div>
      </section>

      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>주요 기능</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>투명한 정보 추적</h3>
            <p style={styles.featureDescription}>
              생산자 수익 비율과 농장 위치를 지도로 확인할 수 있습니다.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>윤리적 영향 리포트</h3>
            <p style={styles.featureDescription}>
              나의 커피 소비가 환경에 미치는 긍정적 영향을 확인하세요.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h3 style={styles.featureTitle}>맞춤형 주문</h3>
            <p style={styles.featureDescription}>
              여성 생산자, 친환경 원두 등 원하는 조건으로 검색하세요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  hero: {
    textAlign: 'center',
    padding: `${spacing['2xl']} 0`,
    backgroundColor: colors.background.light,
    borderRadius: borderRadius.md,
    marginBottom: spacing['2xl'],
  },
  title: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.base,
  },
  subtitle: {
    fontSize: fontSizes['2xl'],
    color: colors.text.secondary,
    marginBottom: spacing.base,
  },
  description: {
    fontSize: fontSizes.lg,
    color: colors.text.primary,
    lineHeight: '1.8',
    marginBottom: spacing.xl,
  },
  buttonGroup: {
    display: 'flex',
    gap: spacing.base,
    justifyContent: 'center',
  },
  primaryButton: {
    padding: `${spacing.base} ${spacing.xl}`,
    backgroundColor: colors.primary,
    color: colors.text.inverse,
    textDecoration: 'none',
    borderRadius: borderRadius.sm,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
  },
  secondaryButton: {
    padding: `${spacing.base} ${spacing.xl}`,
    backgroundColor: 'transparent',
    color: colors.primary,
    textDecoration: 'none',
    borderRadius: borderRadius.sm,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    border: `2px solid ${colors.primary}`,
  },
  features: {
    marginTop: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: fontSizes['3xl'],
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.text.primary,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: spacing.xl,
  },
  featureCard: {
    padding: spacing.xl,
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.md,
    boxShadow: shadows.md,
  },
  featureTitle: {
    fontSize: fontSizes['2xl'],
    marginBottom: spacing.base,
    color: colors.text.primary,
  },
  featureDescription: {
    color: colors.text.secondary,
    lineHeight: '1.6',
  },
};

export default Home;

