// flow-typed signature: aa5e31db696802c8253d7c6315ed6c23
// flow-typed version: da30fe6876/webfontloader_v1.x.x/flow_>=v0.25.x

declare module "webfontloader" {
  declare type WebFontConfig = {
    loading?: () => mixed,
    active?: () => mixed,
    inactive?: () => mixed,

    fontloading?: (familyName: string, fvd: string) => mixed,
    fontactive?: (familyName: string, fvd: string) => mixed,
    fontinactive?: (familyName: string, fvd: string) => mixed,

    classes?: boolean,
    events?: boolean,

    timeouts?: number,

    custom?: {
      families: string[],
      urls: string[],
      testStrings: { [k: string]: string }
    },

    fontdeck?: {
      id: string
    },

    monotype?: {
      projectId: string,
      version?: number
    },

    google?: {
      families: string[],
      text?: string
    },

    typekit?: {
      id: string
    }
  };
  declare class WebFont {
    load(config: WebFontConfig): void;
  }

  declare module.exports: WebFont;
}
