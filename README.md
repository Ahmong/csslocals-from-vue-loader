# csslocals-from-vue-loader
Import the configured css classname-localizedId maps, and export all the maps to ```exports.locals```.

In a Vue module there may be more then one style module. If there are more than one style module in a .vue file (single-file components file), every module should have a name (as ```module="moduleXXX"``` attribute, if do not assign a name then use default name "$styel").

Normally we prepand the csslocals-from-vue-loader to vue-loader. But should not use extract-text-webpack-plugin in vue-loader's option to extract css file due to the plugin's special compiling methord. Use style-loader in vue-loader options is OK.

Options:
```
{
  exports: [
    "$style",           // default, the name of style module will be imported. 
    "moduleXXX"
  ]
}
```
