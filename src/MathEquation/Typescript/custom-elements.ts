export interface CustomElementConfig {
  tagName: string;
  options?: {
    extends: string;
  };
}

export const CustomElement = (config: CustomElementConfig) => {
  return (Element:any) => {
    window['customElements'].define(config.tagName, Element, config.options);
  };
};

export interface OnConnected {
  connectedCallback(): void;
}

export interface OnDisconnected {
  disconnectedCallback(): void;
}

export interface OnAttributeChanged {
  attributeChangedCallback(attrName?: string, oldVal?: string, newVal?: string): void;
}

export interface OnAdopted {
  adoptedCallback(): void;
}
