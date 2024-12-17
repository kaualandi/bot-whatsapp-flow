import 'reflect-metadata';
import container from '../../config/inversify';
import { IStep } from '../models/step';

export function Step(metadata: { selector: number }) {
  return function (target: any) {
    container.bind(target).toSelf();
    Reflect.defineMetadata('step', metadata.selector, target);
  };
}

export function getRegisteredSteps() {
  const steps = new Map<number, IStep>();
  for (const binding of container['_bindingDictionary']._map) {
    const stepClass = binding[1][0].implementationType;
    const selector = Reflect.getMetadata('step', stepClass);

    if (selector !== undefined) {
      steps.set(selector, container.get(stepClass));
    }
  }
  return steps;
}
