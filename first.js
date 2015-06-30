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

Task.prototype.del = function(){
    var parent = document.getElementsByTagName("ul");
    var child = Task.liElem;
    parent.removeChild(child);
};

var listOne = {
    ulElementOne: document.createElement("ul"),
    ulElementTwo: document.createElement("ul"),
    data: [],
    addToList: function(){

        var task = new Task();
        listOne.data.push(task);

        for(var i=0; i<listOne.data.length-1; i++){
            var text = document.getElementById("text").value;
            if(text.localeCompare(listOne.data[i]["txt"]) === 0){
                console.log(listOne.data[i]["txt"]);
                document.getElementById("alert").innerHTML = "<p>Text '" + text + "' is already used!</p>";
                setTimeout(function(){document.getElementById("alert").style.display = "none"}, 1000);
                setTimeout(function(){
                    document.getElementById("alert").innerHTML = "<p></p>";
                    document.getElementById("alert").style.display = "block";
                }, 1500);
            }else{

            }
        }
            if ((task.txt !== "") && (this.id == "firstBtn")){
                task.liElem.innerHTML = "<label><input type='checkbox'>" + task.txt + "</label><div name='del'></div>";
                listOne.ulElementOne.appendChild(task.liElem);
                document.getElementById("workArea").appendChild(listOne.ulElementOne);
            }else if((task.txt !== "") && (this.id == "secondBtn")){
                task.liElem.innerHTML = "<label><input type='checkbox'>" + task.txt + "</label><div name='del'></div>";
                listOne.ulElementTwo.appendChild(task.liElem);
                document.getElementById("workArea").appendChild(listOne.ulElementTwo);
            }

        task.liElem.querySelector("div").addEventListener("click", task.del);

        document.getElementById("text").value = "";

        document.getElementById("text").focus();


    },
    dragAndDrop: function(){
        var dragElem = document.getElementsByTagName("li")[0];

        dragElem.onmousedown = function(e) {

            function getCoords(elem) {
                var box = elem.getBoundingClientRect();

                return {
                    top: box.top + pageYOffset,
                    left: box.left + pageXOffset
                };

            }

            var coords = getCoords(dragElem);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;

            dragElem.style.position = "absolute";
            document.body.appendChild(dragElem);
            moveAt(e);
            dragElem.style.zIndex = 1000;

            function moveAt(e) {
                dragElem.style.left = e.pageX - shiftX + 'px';
                dragElem.style.top = e.pageY - shiftY + 'px';
            }

            document.onmousemove = function(e) {
                moveAt(e);
            };

            dragElem.onmouseup = function() {
                document.onmousemove = null;
                dragElem.onmouseup = null;
            };

        };

        dragElem.ondragstart = function() {
            return false;
        };
    }
}
;

document.getElementById("firstBtn").addEventListener("click", listOne.addToList);
document.getElementById("secondBtn").addEventListener("click", listOne.addToList);

listOne.ulElementOne.setAttribute("id", "numOne");
listOne.ulElementTwo.setAttribute("id", "numTwo");
