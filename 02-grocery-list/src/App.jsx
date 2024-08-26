import { useState, useEffect } from 'react';
import './App.css'
import groceryCartImg from "./assets/grocery-cart.png"

function App() {

  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    determineCompletedStatus();
  }, [groceryItems])

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

const determineCompletedStatus = () => {
  if(!groceryItems.length) {
    return setIsCompleted(false);
  }

  const isAllCompleted = groceryItems.every(i => i.completed);
  setIsCompleted(isAllCompleted);
}

  const handleAddGroceryItem = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        const updatedGroceryList = [...groceryItems];
        const itemIndex = updatedGroceryList.findIndex(i => i.name === inputValue);

        if (itemIndex === -1) {
          updatedGroceryList.push({
            name: inputValue,
            quantity: 1,
            completed: false
          })
        } else {
          updatedGroceryList[itemIndex].quantity++;
        }
        setGroceryItems(updatedGroceryList);
        setInputValue("");
      }
    }
  };
  const handleDeleteItem = (name) => {
    setGroceryItems([...groceryItems]
      .filter(i => i.name !== name));
  }
  const handleUpdateCompleteStatus = (status, index) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);
  }
  const renderGroceryList = () => {
    return groceryItems.map((item, index) => (
      <li key={item.name}>
        <div className="container">
          <input type="checkbox"
            value={item.checked}
            checked={item.checked}
            onChange={
              (e) => handleUpdateCompleteStatus(e.target.checked, index)
            } />
          <p>
            {item.name} {item.quantity > 1 && <span>x{item.quantity}</span>}
          </p>
        </div>
        <div>
          <button onClick={() => handleDeleteItem(item.name)}
            className="remove-button">X</button>
        </div>
      </li>
    ))
  }


  return (
    <main className="App">
      <div>
        {isCompleted && <h4 className="success">You're Done</h4>}
        <div className="header">
          <h1>Shopping List</h1>
          <img src={groceryCartImg} alt="" />
          <input type="text"
            placeholder='Add an Item'
            className='item-input'
            onChange={handleChangeInputValue}
            onKeyDown={handleAddGroceryItem}
            value={inputValue} />
        </div>
        <ul>
          {renderGroceryList()}
        </ul>
      </div>
    </main>
  )
}

export default App;
