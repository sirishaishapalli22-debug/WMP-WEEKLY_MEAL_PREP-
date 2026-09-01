// ── FEATURE 1: TOAST NOTIFICATION ────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('appToast');
  if (!t) return;
  t.textContent = '✅ ' + msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

// Watch the existing modalAddedMsg — trigger toast whenever it shows
(function () {
  const msg = document.getElementById('modalAddedMsg');
  if (!msg) return;
  new MutationObserver(() => {
    if (!msg.classList.contains('hidden') && msg.textContent.trim()) {
      showToast(msg.textContent.replace('✓ ', '').trim());
    }
  }).observe(msg, { attributes: true, attributeFilter: ['class'] });
})();


// ── FEATURE 2: PHOTO SCAN (OpenAI Vision) ────────────────────────────
(function () {
  const scanBtn   = document.getElementById('scanPhotoBtn');
  const fileInp   = document.getElementById('photoInput');
  const resultsEl = document.getElementById('scanResults');
  if (!scanBtn || !fileInp || !resultsEl) return;

  scanBtn.addEventListener('click', () => {
    const key = localStorage.getItem('wmp_openai_key');
    if (!key) {
      showToast('Set your OpenAI API key in Profile → AI Photo Scan first');
      return;
    }
    fileInp.click();
  });

  fileInp.addEventListener('change', async () => {
    const file = fileInp.files[0];
    if (!file) return;
    const key = localStorage.getItem('wmp_openai_key');
    if (!key) return;

    scanBtn.textContent = '⏳ Scanning…';
    scanBtn.disabled = true;
    resultsEl.classList.add('hidden');
    resultsEl.innerHTML = '';

    try {
      // File → base64 data URL
      const b64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload  = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(file);
      });

      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + key
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [{
            role: 'user',
            content: [
              { type: 'image_url', image_url: { url: b64 } },
              {
                type: 'text',
                text: 'Identify the food(s) in this image. Return ONLY a JSON array, no other text: [{"name":"food name with portion","cal":number,"pro":number,"fib":number}]. Use Indian food names where applicable. Keep names short and include portion size in name.'
              }
            ]
          }],
          max_tokens: 400
        })
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error?.message || 'API error ' + resp.status);
      }

      const data  = await resp.json();
      const text  = data.choices[0].message.content;
      const match = text.match(/\[[\s\S]*?\]/);
      if (!match) throw new Error('Could not identify food in image');
      const foods = JSON.parse(match[0]);
      if (!foods.length) throw new Error('No food detected');

      // Render results
      resultsEl.innerHTML = '<div class="scan-label">🤖 AI detected:</div>';
      foods.forEach(food => {
        const row = document.createElement('div');
        row.className = 'scan-row';
        row.innerHTML = `
          <div class="scan-info">
            <div class="scan-name">${food.name}</div>
            <div class="scan-macros">${food.cal} cal · ${food.pro || 0}g protein · ${food.fib || 0}g fiber</div>
          </div>
          <button class="scan-add-btn">Add</button>
        `;
        row.querySelector('.scan-add-btn').addEventListener('click', function () {
          if (typeof addingTo === 'undefined' || !addingTo) {
            showToast('Open the modal from a meal first');
            return;
          }
          const plan = getWeekPlan();
          plan[addingTo.day][addingTo.meal].push({
            name: food.name,
            cal:  food.cal,
            pro:  food.pro  || 0,
            fib:  food.fib  || 0,
            cat:  'Photo Scan',
            qty:  1
          });
          saveWeekPlan(plan);
          showToast(food.name + ' added to ' + addingTo.day);
          this.textContent = '✓ Added';
          this.disabled = true;
          this.style.cssText = 'background:#86efac;color:#166534;border:none;border-radius:6px;padding:5px 12px;font-size:12px;font-weight:600;';
        });
        resultsEl.appendChild(row);
      });
      resultsEl.classList.remove('hidden');

    } catch (err) {
      showToast('Scan failed: ' + err.message);
    } finally {
      scanBtn.innerHTML = '📷 Scan food photo (AI)';
      scanBtn.disabled = false;
      fileInp.value = '';
    }
  });
})();


// ── FEATURE 4: PORTION GUIDE ─────────────────────────────────────────

// Parse a food name to return a human-readable portion description
function getPortionInfo(name) {
  const m = name.match(/\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].trim();
  const pl = p.toLowerCase();

  // Cups
  const cupM = pl.match(/^([\d.]+)\s*cups?/);
  if (cupM) {
    const n = parseFloat(cupM[1]) || 1;
    const gLo = Math.round(n * 175), gHi = Math.round(n * 200);
    const k = n === 0.5 ? '1 small katori' : n === 1 ? '1 medium katori'
            : n === 1.5 ? '1½ katori' : n === 2 ? '2 katori' : n + ' katori';
    return `${p} ≈ ${gLo}–${gHi}g ≈ ${k}`;
  }
  // Tablespoon
  const tbM = pl.match(/^(\d+)\s*tbsp/);
  if (tbM) {
    const n = parseInt(tbM[1]);
    return `${p} ≈ ${n * 13}g ≈ ${n === 1 ? '1 chamach' : n + ' chamach'}`;
  }
  // Teaspoon
  const tsM = pl.match(/^(\d+)\s*tsp/);
  if (tsM) return `${p} ≈ ${parseInt(tsM[1]) * 5}g`;

  // Glass / ml
  if (pl.includes('glass') || pl.includes('ml')) return `${p} ≈ 240ml ≈ 1 standard glass`;

  // Gram weight already specified
  const gM = pl.match(/^(\d+)\s*g\b/);
  if (gM) {
    const g = parseInt(gM[1]);
    const k = g <= 80 ? 'small handful' : g <= 130 ? '1 small katori' : g <= 200 ? '1 medium katori' : '1 large serving';
    return `${p} ≈ ${k}`;
  }
  // medium / small / large piece
  if (pl.includes('medium')) return `${p} ≈ 120–150g`;
  if (pl.includes('small'))  return `${p} ≈ 70–90g`;
  if (pl.includes('large'))  return `${p} ≈ 180–220g`;

  // Count of pieces (1), (2), (3) etc.
  const cntM = pl.match(/^(\d+)$/);
  if (cntM) return parseInt(cntM[1]) + ' piece' + (parseInt(cntM[1]) > 1 ? 's' : '') + ' per serving';

  return null;
}

// Option B — collapsible 📏 Portion Guide panel inside modal
(function () {
  const header = document.querySelector('.modal-header');
  if (!header) return;

  // Add 📏 button to modal header (before the ✕ close button)
  const closeBtn = document.getElementById('closeModal');
  const pgBtn = document.createElement('button');
  pgBtn.id        = 'portionGuideBtn';
  pgBtn.title     = 'Portion Reference Guide';
  pgBtn.innerHTML = '📏';
  pgBtn.style.cssText = 'background:none;border:none;font-size:15px;cursor:pointer;padding:0 6px;opacity:.6;transition:opacity .15s;';
  pgBtn.onmouseenter = () => pgBtn.style.opacity = '1';
  pgBtn.onmouseleave = () => pgBtn.style.opacity = '.6';
  header.insertBefore(pgBtn, closeBtn);

  // Build the guide panel and insert after modal-day-tabs
  const dayTabs = document.getElementById('modalDayTabs');
  if (!dayTabs) return;

  const panel = document.createElement('div');
  panel.id        = 'portionGuidePanel';
  panel.className = 'portion-guide hidden';
  panel.innerHTML = `
    <div class="pg-title">📏 Portion Reference</div>
    <div class="pg-grid">
      <div class="pg-row hdr"><span>Measure</span><span>≈ Weight</span><span>Indian Equivalent</span></div>
      <div class="pg-row"><span>1 cup</span><span>175–200g</span><span>1 medium katori</span></div>
      <div class="pg-row"><span>¾ cup</span><span>130–150g</span><span>1 katori (heaped)</span></div>
      <div class="pg-row"><span>½ cup</span><span>85–100g</span><span>1 small katori</span></div>
      <div class="pg-row"><span>¼ cup</span><span>45–50g</span><span>½ small katori</span></div>
      <div class="pg-row"><span>1 tbsp</span><span>12–15g</span><span>1 chamach</span></div>
      <div class="pg-row"><span>1 tsp</span><span>4–5g</span><span>½ chamach</span></div>
      <div class="pg-row"><span>1 glass</span><span>240ml</span><span>1 standard glass</span></div>
      <div class="pg-row"><span>1 bowl</span><span>250–300g</span><span>1 medium bowl</span></div>
      <div class="pg-row"><span>1 plate</span><span>400–500g</span><span>1 full plate / thali</span></div>
      <div class="pg-row"><span>100g</span><span>100g</span><span>≈ 1 small katori</span></div>
      <div class="pg-row"><span>30g</span><span>30g</span><span>≈ small handful</span></div>
      <div class="pg-row"><span>1 medium</span><span>120–150g</span><span>medium-sized piece</span></div>
    </div>
    <div class="pg-note">💡 Wet curries / dal are slightly heavier per cup (~240g). These are general estimates.</div>
  `;
  dayTabs.after(panel);

  // Toggle on 📏 button click
  pgBtn.addEventListener('click', e => {
    e.stopPropagation();
    const hidden = panel.classList.toggle('hidden');
    pgBtn.style.opacity = hidden ? '.6' : '1';
  });
})();

// Option A — per-item portion info line under each food in the food list
(function () {
  const foodList = document.getElementById('foodList');
  if (!foodList) return;

  function _addPortionInfo() {
    foodList.querySelectorAll('.food-item').forEach(item => {
      if (item.querySelector('.portion-info')) return; // already added
      const nameEl   = item.querySelector('.food-item-name');
      const macrosEl = item.querySelector('.food-item-macros');
      if (!nameEl || !macrosEl) return;

      const info = getPortionInfo(nameEl.textContent || '');
      if (!info) return;

      const el = document.createElement('div');
      el.className   = 'portion-info';
      el.textContent = '📏 ' + info;
      macrosEl.after(el);
    });
  }

  let _piTimer;
  new MutationObserver(() => {
    clearTimeout(_piTimer);
    _piTimer = setTimeout(_addPortionInfo, 30);
  }).observe(foodList, { childList: true, subtree: false });
})();


// ── FEATURE 3: ACTIVITY DAY TARGETS ──────────────────────────────────

// Storage helpers (reads weekKey from currentWeekStart in script.js)
function _wmpActKey() {
  if (typeof currentWeekStart !== 'undefined' && currentWeekStart) {
    return 'wmp_act_' + currentWeekStart.toISOString().split('T')[0];
  }
  return 'wmp_act_default';
}
function _getWeekAct()           { const v = localStorage.getItem(_wmpActKey()); return v ? JSON.parse(v) : {}; }
function _getDayAct(day)         { return _getWeekAct()[day] || { type: 'normal', steps: 0 }; }
function _setDayAct(day, act)    { const a = _getWeekAct(); a[day] = act; localStorage.setItem(_wmpActKey(), JSON.stringify(a)); }

// Add activity widgets to each day-header after plannerGrid re-renders
const _plannerGrid = document.getElementById('plannerGrid');
if (_plannerGrid) {
  const ALL_DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  function _addActWidgets() {
    const p = JSON.parse(localStorage.getItem('wmp_profile') || '{}');
    if (!p.enableActivity) return;

    // Recalc base calories using same formula as script.js
    const bmr = p.gender === 'male'
      ? 10 * (p.weight || 65) + 6.25 * (p.height || 165) - 5 * (p.age || 25) + 5
      : 10 * (p.weight || 65) + 6.25 * (p.height || 165) - 5 * (p.age || 25) - 161;
    const tdee    = bmr * 1.4;
    const goalAdj = p.goal === 'loss' ? -400 : p.goal === 'gain' ? 300 : 0;
    const baseCal = Math.round(tdee + goalAdj);

    _plannerGrid.querySelectorAll('.day-header').forEach(hdr => {
      if (hdr.querySelector('.act-widget')) return; // already done

      // Get day name from add-food-btn data attribute (most reliable)
      const col = hdr.closest('.day-column');
      const day = col?.querySelector('.add-food-btn')?.dataset.day;
      if (!day) return;

      const act   = _getDayAct(day);
      const extra = act.type === 'workout'
        ? (p.workoutExtra || 300)
        : act.type === 'steps'
          ? Math.round((act.steps || 0) * 0.04)
          : 0;
      const dayTarget = baseCal + extra;

      const widget = document.createElement('div');
      widget.className = 'act-widget';

      // Activity toggle button
      const btn = document.createElement('button');
      btn.className = 'act-badge ' + act.type;
      btn.textContent = act.type === 'workout' ? '💪 Workout'
                      : act.type === 'steps'   ? '🚶 Steps'
                      : '+ Activity';
      btn.title = 'Click to change activity type';
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const cur = _getDayAct(day).type;
        const nxt = cur === 'normal' ? 'workout' : cur === 'workout' ? 'steps' : 'normal';
        _setDayAct(day, { type: nxt, steps: 0 });
        // Remove widget so it gets rebuilt
        widget.remove();
        setTimeout(_addActWidgets, 10);
      });
      widget.appendChild(btn);

      // Steps input (only when type === 'steps')
      if (act.type === 'steps') {
        const row = document.createElement('div');
        row.className = 'act-steps-row';
        const inp = document.createElement('input');
        inp.type        = 'number';
        inp.className   = 'act-steps-inp';
        inp.placeholder = '0';
        inp.value       = act.steps || '';
        inp.addEventListener('change', e => {
          e.stopPropagation();
          _setDayAct(day, { type: 'steps', steps: +inp.value || 0 });
          widget.remove();
          setTimeout(_addActWidgets, 10);
        });
        const lbl = document.createElement('span');
        lbl.className   = 'act-steps-lbl';
        lbl.textContent = 'steps';
        row.appendChild(inp);
        row.appendChild(lbl);
        widget.appendChild(row);
      }

      // Show adjusted target if different from base
      if (extra > 0) {
        const badge = document.createElement('div');
        badge.className   = 'act-target-badge';
        badge.textContent = '🎯 ' + dayTarget + ' cal';
        widget.appendChild(badge);
      }

      hdr.appendChild(widget);
    });
  }

  // Debounced MutationObserver — fires after every renderPlanner call
  let _actTimer;
  new MutationObserver(() => {
    clearTimeout(_actTimer);
    _actTimer = setTimeout(_addActWidgets, 60);
  }).observe(_plannerGrid, { childList: true });
}


// ── PROFILE: Save / Load activity + API key ──────────────────────────
(function () {
  const enableChk = document.getElementById('pEnableActivity');
  const actOpts   = document.getElementById('activityOptions');
  const saveBtn   = document.getElementById('saveProfile');

  // Toggle activity options panel
  if (enableChk && actOpts) {
    enableChk.addEventListener('change', () => {
      actOpts.classList.toggle('hidden', !enableChk.checked);
    });
  }

  // Extend the existing saveProfile click to also save activity settings + API key
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      // Small delay so script.js's own click handler saves profile first
      setTimeout(() => {
        const existing = JSON.parse(localStorage.getItem('wmp_profile') || '{}');

        if (document.getElementById('pEnableActivity')) {
          existing.enableActivity = document.getElementById('pEnableActivity').checked;
          existing.workoutExtra   = +(document.getElementById('pWorkoutExtra')?.value) || 300;
          localStorage.setItem('wmp_profile', JSON.stringify(existing));
        }

        const keyInp = document.getElementById('pOpenAIKey');
        if (keyInp && keyInp.value && keyInp.value !== '••••') {
          localStorage.setItem('wmp_openai_key', keyInp.value.trim());
          keyInp.value       = '••••';
          keyInp.placeholder = '(API key saved)';
        }
      }, 80);
    });
  }

  // Load saved values on page load
  const p = JSON.parse(localStorage.getItem('wmp_profile') || '{}');

  if (enableChk) {
    enableChk.checked = p.enableActivity || false;
    if (actOpts) actOpts.classList.toggle('hidden', !p.enableActivity);
  }

  const extraInp = document.getElementById('pWorkoutExtra');
  if (extraInp) extraInp.value = p.workoutExtra || 300;

  const keyInp = document.getElementById('pOpenAIKey');
  if (keyInp && localStorage.getItem('wmp_openai_key')) {
    keyInp.placeholder = '(API key saved — paste new key to update)';
  }

  // Re-sync activity fields whenever user switches to Profile tab
  document.querySelectorAll('.tab').forEach(btn => {
    if (btn.dataset.tab === 'profile') {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          const pp = JSON.parse(localStorage.getItem('wmp_profile') || '{}');
          const ec = document.getElementById('pEnableActivity');
          const ao = document.getElementById('activityOptions');
          const we = document.getElementById('pWorkoutExtra');
          if (ec) { ec.checked = pp.enableActivity || false; }
          if (ao) { ao.classList.toggle('hidden', !(pp.enableActivity)); }
          if (we) { we.value = pp.workoutExtra || 300; }
        }, 60);
      });
    }
  });
})();
