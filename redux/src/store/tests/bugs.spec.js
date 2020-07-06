import {addBug} from '../bugs';
import configureStore from '../configureStore';

describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    const store = configureStore();
    const bug = {description: 'a bug'};
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});






//SOLITARY TEST
// describe("bugSlice", () => {
//   describe("action creators", () => {
//     it("addBug", () => {
//       const bug = {description: 'a'};
//       const result = addBug(bug);
//       const expected = {
//         type: apiCallBegan.type,
//         payload: {
//           url: '/bugs',
//           method: 'post',
//           data: bug,
//           onSuccess: bugAdded.type
//         }
//       };
//       expect(result).toEqual(expected);
//     })
//   })
// })