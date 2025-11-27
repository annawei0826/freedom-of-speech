'use client';

import React from 'react';

// Footer Component
export default function Footer() {
    const footerItems = [
        '內容監製：今周刊',
        '專題製作：今周刊 數位內容部',
        '資料整理：可昕'
    ];

    return (
        <footer className="py-[40px] bg-gradient-to-r from-[#A4D65E] to-[#66BB6A]">
            <div className="max-w-7xl mx-auto px-5 py-8">
                <div className="flex flex-wrap justify-center items-center text-center text-white text-sm leading-relaxed gap-x-4 gap-y-2">
                    {footerItems.map((item, index) => (
                        <span key={index} className="inline-block whitespace-nowrap">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
}