    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push(
            {
                content: newTaskContent,
            });
        render();
    };

    const render = () => {

        let htmlElement = "";

        for (const task of tasks) {
            htmlElement += `
                <li class="list__item">
                    <button class="list__button toogleDoneButton"></button>
                    <p>${task.content}</p>
                    <button class="list__button removeButton material-icons">delete</button>
                </li>
            `;
        }
        document.querySelector(".js-list").innerHTML = htmlElement;
    };

    const init = () => {

        render();

        const formElement = document.querySelector(".js-form");
        
        formElement.addEventListener("submit", (event)=> {
            event.preventDefault();

            const newTask = document.querySelector(".js-newTask")
            const newTaskContent = newTask.value.trim();

            if (newTaskContent !== "") {
                addNewTask(newTaskContent);
                newTask.value = "";
            }
            newTask.focus();
        })
    };

    init();