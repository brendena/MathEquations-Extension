# Reason for Iframe and not a web component


I wanted to just use staight web components but because of MathJax it made it really hard to build a web components.
This is because of the things that MathJax needs
* Has to attached to head
* can't see into the shadow dom
* No easy way to bundle the script properly to load into my component



Things i wanted to solve with web components
* css styles infecting my code
* multiple version of mathjax

Which can be solved with Iframe.  I just had to do a weird post message to allow for a dynamic resizing of the extension.

## Future

I plan on converting this into a single web component after MathJax 3 come out.  MathJax 3 is supposed to be designed around modularity.  In anticipation i kept all the web component code inside.  Even though it not really utilized all that well.