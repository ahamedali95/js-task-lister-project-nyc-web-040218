document.addEventListener('DOMContentLoaded', () => {
  const appContent = document.getElementById("app-content");
  const taskListForm = document.getElementById("create-list-form")
  const taskListInputField = document.getElementById("new-list-title");
  //initially set to null because we want to reassign the value later. The value can only be set after the taskForm has been
  //created. When does this created? Only after we create a new taskListForm. Line 40 is where we reassign the variable's
  //value;
  let taskForm = null;
  // let tasks = null;

  taskListForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (appContent.hasChildNodes()) {
      addOption();
    } else {
      appContent.innerHTML =

      `<form id="create-task-form">
      <label>Select List:</label>
      <select id='parent-list' name="list-name"></select>
      <label for="new-task-description">Task Description: </label>
      <input id="new-task-description" type="text" placeholder="description" name="description"></input>
      <label for="new-task-priority">Priority level:</label>
      <input id="new-task-priority" type="text" placeholder="priority" name="priority"></input>
      <input type="submit" value="Create New Task"></input>
      </form>
      `
      addOption();
      taskForm = document.getElementById("create-task-form");
      //Adding event listener for task form
      taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(taskForm);

        const taskListname = formData.get("list-name");
        const taskDescription = formData.get("description");
        let priority = null;
        formData.get("priority") === "" ? priority = "low" : priority = formData.get("priority");

        //Iterate through all the divs the div with id: lists
        const tasksDivs = document.querySelectorAll("#lists div")
        for(let i = 0; i < tasksDivs.length; i++) {
          //Check to see whether the heading matches the taskListname that is sent from the form
          if(tasksDivs[i].getElementsByTagName("h2")[0].innerText.split(" ")[0] === taskListname) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `Task: ${taskDescription} <button data-list-title="${tasksDivs[i].getElementsByTagName("h2")[0].innerText.split(" ")[0]}" data-task-name="${taskDescription}" class="delete-task">X</button><br> Priority: ${priority}`;
            tasksDivs[i].getElementsByTagName("ul")[0].appendChild(listItem);
          }
        }
      });
    }

    //div with id="lists"
    //    - div
    //      -- h2 & ul
    //Should not be creating div with id="lists" everytime we create new taskList .
    //New taskList will be store inside the div and attached to taskList.
    if(document.getElementById("lists")) {
      const lists = document.getElementById("lists")
      const tasksList = document.createElement('div');
      tasksList.setAttribute("id", `${taskListInputField.value}`);
      const html = `<h2>${taskListInputField.value} <button data-title="${taskListInputField.value}" class="delete-list" onclick="deleteTaskList(this)">X</button> </h2><ul></ul>`;
      tasksList.innerHTML = html;
      lists.appendChild(tasksList);

      taskListInputField.value = "";
    } else {
      const lists = document.createElement("div");
      lists.setAttribute("id", "lists");
      const tasksList = document.createElement('div');
      tasksList.setAttribute("id", `${taskListInputField.value}`);
      const html = `<h2>${taskListInputField.value} <button data-title="${taskListInputField.value}" class="delete-list" onclick="deleteTaskList(this)">X</button> </h2><ul></ul>`;
      tasksList.innerHTML = html;
      lists.appendChild(tasksList);
      appContent.appendChild(lists);

      taskListInputField.value = "";
    }

  });

  function addOption() {
    const option = document.createElement("option");
    const selectItems = document.getElementById("parent-list");
    option.value =  taskListInputField.value;
    option.innerText = taskListInputField.value;
    selectItems.add(option);
  }

});

function deleteTaskList(e) {
  document.getElementById(e.getAttribute("data-title")).remove();
  //check to if there are any tasklists, if zero, then delete the taskForm,
  //if not zero, then remove the option from the taskFrom.
}
