import { useTodo } from "../context/TodoContext";

export default function Form() {
const {dispatch,description}=useTodo()

function handleAdd(e){
    e.preventDefault();
    if(!description)return
    const id=crypto.randomUUID() 
    // const newData={description,id,checked:false}
    dispatch({type:"todo/add",payload:{description,id}})
    // dispatch({type:"todo/add",payload:newData})
    console.log("submitted"); 

    dispatch({type:"todo/reset"})
} 

function handleForm(e){ 
    dispatch({type:"todo/input",payload:e.target.value})
}

 

  return (
    <form className="form" onSubmit={handleAdd}>
      <div className="checker"></div>
      <div className="input-text">
        
        <p>create a new task</p>
        <input className="text-field" value={description} type="text" onChange={(e)=>handleForm(e)}/>
      </div>
    </form>
  );
}
