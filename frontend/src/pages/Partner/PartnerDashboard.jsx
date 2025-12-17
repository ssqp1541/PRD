/**
 * PartnerDashboard 컴포넌트
 * 파트너 대시보드 메인 페이지
 */

import React, { useState } from 'react';
import SettlementReport from './SettlementReport';

function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState('settlement');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>파트너 대시보드</h1>
      
      {/* 탭 메뉴 */}
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab('settlement')}
          style={{
            ...styles.tab,
            ...(activeTab === 'settlement' ? styles.activeTab : {}),
          }}
        >
          정산 보고서
        </button>
        {/* 향후 추가될 탭들 */}
        {/* <button style={styles.tab}>상품 관리</button>
        <button style={styles.tab}>재고 관리</button> */}
      </div>

      {/* 탭 콘텐츠 */}
      <div style={styles.content}>
        {activeTab === 'settlement' && <SettlementReport />}
      </div>
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
  tabs: {
    display: 'flex',
    gap: '1rem',
    borderBottom: '2px solid #dee2e6',
    marginBottom: '2rem',
  },
  tab: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#666',
    transition: 'all 0.2s',
  },
  activeTab: {
    color: '#007bff',
    borderBottomColor: '#007bff',
    fontWeight: '600',
  },
  content: {
    width: '100%',
  },
};

export default PartnerDashboard;

