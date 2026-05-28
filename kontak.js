document.addEventListener("DOMContentLoaded", () => {
  const formKontak = document.getElementById("formKontak");
  
  if (formKontak) {
    formKontak.addEventListener("submit", (e) => {
      e.preventDefault(); 

      // Ambil value input data terbaru dan bersihkan spasi di awal/akhir (.trim)
      const nama = document.getElementById("nama").value.trim();
      const usia = document.getElementById("usia").value.trim();
      const subjek = document.getElementById("subjek").value;
      const pesan = document.getElementById("pesan").value.trim();

      // Nomor WhatsApp Admin Utama
      const nomorAdmin = "6282229093171";

      // Susun teks pesan dengan struktur yang sangat rapi dan estetik
      const strukturPesan = `📩 *PESAN BARU - LEARNING 7 MALANG*
──────────────────────────

👤 *Data Pengirim:*
• *Nama :* ${nama}
• *Usia :* ${usia} Tahun

📌 *Detail Pertanyaan:*
• *Topik / Subjek :* ${subjek}
• *Isi Pesan :*
"${pesan}"

──────────────────────────
_Pesan ini dikirim otomatis melalui Formulir Kontak Web._`;

      // Encode otomatis string pesan agar aman dibaca oleh URL WhatsApp
      const teksPesan = encodeURIComponent(strukturPesan);

      // Lempar data dan buka aplikasi WhatsApp menggunakan link wa.me yang universal
      window.open(`https://wa.me/${nomorAdmin}?text=${teksPesan}`, "_blank");
    });
  }
});