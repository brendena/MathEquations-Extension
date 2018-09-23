/*was going to use for chrome dev live reloads but  
  there seems to be a security problem with it.
  It basically send all the code into a eval 
  statmenent and on the client side it throw
  a security warning flag.
*/
//background pages
//https://developer.chrome.com/extensions/background_pages


require('./Background/Js/background.js');
