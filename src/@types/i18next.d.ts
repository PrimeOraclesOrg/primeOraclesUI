import Resources from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "status";
    resources: Resources;
  }
}
