'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      id="hero"
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#1B5E20',
        overflow: 'hidden'
      }}
    >
      <picture style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <source 
          media="(min-width: 768px)" 
          srcSet="/herocm.png" 
        />
        <img 
          src="/heromb.png" 
          alt="Freedom of Speech Background"
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center'
          }}
        />
      </picture>
      
      {/* 深色遮罩層 - 只在右半邊 */}
      {!isMobile && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to left, rgba(27, 94, 32, 0.7), transparent)',
            zIndex: 1
          }}
        />
      )}

      {/* 手機版遮罩 - 上方輕微遮罩 */}
      {isMobile && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), transparent 40%)',
            zIndex: 1
          }}
        />
      )}
      
      {/* 內容區域 - 電腦版 */}
      {!isMobile && (
        <div 
          style={{ 
            position: 'absolute',
            right: '5%',  // 🔥 調整這個：數字越小越靠右 (0%~20%)
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2
          }}
        >
          <div style={{ textAlign: 'center', width: '400px' }}>
            {/* 上標籤 */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#FDD835',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Digital Feature
              </span>
            </div>
            
            {/* 主標題 */}
            <h1 style={{
              fontSize: '72px',
              fontWeight: '900',
              color: '#FFFFFF',
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
              marginBottom: '24px',
              lineHeight: '1.2',
              margin: 0
            }}>
              言論自由
            </h1>

            {/* 裝飾線 */}
            <div style={{
              width: '60px',
              height: '3px',
              background: 'linear-gradient(to right, #FDD835, #FFB300)',
              margin: '0 auto 32px',
              boxShadow: '0 2px 8px rgba(253, 216, 53, 0.6)'
            }}></div>

            {/* 副標題 */}
            <p style={{
              fontSize: '16px',
              color: '#E8F5E9',
              lineHeight: '1.8',
              fontWeight: '400',
              margin: 0
            }}>
              探索全球 180 個國家的新聞自由現況,了解言論自由在當今世界的重要性
            </p>
          </div>
        </div>
      )}

      {/* 內容區域 - 手機版 */}
      {isMobile && (
        <div 
          style={{ 
            position: 'absolute',
            width: '100%',
            top: '15%',  // 🔥 調整這個：數字越大越靠下 (10%~30%)
            left: '0',
            paddingLeft: '24px',
            paddingRight: '24px',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '100%' }}>
            {/* 上標籤 */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#FDD835',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Digital Feature
              </span>
            </div>
            
            {/* 主標題 */}
            <h1 style={{
              fontSize: 'clamp(42px, 10vw, 56px)',
              fontWeight: '900',
              color: '#FFFFFF',
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
              marginBottom: '20px',
              lineHeight: '1.2',
              margin: '0 0 20px 0'
            }}>
              言論自由
            </h1>

            {/* 裝飾線 */}
            <div style={{
              width: '50px',
              height: '2px',
              background: 'linear-gradient(to right, #FDD835, #FFB300)',
              margin: '0 auto 24px',
              boxShadow: '0 2px 8px rgba(253, 216, 53, 0.6)'
            }}></div>

            {/* 副標題 */}
            <p style={{
              fontSize: 'clamp(13px, 3vw, 15px)',
              color: '#E8F5E9',
              lineHeight: '1.8',
              fontWeight: '400',
              maxWidth: '90vw',
              margin: 0
            }}>
              探索全球 180 個國家的新聞自由現況
              <br />
              了解言論自由在當今世界的重要性
            </p>
          </div>
        </div>
      )}
    </div>
  );
}