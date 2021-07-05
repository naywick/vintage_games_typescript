import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(
  <MyRootComponent myProperty={3}>thing</MyRootComponent>,
  document.body
);

type TaskType = { label: string; checked: boolean, id: number };

function MyRootComponent(props: { children: string; myProperty: number }) {
  const [ tasks, setTasks ] = React.useState<TaskType[]>([])
  const [ myInputValue, setMyInputValue ] = React.useState("");
  //const [ checkboxValue, setCheckboxValue ] = React.useState()

  function handleToggleTask(task: TaskType, checked: boolean) {
    const newList = [ ...tasks ];
    const newTask = { ...tasks[tasks.indexOf(task)], checked: checked };
    newList[tasks.indexOf(task)] = newTask;
    setTasks(newList);
  };

  function addTask() {
    let newTasks = [...tasks, {label: myInputValue, checked: false, id: Math.random()} ]
    setTasks(newTasks)
    setMyInputValue("");
  };

  function deleteCheckedTasks() {
    let remainingTasks = tasks.filter(task => {
      return !task.checked 
    })
    setTasks(remainingTasks)
  };

  function handleEnterKey(e: any) {
    if (e.key === 'Enter') {
      addTask()
    }
  };

return <> 
  <h1>Blah { props.children } { props.myProperty }</h1>
  <div>
    { tasks.map((t, idx) => <Task task={t} task_index={idx} key={t.id} onToggleChecked={handleToggleTask} />) }
  </div>
  {/*<DeleteCompletedTasksButton tasks={tasks}></DeleteCompletedTasksButton>*/}

  <input type={'text'} value={myInputValue} onChange={(e) => setMyInputValue(e.target.value) } onKeyDown={handleEnterKey}></input>
  <button onClick={addTask}>Submit</button>
  <button onClick={deleteCheckedTasks}>Delete Completed</button>
  </>
};

type OnToggleCheckedHandler = (task: TaskType, checked: boolean) => void;

function Task(props: { task: TaskType, task_index: number; onToggleChecked: OnToggleCheckedHandler }) {
  return <div>
  <input type={'checkbox'} onChange={ (e) => props.onToggleChecked(props.task, e.target.checked) }></input>
  { props.task.checked &&
      <span style={{textDecoration: "line-through"}}>{props.task.label}</span>
  }
  { !props.task.checked &&
      <span>{props.task.label}</span>
  }
  </div>
};

/*function DeleteCompletedTasksButton(props: { tasks: TaskType[] }) {

};*/

