const buttonAddFriend = document.getElementById("button-addFriends");
const myModal = document.getElementById("modalAddFriend");
const buttonCloseModal = document.getElementById("buttonCloseModaladdFriends");

buttonAddFriend.addEventListener('click', () =>{
    myModal.style.display = "flex";
});

buttonCloseModal.addEventListener('click', ()=>{
    myModal.style.display = "none";
    //implementar limpar todos o campos
});