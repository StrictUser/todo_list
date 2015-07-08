/* создаем 1-й объект, в котором храним наши таски */

var todo = {                                     //главный объект-1, содержащий всю информацию о создаваемых тасках
    list: [],                                   //создаем массив, в котором будут хранится объекты-таски
    node: document.getElementById('list'),      //DOM-узел, в котором будут находится DOM-элементы-таски

    /* создаем метод объекта todo для добавления на страницу DOM-элементов, добавления тасков в массив, добавления слушателя*/

    addTask: function(text) {
        var task = new Task(text, this);        //создание объкта-таска (task) с аргументами: text=текст создаваемого таска, this=todo
        this.list.push(task);                   //добавление таска (task) в массив (todo.list)
        this.node.appendChild(task.node);       //добавление 'li' (task.node=DOM-элемент 'li') в DOM-список 'list'(this.node=todo.node)
        addListeners(task);                     //добавление к созданному таску слушателей: 1) на кнопку delButton добавляется выполнение функции delFromList по клику, 2) на текстовое поле добавляется выполнение функции checkItem по клику, 3) на текстовое поле добавляется выполнение функции moveToAnotherList при движении мыши по элементу (в нашем случае - таску)
    },

    /* создаем метод объекта todo, который будет выводить сообщение о совпадении текста*/

    showAlert: function() {
        var alertNode = document.createElement('p');    //создаем DOM-элемент 'p'
        alertNode.innerHTML = 'already exists';         //добавляем в только что созданный 'p' текст 'already exists'
        this.node.appendChild(alertNode);               //привязываем данное текстовое поле к DOM-списку, this.node=todo.node, alertNode = DOM-элемент 'p' с текстом
        var self = this.node;                           //self = this.node = todo.node

        /* функция для удаления выведенного сообщения через 2 сек.*/

        setTimeout(function () {
            self.removeChild(alertNode);                //self = todo.node, alertNode = DOM-элемент 'p' с текстом
        }, 2000);
    }
}

/* создаем 2-й объект, в котором храним наши выполненные таски */

var todo2 = {                                       //главный объект-2, содержащий всю информацию о выполненных тасках
    node: document.getElementById('list2'),         //DOM-узел, в котором будут находится DOM-элементы - выполненные таски
    list: []                                        //создаем массив, в котором будут хранится объекты-таски
}

/* конструктор для создания свойств и методов таска (создание DOM-элементов, кнопок, текста)*/

var Task = function (text, list) {                  //text=текстовое содержимое (содержимое текстового поля элемента 'input' при вводе текста в текстовую строку), list=todo
    this.text = text;                               //this.text=текстовое содержимое
    this.list = list;                               //this.list=todo
    this.check = false;                             //свойство текста
    this.node = document.createElement('li');       //создание DOM-элемента 'li'(=this.node)
    this.node.innerHTML = '<input type="button" value="remove"> <p>' + text + '</p>';       //добавление кнопки и текста в DOM-элемент 'li'(=this.node)
    this.delButton = this.node.getElementsByTagName('input')[0];                            //this.delButton=кнопка конкретного таска, находится внутри каждого DOM-элемента 'li'(=this.node)
    this.textNode = this.node.getElementsByTagName('p')[0];                                 //this.textNode=текст конкретного таска, содержится внутри DOM-элемента 'li'
};

/* создаем прототип метода удаления DOM-элемента для таска*/

Task.prototype.delFromList = function () {
    this.list.removeChild(this.node);                              //this.list=todo.list, this.node=task.node=DOM-элемент 'li'
};

/* создаем прототип метода для таска - проверка на определенное свойство (check) у DOM-элемента текста*/

Task.prototype.checkItem = function () {
    if (!this.check) {                                              //this.check=false
        this.node.style.textDecoration = 'line-through';            //this.node=DOM-элемент 'li', задаем тексту свойство "зачеркнутый"
        this.check = true;
    } else {
        this.node.style.textDecoration = 'none';                    //this.node=DOM-элемент 'li', задаем тексту свойство "обычный"
        this.check = false;
    }
};

/* создаем прототип метода для таска - перемещение таска в другой список*/

Task.prototype.moveToAnotherList = function (todo_second ) {
    this.list.list.forEach(function(item, i) {                  //this.list = todo, this.list.list = todo.list
        if (item.text === this.text) {                          //item.text=текст конкретного таска в массиве(todo.list.task.text), this.text=текст конкретного таска DOM-элемента 'li'
            this.list.list.splice(i, 1);                        //удаление конкретного таска из массива (this.list.list = todo.list)
        }
    });

    this.list.node.removeChild(this.node);                      //this.list.node = DOM-узел, в котором находятся DOM-элементы-таски, this.node = DOM-элемент 'li'
    this.list = todo_second;                                    //todo_second = todo2
    this.list.list.push(this);                                  //this.list.list = todo2.list (массив, содержащий объекты - выполненные таски), this = конкретный таск (объект)
    todo_second.node.appendChild(this.node);                    //todo_second.node = todo2.node (DOM-узел, в котором будут находится DOM-элементы - выполненные таски), добавление нового выполненного таска в список
};

/* устанавливаем слушатель: для кнопки 'addTask' добавляем выполнение функции по внесению текста в таск при клике на кнопку*/

document.getElementById('addTask').onclick = function(event) {
    var text = document.getElementById('text').value;               //text = текстовое содержимое (содержимое текстового поля элемента 'input' при вводе текста в текстовую строку)
    var alreadyExists = false;

    todo.list.forEach(function (task) {
        if (task.text === text) {                                   //task.text = текст конкретного таска в массиве todo.list, text = текстовое содержимое (содержимое текстового поля элемента 'input' при вводе текста в текстовую строку)
            alreadyExists = true;
        }
    });

    if (alreadyExists) {                                            //alreadyExists = true
        todo.showAlert();                                           //вызов функции, показывающей сообщение 'already exists'
    } else {
        todo.addTask(text);                                         //вызов функции, создающей новый таск и добавляющей в созданный таск текст (text = текстовое содержимое (содержимое текстового поля элемента 'input' при вводе текста в текстовую строку))
    }
};

/* функция, добавляющая слушатели*/

function addListeners (task) {

    task.delButton.onclick = task.delFromList.bind(task);                       //на кнопку delButton у таска добавляется выполнение метода delFromList конкретного объекта task по клику (аргументом указан конкретный таск, к которому будет применен метод)
    task.textNode.onclick = task.checkItem.bind(task);                          //на текстовое поле добавляется выполнение метода checkItem конкретного объекта task по клику (аргументом указан конкретный таск, к которому будет применен метод)
    task.textNode.onmouseenter = task.moveToAnotherList.bind(task, todo2);      //на текстовое поле добавляется выполнение метода moveToAnotherList конкретного объекта task при движении мыши по элементу (аргументами указаны: конкретный таск, к которому будет применен метод и список, в который будет перемещен этот таск)
}
