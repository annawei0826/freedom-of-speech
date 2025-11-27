// DataChart.tsx
'use client';

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import rsfData from "@/data/rsf-2025.json";

// 完整的地圖名稱 -> JSON Country_EN 映射表
const mapNameToJsonName: { [key: string]: string } = {
    "Norway": "Norway", "Estonia": "Estonia", "Netherlands": "Netherlands", "Sweden": "Sweden",
    "Finland": "Finland", "Denmark": "Denmark", "Ireland": "Ireland", "Portugal": "Portugal",
    "Switzerland": "Switzerland", "Czechia": "Czechia", "Germany": "Germany", "Liechtenstein": "Liechtenstein",
    "Luxembourg": "Luxembourg", "Lithuania": "Lithuania", "Latvia": "Latvia", "New Zealand": "New Zealand",
    "Iceland": "Iceland", "Belgium": "Belgium", "Trinidad and Tobago": "Trinidad and Tobago",
    "United Kingdom": "United Kingdom", "Canada": "Canada", "Austria": "Austria", "Spain": "Spain",
    "Taiwan": "Taiwan", "France": "France", "Jamaica": "Jamaica", "South Africa": "South Africa",
    "Namibia": "Namibia", "Australia": "Australia", "Cabo Verde": "Cabo Verde", "Poland": "Poland",
    "Suriname": "Suriname", "Slovenia": "Slovenia", "Armenia": "Armenia", "Moldova": "Moldova",
    "Costa Rica": "Costa Rica", "Montenegro": "Montenegro", "Slovakia": "Slovakia", "East Timor": "East Timor",
    "Fiji": "Fiji", "Gabon": "Gabon", "North Macedonia": "North Macedonia", "Dominican Republic": "Dominican Republic",
    "Samoa": "Samoa", "Seychelles": "Seychelles", "Tonga": "Tonga", "Belize": "Belize",
    "Italy": "Italy", "Mauritania": "Mauritania", "Mauritius": "Mauritius", "Ghana": "Ghana",
    "Panama": "Panama", "Liberia": "Liberia", "Romania": "Romania", "Sierra Leone": "Sierra Leone",
    "United States": "United States", "United States of America": "United States", "Gambia": "Gambia",
    "Uruguay": "Uruguay", "Croatia": "Croatia", "Korea": "South Korea", "Ukraine": "Ukraine",
    "Brazil": "Brazil", "Côte d'Ivoire": "Cote d'Ivoire", "Cote d'Ivoire": "Cote d'Ivoire",
    "Andorra": "Andorra", "Japan": "Japan", "Malta": "Malta", "Hungary": "Hungary",
    "Chile": "Chile", "Bulgaria": "Bulgaria", "Congo-Brazzaville": "Congo-Brazzaville",
    "Republic of the Congo": "Congo-Brazzaville", "Central African Republic": "Central African Republic",
    "Guyana": "Guyana", "Senegal": "Senegal", "Comoros": "Comoros", "Malawi": "Malawi",
    "Cyprus": "Cyprus", "Papua New Guinea": "Papua New Guinea", "Qatar": "Qatar", "Albania": "Albania",
    "Botswana": "Botswana", "Zambia": "Zambia", "Niger": "Niger", "Paraguay": "Paraguay",
    "Thailand": "Thailand", "Bosnia-Herzegovina": "Bosnia-Herzegovina", "Bosnia and Herz.": "Bosnia-Herzegovina",
    "Argentina": "Argentina", "Malaysia": "Malaysia", "Greece": "Greece", "Nepal": "Nepal",
    "Northern Cyprus": "Northern Cyprus", "Benin": "Benin", "Bolivia": "Bolivia", "Ecuador": "Ecuador",
    "Tanzania": "Tanzania", "Serbia": "Serbia", "Brunei": "Brunei", "Eswatini": "Eswatini",
    "Kosovo": "Kosovo", "Angola": "Angola", "Mozambique": "Mozambique", "Mongolia": "Mongolia",
    "Guinea": "Guinea", "Maldives": "Maldives", "Burkina Faso": "Burkina Faso", "Zimbabwe": "Zimbabwe",
    "Lesotho": "Lesotho", "Chad": "Chad", "S. Sudan": "South Sudan", "Guinea-Bissau": "Guinea-Bissau",
    "Haiti": "Haiti", "Israel": "Israel", "Madagascar": "Madagascar", "Georgia": "Georgia",
    "Colombia": "Colombia", "Philippines": "Philippines", "Kenya": "Kenya", "Equatorial Guinea": "Equatorial Guinea",
    "Mali": "Mali", "Morocco": "Morocco", "W. Sahara": "Morocco", "Western Sahara": "Morocco",
    "Togo": "Togo", "Nigeria": "Nigeria", "Singapore": "Singapore", "Mexico": "Mexico",
    "Burundi": "Burundi", "Algeria": "Algeria", "Indonesia": "Indonesia", "Kuwait": "Kuwait",
    "Tunisia": "Tunisia", "Peru": "Peru", "Cameroon": "Cameroon", "Lebanon": "Lebanon",
    "Democratic Republic of the Congo": "Democratic Republic of the Congo", "Dem. Rep. Congo": "Democratic Republic of the Congo",
    "Oman": "Oman", "El Salvador": "El Salvador", "Somalia": "Somalia", "Libya": "Libya",
    "Guatemala": "Guatemala", "Sri Lanka": "Sri Lanka", "Hong Kong": "Hong Kong", "Kazakhstan": "Kazakhstan",
    "Honduras": "Honduras", "Uganda": "Uganda", "Kyrgyzstan": "Kyrgyzstan", "Ethiopia": "Ethiopia",
    "Rwanda": "Rwanda", "Jordan": "Jordan", "Uzbekistan": "Uzbekistan", "Bangladesh": "Bangladesh",
    "Laos": "Laos", "India": "India", "Bhutan": "Bhutan", "Tajikistan": "Tajikistan",
    "Yemen": "Yemen", "Iraq": "Iraq", "Sudan": "Sudan", "Bahrain": "Bahrain",
    "Pakistan": "Pakistan", "Turkey": "Turkey", "Venezuela": "Venezuela", "Cambodia": "Cambodia",
    "Saudi Arabia": "Saudi Arabia", "Palestine": "Palestine", "United Arab Emirates": "United Arab Emirates",
    "Cuba": "Cuba", "Belarus": "Belarus", "Azerbaijan": "Azerbaijan", "Djibouti": "Djibouti",
    "Myanmar": "Myanmar", "Egypt": "Egypt", "Russia": "Russia", "Nicaragua": "Nicaragua",
    "Vietnam": "Vietnam", "Turkmenistan": "Turkmenistan", "Afghanistan": "Afghanistan", "Iran": "Iran",
    "Syria": "Syria", "China": "China", "Dem. Rep. Korea": "North Korea", "Eritrea": "Eritrea",
    "Greenland": "Denmark", "Congo": "Congo-Brazzaville", "Central African Rep.": "Central African Republic","Lao PDR": "Laos","Czech Rep.": "Czechia"
    
};

export default function DataChart() {
    const chartRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
    const [hoveredCountry, setHoveredCountry] = useState<any | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(true);

    // 初始化
    useEffect(() => {
        setFilteredCountries(rsfData); // 顯示所有 180 個國家
    }, []);

    // 搜尋過濾邏輯
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredCountries(rsfData); // 顯示所有國家
        } else {
            const filtered = rsfData.filter(item =>
                item.Country_ZH.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.Country_EN.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCountries(filtered);
        }
    }, [searchQuery]);

    useEffect(() => {
        const initChart = async () => {
            if (!chartRef.current) return;

            const existingInstance = echarts.getInstanceByDom(chartRef.current);
            if (existingInstance) existingInstance.dispose();

            const chart = echarts.init(chartRef.current);
            chart.showLoading();

            try {
                const mapResponse = await fetch('https://raw.githubusercontent.com/apache/echarts/master/test/data/map/json/world.json');
                const mapJson = await mapResponse.json();
                echarts.registerMap('world', mapJson);
                chart.hideLoading();

                const dataMap = new Map();
                rsfData.forEach(item => {
                    dataMap.set(item.Country_EN, {
                        value: parseFloat(item["Score 2025"].replace(',', '.')),
                        rank: item.Rank,
                        nameZH: item.Country_ZH,
                        Country_EN: item.Country_EN,
                    });
                });

                const mapData: any[] = [];
                if (mapJson.features) {
                    mapJson.features.forEach((feature: any) => {
                        const mapName = feature.properties?.name;
                        if (mapName && mapNameToJsonName[mapName]) {
                            const jsonName = mapNameToJsonName[mapName];
                            const data = dataMap.get(jsonName);
                            if (data) {
                                mapData.push({
                                    name: mapName,
                                    value: data.value,
                                    rank: data.rank,
                                    nameZH: data.nameZH,
                                    Country_EN: data.Country_EN,
                                    Political: data.Political,
                                    Economic: data.Economic,
                                    Legal: data.Legal,
                                    Social: data.Social,
                                    Security: data.Security,
                                    RankChange: data.RankChange
                                });
                            }
                        }
                    });
                }

                const option = {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderColor: '#2E7D32',
                        borderWidth: 2,
                        textStyle: { color: '#1B5E20', fontSize: 14 },
                        padding: 15,
                        formatter: function (params: any) {
                            if (params.data && params.data.rank) {
                                return `<div style="font-weight: bold; margin-bottom: 8px; font-size: 16px; color: #1B5E20;">${params.data.nameZH}</div>
                                <div style="margin: 5px 0;">排名: <span style="font-weight: bold; color: #2E7D32;">#${params.data.rank}</span></div>
                                <div>得分: <span style="font-weight: bold; color: #2E7D32;">${params.value}</span></div>`;
                            }
                            return '';
                        }
                    },
                    visualMap: {
                        type: 'continuous',
                        min: 0,
                        max: 100,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],
                        calculable: true,
                        inRange: {
                            color: ['#d94e5d', '#e8905a', '#f2c55c', '#f5e89a', '#c8d89f', '#94c4a4', '#5ba3a8']
                        },
                        outOfRange: {
                            color: '#e0e0e0'
                        }
                    },
                    series: [{
                        name: '新聞自由指數',
                        type: 'map',
                        map: 'world',
                        roam: true,
                        itemStyle: {
                            areaColor: '#e0e0e0',
                            borderColor: '#fff',
                            borderWidth: 0.5
                        },
                        emphasis: {
                            itemStyle: {
                                areaColor: '#81C784',
                                borderColor: '#2E7D32',
                                borderWidth: 2
                            }
                        },
                        data: mapData
                    }]
                };

                chart.setOption(option);
            } catch (error) {
                console.error("Failed to load map data", error);
                chart.hideLoading();
            }
        };

        initChart();

        const handleResize = () => {
            if (!chartRef.current) return;
            const chart = echarts.getInstanceByDom(chartRef.current);
            if (chart) chart.resize();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (chartRef.current) {
                const chart = echarts.getInstanceByDom(chartRef.current);
                if (chart) chart.dispose();
            }
        };
    }, []);

    const getScoreColor = (score: number) => {
        if (score >= 85) return '#00a950';  // 良好 (85-100)
        if (score >= 70) return '#ffcb05';  // 滿意 (70-85)
        if (score >= 55) return '#f37736';  // 問題顯著 (55-70)
        if (score >= 40) return '#d94e5d';  // 艱難 (40-55)
        return '#8e1600';                   // 非常嚴重 (0-40)
    };

    return (
        <section id="data" style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#F1F8E9',
            padding: '100px 24px'
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
                            2025 年新聞自由指數
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: '#66BB6A',
                            margin: '0',
                            fontWeight: '500'
                        }}>
                            Press Freedom Index 2025
                        </p>
                    </div>
                </div>

                <div style={{
                    position: 'relative',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    border: '2px solid rgba(46, 125, 50, 0.2)'
                }}>
                    <div ref={chartRef} className="w-full" style={{ height: '600px' }} />

                    {/* 桌面版 - 搜尋欄位與排名列表 */}
                    <div className="desktop-panel" style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        border: '2px solid #66BB6A',
                        zIndex: 10,
                        width: '320px',
                        maxHeight: '550px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* 搜尋輸入框 */}
                        <div style={{ padding: '20px', borderBottom: '2px solid #E8F5E9' }}>
                            <input
                                type="text"
                                placeholder="尋找國家"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    fontSize: '16px',
                                    border: '2px solid #E8F5E9',
                                    borderRadius: '12px',
                                    outline: 'none',
                                    transition: 'all 0.3s',
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#66BB6A';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 187, 106, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#E8F5E9';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        {/* 標題列 */}
                        <div style={{
                            padding: '10px 20px',
                            borderBottom: '1px solid #E8F5E9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            color: '#999'
                        }}>
                            <span>2025 年的指數</span>
                            <span>總分</span>
                        </div>

                        {/* 排名列表 */}
                        <div style={{
                            overflowY: 'auto',
                            padding: '12px',
                            flex: 1
                        }}>
                            {filteredCountries.length > 0 ? (
                                filteredCountries.map((country, index) => {
                                    const scoreStr = String(country["Score 2025"] || "0").replace(',', '.');
                                    const score = parseFloat(scoreStr);
                                    const borderColor = getScoreColor(score);

                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '12px',
                                                marginBottom: '8px',
                                                borderRadius: '0px',
                                                backgroundColor: hoveredCountry?.Rank === country.Rank ? '#E8F5E9' : (index % 2 === 0 ? '#F1F8E9' : '#FFFFFF'),
                                                borderLeft: `4px solid ${borderColor}`,
                                                transition: 'all 0.2s',
                                                cursor: 'pointer'
                                            }}
                                            onMouseEnter={() => setHoveredCountry(country)}
                                            onMouseLeave={() => setHoveredCountry(null)}
                                        >
                                            <div style={{
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                color: '#1B5E20',
                                                minWidth: '35px'
                                            }}>
                                                {country.Rank}
                                            </div>
                                            <div style={{
                                                flex: 1,
                                                fontSize: '15px',
                                                color: '#2E7D32',
                                                fontWeight: '500'
                                            }}>
                                                {country.Country_ZH}
                                            </div>
                                            <div style={{
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                color: '#1B5E20'
                                            }}>
                                                {score.toFixed(2)}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '32px',
                                    color: '#757575',
                                    fontSize: '15px'
                                }}>
                                    找不到符合的國家
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 桌面版 - Hover 詳細資訊 */}
                    {hoveredCountry && (
                        <div className="desktop-panel" style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            backgroundColor: '#FFFFFF',
                            padding: '20px',
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            border: '2px solid #66BB6A',
                            zIndex: 11,
                            minWidth: '200px'
                        }}>
                            <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
                                指數總分
                            </div>
                            <div style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                color: '#1B5E20',
                                marginBottom: '4px'
                            }}>
                                {hoveredCountry.Rank}
                                <span style={{ fontSize: '18px', color: '#999' }}> / 180</span>
                            </div>
                            <div style={{
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#2E7D32',
                                marginBottom: '16px'
                            }}>
                                {parseFloat(String(hoveredCountry["Score 2025"]).replace(',', '.')).toFixed(2)}
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid #E8F5E9', margin: '12px 0' }} />
                            {[
                                { label: '政治', value: hoveredCountry.Political || '-' },
                                { label: '經濟', value: hoveredCountry.Economic || '-' },
                                { label: '法律', value: hoveredCountry.Legal || '-' },
                                { label: '社會', value: hoveredCountry.Social || '-' },
                                { label: '安全', value: hoveredCountry.Security || '-' }
                            ].map(item => (
                                <div key={item.label} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '8px',
                                    fontSize: '13px'
                                }}>
                                    <span style={{ color: '#666' }}>{item.label}</span>
                                    <span style={{ fontWeight: 'bold', color: '#1B5E20' }}>{item.value}</span>
                                </div>
                            ))}
                            {hoveredCountry.RankChange !== undefined && hoveredCountry.RankChange !== 0 && (
                                <>
                                    <hr style={{ border: 'none', borderTop: '1px solid #E8F5E9', margin: '12px 0' }} />
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '13px',
                                        color: hoveredCountry.RankChange > 0 ? '#2E7D32' : hoveredCountry.RankChange < 0 ? '#d32f2f' : '#666'
                                    }}>
                                        <span style={{ marginRight: '8px' }}>相較2024年排名變化</span>
                                        <span style={{ fontWeight: 'bold' }}>
                                            {hoveredCountry.RankChange > 0 ? `↑ ${hoveredCountry.RankChange}` :
                                                hoveredCountry.RankChange < 0 ? `↓ ${Math.abs(hoveredCountry.RankChange)}` : '—'}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* 手機版 - 收合側邊欄 */}
                    <div className="mobile-panel" style={{
                        position: 'absolute',
                        right: isCollapsed ? '-280px' : '0',
                        top: '0',
                        height: '600px',
                        width: '280px',
                        backgroundColor: '#FFFFFF',
                        boxShadow: isCollapsed ? 'none' : '-4px 0 20px rgba(0,0,0,0.15)',
                        transition: 'right 0.3s ease',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: isCollapsed ? '0' : '0 0 0 16px'
                    }}>
                        {/* 收合按鈕 */}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            style={{
                                position: 'absolute',
                                left: '-40px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '40px',
                                height: '80px',
                                backgroundColor: '#FFFFFF',
                                border: '2px solid #66BB6A',
                                borderRight: 'none',
                                borderRadius: '8px 0 0 8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
                                fontSize: '18px',
                                color: '#2E7D32'
                            }}
                        >
                            {isCollapsed ? '◀' : '▶'}
                        </button>

                        <div style={{ padding: '16px', borderBottom: '2px solid #E8F5E9' }}>
                            <input
                                type="text"
                                placeholder="尋找國家"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    fontSize: '14px',
                                    border: '2px solid #E8F5E9',
                                    borderRadius: '8px',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{
                            padding: '8px 16px',
                            borderBottom: '1px solid #E8F5E9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '11px',
                            color: '#999'
                        }}>
                            <span>2025 年的指數</span>
                            <span>總分</span>
                        </div>

                        <div style={{ overflowY: 'auto', padding: '10px', flex: 1 }}>
                            {filteredCountries.map((country, index) => {
                                const scoreStr = String(country["Score 2025"] || "0").replace(',', '.');
                                const score = parseFloat(scoreStr);
                                const borderColor = getScoreColor(score);

                                return (
                                    <div key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px',
                                        marginBottom: '6px',
                                        borderRadius: '8px',
                                        backgroundColor: index % 2 === 0 ? '#F1F8E9' : '#FFFFFF',
                                        borderLeft: `3px solid ${borderColor}`
                                    }}>
                                        <div style={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color: '#1B5E20',
                                            minWidth: '30px'
                                        }}>
                                            {country.Rank}
                                        </div>
                                        <div style={{
                                            flex: 1,
                                            fontSize: '13px',
                                            color: '#2E7D32',
                                            fontWeight: '500'
                                        }}>
                                            {country.Country_ZH}
                                        </div>
                                        <div style={{
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            color: '#1B5E20'
                                        }}>
                                            {score.toFixed(2)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (min-width: 768px) {
                    .mobile-panel {
                        display: none !important;
                    }
                }
                @media (max-width: 767px) {
                    .desktop-panel {
                        display: none !important;
                    }
                }
            `}</style>
        </section>
    );
}