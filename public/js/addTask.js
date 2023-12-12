const buttonAddTask = document.getElementById('button-addTasks');
const buttonCloseModal = document.getElementById('buttonCloseModal')
const myModal = document.getElementById('meuModal');
const buttonSendTask = document.getElementById('buttonSendTask');


buttonAddTask.addEventListener('click', () =>{
    myModal.style.display = "flex";
});

window.addEventListener('click', function(event) {
    if (event.target === myModal){
        myModal.style.display = "none";
    }
});

buttonCloseModal.addEventListener('click', ()=>{
    myModal.style.display = "none";
    //implementar limpar todos o campos
});

