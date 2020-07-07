import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {loadBugs, addBug, resolveBug, getUnresolvedBugs} from '../bugs';
import configureStore from '../configureStore';

describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  })

  const bugsSlice = () => store.getState().entities.bugs;

  const createState = () => ({
    entities: { bugs: { list: [] } } });

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("they should not be fetched from server again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{id: 1}]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      })
    });
    describe("if the bugs do not exist in the cache", () => {
      it("they should be fetched from server and put in store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{id: 1}]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      })
      describe("loading indicator", () => {
        it("should be true while fetching bugs", () => {
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugsSlice().loading).toBe(true);
            return [200, [{id: 1}]]
          });

          store.dispatch(loadBugs());
        });

        it("should be false after fetching bugs", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{id: 1}]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });

        it("should be false if server returns error", async () => {
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      })
    });
  })

  it("should mark the bug as resolved if saved to server", async () => {
    fakeAxios.onPatch("/bugs/1").reply(200, {id: 1, resolved: true});
    fakeAxios.onPost("/bugs").reply(200, {id: 1});

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not mark the bug as resolved if not saved to server", async () => {
    fakeAxios.onPatch("/bugs/1").reply(500);
    fakeAxios.onPost("/bugs").reply(200, {id: 1});

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).not.toBe(true);
  });

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
    const bug = {description: 'a bug'};
    fakeAxios.onPost('/bugs').reply(500);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });

  describe("selectors", () => {
    it("getunresolvedBugs", () => {
      const state = createState();
      state.entities.bugs.list = [{id: 1, resolved: true}, {id: 2}, {id: 3}]

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
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