import store from './store';
console.log(store);
import {bugAdded, bugResolved} from './actions';

store.dispatch(bugAdded("Bug1"));
store.dispatch(bugResolved(1));

console.log("store:",store.getState());