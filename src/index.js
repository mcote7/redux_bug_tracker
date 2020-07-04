import configureStore from './store/configureStore';
// console.log("store:", store);
import * as actions from './store/projects';

const store = configureStore();

store.subscribe(()=> {
  console.log("store changed");
});

// store.dispatch(actions.bugAdded({description: "Bug1"}));
// store.dispatch(actions.bugAdded({description: "Bug2"}));
// store.dispatch(actions.bugAdded({description: "Bug3"}));
// store.dispatch(actions.bugResolved({id: 1}));
// store.dispatch(actions.bugRemoved({id: 1}));

store.dispatch(actions.projectAdded({name: "project1"}));

console.log("Current State",store.getState())