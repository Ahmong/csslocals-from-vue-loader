var _loaderUtils = require('loader-utils');
var _loaderUtils2 = _interopRequireDefault(_loaderUtils).default;
var path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (global, name, factory) {
  if (typeof exports === 'object')
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    if (typeof module !== 'undefined') {
      module.exports = factory();
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(factory);
  } else {
    global[name] = factory.apply(this);
  }
}(this, "csslocalsFromVueLoader", function() {
  return loader;
}));

function loader(content) {
  try {
    return csslocalsFromVueLoader.bind(this)(content);
  } catch (err) {
    var errText = "Error in csslocals-from-vue-loader/index.js :";
    console.log(errText);
    console.log(err.stack);
    throw err;
  }
}

function csslocalsFromVueLoader(content) {

  console.log("Begin of csslocals-from-vue-loader(), resource= " + path.basename(this.resource));
  // console.log("Content= '''\n" + content + "\n'''");

  if (this.cacheable) this.cacheable();

  var query = _loaderUtils2.getOptions(this) || {};
  var exportKeys = [];
  if (query.exports) {
    if (Array.isArray(query.exports)) {
      exportKeys = exportKeys.concat(query.exports)
    } else if (typeof query.exports === 'string') {
      exportKeys.push(query.exports)
    }
  }

  if (this.resourceQuery) {
    console.log('resourceQuery=', this.resourceQuery)
    const resQuery = _loaderUtils2.parseQuery(this.resourceQuery);
    console.log('resQuery=', JSON.stringify(resQuery))
    if (resQuery.exports) {
      if (Array.isArray(resQuery.exports)) {
        exportKeys = exportKeys.concat(resQuery.exports)
      } else if (typeof resQuery.exports === 'string') {
        exportKeys.push(resQuery.exports)
      }
    }
  }

  if (!exportKeys.includes('$style')) {
    exportKeys.push('$style');
  }
  // console.log('exportKeys=', JSON.stringify(exportKeys))

  var cssModulePattern = new RegExp("cssModules\\[\"(.+)\"\\]\\s*=\\s*(require\\(.+\\)(\\.\\S+)?)\\s*$", "gm");
  var searchResult;
  var requireStr = "";
  while ((searchResult = cssModulePattern.exec(content)) != null) {
    // console.log("searchResult= ###\n" + searchResult[0] + "\n###");
    if (exportKeys.includes(searchResult[1])) {
      // var loaderStr = searchResult[2].replace(/(\.vue)\?exports.*(\"\).*$)/, "$1$2");
      // requireStr += "exportModules[\"" + searchResult[1] + "\"] = " + loaderStr + ";\n"
      requireStr += "exportModules[\"" + searchResult[1] + "\"] = " + searchResult[2] + ";\n"
    }
    // console.log("***\nfound module: \n[" + searchResult[1] + "] = " + searchResult[2] + "\n***");
  }
  // requireStr += "  return;";

  var injectStr =
`
/* require the module for loalized identifier */
var exportModules = {};
${requireStr}
/* export the {class: localized_identifier} map as module.exports.locals */
var exportLocals={};
for (expKey of Object.keys(exportModules)) {
  Object.assign(exportLocals, exportModules[expKey]);
}
module.exports.locals = exportLocals;
`
  // injectStr = "module.exports.locals={};\n"
  content += injectStr;

  console.log("End of csslocals-from-vue-loader()");

  return content;
}
