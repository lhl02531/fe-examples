
const el_conList = document.getElementById('contactList')
const el_search = document.getElementById('search')

const data = [  
                { name: 'Amy', phonenum: '13432214830' },
                { name: 'Bob', phonenum: '15934865432' },
                { name: 'Danny', phonenum:'18539284752' },
                { name: 'Jennie', phonenum: '18539284753' }
            ]

    
function insertInfo(data){
    el_conList.innerHTML = ''
    const fragment = document.createDocumentFragment()            
    for( const { name, phonenum} of data){
        
        const el_part = document.createElement('div')
        el_part.className = 'part'
        const el_name = document.createElement('p')
        const el_phonenum = document.createElement('p')
        el_name.className = 'name'
        el_phonenum.className = 'phonenum'
        el_name.innerHTML = name
        el_phonenum.innerHTML = phonenum
        el_part.appendChild(el_name)
        el_part.appendChild(el_phonenum)
        fragment.appendChild(el_part)
    }
    el_conList.appendChild(fragment)
}



function fit(val, compareVal){
    // 忽略大小写，都转成大小写
    return val.toUpperCase().includes(compareVal.toUpperCase())
}

function rule(key){
    // 字符串比较是比较首个字符的 ascii 码
    return (key >= '0' && key <= '9') 
        || (key >= 'a' && key <= 'z') 
        || (key >= 'A' && key <= 'Z')
        || ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight','Backspace'].includes(key)
}

el_search.addEventListener('keyup', function(e){
    const el_parts   = document.querySelectorAll('.part')

    if(rule(e.key)){
       for(let i = 0; i < el_parts.length; i++)
            el_parts[i].style.display = 'none'
       
       for(let i = 0; i < data.length; i++){
           const { name, phonenum } = data[i]
            //    忘写函数名， 误区搞了好久
            //    fit(phonenum, this.value) 写成 (phonenum, this.value)
           const result = fit(name, this.value) || fit(phonenum, this.value)
           if(result){
                el_parts[i].style.display = 'block'
           }
       }
       
    }else{
        e.preventDefault()
    }
})


insertInfo(data)