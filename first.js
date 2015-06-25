var Task = function () {
    this.liElem = document.createElement("li");
    this.txt = document.getElementById("text").value;
};

Task.prototype.check = function(){
    if(Task.liElem.hasChildNodes("input").hasAttribute("checked") == "true"){
        Task.liElem.children[0][0].setAttribute("class", "cheked");
    }else{
        Task.liElem.children[0][0].setAttribute("class", "notCheked");
    }
};

Task.prototype.del = function(id){
    var delElem = document.getElementsByTagName("div");
    if(delElem.hasAttribute("name")=="del"){
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

            listOne.data.push(task);
            document.getElementById("text").value = "";
            document.getElementById("text").focus();

    }
};

document.getElementById("firstBtn").addEventListener("click", listOne.addToList);
document.getElementById("secondBtn").addEventListener("click", listOne.addToList);

listOne.ulElementOne.setAttribute("id", "numOne");
listOne.ulElementTwo.setAttribute("id", "numTwo");



var dragElem = document.getElementById("numOne").querySelector("div[name]");

ball.onmousedown = function(e) {

    var coords = getCoords(ball);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;

    ball.style.position = 'absolute';
    document.body.appendChild(ball);
    moveAt(e);

    ball.style.zIndex = 1000; // над другими элементами

    function moveAt(e) {
        ball.style.left = e.pageX - shiftX + 'px';
        ball.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function(e) {
        moveAt(e);
    };

    ball.onmouseup = function() {
        document.onmousemove = null;
        ball.onmouseup = null;
    };

}

ball.ondragstart = function() {
    return false;
};
