// ── FEATURE1: TOAST NOTIFICATION ────────────────────────────────────
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

  async function handleFile(file) {
    if (!file) return;
    const key = localStorage.getItem('wmp_gemini_key');
    if (!key) return;

    cameraBtn.textContent  = '⏳ Scanning…';
    galleryBtn.textContent = '⏳ Scanning…';
    cameraBtn.disabled  = true;
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
      const text= data.candidates?.[0]?.content?.parts?.[0]?.text || '';
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
          showToast(food.name + ' added to ' + addingTo.day);this.textContent = '✓ Added';
          this.disabled = true;
          this.style.cssText = 'background:#86efac;color:#166534;border:none;border-radius:6px;padding:5px 12px;font-size:12px;font-weight:600;';
        });
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
function getPortionInfo(name) {
  const m = name.match(/\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].trim();
  const pl = p.toLowerCase();
  const cupM = pl.match(/^([\d.]+)\s*cups?/);
  if (cupM) {
    const n = parseFloat(cupM[1]) || 1;
    const gLo = Math.round(n * 175), gHi = Math.round(n * 200);
    const k = n === 0.5 ? '1small katori' : n === 1 ? '1 medium katori': n === 1.5 ? '1½ katori' : n === 2 ? '2 katori' : n + ' katori';
    return `${p} ≈ ${gLo}–${gHi}g ≈ ${k}`;
  }
  const tbM = pl.match(/^(\d+)\s*tbsp/);
  if (tbM) {
    const n = parseInt(tbM[1]);
    return `${p} ≈ ${n * 13}g ≈ ${n === 1 ? '1 chamach' : n + ' chamach'}`;
  }
  const tsM = pl.match(/^(\d+)\s*tsp/);
  if (tsM) return `${p} ≈ ${parseInt(tsM[1]) * 5}g`;
  if (pl.includes('glass') || pl.includes('ml')) return `${p} ≈ 240ml ≈ 1 standard glass`;
  const gM = pl.match(/^(\d+)\s*g\b/);
  if (gM) {
    const g = parseInt(gM[1]);
    const k = g <= 80 ? 'small handful' : g <= 130 ? '1 small katori' : g <= 200 ? '1 medium katori' : '1 large serving';
    return `${p} ≈ ${k}`;
  }
  if (pl.includes('medium')) return `${p} ≈ 120–150g`;
  if (pl.includes('small'))  return `${p} ≈ 70–90g`;
  if (pl.includes('large'))  return `${p} ≈ 180–220g`;
  const cntM = pl.match(/^(\d+)$/);
  if (cntM) return parseInt(cntM[1]) + ' piece' + (parseInt(cntM[1]) > 1 ? 's' : '') + ' per serving';
  return null;
}

// Option B — collapsible 📏Portion Guide panel
(function () {
  const header = document.querySelector('.modal-header');
  if (!header) return;
  const closeBtn = document.getElementById('closeModal');
  const pgBtn = document.createElement('button');
  pgBtn.id = 'portionGuideBtn';
  pgBtn.title = 'Portion Reference Guide';
  pgBtn.innerHTML = '📏';
  pgBtn.style.cssText = 'background:none;border:none;font-size:15px;cursor:pointer;padding:0 6px;opacity:.6;transition:opacity .15s;';
  pgBtn.onmouseenter = () => pgBtn.style.opacity = '1';
  pgBtn.onmouseleave = () => pgBtn.style.opacity = '.6';
  header.insertBefore(pgBtn, closeBtn);
  const dayTabs = document.getElementById('modalDayTabs');
  if (!dayTabs) return;
  const panel = document.createElement('div');
  panel.id = 'portionGuidePanel';
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
  pgBtn.addEventListener('click', e => {
    e.stopPropagation();
    const hidden = panel.classList.toggle('hidden');
    pgBtn.style.opacity = hidden ? '.6' : '1';
  });
})();

// Option A — per-item portion info line
(function () {
  const foodList = document.getElementById('foodList');
  if (!foodList) return;
  function _addPortionInfo() {
    foodList.querySelectorAll('.food-item').forEach(item => {
      if (item.querySelector('.portion-info')) return;
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
function _wmpActKey() {
  if (typeof currentWeekStart !== 'undefined' && currentWeekStart) {
    return'wmp_act_' + currentWeekStart.toISOString().split('T')[0];
  }
  return 'wmp_act_default';
}
function _getWeekAct(){ const v = localStorage.getItem(_wmpActKey()); return v ? JSON.parse(v) : {}; }
function _getDayAct(day)      { return _getWeekAct()[day] || { type: 'normal', steps: 0 }; }
function _setDayAct(day, act) { const a = _getWeekAct(); a[day] = act; localStorage.setItem(_wmpActKey(), JSON.stringify(a)); }

const _plannerGrid = document.getElementById('plannerGrid');
if (_plannerGrid) {
  function _addActWidgets() {
    const p = JSON.parse(localStorage.getItem('wmp_profile') || '{}');
    if (!p.enableActivity) return;
    const bmr = p.gender === 'male'
      ? 10 * (p.weight || 65) + 6.25 * (p.height || 165) - 5 * (p.age || 25) + 5
      : 10 * (p.weight || 65) + 6.25 * (p.height || 165) - 5 * (p.age || 25) - 161;
    const tdee= bmr * 1.4;
    const goalAdj = p.goal === 'loss' ? -400 : p.goal === 'gain' ? 300 : 0;
    const baseCal = Math.round(tdee + goalAdj);
    _plannerGrid.querySelectorAll('.day-header').forEach(hdr => {
      if (hdr.querySelector('.act-widget')) return;
      const col = hdr.closest('.day-column');
      const day = col?.querySelector('.add-food-btn')?.dataset.day;
      if (!day) return;
      const act   = _getDayAct(day);
      const extra = act.type === 'workout' ? (p.workoutExtra || 300): act.type === 'steps'? Math.round((act.steps || 0) * 0.04) : 0;
      const dayTarget = baseCal + extra;
      const widget = document.createElement('div');
      widget.className = 'act-widget';
      const btn = document.createElement('button');
      btn.className   = 'act-badge ' + act.type;
      btn.textContent = act.type === 'workout' ? '💪 Workout' : act.type === 'steps' ? '🚶 Steps' : '+ Activity';
      btn.title ='Click to change activity type';
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const cur = _getDayAct(day).type;
        const nxt = cur === 'normal' ? 'workout' : cur === 'workout' ? 'steps' : 'normal';
        _setDayAct(day, { type: nxt, steps: 0 });
        widget.remove();
        setTimeout(_addActWidgets, 10);
      });
      widget.appendChild(btn);
      if (act.type === 'steps') {
        const row = document.createElement('div');
        row.className = 'act-steps-row';
        const inp = document.createElement('input');
        inp.type = 'number'; inp.className = 'act-steps-inp';
        inp.placeholder = '0'; inp.value = act.steps || '';
        inp.addEventListener('change', e => {
          e.stopPropagation();
          _setDayAct(day, { type: 'steps', steps: +inp.value || 0 });
          widget.remove();
          setTimeout(_addActWidgets, 10);
        });
        const lbl = document.createElement('span');
        lbl.className = 'act-steps-lbl'; lbl.textContent = 'steps';
        row.appendChild(inp); row.appendChild(lbl);
        widget.appendChild(row);
      }
      if (extra > 0) {
        const badge = document.createElement('div');
        badge.className = 'act-target-badge';
        badge.textContent = '🎯 ' + dayTarget + ' cal';
        widget.appendChild(badge);
      }
      hdr.appendChild(widget);
    });
  }
  let _actTimer;
  new MutationObserver(() => {
    clearTimeout(_actTimer);
    _actTimer = setTimeout(_addActWidgets, 60);
  }).observe(_plannerGrid, { childList: true });
}


// ── PROFILE: Save / Load activity + API key ──────────────────────────
(function () {
  const enableChk = document.getElementById('pEnableActivity');
  const actOpts= document.getElementById('activityOptions');
  const saveBtn   = document.getElementById('saveProfile');

  if (enableChk && actOpts) {
    enableChk.addEventListener('change', () => {
      actOpts.classList.toggle('hidden', !enableChk.checked);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
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

  const p = JSON.parse(localStorage.getItem('wmp_profile') || '{}');
  if (enableChk) {
    enableChk.checked = p.enableActivity || false;
    if (actOpts) actOpts.classList.toggle('hidden', !p.enableActivity);
  }const extraInp = document.getElementById('pWorkoutExtra');
  if (extraInp) extraInp.value = p.workoutExtra || 300;
  const keyInp = document.getElementById('pOpenAIKey');
  if (keyInp && localStorage.getItem('wmp_gemini_key')) {
    keyInp.placeholder = '(API key saved — paste new key to update)';
  }

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
(function () {
  const foodList = document.getElementById('foodList');
  if (!foodList) return;

  const UNIT_GROUPS = [
    {
      group: 'Serving',
      units: [
        { label: 'srv',fixed: 1,step: 0.25, hint: 'servings' },
      ]
    },
    {
      group: 'Spoons',
      units: [
        { label: 'tsp',         grams: 5,    step: 0.5,  hint: 'tsp'     },
        { label: 'tbsp',        grams: 13,   step: 0.5,  hint: 'tbsp'    },
      ]
    },
    {
      group: 'Cups',
      units: [
        { label: 'cup',         grams: 187,  step: 0.25, hint: 'cups'    },
      ]
    },
    {
      group: 'Indian',
      units: [
        { label: 'katori (sm)', grams: 100,  step: 0.5,  hint: 'katori'  },
        { label: 'katori (md)', grams: 187,  step: 0.5,  hint: 'katori'  },
        { label: 'katori (lg)', grams: 280,  step: 0.5,  hint: 'katori'  },
        { label: 'glass',       grams: 240,  step: 0.5,  hint: 'glasses' },
        { label: 'bowl',        grams: 300,  step: 0.5,  hint: 'bowls'   },
        { label: 'plate',       grams: 450,  step: 0.5,  hint: 'plates'  },
      ]
    },
    {
      group: 'Weight',
      units: [
        { label: 'g',           grams: 1,    step: 5,    hint: 'grams'   },
        { label: 'kg',          grams: 1000, step: 0.1,  hint: 'kg'      },
      ]
    },
    {
      group: 'Other',
      units: [
        { label: 'scoop (30g)', grams: 30,   step: 0.5,  hint: 'scoops'  },
        { label: 'scoop (50g)', grams: 50,   step: 0.5,  hint: 'scoops'  },
        { label: 'handful',     grams: 30,   step: 1,    hint: 'handfuls'},
        { label: 'piece (sm)',  grams: 80,   step: 1,    hint: 'pieces'  },
        { label: 'piece (md)',  grams: 130,  step: 1,    hint: 'pieces'  },
        { label: 'piece (lg)',  grams: 200,  step: 1,    hint: 'pieces'  },
        { label: 'slice',       grams: 30,   step: 1,    hint: 'slices'  },
      ]
    }
  ];

  const ALL_UNITS = UNIT_GROUPS.flatMap(g => g.units);

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
      const sel = document.createElement('select');
      sel.className = 'unit-select';
      UNIT_GROUPS.forEach(grp => {
        const og = document.createElement('optgroup');
        og.label = grp.group;
        grp.units.forEach(u => {
          const o = document.createElement('option');
          o.value = u.label;
          o.textContent = u.label;
          og.appendChild(o);
        });
        sel.appendChild(og);
      });
      srvLabel.replaceWith(sel);
      const getEff = () => {
        const unit = ALL_UNITS.find(u => u.label === sel.value);
        if (!unit) return 1;
        const qty = parseFloat(srvInput.value) || 0;
        if (unit.fixed !== undefined) return qty * unit.fixed;
        return (qty * unit.grams) / sg;
      };
      const refreshMacros = () => {
        const eff = getEff();
        macrosEl.innerHTML =
          `<strong style="color:var(--green-dark)">${Math.round(food.cal * eff)} cal</strong>` +
          ` · ${Math.round(food.pro * eff)}g protein · ${Math.round(food.fib * eff)}g fiber ·<em>${food.cat}</em>`;
      };
      const applyUnit = () => {
        const unit = ALL_UNITS.find(u => u.label === sel.value);
        if (!unit) return;
        srvInput.step= unit.step || 1;
        srvInput.placeholder = unit.hint || '';
        srvInput.title= `Enter number of ${unit.hint || sel.value}`;
        if (unit.grams === 1 && (srvInput.value === '1' || !srvInput.value)) {
          srvInput.value = 100;
        }
        refreshMacros();
      };
      sel.addEventListener('change', applyUnit);
      srvInput.addEventListener('input', refreshMacros);
    });
  }

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
    const eff = unit.fixed !== undefined ? qty * unit.fixed : (qty * unit.grams) / sg;
    srvInput.value = +eff.toFixed(3);
    setTimeout(() => {
      unitSel.selectedIndex = 0;
      srvInput.placeholder= '';
      srvInput.step= 0.1;
    }, 250);
  }, true);

  let _uTimer;
  new MutationObserver(() => {
    clearTimeout(_uTimer);
    _uTimer = setTimeout(_injectUnits, 40);
  }).observe(foodList, { childList: true, subtree: false });
})();
