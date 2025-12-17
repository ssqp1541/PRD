/**
 * FR3: 맞춤형 주문 시스템 기능 프론트엔드 테스트
 * 
 * Given 고객이 원두 검색 페이지에 접속했을 때
 * When 고객이 필터 조건으로 '여성 생산자 커피'와 '친환경 포장재 사용'을 모두 선택하고 검색하면
 * Then 두 가지 기준을 모두 충족하는 원두 상품만 표시되어야 한다.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductSearch from '../ProductSearch';

// API 모킹 (아직 구현되지 않음)
jest.mock('../../../services/api/productApi', () => ({
  searchProducts: jest.fn(),
}));

describe('ProductSearch Component (FR3)', () => {
  const mockProducts = [
    {
      id: 1,
      name: '콜롬비아 수프리모 여성 생산자 원두',
      description: '여성 생산자가 직접 재배한 프리미엄 원두입니다.',
      price: 30000.00,
      image_url: 'https://example.com/images/colombia-female.jpg',
      is_eco_friendly: false,
      is_female_producer: true,
      is_eco_packaging: true,
    },
    {
      id: 2,
      name: '에티오피아 예가체프 친환경 원두',
      description: '유기농 인증을 받은 친환경 원두입니다.',
      price: 25000.00,
      image_url: 'https://example.com/images/ethiopia-eco.jpg',
      is_eco_friendly: true,
      is_female_producer: false,
      is_eco_packaging: true,
    },
  ];

  beforeEach(() => {
    const { searchProducts } = require('../../../services/api/productApi');
    searchProducts.mockResolvedValue({
      success: true,
      products: mockProducts,
      total: 2,
    });
  });

  it('should render search page', () => {
    render(<ProductSearch />);
    
    const searchPage = screen.getByTestId('product-search-page');
    expect(searchPage).toBeInTheDocument();
  });

  it('should render filter UI with checkboxes', () => {
    render(<ProductSearch />);
    
    const femaleProducerFilter = screen.getByLabelText(/여성 생산자/i);
    const ecoPackagingFilter = screen.getByLabelText(/친환경 포장재/i);
    
    expect(femaleProducerFilter).toBeInTheDocument();
    expect(ecoPackagingFilter).toBeInTheDocument();
  });

  it('should handle filter selection', () => {
    render(<ProductSearch />);
    
    const femaleProducerFilter = screen.getByLabelText(/여성 생산자/i);
    
    fireEvent.click(femaleProducerFilter);
    
    expect(femaleProducerFilter).toBeChecked();
  });

  it('should call search API when search button is clicked', async () => {
    const { searchProducts } = require('../../../services/api/productApi');
    
    render(<ProductSearch />);
    
    const searchButton = screen.getByText(/검색/i);
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(searchProducts).toHaveBeenCalled();
    });
  });

  it('should display filtered search results', async () => {
    const { searchProducts } = require('../../../services/api/productApi');
    searchProducts.mockResolvedValue({
      success: true,
      products: [mockProducts[0]], // 여성 생산자 + 친환경 포장재
      total: 1,
    });
    
    render(<ProductSearch />);
    
    // 필터 선택
    const femaleProducerFilter = screen.getByLabelText(/여성 생산자/i);
    const ecoPackagingFilter = screen.getByLabelText(/친환경 포장재/i);
    
    fireEvent.click(femaleProducerFilter);
    fireEvent.click(ecoPackagingFilter);
    
    // 검색 실행
    const searchButton = screen.getByText(/검색/i);
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/콜롬비아 수프리모/i)).toBeInTheDocument();
    });
  });

  it('should handle filter reset', () => {
    render(<ProductSearch />);
    
    const femaleProducerFilter = screen.getByLabelText(/여성 생산자/i);
    const resetButton = screen.getByText(/초기화/i);
    
    // 필터 선택
    fireEvent.click(femaleProducerFilter);
    expect(femaleProducerFilter).toBeChecked();
    
    // 초기화
    fireEvent.click(resetButton);
    expect(femaleProducerFilter).not.toBeChecked();
  });
});

