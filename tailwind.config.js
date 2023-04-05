/*
 * @Author: aardpro
 * @Date: 2022-04-27 22:34:35
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-04 22:06:45
 * @Description: tw配置文件
 */
module.exports = {
  content: ['./src/**/*.{html,js,vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['futura', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '.el-button': {
          'background-color': 'var(--el-button-bg-color,var(--el-color-white))',
        },
      });
    },
  ],
  corePlugins: {
    // 用于解决和element ui的冲突
    // https://github.com/element-plus/element-plus/issues/5693
    // https://www.whidy.net/vite-use-elementplus-and-tailwindcss-best-practice-1st/
    // preflight: false,
  },
};
