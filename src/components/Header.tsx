'use client';

import React, { useState, useEffect } from 'react';

const menuItems = [
  { name: '引言', link: 'introduction' },
  { name: '文章', link: 'articles' },
  { name: '數據', link: 'data' },
  { name: '延伸閱讀', link: 'sec6' }
];

// 桌面版 Header 總高度： 94px (Logo) + 20px (上) + 20px (下) = 134px
const HEADER_HEIGHT_DESKTOP = '134px'; 
// 手機版 Header 總高度： 60px (Logo) + 10px (上) + 10px (下) = 80px
const HEADER_HEIGHT_MOBILE = '80px'; 

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 由於 Header 鎖定在 80px 或 134px，我們用 80px offset 應該是安全的
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      setIsNavOpen(false);
    }
  };

  return (
    <>
      <header id="HEADER" className={isScrolled ? 'reveal' : ''}>
        
        {/* 簡化結構，直接使用 img */}
        <img 
            src="/logo.png" 
            className="logo" 
            alt="Logo" 
        />

        <div id="NAV" className={`nav-mobile ${isNavOpen ? 'reveal' : ''}`}>
          <nav>
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="scroll_btn"
                onClick={() => scrollToSection(item.link)}
              >
                {item.name}
              </div>
            ))}
          </nav>
        </div>

        {/* 恢復漢堡按鈕結構 */}
        <div className="NAV_btn_wrap" onClick={() => setIsNavOpen(!isNavOpen)}>
          <div id="nav-icon3" className={`light ${isNavOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <style jsx>{`
        /* 基礎 HEADER 樣式 */
        #HEADER {
          position: fixed;
          width: 100%;
          top: 0px;
          left: 0px;
          z-index: 50;
          display: flex; 
          justify-content: space-between;
          align-items: center;
          background-color: #FDF4CC;
          padding: 0;
          box-sizing: border-box; 
          transition: background-color 0.3s ease, box-shadow 0.3s ease; 
          
          /* 🔑 桌面版終極修復：鎖定 Header 總高度 */
          min-height: ${HEADER_HEIGHT_DESKTOP}; 
        }

        #HEADER.reveal {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        }

        /* --------------------------------- */
        /* 1. 桌面版 Logo 樣式 (依賴 Header 的 min-height) */
        /* --------------------------------- */
        .logo {
            /* 桌面版 Logo 尺寸和邊距 */
            width: 94px; 
            height: 94px; /* 鎖定高度，防止 Logo 載入時跳動 */
            margin-left: 30px;
            margin-top: 20px;
            margin-bottom: 20px;
            
            /* 確保圖片在固定尺寸內穩定顯示 */
            object-fit: contain; 
            display: block; 
        }

        /* 桌面版 NAV 樣式 (> 1440px) */
        #NAV {
          z-index: 52;
          height: 100%;
          box-sizing: border-box;
          margin-right: 30px;
          display: inline-block; 
        }

        nav {
          display: inline-block;
          height: 100%; 
          text-align: right;
          position: relative;
        }
        
        nav div {
          display: inline-block;
          vertical-align: middle;
          outline: none;
          cursor: pointer;
          box-sizing: border-box;
          padding-left: 20px;
          padding-right: 20px;
          /* 🔑 關鍵：確保文字行高與 Header 總高度一致，防止垂直閃現 */
          line-height: ${HEADER_HEIGHT_DESKTOP}; 
          font-size: 20px;
          color: #554B3D;
        }
        
        /* 漢堡按鈕 - 桌面版隱藏 */
        .NAV_btn_wrap {
          display: none;
        }
        
        /* --- 漢堡按鈕動畫 (保持不變) --- */
        #nav-icon3 {
          width: 30px; height: 25px; position: relative; margin: 0px auto;
          transform: rotate(0deg); transition: .5s ease-in-out; cursor: pointer;
          display: flex; align-items: center;
        }
        #nav-icon3 span {
          display: block; position: absolute; height: 2px; width: 100%;
          border-radius: 2px; opacity: 1; left: 0; transform: rotate(0deg);
          transition: .25s ease-in-out; box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.56);
          background: #000;
        }
        #nav-icon3 span:nth-child(1) { top: 0px; }
        #nav-icon3 span:nth-child(2), #nav-icon3 span:nth-child(3) { top: 10px; }
        #nav-icon3 span:nth-child(2) { display: none; }
        #nav-icon3 span:nth-child(4) { top: 20px; }
        #nav-icon3.open span { background: #000; }
        #nav-icon3.open span:nth-child(1) { top: 18px; width: 0%; left: 50%; }
        #nav-icon3.open span:nth-child(2) { display: block; transform: rotate(45deg); }
        #nav-icon3.open span:nth-child(3) { transform: rotate(-45deg); }
        #nav-icon3.open span:nth-child(4) { top: 18px; width: 0%; left: 50%; }
        /* ------------------------------------------ */


        /* ========================================= */
        /* 手機版樣式 - 1440px 以下 */
        /* ========================================= */
        @media screen and (max-width: 1440px) {
          
          /* 🔑 手機版終極修復：鎖定 Header 總高度 */
          #HEADER {
            min-height: ${HEADER_HEIGHT_MOBILE}; 
          }

          /* 2. 手機版 Logo 樣式 */
          .logo {
              width: 60px;
              height: 60px;
              margin-left: 20px;
              margin-top: 10px;
              margin-bottom: 10px;
          }
          
          /* 顯示漢堡按鈕，並確保高度穩定 */
          .NAV_btn_wrap {
            display: flex;
            align-items: center;
            position: relative;
            width: 60px;
            /* 讓漢堡按鈕容器的高度與 Header min-height 一致 */
            height: ${HEADER_HEIGHT_MOBILE}; 
            margin-right: 20px;
            z-index: 53;
          }
          
          /* NAV 變成全屏選單 - 徹底隱藏 (解決選單閃現) */
          #NAV {
            position: fixed;
            z-index: 52;
            width: 100%;
            height: 100%;
            background: #FDF4CC;
            left: 0px;
            top: 0px; 
            
            /* 💥 確保在 JS 渲染前，純 CSS 將其隱藏且不佔空間 */
            display: none; 
            opacity: 0; 
            transition: none; 
          }

          #NAV.reveal {
            display: block; 
            opacity: 1;
            transition: opacity 0.3s ease; 
          }
          
          /* Nav 內部樣式調整 */
          nav {
            display: block; 
            width: 100%;
            height: auto;
            text-align: center;
            position: relative;
            /* 讓內容向下偏移，避開 Header 的 80px 高度 */
            margin-top: ${HEADER_HEIGHT_MOBILE}; 
          }

          /* 選單項目垂直排列 */
          nav div {
            display: block;
            width: 100%;
            padding: 0;
            line-height: 60px;
            font-size: 24px;
            color: #554B3D;
          }
        }
      `}</style>
    </>
  );
}