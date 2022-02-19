    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent,
            });
        render();
    };

    const addDeleteEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index)=> {
            removeButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            })
        })
    }

    const addToogleDoneEvents = () => {
        const toogleDoneButtons = document.querySelectorAll(".js-toogleDoneButton");

        toogleDoneButtons.forEach((toogleDoneButton, index)=> {
            toogleDoneButton.addEventListener("click", () => {
                tasks[index].done = !tasks[index].done;
                render();
            })
        })
    }

    const render = () => {
        let htmlElement = "";

        for (const task of tasks) {
            htmlElement += `
                <li class="list__item">
                    <button class="list__button list__button--done js-toogleDoneButton material-icons">${task.done ? "done" : ""}</button>
                    <p class="list__task">${task.content}</p>
                    <button class="list__button list__button--remove js-removeButton material-icons">delete</button>
                </li>
            `;
        }
        document.querySelector(".js-list").innerHTML = htmlElement;

        addDeleteEvents();
        addToogleDoneEvents();
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