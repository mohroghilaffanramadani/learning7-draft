// Tab Navigation
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    
    // Remove active class from all buttons and panes
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    
    // Add active class to clicked button and corresponding pane
    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// Like button functionality
document.querySelectorAll('.review-like').forEach(btn => {
  btn.addEventListener('click', function() {
    if (this.textContent.includes('👍 Suka')) {
      this.textContent = '❤️ Disukai';
      this.style.color = '#E67E22';
    } else {
      this.textContent = '👍 Suka';
      this.style.color = '#6B7280';
    }
  });
});

// Share button
document.querySelectorAll('.review-share').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('🔗 Link review telah disalin! Bagikan ke teman-teman Anda.');
  });
});

// Load more reviews
document.querySelector('.load-more')?.addEventListener('click', () => {
  alert('📱 96 ulasan lainnya akan ditampilkan. Hubungi admin untuk info lengkap!');
});

// Action buttons
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const action = e.target.textContent;
    alert(`📍 ${action} - Anda akan diarahkan ke Google Maps.`);
  });
});