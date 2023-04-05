/*
 * @Author: aardpro
 * @Date: 2022-08-21 09:12:05
 * @LastEditors: aardpro
 * @LastEditTime: 2023-04-03 22:47:17
 * @Description: 引入外部链接
 */
const CONTENT_LIST = [
  // '<script src="https://xxx/xxx.js"></script>',
];

/**
 * @description: 向html文档的header部分追加内容
 * @param {string} html
 * @param {string} content
 * @return {string}
 */
function appendHead(html, content) {
  try {
    return html.replace(
      '</head>',
      `
  ${content}
  </head>
  `,
    );
  } catch (err) {
    console.error('appendHead error: ', err.message);
    return html;
  }
}
/**
 * @description: 批量向入口文件index.html的</head>前追加内容
 * @return {Object}
 */
function appendContentsToHead() {
  return {
    name: 'add-external-link',
    transformIndexHtml(html) {
      let htmlt = html;
      CONTENT_LIST.forEach((externalLink) => {
        htmlt = appendHead(htmlt, externalLink);
      });
      return htmlt;
    },
  };
}

export default appendContentsToHead;
