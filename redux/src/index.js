// import {
//   getUnresolvedBugs,
//   getBugsByUser,
//   bugRemoved} from './store/bugs';
// import {projectAdded} from './store/projects';
// import {userAdded} from './store/users';
// import {addBug, resolveBug} from './store/bugs';
import configureStore from './store/configureStore';
import {loadBugs, assignBugToUser} from './store/bugs';

const store = configureStore();
// console.log("store:", store);

//UI layer
store.dispatch(loadBugs());
setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);
// store.dispatch(addBug({description: "a"}));


// store.dispatch(loadBugs());
// setTimeout(() => store.dispatch(loadBugs()), 2000);

// store.dispatch({
//   type: 'error',
//   payload: {message: "i am error"}
// });

// store.subscribe(()=> {
//   console.log("store changed!");
// });

// store.dispatch(userAdded({name: "mike"}));
// store.dispatch(userAdded({name: "cote"}));
// store.dispatch(projectAdded({name: "project1"}));
// store.dispatch(bugRemoved({id: 2}));

// const unresolvedBugs =  getUnresolvedBugs(store.getState());
// console.log("unresolved:", unresolvedBugs);

// const usersBugs = getBugsByUser(1)(store.getState());
// console.log("usersBugs:", usersBugs);