import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render(
  <MyRootComponent myProperty={3}>thing</MyRootComponent>,
  document.body
);

type TaskType = { label: string; checked: boolean };

function MyRootComponent(props: { children: string; myProperty: number }) {
  const [ counter1, setCounter1 ] = React.useState(0);
  const [ tasks, setTasks ] = React.useState<TaskType[]>([])
  const [ myInputValue, setMyInputValue ] = React.useState("");
  //const [ checkboxValue, setCheckboxValue ] = React.useState()

  function handleToggleTask(task: TaskType, checked: boolean) {
    console.debug(`Task was toggled: ${JSON.stringify(task)}, ${checked}`);
    const newTask = { ...task, checked: checked };
    const newList = tasks.filter(t => t !== task);
    newList.push(newTask);
    setTasks(newList);
  }

  const taskComponents = [];
  for (let task of tasks){
    taskComponents.push(<Task task={task} onToggleChecked={handleToggleTask} />);
  }

  function addTask() {
    let newTasks = [...tasks, {label: myInputValue, checked: false} ]
    setTasks(newTasks)
    setMyInputValue("");
  };

return <> 
  <h1>Blah { props.children } { props.myProperty }</h1>
  <ResetButton counter={counter1} setCounter={setCounter1}></ResetButton>
  <ButtonComponent counter={counter1} setCounter={setCounter1}></ButtonComponent>
  {taskComponents}
  {/*<DeleteCompletedTasksButton tasks={tasks}></DeleteCompletedTasksButton>*/}

  <input type={'text'} value={myInputValue} onChange={(e) => setMyInputValue(e.target.value) }></input>
  <button onClick={addTask}>Submit</button>
  </>
};

type OnToggleCheckedHandler = (task: TaskType, checked: boolean) => void;

function Task(props: { task: TaskType; onToggleChecked: OnToggleCheckedHandler }) {
  return <>
  <input type={'checkbox'} onChange={ (e) => props.onToggleChecked(props.task, e.target.checked) }></input>
  { props.task.checked
    ? <p>{props.task.label}</p>
    : <p><b>{props.task.label}</b></p>
  }
  </>
};

function ButtonComponent(props: { counter: number, setCounter: (n: number) => void }) {
  
  function CountClicks() {
    props.setCounter(props.counter+1);
  };

  return <>
  <button onClick={CountClicks}>Click me!</button>
  <p>{JSON.stringify(props.counter)}</p>
  </>
};

function ResetButton(props: { counter: number, setCounter: (n: number) => void }) {
  
  function CountClicks() {
    props.setCounter(0);
  };

  return <>
  <button onClick={CountClicks}>Reset</button>
  </>
};

function DeleteCompletedTasksButton(props: { tasks: TaskType[] }) {

};

