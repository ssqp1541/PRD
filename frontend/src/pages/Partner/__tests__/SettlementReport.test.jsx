/**
 * FR5: 파트너 관리 기능 프론트엔드 테스트
 * 
 * Given 입점 로스터리 관리자가 파트너 전용 대시보드에 접속했을 때
 * When 관리자가 '정산 보고서' 탭을 선택하고 기간을 설정하면
 * Then 총 판매액, 플랫폼 수수료, 최종 정산 예정 금액이 명확하게 표시되어야 한다.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettlementReport from '../SettlementReport';

// API 모킹 (아직 구현되지 않음)
jest.mock('../../../services/api/partnerApi', () => ({
  getSettlement: jest.fn(),
}));

describe('SettlementReport Component (FR5)', () => {
  const mockSettlement = {
    success: true,
    settlement: {
      partnerId: 1,
      partnerName: '로스터리 A',
      period: {
        startDate: '2025-01-01',
        endDate: '2025-01-31',
      },
      totalSales: 5000000.00,
      platformFee: 500000.00,
      finalAmount: 4500000.00,
      orderCount: 150,
    },
  };

  beforeEach(() => {
    const { getSettlement } = require('../../../services/api/partnerApi');
    getSettlement.mockResolvedValue(mockSettlement);
  });

  it('should render partner dashboard', () => {
    render(<SettlementReport />);
    
    const dashboard = screen.getByTestId('partner-dashboard');
    expect(dashboard).toBeInTheDocument();
  });

  it('should render settlement report tab', () => {
    render(<SettlementReport />);
    
    const reportTab = screen.getByText(/정산 보고서/i);
    expect(reportTab).toBeInTheDocument();
  });

  it('should render date range selection UI', () => {
    render(<SettlementReport />);
    
    const startDateInput = screen.getByLabelText(/시작일/i);
    const endDateInput = screen.getByLabelText(/종료일/i);
    
    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
  });

  it('should call API and display settlement data when dates are selected', async () => {
    const { getSettlement } = require('../../../services/api/partnerApi');
    
    render(<SettlementReport />);
    
    const startDateInput = screen.getByLabelText(/시작일/i);
    const endDateInput = screen.getByLabelText(/종료일/i);
    const searchButton = screen.getByText(/조회/i);
    
    fireEvent.change(startDateInput, { target: { value: '2025-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2025-01-31' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(getSettlement).toHaveBeenCalledWith('2025-01-01', '2025-01-31');
    });
  });

  it('should display total sales amount', async () => {
    const { getSettlement } = require('../../../services/api/partnerApi');
    
    render(<SettlementReport />);
    
    const searchButton = screen.getByText(/조회/i);
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/5,000,000/i)).toBeInTheDocument();
    });
  });

  it('should display platform fee', async () => {
    const { getSettlement } = require('../../../services/api/partnerApi');
    
    render(<SettlementReport />);
    
    const searchButton = screen.getByText(/조회/i);
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/500,000/i)).toBeInTheDocument();
    });
  });

  it('should display final settlement amount', async () => {
    const { getSettlement } = require('../../../services/api/partnerApi');
    
    render(<SettlementReport />);
    
    const searchButton = screen.getByText(/조회/i);
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/4,500,000/i)).toBeInTheDocument();
    });
  });
});

