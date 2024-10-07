import "@testing-library/react";

declare module "@testing-library/react" {
  interface Screen {
    getByQuerySelector(selector: string): HTMLElement;
    getAllByQuerySelector(selector: string): HTMLElement[];
  }
}
