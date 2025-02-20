document.getElementById("btnNext").addEventListener("click", nextForm);
document.getElementById("btnBack").addEventListener("click", backForm);

function nextForm(event) {
    if (event) event.preventDefault(); // Mencegah reload halaman

    const form1 = document.querySelectorAll('.sectionBox');
    const gal = document.getElementById('DataPernikahan');
    const btnNext = document.getElementById('btnNext');
    const btnBack = document.getElementById('btnBack');
    const validasi = document.querySelector('.validasi');
    const btnSubmit = document.getElementById('btnSubmit');

    form1.forEach(section => toggleRequiredInputs(section, false));

    form1.forEach(section => {
        section.style.display = 'none';
    });

    if (gal) {
        gal.style.display = 'grid';
        btnNext.style.display = 'none';
        btnBack.style.display = 'grid';
        validasi.style.display = 'block';
        btnSubmit.style.display = 'block';

        toggleRequiredInputs(gal, true);

        gal.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        console.error("Elemen dengan ID 'DataPernikahan' tidak ditemukan.");
    }
}


function backForm(event) {
    if (event) event.preventDefault();
    const form1 = document.querySelectorAll('.sectionBox');
    const gal = document.getElementById('DataPernikahan');
    const btnNext = document.getElementById('btnNext');
    const btnBack = document.getElementById('btnBack');
    const validasi = document.querySelector('.validasi');
    const btnSubmit = document.getElementById('btnSubmit');

    toggleRequiredInputs(gal, false);

    gal.style.display = 'none';

    form1.forEach(section => {
        section.style.display = 'grid';
    });

    btnNext.style.display = 'block';
    btnBack.style.display = 'none';
    validasi.style.display = 'none';
    btnSubmit.style.display = 'none';
    form1.forEach(section => toggleRequiredInputs(section, true));
    form1[0].scrollIntoView({ behavior: "smooth", block: "start" });
}


function toggleRequiredInputs(container, isRequired) {
    const inputs = container.querySelectorAll("input[required], select[required], textarea[required]");
    inputs.forEach(input => {
        if (!isRequired) {
            input.dataset.originalRequired = input.required; // Simpan status required
            input.required = false;
        } else {
            input.required = input.dataset.originalRequired === "true"; // Pulihkan status required
        }
    });
}