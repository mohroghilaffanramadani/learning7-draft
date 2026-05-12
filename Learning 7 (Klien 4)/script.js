// Tombol Daftar utama
document.getElementById('btnDaftar').addEventListener('click', function() {
  alert('Terima kasih! Pendaftaran Anda akan segera diproses. Hubungi admin untuk info kelas minggu depan.');
});

// DROPDOWN: HANYA 1 YANG TERBUKA - PASTI BERHASIL
document.querySelectorAll('.btn-detail').forEach(button => {
  button.addEventListener('click', function() {
    // Ambil target dropdown dari atribut data-target
    const targetId = this.getAttribute('data-target');
    const targetDropdown = document.getElementById(targetId);
    
    // Cek apakah dropdown ini sedang terbuka
    const isOpen = targetDropdown.classList.contains('show');
    
    // TUTUP SEMUA DROPDOWN
    document.querySelectorAll('.program-dropdown').forEach(dropdown => {
      dropdown.classList.remove('show');
    });
    
    // UBAH SEMUA TOMBOL jadi ▼
    document.querySelectorAll('.btn-detail').forEach(btn => {
      btn.innerHTML = btn.innerHTML.replace('▲', '▼');
    });
    
    // Jika sebelumnya TIDAK terbuka, maka buka yang diklik
    if (!isOpen) {
      targetDropdown.classList.add('show');
      this.innerHTML = this.innerHTML.replace('▼', '▲');
    }
    // Jika sebelumnya SUDAH terbuka, maka biarkan tertutup (karena sudah ditutup di atas)
  });
});

// Tombol Daftar Sekarang di setiap program
document.querySelectorAll('.btn-daftar-program').forEach(button => {
  button.addEventListener('click', function() {
    const programCard = this.closest('.program-card');
    const programName = programCard.querySelector('.program-name').innerText;
    alert(`✅ Pendaftaran untuk "${programName}" telah diterima!\nAdmin akan menghubungi Anda.`);
  });
});

// ========== DRAG TO SCROLL UNTUK SLIDER PENGAJAR ==========
const sliderContainer = document.getElementById('sliderContainer');
let isDown = false;
let startX;
let scrollLeft;

if (sliderContainer) {
  sliderContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    sliderContainer.style.cursor = 'grabbing';
    startX = e.pageX - sliderContainer.offsetLeft;
    scrollLeft = sliderContainer.scrollLeft;
  });
  
  sliderContainer.addEventListener('mouseleave', () => {
    isDown = false;
    sliderContainer.style.cursor = 'grab';
  });
  
  sliderContainer.addEventListener('mouseup', () => {
    isDown = false;
    sliderContainer.style.cursor = 'grab';
  });
  
  sliderContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderContainer.scrollLeft = scrollLeft - walk;
  });
  
  // Set default cursor
  sliderContainer.style.cursor = 'grab';
}

// ========== FORM PENDAFTARAN ==========
const formPendaftaran = document.getElementById('formPendaftaran');
let formSubmitted = false;

if (formPendaftaran) {
  formPendaftaran.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Cek apakah sudah pernah submit
    if (formSubmitted) {
      alert("Data sudah terkirim sebelumnya. Tidak perlu diulangi lagi.");
      return;
    }
    
    // Ambil data
    const nama = document.getElementById('namaLengkap').value.trim();
    const wa = document.getElementById('wa').value.trim();
    const email = document.getElementById('email').value.trim();
    const program = document.getElementById('program').value;
    
    // Validasi
    if (!nama) {
      alert("Silakan isi Nama Lengkap Anda.");
      return;
    }
    
    if (!wa) {
      alert("Silakan isi Nomor WhatsApp Anda.");
      return;
    }
    
    if (!program || program === "") {
      alert("Silakan pilih Program yang Anda minati.");
      return;
    }
    
    // Konfirmasi dan kirim
    alert(`✅ Terima kasih ${nama}!\n\nData pendaftaran Anda:\n📞 WA: +62 ${wa}\n📧 Email: ${email || '-'}\n📚 Program: ${program}\n\nAdmin akan menghubungi Anda segera.`);
    
    // Tandai sudah submit
    formSubmitted = true;
    
    // Reset form (opsional, biar ga dikirim lagi)
    // formPendaftaran.reset();
    
    // Bisa tambahkan pengiriman ke server di sini jika diperlukan
  });
}

// ========== FAQ DROPDOWN (HANYA 1 TERBUKA) ==========
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Tutup semua FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Buka yang diklik jika belum aktif
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// ========== HAMBURGER MENU UNTUK 768px ==========
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.querySelector('.nav-links');

// Buat overlay
let overlay = document.querySelector('.nav-overlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
}

function toggleMenu() {
  hamburgerBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
  
  if (navLinks.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMenu() {
  hamburgerBtn.classList.remove('active');
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', toggleMenu);
}

if (overlay) {
  overlay.addEventListener('click', closeMenu);
}

document.querySelectorAll('.nav-links li a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Resize handler untuk tutup menu saat ke desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
// ========== PASTIKAN HORIZONTAL SCROLL BISA DIGESER ==========
// Cara 1: Native scroll (udah bisa tanpa JS, tapi pastiin overflow-x:scroll)

// Cara 2: DRAG TO SCROLL (opsional, biar bisa digeser pakai mouse/touch)
const programContainer = document.querySelector('.program-container');

if (programContainer) {
  let isDown = false;
  let startX;
  let scrollLeft;

  // Mouse/Touch down
  programContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    programContainer.style.cursor = 'grabbing';
    startX = e.pageX - programContainer.offsetLeft;
    scrollLeft = programContainer.scrollLeft;
  });

  // Mouse/Touch leave
  programContainer.addEventListener('mouseleave', () => {
    isDown = false;
    programContainer.style.cursor = 'grab';
  });

  // Mouse/Touch up
  programContainer.addEventListener('mouseup', () => {
    isDown = false;
    programContainer.style.cursor = 'grab';
  });

  // Mouse/Touch move
  programContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - programContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    programContainer.scrollLeft = scrollLeft - walk;
  });

  // Untuk touch screen (HP)
  programContainer.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - programContainer.offsetLeft;
    scrollLeft = programContainer.scrollLeft;
  });

  programContainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - programContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    programContainer.scrollLeft = scrollLeft - walk;
  });

  programContainer.addEventListener('touchend', () => {
    isDown = false;
  });

  programContainer.style.cursor = 'grab';
}

// DEBUG: Cek apakah element nya ada
console.log('Program container:', document.querySelector('.program-container'));