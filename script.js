
    const tasks = [];

    const addNewTask = (newTask) => {

        if (newTask === "") {
            return;
        }

        tasks.push(
            {
                content: newTask,
                done: false,
            });
    };

    const init = () => {

        const formElement = document.querySelector(".js-form");
        
        formElement.addEventListener("submit", (event)=> {
            event.preventDefault();

            const newTask = document.querySelector(".js-newTask").value.trim();

            addNewTask(newTask);

            const render = () => {
                let htmlElement = `
                <li class="list__item">
                    <button class="list__button toogleDoneButton"></button>
                    <p>${newTask}</p>
                    <button class="list__button removeButton material-icons">delete</button>
                </li>
                `;
        
                const listElement = document.querySelector(".js-list");
                listElement.innerHTML += htmlElement;
            };
        
            render();
        })
    };

    init();

