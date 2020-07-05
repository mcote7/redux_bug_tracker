const func = ({dispatch,getState}) => next => action => {
  typeof action === 'function'?action(dispatch,getState):next(action);
  console.log("func:", func)
};
export default func;