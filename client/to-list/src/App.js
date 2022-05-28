// import logo from './logo.svg';
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [itemText,setitemText] = useState("");
  const [listItems,setlistItems] = useState([])
  
  // const [todoitem,settodoitem] =useState("")
  // const [todos,setTodos] = useState([]);
  // const [listItems, setListItems] = useState([]);
  const addItem = async() => {
    // console.log("hello");

    try {
      const res = await axios.post('http://localhost:5000/api/item',{item:itemText})
      // setitemText(prev =>)
      console.log(itemText);
      console.log(res);
      setitemText()
      
    } catch (error) {
      console.log(error); 
    }
  }
    // Create function to fethch all to do item from database -- we will use useEffect hooks
    useEffect(()=>{
      const getItemsList = async () => {
        try {
          const res =await axios.get('http://localhost:5000/api/items')
          setlistItems(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      getItemsList()
    },[listItems]);
// Delete item when clich on detete
const deleteItem = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/item/${id}`)
    console.log(res.data);
    const newListItem = listItems.filer(item=> item._id !== id);
    setlistItems(newListItem)

  } catch (error) {
    console.log(error);
  }
}

  

  return (
    <div className="App">
     <div className="top">
      <input className = "form-input" type="text" name="item" onChange={(e)=>{setitemText(e.target.value)}
      }/>
      <button className = "form-button" type="submit" onClick={e => {addItem()}}>submit</button>
</div>
      <div className="todo-listItem">
        {
          listItems.map(item => (
             <div className="todo-item">
          <p className="todo-item-content"> {item.item}</p>
          <button  className="update-item">Update</button>
          <button className="delete-item" onClick={()=>deleteItem(item._id)}>Delete</button>
        </div> 
          ))
        }

      

        {/* <div className="todo-item">
          <p  className="todo-item-content"> this is the item 2</p>
          <button  className="update-item">Update</button>
          <button className="delete-item">Delete</button>
        </div>
        <div className="todo-item">
          <p className="todo-item-content"> this is the item 3</p>
          <button className="update-item">Update</button>
          <button className="delete-item">Delete</button>
        </div> */}
        
        
      </div>
    </div>
  );
}

export default App;
