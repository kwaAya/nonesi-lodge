/**
 * ═══════════════════════════════════════════════════════════
 *  Aya Core Studios — CMS Admin
 *  supabase.js  —  Supabase client + auth guard
 * ═══════════════════════════════════════════════════════════
 *
 *  SETUP (one-time per client):
 *
 *  1. Create a free Supabase project at https://supabase.com
 *
 *  2. Replace the two placeholders below with your project's
 *     URL and anon key (Settings → API in your Supabase dashboard).
 *
 *  3. Run the SQL in admin/schema.sql in the Supabase SQL editor
 *     to create the required tables and storage bucket.
 *
 *  4. In Supabase → Authentication → Users, create an account
 *     for the lodge owner (or use "Invite user").
 *
 *  5. Deploy the admin/ folder alongside the main site on Vercel.
 *     Set SUPABASE_URL and SUPABASE_ANON_KEY as environment
 *     variables if you want to keep them out of the source code
 *     (optional for a private admin panel).
 * ═══════════════════════════════════════════════════════════
 */

const SUPABASE_URL      = 'https://YOUR_PROJECT_REF.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// Load the Supabase JS client from CDN (injected by each HTML page)
function getClient() {
  if (typeof window.supabase === 'undefined') {
    console.error('Supabase client not loaded. Make sure the CDN script tag is present.');
    return null;
  }
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/**
 * authGuard()
 * Call at the top of every admin page (except login.html).
 * Redirects to login if no active session exists.
 * Returns the supabase client if authenticated.
 */
async function authGuard() {
  const sb = getClient();
  if (!sb) return null;

  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  return sb;
}

/**
 * signOut()
 * Signs the user out and redirects to login.
 */
async function signOut() {
  const sb = getClient();
  if (sb) await sb.auth.signOut();
  window.location.href = 'login.html';
}

/**
 * showToast(msg, type)
 * Shows a small notification at the bottom of the screen.
 * type: 'success' | 'error' | 'info'
 */
function showToast(msg, type = 'info') {
  let t = document.getElementById('_toast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_toast';
    t.style.cssText = `
      position:fixed;bottom:28px;right:28px;z-index:9999;
      padding:13px 22px;border-radius:12px;font-size:13px;font-weight:600;
      font-family:'Plus Jakarta Sans',system-ui,sans-serif;
      box-shadow:0 8px 24px rgba(0,0,0,.18);
      transition:opacity .3s ease,transform .3s ease;
      pointer-events:none;
    `;
    document.body.appendChild(t);
  }
  const colors = { success: '#2C4235', error: '#B84040', info: '#3A5A6E' };
  t.style.background = colors[type] || colors.info;
  t.style.color = '#FBF9F5';
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.transform = 'translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(8px)';
  }, 3200);
}

/**
 * formatDate(isoString)
 */
function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}
