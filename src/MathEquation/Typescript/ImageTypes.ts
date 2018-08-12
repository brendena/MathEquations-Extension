let ImageTypesConstructor = function(imageType: string){

    let returnImageType = ImageTypesEnum.Png
    if(imageType == "svg"){
        returnImageType = ImageTypesEnum.Svg
    }
    else if(imageType == "png"){
        returnImageType = ImageTypesEnum.Png
    }
    else if(imageType = "jpg"){
        returnImageType = ImageTypesEnum.Jpg
    }
    else{
        throw("there was no proper image selected")
    }
    return returnImageType;
}



const enum ImageTypesEnum {
    Png = "png",
    Svg = "svg",
    Jpg = "jpg"
}

export { ImageTypesEnum, ImageTypesConstructor}