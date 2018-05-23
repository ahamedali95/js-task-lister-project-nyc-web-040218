class List {
  // your code here
}

const taskLists = document.getElementById(taskListname).lastChild.children;
for(let i = 0; i < taskLists.length; i++) {
  if(taskLists[i].innerText.split(" ")[1] === taskDescription) {
    alert("Task descriptions must be unique");
  } else {
    //find the list div and attach the div wit
  }
}
