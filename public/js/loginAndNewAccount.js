


// Objeto de configuração da solicitação
async function getJson(){
    fetch('http://localhost:3000/newAccount')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro ao fazer a solicitação:', error));
}  

getJson();
alert('executouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
console.log('executouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');