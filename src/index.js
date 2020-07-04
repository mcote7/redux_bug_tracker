import configureStore from './store/configureStore';
import * as actions from './store/bugs';
import {projectAdded} from './store/projects';

const store = configureStore();
// console.log("store:", store);

store.subscribe(()=> {
  console.log("store changed");
});

store.dispatch(projectAdded({name: "project1"}));
store.dispatch(actions.bugAdded({description: "Bug1"}));
store.dispatch(actions.bugAdded({description: "Bug2"}));
store.dispatch(actions.bugAdded({description: "Bug3"}));
store.dispatch(actions.bugResolved({id: 1}));
// store.dispatch(actions.bugRemoved({id: 2}));

console.log("Current State",store.getState())