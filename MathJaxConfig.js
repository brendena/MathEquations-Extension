MathJax.Hub.Config(
    {
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
    SVG: {
        mtextFontInherit: true,
        blacker: 1,
        linebreaks: { automatic: true },
        useFontCache: false
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
    elements: document.getElementById("MathEquationElement").shadowRoot
}
);
console.log('loaded config');