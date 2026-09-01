// ── FEATURE1: TOAST NOTIFICATION────────────────────────────────────
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


// ── FEATURE 2: CALSNAP — AI Food Scanner (Google Gemini, free) ────────
(function () {
  const cameraBtn = document.getElementById('scanCameraBtn');
  const galleryBtn= document.getElementById('scanGalleryBtn');
  const cameraInp = document.getElementById('photoInputCamera');
  const galleryInp= document.getElementById('photoInputGallery');
  const resultsEl = document.getElementById('scanResults');
  if (!cameraBtn || !galleryBtn || !cameraInp || !galleryInp || !resultsEl) return;

  function checkKey() {
    const key = localStorage.getItem('wmp_gemini_key');
    if (!key) {
      showToast('Add your free Gemini API key in Profile → CalSnap first');
      return false;
    }
    return true;
  }

  cameraBtn.addEventListener('click',() => { if (checkKey()) cameraInp.click();});
  galleryBtn.addEventListener('click', () => { if (checkKey()) galleryInp.click(); });

  // Both inputs share the same scan logic
  async function handleFile(file) {
    if (!file) return;
    const key = localStorage.getItem('wmp_gemini_key');
    if (!key) return;

    // Show scanning state on both buttons
    cameraBtn.textContent  = '⏳ Scanning…';
    galleryBtn.textContent = '⏳ Scanning…';
    cameraBtn.disabled= true;
    galleryBtn.disabled = true;
    resultsEl.classList.add('hidden');
    resultsEl.innerHTML = '';

    try {
      const dataUrl = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload  = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      const mimeType = file.type || 'image/jpeg';
      const b64Data= dataUrl.split(',')[1];

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inline_data: { mime_type: mimeType, data: b64Data } },
              { text: 'Identify the food(s) in this image. Return ONLY a JSON array, no other text: [{"name":"food name with portion","cal":number,"pro":number,"fib":number}]. Use Indian food names where applicable. Keep names short and include portion size in name.' }
            ]
          }]
        })
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error?.message || 'API error ' + resp.status);
      }

      const data  = await resp.json();
      const text  = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const match = text.match(/\[[\s\S]*?\]/);
      if (!match) throw new Error('Could not identify food in image');
      const foods = JSON.parse(match[0]);
      if (!foods.length) throw new Error('No food detected');

      resultsEl.innerHTML = '<div class="scan-label">🤖 CalSnap detected:</div>';
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
            name: food.name, cal: food.cal,
            pro: food.pro || 0, fib: food.fib || 0,
            cat: 'CalSnap', qty: 1
          });
          saveWeekPlan(plan);
          showToast(food.name + ' added to ' + addingTo.day);
          this.textContent = '✓ Added';
          this.disabled = true;
          this.style.cssText = 'background:#86efac;color:#166534;border:none;border-radius:6px;padding:5px 12px;font-size:12px;font-weight:600;';});
        resultsEl.appendChild(row);
      });resultsEl.classList.remove('hidden');

    } catch (err) {
      showToast('Scan failed: ' + err.message);
    } finally {
      cameraBtn.innerHTML= '📷 Take Photo';
      galleryBtn.innerHTML = '🖼️ From Gallery';
      cameraBtn.disabled  = false;
      galleryBtn.disabled = false;
      cameraInp.value  = '';
      galleryInp.value = '';
    }
  }

  cameraInp.addEventListener('change',  () => handleFile(cameraInp.files[0]));
  galleryInp.addEventListener('change', () => handleFile(galleryInp.files[0]));
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
    const k = n === 0.5 ? '1small katori' : n === 1 ? '1 medium katori': n === 1.5 ? '1½ katori' : n === 2 ? '2 katori' : n + ' katori';
    return `${p} ≈ ${gLo}–${gHi}g≈ ${k}`;
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

  // Add📏 button to modal header (before the✕ close button)
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
      <div class="pg-row"><span>1cup</span><span>175–200g</span><span>1 medium katori</span></div>
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

  // Toggle on📏 button click
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
function _getWeekAct(){ const v = localStorage.getItem(_wmpActKey()); return v ? JSON.parse(v) : {}; }
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
    const tdee= bmr * 1.4;
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
                      : act.type === 'steps'? '🚶 Steps'
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
          localStorage.setItem('wmp_gemini_key', keyInp.value.trim());
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
  if (keyInp && localStorage.getItem('wmp_gemini_key')) {
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
          if (ao) { ao.classList.toggle('hidden',!(pp.enableActivity)); }
          if (we) { we.value = pp.workoutExtra || 300; }
        }, 60);
      });
    }
  });
})();


// ── FEATURE 5: UNIT SELECTOR — type any amount of any unit ───────────
// Dropdown = unit type|  Qty input = how many of that unit
// e.g. qty=1.5 + unit=cup→  1.5 cups worth of calories
(function () {
  const foodList = document.getElementById('foodList');
  if (!foodList) return;

  // Each unit defines grams-per-one-of-that-unit
  // fixed: multiplier used directly (for serving-relative units)
  // grams: weight of1 unit — effective = qty × grams / serving_grams
  const UNIT_GROUPS = [
    {
      group: 'Serving',
      units: [
        { label: 'srv',fixed: 1,step: 0.25, hint: 'servings'},
      ]
    },
    {
      group: 'Spoons',
      units: [
        { label: 'tsp',          grams: 5,    step: 0.5,  hint: 'tsp'       },
        { label: 'tbsp',         grams: 13,   step: 0.5,  hint: 'tbsp'      },
      ]
    },
    {
      group: 'Cups',
      units: [
        { label: 'cup',          grams: 187,  step: 0.25, hint: 'cups'      },
      ]
    },
    {
      group: 'Indian',
      units: [
        { label: 'katori (sm)',  grams: 100,  step: 0.5,  hint: 'katori'    },
        { label: 'katori (md)',  grams: 187,  step: 0.5,  hint: 'katori'    },
        { label: 'katori (lg)',  grams: 280,  step: 0.5,  hint: 'katori'    },
        { label: 'glass',        grams: 240,  step: 0.5,  hint: 'glasses'   },
        { label: 'bowl',         grams: 300,  step: 0.5,  hint: 'bowls'     },
        { label: 'plate',        grams: 450,  step: 0.5,  hint: 'plates'    },
      ]
    },
    {
      group: 'Weight',
      units: [
        { label: 'g',            grams: 1,    step: 5,    hint: 'grams'     },
        { label: 'kg',           grams: 1000, step: 0.1,  hint: 'kg'        },
      ]
    },
    {
      group: 'Other',
      units: [
        { label: 'scoop (30g)',  grams: 30,   step: 0.5,  hint: 'scoops'    },
        { label: 'scoop (50g)',  grams: 50,   step: 0.5,  hint: 'scoops'    },
        { label: 'handful',      grams: 30,   step: 1,    hint: 'handfuls'  },
        { label: 'piece (sm)',   grams: 80,   step: 1,    hint: 'pieces'    },
        { label: 'piece (md)',   grams: 130,  step: 1,    hint: 'pieces'    },
        { label: 'piece (lg)',   grams: 200,  step: 1,    hint: 'pieces'    },
        { label: 'slice',        grams: 30,   step: 1,    hint: 'slices'    },
      ]
    }
  ];

  // Flat list for lookup by label
  const ALL_UNITS = UNIT_GROUPS.flatMap(g => g.units);

  // Parse serving grams from food name e.g. "White Rice (1 cup)"
  function _servingGrams(name) {
    const m = name.match(/\(([^)]+)\)/);
    if (!m) return null;
    const pl = m[1].toLowerCase().trim();
    const cup = pl.match(/^([\d.]+)\s*cups?/);
    if (cup) return Math.round(parseFloat(cup[1]) * 187);
    const g = pl.match(/^(\d+)\s*g\b/);
    if (g) return parseInt(g[1]);
    const tb = pl.match(/^(\d+)\s*tbsp/);
    if (tb) return parseInt(tb[1]) * 13;
    const ts = pl.match(/^(\d+)\s*tsp/);
    if (ts) return parseInt(ts[1]) * 5;
    return null;
  }

  function _injectUnits() {
    foodList.querySelectorAll('.food-item').forEach(item => {
      if (item.dataset.unitReady) return;
      item.dataset.unitReady = '1';

      const srvLabel = item.querySelector('.serving-label');
      const srvInput = item.querySelector('.serving-input');
      const nameEl   = item.querySelector('.food-item-name');
      const macrosEl = item.querySelector('.food-item-macros');
      if (!srvLabel || !srvInput || !nameEl || !macrosEl) return;

      const foodName = srvInput.dataset.name || nameEl.textContent.trim();
      const food= typeof FOODS !== 'undefined' ? FOODS.find(f => f.name === foodName) : null;
      if (!food) return;

      const sg = _servingGrams(food.name) || 187;
      item.dataset.sg = sg;

      // Build grouped<select>
      const sel = document.createElement('select');
      sel.className = 'unit-select';
      UNIT_GROUPS.forEach(grp => {
        const og = document.createElement('optgroup');
        og.label = grp.group;
        grp.units.forEach(u => {
          const o = document.createElement('option');
          o.value       = u.label; // store label as value — looked up in ALL_UNITS
          o.textContent = u.label;
          og.appendChild(o);
        });
        sel.appendChild(og);
      });

      srvLabel.replaceWith(sel);

      // Compute effective multiplier for current unit + qty
      const getEff = () => {
        const unit = ALL_UNITS.find(u => u.label === sel.value);
        if (!unit) return 1;
        const qty = parseFloat(srvInput.value) || 0;
        if (unit.fixed !== undefined) return qty * unit.fixed;
        return (qty * unit.grams) / sg;
      };

      // Live macros update
      const refreshMacros = () => {
        const eff = getEff();
        macrosEl.innerHTML =
          `<strong style="color:var(--green-dark)">${Math.round(food.cal * eff)} cal</strong>` +
          ` · ${Math.round(food.pro * eff)}g protein · ${Math.round(food.fib * eff)}g fiber ·<em>${food.cat}</em>`;
      };

      // When unit changes — update input step + placeholder
      const applyUnit = () => {
        const unit = ALL_UNITS.find(u => u.label === sel.value);
        if (!unit) return;
        srvInput.step        = unit.step || 1;
        srvInput.placeholder = unit.hint || '';
        srvInput.title       = `Enter number of ${unit.hint || sel.value}`;
        // For'g': sensible default is 100, not 1
        if (unit.grams === 1 && (srvInput.value === '1' || !srvInput.value)) {
          srvInput.value = 100;
        }
        refreshMacros();
      };

      sel.addEventListener('change', applyUnit);
      srvInput.addEventListener('input', refreshMacros);
    });
  }

  // Capture-phase — fires BEFORE script.js, sets effective serving qty
  foodList.addEventListener('click', e => {
    const btn = e.target.closest('.food-item-add');
    if (!btn) return;
    const item= btn.closest('.food-item');
    const srvInput = item?.querySelector('.serving-input');
    const unitSel  = item?.querySelector('.unit-select');
    if (!srvInput || !unitSel) return;

    const sg= parseFloat(item.dataset.sg) || 187;
    const unit = ALL_UNITS.find(u => u.label === unitSel.value);
    if (!unit) return;

    const qty = parseFloat(srvInput.value) || 1;
    let eff;
    if (unit.fixed !== undefined) {
      eff = qty * unit.fixed;
    } else {
      eff = (qty * unit.grams) / sg;
    }
    srvInput.value = +eff.toFixed(3);

    // Reset after script.js resets qty to '1'
    setTimeout(() => {
      unitSel.selectedIndex  = 0; // back to 'srv'
      srvInput.placeholder   = '';
      srvInput.step          = 0.1;
    }, 250);
  }, true);

  // Re-inject on every food list re-render
  let _uTimer;
  new MutationObserver(() => {
    clearTimeout(_uTimer);
    _uTimer = setTimeout(_injectUnits, 40);
  }).observe(foodList, { childList: true, subtree: false });
})();


// ── FEATURE 6: GROCERY → SHOPPING INGREDIENTS ────────────────────────
(function () {

  // ── CSS ───────────────────────────────────────────────────────────────
  const _css = document.createElement('style');
  _css.textContent = `
    .grocery-view-toggle { display:flex; gap:6px; margin-bottom:14px; }
    .grocery-view-btn {
      flex:1; padding:8px 0; border-radius:8px; border:1.5px solid var(--border,#e2e8f0);
      background:#f8fafc; color:#64748b; font-size:13px; font-weight:600; cursor:pointer;
      transition:all .15s;
    }
    .grocery-view-btn.active {
      background:var(--green-dark,#166534); color:#fff; border-color:var(--green-dark,#166534);
    }
    /* Dish cards */
    .shop-dish-card {
      border:1px solid var(--border,#e2e8f0); border-radius:10px;
      margin-bottom:8px; overflow:hidden;
    }
    .shop-dish-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:10px 14px; cursor:pointer; background:#f8fafc;
      font-weight:600; font-size:13.5px; user-select:none;
    }
    .shop-dish-header:hover { background:#f1f5f9; }
    .shop-dish-arrow { font-size:10px; color:#94a3b8; transition:transform .2s; }
    .shop-dish-arrow.open { transform:rotate(180deg); }
    .shop-dish-ings { display:none; padding:6px 14px 10px 14px; background:#fff; }
    .shop-dish-ings.open { display:block; }
    .shop-dish-ings .grocery-item { padding:3px 0; }
    /* All ingredients section */
    .shop-all-section { margin-top:20px; }
    .shop-all-title {
      font-size:12px; font-weight:700; color:#475569; text-transform:uppercase;
      letter-spacing:.06em; margin-bottom:10px; padding-bottom:8px;
      border-bottom:2px solid var(--border,#e2e8f0);
    }
  `;
  document.head.appendChild(_css);

  // ── Strip "(1 cup)" / "(2)" / ", cooked" from food names ─────────────
  function _strip(name) {
    return name.replace(/\s*\([^)]+\)\s*/g,'').replace(/,?\s*cooked\s*$/i,'').trim();
  }

  // ── Dish → Ingredients map ────────────────────────────────────────────
  // Keys match stripped food names (portion removed). Comprehensive Indian food map.
  const FOOD_INGREDIENTS = {
    // ── Rice & Grains ─────────────────────────────────────────────────
    'White Rice':['Rice'],
    'Brown Rice':                 ['Brown Rice'],
    'Red Rice':                   ['Red Rice'],
    'Jeera Rice':                 ['Rice','Cumin Seeds','Ghee','Onion'],
    'Ghee Rice':                  ['Rice','Ghee','Whole Spices'],
    'Lemon Rice':                 ['Rice','Lemon','Mustard Seeds','Curry Leaves','Turmeric','Oil','Peanuts'],
    'Pulihora / Tamarind Rice':   ['Rice','Tamarind','Mustard Seeds','Curry Leaves','Peanuts','Oil','Turmeric'],
    'Coconut Rice':               ['Rice','Coconut','Mustard Seeds','Curry Leaves','Oil'],
    'Tomato Rice':                ['Rice','Tomato','Onion','Oil','Spices'],
    'Curd Rice':                  ['Rice','Curd','Mustard Seeds','Curry Leaves','Salt'],
    'Curd Rice with Tempering':   ['Rice','Curd','Mustard Seeds','Curry Leaves','Green Chilli','Oil'],
    'Vegetable Pulao':            ['Basmati Rice','Mixed Vegetables','Onion','Whole Spices','Ghee'],
    'Veg Biryani':                ['Basmati Rice','Mixed Vegetables','Onion','Curd','Whole Spices','Oil','Saffron'],
    'Chicken Biryani':            ['Basmati Rice','Chicken','Onion','Curd','Whole Spices','Oil','Saffron'],
    'Mutton Biryani':             ['Basmati Rice','Mutton','Onion','Curd','Whole Spices','Oil','Saffron'],
    'Prawn Biryani':              ['Basmati Rice','Prawns','Onion','Curd','Whole Spices','Oil','Saffron'],
    'Fried Rice':                 ['Rice','Egg','Mixed Vegetables','Soy Sauce','Oil','Spring Onion'],
    'Khichdi':                    ['Rice','Moong Dal','Turmeric','Ghee','Cumin Seeds'],
    'Poha':                       ['Poha (Flattened Rice)','Onion','Mustard Seeds','Curry Leaves','Turmeric','Oil'],
    'Sabudana Khichdi':           ['Sabudana (Sago)','Peanuts','Potato','Cumin Seeds','Green Chilli','Oil'],
    'Oats, dry':                  ['Oats'],
    'Ragi Flour':                 ['Ragi Flour'],
    'Gongura Rice':               ['Rice','Gongura Leaves','Mustard Seeds','Red Chilli','Oil','Garlic'],
    'Curry Leaf Rice':            ['Rice','Curry Leaves','Mustard Seeds','Garlic','Oil','Red Chilli'],
    'Mint Rice':                  ['Rice','Mint Leaves','Oil','Spices'],
    'Pudina Pulao':               ['Rice','Mint Leaves','Onion','Whole Spices','Oil'],
    'Capsicum Rice':              ['Rice','Capsicum','Onion','Oil','Spices'],
    'Carrot Rice':                ['Rice','Carrot','Oil','Spices'],
    'Beetroot Rice':              ['Rice','Beetroot','Oil','Spices'],
    'Peas Pulao':                 ['Rice','Green Peas','Onion','Whole Spices','Ghee'],
    'Mushroom Rice':              ['Rice','Mushroom','Onion','Oil','Spices'],
    'Egg Rice':                   ['Rice','Egg','Onion','Oil','Spices'],
    'Chicken Rice':               ['Rice','Chicken','Onion','Oil','Spices'],
    'Mutton Rice':                ['Rice','Mutton','Onion','Oil','Spices'],
    'Mango Rice':                 ['Rice','Raw Mango','Mustard Seeds','Oil','Curry Leaves'],
    'Sesame Rice':                ['Rice','Sesame Seeds','Red Chilli','Oil'],
    'Dal Rice':                   ['Rice','Toor Dal (Kandi Pappu)','Turmeric','Ghee'],
    'Dal + Rice + Ghee':          ['Rice','Toor Dal (Kandi Pappu)','Ghee','Turmeric'],
    'Rice + Sambar':              ['Rice','Toor Dal (Kandi Pappu)','Tamarind','Mixed Vegetables','Sambar Powder'],
    'Rice + Rasam':               ['Rice','Tomato','Tamarind','Rasam Powder','Oil'],
    'Rice + Vegetable Curry':     ['Rice','Mixed Vegetables','Onion','Tomato','Oil','Spices'],
    'Rice + Chicken Curry':       ['Rice','Chicken','Onion','Tomato','Oil','Spices'],
    'Rice + Fish Curry':          ['Rice','Fish','Onion','Tomato','Coconut','Oil','Spices'],
    'Rice + Dal + Vegetable':     ['Rice','Toor Dal (Kandi Pappu)','Mixed Vegetables','Ghee','Spices'],
    // ── Roti & Bread ──────────────────────────────────────────────────
    'Chapati':                    ['Wheat Flour','Oil','Salt'],
    'Phulka / Pulka':             ['Wheat Flour','Salt'],
    'Roti':                       ['Wheat Flour','Oil','Salt'],
    'Multigrain Roti':            ['Multigrain Flour','Oil','Salt'],
    'Tandoori Roti':              ['Wheat Flour','Yeast','Salt','Oil'],
    'Plain Naan':                 ['Maida (All-Purpose Flour)','Yeast','Curd','Oil','Salt'],
    'Butter Naan':                ['Maida (All-Purpose Flour)','Yeast','Curd','Butter','Salt'],
    'Garlic Naan':                ['Maida (All-Purpose Flour)','Yeast','Curd','Garlic','Butter','Salt'],
    'Laccha Paratha':             ['Wheat Flour','Ghee','Salt'],
    'Plain Paratha':              ['Wheat Flour','Oil','Salt'],
    'Aloo Paratha':               ['Wheat Flour','Potato','Onion','Green Chilli','Coriander','Oil'],
    'Gobi Paratha':               ['Wheat Flour','Cauliflower','Green Chilli','Coriander','Oil'],
    'Paneer Paratha':             ['Wheat Flour','Paneer','Green Chilli','Coriander','Oil'],
    'Methi Paratha':              ['Wheat Flour','Fenugreek Leaves (Methi)','Oil','Salt'],
    'Thepla':                     ['Wheat Flour','Fenugreek Leaves (Methi)','Curd','Oil','Spices'],
    'Puri':                       ['Wheat Flour','Oil','Salt'],
    'Bhatura':                    ['Maida (All-Purpose Flour)','Curd','Yeast','Oil','Salt'],
    'Rumali Roti':                ['Maida (All-Purpose Flour)','Wheat Flour','Salt'],
    'Kerala Parotta':             ['Maida (All-Purpose Flour)','Oil','Salt'],
    'Appam':                      ['Rice','Coconut Milk','Yeast','Salt'],
    'Neer Dosa':                  ['Rice','Coconut','Salt'],
    'Bhakri':                     ['Jowar Flour','Salt'],
    '3 Pulkas + Vegetable Curry': ['Wheat Flour','Mixed Vegetables','Onion','Tomato','Oil','Spices'],
    '2 Eggs + 2 Chapatis':['Wheat Flour','Egg','Oil','Salt'],
    '100g Chicken + 2 Chapatis':  ['Wheat Flour','Chicken','Oil','Spices'],
    // ── South Indian ──────────────────────────────────────────────────
    'Idli':                       ['Urad Dal (Minapappu)','Rice','Salt'],
    'Plain Dosa':                 ['Urad Dal (Minapappu)','Rice','Salt','Oil'],
    'Masala Dosa':                ['Urad Dal (Minapappu)','Rice','Potato','Onion','Mustard Seeds','Turmeric','Oil'],
    'Set Dosa':                   ['Urad Dal (Minapappu)','Rice','Salt','Oil'],
    'Rava Dosa':                  ['Rava (Sooji)','Rice Flour','Onion','Green Chilli','Oil','Salt'],
    'Pesarattu':                  ['Moong Dal (Pesara Pappu)','Green Chilli','Ginger','Onion','Oil'],
    'Onion Dosa':                 ['Urad Dal (Minapappu)','Rice','Onion','Oil','Salt'],
    'Egg Dosa':                   ['Urad Dal (Minapappu)','Rice','Egg','Oil','Salt'],
    'Uttapam':                    ['Urad Dal (Minapappu)','Rice','Onion','Tomato','Oil','Salt'],
    'Vegetable Uttapam':          ['Urad Dal (Minapappu)','Rice','Mixed Vegetables','Oil','Salt'],
    'Upma':                       ['Rava (Sooji)','Onion','Mustard Seeds','Curry Leaves','Green Chilli','Oil'],
    'Vegetable Upma':             ['Rava (Sooji)','Onion','Mixed Vegetables','Mustard Seeds','Curry Leaves','Oil'],
    'Pongal':                     ['Rice','Moong Dal','Ghee','Cumin Seeds','Black Pepper','Ginger','Curry Leaves'],
    'Medu Vada':                  ['Urad Dal (Minapappu)','Onion','Green Chilli','Ginger','Curry Leaves','Oil'],
    'Masala Vada':                ['Chana Dal','Onion','Green Chilli','Ginger','Coriander','Oil'],
    'Punugulu':                   ['Urad Dal (Minapappu)','Rice','Onion','Green Chilli','Oil'],
    'Mysore Bonda':               ['Maida (All-Purpose Flour)','Curd','Baking Soda','Oil'],
    'Sambar':                     ['Toor Dal (Kandi Pappu)','Tamarind','Mixed Vegetables','Sambar Powder','Mustard Seeds','Oil'],
    'Rasam':                      ['Tomato','Tamarind','Rasam Powder','Garlic','Mustard Seeds','Oil'],
    'Karam Dosa':                 ['Urad Dal (Minapappu)','Rice','Red Chilli','Oil','Salt'],
    'Ghee Dosa':                  ['Urad Dal (Minapappu)','Rice','Ghee','Salt'],
    'Butter Dosa':                ['Urad Dal (Minapappu)','Rice','Butter','Salt'],
    'Cheese Dosa':                ['Urad Dal (Minapappu)','Rice','Cheese','Butter','Salt'],
    'Paneer Dosa':                ['Urad Dal (Minapappu)','Rice','Paneer','Spices','Oil'],
    'Chicken Dosa':               ['Urad Dal (Minapappu)','Rice','Chicken','Spices','Oil'],
    'Pesara Attu':                ['Moong Dal (Pesara Pappu)','Green Chilli','Ginger','Oil'],
    'MLA Pesarattu':              ['Moong Dal (Pesara Pappu)','Rava (Sooji)','Onion','Green Chilli','Ginger','Oil'],
    'Pesarattu + Upma':           ['Moong Dal (Pesara Pappu)','Rava (Sooji)','Onion','Green Chilli','Ginger','Mustard Seeds','Oil'],
    'Kanchipuram Idli':           ['Urad Dal (Minapappu)','Rice','Cumin Seeds','Black Pepper','Ginger','Oil'],
    'Thatte Idli':                ['Urad Dal (Minapappu)','Rice','Salt'],
    'Kotte Idli':                 ['Urad Dal (Minapappu)','Rice','Salt'],
    'Idiyappam':                  ['Rice Flour','Salt','Oil'],
    'Appam + Veg Stew':           ['Rice','Coconut Milk','Mixed Vegetables','Coconut Oil'],
    'Appam + Chicken Stew':       ['Rice','Coconut Milk','Chicken','Coconut Oil','Spices'],
    'Puttu':                      ['Rice Flour','Coconut','Salt'],
    'Puttu + Kadala Curry':       ['Rice Flour','Coconut','Chickpeas (Kadala)','Onion','Spices','Oil'],
    'Kuzhi Paniyaram':            ['Urad Dal (Minapappu)','Rice','Onion','Mustard Seeds','Oil'],
    'Kara Paniyaram':             ['Urad Dal (Minapappu)','Rice','Onion','Green Chilli','Ginger','Oil'],
    'Adai':                       ['Rice','Chana Dal','Toor Dal (Kandi Pappu)','Urad Dal (Minapappu)','Red Chilli','Oil'],
    'Adai + Avial':['Rice','Chana Dal','Mixed Vegetables','Coconut','Curd','Oil'],
    'Bread Upma':                 ['Bread','Onion','Tomato','Mustard Seeds','Curry Leaves','Oil'],
    'Vegetable Sandwich':         ['Bread','Mixed Vegetables','Cheese','Butter'],
    'Bread Omelette':             ['Bread','Egg','Onion','Green Chilli','Oil'],
    '2 Idlis + Sambar':           ['Urad Dal (Minapappu)','Rice','Toor Dal (Kandi Pappu)','Tamarind','Sambar Powder'],
    '1 Dosa + Sambar':            ['Urad Dal (Minapappu)','Rice','Toor Dal (Kandi Pappu)','Tamarind','Sambar Powder'],
    // ── Dal & Curry ───────────────────────────────────────────────────
    'Toor Dal':                   ['Toor Dal (Kandi Pappu)','Turmeric','Mustard Seeds','Oil','Garlic'],
    'Moong Dal':                  ['Moong Dal','Turmeric','Mustard Seeds','Oil','Garlic'],
    'Masoor Dal':                 ['Masoor Dal (Red Lentil)','Turmeric','Onion','Tomato','Oil','Spices'],
    'Chana Dal':                  ['Chana Dal','Turmeric','Onion','Tomato','Oil','Spices'],
    'Dal Tadka':                  ['Toor Dal (Kandi Pappu)','Onion','Tomato','Garlic','Cumin Seeds','Ghee','Turmeric'],
    'Dal Fry':                    ['Toor Dal (Kandi Pappu)','Onion','Tomato','Garlic','Cumin Seeds','Oil','Spices'],
    'Palak Dal':                  ['Toor Dal (Kandi Pappu)','Spinach (Palak)','Onion','Tomato','Garlic','Oil','Spices'],
    'Rajma Curry':                ['Rajma (Kidney Beans)','Onion','Tomato','Garlic','Ginger','Oil','Spices'],
    'Chole':                      ['Chickpeas (Kabuli Chana)','Onion','Tomato','Garlic','Ginger','Oil','Chole Masala'],
    'Black Chana Curry':          ['Black Chickpeas (Kala Chana)','Onion','Tomato','Garlic','Oil','Spices'],
    'Aloo Curry':                 ['Potato','Onion','Tomato','Oil','Spices'],
    'Beans Curry':                ['Green Beans','Onion','Tomato','Oil','Spices'],
    'Cabbage Curry':              ['Cabbage','Onion','Mustard Seeds','Curry Leaves','Oil','Spices'],
    'Bhindi Fry / Curry':         ['Bhindi (Okra / Bendakaya)','Onion','Tomato','Oil','Spices'],
    'Brinjal Curry':              ['Brinjal (Vankaya)','Onion','Tomato','Oil','Spices'],
    'Cauliflower Curry':          ['Cauliflower','Onion','Tomato','Oil','Spices'],
    'Mixed Vegetable Curry':      ['Mixed Vegetables','Onion','Tomato','Oil','Spices'],
    'Palak Curry':                ['Spinach (Palak)','Onion','Tomato','Garlic','Oil','Spices'],
    'Vegetable Korma':            ['Mixed Vegetables','Onion','Cashews','Curd','Spices','Oil'],
    'Dal Makhani':                ['Urad Dal (Minapappu)','Rajma (Kidney Beans)','Butter','Cream','Onion','Tomato','Spices'],
    'Dal Palak':                  ['Toor Dal (Kandi Pappu)','Spinach (Palak)','Onion','Garlic','Oil','Spices'],
    'Lauki Dal':                  ['Toor Dal (Kandi Pappu)','Bottle Gourd (Sorakaya)','Turmeric','Oil','Spices'],
    'Ridge Gourd Dal':            ['Toor Dal (Kandi Pappu)','Ridge Gourd (Beerakaya)','Onion','Tomato','Oil','Spices'],
    'Bottle Gourd Curry':         ['Bottle Gourd (Sorakaya)','Onion','Tomato','Oil','Spices'],
    'Pumpkin Curry':              ['Pumpkin','Onion','Mustard Seeds','Curry Leaves','Oil'],
    'Sweet Potato Curry':         ['Sweet Potato','Onion','Oil','Spices'],
    'Beetroot Curry':             ['Beetroot','Onion','Mustard Seeds','Coconut','Oil'],
    'Carrot Peas Curry':          ['Carrot','Green Peas','Onion','Tomato','Oil','Spices'],
    'Mushroom Curry':             ['Mushroom','Onion','Tomato','Garlic','Oil','Spices'],
    'Mushroom Masala':            ['Mushroom','Onion','Tomato','Garlic','Ginger','Oil','Spices'],
    'Mushroom Pepper Fry':        ['Mushroom','Onion','Black Pepper','Garlic','Oil'],
    'Corn Masala':                ['Sweet Corn','Onion','Tomato','Oil','Spices'],
    // ── North Indian ──────────────────────────────────────────────────
    'Aloo Gobi':                  ['Potato','Cauliflower','Onion','Tomato','Oil','Spices'],
    'Palak Paneer':               ['Spinach (Palak)','Paneer','Onion','Tomato','Garlic','Ginger','Cream','Oil'],
    'Paneer Butter Masala':       ['Paneer','Tomato','Butter','Cream','Onion','Garlic','Ginger','Spices'],
    'Kadai Paneer':               ['Paneer','Capsicum','Onion','Tomato','Garlic','Ginger','Oil','Kadai Masala'],
    'Shahi Paneer':               ['Paneer','Onion','Tomato','Cashews','Cream','Butter','Spices'],
    'Matar Paneer':               ['Paneer','Green Peas','Onion','Tomato','Garlic','Ginger','Oil','Spices'],
    'Paneer Tikka Masala':        ['Paneer','Capsicum','Onion','Curd','Tomato','Cream','Oil','Spices'],
    'Malai Kofta':                ['Paneer','Potato','Cashews','Cream','Onion','Tomato','Spices'],
    'Vegetable Kofta':            ['Mixed Vegetables','Maida (All-Purpose Flour)','Onion','Tomato','Oil','Spices'],
    'Navratan Korma':             ['Mixed Vegetables','Paneer','Cashews','Cream','Milk','Spices'],
    'Aloo Matar':                 ['Potato','Green Peas','Onion','Tomato','Oil','Spices'],
    'Matar Masala':               ['Green Peas','Onion','Tomato','Garlic','Ginger','Oil','Spices'],
    // ── Andhra Special ────────────────────────────────────────────────
    'Pappu / Mudda Pappu':        ['Toor Dal (Kandi Pappu)','Turmeric','Ghee'],
    'Tomato Pappu':               ['Toor Dal (Kandi Pappu)','Tomato','Turmeric','Mustard Seeds','Garlic','Oil'],
    'Palakura Pappu':             ['Toor Dal (Kandi Pappu)','Spinach (Palak)','Turmeric','Garlic','Oil'],
    'Gongura Pappu':              ['Toor Dal (Kandi Pappu)','Gongura Leaves','Garlic','Red Chilli','Oil'],
    'Mamidikaya Pappu':           ['Toor Dal (Kandi Pappu)','Raw Mango','Turmeric','Mustard Seeds','Oil'],
    'Gongura Pachadi':            ['Gongura Leaves','Red Chilli','Garlic','Oil','Mustard Seeds'],
    'Tomato Pachadi':             ['Tomato','Red Chilli','Garlic','Oil','Mustard Seeds'],
    'Vankaya Pachadi':            ['Brinjal (Vankaya)','Tomato','Garlic','Red Chilli','Oil'],
    'Beerakaya Pachadi':          ['Ridge Gourd (Beerakaya)','Garlic','Red Chilli','Oil'],
    'Dosakaya Pachadi':           ['Yellow Cucumber (Dosakaya)','Garlic','Green Chilli','Oil'],
    'Peanut Chutney Andhra':      ['Peanuts','Red Chilli','Garlic','Oil','Mustard Seeds'],
    'Nalla Karam':                ['Peanuts','Red Chilli','Garlic','Salt'],
    'Kandi Podi':                 ['Toor Dal (Kandi Pappu)','Red Chilli','Garlic','Salt'],
    'Idli Podi':                  ['Urad Dal (Minapappu)','Chana Dal','Red Chilli','Sesame Seeds','Salt'],
    'Gongura Chicken':            ['Chicken','Gongura Leaves','Onion','Garlic','Ginger','Oil','Spices'],
    'Andhra Chicken Curry':       ['Chicken','Onion','Tomato','Garlic','Ginger','Oil','Andhra Spices'],
    'Kodi Vepudu':                ['Chicken','Onion','Curry Leaves','Red Chilli','Oil','Spices'],
    'Chicken Iguru':              ['Chicken','Onion','Garlic','Ginger','Oil','Spices'],
    'Chicken Fry Andhra':         ['Chicken','Onion','Curry Leaves','Red Chilli','Oil','Spices'],
    'Gongura Mutton':             ['Mutton','Gongura Leaves','Onion','Garlic','Ginger','Oil','Spices'],
    'Mutton Iguru':               ['Mutton','Onion','Garlic','Ginger','Oil','Spices'],
    'Royyala Iguru':              ['Prawns (Royyalu)','Onion','Garlic','Ginger','Oil','Spices'],
    'Royyala Vepudu':             ['Prawns (Royyalu)','Onion','Curry Leaves','Red Chilli','Oil'],
    'Chepala Pulusu':             ['Fish (Chepalu)','Tamarind','Onion','Tomato','Oil','Spices'],
    'Chepala Fry':                ['Fish (Chepalu)','Onion','Red Chilli','Oil','Spices'],
    'Gutti Vankaya':              ['Brinjal (Vankaya)','Onion','Peanuts','Sesame Seeds','Oil','Spices'],
    'Gutti Dondakaya':            ['Ivy Gourd (Dondakaya)','Peanuts','Sesame Seeds','Oil','Spices'],
    'Bendakaya Fry':              ['Bhindi (Okra / Bendakaya)','Onion','Oil','Spices'],
    'Aloo Fry':                   ['Potato','Onion','Curry Leaves','Red Chilli','Oil'],
    'Dondakaya Fry':              ['Ivy Gourd (Dondakaya)','Onion','Oil','Spices'],
    'Cabbage Poriyal':            ['Cabbage','Onion','Mustard Seeds','Curry Leaves','Coconut','Oil'],
    'Carrot Beans Poriyal':       ['Carrot','Green Beans','Mustard Seeds','Curry Leaves','Coconut','Oil'],
    'Sorakaya Curry':             ['Bottle Gourd (Sorakaya)','Onion','Mustard Seeds','Oil'],
    'Beerakaya Curry':            ['Ridge Gourd (Beerakaya)','Onion','Mustard Seeds','Oil'],
    'Dosakaya Curry':             ['Yellow Cucumber (Dosakaya)','Onion','Mustard Seeds','Oil'],
    'Majjiga Pulusu':             ['Curd','Mixed Vegetables','Turmeric','Mustard Seeds','Oil'],
    'Avakaya':                    ['Raw Mango','Red Chilli Powder','Mustard Powder','Salt','Oil'],
    'Gongura Pickle':             ['Gongura Leaves','Red Chilli','Oil','Salt'],
    'Mango Pickle':               ['Raw Mango','Red Chilli Powder','Salt','Oil'],
    'Bobbatlu / Puran Poli':      ['Maida (All-Purpose Flour)','Chana Dal','Jaggery','Turmeric','Ghee'],
    'Poornalu':                   ['Rice Flour','Chana Dal','Jaggery','Oil'],
    'Ariselu':                    ['Rice Flour','Jaggery','Sesame Seeds','Oil'],
    'Garelu':                     ['Urad Dal (Minapappu)','Oil','Salt'],
    'Sarvapindi':                 ['Rice Flour','Peanuts','Sesame Seeds','Chana Dal','Onion','Red Chilli','Oil'],
    'Sakinalu':                   ['Rice Flour','Sesame Seeds','Oil','Salt'],
    'Chekkalu':                   ['Rice Flour','Chana Dal','Sesame Seeds','Red Chilli','Oil'],
    // ── Chicken───────────────────────────────────────────────────────
    'Chicken Breast':             ['Chicken Breast','Oil','Spices'],
    'Chicken Thigh':              ['Chicken Thigh','Oil','Spices'],
    'Chicken Curry':              ['Chicken','Onion','Tomato','Garlic','Ginger','Oil','Spices'],
    'Chicken Fry':                ['Chicken','Onion','Curry Leaves','Red Chilli','Oil','Spices'],
    'Chicken Tikka':              ['Chicken','Curd','Lemon','Garlic','Ginger','Spices','Oil'],
    'Tandoori Chicken':           ['Chicken','Curd','Lemon','Garlic','Ginger','Tandoori Masala'],
    'Chicken 65':                 ['Chicken','Red Chilli','Garlic','Ginger','Egg','Cornflour','Oil'],
    'Butter Chicken':             ['Chicken','Butter','Tomato','Cream','Garlic','Ginger','Spices'],
    'Chicken Kebab':              ['Chicken','Onion','Garlic','Ginger','Curd','Spices','Oil'],
    'Chicken Chettinad':          ['Chicken','Onion','Tomato','Coconut','Chettinad Masala','Oil'],
    'Chicken Korma':              ['Chicken','Onion','Cashews','Curd','Cream','Spices','Oil'],
    'Chicken Stew':               ['Chicken','Onion','Potato','Coconut Milk','Spices'],
    'Chicken Sukka':              ['Chicken','Onion','Curry Leaves','Coconut','Red Chilli','Oil'],
    'Chicken Pepper Fry':         ['Chicken','Onion','Black Pepper','Curry Leaves','Oil','Garlic'],
    'Chicken Lollipop':           ['Chicken Wings','Cornflour','Egg','Red Chilli','Garlic','Oil'],
    'Chicken Wings':              ['Chicken Wings','Garlic','Red Chilli','Oil','Spices'],
    'Chicken Seekh Kebab':        ['Minced Chicken (Keema)','Onion','Garlic','Ginger','Spices'],
    'Chicken Shawarma':           ['Chicken','Pita Bread','Garlic Sauce','Mixed Vegetables','Spices'],
    'Chicken Roll':               ['Chicken','Roti / Wrap','Onion','Capsicum','Spices'],
    'Chicken Frankie':            ['Chicken','Maida (All-Purpose Flour)','Onion','Capsicum','Egg','Spices'],
    'Chicken Burger':             ['Chicken','Burger Bun','Lettuce','Onion','Mayonnaise'],
    'Chicken Sandwich':           ['Chicken','Bread','Lettuce','Onion','Mayonnaise'],
    '100g Chicken + 1 cup Rice':  ['Chicken','Rice','Oil','Spices'],
    // ── Mutton & Seafood ──────────────────────────────────────────────
    'Mutton Curry':               ['Mutton','Onion','Tomato','Garlic','Ginger','Oil','Spices'],
    'Mutton Fry':                 ['Mutton','Onion','Curry Leaves','Red Chilli','Oil','Spices'],
    'Mutton Kebab':               ['Mutton','Onion','Garlic','Ginger','Spices'],
    'Keema Curry':                ['Minced Meat (Keema)','Onion','Tomato','Garlic','Ginger','Oil','Spices'],
    'Fish Curry':                 ['Fish','Onion','Tomato','Coconut','Tamarind','Oil','Spices'],
    'Fried Fish':                 ['Fish','Red Chilli','Turmeric','Oil','Spices'],
    'Fish Tikka':                 ['Fish','Curd','Lemon','Garlic','Spices','Oil'],
    'Fish Fingers':               ['Fish Fillet','Breadcrumbs','Egg','Cornflour','Oil'],
    'Prawn Curry':                ['Prawns','Onion','Tomato','Coconut Milk','Oil','Spices'],
    'Prawn Fry':                  ['Prawns','Onion','Red Chilli','Curry Leaves','Oil','Spices'],
    // ── Dairy─────────────────────────────────────────────────────────
    'Curd':                       ['Curd'],
    'Low-fat Curd':               ['Curd (Low-fat)'],
    'Buttermilk':                 ['Buttermilk'],
    'Paneer':                     ['Paneer'],
    'Low-fat Paneer':             ['Paneer (Low-fat)'],
    'Toned Milk':                 ['Milk'],
    'Full-fat Milk':              ['Milk'],
    'Cheese':                     ['Cheese'],
    'Ghee':                       ['Ghee'],
    'Butter':                     ['Butter'],
    'Paneer Tikka':               ['Paneer','Curd','Capsicum','Onion','Spices','Oil'],
    'Raita':                      ['Curd','Cucumber','Onion','Cumin Powder','Salt'],
    'Cucumber Raita':             ['Curd','Cucumber','Cumin Powder','Salt'],
    'Boondi Raita':               ['Curd','Boondi','Cumin Powder','Salt'],
    // ── Millets ───────────────────────────────────────────────────────
    'Ragi Mudde':                 ['Ragi Flour','Salt'],
    'Ragi Sangati':               ['Ragi Flour','Salt'],
    'Ragi Dosa':                  ['Ragi Flour','Onion','Green Chilli','Oil','Salt'],
    'Ragi Roti':                  ['Ragi Flour','Onion','Coriander','Oil','Salt'],
    'Ragi Idli':                  ['Ragi Flour','Urad Dal (Minapappu)','Salt'],
    'Ragi Upma':                  ['Ragi Flour','Onion','Mustard Seeds','Curry Leaves','Oil'],
    'Jowar Roti':                 ['Jowar Flour','Salt'],
    'Bajra Roti':                 ['Bajra Flour','Salt'],
    'Foxtail Millet Upma':        ['Foxtail Millet (Korralu)','Onion','Mustard Seeds','Curry Leaves','Oil'],
    'Foxtail Millet Rice':        ['Foxtail Millet (Korralu)','Oil','Salt'],
    'Little Millet Rice':         ['Little Millet (Samalu)','Oil','Salt'],
    'Kodo Millet Rice':           ['Kodo Millet','Oil','Salt'],
    'Barnyard Millet Rice':       ['Barnyard Millet (Udalu)','Oil','Salt'],
    'Millet Pongal':              ['Foxtail Millet (Korralu)','Moong Dal','Ghee','Black Pepper','Cumin Seeds','Ginger'],
    'Millet Dosa':                ['Foxtail Millet (Korralu)','Urad Dal (Minapappu)','Salt','Oil'],
    // ── Snacks ────────────────────────────────────────────────────────
    'Roasted Peanuts':            ['Peanuts'],
    'Roasted Chana':              ['Chana (Roasted)'],
    'Peanut Chutney':             ['Peanuts','Red Chilli','Garlic','Oil','Mustard Seeds'],
    'Coconut Chutney':            ['Coconut','Green Chilli','Ginger','Mustard Seeds','Curry Leaves','Oil'],
    'Samosa':                     ['Maida (All-Purpose Flour)','Potato','Green Peas','Spices','Oil'],
    'Kachori':                    ['Maida (All-Purpose Flour)','Moong Dal','Spices','Oil'],
    'Pakora':                     ['Besan (Gram Flour)','Onion','Mixed Vegetables','Spices','Oil'],
    'Mirchi Bajji':               ['Green Chilli (Large)','Besan (Gram Flour)','Spices','Oil'],
    'Papad':                      ['Papad'],
    'Murukku':                    ['Rice Flour','Urad Dal (Minapappu)','Sesame Seeds','Oil'],
    'Popcorn, plain':             ['Corn','Oil','Salt'],
    'Makhana / Fox Nuts':         ['Makhana (Fox Nuts)'],
    'Sprouts':                    ['Moong Dal'],
    'Dhokla':                     ['Besan (Gram Flour)','Curd','Baking Soda','Mustard Seeds','Oil'],
    'Almonds':                    ['Almonds'],
    'Cashews':                    ['Cashews'],
    'Walnuts':                    ['Walnuts'],
    'Mixed Nuts':                 ['Mixed Nuts'],
    'Chia Seeds':                 ['Chia Seeds'],
    'Pumpkin Seeds':              ['Pumpkin Seeds'],
    'Protein Bar':                ['Protein Bar'],
    'Dark Chocolate':             ['Dark Chocolate'],
    // ── Fruits ────────────────────────────────────────────────────────
    'Apple':                      ['Apple'],
    'Banana':                     ['Banana'],
    'Orange':                     ['Orange'],
    'Mosambi':                    ['Mosambi'],
    'Pomegranate':                ['Pomegranate'],
    'Full Pomegranate':           ['Pomegranate'],
    'Papaya':                     ['Papaya'],
    'Watermelon':                 ['Watermelon'],
    'Mango':                      ['Mango'],
    'Guava':                      ['Guava'],
    'Grapes':                     ['Grapes'],
    'Pineapple':                  ['Pineapple'],
    'Chikoo':                     ['Chikoo'],
    'Pear':                       ['Pear'],
    'Custard Apple':              ['Custard Apple (Sitaphal)'],
    'Jackfruit':                  ['Jackfruit'],
    'Kiwi':                       ['Kiwi'],
    'Strawberry':                 ['Strawberry'],
    'Dates':                      ['Dates'],
    'Fruit Bowl':                 ['Mixed Fruits'],
    // ── Eggs ──────────────────────────────────────────────────────────
    'Egg':                        ['Eggs'],
    'Boiled Eggs':                ['Eggs'],
    'Omelette':                   ['Eggs','Onion','Green Chilli','Oil','Salt'],
    'Egg Bhurji':                 ['Eggs','Onion','Tomato','Green Chilli','Oil','Spices'],
    'Egg Whites':                 ['Eggs'],
    'Scrambled Eggs':             ['Eggs','Butter','Salt'],
    // ── Sweets ────────────────────────────────────────────────────────
    'Gulab Jamun':                ['Milk Powder','Maida (All-Purpose Flour)','Oil','Sugar','Cardamom'],
    'Rasgulla':                   ['Paneer','Sugar','Cardamom'],
    'Rasmalai':                   ['Paneer','Milk','Sugar','Saffron','Cardamom'],
    'Jalebi':                     ['Maida (All-Purpose Flour)','Curd','Sugar','Saffron','Oil'],
    'Kheer':                      ['Rice','Milk','Sugar','Cardamom','Dry Fruits'],
    'Payasam':                    ['Vermicelli / Rice','Milk','Sugar','Ghee','Cardamom'],
    'Carrot Halwa':               ['Carrot','Milk','Sugar','Ghee','Cardamom'],
    'Badam Halwa':                ['Almonds','Milk','Sugar','Ghee','Saffron'],
    'Mysore Pak':                 ['Besan (Gram Flour)','Ghee','Sugar'],
    'Kaju Katli':                 ['Cashews','Sugar','Ghee'],
    'Laddu':                      ['Besan (Gram Flour)','Ghee','Sugar','Cardamom'],
    'Motichoor Laddu':            ['Besan (Gram Flour)','Ghee','Sugar','Cardamom'],
    'Besan Laddu':                ['Besan (Gram Flour)','Ghee','Sugar','Cardamom'],
    'Coconut Laddu':              ['Coconut','Sugar','Milk','Cardamom'],
    'Boondi Laddu':               ['Besan (Gram Flour)','Sugar','Ghee','Cardamom'],
    'Rava Laddu':                 ['Rava (Sooji)','Sugar','Ghee','Cardamom'],
    'Dry Fruit Laddu':            ['Dry Fruits Mix','Dates','Honey','Cardamom'],
    'Modak':                      ['Rice Flour','Coconut','Jaggery','Ghee'],
    'Kozhukattai':                ['Rice Flour','Coconut','Jaggery'],
    'Peda':                       ['Milk Powder','Sugar','Ghee','Cardamom'],
    'Barfi':                      ['Milk Powder','Sugar','Ghee','Cardamom'],
    'Soan Papdi':                 ['Besan (Gram Flour)','Maida (All-Purpose Flour)','Ghee','Sugar'],
    'Semiya Payasam':             ['Vermicelli (Semiya)','Milk','Sugar','Ghee','Cardamom'],
    'Rice Kheer':                 ['Rice','Milk','Sugar','Cardamom','Dry Fruits'],
    'Shrikhand':                  ['Curd','Sugar','Saffron','Cardamom'],
    'Kulfi':                      ['Milk','Sugar','Cardamom','Dry Fruits'],
    'Ice Cream':                  ['Ice Cream'],
    'Falooda':                    ['Vermicelli (Semiya)','Rose Syrup','Milk','Basil Seeds','Ice Cream'],
    'Brownie':                    ['Maida (All-Purpose Flour)','Dark Chocolate','Butter','Sugar','Eggs'],
    // ── Beverages ─────────────────────────────────────────────────────
    'Masala Chai':                ['Tea Leaves','Milk','Sugar','Ginger','Cardamom'],
    'Tea with Milk & Sugar':      ['Tea Leaves','Milk','Sugar'],
    'Tea without Sugar':          ['Tea Leaves','Milk'],
    'Ginger Tea':                 ['Tea Leaves','Milk','Ginger','Sugar'],
    'Elaichi Tea':                ['Tea Leaves','Milk','Cardamom','Sugar'],
    'Filter Coffee':              ['Coffee Powder','Milk','Sugar'],
    'Black Coffee':               ['Coffee Powder'],
    'Cold Coffee':                ['Coffee Powder','Milk','Sugar','Ice'],
    'Buttermilk / Chaas':         ['Curd','Salt','Cumin Powder'],
    'Sweet Lassi':                ['Curd','Sugar','Cardamom'],
    'Salt Lassi':                 ['Curd','Salt','Cumin Powder'],
    'Mango Lassi':                ['Curd','Mango','Sugar','Cardamom'],
    'Tender Coconut Water':       ['Tender Coconut'],
    'Fresh Lime Water':           ['Lime','Sugar / Salt'],
    'Fresh Lime Soda with Sugar': ['Lime','Soda Water','Sugar'],
    'Orange Juice':               ['Orange'],
    'Sugarcane Juice':            ['Sugarcane'],
    'Milkshake':                  ['Milk','Sugar','Ice Cream'],
    'Mango Shake':                ['Mango','Milk','Sugar'],
    'Banana Shake':               ['Banana','Milk','Sugar'],
    'Strawberry Shake':           ['Strawberry','Milk','Sugar'],
    'Chocolate Shake':            ['Chocolate Powder','Milk','Sugar','Ice Cream'],
    'Pomegranate Juice':          ['Pomegranate'],
    'Watermelon Juice':           ['Watermelon'],
    'Sweet Lime Juice':           ['Mosambi'],
    'Aam Panna':                  ['Raw Mango','Mint Leaves','Sugar','Cumin Seeds'],
    'Rooh Afza Milk':             ['Milk','Rooh Afza Syrup'],
    'Jaljeera':                   ['Cumin Seeds','Mint Leaves','Lemon','Spices'],
    'Tea +2 Biscuits':           ['Tea Leaves','Milk','Sugar','Biscuits'],
    // ── Salads & Soups ────────────────────────────────────────────────
    'Cucumber Salad':             ['Cucumber','Onion','Tomato','Lemon','Salt'],
    'Tomato Salad':               ['Tomato','Onion','Cucumber','Lemon','Salt'],
    'Carrot Salad':               ['Carrot','Lemon','Salt'],
    'Beetroot Salad':             ['Beetroot','Onion','Lemon','Salt'],
    'Sprouts Salad':              ['Moong Dal Sprouts','Onion','Tomato','Lemon','Salt'],
    'Chickpea Salad':             ['Chickpeas (Kabuli Chana)','Onion','Tomato','Cucumber','Lemon','Salt'],
    'Corn Salad':                 ['Sweet Corn','Onion','Tomato','Lemon','Salt'],
    'Clear Vegetable Soup':       ['Mixed Vegetables','Garlic','Black Pepper','Salt','Oil'],
    'Tomato Soup':                ['Tomato','Onion','Garlic','Cream','Butter','Salt'],
    'Sweet Corn Soup':            ['Sweet Corn','Cornflour','Onion','Garlic','Salt'],
    'Chicken Clear Soup':         ['Chicken','Mixed Vegetables','Garlic','Black Pepper','Salt'],
    // ── Street Food ───────────────────────────────────────────────────
    'Pani Puri':                  ['Puri (Golgappa)','Potato','Chickpeas (Kabuli Chana)','Tamarind','Spices'],
    'Bhel Puri':                  ['Puffed Rice','Sev','Onion','Tomato','Coriander','Tamarind Chutney'],
    'Sev Puri':                   ['Puri (Golgappa)','Sev','Potato','Onion','Tomato','Chutneys'],
    'Dahi Puri':                  ['Puri (Golgappa)','Curd','Potato','Onion','Chutneys','Sev'],
    'Papdi Chaat':                ['Papdi','Curd','Potato','Onion','Chutneys','Sev'],
    'Aloo Tikki':                 ['Potato','Onion','Green Chilli','Cornflour','Spices','Oil'],
    'Aloo Tikki Chaat':           ['Potato','Onion','Curd','Chutneys','Sev','Spices'],
    'Samosa Chaat':               ['Potato','Curd','Chickpeas (Kabuli Chana)','Chutneys','Sev'],
    'Pav Bhaji':                  ['Mixed Vegetables','Pav Bun','Butter','Onion','Tomato','Pav Bhaji Masala'],
    'Vada Pav':                   ['Potato','Pav Bun','Besan (Gram Flour)','Garlic Chutney','Oil'],
    'Dabeli':                     ['Potato','Pav Bun','Pomegranate','Peanuts','Dabeli Masala'],
    'Ragda Pattice':              ['White Peas (Ragda)','Potato','Onion','Chutneys','Sev'],
    'Corn Chaat':                 ['Sweet Corn','Onion','Tomato','Lemon','Spices'],
    'Peanut Chaat':               ['Peanuts','Onion','Tomato','Lemon','Spices'],
    'Sprouts Chaat':              ['Moong Dal Sprouts','Onion','Tomato','Lemon','Spices'],
    'Chana Chaat':                ['Chickpeas (Kabuli Chana)','Onion','Tomato','Lemon','Spices'],
    // ── Fast Food ─────────────────────────────────────────────────────
    'Veg Burger':                 ['Burger Bun','Veg Patty','Lettuce','Onion','Tomato','Mayonnaise'],
    'Paneer Burger':              ['Burger Bun','Paneer Patty','Lettuce','Onion','Tomato','Mayonnaise'],
    'French Fries':               ['Potato','Oil','Salt'],
    'Veg Pizza':                  ['Pizza Base','Tomato Sauce','Cheese','Mixed Vegetables'],
    'Chicken Pizza':              ['Pizza Base','Tomato Sauce','Cheese','Chicken'],
    'Cheese Pizza':               ['Pizza Base','Tomato Sauce','Cheese'],
    'Margherita Pizza':           ['Pizza Base','Tomato Sauce','Cheese','Basil'],
    'White Sauce Pasta':          ['Pasta','Butter','Maida (All-Purpose Flour)','Milk','Cheese'],
    'Red Sauce Pasta':            ['Pasta','Tomato','Garlic','Onion','Olive Oil','Basil'],
    'Chicken Pasta':              ['Pasta','Chicken','Tomato Sauce','Garlic','Oil'],
    'Veg Noodles':                ['Noodles','Mixed Vegetables','Soy Sauce','Garlic','Oil'],
    'Chicken Noodles':            ['Noodles','Chicken','Mixed Vegetables','Soy Sauce','Oil'],
    'Schezwan Noodles':           ['Noodles','Schezwan Sauce','Mixed Vegetables','Garlic','Oil'],
    'Veg Momos':                  ['Maida (All-Purpose Flour)','Mixed Vegetables','Garlic','Ginger','Soy Sauce'],
    'Chicken Momos':              ['Maida (All-Purpose Flour)','Minced Chicken (Keema)','Garlic','Ginger','Soy Sauce'],
    'Fried Momos':                ['Maida (All-Purpose Flour)','Mixed Vegetables','Oil'],
    'Veg Manchurian':             ['Mixed Vegetables','Maida (All-Purpose Flour)','Soy Sauce','Garlic','Ginger','Oil'],
    'Chicken Manchurian':         ['Chicken','Cornflour','Soy Sauce','Garlic','Ginger','Oil'],
    'Spring Roll':                ['Maida (All-Purpose Flour)','Mixed Vegetables','Soy Sauce','Oil'],
    'Shawarma':                   ['Chicken','Pita Bread','Garlic Sauce','Mixed Vegetables','Spices'],
    'Paneer Wrap':                ['Paneer','Roti / Wrap','Onion','Capsicum','Mint Chutney'],
    'Veg Wrap':                   ['Mixed Vegetables','Roti / Wrap','Onion','Capsicum','Mint Chutney'],
  };

  // ── Ingredient → Shopping category (longest-key match wins) ──────────
  const ING_CATEGORY = {
    //🥬 Vegetables
    'mixed vegetables':           '🥬 Vegetables',
    'spinach (palak)':            '🥬 Vegetables',
    'bottle gourd (sorakaya)':    '🥬 Vegetables',
    'ridge gourd (beerakaya)':    '🥬 Vegetables',
    'ivy gourd (dondakaya)':      '🥬 Vegetables',
    'brinjal (vankaya)':          '🥬 Vegetables',
    'bhindi (okra / bendakaya)':  '🥬 Vegetables',
    'yellow cucumber (dosakaya)': '🥬 Vegetables',
    'fenugreek leaves (methi)':   '🥬 Vegetables',
    'gongura leaves':             '🥬 Vegetables',
    'green chilli (large)':       '🥬 Vegetables',
    'moong dal sprouts':          '🥬 Vegetables',
    'sweet potato':               '🥬 Vegetables',
    'sweet corn':                 '🥬 Vegetables',
    'spring onion':'🥬 Vegetables',
    'green beans':                '🥬 Vegetables',
    'green peas':                 '🥬 Vegetables',
    'cauliflower':                '🥬 Vegetables',
    'capsicum':                   '🥬 Vegetables',
    'mushroom':                   '🥬 Vegetables',
    'pumpkin':                    '🥬 Vegetables',
    'beetroot':                   '🥬 Vegetables',
    'cucumber':                   '🥬 Vegetables',
    'coriander':                  '🥬 Vegetables',
    'mint leaves':                '🥬 Vegetables',
    'curry leaves':               '🥬 Vegetables',
    'green chilli':               '🥬 Vegetables',
    'ginger':                     '🥬 Vegetables',
    'garlic':                     '🥬 Vegetables',
    'cabbage':                    '🥬 Vegetables',
    'tomato':                     '🥬 Vegetables',
    'onion':                      '🥬 Vegetables',
    'potato':                     '🥬 Vegetables',
    'carrot':                     '🥬 Vegetables',
    'spinach':                    '🥬 Vegetables',
    'palak':                      '🥬 Vegetables',
    'corn':                       '🥬 Vegetables',
    'jackfruit':                  '🥬 Vegetables',
    'raw mango':                  '🥬 Vegetables',
    'lettuce':                    '🥬 Vegetables',
    //🌾 Grains & Dal
    'toor dal (kandi pappu)':     '🌾 Grains & Dal',
    'urad dal (minapappu)':       '🌾 Grains & Dal',
    'moong dal (pesara pappu)':   '🌾 Grains & Dal',
    'masoor dal (red lentil)':    '🌾 Grains & Dal',
    'rajma (kidney beans)':       '🌾 Grains & Dal',
    'chickpeas (kabuli chana)':   '🌾 Grains & Dal',
    'black chickpeas (kala chana)':'🌾 Grains & Dal',
    'chickpeas (kadala)':         '🌾 Grains & Dal',
    'white peas (ragda)':         '🌾 Grains & Dal',
    'chana (roasted)':            '🌾 Grains & Dal',
    'maida (all-purpose flour)':  '🌾 Grains & Dal',
    'besan (gram flour)':         '🌾 Grains & Dal',
    'poha (flattened rice)':      '🌾 Grains & Dal',
    'sabudana (sago)':            '🌾 Grains & Dal',
    'foxtail millet (korralu)':   '🌾 Grains & Dal',
    'little millet (samalu)':     '🌾 Grains & Dal',
    'barnyard millet (udalu)':    '🌾 Grains & Dal',
    'rava (sooji)':               '🌾 Grains & Dal',
    'basmati rice':               '🌾 Grains & Dal',
    'brown rice':                 '🌾 Grains & Dal',
    'red rice':                   '🌾 Grains & Dal',
    'rice flour':                 '🌾 Grains & Dal',
    'wheat flour':                '🌾 Grains & Dal',
    'multigrain flour':           '🌾 Grains & Dal',
    'ragi flour':                 '🌾 Grains & Dal',
    'jowar flour':                '🌾 Grains & Dal',
    'bajra flour':                '🌾 Grains & Dal',
    'kodo millet':                '🌾 Grains & Dal',
    'moong dal':                  '🌾 Grains & Dal',
    'chana dal':                  '🌾 Grains & Dal',
    'toor dal':                   '🌾 Grains & Dal',
    'urad dal':                   '🌾 Grains & Dal',
    'rice':                       '🌾 Grains & Dal',
    'oats':                       '🌾 Grains & Dal',
    'bread':                      '🌾 Grains & Dal',
    'pav bun':                    '🌾 Grains & Dal',
    'burger bun':                 '🌾 Grains & Dal',
    'pita bread':                 '🌾 Grains & Dal',
    'roti / wrap':                '🌾 Grains & Dal',
    'pasta':                      '🌾 Grains & Dal',
    'noodles':                    '🌾 Grains & Dal',
    'pizza base':                 '🌾 Grains & Dal',
    'puri (golgappa)':            '🌾 Grains & Dal',
    'puffed rice':                '🌾 Grains & Dal',
    'vermicelli (semiya)':        '🌾 Grains & Dal',
    'vermicelli / rice':          '🌾 Grains & Dal',
    'papdi':                      '🌾 Grains & Dal',
    'sev':                        '🌾 Grains & Dal',
    // 🍗 Meat & Seafood
    'prawns (royyalu)':           '🍗 Meat & Seafood',
    'fish (chepalu)':             '🍗 Meat & Seafood',
    'minced chicken (keema)':     '🍗 Meat & Seafood',
    'minced meat (keema)':        '🍗 Meat & Seafood',
    'chicken breast':             '🍗 Meat & Seafood',
    'chicken thigh':              '🍗 Meat & Seafood',
    'chicken wings':              '🍗 Meat & Seafood',
    'fish fillet':                '🍗 Meat & Seafood',
    'chicken':                    '🍗 Meat & Seafood',
    'mutton':                     '🍗 Meat & Seafood',
    'prawns':                     '🍗 Meat & Seafood',
    'fish':                       '🍗 Meat & Seafood',
    //🥚 Dairy & Eggs
    'coconut milk':               '🥚 Dairy & Eggs',
    'curd (low-fat)':             '🥚 Dairy & Eggs',
    'paneer (low-fat)':           '🥚 Dairy & Eggs',
    'milk powder':                '🥚 Dairy & Eggs',
    'buttermilk':                 '🥚 Dairy & Eggs',
    'paneer':                     '🥚 Dairy & Eggs',
    'cheese':                     '🥚 Dairy & Eggs',
    'cream':                      '🥚 Dairy & Eggs',
    'butter':                     '🥚 Dairy & Eggs',
    'ghee':                       '🥚 Dairy & Eggs',
    'curd':                       '🥚 Dairy & Eggs',
    'milk':                       '🥚 Dairy & Eggs',
    'eggs':                       '🥚 Dairy & Eggs',
    'egg':                        '🥚 Dairy & Eggs',
    'boondi':                     '🥚 Dairy & Eggs',
    // 🍎 Fruits
    'custard apple (sitaphal)':   '🍎 Fruits',
    'tender coconut':'🍎 Fruits',
    'mixed fruits':               '🍎 Fruits',
    'pomegranate':                '🍎 Fruits',
    'strawberry':                 '🍎 Fruits',
    'pineapple':                  '🍎 Fruits',
    'watermelon':                 '🍎 Fruits',
    'mosambi':                    '🍎 Fruits',
    'jackfruit':                  '🍎 Fruits',
    'coconut':                    '🍎 Fruits',
    'tamarind':                   '🍎 Fruits',
    'banana':                     '🍎 Fruits',
    'orange':                     '🍎 Fruits',
    'papaya':                     '🍎 Fruits',
    'grapes':                     '🍎 Fruits',
    'chikoo':                     '🍎 Fruits',
    'guava':                      '🍎 Fruits',
    'mango':                      '🍎 Fruits',
    'apple':                      '🍎 Fruits',
    'dates':                      '🍎 Fruits',
    'lemon':                      '🍎 Fruits',
    'lime':                       '🍎 Fruits',
    'kiwi':                       '🍎 Fruits',
    'pear':                       '🍎 Fruits',
    //🌶️ Spices & Condiments
    'mustard powder':             '🌶️ Spices & Condiments',
    'red chilli powder':          '🌶️ Spices & Condiments',
    'cumin powder':               '🌶️ Spices & Condiments',
    'cumin seeds':                '🌶️ Spices & Condiments',
    'mustard seeds':              '🌶️ Spices & Condiments',
    'sesame seeds':               '🌶️ Spices & Condiments',
    'whole spices':               '🌶️ Spices & Condiments',
    'andhra spices':              '🌶️ Spices & Condiments',
    'chole masala':               '🌶️ Spices & Condiments',
    'sambar powder':              '🌶️ Spices & Condiments',
    'rasam powder':               '🌶️ Spices & Condiments',
    'tandoori masala':            '🌶️ Spices & Condiments',
    'kadai masala':               '🌶️ Spices & Condiments',
    'chettinad masala':           '🌶️ Spices & Condiments',
    'pav bhaji masala':           '🌶️ Spices & Condiments',
    'dabeli masala':              '🌶️ Spices & Condiments',
    'schezwan sauce':             '🌶️ Spices & Condiments',
    'garlic chutney':             '🌶️ Spices & Condiments',
    'garlic sauce':               '🌶️ Spices & Condiments',
    'tomato sauce':               '🌶️ Spices & Condiments',
    'mint chutney':               '🌶️ Spices & Condiments',
    'tamarind chutney':           '🌶️ Spices & Condiments',
    'black pepper':               '🌶️ Spices & Condiments',
    'baking soda':                '🌶️ Spices & Condiments',
    'cornflour':                  '🌶️ Spices & Condiments',
    'breadcrumbs':                '🌶️ Spices & Condiments',
    'soy sauce':                  '🌶️ Spices & Condiments',
    'olive oil':                  '🌶️ Spices & Condiments',
    'coconut oil':                '🌶️ Spices & Condiments',
    'cardamom':                   '🌶️ Spices & Condiments',
    'turmeric':                   '🌶️ Spices & Condiments',
    'saffron':                    '🌶️ Spices & Condiments',
    'chutneys':                   '🌶️ Spices & Condiments',
    'mayonnaise':                 '🌶️ Spices & Condiments',
    'jaggery':                    '🌶️ Spices & Condiments',
    'spices':                     '🌶️ Spices & Condiments',
    'sugar':                      '🌶️ Spices & Condiments',
    'salt':                       '🌶️ Spices & Condiments',
    'yeast':                      '🌶️ Spices & Condiments',
    'basil':                      '🌶️ Spices & Condiments',
    'oil':                        '🌶️ Spices & Condiments',
    'red chilli':                 '🌶️ Spices & Condiments',
    //📦 Packaged & Other
    'chocolate powder':           '📦 Packaged & Other',
    'rooh afza syrup':            '📦 Packaged & Other',
    'makhana (fox nuts)':         '📦 Packaged & Other',
    'dry fruits mix':             '📦 Packaged & Other',
    'dry fruits':                 '📦 Packaged & Other',
    'pumpkin seeds':              '📦 Packaged & Other',
    'mixed nuts':                 '📦 Packaged & Other',
    'chia seeds':                 '📦 Packaged & Other',
    'protein bar':                '📦 Packaged & Other',
    'dark chocolate':             '📦 Packaged & Other',
    'ice cream':                  '📦 Packaged & Other',
    'rose syrup':                 '📦 Packaged & Other',
    'basil seeds':                '📦 Packaged & Other',
    'soda water':                 '📦 Packaged & Other',
    'coffee powder':              '📦 Packaged & Other',
    'tea leaves':                 '📦 Packaged & Other',
    'biscuits':                   '📦 Packaged & Other',
    'peanuts':                    '📦 Packaged & Other',
    'cashews':                    '📦 Packaged & Other',
    'almonds':                    '📦 Packaged & Other',
    'walnuts':                    '📦 Packaged & Other',
    'honey':                      '📦 Packaged & Other',
    'papad':                      '📦 Packaged & Other',
  };

  const CAT_ORDER = [
    '🥬 Vegetables',
    '🌾 Grains & Dal',
    '🍗 Meat & Seafood',
    '🥚 Dairy & Eggs',
    '🍎 Fruits',
    '🌶️ Spices & Condiments',
    '📦 Packaged & Other',
  ];

  // ── Classify an ingredient into a category (longest key match) ────────
  function _getCategory(ing) {
    const lower = ing.toLowerCase();
    let bestKey = '', bestCat = '📦 Packaged & Other';
    for (const [key, cat] of Object.entries(ING_CATEGORY)) {
      if (lower.includes(key) && key.length > bestKey.length) {
        bestKey = key; bestCat = cat;
      }
    }
    return bestCat;
  }

  // ── Get ingredients for a dish name ──────────────────────────────────
  function _getIngredients(dishName) {
    const stripped = _strip(dishName);
    if (FOOD_INGREDIENTS[stripped]) return FOOD_INGREDIENTS[stripped];
    // Partial prefix match (e.g. "Chicken Breast, cooked" → "Chicken Breast")
    for (const [key, ings] of Object.entries(FOOD_INGREDIENTS)) {
      if (stripped.toLowerCase().startsWith(key.toLowerCase())
          || key.toLowerCase().startsWith(stripped.toLowerCase())) {
        return ings;
      }
    }
    // Fallback: show stripped name itself
    return [stripped];
  }

  // ── Aggregate ingredients from current week plan ──────────────────────
  function _buildShoppingList() {
    if (typeof getWeekPlan === 'undefined') return {};
    const plan = getWeekPlan();
    const ingSet = new Set();
    const days= typeof DAYS  !== 'undefined' ? DAYS  : [];
    const meals = typeof MEALS !== 'undefined' ? MEALS : [];
    days.forEach(day => meals.forEach(meal => {
      (plan[day]?.[meal] || []).forEach(item => {
        _getIngredients(item.name).forEach(ing => ingSet.add(ing));
      });
    }));
    // Group by category
    const byCat = {};
    ingSet.forEach(ing => {
      const cat = _getCategory(ing);
      (byCat[cat] = byCat[cat] || []).push(ing);
    });
    return byCat;
  }

  // ── Checked state — two stores: per-dish and all-ingredients ─────────
  let _dishCk = {}, _allCk = {};
  function _loadSC() {
    try { _dishCk = JSON.parse(localStorage.getItem('wmp_shop_dish')||'{}'); } catch(e){_dishCk={};}
    try { _allCk  = JSON.parse(localStorage.getItem('wmp_shop_all') ||'{}'); } catch(e){_allCk={};}
  }
  function _saveDishCk() { localStorage.setItem('wmp_shop_dish', JSON.stringify(_dishCk)); }
  function _saveAllCk()  { localStorage.setItem('wmp_shop_all',  JSON.stringify(_allCk));  }

  // ── Render: dish cards + combined ingredients ─────────────────────────
  let _rendering = false;
  function _renderShopping(container) {
    if (_rendering) return;
    _rendering = true;
    _loadSC();

    if (typeof getWeekPlan === 'undefined') { _rendering = false; return; }
    const plan  = getWeekPlan();
    const days  = typeof DAYS  !== 'undefined' ? DAYS  : [];
    const meals = typeof MEALS !== 'undefined' ? MEALS : [];

    // Build ordered unique dish list + combined ingredient set
    const seen= new Set();
    const dishes  = [];
    const allIngs = new Set();
    days.forEach(day => meals.forEach(meal => {
      (plan[day]?.[meal] || []).forEach(item => {
        constings = _getIngredients(item.name);
        if (!seen.has(item.name)) { seen.add(item.name); dishes.push({ name: item.name, ings }); }
        ings.forEach(i => allIngs.add(i));
      });
    }));

    if (!dishes.length) {
      container.innerHTML = `<div class="empty-state"><div class="icon">🛒</div><p>No meals planned yet.<br>Add meals in the Planner tab!</p></div>`;
      _rendering = false; return;
    }

    //── Section 1: per-dish expandable cards ──────────────────────────
    const cardsHtml = dishes.map(dish => {
      const label = _strip(dish.name);
      const ingsHtml = dish.ings.map(ing => {
        const key = dish.name + '|' + ing;
        const ck= _dishCk[key] ?'checked' : '';
        return `<div class="grocery-item ${ck}">
          <input type="checkbox" ${ck}
            data-src="dish"
            data-key="${key.replace(/"/g,'&quot;')}"
            data-ing="${ing.replace(/"/g,'&quot;')}">
          <span class="grocery-item-name">${ing}</span>
        </div>`;
      }).join('');
      return `
        <div class="shop-dish-card">
          <div class="shop-dish-header">
            <span>${label}</span>
            <span class="shop-dish-arrow">▼</span>
          </div>
          <div class="shop-dish-ings">${ingsHtml}</div>
        </div>`;
    }).join('');

    // ── Section 2: all ingredients combined (sorted) ──────────────────
    const allHtml = [...allIngs].sort().map(ing => {
      const ck = _allCk[ing] ? 'checked' : '';
      return `<div class="grocery-item ${ck}">
        <input type="checkbox" ${ck}
          data-src="all"
          data-ing="${ing.replace(/"/g,'&quot;')}">
        <span class="grocery-item-name">${ing}</span>
      </div>`;
    }).join('');

    container.innerHTML = cardsHtml + `
      <div class="shop-all-section">
        <div class="shop-all-title">🧺 All Ingredients</div>
        ${allHtml}
      </div>`;

    // Expand / collapse dish cards
    container.querySelectorAll('.shop-dish-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        hdr.nextElementSibling.classList.toggle('open');
        hdr.querySelector('.shop-dish-arrow').classList.toggle('open');
      });
    });

    // Checkbox changes — event delegation via container
    container.addEventListener('change', function handler(e) {
      const cb = e.target;
      if (cb.type !== 'checkbox') return;
      const row = cb.closest('.grocery-item');
      if (row) row.classList.toggle('checked', cb.checked);
      if (cb.dataset.src === 'dish') {
        _dishCk[cb.dataset.key] = cb.checked;
        _saveDishCk();
      } else {
        _allCk[cb.dataset.ing] = cb.checked;
        _saveAllCk();
      }
    }, { once: false });

    _rendering = false;
  }

  // ── Inject toggle bar before #groceryContent ──────────────────────────
  let _shoppingMode = false;
  const _gc = document.getElementById('groceryContent');
  if (!_gc) return;

  function _injectToggle() {
    const parent = _gc.parentElement;
    if (parent.querySelector('.grocery-view-toggle')) return;
    const bar = document.createElement('div');
    bar.className = 'grocery-view-toggle';
    bar.innerHTML = `
      <button class="grocery-view-btn ${!_shoppingMode?'active':''}" data-mode="dishes">📋 Dishes</button>
      <button class="grocery-view-btn ${_shoppingMode?'active':''}" data-mode="shopping">🛒 Shopping List</button>
    `;
    parent.insertBefore(bar, _gc);
    bar.querySelectorAll('.grocery-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _shoppingMode = btn.dataset.mode === 'shopping';
        bar.querySelectorAll('.grocery-view-btn').forEach(b => b.classList.toggle('active', b===btn));
        if (_shoppingMode) {
          _renderShopping(_gc);
        } else {
          if (typeof renderGrocery === 'function') renderGrocery();
        }
      });
    });
  }

  _injectToggle();

  // Handle clearChecked — in shopping mode, clear both stores
  const _clrBtn = document.getElementById('clearChecked');
  if (_clrBtn) {
    _clrBtn.addEventListener('click', () => {
      if (_shoppingMode) {
        _dishCk = {}; _allCk = {};
        _saveDishCk(); _saveAllCk();
        setTimeout(() => _renderShopping(_gc), 80);
      }
    });
  }

  // Watch groceryContent — re-render shopping if mode is active
  new MutationObserver(() => {
    const parent = _gc.parentElement;
    if (!parent.querySelector('.grocery-view-toggle')) _injectToggle();
    if (_shoppingMode && !_rendering) setTimeout(() => _renderShopping(_gc), 20);
  }).observe(_gc, { childList: true, subtree: false });

})();
