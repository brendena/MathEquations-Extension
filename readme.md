![logo for MathEquation Extension](https://github.com/brendena/MathEquations-Extension/blob/master/Img/96x96.png?raw=true)
# MathEquations-Extension - [Chrome](https://chrome.google.com/webstore/detail/math-equations/fkioioejambaepmmpepneigdadjpfamh?hl=en) [Firefox](https://addons.mozilla.org/en-US/firefox/addon/math-equations-anywhere)



![example](https://github.com/brendena/MathEquations-Extension/blob/master/Img/readmeExample.png?raw=true)

## Branch Distinction
* **Master** - Hold static reference to the build version of the code.
* **Dev** - Hold new code for next Version.  Removes the **Dist** folder to make changes easier to find.
* **gh-branch** - Holds a example page.


## Getting started
* npm install -g elm elm-format bower webpack 
* npm install
* bower install
* elm-package install


## Building
* **npm run start** - for a minified version
* **npm run start:chrome** - allows for live reloading of the extension on chrome.
* **npm run build** - build production script
Then you can load it into whatever browser that you are currently working on.

## File Structor
* **/dist/** - distributable folder 
* **/src/** - source folder
* **/src/PopUpMenu/** - code for the
* **/src/ContentScripts/** - background script that will append MathEquation upon a request from the PopUpMenu.
* **/src/MathEquation/** - Bulk of the code.  This hold all the code for the ui that convert the equations into images.

## Testing Locally
In **/src/ContentScripts/Js/content.js** you can add this line **constructUi();** and it will load the extensions when the page loads. 

### Firefox
At **about:debugging** you can add extension locally.

[Disabling popup auto hide](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Debugging#Debugging_popups)

## Formating
### Elm
I use the default elm-format.  For visual studio code the extension is [vscode-elm](https://github.com/Krzysztof-Cieslak/vscode-elm).  


## current features to implement 
* refactor code
* Make CSS smoother
* Mouse Touch
* Bug - Loading Problems
* Style - The nav bar brakes when you move to a really small screen
* Bug UnImportant - Chrome Grammerly causes a bug in the textarea that brakes how the app works

## goal
Create a extension that can create math equation that you can copy onto any site.

## Next Itteration
* Ittergrate the equation into the image
* Reload image
