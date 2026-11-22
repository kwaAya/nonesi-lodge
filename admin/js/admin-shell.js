/**
 * admin-shell.js
 * Injects the demo banner + shared nav sidebar into every admin page.
 * Call renderShell(pageId) at the top of each page's script.
 * pageId: 'dashboard' | 'rooms' | 'gallery' | 'inquiries' | 'settings'
 */

const SHELL_CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --green:#2C4235;--gold:#C86D51;--gold-h:#B35A3E;
  --bg:#FBF9F5;--surface:#F2EFE8;--ink:#2B2D2F;--muted:#6B6F6C;
  --line:rgba(44,66,53,.12);--sidebar:240px;
  --radius-card:16px;
  --shadow-card:0 4px 24px rgba(44,66,53,0.10);
  --shadow-card-hover:0 12px 40px rgba(44,66,53,0.16);
}
body{background:var(--bg);font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:14px;line-height:1.6;color:var(--ink);display:flex;flex-direction:column;min-height:100svh}

/* ── LINEN NOISE TEXTURE ── */
body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
  background-size:300px 300px}
body>*{position:relative;z-index:1}

/* ── DEMO BANNER ── */
.demo-banner{position:sticky;top:0;z-index:200;background:rgba(200,109,81,0.1);border-bottom:1px solid rgba(200,109,81,0.2);color:#B35A3E;font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:12px;font-weight:600;padding:10px 32px;display:flex;align-items:center;gap:8px;letter-spacing:0.03em}

/* ── SIDEBAR ── */
.sidebar{width:var(--sidebar);flex-shrink:0;background:var(--green);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;padding:0}

.sidebar-logo{padding:32px 24px 24px;border-bottom:1px solid rgba(255,255,255,.1)}
.sidebar-logo-text{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:1.55rem;color:#fff;display:block;line-height:1.1;letter-spacing:-0.01em}
.sidebar-logo-rule{display:block;width:32px;height:1px;background:var(--gold);margin:10px 0 6px}
.sidebar-logo-sub{font-size:9.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.32);display:block}

.sidebar-nav{flex:1;padding:20px 16px;display:flex;flex-direction:column;gap:2px}
.sidebar-link{display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:8px;font-size:12.5px;font-weight:600;color:rgba(255,255,255,.55);text-decoration:none;transition:color .2s,background .2s,transform .2s;border-left:2.5px solid transparent}
.sidebar-link:hover{background:rgba(255,255,255,.07);color:rgba(255,255,255,.9);border-left-color:rgba(200,109,81,.5);transform:translateX(4px)}
.sidebar-link.active{color:#fff;border-left-color:var(--gold)}
.sidebar-link svg{flex-shrink:0;opacity:.65}
.sidebar-link.active svg{opacity:1}
.sidebar-link:hover svg{opacity:.85}

.sidebar-foot{padding:16px;border-top:1px solid rgba(255,255,255,.08)}
.sidebar-credit{display:block;font-size:9.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.25);padding:0 14px 10px;line-height:1.4}
.sidebar-sign-out{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;font-size:11.5px;font-weight:600;color:rgba(255,255,255,.38);cursor:pointer;border:none;background:none;width:100%;transition:color .2s,background .2s}
.sidebar-sign-out:hover{color:#fff;background:rgba(255,255,255,.07)}

/* ── MAIN ── */
.main{margin-left:var(--sidebar);flex:1;display:flex;flex-direction:column;min-height:100svh}
.topbar{padding:20px 36px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;background:rgba(251,249,245,0.92);backdrop-filter:blur(12px);position:sticky;top:0;z-index:50}
.topbar-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.6rem;color:var(--green);font-style:italic;letter-spacing:-0.01em}
.topbar-actions{display:flex;gap:10px}
.page-body{padding:32px;flex:1}

/* ── STAT CARDS ── */
.stats-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:16px;margin-bottom:36px}
.stat-card{background:var(--bg);border-radius:var(--radius-card);padding:24px 22px;border:1px solid var(--line);border-left:3px solid var(--gold);box-shadow:var(--shadow-card);transition:box-shadow .25s,transform .25s}
.stat-card:hover{box-shadow:var(--shadow-card-hover);transform:translateY(-2px)}
.stat-card-num{font-family:'Cormorant Garamond',Georgia,serif;font-size:3rem;color:var(--green);line-height:1;font-weight:400}
.stat-card-label{font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:6px}

/* ── SECTION HEADER ── */
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px}
.section-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.25rem;color:var(--green);font-style:italic;letter-spacing:-0.01em}

/* ── TABLES ── */
table{width:100%;border-collapse:collapse;background:var(--bg);border-radius:var(--radius-card);overflow:hidden;border:1px solid var(--line);box-shadow:var(--shadow-card)}
thead{background:var(--green)}
th{padding:13px 18px;text-align:left;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#FBF9F5;border-bottom:1px solid rgba(255,255,255,.1)}
td{padding:14px 18px;border-bottom:1px solid var(--line);font-size:13px;vertical-align:middle}
tr:last-child td{border-bottom:none}
tbody tr:nth-child(even) td{background:rgba(44,66,53,.022)}
tbody tr:hover td{background:rgba(200,109,81,.055)}

/* ── BADGES ── */
.badge{display:inline-flex;align-items:center;padding:4px 12px;border-radius:999px;font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;white-space:nowrap}
.badge-new{background:rgba(200,109,81,.14);color:#A8502E}
.badge-contacted{background:rgba(44,66,53,.1);color:var(--green)}
.badge-confirmed{background:rgba(34,139,34,.12);color:#1A6B1A}
.badge-cancelled{background:rgba(150,150,150,.12);color:#6B6B6B}
.badge-active{background:rgba(34,139,34,.12);color:#1A6B1A}
.badge-hidden{background:rgba(150,150,150,.12);color:#6B6B6B}

/* ── FORMS ── */
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:600px){.form-grid{grid-template-columns:1fr}}
.form-full{grid-column:1/-1}
.form-group{display:flex;flex-direction:column;gap:7px}
.form-group label{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.form-group input,.form-group select,.form-group textarea{padding:12px 16px;border:1.5px solid var(--line);border-radius:10px;font-family:inherit;font-size:14px;color:var(--ink);background:var(--bg);transition:border-color .2s,box-shadow .2s;resize:vertical;-webkit-appearance:none}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(200,109,81,.12)}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:999px;border:none;font-family:inherit;font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;cursor:pointer;transition:background .2s,transform .2s,box-shadow .2s,opacity .2s;text-decoration:none;white-space:nowrap}
.btn-primary{background:var(--gold);color:#fff;box-shadow:0 4px 16px rgba(200,109,81,.28)}
.btn-primary:hover{background:var(--gold-h);transform:translateY(-1px);box-shadow:0 8px 24px rgba(200,109,81,.36)}
.btn-gold{background:var(--gold);color:#fff;box-shadow:0 4px 16px rgba(200,109,81,.28)}
.btn-gold:hover{background:var(--gold-h);transform:translateY(-1px)}
.btn-green{background:var(--green);color:#fff}
.btn-green:hover{background:#3a5544;transform:translateY(-1px)}
.btn-outline{background:transparent;color:var(--green);border:1.5px solid rgba(44,66,53,.25)}
.btn-outline:hover{background:var(--green);color:#fff;border-color:var(--green)}
.btn-danger{background:transparent;color:#B84040;border:1.5px solid rgba(184,64,64,.25)}
.btn-danger:hover{background:#B84040;color:#fff}
.btn:disabled{opacity:.45;cursor:not-allowed;transform:none!important;box-shadow:none!important}
.btn-sm{padding:7px 16px;font-size:10.5px}

/* ── MODAL ── */
.modal-backdrop{position:fixed;inset:0;background:rgba(10,16,12,.55);backdrop-filter:blur(8px);z-index:400;display:none;align-items:center;justify-content:center;padding:20px}
.modal-backdrop.open{display:flex}
.modal{background:var(--bg);border-radius:20px;padding:36px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 40px 100px rgba(0,0,0,.35);border:1px solid var(--line)}
.modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;padding-bottom:16px;border-bottom:1px solid var(--line)}
.modal-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;color:var(--green);font-style:italic}
.modal-close{background:var(--surface);border:none;cursor:pointer;color:var(--muted);font-size:18px;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:color .2s,background .2s}
.modal-close:hover{color:var(--ink);background:var(--line)}
.modal-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:28px;border-top:1px solid var(--line);padding-top:20px}

/* ── ROOM CARDS ── */
.rooms-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:22px}
.room-card{background:var(--bg);border:1px solid var(--line);border-radius:var(--radius-card);overflow:hidden;display:flex;flex-direction:column;box-shadow:var(--shadow-card);transition:box-shadow .3s,transform .3s}
.room-card:hover{box-shadow:var(--shadow-card-hover);transform:translateY(-3px)}
.room-card-img{width:100%;height:170px;object-fit:cover;background:var(--surface)}
.room-card-img-placeholder{width:100%;height:170px;background:var(--surface);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:12px;font-style:italic}
.room-card-body{padding:20px;flex:1;display:flex;flex-direction:column;gap:7px}
.room-card-name{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.25rem;color:var(--green);font-style:italic}
.room-card-price{font-size:13px;font-weight:700;color:var(--gold)}
.room-card-specs{font-size:11.5px;color:var(--muted)}
.room-card-actions{display:flex;gap:8px;padding:14px 20px;border-top:1px solid var(--line);background:var(--surface)}

/* ── UPLOAD ZONE ── */
.upload-zone{border:2px dashed rgba(200,109,81,.4);border-radius:14px;padding:40px 32px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s,transform .2s;background:rgba(200,109,81,.03);color:rgba(44,66,53,.5)}
.upload-zone:hover,.upload-zone.drag-over{border-color:var(--gold);background:rgba(200,109,81,.07);transform:scale(1.005)}
.upload-zone svg{color:var(--muted);opacity:.4;margin-bottom:12px}
.upload-zone p{font-size:13px;color:var(--muted);margin-top:8px;line-height:1.6}
.upload-zone strong{color:var(--green)}

/* ── GALLERY GRID ── */
.gallery-admin-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
@media(max-width:900px){.gallery-admin-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:600px){.gallery-admin-grid{grid-template-columns:repeat(2,1fr)}}
.gallery-admin-item{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:4/3;background:var(--surface);border:1px solid var(--line);cursor:pointer;transition:box-shadow .25s,transform .25s}
.gallery-admin-item:hover{box-shadow:0 8px 28px rgba(44,66,53,.14);transform:translateY(-2px)}
.gallery-admin-item img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.gallery-admin-item:hover img{transform:scale(1.05)}
.gallery-admin-item-actions{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.2) 60%,transparent 100%);display:flex;align-items:flex-end;justify-content:center;gap:8px;padding:12px;opacity:0;transition:opacity .25s}
.gallery-admin-item:hover .gallery-admin-item-actions{opacity:1}
.gallery-admin-item-label{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.55);color:#fff;font-size:11px;font-weight:600;padding:7px 10px;text-align:center;backdrop-filter:blur(4px)}

/* ── FILTER BAR ── */
.filter-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px}
.filter-btn{padding:8px 18px;border-radius:999px;border:1.5px solid var(--line);background:transparent;font-family:inherit;font-size:11.5px;font-weight:600;color:var(--muted);cursor:pointer;transition:all .2s;letter-spacing:.06em}
.filter-btn:hover{border-color:var(--green);color:var(--green);background:rgba(44,66,53,.05)}
.filter-btn.active{background:var(--green);color:#fff;border-color:var(--green)}

/* ── TOAST ── */
.toast{position:fixed;bottom:28px;right:28px;z-index:500;padding:14px 22px;border-radius:14px;font-size:13px;font-weight:600;color:#fff;box-shadow:0 12px 40px rgba(0,0,0,.25);opacity:1;transition:opacity .4s,transform .3s;min-width:230px;transform:translateY(0)}
.toast-success{background:var(--green)}
.toast-info{background:var(--gold)}
.toast-error{background:#B84040}

/* ── EMPTY STATE ── */
.empty-state{text-align:center;padding:72px 32px;color:var(--muted)}
.empty-state svg{opacity:.25;margin-bottom:18px;color:var(--green)}
.empty-state h3{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.3rem;color:var(--green);margin-bottom:8px;font-style:italic}
.empty-state p{font-size:13px;line-height:1.6}

/* ── MOBILE ── */
@media(max-width:768px){
  .sidebar{transform:translateX(-100%);transition:transform .3s}
  .sidebar.open{transform:translateX(0)}
  .main{margin-left:0}
  .topbar{padding:16px 20px}
  .page-body{padding:20px}
  .menu-toggle{display:flex}
  .demo-banner{padding:10px 16px}
}
.menu-toggle{display:none;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;border:1.5px solid var(--line);background:none;cursor:pointer;color:var(--ink)}
`;

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', href: 'index.html',     icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>` },
  { id: 'rooms',     label: 'Rooms',     href: 'rooms.html',     icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
  { id: 'gallery',   label: 'Gallery',   href: 'gallery.html',   icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>` },
  { id: 'inquiries', label: 'Inquiries', href: 'inquiries.html', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
  { id: 'settings',  label: 'Settings',  href: 'settings.html',  icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>` },
];

function shellSignOut() {
  // Plain redirect for demo mode.
  // When supabase.js is activated, replace this with a call to its signOut()
  // so the Supabase session is properly terminated before the redirect.
  window.location.href = 'login.html';
}

function renderDemoBanner() {
  const banner = document.createElement('div');
  banner.className = 'demo-banner';
  banner.innerHTML = `<span>✦</span> <span>Demo Preview — This is a preview of your admin portal. Data is stored locally in this browser. Contact Aya Core Studios to activate the live version.</span>`;
  document.body.prepend(banner);
}

function renderShell(activeId) {
  // Inject shared CSS
  const style = document.createElement('style');
  style.textContent = SHELL_CSS;
  document.head.appendChild(style);

  // Google Fonts — full weights including italic Cormorant
  if (!document.querySelector('link[href*="Cormorant+Garamond"]')) {
    const gf = document.createElement('link');
    gf.rel = 'stylesheet';
    gf.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    document.head.insertBefore(gf, document.head.firstChild);
  }

  // Demo banner first
  renderDemoBanner();

  const navHtml = NAV_ITEMS.map(n => `
    <a class="sidebar-link${n.id === activeId ? ' active' : ''}" href="${n.href}">
      ${n.icon} ${n.label}
    </a>`).join('');

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <span class="sidebar-logo-text">Nonesi Lodge</span>
      <span class="sidebar-logo-rule"></span>
      <span class="sidebar-logo-sub">Admin Portal</span>
    </div>
    <nav class="sidebar-nav">${navHtml}</nav>
    <div class="sidebar-foot">
      <span class="sidebar-credit">Powered by Aya Core Studios</span>
      <button class="sidebar-sign-out" onclick="shellSignOut()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign out
      </button>
    </div>`;

  // Insert sidebar after the banner (which is now body's first child)
  const banner = document.querySelector('.demo-banner');
  if (banner && banner.nextSibling) {
    document.body.insertBefore(sidebar, banner.nextSibling);
  } else {
    document.body.appendChild(sidebar);
  }

  // Mobile toggle
  const toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) sidebar.classList.remove('open');
    });
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}

function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
