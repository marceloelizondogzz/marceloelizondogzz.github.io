document.querySelectorAll('.nav-dropdown').forEach(function(dropdown) {
  var timer;

  dropdown.addEventListener('mouseenter', function() {
    clearTimeout(timer);
    dropdown.classList.add('open');
  });

  dropdown.addEventListener('mouseleave', function() {
    timer = setTimeout(function() {
      dropdown.classList.remove('open');
    }, 150);
  });

  dropdown.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
});

document.addEventListener('click', function() {
  document.querySelectorAll('.nav-dropdown.open').forEach(function(d) {
    d.classList.remove('open');
  });
});
