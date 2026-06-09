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

// ══════════════════════════════════════════
// 漢堡選單 Hamburger Menu
// ══════════════════════════════════════════
(function () {
  const pg = window.location.pathname.split('/').pop() || 'index.html';
  const is = (f) => pg === f ? ' hb-active' : '';

  const html = `
<div class="hb-overlay" id="hbOverlay"></div>
<div class="hb-panel" id="hbPanel">
  <div class="hb-header">
    <span class="hb-header-title">全站導覽</span>
    <button class="hb-close" id="hbClose"><i class="ph ph-x"></i></button>
  </div>

  <div class="hb-group">
    <div class="hb-group-label">主頁</div>
    <a href="index.html" class="hb-link${is('index.html')}">
      <i class="ph ph-house-simple hb-icon"></i>企業創新管理 · 期末
    </a>
  </div>
  <div class="hb-divider"></div>

  <div class="hb-group">
    <div class="hb-group-label">I · 筆記</div>
    <a href="index.html#section-notes" class="hb-link">
      <i class="ph ph-note hb-icon"></i>課堂筆記
    </a>
  </div>
  <div class="hb-divider"></div>

  <div class="hb-group">
    <div class="hb-group-label">II · MBS 經營模擬</div>
    <a href="mbs_index.html" class="hb-link${is('mbs_index.html')}">
      <i class="ph-fill ph-trophy hb-icon" style="color:var(--amber)"></i>MBS 首頁
    </a>
    <a href="ranking.html" class="hb-link hb-sub${is('ranking.html')}">
      <i class="ph ph-ranking hb-icon"></i>最終排名
    </a>
    <a href="journey.html" class="hb-link hb-sub${is('journey.html')}">
      <i class="ph ph-chart-line-up hb-icon"></i>十期成長歷程
    </a>
    <a href="strategy.html" class="hb-link hb-sub${is('strategy.html')}">
      <i class="ph ph-target hb-icon"></i>策略解析
    </a>
    <a href="analysis.html" class="hb-link hb-sub${is('analysis.html')}">
      <i class="ph ph-magnifying-glass-plus hb-icon"></i>深度分析
    </a>
    <a href="conclusion.html" class="hb-link hb-sub${is('conclusion.html')}">
      <i class="ph ph-lightbulb hb-icon"></i>心得與結論
    </a>
  </div>
  <div class="hb-divider"></div>

  <div class="hb-group">
    <div class="hb-group-label">III · WFM 作業</div>
    <a href="index.html#section-wfm" class="hb-link">
      <i class="ph ph-file-text hb-icon"></i>彈性週作業
    </a>
  </div>
  <div class="hb-divider"></div>

  <div class="hb-group">
    <div class="hb-group-label">IV · 學期專案</div>
    <a href="gogoro.html" class="hb-link${is('gogoro.html')}">
      <i class="ph ph-lightning hb-icon"></i>Gogoro 產業分析
    </a>
  </div>
</div>`;

  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', html);

    const btn = document.getElementById('hbBtn');
    btn && btn.addEventListener('click', openMenu);
    document.getElementById('hbClose').addEventListener('click', closeMenu);
    document.getElementById('hbOverlay').addEventListener('click', closeMenu);
    document.querySelectorAll('.hb-link').forEach(l => l.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  });

  function openMenu() {
    document.getElementById('hbPanel').classList.add('open');
    document.getElementById('hbOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    document.getElementById('hbPanel').classList.remove('open');
    document.getElementById('hbOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }
})();

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
