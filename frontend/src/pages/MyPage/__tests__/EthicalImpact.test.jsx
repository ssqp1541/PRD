/**
 * FR2: 윤리 영향 리포트 기능 프론트엔드 테스트
 * 
 * Given 고객이 3개월간 친환경 원두만 구매한 기록이 있을 때
 * When 고객이 마이페이지의 '나의 윤리적 영향' 섹션을 클릭하면
 * Then '누적 커피 탄소 발자국 절감량' 수치와 함께, 긍정적인 메시지가 표시되어야 한다.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EthicalImpact from '../EthicalImpact';

// API 모킹 (아직 구현되지 않음)
jest.mock('../../../services/api/userApi', () => ({
  getEthicalImpact: jest.fn(),
}));

describe('EthicalImpact Component (FR2)', () => {
  const mockUserId = 1;
  const mockImpactData = {
    carbonFootprintReduction: 12.5,
    purchasePeriod: {
      startDate: '2025-09-15',
      endDate: '2025-12-15',
    },
    ecoFriendlyPurchases: [
      { id: 1, productName: '에티오피아 시다모', isEcoFriendly: true },
      { id: 2, productName: '콜롬비아 수프리모', isEcoFriendly: true },
    ],
    message: '3개월간 친환경 원두 구매로 12.5kg의 탄소를 절감했습니다. 환경 보호에 기여해주셔서 감사합니다!',
    calculation: {
      totalPurchases: 2,
      totalKg: 1.0,
      averageReductionPerKg: 12.5,
    },
    monthlyBreakdown: [
      { month: '2025-10', reduction: 4.2 },
      { month: '2025-11', reduction: 4.1 },
      { month: '2025-12', reduction: 4.2 },
    ],
  };

  beforeEach(() => {
    const { getEthicalImpact } = require('../../../services/api/userApi');
    getEthicalImpact.mockResolvedValue(mockImpactData);
  });

  it('should render ethical impact section', () => {
    render(<EthicalImpact userId={mockUserId} />);
    
    const section = screen.getByTestId('ethical-impact-section');
    expect(section).toBeInTheDocument();
  });

  it('should display carbon footprint reduction amount', async () => {
    render(<EthicalImpact userId={mockUserId} />);
    
    await waitFor(() => {
      expect(screen.getByText(/탄소 발자국 절감량/)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/12.5/)).toBeInTheDocument();
    expect(screen.getByText(/kg/)).toBeInTheDocument();
  });

  it('should display positive message', async () => {
    render(<EthicalImpact userId={mockUserId} />);
    
    await waitFor(() => {
      const message = screen.getByTestId('impact-message');
      expect(message).toBeInTheDocument();
      expect(message.textContent).toContain('감사');
    });
  });

  it('should display purchase period information', async () => {
    render(<EthicalImpact userId={mockUserId} />);
    
    await waitFor(() => {
      expect(screen.getByText(/3개월간/)).toBeInTheDocument();
    });
  });

  it('should handle loading state', () => {
    const { getEthicalImpact } = require('../../../services/api/userApi');
    getEthicalImpact.mockImplementation(() => new Promise(() => {})); // 무한 대기
    
    render(<EthicalImpact userId={mockUserId} />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should handle error state', async () => {
    const { getEthicalImpact } = require('../../../services/api/userApi');
    getEthicalImpact.mockRejectedValue(new Error('API Error'));
    
    render(<EthicalImpact userId={mockUserId} />);
    
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  it('should display monthly breakdown when available', async () => {
    render(<EthicalImpact userId={mockUserId} />);
    
    await waitFor(() => {
      const breakdown = screen.getByTestId('monthly-breakdown');
      expect(breakdown).toBeInTheDocument();
    });
  });

  it('should display empty state when user has no purchases', async () => {
    const { getEthicalImpact } = require('../../../services/api/userApi');
    getEthicalImpact.mockResolvedValue({
      carbonFootprintReduction: 0,
      ecoFriendlyPurchases: [],
      message: '아직 구매 기록이 없습니다.',
    });
    
    render(<EthicalImpact userId={mockUserId} />);
    
    await waitFor(() => {
      expect(screen.getByText(/구매 기록이 없습니다/)).toBeInTheDocument();
    });
  });
});

