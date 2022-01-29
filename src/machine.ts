import { createModel } from 'xstate/lib/model';

export interface PromiseData {
  successful: boolean;
}

const initialContext: PromiseData = {
  successful: false,
};

export const promiseModel = createModel(initialContext, {
  events: {
    resolve: () => ({}),
    reject: () => ({}),
  },
});

const assignResolved = promiseModel.assign({ successful: true }, 'resolve');
const assignRejected = promiseModel.assign({ successful: false }, 'reject');

export const promiseMachine = promiseModel.createMachine({
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
