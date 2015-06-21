var Task = function () {
    this.liElem = document.createElement("li");
    this.txt = document.getElementById("text").value;
    return this;
}

Task.prototype.checked = document.getElementsByTagName("input").checked;
Task.prototype.check = function(){
    if(Task.checked == "true"){
        this.document.getElementsByTagName("input")[0].setAttribute("class", "cheked");
    }else{
        this.document.getElementsByTagName("input")[0].setAttribute("class", "notCheked");
    }
}

var task = new Task();

task.check();

var list = {
    ulElement: document.createElement("ul").setAttribute("id", "ToDoList"),
    data: [task, task1, task2, ...],
    addToList: function(){
        document.addEventListener(event, function(){if((event.type == "keydown")&&(event.keyCode==13)){
                if (this.txt != "") {
                    document.getElementsByTagName("li").innerHTML = "<li><input type='checkbox'>" + task.txt + "<span></span></<li>";
                }
            }
        });
        list.data.push(task);
    },
    removeElemFromList: function(){
        document.getElementById("ToDoList").removeChild(this);
    },
    removeByIdFromList: function(){},
    removeAllFromList: function(){}
}

task.liElem.onclick = function(){
    document.getElementsByTagName("span").addEventListener("click", list.removeElemFromList);
};

