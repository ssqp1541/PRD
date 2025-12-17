/**
 * 메인 App 컴포넌트
 * 라우터 설정 및 인증 프로바이더
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import ProductList from './pages/Product/ProductList';
import Order from './pages/Order/Order';
import MyPage from './pages/MyPage/MyPage';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 공개 라우트 (레이아웃 없음) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* 보호된 라우트 (레이아웃 포함) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProductList />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Layout>
                  <Order />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <Layout>
                  <MyPage />
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
