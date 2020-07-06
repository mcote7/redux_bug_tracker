// import {
//   bugAssignedToUser,
//   bugAdded,
//   bugResolved,
//   getUnresolvedBugs,
//   getBugsByUser,
//   bugRemoved} from './store/bugs';
// import {projectAdded} from './store/projects';
// import {userAdded} from './store/users';
// import {addBug} from './store/bugs';
import configureStore from './store/configureStore';
import {loadBugs, resolveBug} from './store/bugs';

const store = configureStore();
// console.log("store:", store);

//UI layer
store.dispatch(loadBugs());
setTimeout(() => store.dispatch(resolveBug(2)), 2000);
// store.dispatch(addBug({description: "a"}));


// store.dispatch(loadBugs());
// setTimeout(() => store.dispatch(loadBugs()), 2000);

// store.dispatch({
//   type: 'error',
//   payload: {message: "i am error"}
// });

// store.dispatch((dispatch,getState) => {
//   dispatch({type: 'bugsRecieved', bugs: [1,2,3]});
//   console.log(getState());
// });

// store.subscribe(()=> {
//   console.log("store changed!");
// });

// store.dispatch(userAdded({name: "mike"}));
// store.dispatch(userAdded({name: "cote"}));
// store.dispatch(projectAdded({name: "project1"}));
// store.dispatch(bugAdded({description: "Bug1"}));
// store.dispatch(bugAdded({description: "Bug2"}));
// store.dispatch(bugAdded({description: "Bug3"}));
// store.dispatch(bugAssignedToUser({bugId: 1, userId: 1}));
// store.dispatch(bugResolved({id: 1}));
// store.dispatch(bugRemoved({id: 2}));

// const unresolvedBugs =  getUnresolvedBugs(store.getState());
// console.log("unresolved:", unresolvedBugs);

// const usersBugs = getBugsByUser(1)(store.getState());
// console.log("usersBugs:", usersBugs);