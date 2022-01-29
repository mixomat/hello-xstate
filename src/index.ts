import { interpret } from 'xstate';
import { promiseMachine, promiseModel } from './machine';

// Interpret the machine, and add a listener for whenever a transition occurs.
const promiseService = interpret(promiseMachine).onTransition((state) => {
  console.log(state.value);
});

promiseService.start();
console.log(promiseService.state.context);

promiseService.send(promiseModel.events.resolve());

console.log(promiseService.state.context);
promiseService.stop();
