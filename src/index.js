import store from './customStore';
// console.log("store:", store);
import * as actions from './actions';

store.subscribe(()=> {
  console.log("store changed");
});

store.dispatch(actions.bugAdded("Bug1"));

console.log(store.getState())