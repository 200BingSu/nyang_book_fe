/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {
      fontFamily: {
        adlam: ['"ADLaM Display"', "sans-serif"],
        sans: ['"Noto Sans"', "Roboto", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        // 이름: shadow-no-bottom
        "md-no-bottom": [
          // 위쪽
          "0 -4px 6px -1px rgb(0 0 0 / 0.1)",
          // 좌우 살짝
          "-2px 0 4px -2px rgb(0 0 0 / 0.1)",
          "2px 0 4px -2px rgb(0 0 0 / 0.1)",
        ].join(", "),
        "md-no-top": [
          // 아래쪽
          "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          // 좌우 살짝
          "-2px 0 4px -2px rgb(0 0 0 / 0.1)",
          "2px 0 4px -2px rgb(0 0 0 / 0.1)",
        ].join(", "),
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-drag": {
          "-webkit-user-drag": "none",
          "user-drag": "none",
          "-webkit-user-select": "none",
          "-moz-user-select": "none",
          "-ms-user-select": "none",
          "user-select": "none",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
