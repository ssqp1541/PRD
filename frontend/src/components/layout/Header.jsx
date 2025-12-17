/**
 * 헤더 컴포넌트
 * 네비게이션 메뉴 및 사용자 정보 표시 (반응형 지원)
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 화면 크기 감지 (반응형)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo} onClick={closeMobileMenu}>
          <h1 style={styles.logoText}>솔직한 한 잔</h1>
        </Link>

        {/* 데스크톱 네비게이션 */}
        {!isMobile && (
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
        )}

        {/* 데스크톱 사용자 섹션 */}
        {!isMobile && (
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
        )}

        {/* 모바일 햄버거 메뉴 버튼 */}
        {isMobile && (
          <button
            onClick={toggleMobileMenu}
            style={styles.mobileMenuButton}
            aria-label="메뉴"
          >
            <span style={styles.hamburgerIcon}>
              {isMobileMenuOpen ? '✕' : '☰'}
            </span>
          </button>
        )}
      </div>

      {/* 모바일 네비게이션 메뉴 */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <nav style={styles.mobileNav}>
            <Link to="/" style={styles.mobileNavLink} onClick={closeMobileMenu}>홈</Link>
            <Link to="/products" style={styles.mobileNavLink} onClick={closeMobileMenu}>상품</Link>
            {isAuthenticated ? (
              <>
                <Link to="/orders" style={styles.mobileNavLink} onClick={closeMobileMenu}>주문</Link>
                <Link to="/mypage" style={styles.mobileNavLink} onClick={closeMobileMenu}>마이페이지</Link>
                <div style={styles.mobileUserInfo}>
                  <span style={styles.mobileUserName}>{user?.name || user?.email}님</span>
                  <button onClick={handleLogout} style={styles.mobileLogoutButton}>
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.mobileNavLink} onClick={closeMobileMenu}>로그인</Link>
                <Link to="/register" style={styles.mobileNavLink} onClick={closeMobileMenu}>회원가입</Link>
              </>
            )}
          </nav>
        </div>
      )}
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
  mobileMenuButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  hamburgerIcon: {
    color: '#333',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderTop: '1px solid #dee2e6',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: '#333',
    padding: '0.75rem 0',
    borderBottom: '1px solid #f0f0f0',
    fontWeight: '500',
  },
  mobileUserInfo: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '2px solid #dee2e6',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  mobileUserName: {
    color: '#666',
    fontSize: '0.9rem',
    padding: '0.5rem 0',
  },
  mobileLogoutButton: {
    padding: '0.75rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    width: '100%',
  },
};

export default Header;

