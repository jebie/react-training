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

export default expensesReducer;
