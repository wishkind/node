import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todoReducer from '../ducks/todos';

export default function configureRootReducer(client) {
  return combineReducers({
    routing: routerReducer,
    apollo: client.reducer(),
    todo: todoReducer
  });
}
