/**
 * SettlementReport 컴포넌트
 * 정산 보고서 페이지 컴포넌트
 */

import React, { useState, useCallback } from 'react';
import { getSettlement } from '../../services/api/partnerApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAsync } from '../../hooks/useAsync';
import { useErrorHandler } from '../../hooks/useErrorHandler';

function SettlementReport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { error: validationError, setError: setValidationError, clearError: clearValidationError } = useErrorHandler();

  // 비동기 함수를 메모이제이션
  const fetchSettlement = useCallback(
    () => {
      if (!startDate || !endDate) {
        throw new Error('시작일과 종료일을 모두 입력해주세요.');
      }
      return getSettlement(startDate, endDate).then(result => result.settlement);
    },
    [startDate, endDate]
  );

  const { data: settlement, loading: isLoading, error: asyncError, execute, reset } = useAsync(
    fetchSettlement,
    false
  );

  const handleSearch = async () => {
    clearValidationError();
    reset();
    try {
      await execute();
    } catch (err) {
      // 에러는 useAsync가 처리
    }
  };

  const error = validationError || asyncError;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount);
  };

  return (
    <div data-testid="partner-dashboard" style={styles.container}>
      <h1 style={styles.title}>정산 보고서</h1>
      <p style={styles.description}>
        기간을 선택하여 정산 내역을 조회하세요.
      </p>

      {/* 기간 선택 */}
      <div style={styles.dateSection}>
        <div style={styles.dateInputs}>
          <Input
            type="date"
            label="시작일"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.dateInput}
          />
          <Input
            type="date"
            label="종료일"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.dateInput}
          />
        </div>
        <Button
          variant="primary"
          onClick={handleSearch}
          loading={isLoading}
          style={styles.searchButton}
        >
          조회
        </Button>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <ErrorMessage
          message={error}
          type="error"
          onClose={() => {
            clearValidationError();
            reset();
          }}
          style={styles.errorMessage}
        />
      )}

      {/* 로딩 상태 */}
      {isLoading && <LoadingSpinner message="정산 데이터를 불러오는 중..." />}

      {/* 정산 데이터 표시 */}
      {settlement && !isLoading && (
        <div style={styles.settlementCard}>
          <h2 style={styles.cardTitle}>정산 내역</h2>
          
          <div style={styles.period}>
            <span style={styles.periodLabel}>기간:</span>
            <span style={styles.periodValue}>
              {settlement.period.startDate} ~ {settlement.period.endDate}
            </span>
          </div>

          <div style={styles.summary}>
            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>총 판매액</span>
              <span style={styles.summaryValue} data-testid="total-sales">
                {formatCurrency(settlement.totalSales)}
              </span>
            </div>

            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>플랫폼 수수료 ({settlement.platformFeeRate * 100}%)</span>
              <span style={styles.summaryValue} data-testid="platform-fee">
                {formatCurrency(settlement.platformFee)}
              </span>
            </div>

            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>최종 정산 예정 금액</span>
              <span style={styles.summaryValueFinal} data-testid="final-amount">
                {formatCurrency(settlement.finalAmount)}
              </span>
            </div>

            <div style={styles.summaryItem}>
              <span style={styles.summaryLabel}>주문 건수</span>
              <span style={styles.summaryValue}>
                {settlement.orderCount}건
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  description: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
  },
  dateSection: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-end',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  dateInputs: {
    display: 'flex',
    gap: '1rem',
    flex: 1,
  },
  dateInput: {
    flex: 1,
  },
  searchButton: {
    minWidth: '120px',
  },
  errorMessage: {
    marginBottom: '1rem',
  },
  settlementCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '2rem',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  period: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #dee2e6',
  },
  periodLabel: {
    fontSize: '0.9rem',
    color: '#666',
    marginRight: '0.5rem',
  },
  periodValue: {
    fontSize: '1rem',
    color: '#333',
    fontWeight: '500',
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
  summaryLabel: {
    fontSize: '1rem',
    color: '#666',
  },
  summaryValue: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#007bff',
  },
  summaryValueFinal: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#28a745',
  },
};

export default SettlementReport;

