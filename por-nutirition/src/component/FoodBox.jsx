import React, { Component } from 'react';
import FoodData from "./FoodData";
import '../App.css';

class Khanekadabba extends Component {
  state = {
    foodItems: FoodData.map(food => ({ id: food.id, quantity: 0, totalCalories: 0 })),
    searchTerm: "",
  };

  handleAmountChange = (id, quantity) => {
    this.setState(prevState => ({
      foodItems: prevState.foodItems.map(item =>
        item.id === id ? { ...item, quantity: quantity >= 0 ? quantity : 0 } : item
      ),
    }));
  };

  handleAdding = id => {
    this.setState(prevState => ({
      foodItems: prevState.foodItems.map(item =>
        item.id === id
          ? { ...item, totalCalories: item.quantity * FoodData.find(food => food.id === id).cal }
          : item
      ),
    }));
  };

  handleResetting = id => {
    this.setState(prevState => ({
      foodItems: prevState.foodItems.map(item =>
        item.id === id ? { ...item, quantity: 0, totalCalories: 0 } : item
      ),
    }));
  };

  handleSearch = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { foodItems, searchTerm } = this.state;

    const filteredFoodItems = foodItems.filter(item =>
      FoodData.find(food => food.id === item.id).name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
        <div className="food-bar">
          <div className="food-search">
            <p>Search</p>
            <input
              type="text"
              placeholder="Search foods"
              value={searchTerm}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div>
          {filteredFoodItems.map(item => {
            const { id, quantity, totalCalories } = item;
            const { name, cal, img } = FoodData.find(food => food.id === id);
            return (
              <div key={id} className="food-item">
                <div className="food-details">
                  <img src={img} alt={name} />
                  <div className="food-info">
                    <p className="food-name">{name}</p>
                    <p className="food-calories">{cal} Calories</p>
                  </div>
                </div>
                <div className="food-controls">
                  <input
                    type="number"
                    value={quantity}
                    onChange={e => this.handleAmountChange(id, parseInt(e.target.value, 10))}
                  />
                  <button onClick={() => this.handleAdding(id)}>Add</button>
                  <button onClick={() => this.handleResetting(id)}>Reset</button>
                </div>
                <div className="food-calories-display">
                  <p>{quantity} {name} = {totalCalories} calories</p>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Khanekadabba;