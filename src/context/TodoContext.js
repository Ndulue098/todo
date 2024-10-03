import { act, createContext, useContext, useReducer } from "react";

const TodoContext = createContext();

const data=[
    {id:1,checked:false,description:"wash plate"},
    {id:2,checked:false,description:"code"},
    {id:3,checked:false,description:"eat"},
    {id:4,checked:false,description:"anime"},
]
const initialState={
    data,
    description:"",
    currentId:"", 
    status:"All",
}


function TodoProviders({ children }){
    function reducer(curState,action){
        switch (action.type) {
            case "todo/add":
                return {...curState,data:[...curState.data,{id:action.payload.id, description:action.payload.description, checked:false}]}
            case "todo/position":
                return {...curState,data:action.payload}
            case "todo/input":
                return {...curState,description:action.payload} 
            case "todo/del":
                return {...curState,data:action.payload}
            case "todo/check":
                return {...curState,data:action.payload}
            case "todo/status":
                return {...curState,status:action.payload}
            case "todo/reset": 
                return {...curState,description:""}

            
            default:
                throw new Error("not found");
        }
    }
    const [state,dispatch]=useReducer(reducer,initialState);
    const {data,description,currentId,status}=state

    
function handleDel(id){
  const newData=data.filter((data)=> data.id!==id? data :"") 
    dispatch ({type:"todo/del",payload:newData})
}

function handleChecked(id){
  const checkedData=data.map((data)=> id===data.id?{...data,checked:!data.checked}:data); 
   dispatch ({type:"todo/check",payload:checkedData})
}

let currentData;

    if(status==="All"){
        currentData=data;
    }
    if(status==="Active"){ 
        currentData=data.filter((data)=>!data.checked);
        console.log(currentData);
        
    }
    if(status==="Completed"){ 
        currentData=data.filter((data)=>data.checked);
        console.log(currentData);
    }
 

  return <TodoContext.Provider value={{dispatch,currentData,description,handleDel,handleChecked}}>
    {children}
  </TodoContext.Provider>;
}



function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined)
    throw new Error("postContext was used outside of postPorvider");
  return context;
}

export { TodoProviders, useTodo };
