{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent,
            });
        render();
    };

    const toogleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const deleteTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }  

    const addDeleteButtonEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, taskIndex)=> {
            removeButton.addEventListener("click", () => {
                deleteTask(taskIndex);
            })
        })
    }

    const addToogleDoneButtonEvents = () => {
        const toogleDoneButtons = document.querySelectorAll(".js-toogleDoneButton");

        toogleDoneButtons.forEach((toogleDoneButton, taskIndex)=> {
            toogleDoneButton.addEventListener("click", () => {
                toogleTaskDone(taskIndex);
            })
        })
    }

    const render = () => {
        let taskListHtmlElement = "";

        for (const task of tasks) {
            taskListHtmlElement += 
            `
                <li class="list__item">
                    <button class="list__button list__button--done js-toogleDoneButton material-icons">
                        ${task.done ? "done" : ""}
                    </button>
                    <p class="list__task ${task.done ? "list__task--done" : ""}">
                        ${task.content}
                    </p>
                    <button class="list__button list__button--remove js-removeButton material-icons">delete</button>
                </li>
            `;
        }
        document.querySelector(".js-list").innerHTML = taskListHtmlElement;

        addDeleteButtonEvents();
        addToogleDoneButtonEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
            
        const newTask = document.querySelector(".js-newTask")
        const newTaskContent = newTask.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTask.value = "";
        }
            
        newTask.focus();
    }

    const init = () => {

        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit)
    };

    init();
}