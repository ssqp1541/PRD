/**
 * 마이페이지
 * 사용자 정보 및 윤리 영향 리포트를 표시하는 페이지
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EthicalImpact from './EthicalImpact';

function MyPage() {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>마이페이지</h1>
      
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>사용자 정보</h2>
        <div style={styles.userInfo}>
          <p><strong>이름:</strong> {user?.name || '-'}</p>
          <p><strong>이메일:</strong> {user?.email || '-'}</p>
          <p><strong>역할:</strong> {user?.role || '-'}</p>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>나의 윤리적 영향</h2>
        <EthicalImpact userId={user?.id} />
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>주문 내역</h2>
        <div style={styles.placeholder}>
          <p>주문 내역 기능은 곧 구현될 예정입니다.</p>
          <Link to="/orders" style={styles.link}>
            주문하기
          </Link>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333',
  },
  section: {
    marginBottom: '3rem',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
  userInfo: {
    lineHeight: '2',
    color: '#666',
  },
  placeholder: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    color: '#666',
  },
  link: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
};

export default MyPage;

