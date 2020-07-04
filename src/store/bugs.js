import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    bugAssignedToUser: (bugs,action) => {
      const {bugId,userId} = action.payload;
      const index = bugs.findIndex(bug => bug.id === bugId);
      bug[index].userId = userId;
    },
    bugAdded: (bugs,action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      });
    },
    bugResolved: (bugs,action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
    bugRemoved: (bugs,action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs.splice(index,1);
    }
  }
});
console.log("Slice:", slice);
//bugRemoved?
export const {bugAdded,bugResolved,bugRemoved,bugAssignedToUser} = slice.actions;
export default slice.reducer;

//selector function returns computed state
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  (bugs,projects) => bugs.filter(bug => !bug.resolved)
);