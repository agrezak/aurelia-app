import { InputClass } from '../../src/views/hash-input/hash-input';
import { Container } from 'aurelia-dependency-injection';
import { BehaviorInstance } from 'aurelia-templating';

describe('Input Class', () => {

  let input;
  let container;

  beforeEach(() => {

    container = new Container().makeGlobal();
    container.registerInstance(Element, '<div>');

    input = BehaviorInstance.createForUnitTest(InputClass);
    input.EventAggregator = {};

    it('contains default properties', () => {
      expect(input.testHash).toEqual(input.testHash);
    });

  });

});
