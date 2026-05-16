document.querySelectorAll('.nav-dropdown').forEach(function(dropdown) {
  dropdown.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('open');
  });
});

document.addEventListener('click', function() {
  document.querySelectorAll('.nav-dropdown.open').forEach(function(d) {
    d.classList.remove('open');
  });
});
