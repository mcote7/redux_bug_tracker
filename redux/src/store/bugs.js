import {createSlice} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
import { apiCallBegan } from './api';

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsReceived: (bugs,action) => {
      bugs.list = action.payload;
      bugs.loading = false;
    },
    bugsRequestFailed: (bugs,action) => {
      bugs.loading = false;
    },
    bugAssignedToUser: (bugs,action) => {
      const {bugId,userId} = action.payload;
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
    bugAdded: (bugs,action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      });
    },
    bugResolved: (bugs,action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugRemoved: (bugs,action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list.splice(index,1);
    }
  }
});
console.log("Slice:", slice);

export const {
  bugAssignedToUser,
  bugAdded,
  bugResolved,
  bugRemoved,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed
} = slice.actions;
export default slice.reducer;

//action creators
const url = "/bugs";
export const loadBugs = () =>
  apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type,
    onError: bugsRequestFailed.type
  });

//selector function returns computed state
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  (bugs,projects) => bugs.list.filter(bug => !bug.resolved)
);

export const getBugsByUser = userId => createSelector(
  state => state.entities.bugs,
  bugs => bugs.list.filter(bug => bug.userId === userId)
);