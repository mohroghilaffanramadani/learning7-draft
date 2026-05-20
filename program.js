document.addEventListener("DOMContentLoaded", function() {
    // 1. Tangkap Parameter
    const urlParams = new URLSearchParams(window.location.search);
    const kelasType = urlParams.get('kelas'); 

    // 2. Deklarasi Elemen Utama
    const programSelect = document.getElementById("programSelect");
    const judulKelas = document.getElementById("judulKelas");
    
    // Elemen Input
    const boxJadwalReguler = document.getElementById("boxJadwalReguler");
    const inputJadwal = document.getElementById("jadwal");
    const boxJadwalPrivate = document.getElementById("boxJadwalPrivate"); // Dipakai untuk Private & Grammar
    
    const boxPaketPrivate = document.getElementById("boxPaketPrivate");
    const inputPaket = document.getElementById("paket");
    const boxPaketOnline = document.getElementById("boxPaketOnline");
    const inputPaketOnline = document.getElementById("paketOnline");
    const boxPaketGrammar = document.getElementById("boxPaketGrammar");
    const inputPaketGrammar = document.getElementById("paketGrammar");

    // Elemen Info Bawah
    const infoReguler = document.getElementById("infoReguler");
    const infoPrivate = document.getElementById("infoPrivate");
    const infoOnline = document.getElementById("infoOnline");
    const infoGrammar = document.getElementById("infoGrammar");

    // 3. Fungsi Tampilan Cerdas
    function updateFormDisplay() {
        // Reset/Sembunyikan semua fitur spesifik dulu
        boxJadwalReguler.style.display = "none";
        inputJadwal.removeAttribute("required");
        boxJadwalPrivate.style.display = "none";
        boxPaketPrivate.style.display = "none";
        inputPaket.removeAttribute("required");
        boxPaketOnline.style.display = "none";
        inputPaketOnline.removeAttribute("required");
        boxPaketGrammar.style.display = "none";
        inputPaketGrammar.removeAttribute("required");

        infoReguler.style.display = "none";
        infoPrivate.style.display = "none";
        infoOnline.style.display = "none";
        infoGrammar.style.display = "none";

        // Tampilkan sesuai pilihan dropdown
        if (programSelect.value === "private") {
            judulKelas.innerText = "Private Offline";
            boxJadwalPrivate.style.display = "flex";
            boxPaketPrivate.style.display = "flex";
            inputPaket.setAttribute("required", "true");
            infoPrivate.style.display = "block";

        } else if (programSelect.value === "online") {
            judulKelas.innerText = "Private Online";
            boxJadwalPrivate.style.display = "flex"; 
            boxPaketOnline.style.display = "flex";
            inputPaketOnline.setAttribute("required", "true");
            infoOnline.style.display = "block";

        } else if (programSelect.value === "grammar") {
            judulKelas.innerText = "Grammar Focus";
            boxJadwalPrivate.style.display = "flex"; // Jadwal Grammar fleksibel
            boxPaketGrammar.style.display = "flex";
            inputPaketGrammar.setAttribute("required", "true");
            infoGrammar.style.display = "block";

        } else {
            // Default: Reguler
            judulKelas.innerText = "Kelas Bersama";
            boxJadwalReguler.style.display = "flex";
            inputJadwal.setAttribute("required", "true"); 
            infoReguler.style.display = "block";
        }
    }

    // 4. Deteksi Pilihan Awal
    if (kelasType === "private") {
        programSelect.value = "private";
    } else if (kelasType === "online") {
        programSelect.value = "online";
    } else if (kelasType === "grammar") {
        programSelect.value = "grammar";
    } else {
        programSelect.value = "reguler"; 
    }
    
    updateFormDisplay();
    programSelect.addEventListener("change", updateFormDisplay);

    // 5. Submit WA
    const form = document.getElementById("daftarForm");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const programName = programSelect.options[programSelect.selectedIndex].text;
            const nama = document.getElementById("nama").value;
            const usia = document.getElementById("usia").value;
            const gender = document.getElementById("gender").value;
            const status = document.getElementById("status").value;
            const pembayaran = document.getElementById("pembayaran").value;
            
            let pesanWA = `Halo Admin Go English, saya tertarik dengan kelas:\n\n` +
                          `*Program:* ${programName}\n` +
                          `*Nama Lengkap:* ${nama}\n` +
                          `*Usia:* ${usia} Tahun\n` +
                          `*Gender:* ${gender}\n` +
                          `*Status:* ${status}\n`;

            if (programSelect.value === "private") {
                pesanWA += `*Jadwal Pilihan:* Fleksibel\n`;
                pesanWA += `*Paket:* ${document.getElementById("paket").value}\n`;
            } else if (programSelect.value === "online") {
                pesanWA += `*Jadwal Pilihan:* Fleksibel\n`;
                pesanWA += `*Paket:* ${document.getElementById("paketOnline").value}\n`;
            } else if (programSelect.value === "grammar") {
                pesanWA += `*Jadwal Pilihan:* Fleksibel\n`;
                pesanWA += `*Jumlah Rombongan:* ${document.getElementById("paketGrammar").value}\n`;
            } else {
                pesanWA += `*Jadwal Pilihan:* ${document.getElementById("jadwal").value}\n`;
            }

            pesanWA += `*Metode Pembayaran:* ${pembayaran}\n\n` +
                       `Mohon informasi lebih lanjut ya. Terima kasih!`;

            const noWA = "6282229093171";
            const urlWA = `https://wa.me/${noWA}?text=${encodeURIComponent(pesanWA)}`;
            window.open(urlWA, "_blank");
        });
    }
});