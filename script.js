// example :
// let state = {
//     taskList: [
//         {
//             imageURL:"",
//             taskTitle:"",
//             taskDesc:""
//         }
//     ]
// }

// similar to a backup storage but not exactly backup storage
const state = {
  taskList: [],
};

// accessing the task contents and modal body elements
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".modal-body-2");

// setting todays Date
var todays_date = new Date();

// method that populate the cards container
function htmlTaskContent({ id, url, title, desc }) {
  if (!url) {
    url =
      "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
  }

  // add name=${id} onclick="deleteTask.apply(this, arguments)" to the icon inorder to get the effect on icon too. or we can handle it later while calling the method by using the parentNode and childNodes concept

  return `
    <div class="col-md-6 col-lg-4 mt-3 outer-card" id=${id} key=${id}>
        <div class="card shadow-sm rounded task_card">
            <div class="card-header d-flex justify-content-end gap-2 task_card_header">
                <button type="button" class="btn btn-outline-primary" name=${id} onclick="editTask.apply(this, arguments)">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask.apply(this, arguments)">
                    <i class="fa-regular fa-trash-can" ></i>
                </button>
            </div>
            <div class="card-body">
                ${
                  url &&
                  `<img width="100%" src=${url} alt="card image" class="card-img-top md-3 rounded-lg img-fluid img-thumbnail"/>`
                }
                <h4 class="card-title task_card_title p-1" id="task-card-title">${title}</h4>
                <span class="card-text task_card_desc trim-3-lines text-muted" id="task-card-desc">${desc.slice(
                  0,
                  25
                )} ...</span>
                <div class="tags text-white d-flex flex-warp">
                    <span class="badge bg-primary">created on ${todays_date.toDateString()}</span>
                </div>
            </div>
            <div class="card-footer ">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" onclick="openTask()" id = ${id}>
                    Open Task
                </button>
            </div>
        </div>
    </div>
`;
}

// method for opening another modal for larger view of the task
const htmlModalContent = ({ id, url, title, desc }) => {
  id = new Date(parseInt(id));
  if (!url) {
    url =
      "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
  }
  return `
        <div id=${id} >
        ${
          url &&
          `<img width="100%" src=${url} alt="card image" class="img-fluid palace_holder_image mb-3"/>`
        }
        <strong><h1 class="card-title my-3 p-3">${title}</h1></strong>
        <span class="card-text text-sm text-muted my-3 p-3">${desc}</span>
        </div>
    `;
};

// method to update local storage
// converting json file into a string
const updateLocalStorage = () => {
  // updating localStorage
  localStorage.setItem("task", JSON.stringify({ tasks: state.taskList }));
  console.log("localStorage updated.");
};

// mehtod to loading initial data
// converting string into a json file
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);
  console.log("retrived info from localStorage.");
  // updating state task list
  if (localStorageCopy) {
    state.taskList = localStorageCopy.tasks;
  }
  console.log("state task list updated.");
  // populating the cards container
  state.taskList.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
  });
  console.log("done populating the cards container");
};

// method for handling the submit button
const handleSubmit = (e) => {
  const id = `${Date.now()}`;

  // retrieving the value from the input fields of add task modal
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    desc: document.getElementById("task_description").value,
  };

  // adding the new task to the task container
  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({ ...input, id })
  );

  console.log("new task added successfully");

  // updating state task list with new task
  state.taskList.push({ ...input, id });
  console.log("new task has been added to the state task list");
  // updating localStorage with new task
  updateLocalStorage();
  console.log("new task has been added to the local storage");
};

// method for opening task

// my code
// const openTask = (e) => {
//   console.log("open task method is triggered");
//   if (!e) {
//     e = window.event;
//   }
//   console.log(e);
//   const getTask = state.taskList.find(({ id }) => id === e.target.id);
//   taskModal.innerHTML = htmlModalContent(getTask);
// };

// chatgpt code
const openTask = (e) => {
  // Ensure the event object is valid
  if (!e) {
    e = window.event; // Use `window.event` for older browsers or if `e` is not passed
  }

  // Find the task based on the clicked element's ID
  const getTask = state.taskList.find(({ id }) => id === e.target.id);

  // Make sure the task was found before trying to display it
  if (getTask) {
    // Update the modal content
    taskModal.innerHTML = htmlModalContent(getTask);
    // Display the modal (assuming you want to show it here)
    taskModal.style.display = "block"; // or another method to show the modal
  } else {
    console.log("Task not found");
  }
};

// method for deleting a task
const deleteTask = (e) => {
  // Ensure the event object is valid
  if (!e) {
    e = window.event; // Use `window.event` for older browsers or if `e` is not passed
  }
  // Find the task based on the clicked element's name and its tag
  const targetId = e.target.getAttribute("name");
  const type = e.target.tagName;

  // deleting the task from the task list array
  const removeTask = state.taskList.filter(({ id }) => id !== targetId);
  state.taskList.pop(removeTask);
  updateLocalStorage();

  // the below code allow us to trigger the delete task method once while we can click on both the button and the icon
  if (type === "BUTTON") {
    console.log(e.target.parentNode.parentNode.parentNode.parentNode);
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  } else {
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode.parentNode
    );
  }
};

// editing task method
const editTask = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.id;
  const type = e.target.tagName;

  let parentNode;
  let taskTitle;
  let taskDesc;
  let taskDate;
  let submitButton;

  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  // accessing the body of a particular card and enable edit functionality
  taskBody = parentNode.childNodes[3].childNodes;
  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDesc = parentNode.childNodes[3].childNodes[5];
  taskDate = parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton = parentNode.childNodes[5].childNodes[1];

  // setting attributes to allow editing the content
  taskTitle.setAttribute("contenteditable", "true");
  taskDesc.setAttribute("contenteditable", "true");
  taskDate.innerHTML = `updated on ${todays_date.toDateString()}`;

  // setting another method to button
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  // removing the attributes to restrict toggle and target functionality.
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
};

// method for saving the newly made editTask
const saveEdit = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.id;
  const type = e.target.tagName;

  let taskTitle;
  let taskDesc;
  let submitButton;

  // accessing the body of a particular card
  const parentNode = e.target.parentNode.parentNode;

  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDesc = parentNode.childNodes[3].childNodes[5];
  submitButton = parentNode.childNodes[5].childNodes[1];

  // retrieving the new data from the elements
  const updatedData = {
    title: taskTitle.innerHTML,
    desc: taskDesc.innerHTML,
  };

  // backup of the original state task list
  let stateCopy = state.taskList;

  // inserting the new values to the elements
  stateCopy = stateCopy.map((task) =>
    task.id === targetId
      ? {
          id: task.id,
          title: updatedData.title,
          desc: updatedData.desc,
          url: task.url,
        }
      : task
  );

  // updating the state task list
  state.taskList = stateCopy;
  // updating the local storage
  updateLocalStorage();

  // setting older method back to button after finishing editing
  submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  // Adding the attributes to allow toggle and target functionality.
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task";
};

// method to search a task
const searchTask = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.id;

  //
  while (taskContents.firstChild) {
    taskContents.removeChild(taskContents.firstChild);
  }

  // finding the correct task
  const resultData = state.taskList.filter(({ title }) =>
    title.toLowerCase().includes(e.target.value.toLowerCase())
  );

  // displaying the related task only
  resultData.map((cardData) => {
    taskContents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent({ ...cardData, targetId })
    );
  });
};
