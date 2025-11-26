import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // 深綠色主題（參考 COP30 ESG 專題）
                primary: {
                    dark: '#1a4d2e',
                    DEFAULT: '#2d6a4f',
                    light: '#40916c',
                    lighter: '#52b788',
                },
                accent: {
                    DEFAULT: '#95d5b2',
                    light: '#b7e4c7',
                },
                forest: {
                    darkest: '#081c15',
                    dark: '#1b4332',
                    DEFAULT: '#2d6a4f',
                    light: '#52796f',
                },
                bg: {
                    dark: '#081c15',
                    light: '#f1faee',
                    cream: '#d8f3dc',
                },
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
};
export default config;
