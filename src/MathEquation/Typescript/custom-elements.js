"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomElement = (config) => {
    return (Element) => {
        window['customElements'].define(config.tagName, Element, config.options);
    };
};
//# sourceMappingURL=custom-elements.js.map