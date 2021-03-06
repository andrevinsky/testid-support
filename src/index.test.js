import { FOR_TESTIDS } from './helpers';
import {
  appendAttrValue,
  appendSelector,
  cssSel,
  defineTestIdDictionary,
  e2eAttr,
  e2eSelector,
  pickHeadUntilNullish,
  prepareTestId,
  prepareTestIdOpen,
  selectorTailToArgs
} from './helpers';
 
import { FOR_RENDER, FOR_TESTS, } from './index';

describe(`testid-support`, () => {

  describe(`pickHeadUntilNullish(arr:Array<string|empty>):Array<string>`, () => {
    [
      [ [], [], 'No args' ],
      [ [ 'modal' ], [ 'modal' ], 'single arg' ],
      [ [ 'modal', 'alert' ], [ 'modal', 'alert' ], 'two args' ],
      [ [ 'modal', 'alert', null ], [ 'modal', 'alert' ], 'three args with null in the end' ],
      [ [ 'modal', null, 'alert' ], [ 'modal' ], 'three args with null in the middle' ],
      [ [ null, 'modal', 'alert' ], [], 'three args with null at the start' ],
    ].filter(Boolean).map(([ args, expected, msg ], idx) =>
      test(`#${ 1 + idx }. ${ msg } `, () => {
        expect(pickHeadUntilNullish(args)).toEqual(expected);
      }));
  });

  describe.skip(`applyForEachPair(obj, fn)`, () => {});

  describe(`prepareTestId(role, roleSpecifics, personalization):{function(arg:string): *}`, () => {
    [
      [ [], '', 'No args' ],
      [ [ 'modal' ], 'modal|', 'single arg' ],
      [ [ 'modal', 'alert' ], 'modal|alert|', 'two args' ],
      [ [ 'modal', 'alert', null ], 'modal|alert|', 'three args with null in the end' ],
      [ [ 'modal', null, 'alert' ], 'modal|', 'three args with null in the middle' ],
      [ [ null, 'modal', 'alert' ], '', 'three args with null at the start' ],
    ].filter(Boolean).map(([ args, expected, msg ], idx) =>
      test(`#${ 1 + idx }. ${ msg } `, () => {
        const K = arg => arg;
        expect(prepareTestId(...args)(K)).toEqual(expected);
      }));
  });

  describe(`prepareTestIdOpen(...args) => fn => (...args2) => *`, () => {
    [
      [ [], [], '', 'No args' ],
      [ [ 'modal' ], [], 'modal|', 'single arg' ],
      [ [ 'modal', 'alert' ], [], 'modal|alert|', 'two args' ],
      [ [ 'modal' ], [ 'alert' ], 'modal|alert|', 'two args' ],
      [ [ 'modal', 'alert', null ], [], 'modal|alert|', 'three args with null in the end (3-0)' ],
      [ [ 'modal', 'alert' ], [ null ], 'modal|alert|', 'three args with null in the end (2-1)' ],
      [ [ 'modal' ], [ 'alert', null ], 'modal|alert|', 'three args with null in the end (1-2)' ],
      [ [], [ 'modal', 'alert', null ], 'modal|alert|', 'three args with null in the end (0-3)' ],
      [ [ 'modal', null, 'alert' ], [], 'modal|', 'three args with null in the middle (3-0)' ],
      [ [ 'modal', null ], [ 'alert' ], 'modal|', 'three args with null in the middle (2-1)' ],
      [ [ 'modal' ], [ null, 'alert' ], 'modal|', 'three args with null in the middle (1-2)' ],
      [ [], [ 'modal', null, 'alert' ], 'modal|', 'three args with null in the middle (0-3)' ],
      [ [ null, 'modal', 'alert' ], [], '', 'three args with null at the start (3-0)' ],
      [ [ null, 'modal' ], [ 'alert' ], '', 'three args with null at the start (2-1)' ],
      [ [ null ], [ 'modal', 'alert' ], '', 'three args with null at the start (1-2)' ],
      [ [], [ null, 'modal', 'alert' ], '', 'three args with null at the start (0-3)' ],
    ].filter(Boolean).map(([ args, args2, expected, msg ], idx) =>
      test(`#${ 1 + idx }. ${ msg } `, () => {
        const K = arg => arg;
        expect(prepareTestIdOpen(...args)(K)(...args2)).toEqual(expected);
      }));
  });

  describe(`e2eAttr(sel:string):{'data-testid'}`, () => {
    [
      [ [], { 'data-testid': '' }, 'No args' ],
      [ [ 'modal' ], { 'data-testid': 'modal|' }, 'single arg' ],
      [ [ 'modal', 'alert' ], { 'data-testid': 'modal|alert|' }, 'two args' ],
      [ [ 'modal', 'alert', null ], { 'data-testid': 'modal|alert|' }, 'three args with null in the end' ],
      [ [ 'modal', null, 'alert' ], { 'data-testid': 'modal|' }, 'three args with null in the middle' ],
      [ [ null, 'modal', 'alert' ], { 'data-testid': '' }, 'three args with null at the start' ],
    ].filter(Boolean).map(([ args, expected, msg ], idx) =>
      test(`#${ 1 + idx }. ${ msg } `, () => {
        expect(prepareTestId(...args)(e2eAttr)).toEqual(expected);
      }));

  });
  describe(`e2eSelector(sel:string):string`, () => {
    [
      [ [], '[data-testid=""]', 'No args' ],
      [ [ 'modal' ], '[data-testid^="modal|"]', 'single arg' ],
      [ [ 'modal', 'alert' ], '[data-testid^="modal|alert|"]', 'two args' ],
      [ [ 'modal', 'alert', null ], '[data-testid^="modal|alert|"]', 'three args with null in the end' ],
      [ [ 'modal', null, 'alert' ], '[data-testid^="modal|"]', 'three args with null in the middle' ],
      [ [ null, 'modal', 'alert' ], '[data-testid=""]', 'three args with null at the start' ],
    ].filter(Boolean).map(([ args, expected, msg ], idx) =>
      test(`#${ 1 + idx }. ${ msg } `, () => {
        expect(prepareTestId(...args)(e2eSelector)).toEqual(expected);
      }));
  });

  describe(`defineTestIdDictionary((testId, testIdFn) => ({}))`, () => {
    [ FOR_RENDER, FOR_TESTS, FOR_TESTIDS ].map((testOrRuntime, idx0) => {
      return [
        [ [], [ 
          { 'data-testid': '' }, 
          '[data-testid=""]', 
          '' ], 'No args' ],
        [ [ 'modal' ], [ 
          { 'data-testid': 'modal|' }, 
          '[data-testid^="modal|"]',
          'modal|'
         ], 'single arg' ],
        [ [ 'modal', 'alert' ], [ 
          { 'data-testid': 'modal|alert|' }, 
          '[data-testid^="modal|alert|"]',
          'modal|alert|'
         ], 'two args' ],
        [ [ 'modal', 'alert', null ], [ 
          { 'data-testid': 'modal|alert|' }, 
          '[data-testid^="modal|alert|"]',
          'modal|alert|'
         ], 'three args with null in the end' ],
        [ [ 'modal', null, 'alert' ], [ 
          { 'data-testid': 'modal|' }, 
          '[data-testid^="modal|"]',
          'modal|'
         ], 'three args with null in the middle' ],
        [ [ null, 'modal', 'alert' ], [ 
          { 'data-testid': '' }, 
          '[data-testid=""]',
          ''
         ], 'three args with null at the start' ],
      ].filter(Boolean).map(([ args, expectedChoice, msg ], idx) =>
        test(`#${ 1 + idx }. ${ msg } `, () => {
          expect(defineTestIdDictionary(
            fn => fn(...args))(testOrRuntime))
            .toEqual(expectedChoice[ idx0 ]);
          expect(defineTestIdDictionary(
            fn => ({ PROP: fn(...args) }))(testOrRuntime))
            .toEqual({ PROP: expectedChoice[ idx0 ] });
        }));
    });
  });

  describe(`cssSel(*)`, () => {
    describe(`constructor`, () => {
      [
        [ '*', null, '*', 'Any tag' ],
        [ '.class1', null, '.class1', 'A class name as a starter' ],
        [ '.class1', inst => ('*' + inst), '*.class1', 'Concatenating to a string, testing valueOf()' ],
        [ '.class1', inst => inst.desc('.class2'), '.class1 .class2', 'one descendant' ],
        [ '.class1', inst => inst.desc('.class2').desc('.class3'), '.class1 .class2 .class3', 'two descendants' ],
        [ '.class1', inst => inst.attr('disabled'), '.class1[disabled]', 'attribute presence' ],
        [ '.class1', inst => inst.attr('title', 3), '.class1[title="3"]', 'attribute equality to a given value' ],
      ].filter(Boolean).map(([ firstArg, tf, expected, msg ], idx) =>
        test(`#${ 1 + idx }. ${ msg } `, () => {
          expect(String(tf ? tf(cssSel(firstArg)) : cssSel(firstArg))).toEqual(expected);
        }));
    });

    describe(`relationship methods`, () => {
      [
        [ sel => sel.mod('.class'), '*.class', 'modification of the same node' ],
        [ sel => sel.not('.class'), '*:not(.class)', 'modification of the same node, negative' ],
        [ sel => sel.mod('.class1').mod('.class2'), '*.class1.class2', 'modification of the same node (twice)' ],
        [ sel => sel.mod('.class1').or('.class2'), '*.class1,.class2', 'modification of the same node or another selector' ],
        [ sel => sel.mod('.class1').second(), '*.class1 ~ *.class1', 'second of such selector' ],
        [ sel => sel.mod('.class1').third(), '*.class1 ~ *.class1 ~ *.class1', 'third of such selector' ],
        [ sel => sel.attr('title'), '*[title]', 'attribute of the same node' ],
        [ sel => sel.attr('title', 'titleName'), '*[title="titleName"]', 'attribute with the value of the same node' ],
        [ sel => sel.attr('title', 'titleName', '^'), '*[title^="titleName"]', 'attribute with the value (^=) of the same node' ],
        [ sel => sel.mod('.class1').mod('.class2'), '*.class1.class2', 'modification of the same node (twice)' ],
        [ sel => sel.desc('.class'), '* .class', 'descendant of the node' ],
        [ sel => sel.desc('.class1').desc('.class2'), '* .class1 .class2', 'descendant of descendant of the node' ],
        [ sel => sel.child('.class'), '*>.class', 'child of the node' ],
        [ sel => sel.child('.class1').child('.class2'), '*>.class1>.class2', 'child of child of the node' ],
      ].filter(Boolean).map(([ tf, expected, msg ], idx) =>
        test(`#${ 1 + idx }. ${ msg } `, () => {
          expect(String(tf(cssSel('*')))).toEqual(expected);
        }));
    });

    describe(`store() and get()`, () => {
      const selector = cssSel('*').desc('.class1');
      const expectedValue = String(selector);

      test(`Proof of concept`, () => {
        expect(String(selector.store().desc('.class2').get(0))).toEqual(expectedValue);
      });
    });

  });

  describe(`selectorTailToArgs(sel, ...headArgs)`, () => {
    [
      [ [], [], [], 'empty' ],
      [ [ 'modal', 'alert', 'success' ], [ 'modal', 'alert', 'success' ], [], '3 of 3 -> 0' ],
      [ [ 'modal', 'alert', 'success' ], [ 'modal', 'alert' ], [ 'success' ], '2 of 3 -> 1' ],
    ].filter(Boolean).map(([ selArgs, headArgs, expected, msg ], idx) =>
      test(`#${ 1 + idx }. ${ msg } `, () => {
        const K = arg => arg;
        expect(selectorTailToArgs(prepareTestId(...selArgs)(K), ...headArgs)).toEqual(expected);
      }));
  });

  describe(`appendSelector(source, ...args)`, () => {
    [
      [ '[data-testid=""]', [], '[data-testid=""]' ],
      [ '[data-testid=""]', [ 'modal' ], '[data-testid^="modal|"]' ],
      [ '[data-testid=""]', [ 'modal', 'alert' ], '[data-testid^="modal|alert|"]' ],
      [ '[data-testid=""]', [ 'modal', 'alert', null ], '[data-testid^="modal|alert|"]' ],
      [ '[data-testid=""]', [ 'modal', null, 'alert' ], '[data-testid^="modal|"]' ],
      [ '[data-testid=""]', [ null, 'modal', 'alert' ], '[data-testid=""]' ],
      [ '[data-testid^="modal|"]', [ ], '[data-testid^="modal|"]' ],
      [ '[data-testid^="modal|"]', [ '' ], '[data-testid^="modal|"]' ],
      [ '[data-testid^="modal|"]', [ 'modal' ], '[data-testid^="modal|modal|"]' ],
      [ '[data-testid^="modal|"]', [ 'alert' ], '[data-testid^="modal|alert|"]' ],
      [ '[data-testid^="modal|"]', [ 'alert', 1 ], '[data-testid^="modal|alert|1|"]' ],

    ].filter(Boolean).map(([ source, args, expected, msg ], idx) =>
      test(`#${ 1 + idx }. Appending selector '${ source }' with ${ JSON.stringify(args) } makes '${ expected }'`, () => {
        expect(appendSelector(source, ...args)).toEqual(expected);
      }));
  });

  describe(`appendAttrValue(source, ...args)`, () => {
    [
      [ { 'data-testid': '' } , [], { 'data-testid': '' }, 'empty' ],
      [ { 'data-testid': '' } , [ 'modal' ], { 'data-testid': 'modal|' }, 'single arg' ],
      [ { 'data-testid': '' } , [ 'modal', 'alert' ], { 'data-testid': 'modal|alert|' }, 'two args' ],
      [ { 'data-testid': '' } , [ 'modal', 'alert', null ], { 'data-testid': 'modal|alert|' }, 'three args with null in the end' ],
      [ { 'data-testid': '' } , [ 'modal', null, 'alert' ], { 'data-testid': 'modal|' }, 'three args with null in the middle' ],
      [ { 'data-testid': '' } , [ null, 'modal', 'alert' ], { 'data-testid': '' }, 'three args with null at the start' ],
    ].filter(Boolean).map(([ source, args, expected, msg ], idx) =>
      test(`#${ 1 + idx }. ${ msg } `, () => {
        expect(appendAttrValue(source, null, ...args)).toEqual(expected);
      }));
  });
});
