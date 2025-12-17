/**
 * EthicalImpact 컴포넌트
 * 사용자 윤리 영향 리포트를 표시하는 컴포넌트
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getEthicalImpact } from '../../services/api/userApi';

function EthicalImpact({ userId: propUserId }) {
  const { user } = useAuth();
  const userId = propUserId || user?.id;
  
  const [isLoading, setIsLoading] = useState(true);
  const [impactData, setImpactData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      loadEthicalImpact();
    }
  }, [userId]);

  const loadEthicalImpact = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getEthicalImpact(userId);
      setImpactData(data);
    } catch (err) {
      setError(err.message || '윤리 영향 리포트를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div data-testid="ethical-impact-section" style={styles.container}>
        <div data-testid="loading-spinner" style={styles.loading}>
          <p>데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div data-testid="ethical-impact-section" style={styles.container}>
        <div data-testid="error-message" style={styles.error}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // 빈 상태 (구매 기록 없음)
  if (!impactData || impactData.carbonFootprintReduction === 0) {
    return (
      <div data-testid="ethical-impact-section" style={styles.container}>
        <div style={styles.emptyState}>
          <p>구매 기록이 없습니다.</p>
          <p style={styles.emptyMessage}>
            친환경 원두를 구매하여 환경 보호에 기여해보세요!
          </p>
        </div>
      </div>
    );
  }

  // 데이터 표시
  return (
    <div data-testid="ethical-impact-section" style={styles.container}>
      {/* 탄소 발자국 절감량 */}
      <div style={styles.reductionCard}>
        <h3 style={styles.reductionTitle}>탄소 발자국 절감량</h3>
        <div style={styles.reductionAmount}>
          <span style={styles.reductionNumber}>
            {impactData.carbonFootprintReduction}
          </span>
          <span style={styles.reductionUnit}>kg</span>
        </div>
        <p style={styles.reductionDescription}>
          친환경 원두 구매로 절감한 탄소량입니다.
        </p>
      </div>

      {/* 긍정적인 메시지 */}
      <div style={styles.messageCard}>
        <p data-testid="impact-message" style={styles.message}>
          {impactData.message}
        </p>
      </div>

      {/* 구매 기간 정보 */}
      {impactData.purchasePeriod && (
        <div style={styles.periodCard}>
          <p style={styles.periodText}>
            <strong>기간:</strong> 3개월간
          </p>
          <p style={styles.periodDetail}>
            {new Date(impactData.purchasePeriod.startDate).toLocaleDateString('ko-KR')} ~{' '}
            {new Date(impactData.purchasePeriod.endDate).toLocaleDateString('ko-KR')}
          </p>
        </div>
      )}

      {/* 계산 정보 */}
      {impactData.calculation && (
        <div style={styles.calculationCard}>
          <h4 style={styles.calculationTitle}>상세 정보</h4>
          <div style={styles.calculationDetails}>
            <p>총 구매 횟수: {impactData.calculation.totalPurchases}회</p>
            <p>총 구매량: {impactData.calculation.totalKg}kg</p>
            <p>평균 절감량: {impactData.calculation.averageReductionPerKg}kg CO2/kg</p>
          </div>
        </div>
      )}

      {/* 월별 집계 */}
      {impactData.monthlyBreakdown && impactData.monthlyBreakdown.length > 0 && (
        <div data-testid="monthly-breakdown" style={styles.breakdownCard}>
          <h4 style={styles.breakdownTitle}>월별 집계</h4>
          <div style={styles.breakdownList}>
            {impactData.monthlyBreakdown.map((item, index) => (
              <div key={index} style={styles.breakdownItem}>
                <span style={styles.breakdownMonth}>{item.month}</span>
                <span style={styles.breakdownReduction}>
                  {item.reduction}kg CO2
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
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
  emptyState: {
    padding: '2rem',
    textAlign: 'center',
    color: '#666',
  },
  emptyMessage: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    color: '#999',
  },
  reductionCard: {
    padding: '2rem',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  reductionTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  reductionAmount: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  reductionNumber: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  reductionUnit: {
    fontSize: '1.5rem',
    color: '#2e7d32',
    fontWeight: '500',
  },
  reductionDescription: {
    color: '#666',
    fontSize: '0.9rem',
  },
  messageCard: {
    padding: '1.5rem',
    backgroundColor: '#fff3cd',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  },
  message: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#856404',
    margin: 0,
    textAlign: 'center',
  },
  periodCard: {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  periodText: {
    margin: '0.5rem 0',
    color: '#333',
  },
  periodDetail: {
    margin: '0.5rem 0',
    color: '#666',
    fontSize: '0.9rem',
  },
  calculationCard: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    marginBottom: '1rem',
    border: '1px solid #dee2e6',
  },
  calculationTitle: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#333',
  },
  calculationDetails: {
    lineHeight: '2',
    color: '#666',
  },
  breakdownCard: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #dee2e6',
  },
  breakdownTitle: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#333',
  },
  breakdownList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  breakdownItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
  breakdownMonth: {
    fontWeight: '500',
    color: '#333',
  },
  breakdownReduction: {
    color: '#007bff',
    fontWeight: '500',
  },
};

export default EthicalImpact;
