{
    let tasks = [];
    let hideTaskButtons = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {content : newTaskContent},
        ];
        render();
    };

    const toogleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {...tasks[taskIndex], done: !tasks[taskIndex].done},
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const deleteTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const markAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toogleHideDoneTasks = () => {
        hideTaskButtons = !hideTaskButtons;
        render();
    };

    const addDeleteButtonEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, taskIndex)=> {
            removeButton.addEventListener("click", () => {
                deleteTask(taskIndex);
            });
        });
    };

    const addToogleDoneButtonEvents = () => {
        const toogleDoneButtons = document.querySelectorAll(".js-toogleDoneButton");

        toogleDoneButtons.forEach((toogleDoneButton, taskIndex)=> {
            toogleDoneButton.addEventListener("click", () => {
                toogleTaskDone(taskIndex);
            });
        });
    };

    const bindButtonsEvent = () => {
        const completeAllButton = document.querySelector(".js-completeAllButton");

        if (completeAllButton) {
            completeAllButton.addEventListener("click", markAllTaskDone);
        };
        
        const toogleTaskStatusButton = document.querySelector(".js-toogleTaskStatusButton");

        if (toogleTaskStatusButton) {
            toogleTaskStatusButton.addEventListener("click", toogleHideDoneTasks);
        };
    };

    const renderTasks = () => {

         const taskElement = ({done, content}) => `
            <li class="list__item ${done && hideTaskButtons ? "list__item--hidden" : ""}">
                <button class="list__button list__button--done js-toogleDoneButton material-icons">
                    ${done ? "done" : ""}
                </button>
                <p class="list__task ${done ? "list__task--done" : ""}">
                    ${content}
                </p>
                <button class="list__button list__button--remove js-removeButton material-icons">delete</button>
            </li>
        `;

        document.querySelector(".js-list").innerHTML = tasks.map(taskElement).join("");
    };

    const renderButtons = () => {

        const buttonsElement = document.querySelector(".js-section__buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        };

        buttonsElement.innerHTML = `
            <button class="button js-toogleTaskStatusButton">${hideTaskButtons ? "Pokaż" : "Ukryj"} ukończone</button>
            <button ${tasks.every(({done}) => done) ? "disabled" : ""} class="button js-completeAllButton">Ukończ wszystkie</button>
        `;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        addDeleteButtonEvents();
        addToogleDoneButtonEvents();
        bindButtonsEvent();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
            
        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = newTask.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTask.value = "";
        };
            
        newTask.focus();
    };

    const init = () => {

        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);
        renderTasks();
        renderButtons();
    };

    init();
};