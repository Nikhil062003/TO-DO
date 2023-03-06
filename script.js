'use strict'
let text=document.getElementById("text");
let tasks=[];
let taskid=1;
let j=1;
text.addEventListener("keydown",function(event){
if(event.key=='Enter')
{

 if(text.value!="")
   addTask();
 

}

});



function addTask(){
  let obj={
 title:text.value,
status:"pending",
id:taskid

};
taskid++;

tasks.push(obj);
localStorage.setItem("tasks",JSON.stringify(tasks));
addtodom(obj);

}

function addtodom(tasks)
{
let list=document.getElementById("list");
let div=document.createElement("div");
let span =document.createElement("span");
let checkBox=document.createElement("input");
checkBox.setAttribute("type","checkbox");
span.innerHTML=j+(". "+tasks.title).toUpperCase();

div.appendChild(span);
j++;

checkBox.addEventListener('click', function fun(event){
if(checkBox.checked==true){
 span.style.textDecoration="line-through";
 updateStatus(tasks.id,'Completed')
}
else{ 
  span.style.textDecoration="none";
   updateStatus(tasks.id,'pending')

}

});


let img=document.createElement("img");
img.setAttribute("src","https://cdn-icons-png.flaticon.com/512/1345/1345874.png")
img.setAttribute("height","20px");
img.setAttribute("width","20px");
img.addEventListener("click",function fi(event){
deleteTask(tasks.id);
list.removeChild(event.target.parentNode);

});

let img1=document.createElement("img");
img1.setAttribute("src","https://cdn-icons-png.flaticon.com/512/45/45406.png");
img1.setAttribute("width","20px");
img1.setAttribute("height","20px");
img1.addEventListener("click",function (){
  update(tasks.id);
});

div.appendChild(checkBox);
div.appendChild(img);
div.appendChild(img1);
list.appendChild(div);




}

loadTask();
function updateStatus(id,status)
{
  tasks.forEach(function(task){
    if(task.id==id)
    task.status=status;
  });
   localStorage.setItem("tasks",JSON.stringify(tasks));


}
function deleteTask(id)
{
  tasks=tasks.filter(function(task){
      return task.id!=id;
  });
    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function update(id){
  let val= prompt("Enter new value");
   tasks=tasks.map(function(task){
       if(task.id==id){

         task.title=val;
        
        
       }
       return task;
   });

   localStorage.setItem("tasks",JSON.stringify(tasks));

}




function loadTask()
{ let max=0;
  
  tasks=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
  tasks.forEach(function(task){
  if(max<task.id){max=task.id;}
    addtodom(task);
  })

  taskid=max+1;
  


}
