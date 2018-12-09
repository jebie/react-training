import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import ExpenseListFilters from './ExpenseListFilters';
import selectExpenses from '../selectors/expenses';

const ExpenseList = (props) => {
  const listItems = props.expenses.map((expense) => (
    <ExpenseListItem {...expense} key={expense.id} />
  ));

  return (
    <div>
      <ExpenseListFilters />
      <h3>Expense List</h3>
      {listItems}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
