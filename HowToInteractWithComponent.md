
## Pre Req
* A version of mathjax 3 need to be loaded externally at the moment.


## attributes
 * local-sync - is stringified json object that hold the synced data between the extensions.
 * markup-language - tell the component what markup language your using using

 ## JS Events Out
 * CloseMathEquation - fired when the user hit the x on the ui
 * UpdateLocalSyncProperties - fire when the user changes some setting that need to be saved externally.

 ## JS Events In
 * UpdateMathEquationTextEvent - update the text inside of the extension 


## local storage
There basic local storage to hold the setting.  These settings get loaded into the web extension via its attributes 

 ## CSS variables