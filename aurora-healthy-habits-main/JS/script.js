// Minimal JS: header shadow on scroll, dynamic year, reveal-on-scroll & basic form validation
(function(){
  // year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // header shadow
  const nav = document.querySelector('.site-nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 6);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // reveal on scroll
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    revealItems.forEach(el=>io.observe(el));
  } else {
    // fallback
    revealItems.forEach(el=>el.classList.add('visible'));
  }

  // simple bootstrap validation (no AJAX)
  document.querySelectorAll('form.needs-validation').forEach(form=>{
    form.addEventListener('submit', (e)=>{
      if (!form.checkValidity()){
        e.preventDefault(); e.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });
})();
