// get element
const clear = document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const list = document.querySelector('#list');
const inputElement = document.querySelector('#input');

//Css Classes
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle';
const LINE_THROUGH = 'lineThrough';
const doneColor = 'done';

// Some Voraiabels
let List = new Array();
let id = 0;

// todo show today's date
const today = new Date();
const options = { weekday: 'long', month: 'short', day: 'numeric' };
dateElement.innerHTML = today.toLocaleDateString('fr-FR', options);

//todo: create a fynction add todo
const addTodo = function (toDo, id, done, trash) {
	if (trash) {
		return;
	}
	const DONE = done ? CHECK : UNCHECK;
	const DONEColor = done ? doneColor : '';
	const LINETHROUGH = done ? LINE_THROUGH : '';
	const item = `
  <li class="item">
    <i class="far ${DONE} ${DONEColor} co" job="complete" id=${id}></i>
    <p class="text ${LINETHROUGH}">${toDo}</p>
    <i class="fa fa-trash de" job="delete" id=${id}></i>
  </li>            
  `;
	list.insertAdjacentHTML('beforeend', item);
};
document.addEventListener('keydown', (e) => {
	if (e.keyCode == 13) {
		const todoText = inputElement.value;
		if (todoText) {
			addTodo(todoText, id, false, false);
			List.push({
				name: todoText,
				id: id,
				done: false,
				trash: false,
			});
			// => Add Items
			localStorage.setItem('TODO', JSON.stringify(List));
			id++;
		}
		inputElement.value = '';
	}
});

// todo: Create function for complete a todo Task

const complete = function (element) {
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

	List[element.id].done = List[element.id].done ? false : true;
};

// todo: Create function for Remove a todo Task
const removeTask = function (element) {
	element.parentNode.parentNode.removeChild(element.parentNode);
	List[element.id].trash = true;
};

// todo: Add Event For Some Elment in UI (Check And Delete)
list.addEventListener('click', function (e) {
	const clickedElemnt = e.target;
	const elementJob = clickedElemnt.attributes.job.value;
	if (elementJob == 'complete') {
		complete(clickedElemnt);
	} else if (elementJob == 'delete') {
		removeTask(clickedElemnt);
	}
	// => Add Items
	localStorage.setItem('TODO', JSON.stringify(List));
});
//todo: LocalStorage Foncionality
// load items to the user's interface

// => Get Items Form LocalStorage
let data = localStorage.getItem('TODO');

if (data) {
	List = JSON.parse(data);
	id = List.length; // set the id to the last one in the list
	loadList(List); // load the list to the user interface
} else {
	// if data isn't empty
	List = [];
	id = 0;
}
function loadList(array) {
	array.forEach(function (item) {
		addTodo(item.name, item.id, item.done, item.trash);
	});
}

clear.addEventListener('click', function () {
	localStorage.clear();
	location.reload();
});
