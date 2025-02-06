let carticon = document.querySelector(".carticon")
let sidebar  = document.querySelector(".sidebar")
let sidebarclosebtn = document.querySelector(".sidebar__closebtn")
carticon.addEventListener('click',()=>{
  
    sidebar.classList.toggle('hide')
})

sidebarclosebtn.addEventListener('click',()=>{
sidebar.classList.toggle('hide')
})