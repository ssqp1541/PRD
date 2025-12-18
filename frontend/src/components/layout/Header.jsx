/**
 * 헤더 컴포넌트
 * 네비게이션 메뉴 및 사용자 정보 표시 (반응형 지원)
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useResponsive } from '../../hooks/useResponsive';
import { colors, fontSizes, fontWeights, spacing, borderRadius, shadows, zIndex, transitions, maxWidth } from '../../constants/theme';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useResponsive(768);

  // 데스크톱으로 전환될 때 모바일 메뉴 닫기
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

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
    backgroundColor: colors.background.white,
    boxShadow: shadows.md,
    padding: `${spacing.base} 0`,
    position: 'sticky',
    top: 0,
    zIndex: zIndex.dropdown,
  },
  container: {
    maxWidth: maxWidth.xl,
    margin: '0 auto',
    padding: `0 ${spacing.base}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
    color: colors.text.primary,
  },
  logoText: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.primary,
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: spacing.xl,
    flex: 1,
    justifyContent: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: colors.text.primary,
    fontWeight: fontWeights.medium,
    transition: `color ${transitions.base}`,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.base,
  },
  userName: {
    color: colors.text.secondary,
    fontSize: fontSizes.sm,
  },
  logoutButton: {
    padding: `${spacing.sm} ${spacing.base}`,
    backgroundColor: colors.danger,
    color: colors.text.inverse,
    border: 'none',
    borderRadius: borderRadius.sm,
    cursor: 'pointer',
    fontSize: fontSizes.sm,
  },
  authLink: {
    textDecoration: 'none',
    color: colors.text.primary,
    padding: `${spacing.sm} ${spacing.base}`,
  },
  registerLink: {
    textDecoration: 'none',
    color: colors.text.inverse,
    backgroundColor: colors.primary,
    padding: `${spacing.sm} ${spacing.base}`,
    borderRadius: borderRadius.sm,
  },
  mobileMenuButton: {
    background: 'none',
    border: 'none',
    fontSize: fontSizes['2xl'],
    cursor: 'pointer',
    padding: spacing.sm,
  },
  hamburgerIcon: {
    color: colors.text.primary,
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.background.white,
    boxShadow: shadows.lg,
    borderTop: `1px solid ${colors.border.light}`,
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.base,
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: colors.text.primary,
    padding: `${spacing.md} 0`,
    borderBottom: `1px solid ${colors.background.light}`,
    fontWeight: fontWeights.medium,
  },
  mobileUserInfo: {
    marginTop: spacing.base,
    paddingTop: spacing.base,
    borderTop: `2px solid ${colors.border.light}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  mobileUserName: {
    color: colors.text.secondary,
    fontSize: fontSizes.sm,
    padding: `${spacing.sm} 0`,
  },
  mobileLogoutButton: {
    padding: spacing.md,
    backgroundColor: colors.danger,
    color: colors.text.inverse,
    border: 'none',
    borderRadius: borderRadius.sm,
    cursor: 'pointer',
    fontSize: fontSizes.sm,
    width: '100%',
  },
};

export default Header;

