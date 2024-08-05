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

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".modal-body-2");

var todays_date = new Date();
console.log(todays_date.toDateString());

// populating the cards container
function htmlTaskContent({ id, url, title, desc }) {
  // console.log(toString(id));
  if (!url) {
    url =
      "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
  }

  // add name=${id} onclick="deleteTask.apply(this, arguments)" to the icon inorder to get the effect on icon too.

  return `
    <div class="col-md-6 col-lg-4 mt-3 outer-card" id=${id} key=${id}>
        <div class="card shadow-sm rounded task_card">
            <div class="card-header d-flex justify-content-end gap-2 task_card_header">
                <button type="button" class="btn btn-outline-primary" name=${id}>
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
                <h4 class="card-title task_card_title">${title}</h4>
                <span class="card-text task_card_desc trim-3-lines text-muted">${desc.slice(
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

// opening another modal for breif information about the task
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

// converting json file into a string
const updateLocalStorage = () => {
  console.log("updating localStorage");
  localStorage.setItem("task", JSON.stringify({ tasks: state.taskList }));
};

// loading initial data

// converting string into a json file
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);
  console.log("got info from localStorage");
  if (localStorageCopy) {
    state.taskList = localStorageCopy.tasks;
  }
  console.log("updating state task list");
  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};

const handleSubmit = (e) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    desc: document.getElementById("task_description").value,
  };
  // console.log(input.desc);
  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({ ...input, id })
  );
  console.log("done populating card section");

  console.log("updating state task list with new values.");
  state.taskList.push({ ...input, id });
  console.log("updating localStorage with new values.");
  updateLocalStorage();
};

// open task

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
  console.log("open task method is triggered");

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

// deleting a task

const deleteTask = (e) => {
  console.log("delete task method is triggered");

  // Ensure the event object is valid
  if (!e) {
    e = window.event; // Use `window.event` for older browsers or if `e` is not passed
  }
  // Find the task based on the clicked element's name
  const targetId = e.target.getAttribute("name");

  const type = e.target.tagName;

  // deleting the task from the task list array
  const removeTask = state.taskList.filter(({ id }) => id !== targetId);
  console.log(removeTask);
  updateLocalStorage();

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
