/**
 * 주문 페이지
 * 주문 및 결제를 처리하는 페이지
 */

import React from 'react';

function Order() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>주문하기</h1>
      <p style={styles.description}>
        주문 및 결제를 진행하세요.
      </p>
      
      <div style={styles.placeholder}>
        <p>주문 기능은 곧 구현될 예정입니다.</p>
        <p style={styles.note}>
          FR3 (맞춤형 주문 시스템) 구현 시 완성됩니다.
        </p>
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
    marginBottom: '1rem',
    color: '#333',
  },
  description: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
  },
  placeholder: {
    padding: '4rem 2rem',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    color: '#666',
  },
  note: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#999',
  },
};

export default Order;

