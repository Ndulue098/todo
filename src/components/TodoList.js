import { useTodo } from "../context/TodoContext"
import { useState } from 'react';

export default function TodoList() { 
   const {currentData,handleDel,handleChecked,dispatch}=useTodo()
   const [draggedIndex, setDraggedIndex] = useState(null);

   const onDragStart = (index) => {
    setDraggedIndex(index); // Store the index of the dragged item
   };
   console.log(draggedIndex);
   

  // Handle drag over
  const onDragOver = (e, index) => {
    e.preventDefault(); // Allow drop
  };

  // Handle drop
  const onDrop = (index) => {
    // const updatedItems = [...listItems];
    const updatedItems = [...currentData];
    const draggedItem = updatedItems[draggedIndex];
    
    //? this get me the 1st in the arrar depending on the draggedindex;
    updatedItems.splice(draggedIndex, 1); 
    updatedItems.splice(index, 0, draggedItem); 

    
    // console.log(updatedItems.splice(index, 0, draggedItem));
    
    // setListItems(updatedItems); 
    dispatch({type:"todo/position",payload:updatedItems})
     

    setDraggedIndex(null);  

    
  };

  console.log(currentData);
  
  
   
   if(!currentData.length){
    return <h1 className="nothing">
      nothing here 🔎
    </h1> 
   } 

    return <ul className="todo-list">
        {currentData.map((todo,index)=><TodoItems index={index} handleDel={handleDel} handleChecked={handleChecked} todo={todo} key={todo.id} onDrop={onDrop} onDragOver={onDragOver} onDragStart={onDragStart} />)}
  </ul>
}

function TodoItems({todo,handleDel,handleChecked,index,onDrop,onDragOver,onDragStart}){  
   return <li draggable onDragStart={() => onDragStart(index)} onDragOver={(e) => onDragOver(e, index)} onDrop={() => onDrop(index)}>
      <div className="list-text" >
        <div className={`checker ${todo.checked && "check"}`} onClick={()=>handleChecked(todo.id)}>
          {todo.checked && <img src="/icon-check.svg" alt="" />}
        </div>
        <p className={`${todo.checked && "cross"}`}>{todo.description}</p>
      </div>
      <img src="/icon-cross.svg" alt="cross" onClick={()=>handleDel(todo.id)} />
    </li>
}

const arr=["abi","me","she","de"];
const drag="me";
const index=3;
arr.splice(1,1)
//! this is the index u want to inder ur item (3), 0 for not removing any item, what u wan in position 3
arr.splice(3,0,drag)
console.log(arr);

function dragDrop(index,to){
  const arr=["abi","me","she","de"];
  const item=arr[index];

  arr.splice(index,1);
  arr.splice(to,0,item);

  return arr
}

const val=dragDrop(1,3)
console.log(val);


