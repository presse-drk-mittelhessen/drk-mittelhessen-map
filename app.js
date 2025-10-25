(function(){
  function qsAll(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
  function byId(id){ return document.getElementById(id); }
  function setLayer(id, on){ const el = byId(id); if(el){ el.classList.toggle('is-on', !!on); } }

  function init(){
    const checks = qsAll('[data-layer]');
    // Startzustand anhand der Checkboxen
    checks.forEach(cb => setLayer(cb.getAttribute('data-layer'), cb.checked));

    // Einzel-Listener
    checks.forEach(cb => {
      cb.addEventListener('change', e => setLayer(e.target.getAttribute('data-layer'), e.target.checked));
    });

    // Buttons
    qsAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const allOn = btn.getAttribute('data-action') === 'all';
        checks.forEach(cb => { cb.checked = allOn; setLayer(cb.getAttribute('data-layer'), allOn); });
      });
    });

    // Optional: URL-Parameter ?layers=ehrenamt,kita (sichtbare Ebenen beim Start)
    const params = new URLSearchParams(location.search);
    if (params.has('layers')) {
      const want = params.get('layers').split(',').map(s=>s.trim());
      checks.forEach(cb => {
        const id = cb.getAttribute('data-layer');
        const on = want.includes(id);
        cb.checked = on;
        setLayer(id, on);
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
