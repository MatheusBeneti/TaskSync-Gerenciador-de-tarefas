document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('themeSwitch');
    const divMain = document.getElementById('div-main');
    
    // Recupera o estado do tema do armazenamento local
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';

    // Atualiza o estado do tema com base no armazenamento local
    if (isDarkMode) {
        divMain.style.backgroundColor = '#333';
        themeSwitch.checked = true;
        document.body.classList.add('dark-mode');
    }

    // Adiciona um ouvinte de evento para a mudança do interruptor
    themeSwitch.addEventListener('change', function () {
        const isChecked = themeSwitch.checked;
        divMain.style.backgroundColor = isChecked ? '#333' : '#f5f5f5';

        // Atualiza o armazenamento local com o estado do tema
        localStorage.setItem('isDarkMode', isChecked);
        
        // Adiciona ou remove a classe 'dark-mode' do corpo conforme necessário
        document.body.classList.toggle('dark-mode', isChecked);
    });
});
