/**
 * ProductSearch 컴포넌트
 * 상품 검색 페이지 컴포넌트 (반응형 지원)
 */

import React, { useState, useEffect } from 'react';
import { searchProducts } from '../../services/api/productApi';
import ProductFilter from '../../components/product/ProductFilter';
import ProductList from '../../components/product/ProductList';

function ProductSearch() {
  const [filters, setFilters] = useState({
    is_female_producer: false,
    is_eco_packaging: false,
    is_eco_friendly: false,
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 초기 로드 시 모든 상품 조회
  useEffect(() => {
    loadProducts();
  }, []);

  // 화면 크기 감지 (반응형)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadProducts = async (searchFilters = {}) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // 필터에서 false인 값은 제외 (undefined로 전달)
      const activeFilters = {};
      Object.keys(searchFilters).forEach(key => {
        if (searchFilters[key] === true) {
          activeFilters[key] = true;
        }
      });

      const result = await searchProducts(activeFilters);
      setProducts(result.products || []);
    } catch (err) {
      setError(err.message || '상품 검색에 실패했습니다.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    loadProducts(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      is_female_producer: false,
      is_eco_packaging: false,
      is_eco_friendly: false,
    };
    setFilters(resetFilters);
    loadProducts(resetFilters);
  };

  const handleProductClick = (product) => {
    // 상품 클릭 시 처리 (상세 페이지로 이동 등)
    console.log('Product clicked:', product);
  };

  return (
    <div data-testid="product-search-page" style={styles.container}>
      <h1 style={styles.title}>원두 검색</h1>
      <p style={styles.description}>
        원하는 조건에 맞는 윤리적인 원두를 찾아보세요.
      </p>

      <div style={isMobile ? styles.layoutMobile : styles.layout}>
        {/* 필터 섹션 */}
        <aside style={isMobile ? styles.sidebarMobile : styles.sidebar}>
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
          
          <button onClick={handleSearch} style={styles.searchButton}>
            검색
          </button>
        </aside>

        {/* 검색 결과 섹션 */}
        <main style={styles.main}>
          {isLoading && (
            <div style={styles.loading}>
              <p>검색 중...</p>
            </div>
          )}

          {error && (
            <div style={styles.error}>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {hasSearched && (
                <div style={styles.resultHeader}>
                  <p style={styles.resultCount}>
                    검색 결과: {products.length}개
                  </p>
                </div>
              )}
              <ProductList products={products} onProductClick={handleProductClick} />
            </>
          )}
        </main>
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
    marginBottom: '0.5rem',
    color: '#333',
  },
  description: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gap: '2rem',
  },
  layoutMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarMobile: {
    display: 'flex',
    flexDirection: 'column',
    order: 1,
  },
  searchButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  main: {
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
  resultHeader: {
    marginBottom: '1.5rem',
  },
  resultCount: {
    fontSize: '1rem',
    color: '#666',
  },
};

export default ProductSearch;

