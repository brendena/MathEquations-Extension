
class ThemeColors{
    constructor(_mainColor, _textBackground, _fontColor) {
        //emtpy constructor
        if(_mainColor=== undefined)
        {
            this.mainColor = "#ffdc78";
            this.textBackground = "white";
            this.fontColor      = "black";
        }
        else{
            this.mainColor = _mainColor;
            this.textBackground = _textBackground;
            this.fontColor = _fontColor;
        }

        
    }
}

export default ThemeColors;