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

function validateForm() {
    // Obtém os valores dos campos
    var title = document.forms["taskForm"]["title"].value;
    var description = document.forms["taskForm"]["description"].value;

    // Verifica se os campos estão vazios
    if (title === "" || description === "") {
        alert("Por favor, preencha todos os campos antes de enviar o formulário.");
    } else {
        // Se os campos não estiverem vazios, você pode enviar o formulário ou realizar outras ações necessárias
        document.getElementById("taskForm").submit();
        
    }
}
