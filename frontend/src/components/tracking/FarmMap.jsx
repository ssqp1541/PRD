/**
 * FarmMap 컴포넌트
 * 농장 위치를 표시하는 지도 컴포넌트
 * 
 * MVP에서는 실제 지도 API 없이 좌표와 주소를 텍스트로 표시
 * 향후 Google Maps 또는 Naver Maps 연동 가능하도록 구조 설계
 */

import React from 'react';

function FarmMap({ latitude, longitude, address }) {
  return (
    <div data-testid="farm-map" style={styles.container}>
      <div style={styles.mapPlaceholder}>
        <div style={styles.coordinates}>
          <p style={styles.label}>위도: {latitude}</p>
          <p style={styles.label}>경도: {longitude}</p>
        </div>
        {address && (
          <div style={styles.address}>
            <p style={styles.addressText}>{address}</p>
          </div>
        )}
        <div style={styles.note}>
          <p style={styles.noteText}>
            지도 시각화 기능은 곧 추가될 예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    marginTop: '1rem',
  },
  mapPlaceholder: {
    width: '100%',
    minHeight: '300px',
    backgroundColor: '#f8f9fa',
    border: '2px dashed #dee2e6',
    borderRadius: '8px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coordinates: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
  label: {
    fontSize: '1rem',
    color: '#333',
    margin: '0.5rem 0',
    fontWeight: '500',
  },
  address: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '4px',
    textAlign: 'center',
  },
  addressText: {
    fontSize: '1.1rem',
    color: '#007bff',
    fontWeight: '500',
    margin: 0,
  },
  note: {
    marginTop: '1.5rem',
  },
  noteText: {
    fontSize: '0.9rem',
    color: '#999',
    fontStyle: 'italic',
    margin: 0,
  },
};

export default FarmMap;

