/**
 * ProductFilter 컴포넌트
 * 상품 필터 UI 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.filters - 필터 상태 객체
 * @param {boolean} props.filters.is_female_producer - 여성 생산자 필터
 * @param {boolean} props.filters.is_eco_packaging - 친환경 포장재 필터
 * @param {boolean} props.filters.is_eco_friendly - 친환경 원두 필터
 * @param {Function} props.onFilterChange - 필터 변경 이벤트 핸들러
 * @param {Function} props.onReset - 필터 초기화 이벤트 핸들러
 * @returns {JSX.Element} ProductFilter 컴포넌트
 * 
 * @example
 * <ProductFilter 
 *   filters={filters}
 *   onFilterChange={handleFilterChange}
 *   onReset={handleReset}
 * />
 */

import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';

function ProductFilter({ filters, onFilterChange, onReset }) {
  const handleFilterChange = useCallback(
    (filterName, value) => {
      onFilterChange({
        ...filters,
        [filterName]: value,
      });
    },
    [filters, onFilterChange]
  );

  return (
    <div style={styles.container} data-testid="product-filter">
      <h3 style={styles.title}>필터</h3>
      
      <div style={styles.filterGroup}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={filters.is_female_producer || false}
            onChange={(e) => handleFilterChange('is_female_producer', e.target.checked)}
            style={styles.checkbox}
          />
          <span>여성 생산자</span>
        </label>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={filters.is_eco_packaging || false}
            onChange={(e) => handleFilterChange('is_eco_packaging', e.target.checked)}
            style={styles.checkbox}
          />
          <span>친환경 포장재</span>
        </label>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={filters.is_eco_friendly || false}
            onChange={(e) => handleFilterChange('is_eco_friendly', e.target.checked)}
            style={styles.checkbox}
          />
          <span>친환경 원두</span>
        </label>
      </div>

      <button onClick={onReset} style={styles.resetButton}>
        초기화
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  filterGroup: {
    marginBottom: '1rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#333',
  },
  checkbox: {
    marginRight: '0.5rem',
    width: '1.2rem',
    height: '1.2rem',
    cursor: 'pointer',
  },
  resetButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

ProductFilter.propTypes = {
  filters: PropTypes.shape({
    is_female_producer: PropTypes.bool,
    is_eco_packaging: PropTypes.bool,
    is_eco_friendly: PropTypes.bool,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default memo(ProductFilter);

