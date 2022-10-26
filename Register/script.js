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
/**function changeColor(color){
    btn.style.background = color;
    link.style.a = color;
    link2.style.color = color;
    login.style.color = color;
    name.style.a = color;
    
    document.querySelectorAll('span').forEach(function(item){
        item.classList.remove('active')
    })
    event.target.classList.add('active');
}**/