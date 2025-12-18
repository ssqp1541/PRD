/**
 * ProductTracking 컴포넌트
 * 상품 추적 정보를 표시하는 컴포넌트
 */

import React, { useState, useEffect, useCallback } from 'react';
import { getProductTracking } from '../../services/api/productApi';
import FarmMap from '../../components/tracking/FarmMap';
import { useAsync } from '../../hooks/useAsync';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

function ProductTracking({ productId }) {
  const [activeTab, setActiveTab] = useState('info'); // 'info' 또는 'tracking'

  // 비동기 함수를 메모이제이션
  const fetchTrackingData = useCallback(
    () => getProductTracking(productId),
    [productId]
  );

  const { data: trackingData, loading: isLoading, error, execute } = useAsync(
    fetchTrackingData,
    false
  );

  // 추적 정보 로드
  useEffect(() => {
    if (activeTab === 'tracking' && !trackingData && !error) {
      execute();
    }
  }, [activeTab, productId, trackingData, error, execute]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'info' ? styles.activeTab : {}),
          }}
          onClick={() => handleTabClick('info')}
        >
          상품 정보
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'tracking' ? styles.activeTab : {}),
          }}
          onClick={() => handleTabClick('tracking')}
        >
          원두 스토리 추적
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'tracking' && (
          <>
            {isLoading && (
              <LoadingSpinner message="추적 정보를 불러오는 중..." />
            )}

            {error && (
              <ErrorMessage
                message={error}
                type="error"
                onClose={() => {}}
              />
            )}

            {!isLoading && !error && trackingData && (
              <div style={styles.trackingInfo}>
                {/* 생산자 수익 비율 */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>생산자 수익 비율</h3>
                  <p style={styles.revenueRatio}>
                    {trackingData.producerRevenueRatio}%
                  </p>
                  <p style={styles.description}>
                    이 원두 판매 금액의 {trackingData.producerRevenueRatio}%가 생산자에게 돌아갑니다.
                  </p>
                </div>

                {/* 농장 위치 */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>농장 위치</h3>
                  <FarmMap
                    latitude={trackingData.farmLocation.latitude}
                    longitude={trackingData.farmLocation.longitude}
                    address={trackingData.farmLocation.address}
                  />
                </div>

                {/* 원산지 정보 */}
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>원산지</h3>
                  <div style={styles.originInfo}>
                    <p style={styles.originText}>
                      <strong>국가:</strong> {trackingData.origin.country}
                    </p>
                    {trackingData.origin.region && (
                      <p style={styles.originText}>
                        <strong>지역:</strong> {trackingData.origin.region}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'info' && (
          <div style={styles.infoPlaceholder}>
            <p>상품 정보는 곧 표시될 예정입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '2px solid #dee2e6',
    marginBottom: '2rem',
  },
  tabButton: {
    padding: '1rem 2rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '3px solid transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#666',
    transition: 'all 0.2s',
  },
  activeTab: {
    color: '#007bff',
    borderBottomColor: '#007bff',
  },
  content: {
    minHeight: '400px',
  },
  loading: {
    padding: '2rem',
    textAlign: 'center',
    color: '#666',
  },
  error: {
    padding: '2rem',
    backgroundColor: '#fee',
    color: '#c33',
    borderRadius: '4px',
    textAlign: 'center',
  },
  trackingInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  section: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    marginBottom: '1rem',
    color: '#333',
  },
  revenueRatio: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#007bff',
    margin: '1rem 0',
  },
  description: {
    color: '#666',
    lineHeight: '1.6',
  },
  originInfo: {
    lineHeight: '2',
  },
  originText: {
    fontSize: '1.1rem',
    color: '#333',
    margin: '0.5rem 0',
  },
  infoPlaceholder: {
    padding: '2rem',
    textAlign: 'center',
    color: '#666',
  },
};

export default ProductTracking;
