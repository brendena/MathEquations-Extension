![logo for MathEquation Extension](https://github.com/brendena/MathEquations-Extension/blob/master/Img/96x96.png?raw=true)
# MathEquations-Extension - [Chrome](https://chrome.google.com/webstore/detail/math-equations/fkioioejambaepmmpepneigdadjpfamh?hl=en) [Firefox](https://addons.mozilla.org/en-US/firefox/addon/math-equations-anywhere)



![example](https://github.com/brendena/MathEquations-Extension/blob/master/Img/readmeExample.png?raw=true)



## Getting started
* npm install -g elm bower webpack
* npm install
* bower install
* elm-package install


## Building
* **npm run build** - build script
* **npm run build:prod** - for a minified version
Then you can load it into whatever browser that you are currently working on.

## File Structor
* **/dist/** - distributable folder 
* **/src/** - source folder
* **/src/PopUpMenu/** - code for the
* **/src/ContentScripts/** - background script that will append MathEquation upon a request from the PopUpMenu.
* **/src/MathEquation/** - Bulk of the code.  This hold all the code for the ui that convert the equations into images.

### Firefox
At **about:debugging** you can add extension locally.


## current features to implement 
* Close the menu
* Minimize menu
* resize the iframe on the above actions and on text section close
* Style - The nav bar brakes when you move to a really small screen
* Bug UnImportant - Chrome Grammerly causes a bug in the textarea that brakes how the app works

## goal
Create a extension that can create math equation that you can copy onto any site.

## Next Itteration
* Ittergrate the equation into the image
* Reload image
* Download Image
