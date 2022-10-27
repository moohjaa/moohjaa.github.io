let ColorPanel = document.getElementById('ColorPanel')
let SelectionColor = document.querySelectorAll(".colors span")
ColorPanel.addEventListener('click',function(event){
    event.stopPropagation()
    if(event.target.matches("span")){
        document.documentElement.style.setProperty('--color',event.target.dataset.color)
        changeClass(event.target)
        return
    }  
})
function changeClass(event){
    SelectionColor.forEach(function(item){
        item.classList.remove("BorderColor")
        event.classList.add("BorderColor")
    })
}
