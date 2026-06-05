// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// react-router 7 relies on TextEncoder/TextDecoder, which CRA 5's jsdom
// test environment does not provide. Polyfill them from Node's util module.
import {TextEncoder, TextDecoder} from 'node:util';

Object.assign(globalThis, {TextEncoder, TextDecoder});
