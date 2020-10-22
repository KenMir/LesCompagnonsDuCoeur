const navtoto = () => {

    const btnresponsive = document.querySelector('.burger');

    const nav = document.querySelector('.nav-links');

    const Navlinks = document.querySelectorAll('.nav-links li')

    btnresponsive.addEventListener('click', () => {
        // lancer animation

        btnresponsive.classList.toggle('active');
        nav.classList.toggle('nav-active');
    });
}
// console.log(navtoto);
navtoto();