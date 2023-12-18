document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('themeSwitch');
    const divMain = document.getElementById('div-main');
    
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';

    if (isDarkMode) {
        divMain.style.backgroundColor = '#333';
        themeSwitch.checked = true;
        document.body.classList.add('dark-mode');
    }

    themeSwitch.addEventListener('change', function () {
        const isChecked = themeSwitch.checked;
        divMain.style.backgroundColor = isChecked ? '#333' : '#f5f5f5';

        localStorage.setItem('isDarkMode', isChecked);
    
        document.body.classList.toggle('dark-mode', isChecked);
    });
});
