'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // 新增:追蹤組件是否已掛載

  const menuItems = [
    { name: '引言', link: 'introduction' },
    { name: '文章', link: 'articles' },
    { name: '數據', link: 'data' },
    { name: '延伸閱讀', link: 'sec6' }
  ];

  // 新增:組件掛載後設置為 true
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      setIsNavOpen(false);
    }
  };

  return (
    <>
      <header
        id="HEADER"
        className={isScrolled ? 'reveal' : ''}
      >
        <img src="/logo.png" className="logo" alt="Logo" />

        <div
          id="NAV"
          className={`nav-mobile ${isNavOpen ? 'reveal' : ''} ${isMounted ? 'mounted' : ''}`}
        >
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
        }

        #HEADER.reveal {
          background-color: #FDF4CC;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
        }

        /* Logo - 左側,與邊緣保持 30px */
        .logo {
          width: 94px;
          margin-top: 20px;
          margin-bottom: 20px;
          margin-left: 30px;
          position: relative;
          z-index: 51;
        }

        /* NAV - 桌面版顯示在右側,與邊緣保持 30px */
        #NAV {
          z-index: 52;
          height: 60px;
          box-sizing: border-box;
          transition: ease-in-out 0.3s;
          margin-right: 30px;
        }

        nav {
          display: inline-block;
          height: 60px;
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
          line-height: 60px;
          text-align: center;
          font-size: 20px;
          color: #554B3D;
        }

        nav div:hover {
          opacity: 0.5;
          transition: ease-in-out 0.3s;
        }

        /* 漢堡按鈕 - 預設隱藏 */
        .NAV_btn_wrap {
          display: none;
        }

        /* 漢堡按鈕動畫 */
        #nav-icon3 {
          width: 30px;
          height: 25px;
          position: relative;
          margin: 0px auto;
          transform: rotate(0deg);
          transition: .5s ease-in-out;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        #nav-icon3 span {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          border-radius: 2px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: .25s ease-in-out;
          box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.56);
        }

        #nav-icon3.light span {
          background: #000;
        }

        #nav-icon3 span:nth-child(1) {
          top: 0px;
        }

        #nav-icon3 span:nth-child(2),
        #nav-icon3 span:nth-child(3) {
          top: 10px;
        }

        #nav-icon3 span:nth-child(2) {
          display: none;
        }

        #nav-icon3 span:nth-child(4) {
          top: 20px;
        }

        #nav-icon3.open span {
          background: #000;
        }

        #nav-icon3.open span:nth-child(1) {
          top: 18px;
          width: 0%;
          left: 50%;
        }

        #nav-icon3.open span:nth-child(2) {
          display: block;
          transform: rotate(45deg);
        }

        #nav-icon3.open span:nth-child(3) {
          transform: rotate(-45deg);
        }

        #nav-icon3.open span:nth-child(4) {
          top: 18px;
          width: 0%;
          left: 50%;
        }

        /* 手機版樣式 - 1440px 以下 */
        @media screen and (max-width: 1440px) {
          /* Logo 縮小 */
          .logo {
            width: 60px;
            margin-left: 20px;
          }

          /* 顯示漢堡按鈕,與邊緣保持 20px */
          .NAV_btn_wrap {
            display: flex;
            align-items: center;
            position: relative;
            width: 60px;
            height: 60px;
            margin-right: 20px;
            z-index: 53;
          }

          /* NAV 變成全屏選單 */
          #NAV {
            position: fixed;
            z-index: 52;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            transition: ease-in-out 0.3s;
            text-align: center;
            background: #FDF4CC;
            left: 0px;
            top: -100%;
            opacity: 0; /* 新增:初始完全透明 */
          }

          /* 組件掛載後才啟用過渡效果 */
          #NAV.mounted {
            opacity: 1;
            transition: top 0.3s ease-in-out, opacity 0.3s ease-in-out;
          }

          /* 選單打開時滑入 */
          #NAV.reveal {
            top: 0%;
          }

          /* 選單未打開時隱藏 */
          .nav-mobile:not(.reveal) {
            visibility: hidden;
          }
          
          .nav-mobile:not(.reveal) nav {
            opacity: 0;
            pointer-events: none;
          }
          
          /* 選單打開時顯示 */
          .nav-mobile.reveal {
            visibility: visible;
          }

          .nav-mobile.reveal nav {
            opacity: 1;
            pointer-events: auto;
            transition: opacity 0.3s ease 0.3s;
          }

          /* Nav 內部樣式調整 */
          nav {
            display: inline-block;
            width: 100%;
            height: auto;
            text-align: center;
            position: relative;
            margin-top: 100px;
          }

          /* 選單項目變成垂直排列 */
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