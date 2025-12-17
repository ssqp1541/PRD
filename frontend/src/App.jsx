/**
 * 메인 App 컴포넌트
 * 라우터 설정 및 인증 프로바이더
 * 지연 로딩(Lazy Loading) 적용
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';

// 공개 라우트 (즉시 로드)
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// 보호된 라우트 (지연 로딩)
const Home = lazy(() => import('./pages/Home/Home'));
const ProductList = lazy(() => import('./pages/Product/ProductList'));
const ProductSearch = lazy(() => import('./pages/Product/ProductSearch'));
const Order = lazy(() => import('./pages/Order/Order'));
const MyPage = lazy(() => import('./pages/MyPage/MyPage'));
const PartnerDashboard = lazy(() => import('./pages/Partner/PartnerDashboard'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 공개 라우트 (레이아웃 없음) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* 보호된 라우트 (레이아웃 포함, 지연 로딩) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingSpinner fullScreen message="페이지를 불러오는 중..." />}>
                    <Home />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingSpinner fullScreen message="페이지를 불러오는 중..." />}>
                    <ProductList />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/products/search"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingSpinner fullScreen message="페이지를 불러오는 중..." />}>
                    <ProductSearch />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingSpinner fullScreen message="페이지를 불러오는 중..." />}>
                    <Order />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingSpinner fullScreen message="페이지를 불러오는 중..." />}>
                    <MyPage />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/partner"
            element={
              <ProtectedRoute>
                <Layout>
                  <Suspense fallback={<LoadingSpinner fullScreen message="페이지를 불러오는 중..." />}>
                    <PartnerDashboard />
                  </Suspense>
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* 기본 리다이렉트 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
