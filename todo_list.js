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

        step_2.classList.add("on");

        renderTODO();
    }
}

function userNameSubmit() {
    const userName = document.querySelector("#user_name").value;
    localStorage.setItem('userName', userName);

    userCheck();
}

function setTODO() {
    const todo = document.querySelector("#add_todo").value;

    let prev = JSON.parse(localStorage.getItem("todo_list"));
    if(prev == null) {
        prev = [];
    }
    prev.push(todo);
    localStorage.setItem("todo_list", JSON.stringify(prev));
    todoRender();
}

function renderTODO() {
    successRender();
    todoRender();
}

function successRender() {
    const todoWrap = document.querySelector(".step_box[name=step_2] .todo_list_wrap[name=success] .todo_box");
    todoWrap.innerHTML = "";

    let todoArr = JSON.parse(localStorage.getItem("success_list"));
    let renderHTML = "";
    for(let key in todoArr) {
        renderHTML +=
            '<div class="todo_row">'+
                '<button class="remote_btn">'+
                    '<p class="row_icon">✔️</p>'+
                    '<p class="row_todo">'+todoArr[key]+'</p>'+
                '</button>'+
            '</div>';
    }

    todoWrap.innerHTML = renderHTML;
}

function todoRender() {
    const todoWrap = document.querySelector(".step_box[name=step_2] .todo_list_wrap[name=todo] .todo_box");
    todoWrap.innerHTML = "";

    let todoArr = JSON.parse(localStorage.getItem("todo_list"));
    let renderHTML = "";
    for(let key in todoArr) {
        renderHTML +=
            '<div class="todo_row">'+
                '<button class="remote_btn">'+
                    '<p class="row_icon">🔘</p>'+
                    '<p class="row_todo">'+todoArr[key]+'</p>'+
                '</button>'+
            '</div>';
    }

    todoWrap.innerHTML = renderHTML;
}