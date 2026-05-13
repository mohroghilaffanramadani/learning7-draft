// Tombol Daftar utama
document.getElementById('btnDaftar').addEventListener('click', function() {
  alert('Terima kasih! Pendaftaran Anda akan segera diproses. Hubungi admin untuk info kelas minggu depan.');
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
  
  sliderContainer.style.cursor = 'grab';
}

// ========== FORM PENDAFTARAN ==========
const formPendaftaran = document.getElementById('formPendaftaran');
let formSubmitted = false;

if (formPendaftaran) {
  formPendaftaran.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (formSubmitted) {
      alert("Data sudah terkirim sebelumnya. Tidak perlu diulangi lagi.");
      return;
    }
    
    const nama = document.getElementById('namaLengkap').value.trim();
    const wa = document.getElementById('wa').value.trim();
    const email = document.getElementById('email').value.trim();
    const program = document.getElementById('program').value;
    
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
    
    alert(`✅ Terima kasih ${nama}!\n\nData pendaftaran Anda:\n📞 WA: +62 ${wa}\n📧 Email: ${email || '-'}\n📚 Program: ${program}\n\nAdmin akan menghubungi Anda segera.`);
    
    formSubmitted = true;
  });
}

// ========== FAQ DROPDOWN ==========
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
    });
    
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// ========== HAMBURGER MENU ==========
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.querySelector('.nav-links');

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

window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

// ========== DRAG TO SCROLL PROGRAM CONTAINER ==========
const programContainer = document.querySelector('.program-container');

if (programContainer) {
  let isDown2 = false;
  let startX2;
  let scrollLeft2;

  programContainer.addEventListener('mousedown', (e) => {
    isDown2 = true;
    programContainer.style.cursor = 'grabbing';
    startX2 = e.pageX - programContainer.offsetLeft;
    scrollLeft2 = programContainer.scrollLeft;
  });

  programContainer.addEventListener('mouseleave', () => {
    isDown2 = false;
    programContainer.style.cursor = 'grab';
  });

  programContainer.addEventListener('mouseup', () => {
    isDown2 = false;
    programContainer.style.cursor = 'grab';
  });

  programContainer.addEventListener('mousemove', (e) => {
    if (!isDown2) return;
    e.preventDefault();
    const x = e.pageX - programContainer.offsetLeft;
    const walk = (x - startX2) * 1.5;
    programContainer.scrollLeft = scrollLeft2 - walk;
  });

  programContainer.addEventListener('touchstart', (e) => {
    isDown2 = true;
    startX2 = e.touches[0].pageX - programContainer.offsetLeft;
    scrollLeft2 = programContainer.scrollLeft;
  });

  programContainer.addEventListener('touchmove', (e) => {
    if (!isDown2) return;
    const x = e.touches[0].pageX - programContainer.offsetLeft;
    const walk = (x - startX2) * 1.5;
    programContainer.scrollLeft = scrollLeft2 - walk;
  });

  programContainer.addEventListener('touchend', () => {
    isDown2 = false;
  });

  programContainer.style.cursor = 'grab';
}

// ========== DROPDOWN PROGRAM - HANYA 1 TERBUKA (PERBAIKAN) ==========
document.querySelectorAll('.btn-detail').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const targetId = this.getAttribute('data-target');
    const targetDropdown = document.getElementById(targetId);
    const isOpen = targetDropdown.classList.contains('show');
    
    // Tutup semua dropdown
    document.querySelectorAll('.program-dropdown').forEach(dropdown => {
      dropdown.classList.remove('show');
    });
    
    // Reset semua tombol ke tampilan awal (gunakan arrow span)
    document.querySelectorAll('.btn-detail').forEach(button => {
      const textSpan = button.querySelector('span:first-child');
      const arrowSpan = button.querySelector('.arrow');
      if (textSpan && arrowSpan) {
        // Jika struktur pakai span
        arrowSpan.innerHTML = '▼';
      } else {
        // Jika struktur plain text
        button.innerText = 'Lihat Detail Program ▼';
      }
      button.classList.remove('active');
    });
    
    // Buka dropdown yang diklik jika belum terbuka
    if (!isOpen) {
      targetDropdown.classList.add('show');
      const arrowSpan = this.querySelector('.arrow');
      if (arrowSpan) {
        arrowSpan.innerHTML = '▲';
      } else {
        this.innerText = 'Lihat Detail Program ▲';
      }
      this.classList.add('active');
    }
  });
});

// ========== VIDEO MODAL UNTUK LEARNING SECTION ==========
const openVideoBtn1 = document.getElementById('openVideoModal1');
const videoModal1 = document.getElementById('videoModal1');
const closeModalBtn1 = document.querySelector('#videoModal1 .close-modal');
const modalVideo1 = document.getElementById('modalVideo1');

if (openVideoBtn1 && videoModal1 && modalVideo1) {
  openVideoBtn1.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    videoModal1.style.display = 'flex';
    modalVideo1.load();
    modalVideo1.play().catch(err => console.log('Play error:', err));
  });

  if (closeModalBtn1) {
    closeModalBtn1.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      videoModal1.style.display = 'none';
      modalVideo1.pause();
      modalVideo1.currentTime = 0;
    });
  }

  videoModal1.addEventListener('click', (e) => {
    if (e.target === videoModal1) {
      videoModal1.style.display = 'none';
      modalVideo1.pause();
      modalVideo1.currentTime = 0;
    }
  });
}

// ========== VIDEO MODAL UNTUK ALASAN SECTION ==========
const openVideoBtn2 = document.getElementById('openVideoModal2');
const videoModal2 = document.getElementById('videoModal2');
const closeModalBtn2 = document.querySelector('#videoModal2 .close-modal');
const modalVideo2 = document.getElementById('modalVideo2');

if (openVideoBtn2 && videoModal2 && modalVideo2) {
  openVideoBtn2.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    videoModal2.style.display = 'flex';
    modalVideo2.load();
    modalVideo2.play().catch(err => console.log('Play error:', err));
  });

  if (closeModalBtn2) {
    closeModalBtn2.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      videoModal2.style.display = 'none';
      modalVideo2.pause();
      modalVideo2.currentTime = 0;
    });
  }

  videoModal2.addEventListener('click', (e) => {
    if (e.target === videoModal2) {
      videoModal2.style.display = 'none';
      modalVideo2.pause();
      modalVideo2.currentTime = 0;
    }
  });
}