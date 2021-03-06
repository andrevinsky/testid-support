/**
 * @typedef {*} T
 */
/**
 * @typedef {*} P
 */
/**
 *
 * @param arr {Array<string|empty>}
 * @return Array<string>
 */
export function pickHeadUntilNullish(arr: Array<string | empty>): any;
/**
 *
 * @param {...(string|number)} args
 * @return {function(string): T}
 */
export function prepareTestId(...args: (string | number)[]): (arg0: string) => T;
/**
 *
 * @param {...(string|number)} args
 * @return {function(function(string):P): function(...(string|number)): P}
 */
export function prepareTestIdOpen(...args: (string | number)[]): (arg0: (arg0: string) => P) => (...args: (string | number)[]) => P;
/**
 *
 * @param attr
 * @return {function(*=): {'data-testid': *}}
 */
export function makeE2eAttr(attr: any): () => {
    'data-testid': any;
};
/**
 *
 * @param attr
 * @return {(function(*=): (string))|*}
 */
export function makeE2eSelector(attr: any): (() => (string)) | any;
export function makeTestidValue(): (sel: any) => any;
/**
 *
 * @param str
 * @return {string}
 */
export function escapeDQuote(str: any): string;
/**
 *
 * @param obj { Object<string,function(arg: function(*): T):T>}
 * @param fn { function(*): T}
 * @return {Object<string, T>}
 */
export function applyForEachPair(obj: {
    [x: string]: (arg0: arg) => (arg0: any) => T;
}, fn: (arg0: any) => T): {
    [x: string]: T;
};
/**
 *
 * @param { string } sel
 * @param {...(string|number)} headArgs
 * @return {Array<string>}
 */
export function selectorTailToArgs(sel: string, ...headArgs: (string | number)[]): Array<string>;
/**
 *
 * @param source
 * @param args
 * @returns {*}
 */
export function appendSelector(source: any, ...args: any[]): any;
/**
 *
 * @param {Object<string,string>} source
 * @param {string|null} attrName
 * @param {...(number|string|null|void)} args
 * @returns {Object<string,string>}
 */
export function appendAttrValue(source: {
    [x: string]: string;
}, attrName: string | null, ...args: (number | string | null | void)[]): {
    [x: string]: string;
};
export const FOR_TESTS: "test";
export const FOR_RENDER: "render";
export const FOR_TESTIDS: "testids";
export const FOR_TEST_SVG: "testSvg";
export const FOR_RENDER_SVG: "renderSvg";
export function e2eAttr(): {
    'data-testid': any;
};
export const e2eSelector: any;
export function defineTestIdDictionary(cb: (arg0: (...args: string[]) => (arg0: arg, arg1: string) => T, arg1: ((...args: string[]) => (arg0: (arg0: string) => P) => (...args: string[]) => P) | null) => any): (arg0: 'test' | 'render' | 'testids') => {
    [x: string]: T | P;
} | T | P;
export function cssSel(val: any): CssSel;
export class CssSel {
    /**
     *
     * @param val
     * @param {CssSel} [parent]
     * @param {''|' '|'>'|','|' ~ '} [rel='']
     * @param {array} [marks]
     */
    constructor(val: any, parent?: CssSel, rel?: '' | ' ' | '>' | ',' | ' ~ ', marks?: any[]);
    _args: any[];
    _marks: any[];
    store(): CssSel;
    get(idx: any): any;
    /**
     * add a selector part for a descendant
     * @param val
     * @return {CssSel}
     */
    desc(val: any): CssSel;
    /**
     * add a selector part for an immediate child
     * @param val
     * @return {CssSel}
     */
    child(val: any): CssSel;
    /**
     * add a modifier for a current selector
     * @param val
     * @return {CssSel}
     */
    mod(val: any): CssSel;
    /**
     * add a `not` modifier for a selector
     * @param sel
     * @return {CssSel}
     */
    not(sel: any): CssSel;
    /**
     *
     * @param { string } attrName
     * @param { string|number } [attrValue]
     * @param { '^'|'!' } [attrCf]
     * @return {CssSel}
     */
    attr(attrName: string, attrValue?: string | number, attrCf?: '^' | '!'): CssSel;
    or(val: any): CssSel;
    second(): CssSel;
    third(): CssSel;
    toString(): any;
    valueOf(): any;
}
export type T = any;
export type P = any;
