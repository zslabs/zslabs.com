// Used for `make-relative` gastby+remark plugin
// Purposely not including Netlify-only redirects since `gatsby-catch-links` will attempt to use React's internal router to push to these pages; even though they don't exist (as-is) on the site.
exports.domainRegex = /http[s]*:\/\/[www.]*zslabs\.com(?!\/)[/]?/;
