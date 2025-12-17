/**
 * 푸터 컴포넌트
 * 푸터 정보 및 저작권 표시
 */

import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.section}>
            <h3 style={styles.title}>솔직한 한 잔</h3>
            <p style={styles.description}>
              투명하고 윤리적인 커피 소비를 위한 플랫폼
            </p>
          </div>

          <div style={styles.section}>
            <h4 style={styles.subtitle}>서비스</h4>
            <ul style={styles.list}>
              <li><a href="/products" style={styles.link}>상품 보기</a></li>
              <li><a href="/about" style={styles.link}>서비스 소개</a></li>
            </ul>
          </div>

          <div style={styles.section}>
            <h4 style={styles.subtitle}>고객 지원</h4>
            <ul style={styles.list}>
              <li><a href="/contact" style={styles.link}>문의하기</a></li>
              <li><a href="/faq" style={styles.link}>자주 묻는 질문</a></li>
            </ul>
          </div>
        </div>

        <div style={styles.copyright}>
          <p>&copy; {currentYear} 솔직한 한 잔 (Honest Cup). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '2rem 0 1rem',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#007bff',
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '0.9rem',
    color: '#ccc',
    lineHeight: '1.6',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '0.9rem',
    lineHeight: '2',
    transition: 'color 0.2s',
  },
  copyright: {
    textAlign: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #555',
    color: '#999',
    fontSize: '0.85rem',
  },
};

export default Footer;

