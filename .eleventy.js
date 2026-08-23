const htmlmin = require('html-minifier');
const dateFns = require('date-fns');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // ОТКЛЮЧАЕМ ЛЕНИВУЮ ЗАГРУЗКУ
  // eleventyConfig.addPlugin(lazyImagesPlugin, {
  //   transformImgPath: (imgPath) => {
  //     if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
  //       return imgPath;
  //     } else {
  //       return `./src/${imgPath}`;
  //     }
  //   },
  // });

  eleventyConfig.setEjsOptions({
    rmWhitespace: true,
    context: {
      dateFns,
    },
  });

  eleventyConfig.setBrowserSyncConfig({
    files: './_site/assets/styles/main.css',
  });

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
      });
      return minified;
    }

    return content;
  });

  return {
    dir: { input: 'src', output: '_site', data: '_data' },
  };
};
