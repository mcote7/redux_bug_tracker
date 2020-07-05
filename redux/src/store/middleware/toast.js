const toast = store => next => action => {
  action.type === 'error' ?
  console.log("toast:", action.payload.message)
  : next(action);
}
export default toast;
