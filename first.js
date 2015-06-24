var Task = function () {
    this.liElem = document.createElement("li");
    this.txt = document.getElementById("text").value;
};

Task.prototype.check = function(){
    if(this.checked === "true"){
        document.getElementsByTagName("input")[0].setAttribute("class", "cheked");
    }else{
        document.getElementsByTagName("input")[0].setAttribute("class", "notCheked");
    }
};

Task.prototype.del = function(){
    document.getElementById("now").removeChild(this);
};

var listOne = {
    ulElement: document.createElement("ul"),
    data: [],
    addToList: function(){
        if(event.keyCode==13){
            var task = new Task();
            if (task.txt !== "") {
                task.liElem.innerHTML = "<label><input type='checkbox'>" + task.txt + "</label><div name='del'></div>";
                listOne.ulElement.appendChild(task.liElem);
                document.getElementById("list").appendChild(listOne.ulElement);
            }
            /*if(document.getElementsByTagName("div").hasAttribute("name")){
                document.getElementsByTagName("div").addEventListener("click", task.del);
            }*/

            listOne.data.push(task);
            console.log(listOne.data);
            document.getElementById("text").value = "";
            document.getElementById("text").focus();
        }

    }
};

document.getElementById("text").addEventListener("keydown", listOne.addToList);
listOne.ulElement.setAttribute("id", "now");
