function addSidebar() {
    const sidebar = document.querySelector(".navigation");
    const mainContent = document.querySelector("#main-content");
  
    mainContent.appendChild(sidebar);
  }
  
  // Adiciona o menu lateral à página "/account"
  document.querySelector(".account").addEventListener("click", function() {
    addSidebar();
  });