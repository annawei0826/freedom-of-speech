// Introduction.tsx
export default function Introduction() {
    return (
        <section 
            id="introduction"
            style={{ 
                width: '100%',
                backgroundColor: '#E8F5E9',
                position: 'relative'
            }}
        >
            {/* 內容區域 */}
            <div style={{ 
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '80px 24px'
            }}>
                {/* 標題區塊 */}
                <div style={{ 
                    textAlign: 'center',
                    marginBottom: '50px'
                }}>
                    <h2 style={{ 
                        fontSize: '42px',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        color: '#2E7D32',
                        lineHeight: '1.3'
                    }}>
                        為什麼言論自由如此重要？
                    </h2>
                    <div style={{ 
                        width: '100px',
                        height: '4px',
                        backgroundColor: '#66BB6A',
                        margin: '0 auto'
                    }}></div>
                </div>
                
                {/* 文字內容 */}
                <div style={{ 
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    <div style={{ 
                        backgroundColor: '#FFFFFF',
                        padding: '50px',
                        borderRadius: '16px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(46, 125, 50, 0.1)'
                    }}>
                        <p style={{ 
                            fontSize: '20px',
                            lineHeight: '1.8',
                            color: '#1B5E20',
                            marginBottom: '30px'
                        }}>
                            言論自由是現代民主社會的基石，是人類文明進步的關鍵動力。它不僅僅是一項基本人權，更是推動社會進步、促進創新思維、維護民主制度的核心要素。
                        </p>
                        <p style={{ 
                            fontSize: '20px',
                            lineHeight: '1.8',
                            color: '#1B5E20',
                            marginBottom: '30px'
                        }}>
                            然而，在全球化與數位化的浪潮下，這項基本權利正面臨前所未有的挑戰。從社群媒體的興起帶來的假訊息危機，到政府對言論的管制日益嚴格，從企業平台的內容審查，到極端言論與仇恨言論的氾濫，世界各國正在尋求平衡言論自由與社會穩定的新道路。
                        </p>
                        <p style={{ 
                            fontSize: '20px',
                            lineHeight: '1.8',
                            color: '#1B5E20',
                            marginBottom: '0'
                        }}>
                            本專題將透過全球新聞自由指數的數據分析，深入探討言論自由在當代社會的意義、面臨的困境，以及未來的發展方向。我們將審視不同國家和地區在保障言論自由方面的表現，並思考如何在這個快速變遷的時代中，守護這項珍貴的民主價值。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}