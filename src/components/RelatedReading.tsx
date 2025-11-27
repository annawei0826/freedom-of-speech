// RelatedReading.tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function RelatedReading() {
    const [articles, setArticles] = useState<Array<{
        image_url?: string;
        title?: string;
        part_text?: string;
        href?: string;
    }>>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('https://www.businesstoday.com.tw/tag/toJson/?name=言論自由&limit=20');
                const data = await response.json();
                if (data && data.article_lists) {
                    setArticles(data.article_lists);
                }
            } catch (error) {
                console.error('Failed to fetch articles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <section id="sec6" style={{
            backgroundColor: '#FDF4CC'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '60px 20px 100px 20px'
            }}>
                {/* 標題區塊 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: '60px'
                }}>
                    {/* 左側線條 */}
                    <div style={{
                        width: '6px',
                        height: '80px',
                        background: 'linear-gradient(to bottom, #66BB6A, #2E7D32)',
                        borderRadius: '3px'
                    }}></div>

                    {/* 標題文字 */}
                    <div>
                        <h2 style={{
                            fontSize: '48px',
                            fontWeight: 'bold',
                            color: '#554B3D',
                            margin: '0 0 8px 0',
                            lineHeight: '1.2'
                        }}>
                            延伸閱讀
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: '#66BB6A',
                            margin: '0',
                            fontWeight: '500'
                        }}>
                            Further Reading
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px'
                    }}>
                        <div style={{
                            display: 'inline-block',
                            width: '40px',
                            height: '40px',
                            border: '4px solid #66BB6A',
                            borderTop: '4px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <style>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </div>
                ) : (
                    <>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '30px',
                            marginBottom: '50px'
                        }}>
                            {articles.slice(0, showAll ? articles.length : 3).map((item: any, index: number) => (
                                <div key={index} style={{
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}>
                                    <img
                                        src={item.image_url || ''}
                                        alt={item.title || ''}
                                        style={{
                                            width: '100%',
                                            height: '180px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div style={{
                                        padding: '16px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexGrow: 1
                                    }}>
                                        <h3 style={{
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            color: '#554B3D',
                                            margin: '0 0 12px 0',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {item.title || ''}
                                        </h3>
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#666',
                                            margin: '0 0 16px 0',
                                            lineHeight: '1.5',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                            flexGrow: 1
                                        }}>
                                            {item.part_text || ''}
                                        </p>
                                        <a
                                            href={item.href || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'block',
                                                padding: '10px 24px',
                                                backgroundColor: '#66BB6A',
                                                color: 'white',
                                                textDecoration: 'none',
                                                borderRadius: '20px',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                textAlign: 'center',
                                                transition: 'all 0.3s ease-in-out',
                                                marginTop: 'auto'
                                            }}
                                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                (e.target as HTMLAnchorElement).style.backgroundColor = '#5AA75C';
                                            }}
                                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                                (e.target as HTMLAnchorElement).style.backgroundColor = '#66BB6A';
                                            }}
                                        >
                                            閱讀更多
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {articles.length > 3 && (
                            <div style={{
                                textAlign: 'center',
                                paddingTop: '30px'
                            }}>
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        padding: '10px 24px',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        color: '#66BB6A',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        borderBottom: '2px solid #66BB6A',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease-in-out'
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLButtonElement).style.color = '#5AA75C';
                                        (e.target as HTMLButtonElement).style.borderBottomColor = '#5AA75C';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLButtonElement).style.color = '#66BB6A';
                                        (e.target as HTMLButtonElement).style.borderBottomColor = '#66BB6A';
                                    }}
                                >
                                    {showAll ? '收合文章' : '載入更多文章'}
                                    <span style={{
                                        display: 'inline-block',
                                        transition: 'transform 0.3s ease-in-out',
                                        transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }}>
                                        ▼
                                    </span>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <style>{`
                @media screen and (max-width: 1024px) {
                    #sec6 > div {
                        padding: 50px 20px 80px 20px !important;
                    }
                }

                @media screen and (max-width: 768px) {
                    #sec6 > div {
                        padding: 40px 16px 70px 16px !important;
                    }

                    #sec6 h2 {
                        font-size: 36px !important;
                    }

                    #sec6 p {
                        font-size: 16px !important;
                    }
                }

                @media screen and (max-width: 480px) {
                    #sec6 > div {
                        padding: 30px 12px 60px 12px !important;
                    }

                    #sec6 h2 {
                        font-size: 28px !important;
                    }
                }
            `}</style>
        </section>
    );
}