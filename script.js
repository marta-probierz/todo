document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.querySelector('.list');
    const todoForm = document.querySelector('.form');
    const todoSearch = document.querySelector('.listoftasks-list');
    const todoTextarea = todoForm.querySelector('textarea');

    function addTask(text) {
        const element = document.createElement('div');
        element.classList.add('element');
        const elementInner = document.querySelector('#elementTemplate').content.cloneNode(true);
        element.append(elementInner);

        const date = new Date();

        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }

        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }

        let hour = date.getHours();
        if (hour < 10) {
            hour = '0' + hour;
        }

        let minute = date.getMinutes(); 
        if (minute < 10) {
            minute = '0' + minute;
        }

        const dateText = `${day}.${month}.${date.getFullYear()}, ${hour}:${minute}`;


        element.querySelector('.element-date').innerText = dateText;

        element.querySelector('.element-text').innerText = text;

        todoList.append(element);
    }

    todoForm.addEventListener('submit', e => {
        e.preventDefault();
        if (todoTextarea.value !== '') {
            addTask(todoTextarea.value);
            todoTextarea.value = '';
        }
    });

    todoForm.addEventListener('keyup', e => {
        if (e.code === 'Enter') {
            e.preventDefault();
            addTask(todoTextarea.value);
            todoTextarea.value = '';
        }
    });

    todoList.addEventListener('click', e => {
        if (e.target.classList.contains('newtask-delete')) {
            e.target.closest('.element').remove();
        }
    });

    todoSearch.addEventListener('input', () => {
        const val = todoSearch.value;
        const elems = todoList.querySelectorAll('.element');

        for (const el of elems) {
            const text = el.querySelector('.element-text').innerText;

            if (text.includes(val)) {
                el.style.setProperty('display', '');
            } else {
                el.style.setProperty('display', 'none');
            }
        }
    });
});
