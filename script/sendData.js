const url = "https://script.google.com/macros/s/AKfycbzZQpepL9-50tcWJVLdh-5SbOzTvK3vpxhrxs-inLL0j8_-mqx7w_0oGZU75aaq0yz51A/exec";
let paket = document.getElementById('paket');
const harga = document.getElementById('harga');

paket.addEventListener('input', function () {
    if (paket.value === 'Normal') {
        harga.innerHTML = "50.000";
    } else if (paket.value === 'Menengah') {
        harga.innerHTML = "75.000";
    } else if (paket.value === 'Lengkap') {
        harga.innerHTML = "100.000";
    }
});

//Send Data
document.getElementById("btnSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById('modalLoad').style.display = 'block';
    sendData();
});

async function sendData() {
    const konfirm = document.getElementById('konfirm');
    if (!konfirm.checked) {
        const modal = document.getElementById('modalPopUp');
        const h1Modal = document.getElementById('headModal');
        const pModal = document.getElementById('textModal');
        modal.style.display='block';
        h1Modal.innerHTML="Ada yang terlewat";
        pModal.innerHTML="Harap centang kolom konfirmasi terlebih dahulu";
        return;
    }

    try {
        const IDpesanan = new Date().getTime();

        const data = {
            IDpesanan,
            NamaLengkapL: document.getElementById('NamaLengkapL').value.trim(),
            PanggilanL: document.getElementById('PanggilanL').value.trim(),
            AnakKeL: document.getElementById('AnakKeL').value.trim(),
            JumlahSaudaraL: document.getElementById('JumlahSaudaraL').value.trim(),
            NamaAyahL: document.getElementById('NamaAyahL').value.trim(),
            NamaIbuL: document.getElementById('NamaIbuL').value.trim(),

            NamaLengkapP: document.getElementById('NamaLengkapP').value.trim(),
            PanggilanP: document.getElementById('PanggilanP').value.trim(),
            AnakKeP: document.getElementById('AnakKeP').value.trim(),
            JumlahSaudaraP: document.getElementById('JumlahSaudaraP').value.trim(),
            NamaAyahP: document.getElementById('NamaAyahP').value.trim(),
            NamaIbuP: document.getElementById('NamaIbuP').value.trim(),

            LokasiAcara: document.getElementById('LokasiAcara').value.trim(),
            TanggalAcara: document.getElementById('TanggalAcara').value,
            JamMulai: document.getElementById('JamMulai').value,
            JamSelesai: document.getElementById('JamSelesai').value,
            Email: document.getElementById('Emailed').value.trim(),
            NoHP: document.getElementById('NoHP').value.trim(),
            Agama: document.getElementById('agama').value,
            Paket: document.getElementById('paket').value,
            Tema: document.getElementById('tema').value,
            Cerita: document.getElementById('Cerita').value.trim()
        };

        // Ambil file
        const fileInput = document.getElementById('fileInput');
        const files = fileInput.files;
        
        // Konversi file ke Base64
        const fileArray = [];
        for (let file of files) {
            const base64File = await toBase64(file);
            fileArray.push({
                name: file.name,
                type: file.type,
                content: base64File
            });
        }

        // Gabungkan data dan file
        const payload = {
            ...data,
            files: fileArray
        };

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.status === "success") {
            document.getElementById('modalLoad').style.display = 'none';
            const modal = document.getElementById('modalPopUp');
            modal.style.display='block';
            location.reload();
        } else {
            document.getElementById('modalLoad').style.display = 'none';
            const modal = document.getElementById('modalPopUp');
            const h1Modal = document.getElementById('headModal');
            const pModal = document.getElementById('textModal');

            modal.style.display='block';
            h1Modal.innerHTML="Maaf terjadi kesalahan";
            pModal.innerHTML="Harap mengisi data yang wajib di isi";
        }
    }
    catch (error) {
        console.log(error);
        alert('Data gagal terkirim');
    }
}

// Fungsi untuk mengubah file ke Base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); // Ambil hanya data base64-nya
        reader.onerror = (error) => reject(error);
    });
}
function closeModal(){
    const modal = document.getElementById('modalPopUp');
    modal.style.display= 'none';
}

