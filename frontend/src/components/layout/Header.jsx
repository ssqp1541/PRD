/**
 * 헤더 컴포넌트
 * 네비게이션 메뉴 및 사용자 정보 표시
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <h1 style={styles.logoText}>솔직한 한 잔</h1>
        </Link>

        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>홈</Link>
          <Link to="/products" style={styles.navLink}>상품</Link>
          {isAuthenticated && (
            <>
              <Link to="/orders" style={styles.navLink}>주문</Link>
              <Link to="/mypage" style={styles.navLink}>마이페이지</Link>
            </>
          )}
        </nav>

        <div style={styles.userSection}>
          {isAuthenticated ? (
            <>
              <span style={styles.userName}>{user?.name || user?.email}님</span>
              <button onClick={handleLogout} style={styles.logoutButton}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.authLink}>로그인</Link>
              <Link to="/register" style={styles.registerLink}>회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
    color: '#333',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007bff',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    flex: 1,
    justifyContent: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userName: {
    color: '#666',
    fontSize: '0.9rem',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  authLink: {
    textDecoration: 'none',
    color: '#333',
    padding: '0.5rem 1rem',
  },
  registerLink: {
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#007bff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
  },
};

export default Header;

