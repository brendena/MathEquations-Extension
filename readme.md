# New version [here](https://github.com/brendena/MathEquations-ExtensionV2)

![logo for MathEquation Extension](https://github.com/brendena/MathEquations-Extension/blob/master/Img/96x96.png?raw=true)
# MathEquations-Extension - [Chrome](https://chrome.google.com/webstore/detail/math-equations/fkioioejambaepmmpepneigdadjpfamh?hl=en) [Firefox](https://addons.mozilla.org/en-US/firefox/addon/math-equations-anywhere)



![example](https://github.com/brendena/MathEquations-Extension/blob/master/Img/exampleScreenShot.png?raw=true)


# [Try it live here](https://brendena.github.io/MathEquations-Extension/)


## **File Structor**
* **/dist/** - distributable folder 
* **/docs/** - Github pages folder 
* **/src/** - source folder
* **/src/Background/** - background script handles the events from the browser action.
* **/src/MathEquation/** - Bulk of the code.  This hold all the code for the ui that convert the equations into images.
* **/src/StaticFiles/** - Mostly just images
* **/src/HelpPage/** - Code for the GithubPages




## **Building**

### Getting started
* npm install --global web-ext
* npm install


### Building Firefox
* npm run start
* In firefox's url put **about:debugging** 
* This will load a page that will allow you to add the extension by uploading the manifest.json document.


### LiveView Firefox and Chrome
* npm run start:autoRefresh
* cd dist && web-ext run


### Release Build
* npm run start


## External Builds
* MathJax 3 is built with a different build system.
* Instruction for that will be found in the src/MathEquation/lib/custom-mathjax  


