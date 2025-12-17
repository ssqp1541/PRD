/**
 * 홈 페이지
 * 메인 페이지 컴포넌트
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
    padding: '4rem 0',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '4rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.1rem',
    color: '#333',
    lineHeight: '1.8',
    marginBottom: '2rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  primaryButton: {
    padding: '1rem 2rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  secondaryButton: {
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    color: '#007bff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    fontWeight: '500',
    border: '2px solid #007bff',
  },
  features: {
    marginTop: '4rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  featureTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
  featureDescription: {
    color: '#666',
    lineHeight: '1.6',
  },
};

export default Home;

