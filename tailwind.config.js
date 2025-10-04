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
    },
  },
  plugins: [],
};
