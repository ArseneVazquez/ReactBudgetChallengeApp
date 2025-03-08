import "./styles/styles.css";

import React, { useState, useEffect } from "react";

// Expense Component
const Expense = ({ id, description, value, percentage, onDelete }) => {
  return (
    <div className="item clearfix" id={`exp-${id}`}>
      <div className="item__description">{description}</div>
      <div className="right clearfix">
        <div className="item__value">{value}</div>
        {/* <div className="item__percentage">
          {percentage > 0 ? `${percentage}%` : "\u2014"}
        </div> */}
        <div className="item__delete">
          <button
            className="item__delete--btn"
            onClick={() => onDelete("exp", id)}
          >
            {" "}
            -<i className="ion-ios-close-outline"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Income Component
const Income = ({ id, description, value, onDelete }) => {
  return (
    <div className="item clearfix" id={`inc-${id}`}>
      <div className="item__description">{description}</div>
      <div className="right clearfix">
        <div className="item__value">{value}</div>
        <div className="item__delete">
          <button
            className="item__delete--btn"
            onClick={() => onDelete("inc", id)}
          >
            {" "}
            - <i className="ion-ios-close-outline"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [items, setItems] = useState({ exp: [], inc: [] });
  const [budget, setBudget] = useState({
    totalInc: 0,
    totalExp: 0,
    budget: 0,
    percentage: -1,
  });
  const [input, setInput] = useState({
    type: "inc",
    description: "",
    value: "",
  });

  useEffect(() => {
    calculateBudget();
  }, [items]);

  const calculateBudget = () => {
    const totalInc = items.inc.reduce((sum, item) => sum + item.value, 0);
    const totalExp = items.exp.reduce((sum, item) => sum + item.value, 0);
    const budget = totalInc - totalExp;
    const percentage =
      totalInc > 0 ? Math.round((totalExp / totalInc) * 100) : -1;

    setBudget({ totalInc, totalExp, budget, percentage });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: name === "value" ? parseFloat(value) || "" : value,
    });
  };

  const handleAddItem = () => {
    if (input.description && input.value > 0) {
      const id =
        items[input.type].length > 0
          ? items[input.type][items[input.type].length - 1].id + 1
          : 0;
      const newItem = {
        id,
        description: input.description,
        value: input.value,
      };
      setItems({ ...items, [input.type]: [...items[input.type], newItem] });
      setInput({ type: "inc", description: "", value: "" });
    }
  };

  const handleDeleteItem = (type, id) => {
    setItems({
      ...items,
      [type]: items[type].filter((item) => item.id !== id),
    });
  };

  return (
    <div>
      <header>
        <div className="top">
          <div className="budget">
            <div className="budget__title">
              Available Budget in{" "}
              <span className="budget__title--month">
                {new Date().toLocaleString("default", { month: "long" })}{" "}
                {new Date().getFullYear()}
              </span>
              :
            </div>
            <div className="budget__value">
              {budget.budget >= 0
                ? `+ ${budget.budget}`
                : `- ${Math.abs(budget.budget)}`}
            </div>
            <div className="budget__income clearfix">
              <div className="budget__income--text">Income</div>
              <div className="right">
                <div className="budget__income--value">+ {budget.totalInc}</div>
              </div>
            </div>
            <div className="budget__expenses clearfix">
              <div className="budget__expenses--text">Expenses</div>
              <div className="right">
                <div className="budget__expenses--value">
                  - {budget.totalExp}
                </div>
                <div className="budget__expenses--percentage">
                  {budget.percentage > 0 ? `${budget.percentage}%` : "\u2014"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="bottom">
        <div className="add">
          <div className="add__container">
            <select
              className="add__type"
              name="type"
              value={input.type}
              onChange={handleInputChange}
            >
              <option value="inc">+</option>
              <option value="exp">-</option>
            </select>
            <input
              type="text"
              className="add__description"
              name="description"
              value={input.description}
              onChange={handleInputChange}
              placeholder="Add description"
            />
            <input
              type="number"
              className="add__value"
              name="value"
              value={input.value}
              onChange={handleInputChange}
              placeholder="Value"
            />
            <button className="add__btn" onClick={handleAddItem}>
              +
            </button>
          </div>
        </div>
        <div className="container clearfix">
          <div className="income">
            <h2 className="income__title">Income</h2>
            <div className="income__list">
              {items.inc.map((inc) => (
                <Income key={inc.id} {...inc} onDelete={handleDeleteItem} />
              ))}
            </div>
          </div>
          <div className="expenses">
            <h2 className="expenses__title">Expenses</h2>
            <div className="expenses__list">
              {items.exp.map((exp) => (
                <Expense
                  key={exp.id}
                  {...exp}
                  percentage={Math.round((exp.value / budget.totalInc) * 100)}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
