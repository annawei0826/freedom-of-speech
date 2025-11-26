// DataChart.tsx
'use client';

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import rsfData from "@/data/rsf-2025.json";

// 完整的地圖名稱 -> JSON Country_EN 映射表
const mapNameToJsonName: { [key: string]: string } = {
    // 直接匹配
    "Norway": "Norway",
    "Estonia": "Estonia",
    "Netherlands": "Netherlands",
    "Sweden": "Sweden",
    "Finland": "Finland",
    "Denmark": "Denmark",
    "Ireland": "Ireland",
    "Portugal": "Portugal",
    "Switzerland": "Switzerland",
    "Czechia": "Czechia",
    "Germany": "Germany",
    "Liechtenstein": "Liechtenstein",
    "Luxembourg": "Luxembourg",
    "Lithuania": "Lithuania",
    "Latvia": "Latvia",
    "New Zealand": "New Zealand",
    "Iceland": "Iceland",
    "Belgium": "Belgium",
    "Trinidad and Tobago": "Trinidad and Tobago",
    "United Kingdom": "United Kingdom",
    "Canada": "Canada",
    "Austria": "Austria",
    "Spain": "Spain",
    "Taiwan": "Taiwan",
    "France": "France",
    "Jamaica": "Jamaica",
    "South Africa": "South Africa",
    "Namibia": "Namibia",
    "Australia": "Australia",
    "Cabo Verde": "Cabo Verde",
    "Poland": "Poland",
    "Suriname": "Suriname",
    "Slovenia": "Slovenia",
    "Armenia": "Armenia",
    "Moldova": "Moldova",
    "Costa Rica": "Costa Rica",
    "Montenegro": "Montenegro",
    "Slovakia": "Slovakia",
    "East Timor": "East Timor",
    "Fiji": "Fiji",
    "Gabon": "Gabon",
    "North Macedonia": "North Macedonia",
    "Dominican Republic": "Dominican Republic",
    "Samoa": "Samoa",
    "Seychelles": "Seychelles",
    "Tonga": "Tonga",
    "Belize": "Belize",
    "Italy": "Italy",
    "Mauritania": "Mauritania",
    "Mauritius": "Mauritius",
    "Ghana": "Ghana",
    "Panama": "Panama",
    "Liberia": "Liberia",
    "Romania": "Romania",
    "Sierra Leone": "Sierra Leone",
    "United States": "United States",
    "United States of America": "United States",
    "Gambia": "Gambia",
    "Uruguay": "Uruguay",
    "Croatia": "Croatia",
    "South Korea": "South Korea",
    "Ukraine": "Ukraine",
    "Brazil": "Brazil",
    "Côte d'Ivoire": "Cote d'Ivoire",
    "Cote d'Ivoire": "Cote d'Ivoire",
    "Andorra": "Andorra",
    "Japan": "Japan",
    "Malta": "Malta",
    "Hungary": "Hungary",
    "Chile": "Chile",
    "Bulgaria": "Bulgaria",
    "Congo-Brazzaville": "Congo-Brazzaville",
    "Republic of the Congo": "Congo-Brazzaville",
    "Central African Republic": "Central African Republic",
    "Guyana": "Guyana",
    "Senegal": "Senegal",
    "Comoros": "Comoros",
    "Malawi": "Malawi",
    "Cyprus": "Cyprus",
    "Papua New Guinea": "Papua New Guinea",
    "Qatar": "Qatar",
    "Albania": "Albania",
    "Botswana": "Botswana",
    "Zambia": "Zambia",
    "Niger": "Niger",
    "Paraguay": "Paraguay",
    "Thailand": "Thailand",
    "Bosnia-Herzegovina": "Bosnia-Herzegovina",
    "Bosnia and Herz.": "Bosnia-Herzegovina",
    "Argentina": "Argentina",
    "Malaysia": "Malaysia",
    "Greece": "Greece",
    "Nepal": "Nepal",
    "Northern Cyprus": "Northern Cyprus",
    "Benin": "Benin",
    "Bolivia": "Bolivia",
    "Ecuador": "Ecuador",
    "Tanzania": "Tanzania",
    "Serbia": "Serbia",
    "Brunei": "Brunei",
    "Eswatini": "Eswatini",
    "Kosovo": "Kosovo",
    "Angola": "Angola",
    "Mozambique": "Mozambique",
    "Mongolia": "Mongolia",
    "Guinea": "Guinea",
    "Maldives": "Maldives",
    "Burkina Faso": "Burkina Faso",
    "Zimbabwe": "Zimbabwe",
    "Lesotho": "Lesotho",
    "Chad": "Chad",
    "South Sudan": "South Sudan",
    "Guinea-Bissau": "Guinea-Bissau",
    "Haiti": "Haiti",
    "Israel": "Israel",
    "Madagascar": "Madagascar",
    "Georgia": "Georgia",
    "Colombia": "Colombia",
    "Philippines": "Philippines",
    "Kenya": "Kenya",
    "Equatorial Guinea": "Equatorial Guinea",
    "Mali": "Mali",
    "Morocco": "Morocco",
    "W. Sahara": "Morocco",
    "Western Sahara": "Morocco",
    "Togo": "Togo",
    "Nigeria": "Nigeria",
    "Singapore": "Singapore",
    "Mexico": "Mexico",
    "Burundi": "Burundi",
    "Algeria": "Algeria",
    "Indonesia": "Indonesia",
    "Kuwait": "Kuwait",
    "Tunisia": "Tunisia",
    "Peru": "Peru",
    "Cameroon": "Cameroon",
    "Lebanon": "Lebanon",
    "Democratic Republic of the Congo": "Democratic Republic of the Congo",
    "Dem. Rep. Congo": "Democratic Republic of the Congo",
    "Oman": "Oman",
    "El Salvador": "El Salvador",
    "Somalia": "Somalia",
    "Libya": "Libya",
    "Guatemala": "Guatemala",
    "Sri Lanka": "Sri Lanka",
    "Hong Kong": "Hong Kong",
    "Kazakhstan": "Kazakhstan",
    "Honduras": "Honduras",
    "Uganda": "Uganda",
    "Kyrgyzstan": "Kyrgyzstan",
    "Ethiopia": "Ethiopia",
    "Rwanda": "Rwanda",
    "Jordan": "Jordan",
    "Uzbekistan": "Uzbekistan",
    "Bangladesh": "Bangladesh",
    "Laos": "Laos",
    "India": "India",
    "Bhutan": "Bhutan",
    "Tajikistan": "Tajikistan",
    "Yemen": "Yemen",
    "Iraq": "Iraq",
    "Sudan": "Sudan",
    "Bahrain": "Bahrain",
    "Pakistan": "Pakistan",
    "Turkey": "Turkey",
    "Venezuela": "Venezuela",
    "Cambodia": "Cambodia",
    "Saudi Arabia": "Saudi Arabia",
    "Palestine": "Palestine",
    "United Arab Emirates": "United Arab Emirates",
    "Cuba": "Cuba",
    "Belarus": "Belarus",
    "Azerbaijan": "Azerbaijan",
    "Djibouti": "Djibouti",
    "Myanmar": "Myanmar",
    "Egypt": "Egypt",
    "Russia": "Russia",
    "Nicaragua": "Nicaragua",
    "Vietnam": "Vietnam",
    "Turkmenistan": "Turkmenistan",
    "Afghanistan": "Afghanistan",
    "Iran": "Iran",
    "Syria": "Syria",
    "China": "China",
    "North Korea": "North Korea",
    "Eritrea": "Eritrea",
    "Greenland": "Denmark",
};

export default function DataChart() {
    const chartRef = useRef<HTMLDivElement>(null);
    const [hoveredCountry, setHoveredCountry] = useState<any | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

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

                // 建立 JSON 數據查詢表
                const dataMap = new Map();
                rsfData.forEach(item => {
                    dataMap.set(item.Country_EN, {
                        value: parseFloat(item["Score 2025"].replace(',', '.')),
                        rank: item.Rank,
                        nameZH: item.Country_ZH,
                        Country_EN: item.Country_EN,
                    });
                });

                // 建立地圖數據，使用映射表確保所有國家都能找到數據
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
                        textStyle: {
                            color: '#1B5E20',
                            fontSize: 14
                        },
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
                        min: 0,
                        max: 100,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],
                        calculable: true,
                        inRange: { color: ['#d94e5d', '#eac736', '#50a3ba'].reverse() },
                        pieces: [
                            { min: 85, max: 100, label: '良好 (85-100)', color: '#00a950' },
                            { min: 70, max: 85, label: '滿意 (70-85)', color: '#ffcb05' },
                            { min: 55, max: 70, label: '問題顯著 (55-70)', color: '#f37736' },
                            { min: 40, max: 55, label: '艱難 (40-55)', color: '#d94e5d' },
                            { min: 0, max: 40, label: '非常嚴重 (0-40)', color: '#8e1600' }
                        ]
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
                chart.on('mouseover', (params: any) => {
                    if (params.data && params.data.rank) {
                        setHoveredCountry(params.data);
                    }
                });
                chart.on('mouseout', () => setHoveredCountry(null));

            } catch (error) {
                console.error("Failed to load map data", error);
                chart.hideLoading();
            }
        };

        setTimeout(initChart, 100);

        const handleResize = () => {
            const chart = echarts.getInstanceByDom(chartRef.current!);
            if (chart) chart.resize();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            const chart = echarts.getInstanceByDom(chartRef.current!);
            if (chart) chart.dispose();
        };
    }, []);

    return (
        <section 
            id="data" 
            style={{
                position: 'relative',
                width: '100%',
                backgroundColor: '#F1F8E9',
                padding: '100px 24px'
            }}
        >
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {/* 標題區塊 */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '70px'
                }}>
                    <h2 style={{
                        fontSize: '52px',
                        fontWeight: 'bold',
                        color: '#1B5E20',
                        marginBottom: '24px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        letterSpacing: '2px'
                    }}>
                        2025 年新聞自由指數
                    </h2>
                    <div style={{
                        width: '120px',
                        height: '5px',
                        background: 'linear-gradient(to right, #66BB6A, #A4D65E)',
                        margin: '0 auto',
                        boxShadow: '0 2px 8px rgba(102, 187, 106, 0.5)'
                    }}></div>
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

                    {hoveredCountry && (
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            backgroundColor: '#FFFFFF',
                            padding: '24px',
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                            border: '2px solid #66BB6A',
                            zIndex: 10,
                            minWidth: '280px'
                        }}>
                            <h3 style={{
                                fontSize: '22px',
                                fontWeight: 'bold',
                                marginBottom: '16px',
                                color: '#1B5E20',
                                borderBottom: '2px solid #E8F5E9',
                                paddingBottom: '12px'
                            }}>
                                {hoveredCountry.nameZH}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '8px 0'
                                }}>
                                    <span style={{ 
                                        color: '#555', 
                                        fontSize: '16px'
                                    }}>排名</span>
                                    <span style={{
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        color: '#2E7D32'
                                    }}>
                                        #{hoveredCountry.rank}
                                    </span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '8px 0'
                                }}>
                                    <span style={{ 
                                        color: '#555',
                                        fontSize: '16px'
                                    }}>得分</span>
                                    <span style={{
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        color: '#2E7D32'
                                    }}>
                                        {hoveredCountry.value}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}