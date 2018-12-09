import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      {description} -- {amount} -- {createdAt}
    </Link>
  </div>
);

export default ExpenseListItem;
