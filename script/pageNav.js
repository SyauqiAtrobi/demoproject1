function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
    navbar.style.zIndex="100";
}

function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
}


function showContent(sectionId) {
    // Sembunyikan 
    const sections = document.querySelectorAll('.content-select');
    sections.forEach(section => section.classList.add('d-none'));

    // Tampilkan 
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('d-none');
        selectedSection.classList.add('d-block');
    }

    // hapus
    const links = document.querySelectorAll(".link");
    links.forEach(link => {
        link.classList.remove("actived");
    });

    // active
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.parentElement.classList.add('actived');
    }
}