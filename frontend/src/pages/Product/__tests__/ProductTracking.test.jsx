/**
 * FR1: 투명 정보 추적 기능 프론트엔드 테스트
 * 
 * Given 고객이 특정 원두 상세 페이지에 접속했을 때
 * When 고객이 '원두 스토리 추적' 탭을 클릭하면
 * Then 생산자에게 돌아간 수익 비율 및 원산지 농장의 위치가 지도로 시각화되어 표시되어야 한다.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductTracking from '../ProductTracking';

// API 모킹 (아직 구현되지 않음)
jest.mock('../../../services/api/productApi', () => ({
  getProductTracking: jest.fn(),
}));

describe('ProductTracking Component (FR1)', () => {
  const mockProductId = 1;
  const mockTrackingData = {
    producerRevenueRatio: 45.5,
    farmLocation: {
      latitude: 37.5665,
      longitude: 126.9780,
      address: '서울특별시 중구',
    },
    origin: {
      country: '에티오피아',
      region: '시다모',
    },
  };

  beforeEach(() => {
    const { getProductTracking } = require('../../../services/api/productApi');
    getProductTracking.mockResolvedValue(mockTrackingData);
  });

  it('should render tracking tab button', () => {
    render(<ProductTracking productId={mockProductId} />);
    
    const tabButton = screen.getByText('원두 스토리 추적');
    expect(tabButton).toBeInTheDocument();
  });

  it('should display tracking information when tab is clicked', async () => {
    render(<ProductTracking productId={mockProductId} />);
    
    const tab = screen.getByText('원두 스토리 추적');
    fireEvent.click(tab);
    
    await waitFor(() => {
      expect(screen.getByText(/생산자 수익 비율/)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/45.5%/)).toBeInTheDocument();
  });

  it('should render map component with farm location', async () => {
    render(<ProductTracking productId={mockProductId} />);
    
    const tab = screen.getByText('원두 스토리 추적');
    fireEvent.click(tab);
    
    await waitFor(() => {
      const map = screen.getByTestId('farm-map');
      expect(map).toBeInTheDocument();
    });
  });

  it('should display farm location coordinates', async () => {
    render(<ProductTracking productId={mockProductId} />);
    
    const tab = screen.getByText('원두 스토리 추적');
    fireEvent.click(tab);
    
    await waitFor(() => {
      expect(screen.getByText(/서울특별시 중구/)).toBeInTheDocument();
    });
  });

  it('should display origin information', async () => {
    render(<ProductTracking productId={mockProductId} />);
    
    const tab = screen.getByText('원두 스토리 추적');
    fireEvent.click(tab);
    
    await waitFor(() => {
      expect(screen.getByText(/에티오피아/)).toBeInTheDocument();
      expect(screen.getByText(/시다모/)).toBeInTheDocument();
    });
  });
});

