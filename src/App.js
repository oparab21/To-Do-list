
import './App.css';
import { useState } from 'react';

function App() {
  let [todonamestatus, setToDoNameStatus] = useState([]);

  let saveToDoList = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the value of the input field and trim any extra whitespace
    let todoname = event.target.todoname.value.trim();

    // Check if the value is not empty and does not already exist in the list
    if (todoname && !todonamestatus.includes(todoname)) {
      let finalToDoList = [...todonamestatus, todoname];
      setToDoNameStatus(finalToDoList);
    } else {
      // If item already exists, show the alert
      alert("Item already exists or input is empty.");
    }

    // Clear the input field after submission
    event.target.todoname.value = '';
  };

  let list = todonamestatus.map((val, index) => {
    return (
      <UpdateList
        value={val}
        key={index}
        indexNumber={index}
        todonamestatus={todonamestatus}
        setToDoNameStatus={setToDoNameStatus}
      />
    );
  });

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name="todoname" /> <button>Save</button>
      </form>

      <div className="outerdiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

function UpdateList({ value, indexNumber, todonamestatus, setToDoNameStatus }) {
  let [status, setStatus] = useState(false );

  let deleteItem = () => {
    const filteredList = todonamestatus.filter((v, i) => i !== indexNumber); // Properly create the new array
    setToDoNameStatus(filteredList); // Update the state with the new filtered list
  };

  let checkStatus = () => {
      setStatus(!status);
  }

  return (
    <li className={(status)? 'completetodo' : ''}
    onClick={checkStatus}>
      {indexNumber + 1 +". "+ value}
      <span onClick={deleteItem} style={{ cursor: 'pointer', marginLeft: '10px' }}>&times;</span>
    </li>
  );
}
