/// <reference types="vitest/globals" />
import "@testing-library/dom";
import "@testing-library/jest-dom/vitest";
import "vitest-localstorage-mock";
import { screen } from "@testing-library/react";
import { server } from "./mocks/node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// TODO: Fix TS error
// `Property 'getByQuerySelector' does not exist on type 'Screen<typeof import("/node_modules/@testing-library/dom/types/queries")>'.ts(2339)`
screen.getByQuerySelector = function (selector: string) {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`No element found for selector: ${selector}`);
  }
  return element as HTMLElement;
};

screen.getAllByQuerySelector = function (selector: string) {
  const elements = Array.from(document.querySelectorAll(selector));
  if (elements.length === 0) {
    throw new Error(`No elements found for selector: ${selector}`);
  }
  return elements as HTMLElement[];
};
