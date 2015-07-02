var Task = function (text) {
    this.text = text;
    this.liElem = document.createElement("li");
    this.liElem.innerHTML = "<label><input type='checkbox'>" + this.text + "</label><div name='del'></div>" + this.doneButton;
    this.doneButton = doneButton;
    this.doneButton.innerHTML = "<input id='doneButton' type='button' name='Done' value='Done'>";
};

Task.prototype.check = function(){
    var changedElem = document.getElementsByTagName("input")[0];
    if(changedElem.checked){
        Task.liElem.setAttribute("class", "checked");
    }else{
        Task.liElem.setAttribute("class", "notChecked");
    }
};

Task.prototype.del = function(liElem){
    this.child = liElem;
    this.parent = document.getElementById("needDo");
    parent.removeChild(this.child);
};

var textExist = false;

var needDo = {
    data: [],
    ulElem: document.createElement("ul"),
    addToList: function(){

        var task = new Task(text);

        for(var i=0; i<needDo.data.length; i++){
            if((text === needDo.data[i]["txt"]) && !textExist){
                textExist = true;
                //console.log(needDo.data[i]["txt"]);
                alertMessage(task.text);
                break;
            }else{
                needDo.ulElem.appendChild(task.liElem);
                document.getElementById("workArea").appendChild(needDo.ulElem);
            }
        }
        needDo.data.push(task);
        task.text.value = "";
        task.text.focus();
        textExist = false;
    },

    delFromList: function(id){
        Task.del(this);
        needDo.data.splice(id, 1);
        return needDo.data;
    },

    done: function(id){

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
};

var done = {
    data: [],
    ulElem: document.createElement("ul"),
    addToList: function(id){

    }
};
var listeners = function(){};

document.getElementById("form").addEventListener(event, function(event){
    if(event == "click" && event.target == "input[type=button]"){
        needDo.addToList();
    }else if(event == "keydown" && event.keyCode==13){
        needDo.addToList();
    }
});

document.getElementsByTagName("div")[0].addEventListener("click", Task.del);

needDo.ulElem.setAttribute("id", "needDo");
done.ulElem.setAttribute("id", "done");

var alertMessage = function(text){
    document.getElementById("alert").innerHTML = "<p>Text '" + text + "' is already used!</p>";
    setTimeout(function(){document.getElementById("alert").style.display = "none"}, 1000);
    setTimeout(function(){
        document.getElementById("alert").innerHTML = "<p></p>";
        document.getElementById("alert").style.display = "block";
    }, 1500);
};
