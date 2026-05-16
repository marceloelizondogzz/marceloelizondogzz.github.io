var siteNav = document.querySelector('.site-nav');
var hamburger = document.querySelector('.hamburger');

// Hamburger toggles mobile menu
if (hamburger) {
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    siteNav.classList.toggle('open');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function() {
  if (siteNav) siteNav.classList.remove('open');
  document.querySelectorAll('.nav-dropdown.open').forEach(function(d) {
    d.classList.remove('open');
  });
});

// Dropdowns
document.querySelectorAll('.nav-dropdown').forEach(function(dropdown) {
  var timer;

  // Desktop: hover
  dropdown.addEventListener('mouseenter', function() {
    if (window.innerWidth > 768) {
      clearTimeout(timer);
      dropdown.classList.add('open');
    }
  });

  dropdown.addEventListener('mouseleave', function() {
    if (window.innerWidth > 768) {
      timer = setTimeout(function() {
        dropdown.classList.remove('open');
      }, 150);
    }
  });

  // All screen sizes: click/tap toggle
  dropdown.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
});
