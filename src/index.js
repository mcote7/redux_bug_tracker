import configureStore from './store/configureStore';
import {bugAdded,bugRemoved,bugResolved,getUnresolvedBugs,bugAssignedToUser} from './store/bugs';
import {projectAdded} from './store/projects';
import {userAdded} from './store/users';

const store = configureStore();
// console.log("store:", store);

store.subscribe(()=> {
  console.log("store changed");
});

store.dispatch(userAdded({name: "mike"}));
store.dispatch(userAdded({name: "cote"}));
store.dispatch(projectAdded({name: "project1"}));
store.dispatch(bugAdded({description: "Bug1"}));
store.dispatch(bugAdded({description: "Bug2"}));
store.dispatch(bugAdded({description: "Bug3"}));
store.dispatch(bugAssignedToUser({bugId: 1, userId: 1}));
store.dispatch(bugResolved({id: 1}));
// store.dispatch(bugRemoved({id: 2}));

const unresolvedBugs =  getUnresolvedBugs(store.getState());
console.log("unresolved:", unresolvedBugs);