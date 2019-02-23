const externalLinks = require('remark-external-links');

module.exports = ({ markdownAST }, options) => {
  const transformer = externalLinks(options);

  transformer(markdownAST, options);
};
