const buttonAddTask = document.getElementById('button-addTasks');
const myModal = document.getElementById('meuModal');


buttonAddTask.addEventListener('click', () =>{
    myModal.style.display = "flex";
});

window.addEventListener('click', function(event) {
    if (event.target === myModal){
        myModal.style.display = "none";
    }
});