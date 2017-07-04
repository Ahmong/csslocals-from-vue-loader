var _loaderUtils = require('loader-utils');
var _loaderUtils2 = _interopRequireDefault(_loaderUtils).default;

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
}(this, "csslocalsPrefetch", function() {
  return loader;
}));

function loader(content) {
  try {
    return csslocalsPrefetch.bind(this)(content);
  } catch (err) {
    var errText = "Error in csslocals-from-vue-loader/index.js :";
    console.log(errText);
    console.log(err.stack);
    throw err;
  }
}

function csslocalsPrefetch(content) {
  console.log("Begin of csslocalsPrefetch(), content= '''\n" + content + "\n'''");

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
  if (!exportKeys.includes('$style')) {
    exportKeys.push('$style');
  }

  var exportLocalJs = content.match(/exports\.locals[^}]*};/);

  console.log("exportLocalJs='''\n" + exportLocalJs + "\n'''");
  Object.defineProperty(this.options, '__cssPrefetchLocals__', {
    value: exportLocalJs,
    enumerable: false,
    configurable: true
  })

  // console.log("Content passed to csslocalsFromVueLoader.prefetch(), content= '''\n" + content + "\n'''");

  return content;
}
