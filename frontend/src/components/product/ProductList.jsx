/**
 * ProductList 컴포넌트
 * 상품 리스트 표시 컴포넌트 (반응형 지원)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from '../../hooks/useResponsive';
import { BREAKPOINTS } from '../../constants/breakpoints';

function ProductList({ products, onProductClick }) {
  const isMobile = useResponsive(BREAKPOINTS.MOBILE);
  const isTablet = useResponsive(BREAKPOINTS.TABLET);

  if (!products || products.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p>검색 결과가 없습니다.</p>
        <p style={styles.emptyMessage}>
          다른 필터 조건으로 검색해보세요.
        </p>
      </div>
    );
  }

  const gridStyle = isMobile
    ? { ...styles.grid, gridTemplateColumns: '1fr' }
    : isTablet
    ? { ...styles.grid, gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }
    : styles.grid;

  return (
    <div style={styles.container}>
      <div style={gridStyle}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                style={styles.image}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div style={styles.content}>
              <h3 style={styles.name}>{product.name}</h3>
              <p style={styles.description}>{product.description}</p>
              
              <div style={styles.badges}>
                {product.is_female_producer && (
                  <span style={styles.badge}>여성 생산자</span>
                )}
                {product.is_eco_packaging && (
                  <span style={styles.badge}>친환경 포장재</span>
                )}
                {product.is_eco_friendly && (
                  <span style={styles.badge}>친환경 원두</span>
                )}
              </div>
              
              <div style={styles.footer}>
                <span style={styles.price}>
                  {product.price.toLocaleString()}원
                </span>
                <Link
                  to={`/products/${product.id}`}
                  style={styles.link}
                  onClick={() => onProductClick && onProductClick(product)}
                >
                  상세보기
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    padding: '1.5rem',
  },
  name: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '1rem',
    lineHeight: '1.6',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  badges: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  badge: {
    padding: '0.25rem 0.75rem',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #dee2e6',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#007bff',
  },
  link: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
  emptyState: {
    padding: '4rem 2rem',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    color: '#666',
  },
  emptyMessage: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    color: '#999',
  },
};

export default ProductList;

