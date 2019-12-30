//
//  Initialize the MathJax startup code
//
require('mathjax-full/components/src/startup/lib/startup.js');

//
//  Get the loader module and indicate the modules that
//  will be loaded by hand below
//
const {Loader} = require('mathjax-full/js/components/loader.js');
Loader.preLoad(
  'loader', 'startup',
  'core',
  'input/tex-full',
  'input/mml',
  'input/asciimath',
  'output/svg', 'output/svg/fonts/tex.js',
  'ui/menu'
);

//
// Load the components that we want to combine into one component
//   (the ones listed in the preLoad() call above)
//
require('mathjax-full/components/src/core/core.js');

require('mathjax-full/components/src/input/tex-full/tex-full.js');
require('mathjax-full/components/src/input/mml/mml.js');
require('mathjax-full/components/src/input/asciimath/asciimath.js');

require('mathjax-full/components/src/output/svg/svg.js');
require('mathjax-full/components/src/output/svg/fonts/tex/tex.js');

require('mathjax-full/components/src/ui/menu/menu.js');

//
// Update the configuration to include any updated values
//
const {insert} = require('mathjax-full/js/util/Options.js');
insert(MathJax.config, {
  tex: {
    packages: {'[+]': ['ams', 'newcommand', 'configMacros']}
  }
});

//
// Loading this component will cause all the normal startup
//   operations to be performed
//
require('mathjax-full/components/src/startup/startup.js');
