const form = document.querySelector('.form')
const inp = document.querySelector('.form input')
const collection = document.querySelector('.collection')
const checkMark = document.querySelector('.styled-checkbox')
const main = document.querySelector('.main')
const reset = document.querySelector('.reset')
const videoBG = document.querySelector('.video-background')
const complete = document.querySelector('.complete')
const audio = document.querySelector('audio')

const DATA = JSON.parse(localStorage.getItem("data")) || []
createList(DATA);

function createList(data){
    while(collection.firstChild){
        collection.firstChild.remove()
    }
    data.forEach(item =>{
        let li = document.createElement("li")
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'
        checkbox.classList.add('styled-checkbox')
        checkbox.checked = item.checked
        li.innerHTML = item.title

        checkbox.addEventListener("change", () => {
            item.checked = checkbox.checked
            localStorage.setItem("data", JSON.stringify(DATA));
        })

        collection.appendChild(li)
        li.appendChild(checkbox)
    })
}


form.addEventListener("submit", e =>{
    e.preventDefault()
    if(!inp.value){
        return null
    }
    const value = inp.value
    let newTodo = {
        id: new Date().getTime(),
        title: value,
        checked: false
    }
    DATA.push(newTodo)
    localStorage.setItem("data", JSON.stringify(DATA))

    inp.value = ""
    scrollToBottom()
    createList(DATA)

    complete.style.display = "block"
    audio.play()

    inp.disabled = true;
    setTimeout(()=>{
        complete.style.display = "none"
        inp.disabled = false
        inp.focus()
    }, 2000)
})

function scrollToBottom(){
    main.scrollTop = main.scrollHeight
}

reset.addEventListener("click", ()=>{
    localStorage.clear()
    location.reload();
})

main.addEventListener("mouseover", ()=>{
    videoBG.style.filter = "blur(15px)"
})
main.addEventListener("mouseout", () => {
    videoBG.style.filter = "none";
});

window.addEventListener("load", () => {
    const container = document.querySelector('.container')
    const loadingOverlay = document.querySelector(".loading-overlay");
    container.style.filter = "blur(10px)";
    setTimeout(() => {
        loadingOverlay.style.opacity = "0";
        container.style.filter = "none";
    }, 1300);
    setTimeout(()=>{
        loadingOverlay.style.display = "none"
    }, 1500)
});
