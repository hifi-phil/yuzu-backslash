const path = require('path');
const yuzu = require('yuzu-definition-core');

class YuzuTemplatePaths {
  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('YuzuTemplatePaths', (compilation, callback) => {

      const dependencies = Array.from(compilation.fileDependencies).filter((item) => { 
        return item.includes('_templates') && path.extname(item) === '.json' 
      });

      const previews = yuzu.build.getPreviews(dependencies, 'yuzu.html');
      const output = JSON.stringify(previews, null, 4);

      // Insert this list into the webpack build as a new file asset:
      compilation.assets[`${path.sep}_client${path.sep}templatePaths.json`] = {
        source: function() {
          return output;
        },
        size: function() {
          return output.length;
        }
      };

      callback();
    });
  }
}

module.exports = YuzuTemplatePaths;