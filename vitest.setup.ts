/// <reference types="vitest/globals" />
import "@testing-library/jest-dom";
import "vitest-localstorage-mock";
import { server } from "./mocks/node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
