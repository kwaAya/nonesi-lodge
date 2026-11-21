/**
 * admin-shell.js
 * Injects the shared nav sidebar into every admin page.
 * Call renderShell(pageId) at the top of each page's script.
 * pageId: 'dashboard' | 'rooms' | 'gallery' | 'inquiries' | 'settings'
 */

const SHELL_CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --green:#2C4235;--gold:#C86D51;--gold-h:#B35A3E;
  --bg:#FBF9F5;--surface:#F2EFE8;--ink:#2B2D2F;--muted:#6B6F6C;
  --line:rgba(44,66,53,.12);--sidebar:220px;
}
body{background:var(--bg);font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:14px;line-height:1.6;color:var(--ink);display:flex;min-height:100svh}

/* ── SIDEBAR ── */
.sidebar{width:var(--sidebar);flex-shrink:0;background:var(--green);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;padding:0}
.sidebar-logo{padding:28px 24px 20px;border-bottom:1px solid rgba(255,255,255,.08)}
.sidebar-logo-text{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:1.3rem;color:#fff;display:block}
.sidebar-logo-sub{font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-top:2px;display:block}
.sidebar-nav{flex:1;padding:20px 12px;display:flex;flex-direction:column;gap:4px}
.sidebar-link{display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:600;color:rgba(255,255,255,.65);text-decoration:none;transition:background .2s,color .2s}
.sidebar-link:hover{background:rgba(255,255,255,.08);color:#fff}
.sidebar-link.active{background:var(--gold);color:#fff}
.sidebar-link svg{flex-shrink:0;opacity:.8}
.sidebar-link.active svg{opacity:1}
.sidebar-foot{padding:16px 12px;border-top:1px solid rgba(255,255,255,.08)}
.sidebar-sign-out{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;font-size:12px;font-weight:600;color:rgba(255,255,255,.45);cursor:pointer;border:none;background:none;width:100%;transition:color .2s,background .2s}
.sidebar-sign-out:hover{color:#fff;background:rgba(255,255,255,.08)}

/* ── MAIN ── */
.main{margin-left:var(--sidebar);flex:1;display:flex;flex-direction:column;min-height:100svh}
.topbar{padding:20px 32px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;background:var(--bg);position:sticky;top:0;z-index:50}
.topbar-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;color:var(--green)}
.topbar-actions{display:flex;gap:10px}
.page-body{padding:32px;flex:1}

/* ── CARDS / TABLES ── */
.stats-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px;margin-bottom:32px}
.stat-card{background:var(--surface);border-radius:14px;padding:20px 22px;border:1px solid var(--line)}
.stat-card-num{font-family:'Cormorant Garamond',Georgia,serif;font-size:2.4rem;color:var(--green);line-height:1}
.stat-card-label{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:5px}

.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px}
.section-title{font-size:15px;font-weight:700;color:var(--green)}

table{width:100%;border-collapse:collapse;background:var(--bg);border-radius:12px;overflow:hidden;border:1px solid var(--line)}
thead{background:var(--surface)}
th{padding:12px 16px;text-align:left;font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--line)}
td{padding:13px 16px;border-bottom:1px solid var(--line);font-size:13px;vertical-align:middle}
tr:last-child td{border-bottom:none}
tr:hover td{background:rgba(44,66,53,.03)}

/* ── BADGES ── */
.badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.badge-new{background:rgba(200,109,81,.12);color:#B35A3E}
.badge-contacted{background:rgba(44,66,53,.1);color:var(--green)}
.badge-confirmed{background:rgba(34,139,34,.12);color:#1A6B1A}
.badge-cancelled{background:rgba(150,150,150,.12);color:var(--muted)}

/* ── FORMS ── */
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:600px){.form-grid{grid-template-columns:1fr}}
.form-full{grid-column:1/-1}
.form-group{display:flex;flex-direction:column;gap:6px}
.form-group label{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.form-group input,.form-group select,.form-group textarea{padding:11px 14px;border:1.5px solid var(--line);border-radius:10px;font-family:inherit;font-size:14px;color:var(--ink);background:var(--bg);transition:border-color .2s,box-shadow .2s;resize:vertical}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(200,109,81,.12)}

/* ── BUTTONS ── */
.btn{display:inline-flex;align-items:center;gap:7px;padding:10px 20px;border-radius:10px;border:none;font-family:inherit;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:background .2s,transform .2s,opacity .2s}
.btn-primary{background:var(--green);color:#fff}
.btn-primary:hover{background:var(--gold);transform:translateY(-1px)}
.btn-gold{background:var(--gold);color:#fff}
.btn-gold:hover{background:var(--gold-h);transform:translateY(-1px)}
.btn-outline{background:transparent;color:var(--green);border:1.5px solid rgba(44,66,53,.25)}
.btn-outline:hover{background:var(--green);color:#fff}
.btn-danger{background:transparent;color:#B84040;border:1.5px solid rgba(184,64,64,.25)}
.btn-danger:hover{background:#B84040;color:#fff}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}
.btn-sm{padding:7px 14px;font-size:11px}

/* ── MODAL ── */
.modal-backdrop{position:fixed;inset:0;background:rgba(10,16,12,.5);backdrop-filter:blur(6px);z-index:400;display:none;align-items:center;justify-content:center;padding:20px}
.modal-backdrop.open{display:flex}
.modal{background:var(--bg);border-radius:18px;padding:32px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,.3)}
.modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
.modal-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.4rem;color:var(--green)}
.modal-close{background:none;border:none;cursor:pointer;color:var(--muted);font-size:20px;padding:4px;border-radius:50%;transition:color .2s}
.modal-close:hover{color:var(--ink)}
.modal-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:24px;border-top:1px solid var(--line);padding-top:20px}

/* ── UPLOAD ZONE ── */
.upload-zone{border:2px dashed var(--line);border-radius:12px;padding:32px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s}
.upload-zone:hover,.upload-zone.drag-over{border-color:var(--gold);background:rgba(200,109,81,.04)}
.upload-zone p{font-size:13px;color:var(--muted);margin-top:8px}
.upload-zone strong{color:var(--green)}

/* ── GALLERY GRID ── */
.gallery-admin-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px}
.gallery-admin-item{position:relative;border-radius:10px;overflow:hidden;aspect-ratio:4/3;background:var(--surface);border:1px solid var(--line)}
.gallery-admin-item img{width:100%;height:100%;object-fit:cover}
.gallery-admin-item-actions{position:absolute;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;gap:8px;opacity:0;transition:opacity .2s}
.gallery-admin-item:hover .gallery-admin-item-actions{opacity:1}
.gallery-admin-item-label{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.55);color:#fff;font-size:11px;font-weight:600;padding:6px 10px;text-align:center}

/* ── EMPTY STATE ── */
.empty-state{text-align:center;padding:64px 32px;color:var(--muted)}
.empty-state svg{opacity:.3;margin-bottom:16px}
.empty-state h3{font-size:1.1rem;color:var(--green);margin-bottom:6px}
.empty-state p{font-size:13px}

/* ── MOBILE ── */
@media(max-width:768px){
  .sidebar{transform:translateX(-100%);transition:transform .3s}
  .sidebar.open{transform:translateX(0)}
  .main{margin-left:0}
  .topbar{padding:16px 20px}
  .page-body{padding:20px}
  .menu-toggle{display:flex}
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

function renderShell(activeId) {
  // Inject shared CSS
  const style = document.createElement('style');
  style.textContent = SHELL_CSS;
  document.head.appendChild(style);

  // Google Fonts
  const gf = document.createElement('link');
  gf.rel = 'stylesheet';
  gf.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
  document.head.insertBefore(gf, document.head.firstChild);

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
      <span class="sidebar-logo-sub">Admin Portal</span>
    </div>
    <nav class="sidebar-nav">${navHtml}</nav>
    <div class="sidebar-foot">
      <button class="sidebar-sign-out" onclick="signOut()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign out
      </button>
    </div>`;

  document.body.prepend(sidebar);

  // Mobile toggle
  const toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) sidebar.classList.remove('open');
    });
  }
}
