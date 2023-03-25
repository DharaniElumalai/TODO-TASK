

const form=document.getElementById("form"); //input get
const input_value=document.getElementById("task_input");
const element=document.getElementById("todolist");
//const duplicate=false
let input=[]; //todos
editTodoid=-1;
// main fn
form.addEventListener('submit',function(event){
    event.preventDefault();
    
    saveinput();
    paste();
})

// save the value in the variable
function saveinput()
{
    const input_value=task_input.value //todovalue

    const isDuplicate=input.some((todo) =>todo.value.toUpperCase()===input_value.toUpperCase()); //have to work
   
    if(input_value=="")
    {
        alert("your input field is empty"); 
        return false;
    }
    else if(isDuplicate)
    {
        alert("Input value already exists");
        document.getElementById("task_input").value='';
    }
    else{
        if(editTodoid>=0)
            {
            input=input.map((todo,index)=>{   //calls the callback fn todo and compare the todo vale and my input value
                return{
                    value:index=== editTodoid? input_value: todo.value,// checks edit todo id== index value
                       }  //if yes the new input value is changed ortherwise the old todo value is present
            });
            console.log(input)
            editTodoid= -1;
        }
        else
        {
        input.push({
            value:input_value,
            
        }); 
        console.log(input)
        document.getElementById("task_input").value='';
         }  
     }
}

//paste the value in the list

function paste(){
    todolist.innerHTML="";
    input.forEach((todo,index)=>{
        element.innerHTML +=`
        <div class="item" id="${index}">
    
    <p > ${todo.value}</p>
    <button id="edit_btn" data-action="delete">Delete</button>
    <button id="delete_btn" data-action="edit"> Edit</button>
  </div>`
    });
}

//creates target

element.addEventListener('click',(event)=>{
    const target= event.target;    //target the particular tag <p>
    const parent =target.parentNode;    //target the particular parent tag in which the <p> is placed i.e) div 


    if(parent.className !== 'item')return;   //to eliminate the other tags from delete we use the common class called item


    const todo =parent;
    const todoid = Number(todo.id);

    const action = target.dataset.action;
    //const action = target.dataset.action="delete";

    action === "edit" && editTodo(todoid);
    action === "delete" && deleteTodo(todoid); 
    
    console.log(todoid, action);
});


//edit the todo
function editTodo(todoid){
    input_value.value=input[todoid].value;

    editTodoid=todoid;
}


//delete the todo
function deleteTodo(todoid){
  
    if (!confirm('Are you sure Do you want to Delete?...'))
     { return false }
  else
    {
        input=input.filter((todo,index)=>index!=todoid);
        paste();        
    }
    
}