var mathJaxConfig = function(fontType){
    return {
        jax: ['input/TeX','input/MathML','input/AsciiMath','output/SVG'],
        extensions: ['tex2jax.js','mml2jax.js','MathEvents.js','asciimath2jax.js','MathZoom.js','AssistiveMML.js'],
        MathML: {
            extensions: ['content-mathml.js']
        },
        TeX: {
            Macros: {
                RR: '{\\bf R}',
                bold: ['{\\bf #1}', 1]
            }
        },
        tex2jax: {
            inlineMath: [['$','$'], ['\\(','\\)']],
            processEscapes: true
        },
        AsciiMath: {
            fixphi: true,
            useMathMLspacing: true,
            displaystyle: false,
            decimalsign: '.'
        },
        //svg config
        //http://docs.mathjax.org/en/latest/options/output-processors/SVG.html
        SVG: {
            mtextFontInherit: true,
            blacker: 1,
            linebreaks: { automatic: true },
            useFontCache: false,
            font: fontType
        },
        menuSettings: {
            zoom: 'Click'
        },
        MatchWebFonts: {
            matchFor: {
                SVG: {useFontCache: false}
            },
            fontCheckDelay: 500,
            fontCheckTimeout: 15 * 1000
        },
        messageStyle: 'none',
        imageFont: null //http://docs.mathjax.org/en/latest/misc/faq.html?highlight=imagefont
    }
}

exports.MathJaxString = function(fontType){
    return "MathJax.Hub.Config(" + JSON.stringify(mathJaxConfig(fontType))  + ")"
}