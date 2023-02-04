
// 参考http://sakitama.github.io/js/task-30.js,改进代码
// 元素
// const EL_MSG_UNAME = document.getElementById('msg_uname')
// const EL_MSG_PW = document.getElementById('msg_password')
// const EL_MSG_RPW = document.getElementById('msg_rpassword')
// const EL_MSG_EMAIL = document.getElementById('msg_email')
// const EL_MSG_PNUM = document.getElementById('msg_phonenum')
const el_f1 = document.getElementById('f1')
const el_arr_input = el_f1.getElementsByTagName('input')

const el_msg = {
    "m_uname": document.getElementById('m_uname'),
    "m_pw": document.getElementById('m_pw'),
    "m_rpw": document.getElementById('m_rpw'),
    "m_email": document.getElementById('m_email'),
    "m_phonenum": document.getElementById('m_phonenum'),
}

const helpMessage = [
    '必填，长度为4~16个长度',
    '必填，8位需包含大小写字母数字',
    '再次输入相同密码',
    '必填',
    '必填,11位数字'
]
const validFuncArr = [validUname, validpw, validRpw, validEmail, validPNum]

const ERR_MSG_UNAME = '名称不能为空'
const VALID_MSG_UNAME = '名称需要4~16个长度'
const SUCC_MSG_PW = '密码可用'
const ERR_MSG_PW = '密码不可用'
const ERR_MSG_PW_EMPTY = '密码不能为空'
const ERR_MSG_RPW = '密码输入不一致'
const SUCC_MSG_RPW = '密码输入一致'
const SUCC_MSG_EMAIL = '邮箱格式正确'
const ERR_MSG_EMAIL = '邮箱格式错误'
const SUCC_MSG_PNUM = '手机号码正确'
const ERR_MSG_PNUM = '手机号码错误'

// 状态
let staUna = staPw = staRPW = staEMA = staPho = false

// 元素 添加 提示信息
function showMsg(el, msg = '') {
    console.log(el)
    el.innerHTML = msg
}

// 元素添加状态
function changeStatus(type, inputEl, MsgEl, msg) {
    showMsg(MsgEl, msg)
    inputEl.className = type
    MsgEl.className = 'msg ' + type
}

// el_f1.uname.addEventListener('focus', () => { 
//     showMsg(EL_MSG_UNAME, NORMAL_MSG_UNAME) 
// })

// el_f1.uname.addEventListener('blur', validUname)
// el_f1.password.addEventListener('blur', validpw)
// el_f1.rpassword.addEventListener('focus', () => {
//     showMsg(el_f1.rpassword, NORMAL_MSG_RPW)
// })
// el_f1.rpword.addEventListener('blur',validRpw)
// el_f1.email.addEventListener('blur', validEmail)
// el_f1.phonenum.addEventListener('blur', validPNum)

for (let i = 0; i < el_arr_input.length - 1; i++) {
    (function (i) {
        el_arr_input[i].addEventListener('focus', () => {
            el_arr_input[i].className = ''
            el_msg[el_arr_input[i].dataset.msg].className = 'msg'
            showMsg(el_msg[el_arr_input[i].dataset.msg], helpMessage[i])
        })
        el_arr_input[i].addEventListener('blur', validFuncArr[i])
    })(i)
}


// 用户名校验
function validUname() {
    const value = el_f1.uname.value
    if (value === '') {
        changeStatus('error', el_f1.uname, el_msg.m_uname, ERR_MSG_UNAME)
    } else if (value.length < 4 || value > 16) {
        changeStatus('error', el_f1.uname, el_msg.m_uname, VALID_MSG_UNAME)
        staUna = false
    } else {
        changeStatus('success', el_f1.uname, el_msg.m_uname)
        staUna = true
    }
}

// 密码校验
function validpw() {
    const value = el_f1.password.value
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (value === '' || regex.test(value) === false) {
        changeStatus('error', el_f1.password, el_msg.m_pw, ERR_MSG_PW)
        staPw = false
    } else {
        changeStatus('success', el_f1.password, el_msg.m_pw, SUCC_MSG_PW)
        staPw = true
    }

}


// 二次密码校验
function validRpw() {
    const value = el_f1.password.value
    const rvalue = el_f1.rpword.value

    if (rvalue === '' || !staPw || rvalue !== value) {
        changeStatus('error', el_f1.rpword, el_msg.m_rpw, ERR_MSG_RPW)
        staRPW = false
    } else {
        changeStatus('success', el_f1.rpword, el_msg.m_rpw, SUCC_MSG_RPW)
        staRPW = true
    }
}

// 校验邮箱
function validEmail() {

    const value = el_f1.email.value
    const regex = /^\w+@[\da-z\.-]+\.([a-z]{2,6}|[\u2E80-\u9FFF]{2,3})$/
    if (value === '' || !regex.test(value)) {
        changeStatus('error', el_f1.email, el_msg.m_email, ERR_MSG_EMAIL)
        staEMA = false
    } else {

        changeStatus('success', el_f1.email, el_msg.m_email, SUCC_MSG_EMAIL)
        staEMA = true
    }
}

function validPNum() {
    const value = el_f1.phonenum.value
    const regex = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/

    if (value === '' || !regex.test(value)) {
        changeStatus('error', el_f1.phonenum, el_msg.m_phonenum, ERR_MSG_PNUM)
        staPho = false
    } else {

        changeStatus('success', el_f1.phonenum, el_msg.m_phonenum, SUCC_MSG_PNUM)
        staPho = true
    }
}



el_f1.addEventListener('submit', function (e) {
    e.preventDefault()
    if (staUna && staEMA && staPho && staPw && staRPW) {
        alert('输入正确')
    } else {
        alert('输入错误')
    }

})




















