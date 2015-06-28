var Task = function () {
    this.liElem = document.createElement("li");
    this.txt = document.getElementById("text").value;
};

Task.prototype.check = function(){
    var changedElem = Task.liElem.children[0];
    var checkElem = changedElem[0].checked;
    if(checkElem == "true"){
        changedElem.setAttribute("style", "text-decoration: line-through");
    }else{
        changedElem.setAttribute("class", "notChecked");
    }
};

Task.prototype.del = function(id){
    var delElem = Task.liElem.childNodes.checked;
    if(delElem == "true"){
        if(id=="numOne"){
            document.getElementById("numOne").removeChild(this);
        }else if(id=="numTwo"){
            document.getElementById("numTwo").removeChild(this);
        }
    }
};

var listOne = {
    ulElementOne: document.createElement("ul"),
    ulElementTwo: document.createElement("ul"),
    data: [],
    addToList: function(id){

        var task = new Task();

            if ((task.txt !== "") && (this.id == "firstBtn")) {
                task.liElem.innerHTML = "<label><input type='checkbox'>" + task.txt + "</label><div name='del'></div>";
                listOne.ulElementOne.appendChild(task.liElem);
                document.getElementById("workArea").appendChild(listOne.ulElementOne);
            }else if((task.txt !== "") && (this.id == "secondBtn")){
                task.liElem.innerHTML = "<label><input type='checkbox'>" + task.txt + "</label><div name='del'></div>";
                listOne.ulElementTwo.appendChild(task.liElem);
                document.getElementById("workArea").appendChild(listOne.ulElementTwo);
            }

        task.liElem.querySelector("div").addEventListener("click", task.del);
        listOne.data.push(task);
        document.getElementById("text").value = "";
        document.getElementById("text").focus();
    },

    dragAndDrop: function(){

    }
};

document.getElementById("firstBtn").addEventListener("click", listOne.addToList);
document.getElementById("secondBtn").addEventListener("click", listOne.addToList);

listOne.ulElementOne.setAttribute("id", "numOne");
listOne.ulElementTwo.setAttribute("id", "numTwo");
