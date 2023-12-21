// userPage.js

const saveChangesBtn = document.querySelector('.btn-primary');

saveChangesBtn.addEventListener('click', function () {
   
        // Obtenha os valores dos campos
        const empresaInputValue = document.getElementById('empresaInput').value;
        const dataNascimentoInputValue = document.getElementById('dataNascimentoInput').value;
        const paisInputValue = document.getElementById('paisInput').value;
        const celularInputValue = document.getElementById('celularInput').value;

        // Construa um objeto com os dados que deseja enviar ao servidor
        const userDataToUpdate = {
            newCompany: empresaInputValue,
            newBirthDate: dataNascimentoInputValue,
            newCountry: paisInputValue,
            newPhone: celularInputValue
            // Adicione outros campos, se necessário
        };

        // Faça a solicitação ao servidor para atualizar os dados
        fetch('/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDataToUpdate),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados atualizados com sucesso:', data);

            // Adicione lógica adicional conforme necessário

        })
        .catch(error => {
            console.error('Erro ao atualizar dados:', error);

            // Adicione lógica de tratamento de erro conforme necessário
        });
});
