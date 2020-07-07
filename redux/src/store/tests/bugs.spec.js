import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {addBug} from '../bugs';
import configureStore from '../configureStore';

describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  })

  const bugsSlice = () => store.getState().entities.bugs;

  it("should add bug to store if saved to server", async () => {
    //Arrange
    const bug = {description: 'a bug'};
    const savedBug = {...bug, id: 1};
    fakeAxios.onPost('/bugs').reply(200, savedBug);

    //Act
    await store.dispatch(addBug(bug));

    //Asert
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add bug to store if not saved to server", async () => {
    //Arrange
    const bug = {description: 'a bug'};
    fakeAxios.onPost('/bugs').reply(500);

    //Act
    await store.dispatch(addBug(bug));

    //Asert
    expect(bugsSlice().list).toHaveLength(0);
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