'use client';

import { useState, useEffect } from 'react';

export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 監聽滾動事件
  useEffect(() => {
    const toggleVisibility = () => {
      // 當頁面滾動超過 300px 時顯示按鈕
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // 滾動到頂部的函數
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="go-to-top"
          aria-label="回到頂部"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}

      <style jsx>{`
        .go-to-top {
          position: fixed;
          bottom: 40px;
          right: 40px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #66BB6A, #2E7D32);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.4);
          z-index: 100;
          transition: all 0.3s ease;
          animation: fadeIn 0.3s ease;
        }

        .go-to-top:hover {
          background: linear-gradient(135deg, #5AA75C, #1B5E20);
          box-shadow: 0 6px 16px rgba(46, 125, 50, 0.6);
          transform: translateY(-3px);
        }

        .go-to-top:active {
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(46, 125, 50, 0.4);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 手機版調整 */
        @media screen and (max-width: 768px) {
          .go-to-top {
            bottom: 30px;
            right: 30px;
            width: 45px;
            height: 45px;
          }
        }

        @media screen and (max-width: 480px) {
          .go-to-top {
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
          }

          .go-to-top svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </>
  );
}