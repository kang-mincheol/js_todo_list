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
    }
}

function userNameSubmit() {
    const userName = document.querySelector("#user_name").value;
    localStorage.setItem('userName', userName);

    userCheck();
}