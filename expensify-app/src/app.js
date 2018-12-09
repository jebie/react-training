import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouters from './routers/AppRouters';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({ description : 'Water Bill', amount: 3000 }));
store.dispatch(addExpense({ description : 'Gas Bill', amount: 1000, createdAt: 5000 }));
store.dispatch(addExpense({ description : 'Gas Bill', amount: 2000, createdAt: 100 }));

const { expenses, filters } = store.getState();
const visibleExpenses = getVisibleExpenses(expenses, filters);

console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouters />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
