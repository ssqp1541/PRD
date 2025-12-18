/**
 * 이미지 유틸리티 함수
 * WebP 형식 지원 및 이미지 최적화
 */

/**
 * WebP 형식 지원 여부 확인
 * @returns {boolean} WebP 지원 여부
 */
export function isWebPSupported() {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * 이미지 URL을 WebP 형식으로 변환
 * @param {string} imageUrl - 원본 이미지 URL
 * @returns {string} WebP 이미지 URL 또는 원본 URL
 */
export function getWebPImageUrl(imageUrl) {
  if (!imageUrl) return imageUrl;

  // WebP를 지원하지 않으면 원본 URL 반환
  if (!isWebPSupported()) {
    return imageUrl;
  }

  // 이미 WebP 형식이면 그대로 반환
  if (imageUrl.toLowerCase().endsWith('.webp')) {
    return imageUrl;
  }

  // URL에서 확장자를 .webp로 변경
  // 예: image.jpg -> image.webp
  const urlWithoutExtension = imageUrl.replace(/\.[^/.]+$/, '');
  return `${urlWithoutExtension}.webp`;
}

/**
 * 이미지 지연 로딩을 위한 srcset 생성
 * @param {string} imageUrl - 원본 이미지 URL
 * @param {Array<number>} sizes - 이미지 크기 배열 (예: [400, 800, 1200])
 * @returns {string} srcset 문자열
 */
export function generateSrcSet(imageUrl, sizes = [400, 800, 1200]) {
  if (!imageUrl) return '';

  const baseUrl = imageUrl.replace(/\.[^/.]+$/, '');
  const extension = imageUrl.match(/\.[^/.]+$/)?.[0] || '.jpg';

  return sizes
    .map((size) => {
      const webpUrl = `${baseUrl}-${size}w${extension}`;
      return `${getWebPImageUrl(webpUrl)} ${size}w`;
    })
    .join(', ');
}

/**
 * 이미지 로드 에러 처리 (폴백 이미지)
 * @param {Event} event - 이미지 로드 에러 이벤트
 * @param {string} fallbackUrl - 폴백 이미지 URL
 */
export function handleImageError(event, fallbackUrl = '/images/placeholder.jpg') {
  if (event.target.src !== fallbackUrl) {
    event.target.src = fallbackUrl;
  }
}

