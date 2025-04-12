const hamburgerElement = document.getElementById('myButton');
const navElement = document.querySelector('#animate');

hamburgerElement.addEventListener('click', () =>{
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
})