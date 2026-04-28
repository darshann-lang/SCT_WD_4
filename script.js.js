const input = document.getElementById('taskInput');
const dateInput = document.getElementById('taskDate');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('listContainer');
const clock = document.getElementById('live-clock');

// 1. Simple Live Clock
function updateClock() {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " | " + now.toDateString();
}
setInterval(updateClock, 1000);
updateClock();

// 2. Add Task Function
addBtn.onclick = () => {
    if (input.value === "") return alert("Write something first!");

    const li = document.createElement('li');
    li.className = 'task-card';
    
    const taskContent = `
        <div class="content">
            <span class="task-text">${input.value}</span>
            <small class="due-time">${dateInput.value ? '⏰ ' + dateInput.value.replace('T', ' ') : 'No deadline'}</small>
        </div>
        <div class="btn-group">
            <button class="complete-btn">✔️</button>
            <button class="edit-btn">✏️</button>
            <button class="del-btn">🗑️</button>
        </div>
    `;
    
    li.innerHTML = taskContent;
    list.appendChild(li);

    // Clear Inputs
    input.value = "";
    dateInput.value = "";

    // 3. Button Actions (The Human Way - using event listeners on elements)
    const delBtn = li.querySelector('.del-btn');
    const compBtn = li.querySelector('.complete-btn');
    const editBtn = li.querySelector('.edit-btn');
    const textSpan = li.querySelector('.task-text');

    delBtn.onclick = () => li.remove();
    
    compBtn.onclick = () => {
        textSpan.classList.toggle('done');
    };

    editBtn.onclick = () => {
        const newVal = prompt("Edit your task:", textSpan.innerText);
        if (newVal) textSpan.innerText = newVal;
    };
};

// 4. Clear All Logic
document.getElementById('clearAll').onclick = () => {
    if (confirm("Delete all tasks?")) list.innerHTML = "";
};