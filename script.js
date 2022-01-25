const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".todoList")
const deleteAllButtons = document.querySelector(".footer button")

//pegando as entradas do usuário
inputBox.onkeyup = () => {
  let userData = inputBox.value
  if(userData.trim() != 0) {
    addBtn.classList.add("active")
  } else {
    addBtn.classList.remove("active")
  }
}
showTasks()

//se o usuário clicar no botão de add
addBtn.onclick = () => {
  let userData = inputBox.value
  let getLocalStorage = localStorage.getItem("New Todo")
  if(getLocalStorage == null) {
    listArr = []
  } else {
    listArr = JSON.parse(getLocalStorage)
  }
  listArr.push(userData)
  localStorage.setItem("New Todo", JSON.stringify(listArr))
  addBtn.classList.remove("active")
  showTasks()
}

//add list
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo")
  if(getLocalStorage == null){
    listArr = []
  } else {
    listArr = JSON.parse(getLocalStorage)
  }
  const pendingNumber = document.querySelector('.pendingNumber')
  pendingNumber.textContent = listArr.length
  if(listArr.length > 0) {
    deleteAllButtons.classList.add("active")
  } else {
    deleteAllButtons.classList.remove("active")
  }
  let newLiTag = ''
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick = 'deleteTask(${index})'><i class="fa fa-trash-o"></i></span> </li>`;
  })
  todoList.innerHTML = newLiTag
  inputBox.value = ''
}

//apagar itens da lista
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo")
  listArr = JSON.parse(getLocalStorage)
  listArr.splice(index, 1)
  localStorage.setItem("New Todo", JSON.stringify(listArr))
  showTasks()
}

//apagar todas tarefas
deleteAllButtons.onclick = () => {
  listArr = []
  localStorage.setItem("New Todo", JSON.stringify(listArr))
  showTasks()
}
