// ArticleSlider.tsx
'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Article } from '@/types';
import { articlesData } from '@/data/articles';

import 'swiper/css';
import 'swiper/css/pagination';

interface ArticleSliderProps {
    articles?: Article[];
}

export default function ArticleSlider({ articles = articlesData }: ArticleSliderProps) {
    const [, setSwiper] = useState<SwiperType | null>(null);

    useEffect(() => {
        // 注入樣式 - 使用更高的選擇器優先級而非 !important
        const style = document.createElement('style');
        style.innerHTML = `
            section#articles .my-article-swiper {
                padding-bottom: 60px;
            }
            
            section#articles .my-article-swiper .swiper-wrapper {
                align-items: stretch;
            }
            
            section#articles .my-article-swiper .swiper-slide {
                height: auto;
            }
            
            section#articles .my-article-swiper .swiper-pagination {
                bottom: 10px;
                left: 0;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }
            
            section#articles .my-article-swiper .swiper-pagination-bullet {
                width: 12px;
                height: 12px;
                background-color: rgba(255, 255, 255, 0.5);
                border: 2px solid rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                opacity: 1;
                margin: 0;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            section#articles .my-article-swiper .swiper-pagination-bullet-active {
                width: 36px;
                height: 12px;
                background: linear-gradient(to right, #FDD835, #FFB300);
                border: 2px solid #FDD835;
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(253, 216, 53, 0.6);
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <section 
            id="articles" 
            style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                backgroundColor: '#1B5E20'
            }}
        >
            {/* 背景圖片 */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0
            }}>
                <img 
                    src="/asbg.jpg" 
                    alt="Background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.85), rgba(46, 125, 50, 0.1))'
                }}></div>
            </div>

            {/* 內容區域 */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '100px 24px 120px'
            }}>
                {/* 標題區塊 */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '70px'
                }}>
                    <h2 style={{
                        fontSize: '52px',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        marginBottom: '24px',
                        textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        letterSpacing: '2px'
                    }}>
                        文章精選
                    </h2>
                    <div style={{
                        width: '120px',
                        height: '5px',
                        background: 'linear-gradient(to right, #FDD835, #FFB300)',
                        margin: '0 auto',
                        boxShadow: '0 2px 8px rgba(253, 216, 53, 0.5)'
                    }}></div>
                </div>

                {/* Swiper 容器 */}
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        className="my-article-swiper"
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        onSwiper={setSwiper}
                    >
                        {articles.map((article) => (
                            <SwiperSlide key={article.id}>
                                <div 
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        border: '2px solid rgba(253, 216, 53, 0.3)',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                                    }}
                                >
                                    {/* 圖片區域 */}
                                    <div style={{
                                        position: 'relative',
                                        width: '100%',
                                        paddingTop: '60%',
                                        overflow: 'hidden',
                                        backgroundColor: '#f5f5f5'
                                    }}>
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        {/* 日期標籤 */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '16px',
                                            left: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '13px',
                                            color: '#F57F17',
                                            fontWeight: '600',
                                            backgroundColor: '#FFF9C4',
                                            padding: '6px 12px',
                                            borderRadius: '16px',
                                            border: '1px solid #FDD835',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                        }}>
                                            <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            <span>
                                                {new Date(article.date).toLocaleDateString('zh-TW', { 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* 內容區域 */}
                                    <div style={{ 
                                        padding: '24px',
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <h3 style={{
                                            fontSize: '22px',
                                            fontWeight: 'bold',
                                            marginBottom: '12px',
                                            color: '#1B5E20',
                                            lineHeight: '1.4',
                                            minHeight: '66px',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {article.title}
                                        </h3>

                                        <p style={{
                                            fontSize: '16px',
                                            color: '#2E7D32',
                                            marginBottom: '12px',
                                            fontWeight: '500',
                                            lineHeight: '1.5',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {article.excerpt}
                                        </p>

                                        <p style={{
                                            fontSize: '15px',
                                            color: '#666',
                                            lineHeight: '1.6',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            flex: 1
                                        }}>
                                            {article.content}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}