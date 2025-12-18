/**
 * React 앱 진입점
 * React 앱을 초기화하고 DOM에 마운트
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// React 18의 createRoot API 사용
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 개발 환경에서 Hot Module Replacement (HMR) 지원
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    root.render(
      <React.StrictMode>
        <NextApp />
      </React.StrictMode>
    );
  });
}

