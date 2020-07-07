import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { loadBugs } from '../store/bugs';

const bugsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  return (
    <ul>{this.props.bugs.map(bug => <li key={bug.id}>{bug.description}</li>)}</ul>
  );
}

export default bugsList;