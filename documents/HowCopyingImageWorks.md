#  New way copying image

## Basics
MathJax(LaTex,MathML,Ascii) -> Svg -> Canvas -> Png

Converting Latex into a Png is a multistep process.  First you have to convert the latex into a usefull format.  To do this i use mathjax which converts the text into a svg.  When the users hit "copy button" i take the Svg and render it onto a canvas and then you can convert the canvas into a png.  



### MathJax(LaTex,MathML,Ascii) -> Svg

### Svg -> Canvas

[Example of parsing and render Svg](https://jsfiddle.net/brenden_adamczak/yj2s5k85/)
### Png Clipboard



Clipboard References
* [clipboard API works](https://hackernoon.com/you-need-to-discover-the-awesome-clipboard-web-api-12b248d05dd3)
* [support clipboard](https://caniuse.com/#feat=clipboard)

SVG References
* [Svg viewbox](https://www.sarasoueidan.com/blog/svg-coordinate-systems/)
* [Svg Transforms and math for matrices](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform)
* [Canvas Transforms](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations)
* [List of SVG tags](https://developer.mozilla.org/en-US/docs/Web/SVG/Element)


## Old Way of Copying 
The web has a native clipboard api that allows you to save data to the user clipboard.  It normally only used for putting text into images but it can be used to save images to as well.  The way the api works is not completely implemented across all browsers so i use a library called [clipboard.js](https://clipboardjs.com).  A demo on how it works can be found [here](https://jsfiddle.net/p83gp77c/)
* [Reference to how clipboard API works](https://hackernoon.com/you-need-to-discover-the-awesome-clipboard-web-api-12b248d05dd3)
