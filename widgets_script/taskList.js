const modal = document.querySelector('.confirm-modal');
const columnsContainer = document.querySelector('.columns');
const columns = columnsContainer.querySelectorAll('.column');

let currentTask = null;

const handleDragover = (event) => {
	event.preventDefault();

	const draggedTask = document.querySelector('.dragging');
	const target = event.target.closest('.task, .tasks');

    if (!target || target === draggedTask) return;
    if (target.classList.contains('tasks')) {
        const lastTask = target.lastElementChild;
        if (!lastTask) {
			target.appendChild(draggedTask);
		} else {
			const { bottom } = lastTask.getBoundingClientRect();
			event.clientY > bottom && target.appendChild(draggedTask);
		}
    } else {
        const { top, height } = target.getBoundingClientRect();
        const distance = top + height / 2;

        if (event.clientY < distance) {
            target.before(draggedTask);
        } else {
            target.after(draggedTask);
        }
    }
};

const handleDrop = (event) => {
	event.preventDefault();
};

const handleDragEnd = (event) => {
	event.target.classList.remove('dragging');
};

const handleDragStart = (event) => {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('text/plain', '');
	requestAnimationFrame(() => event.target.classList.add('dragging'));
};

const handleDelete = (event) => {
	currentTask = event.target.closest('.task');

	modal.querySelector('.preview').innerText = currentTask.innerText.substring(
		0,
		100
	);

	modal.showModal();
};

const handEdit = (event) => {
	const task = event.target.closest('.task');
	const input = createTaskInput(task.innerText);
	task.replaceWith(input);
	input.focus();

	const selection = window.getSelection();
	selection.selectAllChildren(input);
	selection.collapseToEnd();
};

const handleBlur = (event) => {
	const input = event.target;
	const content = input.innerText.trim() || 'Untitled';
	const task = createTask(content.replace(/\n/g, '<br>'));
	input.replaceWith(task);
};

const handleAdd = (event) => {
	const tasksEl = event.target.closest('.column').lastElementChild;
	const input = createTaskInput();
	tasksEl.appendChild(input);
	input.focus();
};

const updateTaskCount = (column) => {
	const tasks = column.querySelector('.tasks').children;
	const taskCount = tasks.length;
	column.querySelector('.column-title h3').dataset.tasks = taskCount;
};

const observeTaskChanges = () => {
	for (const column of columns) {
		const observer = new MutationObserver(() => updateTaskCount(column));
		observer.observe(column.querySelector('.tasks'), { childList: true });
	}
};

observeTaskChanges();

const createTask = (content) => {
	const task = document.createElement('div');
	task.className = 'task';
	task.draggable = true;
	task.innerHTML = `
    <div>${content}</div>
    <menu>
    <button data-edit><i class="bi bi-pencil-square"></i></button>
    <button data-delete><i class="bi bi-trash"></i></button>
    </menu>`;
	task.addEventListener('dragstart', handleDragStart);
	task.addEventListener('dragend', handleDragEnd);
	return task;
};

const createTaskInput = (text = '') => {
	const input = document.createElement('div');
	input.className = 'task-input';
	input.dataset.placeholder = 'Task Name';
	input.contentEditable = true;
	input.innerText = text;
	input.addEventListener('blur', handleBlur);
	return input;
};

tasksElements = columnsContainer.querySelectorAll('.tasks');
for (const tasksEl of tasksElements) {
	tasksEl.addEventListener('dragover', handleDragover);
	tasksEl.addEventListener('drop', handleDrop);
}

columnsContainer.addEventListener('click', (event) => {
	if (event.target.closest('button[data-add]')) {
		handleAdd(event);
	} else if (event.target.closest('button[data-edit]')) {
		handEdit(event);
	} else if (event.target.closest('button[data-delete]')) {
		handleDelete(event);
	}
});

modal.addEventListener('submit', () => currentTask && currentTask.remove());

modal.querySelector('#cancel').addEventListener('click', () => modal.close());

modal.addEventListener('close', () => (currentTask = null));

let tasks = [
	[
		'Gather inspiration for layout ideas 🖌️',
		'Research Color Palette 🖍️',
		'Brand and Logo Design 🎨',
	],
	[
		'Optimize Image Assets 🏞️',
		'Cross-Browser Testing 🌐',
		'Integrate Livechat 💬',
	],
	[
		'Set Up Custom Domain 🌍',
		'Deploy Website 🚀',
		'Fix Bugs 🛠️',
		'Team Meeting 📅',
	],
	[
		'Write Report 📊',
		'Code Review 💻',
		'Implement Billing and Subscription 💰',
	],
];

tasks.forEach((col, idx) => {
	for (const item of col) {
		columns[idx].querySelector('.tasks').appendChild(createTask(item));
	}
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;