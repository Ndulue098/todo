import { useTodo } from "../context/TodoContext";

export default function Footer() {
  const { currentData,dispatch} = useTodo();
  const datalength = currentData.filter((data)=>!data.checked).length;
 
    function handleStat(stat){
        dispatch({type:"todo/status",payload:stat})
    }

  return (
    <div className="footer">
      <p className="left">{datalength} item left</p>

      <div className="status">
        <p onClick={()=>handleStat("All")}>All</p>
        <p onClick={()=>handleStat("Active")}>Active</p>
        <p onClick={()=>handleStat("Completed")}>Completed</p>
      </div>

      <div className="clear">clear Completed</div>
    </div>
  );
}
