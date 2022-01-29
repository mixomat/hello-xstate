import { interpret } from 'xstate';
import { createModel } from 'xstate/lib/model';

interface PromiseData {
  successful: boolean;
}

const initialContext: PromiseData = {
  successful: false,
};

const promiseModel = createModel(initialContext, {
  events: {
    resolve: () => ({}),
    reject: () => ({}),
  },
});

const assignResolved = promiseModel.assign({ successful: true }, 'resolve');
const assignRejected = promiseModel.assign({ successful: false }, 'reject');

const promiseMachine = promiseModel.createMachine({
  id: 'Promise',
  initial: 'pending',
  states: {
    pending: {
      on: {
        resolve: {
          actions: [assignResolved],
          target: 'resolved',
        },
        reject: {
          actions: [assignRejected],
          target: 'rejected',
        },
      },
    },
    resolved: {
      type: 'final',
    },
    rejected: {
      type: 'final',
    },
  },
});

// Interpret the machine, and add a listener for whenever a transition occurs.
const service = interpret(promiseMachine, { devTools: true }).onTransition(
  (state) => {
    console.log(state.value);
  }
);

console.log(promiseMachine.initialState.context);

service.start();

service.send(promiseModel.events.resolve());

console.log(service.state.context);

service.stop();
