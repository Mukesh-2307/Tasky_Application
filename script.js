// let state = {
//     taskList: [
//         {
//             imageURL:"",
//             taskTitle:"",
//             taskDesc:""
//         }
//     ]
// }

const state = {
  taskList: [],
};

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".modal-body");

var todays_date = new Date();
console.log(todays_date.toDateString());
// console.log(taskContents);
// console.log(taskModal);

// populating the cards container
function htmlTaskContent({ id, url, title, desc }) {
  return `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm rounded task_card">
            <div class-"card-header d-flex justify-content-end task_card_header">
                <button type="button" class="btn btn-outline-primary" name=${id}>
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button type="button" class="btn btn-outline-danger" name=${id}>
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
            <div class="card-body">
                ${
                  url &&
                  `<img width="100%" src=${url} alt="card image" class="card-img-top md-3 rounded-lg"/>`
                }
                <h4 class="card-title task_card_title">${title}</h4>
                <span class="card-text task_card_desc trim-3-lines text-muted">${desc}</span>
                <div class="tags text-white d-flex flex-warp">
                    <span class="badge bg-primary m-1">created on ${todays_date.toDateString()}</span>
                </div>
            </div>
            <div class="card-footer ">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask">
                    Open Task
                </button>
            </div>
        </div>
    </div>
`;
}

// opening another modal for breif information about the task
const htmlModalContent = ({ id, url, title, desc }) => {
  return `
        <div id=${id} >
        ${
          url &&
          `<img width="100%" src=${url} alt="card image" class="img-fluid palace_holder_image mb-3"/>`
        }
        <strong><h1 class="card-title my-3">${title}</h1></strong>
        <span class="card-text text-sm text-muted">${desc}</span>
        </div>
    `;
};

const updateLocalStorage = () => {
  localStorage.setItem("tasky", JSON.stringify({ tasks: state.taskList }));
};

// loading initial data
