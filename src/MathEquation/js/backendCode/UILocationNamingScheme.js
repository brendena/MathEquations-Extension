import * as constTypes from "../constants/constsTypes"

function UILocationNamingScheme (className,floatDirection){
    console.log(floatDirection)
    
    if(floatDirection === constTypes.UILocation.Bottom)
    {

        className += "_B";
    }
    else if(floatDirection === constTypes.UILocation.Right)
    {
        className += "_R";
    }
    else if(floatDirection === constTypes.UILocation.Left)
    {
        className += "_L";
    }
    
   
    return className;
}
  
  

export default UILocationNamingScheme;