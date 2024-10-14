let tasks = [];

const saveTasks = ()=> {
    localStorage.setItem('tasks',JSON.stringify(tasks));
};
const loadTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTasksList();
    }
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false }); 
        taskInput.value = ""; 
        updateTasksList();
        saveTasks();
    }
};

const toggletaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed; 
    updateTasksList();
    saveTasks();
};


const updateTasksList = (filter = "all") => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }else if (filter === "incomplete") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div>
                    <i class="fa-regular fa-trash-can" onClick="deleteTask(${index})"></i>
                </div>
            </div>
        `;
        const checkbox = listItem.querySelector(".checkbox");
        checkbox.addEventListener("change", () => toggletaskComplete(index));

        taskList.append(listItem); 
    });
};

const deleteTask = (index) => {
    tasks.splice(index, 1); 
    updateTasksList();
    saveTasks();
};

const filterTasks = () => {
    const filterOption = document.getElementById('filter-todo').value;
    updateTasksList(filterOption); 
};
document.getElementById('filter-todo').addEventListener('change', filterTasks);


document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
window.addEventListener('load',loadTasks);
