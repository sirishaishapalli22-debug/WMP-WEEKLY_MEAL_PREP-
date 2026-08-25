// ── FOOD DATABASE ──────────────────────────────────────
const FOODS = [
  // Grains
  { name:"Rice (cooked, 1 cup)", cal:206, pro:4, fib:1, cat:"Grains" },
  { name:"Brown Rice (1 cup)", cal:216, pro:5, fib:4, cat:"Grains" },
  { name:"Roti / Chapati (1 piece)", cal:104, pro:3, fib:2, cat:"Grains" },
  { name:"Paratha (1 piece)", cal:200, pro:4, fib:2, cat:"Grains" },
  { name:"Oats (1 cup cooked)", cal:166, pro:6, fib:4, cat:"Grains" },
  { name:"Bread (1 slice)", cal:79, pro:3, fib:1, cat:"Grains" },
  { name:"Poha (1 cup)", cal:176, pro:3, fib:1, cat:"Grains" },
  { name:"Idli (2 pieces)", cal:100, pro:3, fib:1, cat:"Grains" },
  { name:"Dosa (1 piece)", cal:168, pro:4, fib:1, cat:"Grains" },
  { name:"Upma (1 cup)", cal:180, pro:4, fib:2, cat:"Grains" },
  // Protein
  { name:"Dal (1 cup cooked)", cal:230, pro:18, fib:8, cat:"Protein" },
  { name:"Lentils (1 cup cooked)", cal:230, pro:18, fib:16, cat:"Protein" },
  { name:"Chickpeas (1 cup cooked)", cal:269, pro:15, fib:13, cat:"Protein" },
  { name:"Rajma (1 cup cooked)", cal:225, pro:15, fib:11, cat:"Protein" },
  { name:"Sambar (1 cup)", cal:90, pro:4, fib:4, cat:"Protein" },
  { name:"Paneer (100g)", cal:265, pro:18, fib:0, cat:"Protein" },
  { name:"Tofu (100g)", cal:76, pro:8, fib:0, cat:"Protein" },
  { name:"Chicken Breast (100g)", cal:165, pro:31, fib:0, cat:"Protein" },
  { name:"Chicken Curry (1 cup)", cal:280, pro:25, fib:1, cat:"Protein" },
  { name:"Eggs (1 whole)", cal:78, pro:6, fib:0, cat:"Protein" },
  { name:"Salmon (100g)", cal:208, pro:20, fib:0, cat:"Protein" },
  { name:"Peanut Butter (2 tbsp)", cal:190, pro:7, fib:2, cat:"Protein" },
  // Dairy
  { name:"Milk (1 cup)", cal:149, pro:8, fib:0, cat:"Dairy" },
  { name:"Curd / Yogurt (1 cup)", cal:100, pro:9, fib:0, cat:"Dairy" },
  { name:"Greek Yogurt (1 cup)", cal:130, pro:17, fib:0, cat:"Dairy" },
  { name:"Raita (1 cup)", cal:90, pro:5, fib:1, cat:"Dairy" },
  { name:"Cheese (1 slice)", cal:113, pro:7, fib:0, cat:"Dairy" },
  // Vegetables
  { name:"Spinach (1 cup)", cal:7, pro:1, fib:1, cat:"Vegetables" },
  { name:"Broccoli (1 cup)", cal:55, pro:4, fib:5, cat:"Vegetables" },
  { name:"Mixed Vegetables (1 cup)", cal:80, pro:3, fib:4, cat:"Vegetables" },
  { name:"Sabzi / Stir Fry (1 cup)", cal:100, pro:3, fib:4, cat:"Vegetables" },
  { name:"Tomato (1 medium)", cal:22, pro:1, fib:1, cat:"Vegetables" },
  { name:"Carrot (1 medium)", cal:25, pro:1, fib:2, cat:"Vegetables" },
  { name:"Sweet Potato (1 medium)", cal:103, pro:2, fib:4, cat:"Vegetables" },
  { name:"Potato (1 medium)", cal:130, pro:3, fib:2, cat:"Vegetables" },
  // Fruits
  { name:"Banana (1 medium)", cal:105, pro:1, fib:3, cat:"Fruits" },
  { name:"Apple (1 medium)", cal:95, pro:0, fib:4, cat:"Fruits" },
  { name:"Orange (1 medium)", cal:62, pro:1, fib:3, cat:"Fruits" },
  { name:"Mango (1 cup)", cal:99, pro:1, fib:3, cat:"Fruits" },
  { name:"Watermelon (1 cup)", cal:46, pro:1, fib:1, cat:"Fruits" },
  // Snacks
  { name:"Almonds (28g)", cal:164, pro:6, fib:4, cat:"Snacks" },
  { name:"Walnuts (28g)", cal:185, pro:4, fib:2, cat:"Snacks" },
  { name:"Makhana / Fox Nuts (1 cup)", cal:100, pro:4, fib:1, cat:"Snacks" },
  { name:"Sprouts (1 cup)", cal:62, pro:9, fib:4, cat:"Snacks" },
  { name:"Protein Shake (1 scoop)", cal:120, pro:25, fib:1, cat:"Snacks" },
];

const DAYS  = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEALS = ["Breakfast","Lunch","Dinner"];
const EMOJI = { Breakfast:"🌅", Lunch:"☀️", Dinner:"🌙" };

let currentWeekStart = getMonday(new Date());
let addingTo = null;

// ── UTILS ──────────────────────────────────────────────
function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  date.setDate(date.getDate() - day + (day === 0 ? -6 : 1));
  date.setHours(0,0,0,0);
  return date;
}
function weekKey(d) { return d.toISOString().split('T')[0]; }
function fmt(d) { return d.toLocaleDateString('en-US', { month:'short', day:'numeric' }); }
function save(k,v) { localStorage.setItem(k, JSON.stringify(v)); }
function load(k,fb) { const v=localStorage.getItem(k); return v ? JSON.parse(v) : fb; }

function emptyWeek() {
  const w = {};
  DAYS.forEach(d => { w[d] = { Breakfast:[], Lunch:[], Dinner:[] }; });
  return w;
}
function getWeekPlan() { return load('wmp_week_'+weekKey(currentWeekStart), emptyWeek()); }
function saveWeekPlan(plan) { save('wmp_week_'+weekKey(currentWeekStart), plan); }
function getProfile() {
  return load('wmp_profile', { name:'', weight:65, height:165, age:25, gender:'female', goal:'maintain' });
}
function calcTargets(p) {
  const bmr = p.gender==='male'
    ? 10*p.weight + 6.25*p.height - 5*p.age + 5
    : 10*p.weight + 6.25*p.height - 5*p.age - 161;
  const tdee = bmr * 1.4;
  const cal  = p.goal==='loss' ? tdee-400 : p.goal==='gain' ? tdee+300 : tdee;
  return {
    calories: Math.round(cal),
    protein:  Math.round(p.weight * (p.goal==='gain' ? 2 : 1.6)),
    fiber:    p.gender==='male' ? 38 : 25
  };
}
function mealTotals(items) {
  return items.reduce((a,i) => ({ cal:a.cal+i.cal, pro:a.pro+i.pro, fib:a.fib+i.fib }), {cal:0,pro:0,fib:0});
}
function dayTotals(dayMeals) {
  return mealTotals([...dayMeals.Breakfast, ...dayMeals.Lunch, ...dayMeals.Dinner]);
}

// ── TABS ───────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.getElementById(tab).classList.remove('hidden');
    if (tab === 'nutrition') renderNutrition();
    if (tab === 'grocery')   renderGrocery();
    if (tab === 'profile')   renderProfile();
  });
});

// ── PLANNER ────────────────────────────────────────────
function renderPlanner() {
  const plan  = getWeekPlan();
  const end   = new Date(currentWeekStart);
  end.setDate(end.getDate() + 6);
  document.getElementById('weekLabel').textContent =
    `Week of ${fmt(currentWeekStart)} – ${fmt(end)}`;

  const today = new Date(); today.setHours(0,0,0,0);
  const grid  = document.getElementById('plannerGrid');
  grid.innerHTML = '';

  DAYS.forEach((day, i) => {
    const dayDate = new Date(currentWeekStart);
    dayDate.setDate(dayDate.getDate() + i);
    const isToday = dayDate.getTime() === today.getTime();

    const col = document.createElement('div');
    col.className = 'day-column';

    const hdr = document.createElement('div');
    hdr.className = 'day-header' + (isToday ? ' today' : '');
    hdr.textContent = day.slice(0,3);
    col.appendChild(hdr);

    MEALS.forEach(meal => {
      const slot = document.createElement('div');
      slot.className = 'meal-slot';
      slot.innerHTML = `<div class="meal-slot-label">${EMOJI[meal]} ${meal}</div>`;

      (plan[day][meal] || []).forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'meal-item';
        row.innerHTML = `
          <span class="meal-item-name" title="${item.name}">${item.name.split('(')[0].trim()}</span>
          <button class="meal-item-remove" data-day="${day}" data-meal="${meal}" data-idx="${idx}">×</button>`;
        slot.appendChild(row);
      });

      const addBtn = document.createElement('button');
      addBtn.className = 'add-food-btn';
      addBtn.textContent = '+ Add food';
      addBtn.dataset.day  = day;
      addBtn.dataset.meal = meal;
      addBtn.addEventListener('click', openModal);
      slot.appendChild(addBtn);
      col.appendChild(slot);
    });

    grid.appendChild(col);
  });

  grid.querySelectorAll('.meal-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = getWeekPlan();
      p[btn.dataset.day][btn.dataset.meal].splice(+btn.dataset.idx, 1);
      saveWeekPlan(p); renderPlanner();
    });
  });
}

document.getElementById('prevWeek').addEventListener('click', () => {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7); renderPlanner();
});
document.getElementById('nextWeek').addEventListener('click', () => {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7); renderPlanner();
});

// ── MODAL ──────────────────────────────────────────────
function openModal(e) {
  addingTo = { day: e.target.dataset.day, meal: e.target.dataset.meal };
  document.getElementById('modalTitle').textContent = `Add to ${addingTo.day} ${addingTo.meal}`;
  document.getElementById('foodSearch').value = '';
  renderFoodList('');
  document.getElementById('modalOverlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('foodSearch').focus(), 100);
}
document.getElementById('closeModal').addEventListener('click', () =>
  document.getElementById('modalOverlay').classList.add('hidden'));
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target.id === 'modalOverlay')
    document.getElementById('modalOverlay').classList.add('hidden');
});
document.getElementById('foodSearch').addEventListener('input', e =>
  renderFoodList(e.target.value));

function renderFoodList(query) {
  const filtered = query.trim()
    ? FOODS.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : FOODS;
  document.getElementById('foodList').innerHTML = filtered.map(f => `
    <div class="food-item">
      <div class="food-item-info">
        <div class="food-item-name">${f.name}</div>
        <div class="food-item-macros">${f.cal} cal &middot; ${f.pro}g protein &middot; ${f.fib}g fiber</div>
      </div>
      <button class="food-item-add" data-name="${f.name}">Add</button>
    </div>`).join('');

  document.querySelectorAll('.food-item-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const food = FOODS.find(f => f.name === btn.dataset.name);
      if (!food || !addingTo) return;
      const plan = getWeekPlan();
      plan[addingTo.day][addingTo.meal].push({...food});
      saveWeekPlan(plan); renderPlanner();
      document.getElementById('modalOverlay').classList.add('hidden');
    });
  });
}

// ── NUTRITION ──────────────────────────────────────────
let selectedDay = 'Monday';

function renderNutrition() {
  const plan    = getWeekPlan();
  const targets = calcTargets(getProfile());

  document.getElementById('daySelector').innerHTML =
    DAYS.map(d => `<button class="day-btn ${d===selectedDay?'active':''}" data-day="${d}">${d.slice(0,3)}</button>`).join('');

  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => { selectedDay = btn.dataset.day; renderNutrition(); });
  });

  const tot = dayTotals(plan[selectedDay]);

  function bar(label, current, target, unit='') {
    const pct    = Math.min((current/target)*100, 100);
    const status = current > target*1.1 ? 'high' : current < target*0.8 ? 'low' : 'ok';
    const msg    = status==='high' ? `⚠️ ${current-target}${unit} over target`
                 : status==='low'  ? `↓ ${target-current}${unit} below target`
                 : '✓ On track';
    return `
      <div class="progress-item">
        <div class="progress-header">
          <span class="progress-label">${label}</span>
          <span class="progress-value">${current}${unit} / ${target}${unit}</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar ${status}" style="width:${pct}%"></div>
        </div>
        <span class="status-badge ${status}">${msg}</span>
      </div>`;
  }

  const breakdown = MEALS.map(meal => {
    const items = plan[selectedDay][meal] || [];
    if (!items.length)
      return `<div class="summary-row"><span class="label">${EMOJI[meal]} ${meal}</span><span style="color:var(--muted)">Nothing added</span></div>`;
    const t = mealTotals(items);
    return `<div class="summary-row">
      <span class="label">${EMOJI[meal]} ${meal}</span>
      <span>${t.cal} cal · ${t.pro}g prot · ${t.fib}g fiber</span>
    </div>`;
  }).join('');

  document.getElementById('nutritionContent').innerHTML = `
    <div class="nutrition-card">
      <h3>📊 ${selectedDay}'s Nutrition</h3>
      ${bar('Calories', tot.cal, targets.calories)}
      ${bar('Protein',  tot.pro, targets.protein,  'g')}
      ${bar('Fiber',    tot.fib, targets.fiber,     'g')}
    </div>
    <div class="meals-summary">
      <h3>Meal Breakdown</h3>
      ${breakdown}
    </div>`;
}

// ── GROCERY ────────────────────────────────────────────
function renderGrocery() {
  const plan    = getWeekPlan();
  const checked = load('wmp_checked_'+weekKey(currentWeekStart), {});

  const items = {};
  DAYS.forEach(day => MEALS.forEach(meal => {
    (plan[day][meal]||[]).forEach(item => {
      items[item.name] ? items[item.name].count++ : (items[item.name] = {...item, count:1});
    });
  }));

  if (!Object.keys(items).length) {
    document.getElementById('groceryContent').innerHTML =
      `<div class="empty-state"><div class="icon">🛒</div><p>No meals planned yet.<br>Add meals in the Planner tab!</p></div>`;
    return;
  }

  const byCat = {};
  Object.values(items).forEach(i => { (byCat[i.cat] = byCat[i.cat]||[]).push(i); });

  document.getElementById('groceryContent').innerHTML =
    Object.entries(byCat).map(([cat, foods]) => `
      <div class="grocery-category">
        <h3>${cat}</h3>
        ${foods.map(f => `
          <div class="grocery-item ${checked[f.name]?'checked':''}" >
            <input type="checkbox" ${checked[f.name]?'checked':''} data-name="${f.name}">
            <span class="grocery-item-name">${f.name}</span>
            <span class="grocery-item-qty">×${f.count}</span>
          </div>`).join('')}
      </div>`).join('');

  document.querySelectorAll('#groceryContent input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      const ck = load('wmp_checked_'+weekKey(currentWeekStart), {});
      ck[cb.dataset.name] = cb.checked;
      save('wmp_checked_'+weekKey(currentWeekStart), ck);
      cb.closest('.grocery-item').classList.toggle('checked', cb.checked);
    });
  });
}

document.getElementById('clearChecked').addEventListener('click', () => {
  save('wmp_checked_'+weekKey(currentWeekStart), {}); renderGrocery();
});

// ── PROFILE ────────────────────────────────────────────
function renderProfile() {
  const p = getProfile();
  document.getElementById('pName').value   = p.name;
  document.getElementById('pWeight').value = p.weight;
  document.getElementById('pHeight').value = p.height;
  document.getElementById('pAge').value    = p.age;
  document.querySelectorAll('[data-group=gender]').forEach(b =>
    b.classList.toggle('active', b.dataset.value === p.gender));
  document.querySelectorAll('[data-group=goal]').forEach(b =>
    b.classList.toggle('active', b.dataset.value === p.goal));
  showTargets(p);
}

document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll(`[data-group="${btn.dataset.group}"]`)
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.getElementById('saveProfile').addEventListener('click', () => {
  const p = {
    name:   document.getElementById('pName').value,
    weight: +document.getElementById('pWeight').value,
    height: +document.getElementById('pHeight').value,
    age:    +document.getElementById('pAge').value,
    gender: document.querySelector('[data-group=gender].active')?.dataset.value || 'female',
    goal:   document.querySelector('[data-group=goal].active')?.dataset.value   || 'maintain',
  };
  save('wmp_profile', p); showTargets(p);
  const btn = document.getElementById('saveProfile');
  btn.textContent = '✓ Saved!';
  setTimeout(() => btn.textContent = 'Save Profile', 2000);
});

function showTargets(p) {
  const t = calcTargets(p);
  document.getElementById('tCalories').textContent = t.calories;
  document.getElementById('tProtein').textContent  = t.protein + 'g';
  document.getElementById('tFiber').textContent    = t.fiber   + 'g';
}

// ── INIT ───────────────────────────────────────────────
renderPlanner();
renderProfile();
