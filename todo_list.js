function init() {
    userCheck();
}

function userCheck() {
    const userName = localStorage.getItem('userName');

    const step_1 = document.querySelector("#container .step_box[name=step_1]");
    const step_2 = document.querySelector("#container .step_box[name=step_2]");
    step_1.classList.remove('on');
    step_2.classList.remove('on');

    if(userName == null) {
        step_1.classList.add("on");
    } else {
        if(userName == "") {
            localStorage.removeItem('userName');
            step_1.classList.add("on");
            return alert("이름을 입력해주세요");
        }

        document.querySelector(".step_box[name=step_2] .user_name .name_value").innerText = userName;

        startClock();
        setInterval(startClock, 1000);

        step_2.classList.add("on");

        renderTODO();
    }
}

function userNameSubmit() {
    const userName = document.querySelector("#user_name").value;
    localStorage.setItem('userName', userName);

    userCheck();
}

function startClock() {
    const clock = document.querySelector(".step_box[name=step_2] .time_wrap");
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    clock.innerText = `${year}-${month}-${day} ${hours}:${min}:${sec}`;
}

function setTODO() {
    todoSorting();

    const todoEle = document.querySelector("#add_todo");
    const todo = todoEle.value;

    let prev = JSON.parse(localStorage.getItem("todo_list"));
    if(prev == null) {
        prev = {};
    }

    const last_id = Object.keys(prev).length + 1;
    console.log("last_id=>",last_id);
    prev[last_id] = todo;
    localStorage.setItem("todo_list", JSON.stringify(prev));
    todoRender();

    todoEle.value = "";
}

function renderTODO() {
    successRender();
    todoRender();
}

function successRender() {
    const todoWrap = document.querySelector(".step_box[name=step_2] .todo_list_wrap[name=success] .todo_box");
    todoWrap.innerHTML = "";

    let todoObj = JSON.parse(localStorage.getItem("success_list"));
    let renderHTML = "";
    for(let key in todoObj) {
        renderHTML +=
            '<div class="todo_row">'+
                '<button class="remote_btn">'+
                    '<p class="row_icon">✔️</p>'+
                    '<p class="row_todo">'+todoObj[key]+'</p>'+
                '</button>'+
            '</div>';
    }

    todoWrap.innerHTML = renderHTML;
}

function todoRender() {
    const todoWrap = document.querySelector(".step_box[name=step_2] .todo_list_wrap[name=todo] .todo_box");
    todoWrap.innerHTML = "";

    let todoObj = JSON.parse(localStorage.getItem("todo_list"));
    let renderHTML = "";
    for(let key in todoObj) {
        renderHTML +=
            '<div class="todo_row">'+
                '<button class="remote_btn" name="'+key+'" onclick="todoClick(event);">'+
                    '<p class="row_icon">🔘</p>'+
                    '<p class="row_todo">'+todoObj[key]+'</p>'+
                '</button>'+
            '</div>';
    }

    todoWrap.innerHTML = renderHTML;
}

function todoSorting() {
    let successObj = JSON.parse(localStorage.getItem("success_list"));
    let newSuccessObj = {}
    let index = 1;
    for(key in successObj) {
        newSuccessObj[index] = successObj[key];
        index++;
    }
    localStorage.setItem("success_list", JSON.stringify(newSuccessObj));

    let todoObj = JSON.parse(localStorage.getItem("todo_list"));
    let newTodoObj = {};
    index = 1;
    for(key in todoObj) {
        let thisValue = todoObj[key];
        newTodoObj[index] = thisValue;
        index++;
    }
    localStorage.setItem("todo_list", JSON.stringify(newTodoObj));
}

function todoClick(e) {
    let nameValue = null;
    if(e.target.className != "remote_btn") {
        nameValue = e.target.parentNode.attributes["name"].value;
    } else {
        nameValue = e.target.attributes["name"].value;
    }

    let todoObj = JSON.parse(localStorage.getItem("todo_list"));
    const todoValue = todoObj[nameValue];
    delete todoObj[nameValue];
    localStorage.setItem("todo_list", JSON.stringify(todoObj));

    let successObj = JSON.parse(localStorage.getItem("success_list"));
    const lastIndex = Object.keys(successObj).length + 1;
    successObj[lastIndex] = todoValue;
    localStorage.setItem("success_list", JSON.stringify(successObj));

    todoSorting();
    renderTODO();
}