/*create constructor for tasks*/
var Task = function (text) {
    this.text = text;
    this.doneButton = "<input class='doneButton' type='button' name='done' value='Done'>";
    this.liElem = document.createElement('li');
    this.liElem.innerHTML = "<label><input type='checkbox'><p>" + this.text + '</p></label>' + this.doneButton + "<div name='del'></div>";
    this.indexOfTask = Date.now();
};

Task.prototype.check = function(){
    var changedElem = document.getElementsByTagName('input')[0];
    if(changedElem.checked){
        Task.liElem.setAttribute('class', 'checked');
    }else{
        Task.liElem.setAttribute('class', 'notChecked');
    }
};

Task.prototype.del = function(){
    var parentElem = document.getElementsByTagName('ul');
    this.childElem = childElem;
    console.log('Parent' + parentElem);
    console.log('Child' + childElem);
    this.childElem.remove();
};

var textExists = false;

/* special list for tasks*/
var needDo = {
    data: [],
    ulElem: document.createElement('ul'),
    addToList: function(){

        var task = new Task(text.value);
        if(needDo.data.length<=0 && text.value){
            needDo.ulElem.appendChild(task.liElem);
            document.getElementById('workArea').appendChild(needDo.ulElem);
            task.liElem.children[2].addEventListener('click', task.del.bind(this));
            task.liElem.children[1].addEventListener('click', needDo.done);
            needDo.data.push(task);
        }else {
            for(var item = 0; item < needDo.data.length; item++) {
                if ((text.value == needDo.data[item]['text']) && !textExists && text.value) {
                    alertMessage(text.value);
                    textExists = true;
                } else if(text.value){
                    needDo.ulElem.appendChild(task.liElem);
                    document.getElementById('workArea').appendChild(needDo.ulElem);
                    task.liElem.children[2].addEventListener('click', needDo.delFromList);
                    task.liElem.children[1].addEventListener('click', needDo.done);
                    needDo.data.push(task);
                    break;
                }
            }
        }
        textExists = false;
        text.value = '';
        text.focus();
    },

    delFromList: function(){
        Task.prototype.del(this);
        console.log(this);
    },

    done: function(){
        var doneElem = needDo.ulElem.removeChild(this);
        var arr = needDo.data;
        for(var i=0; i<arr.length; i++) {
            if (doneElem.hasOwnProperty('indexOfTask') === arr[i]['indexOfTask']) {
                done.addToListDone(arr[i]);
            }
        }
    }
};

/*special list for done tasks*/
var done = {
    data: [],
    ulElem: document.createElement('ul'),

    addToListDone: function(task){
        task = new Task();
        done.ulElem.appendChild(task.liElem);
        document.getElementById('workArea').appendChild(needDo.ulElem);
        needDo.data.push(task);
    },

    delFromList: function(id){

    }
};

needDo.ulElem.setAttribute("id", "needDo");
done.ulElem.setAttribute("id", "done");

/* starts all listeners*/
var listeners = function(){
    document.getElementById('form').addEventListener('click', function(event){
        if(event.target.type == 'button'){
            needDo.addToList();
        }
    }.bind(this));

    document.getElementById("form").addEventListener('keydown', function(event){
        if(event.keyCode==13) {
            needDo.addToList();
        }
    }.bind(this));

};
listeners();

/*show alert message when entering text already exists*/
var alertMessage = function(text){
    var alertMessage = document.createElement("div");
    alertMessage.setAttribute("id", "alert");
    alertMessage.innerHTML = "<p>Text '" + text + "' is already used!</p>";

    document.body.insertBefore(alertMessage, document.body.firstChild);

    setTimeout(function() {
        alertMessage.parentNode.removeChild(alertMessage);
    }, 2000);
};
