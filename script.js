document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Scroll fade-in ──────────────────────────────────
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── 2. Active nav link ────────────────────────────────
  const page = window.location.pathname.split('/').pop().replace('.html','') || 'index';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  // ── 3. Chart.js global defaults ──────────────────────
  if (window.Chart) {
    Chart.defaults.color = '#8C7B68';
    Chart.defaults.borderColor = 'rgba(60,40,20,0.07)';
    Chart.defaults.font.family = '"Noto Sans TC","Microsoft JhengHei",sans-serif';
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(30,22,13,0.88)';
    Chart.defaults.plugins.tooltip.titleColor = '#F7F3EC';
    Chart.defaults.plugins.tooltip.bodyColor = '#C4B8AA';
  }
});

// ── Tab switching ─────────────────────────────────────
window.switchTab = function(id, event) {
  const section = event.currentTarget.closest('.tab-section');
  section.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  section.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  section.querySelector('#tab-' + id).classList.add('active');
  event.currentTarget.classList.add('active');
};

// ── Shared chart helpers ──────────────────────────────
window.makeLineOpts = (yLabel, yFmt) => ({
  responsive: true, maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: { legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } } },
  scales: {
    x: { grid: { display: false } },
    y: {
      grid: { color: 'rgba(60,40,20,0.07)' },
      ticks: { callback: yFmt || (v => v) },
      title: { display: !!yLabel, text: yLabel, color: '#8C7B68', font: { size: 12 } }
    }
  }
});
