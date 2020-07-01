import store from './store';
// console.log("store:", store);
import * as actions from './store/actions';

store.subscribe(()=> {
  console.log("store changed");
});

store.dispatch(actions.bugAdded("Bug1"));
store.dispatch(actions.bugAdded("Bug2"));
store.dispatch(actions.bugAdded("Bug3"));
store.dispatch(actions.bugResolved(1));

console.log(store.getState())