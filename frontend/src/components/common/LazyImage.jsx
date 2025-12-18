/**
 * LazyImage 컴포넌트
 * 지연 로딩 이미지 컴포넌트
 * IntersectionObserver를 사용하여 뷰포트에 들어올 때 이미지를 로드합니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.src - 이미지 URL
 * @param {string} props.alt - 이미지 대체 텍스트
 * @param {string} props.placeholder - 플레이스홀더 이미지 URL (기본값: '/images/placeholder.jpg')
 * @param {Object} props.style - 인라인 스타일 객체
 * @returns {JSX.Element} LazyImage 컴포넌트
 * 
 * @example
 * <LazyImage
 *   src="/images/product.jpg"
 *   alt="상품 이미지"
 *   style={{ width: '100%', height: '200px' }}
 * />
 */

import React, { useState, useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { getWebPImageUrl, handleImageError } from '../../utils/imageUtils';

function LazyImage({
  src,
  alt,
  placeholder = '/images/placeholder.jpg',
  style = {},
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // 뷰포트에 들어오기 50px 전에 로드 시작
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const imageStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s',
    ...style,
  };

  const placeholderStyle = {
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    fontSize: '0.9rem',
    ...style,
  };

  return (
    <div ref={imgRef} style={!isLoaded ? placeholderStyle : {}}>
      {isInView && (
        <img
          src={getWebPImageUrl(src || placeholder)}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => handleImageError(e, placeholder)}
          style={imageStyle}
          loading="lazy"
          {...props}
        />
      )}
      {!isInView && (
        <div style={placeholderStyle}>
          <span>로딩 중...</span>
        </div>
      )}
    </div>
  );
}

LazyImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.object,
};

LazyImage.defaultProps = {
  placeholder: '/images/placeholder.jpg',
  style: {},
};

export default memo(LazyImage);

