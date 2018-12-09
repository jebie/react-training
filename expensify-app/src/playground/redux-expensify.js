import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//
// expensesReducer
//

const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

const editExpense = (id, expense) => ({
  type: 'EDIT_EXPENSE',
  id,
  expense
});

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

const expensesDefault = [];
const expensesReducer = (state = expensesDefault, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id != action.id)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return { ...expense, ...action.expense};
        }
        return expense;
      });
    default:
      return state;
  }
}

//
// filtersReducer
//

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

const sortByAmount = () => ({ type: 'SORT_BY_AMOUNT' });

const sortByDate = () => ({ type: 'SORT_BY_DATE' });

const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate
});

const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate
});

const filtersDefault = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersDefault, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount' };
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date' };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
}

//
// create create
//

const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
}));

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof(startDate) !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof(endDate) !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy == 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }

    return a.amount < b.amount ? 1 : -1;
  });
};

store.subscribe(() => {
  const { expenses, filters } = store.getState();
  const visibleExpenses = getVisibleExpenses(expenses, filters);
  console.log(visibleExpenses);
})

// expenses
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 200, createdAt: -1000 }));
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));


// filters
// store.dispatch(setTextFilter('Rent'));
// store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(1000));
// store.dispatch(setStartDate(-2000));
// store.dispatch(setEndDate(12350));


const demoState = {
  expenses: [{
    id: 'wertyukjhby',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0,
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined
  }
};
