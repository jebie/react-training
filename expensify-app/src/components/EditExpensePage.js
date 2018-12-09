import React from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = (props) => (
  <div>
    <h3>Edit Expense</h3>
    <ExpenseForm
      expense={props.expense}
      onSubmit={(expense) => {
        props.dispatch(editExpense(props.expense.id, expense));
        props.history.push('/');
      }}
    />
    <button
      onClick={(e) => {
        props.dispatch(removeExpense({ id: props.expense.id }));
        props.history.push('/');
    }}> remove </button>
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditExpensePage);
