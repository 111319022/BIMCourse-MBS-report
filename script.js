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
    Chart.defaults.color = '#7A8A9A';
    Chart.defaults.borderColor = 'rgba(27,42,74,0.07)';
    Chart.defaults.font.family = '"Noto Sans TC","Microsoft JhengHei",sans-serif';
    Chart.defaults.font.size = 13;
    Chart.defaults.plugins.tooltip.padding = 14;
    Chart.defaults.plugins.tooltip.cornerRadius = 10;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(13,21,32,0.92)';
    Chart.defaults.plugins.tooltip.titleColor = '#F5F0E8';
    Chart.defaults.plugins.tooltip.bodyColor = '#B0BEC8';
    Chart.defaults.plugins.tooltip.titleFont = { size: 13, weight: '600' };
    Chart.defaults.plugins.tooltip.bodyFont = { size: 13 };
    Chart.defaults.plugins.legend.labels.font = { size: 13 };
    Chart.defaults.scale.ticks.font = { size: 12 };
    Chart.defaults.plugins.legend.labels.boxWidth = 12;
    Chart.defaults.plugins.legend.labels.padding = 18;
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
