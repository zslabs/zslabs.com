const visit = require('unist-util-visit');

module.exports = async ({ markdownAST }) => {
  visit(markdownAST, 'text', async (node) => {
    const { value } = node;
    const isPenURI = value.match(
      /https:\/\/(www\.)?codepen\.io\/([A-Za-z0-9-_?=]*\/pen\/[A-Za-z0-9-_?=]*)/gi,
    );

    if (isPenURI) {
      const penData = value.split('/');
      const penId = penData.pop();
      const penUser = penData[3];

      node.type = 'html';
      node.value = `<div class="codepenEmbed"><iframe
        scrolling='no'
        src='https://codepen.io/${penUser}/embed/preview/${penId}/?theme-id=dark&default-tab=result'
        frameborder='no'
        allowtransparency='true'
        allowfullscreen='true'></iframe></div>`;
    }
  });

  return markdownAST;
};
