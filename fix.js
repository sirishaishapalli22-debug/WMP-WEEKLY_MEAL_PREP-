document.addEventListener('click', function(e) {
  var tab = e.target.closest ? e.target.closest('.modal-day-tab') : null;
  if (!tab) return;

  var dayText = tab.textContent.trim();
  var allDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  var fullDay = allDays.find(function(d){ return d.indexOf(dayText) === 0; });
  if (!fullDay) return;

  if (typeof addingTo !== 'undefined' && addingTo) {
    addingTo.day = fullDay;
  }

  document.querySelectorAll('.modal-day-tab').forEach(function(t) {
    if (t === tab) {
      t.style.background = '#22c55e';
      t.style.color = 'white';
      t.style.border = '1px solid #16a34a';
      t.style.fontWeight = '700';
    } else {
      t.style.background = 'white';
      t.style.color = '#6b7280';
      t.style.border = '1px solid #e5e7eb';
      t.style.fontWeight = '600';
    }
  });

  var msg = document.getElementById('modalAddedMsg');
  if (msg) msg.style.display = 'none';
});
