/**
 * LazyImage 컴포넌트
 * 지연 로딩 이미지 컴포넌트
 */

import React, { useState, useRef, useEffect } from 'react';
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

export default LazyImage;

