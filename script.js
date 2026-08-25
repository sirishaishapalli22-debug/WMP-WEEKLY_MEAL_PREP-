// ── FOOD DATABASE ──────────────────────────────────────
const FOODS = [
  // ── GRAINS ──
  { name:"Rice (cooked, 1 cup)",          cal:206, pro:4,  fib:1,  cat:"Grains" },
  { name:"Brown Rice (1 cup)",             cal:216, pro:5,  fib:4,  cat:"Grains" },
  { name:"Quinoa (1 cup cooked)",          cal:222, pro:8,  fib:5,  cat:"Grains" },
  { name:"Roti / Chapati (1 piece)",       cal:104, pro:3,  fib:2,  cat:"Grains" },
  { name:"Bajra Roti (1 piece)",           cal:110, pro:3,  fib:2,  cat:"Grains" },
  { name:"Jowar Roti (1 piece)",           cal:90,  pro:3,  fib:2,  cat:"Grains" },
  { name:"Paratha (1 piece)",              cal:200, pro:4,  fib:2,  cat:"Grains" },
  { name:"Aloo Paratha (1 piece)",         cal:220, pro:4,  fib:2,  cat:"Grains" },
  { name:"Methi Paratha (1 piece)",        cal:190, pro:5,  fib:3,  cat:"Grains" },
  { name:"Thepla (1 piece)",               cal:110, pro:3,  fib:2,  cat:"Grains" },
  { name:"Oats (1 cup cooked)",            cal:166, pro:6,  fib:4,  cat:"Grains" },
  { name:"Muesli (1/2 cup)",               cal:190, pro:5,  fib:3,  cat:"Grains" },
  { name:"Cornflakes (1 cup)",             cal:100, pro:2,  fib:1,  cat:"Grains" },
  { name:"Bread (1 slice)",                cal:79,  pro:3,  fib:1,  cat:"Grains" },
  { name:"Poha (1 cup)",                   cal:176, pro:3,  fib:1,  cat:"Grains" },
  { name:"Idli (2 pieces)",                cal:100, pro:3,  fib:1,  cat:"Grains" },
  { name:"Dosa (1 piece)",                 cal:168, pro:4,  fib:1,  cat:"Grains" },
  { name:"Rava Dosa (1 piece)",            cal:150, pro:3,  fib:1,  cat:"Grains" },
  { name:"Uttapam (1 piece)",              cal:170, pro:5,  fib:2,  cat:"Grains" },
  { name:"Upma (1 cup)",                   cal:180, pro:4,  fib:2,  cat:"Grains" },
  { name:"Pongal (1 cup)",                 cal:200, pro:5,  fib:2,  cat:"Grains" },
  { name:"Khichdi (1 cup)",                cal:250, pro:9,  fib:4,  cat:"Grains" },
  { name:"Besan Chilla (1 piece)",         cal:120, pro:6,  fib:2,  cat:"Grains" },
  { name:"Vermicelli Upma (1 cup)",        cal:160, pro:4,  fib:1,  cat:"Grains" },
  { name:"Pasta (1 cup cooked)",           cal:220, pro:8,  fib:2,  cat:"Grains" },
  { name:"Noodles (1 cup cooked)",         cal:200, pro:4,  fib:1,  cat:"Grains" },

  // ── PROTEIN ──
  { name:"Dal (1 cup cooked)",             cal:230, pro:18, fib:8,  cat:"Protein" },
  { name:"Moong Dal (1 cup cooked)",       cal:212, pro:14, fib:15, cat:"Protein" },
  { name:"Chana Dal (1 cup cooked)",       cal:269, pro:19, fib:10, cat:"Protein" },
  { name:"Urad Dal (1 cup cooked)",        cal:294, pro:22, fib:10, cat:"Protein" },
  { name:"Mixed Dal (1 cup)",              cal:220, pro:15, fib:8,  cat:"Protein" },
  { name:"Lentils (1 cup cooked)",         cal:230, pro:18, fib:16, cat:"Protein" },
  { name:"Chickpeas / Chhole (1 cup)",     cal:270, pro:15, fib:13, cat:"Protein" },
  { name:"Rajma (1 cup cooked)",           cal:225, pro:15, fib:11, cat:"Protein" },
  { name:"Black Beans (1 cup cooked)",     cal:227, pro:15, fib:15, cat:"Protein" },
  { name:"Sambar (1 cup)",                 cal:90,  pro:4,  fib:4,  cat:"Protein" },
  { name:"Soya Chunks (100g cooked)",      cal:150, pro:18, fib:5,  cat:"Protein" },
  { name:"Paneer (100g)",                  cal:265, pro:18, fib:0,  cat:"Protein" },
  { name:"Low Fat Paneer (100g)",          cal:190, pro:22, fib:0,  cat:"Protein" },
  { name:"Tofu (100g)",                    cal:76,  pro:8,  fib:0,  cat:"Protein" },
  { name:"Chicken Breast (100g)",          cal:165, pro:31, fib:0,  cat:"Protein" },
  { name:"Grilled Chicken (100g)",         cal:150, pro:28, fib:0,  cat:"Protein" },
  { name:"Chicken Curry (1 cup)",          cal:280, pro:25, fib:1,  cat:"Protein" },
  { name:"Butter Chicken (1 cup)",         cal:380, pro:28, fib:2,  cat:"Protein" },
  { name:"Mutton Curry (100g)",            cal:243, pro:21, fib:0,  cat:"Protein" },
  { name:"Fish Curry (1 cup)",             cal:200, pro:22, fib:1,  cat:"Protein" },
  { name:"Prawns / Shrimp (100g)",         cal:99,  pro:24, fib:0,  cat:"Protein" },
  { name:"Salmon (100g)",                  cal:208, pro:20, fib:0,  cat:"Protein" },
  { name:"Tuna (100g)",                    cal:132, pro:28, fib:0,  cat:"Protein" },
  { name:"Turkey Breast (100g)",           cal:135, pro:30, fib:0,  cat:"Protein" },
  { name:"Eggs (1 whole)",                 cal:78,  pro:6,  fib:0,  cat:"Protein" },
  { name:"Egg Whites (2)",                 cal:34,  pro:7,  fib:0,  cat:"Protein" },
  { name:"Boiled Eggs (2)",                cal:155, pro:12, fib:0,  cat:"Protein" },
  { name:"Omelette (2 eggs)",              cal:190, pro:13, fib:0,  cat:"Protein" },
  { name:"Egg Bhurji (2 eggs)",            cal:200, pro:14, fib:1,  cat:"Protein" },
  { name:"Peanut Butter (2 tbsp)",         cal:190, pro:7,  fib:2,  cat:"Protein" },

  // ── DAIRY ──
  { name:"Milk (1 cup)",                   cal:149, pro:8,  fib:0,  cat:"Dairy" },
  { name:"Skimmed Milk (1 cup)",           cal:83,  pro:8,  fib:0,  cat:"Dairy" },
  { name:"Curd / Yogurt (1 cup)",          cal:100, pro:9,  fib:0,  cat:"Dairy" },
  { name:"Greek Yogurt (1 cup)",           cal:130, pro:17, fib:0,  cat:"Dairy" },
  { name:"Low Fat Yogurt (1 cup)",         cal:80,  pro:11, fib:0,  cat:"Dairy" },
  { name:"Buttermilk / Chaas (1 cup)",     cal:60,  pro:4,  fib:0,  cat:"Dairy" },
  { name:"Lassi Sweet (1 glass)",          cal:180, pro:7,  fib:0,  cat:"Dairy" },
  { name:"Lassi Salted (1 glass)",         cal:120, pro:7,  fib:0,  cat:"Dairy" },
  { name:"Haldi Doodh (1 cup)",            cal:160, pro:8,  fib:0,  cat:"Dairy" },
  { name:"Raita (1 cup)",                  cal:90,  pro:5,  fib:1,  cat:"Dairy" },
  { name:"Cheese (1 slice)",               cal:113, pro:7,  fib:0,  cat:"Dairy" },
  { name:"Paneer Tikka (100g)",            cal:230, pro:16, fib:1,  cat:"Dairy" },

  // ── VEGETABLES ──
  { name:"Spinach (1 cup)",                cal:7,   pro:1,  fib:1,  cat:"Vegetables" },
  { name:"Palak Curry (1 cup)",            cal:90,  pro:5,  fib:4,  cat:"Vegetables" },
  { name:"Broccoli (1 cup)",               cal:55,  pro:4,  fib:5,  cat:"Vegetables" },
  { name:"Cauliflower (1 cup)",            cal:25,  pro:2,  fib:3,  cat:"Vegetables" },
  { name:"Aloo Gobi (1 cup)",              cal:150, pro:4,  fib:4,  cat:"Vegetables" },
  { name:"Cabbage (1 cup)",                cal:22,  pro:1,  fib:2,  cat:"Vegetables" },
  { name:"Bell Pepper (1 medium)",         cal:31,  pro:1,  fib:3,  cat:"Vegetables" },
  { name:"Mushrooms (1 cup)",              cal:15,  pro:2,  fib:1,  cat:"Vegetables" },
  { name:"Peas (1 cup cooked)",            cal:134, pro:9,  fib:9,  cat:"Vegetables" },
  { name:"Corn (1 cup)",                   cal:132, pro:5,  fib:4,  cat:"Vegetables" },
  { name:"Beetroot (1 medium)",            cal:44,  pro:2,  fib:2,  cat:"Vegetables" },
  { name:"Okra / Bhindi (1 cup)",          cal:33,  pro:2,  fib:3,  cat:"Vegetables" },
  { name:"Bottle Gourd / Lauki (1 cup)",   cal:20,  pro:1,  fib:1,  cat:"Vegetables" },
  { name:"Baingan Bharta (1 cup)",         cal:110, pro:3,  fib:5,  cat:"Vegetables" },
  { name:"Mixed Vegetables (1 cup)",       cal:80,  pro:3,  fib:4,  cat:"Vegetables" },
  { name:"Mix Veg Curry (1 cup)",          cal:140, pro:5,  fib:5,  cat:"Vegetables" },
  { name:"Sabzi / Stir Fry (1 cup)",       cal:100, pro:3,  fib:4,  cat:"Vegetables" },
  { name:"Matar Paneer (1 cup)",           cal:280, pro:12, fib:5,  cat:"Vegetables" },
  { name:"Palak Paneer (1 cup)",           cal:260, pro:12, fib:4,  cat:"Vegetables" },
  { name:"Dal Makhani (1 cup)",            cal:330, pro:14, fib:8,  cat:"Vegetables" },
  { name:"Tomato (1 medium)",              cal:22,  pro:1,  fib:1,  cat:"Vegetables" },
  { name:"Carrot (1 medium)",              cal:25,  pro:1,  fib:2,  cat:"Vegetables" },
  { name:"Sweet Potato (1 medium)",        cal:103, pro:2,  fib:4,  cat:"Vegetables" },
  { name:"Potato (1 medium)",              cal:130, pro:3,  fib:2,  cat:"Vegetables" },
  { name:"Cucumber (1 cup)",               cal:16,  pro:1,  fib:1,  cat:"Vegetables" },

  // ── FRUITS ──
  { name:"Banana (1 medium)",              cal:105, pro:1,  fib:3,  cat:"Fruits" },
  { name:"Apple (1 medium)",               cal:95,  pro:0,  fib:4,  cat:"Fruits" },
  { name:"Orange (1 medium)",              cal:62,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Mango (1 cup)",                  cal:99,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Watermelon (1 cup)",             cal:46,  pro:1,  fib:1,  cat:"Fruits" },
  { name:"Pomegranate (1/2 cup)",          cal:72,  pro:1,  fib:4,  cat:"Fruits" },
  { name:"Papaya (1 cup)",                 cal:55,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Grapes (1 cup)",                 cal:104, pro:1,  fib:1,  cat:"Fruits" },
  { name:"Kiwi (1 medium)",                cal:61,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Pineapple (1 cup)",              cal:82,  pro:1,  fib:2,  cat:"Fruits" },
  { name:"Strawberry (1 cup)",             cal:49,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Pear (1 medium)",                cal:101, pro:1,  fib:5,  cat:"Fruits" },
  { name:"Guava (1 medium)",               cal:37,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Chikoo / Sapota (1 medium)",     cal:83,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Lychee (1 cup)",                 cal:125, pro:2,  fib:1,  cat:"Fruits" },
  { name:"Avocado (1/2 medium)",           cal:120, pro:2,  fib:5,  cat:"Fruits" },
  { name:"Dates (3 pieces)",               cal:80,  pro:1,  fib:2,  cat:"Fruits" },
  { name:"Fig / Anjeer (2 medium)",        cal:74,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Plum (2 medium)",                cal:60,  pro:1,  fib:2,  cat:"Fruits" },
  { name:"Peach (1 medium)",               cal:59,  pro:1,  fib:2,  cat:"Fruits" },
  { name:"Apricot (3 medium)",             cal:51,  pro:1,  fib:2,  cat:"Fruits" },
  { name:"Cherries (1 cup)",               cal:87,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Blueberries (1 cup)",            cal:84,  pro:1,  fib:4,  cat:"Fruits" },
  { name:"Raspberry (1 cup)",              cal:64,  pro:1,  fib:8,  cat:"Fruits" },
  { name:"Coconut (1 cup shredded)",       cal:283, pro:3,  fib:7,  cat:"Fruits" },

  // ── SEEDS & NUTS ──
  { name:"Almonds (28g)",                  cal:164, pro:6,  fib:4,  cat:"Seeds & Nuts" },
  { name:"Walnuts (28g)",                  cal:185, pro:4,  fib:2,  cat:"Seeds & Nuts" },
  { name:"Cashews (28g)",                  cal:157, pro:5,  fib:1,  cat:"Seeds & Nuts" },
  { name:"Pistachios (28g)",               cal:159, pro:6,  fib:3,  cat:"Seeds & Nuts" },
  { name:"Peanuts (28g)",                  cal:161, pro:7,  fib:2,  cat:"Seeds & Nuts" },
  { name:"Hazelnuts (28g)",                cal:178, pro:4,  fib:3,  cat:"Seeds & Nuts" },
  { name:"Macadamia Nuts (28g)",           cal:204, pro:2,  fib:2,  cat:"Seeds & Nuts" },
  { name:"Brazil Nuts (28g)",              cal:186, pro:4,  fib:2,  cat:"Seeds & Nuts" },
  { name:"Pecans (28g)",                   cal:196, pro:3,  fib:3,  cat:"Seeds & Nuts" },
  { name:"Pine Nuts (28g)",                cal:191, pro:4,  fib:1,  cat:"Seeds & Nuts" },
  { name:"Mixed Nuts (28g)",               cal:173, pro:5,  fib:2,  cat:"Seeds & Nuts" },
  { name:"Pumpkin Seeds (28g)",            cal:151, pro:7,  fib:2,  cat:"Seeds & Nuts" },
  { name:"Sunflower Seeds (28g)",          cal:165, pro:6,  fib:3,  cat:"Seeds & Nuts" },
  { name:"Watermelon Seeds (28g)",         cal:158, pro:8,  fib:0,  cat:"Seeds & Nuts" },
  { name:"Melon Seeds (28g)",              cal:140, pro:7,  fib:1,  cat:"Seeds & Nuts" },
  { name:"Hemp Seeds (3 tbsp)",            cal:166, pro:10, fib:2,  cat:"Seeds & Nuts" },
  { name:"Sesame Seeds / Til (1 tbsp)",    cal:52,  pro:2,  fib:1,  cat:"Seeds & Nuts" },
  { name:"Chia Seeds (1 tbsp)",            cal:58,  pro:2,  fib:5,  cat:"Seeds & Nuts" },
  { name:"Flax Seeds / Alsi (1 tbsp)",     cal:55,  pro:2,  fib:3,  cat:"Seeds & Nuts" },
  { name:"Mixed Seeds (1 tbsp)",           cal:55,  pro:2,  fib:2,  cat:"Seeds & Nuts" },

  // ── SNACKS ──
  { name:"Makhana / Fox Nuts (1 cup)",     cal:100, pro:4,  fib:1,  cat:"Snacks" },
  { name:"Sprouts (1 cup)",                cal:62,  pro:9,  fib:4,  cat:"Snacks" },
  { name:"Roasted Chana (30g)",            cal:120, pro:7,  fib:5,  cat:"Snacks" },
  { name:"Dhokla (2 pieces)",              cal:100, pro:4,  fib:1,  cat:"Snacks" },
  { name:"Popcorn air-popped (1 cup)",     cal:31,  pro:1,  fib:1,  cat:"Snacks" },
  { name:"Rice Cakes (2 pieces)",          cal:70,  pro:1,  fib:0,  cat:"Snacks" },
  { name:"Granola Bar (1)",                cal:190, pro:4,  fib:2,  cat:"Snacks" },
  { name:"Protein Bar (1)",                cal:210, pro:20, fib:3,  cat:"Snacks" },
  { name:"Dark Chocolate (20g)",           cal:112, pro:1,  fib:1,  cat:"Snacks" },
  { name:"Vada (1 piece)",                 cal:100, pro:3,  fib:2,  cat:"Snacks" },
  { name:"Samosa (1 piece)",               cal:150, pro:3,  fib:2,  cat:"Snacks" },
  { name:"Chaat (1 cup)",                  cal:200, pro:6,  fib:3,  cat:"Snacks" },
  { name:"Protein Shake (1 scoop)",        cal:120, pro:25, fib:1,  cat:"Snacks" },

  // ── CHUTNEYS & CONDIMENTS ──
  { name:"Coconut Chutney (2 tbsp)",       cal:60,  pro:1,  fib:1,  cat:"Chutneys" },
  { name:"Green / Mint Chutney (2 tbsp)",  cal:20,  pro:1,  fib:1,  cat:"Chutneys" },
  { name:"Coriander Chutney (2 tbsp)",     cal:15,  pro:0,  fib:1,  cat:"Chutneys" },
  { name:"Tamarind Chutney (2 tbsp)",      cal:40,  pro:0,  fib:1,  cat:"Chutneys" },
  { name:"Tomato Chutney (2 tbsp)",        cal:25,  pro:1,  fib:1,  cat:"Chutneys" },
  { name:"Peanut Chutney (2 tbsp)",        cal:80,  pro:3,  fib:1,  cat:"Chutneys" },
  { name:"Onion Chutney (2 tbsp)",         cal:35,  pro:1,  fib:1,  cat:"Chutneys" },
  { name:"Garlic Chutney (2 tbsp)",        cal:30,  pro:1,  fib:1,  cat:"Chutneys" },
  { name:"Red Chilli Chutney (2 tbsp)",    cal:20,  pro:1,  fib:1,  cat:"Chutneys" },
  { name:"Schezwan Chutney (2 tbsp)",      cal:45,  pro:1,  fib:1,  cat:"Chutneys" },
  { name:"Mango Pickle / Aam Achar (1 tsp)",cal:20, pro:0,  fib:0,  cat:"Chutneys" },
  { name:"Mixed Pickle (1 tsp)",           cal:15,  pro:0,  fib:0,  cat:"Chutneys" },
  { name:"Tomato Ketchup (1 tbsp)",        cal:18,  pro:0,  fib:0,  cat:"Chutneys" },

  // ── BEVERAGES ──
  { name:"Green Tea (1 cup)",              cal:2,   pro:0,  fib:0,  cat:"Beverages" },
  { name:"Black Coffee (1 cup)",           cal:5,   pro:0,  fib:0,  cat:"Beverages" },
  { name:"Coconut Water (1 cup)",          cal:46,  pro:2,  fib:3,  cat:"Beverages" },
  { name:"Lemon Water (1 glass)",          cal:10,  pro:0,  fib:0,  cat:"Beverages" },
  { name:"Nimbu Pani (1 glass)",           cal:30,  pro:0,  fib:0,  cat:"Beverages" },
  { name:"Jeera Water (1 cup)",            cal:5,   pro:0,  fib:0,  cat:"Beverages" },
  { name:"Banana Smoothie (1 cup)",        cal:200, pro:5,  fib:2,  cat:"Beverages" },
  { name:"Mango Lassi (1 glass)",          cal:250, pro:7,  fib:1,  cat:"Beverages" },
  { name:"Protein Coffee (1 cup)",         cal:130, pro:20, fib:0,  cat:"Beverages" },
  { name:"Fruit Juice (1 cup)",            cal:110, pro:1,  fib:0,  cat:"Beverages" },
];

// ── CONSTANTS ──────────────────────────────────────────
const DAYS  = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEALS = ["Breakfast","Morning Snack","Lunch","Evening Snack","Dinner"];
const EMOJI = { "Breakfast":"🌅","Morning Snack":"🍎","Lunch":"☀️","Evening Snack":"🫖","Dinner":"🌙" };

const MEAL_SPLIT = {
  loss:     {"Breakfast":0.25,"Morning Snack":0.10,"Lunch":0.30,"Evening Snack":0.10,"Dinner":0.25},
  maintain: {"Breakfast":0.25,"Morning Snack":0.10,"Lunch":0.30,"Evening Snack":0.10,"Dinner":0.25},
  gain:     {"Breakfast":0.20,"Morning Snack":0.15,"Lunch":0.30,"Evening Snack":0.15,"Dinner":0.20},
};

const TEMPLATES = {
  "🥗 Balanced Week": {
    "Breakfast":     ["Oats (1 cup cooked)","Banana (1 medium)","Milk (1 cup)"],
    "Morning Snack": ["Almonds (28g)"],
    "Lunch":         ["Rice (cooked, 1 cup)","Dal (1 cup cooked)","Mixed Vegetables (1 cup)"],
    "Evening Snack": ["Roasted Chana (30g)","Green Tea (1 cup)"],
    "Dinner":        ["Roti / Chapati (1 piece)","Sabzi / Stir Fry (1 cup)","Curd / Yogurt (1 cup)"],
  },
  "🔥 Weight Loss": {
    "Breakfast":     ["Oats (1 cup cooked)","Apple (1 medium)","Green Tea (1 cup)"],
    "Morning Snack": ["Cucumber (1 cup)","Sprouts (1 cup)"],
    "Lunch":         ["Brown Rice (1 cup)","Dal (1 cup cooked)","Broccoli (1 cup)"],
    "Evening Snack": ["Coconut Water (1 cup)","Roasted Chana (30g)"],
    "Dinner":        ["Roti / Chapati (1 piece)","Palak Curry (1 cup)","Curd / Yogurt (1 cup)"],
  },
  "💪 High Protein": {
    "Breakfast":     ["Eggs (1 whole)","Greek Yogurt (1 cup)","Banana (1 medium)"],
    "Morning Snack": ["Protein Shake (1 scoop)","Almonds (28g)"],
    "Lunch":         ["Chicken Breast (100g)","Brown Rice (1 cup)","Broccoli (1 cup)"],
    "Evening Snack": ["Peanut Butter (2 tbsp)","Milk (1 cup)"],
    "Dinner":        ["Salmon (100g)","Mixed Vegetables (1 cup)","Roti / Chapati (1 piece)"],
  },
  "🌿 Vegetarian": {
    "Breakfast":     ["Greek Yogurt (1 cup)","Oats (1 cup cooked)","Banana (1 medium)"],
    "Morning Snack": ["Sprouts (1 cup)","Pumpkin Seeds (28g)"],
    "Lunch":         ["Rajma (1 cup cooked)","Brown Rice (1 cup)","Mixed Vegetables (1 cup)"],
    "Evening Snack": ["Roasted Chana (30g)","Buttermilk / Chaas (1 cup)"],
    "Dinner":        ["Paneer (100g)","Roti / Chapati (1 piece)","Dal (1 cup cooked)"],
  },
};

// ── STATE ──────────────────────────────────────────────
let currentWeekStart = getMonday(new Date());
let addingTo = null;

// ── UTILS ──────────────────────────────────────────────
function getMonday(d) {
  const date=new Date(d); const day=date.getDay();
  date.setDate(date.getDate()-day+(day===0?-6:1));
  date.setHours(0,0,0,0); return date;
}
function weekKey(d)  { return d.toISOString().split('T')[0]; }
function fmt(d)      { return d.toLocaleDateString('en-US',{month:'short',day:'numeric'}); }
function save(k,v)   { localStorage.setItem(k,JSON.stringify(v)); }
function load(k,fb)  { const v=localStorage.getItem(k); return v?JSON.parse(v):fb; }

function emptyWeek() {
  const w={};
  DAYS.forEach(d=>{ w[d]={}; MEALS.forEach(m=>w[d][m]=[]); });
  return w;
}
function getWeekPlan()      { return load('wmp_week_'+weekKey(currentWeekStart),emptyWeek()); }
function saveWeekPlan(plan) { save('wmp_week_'+weekKey(currentWeekStart),plan); }
function getProfile()       { return load('wmp_profile',{name:'',weight:65,height:165,age:25,gender:'female',goal:'maintain'}); }

function calcTargets(p) {
  const bmr = p.gender==='male'
    ? 10*p.weight+6.25*p.height-5*p.age+5
    : 10*p.weight+6.25*p.height-5*p.age-161;
  const tdee = bmr*1.4;
  const cal  = p.goal==='loss'?tdee-400:p.goal==='gain'?tdee+300:tdee;
  const proteinMult = p.goal==='gain'?1.8:1.2;
  return {
    calories: Math.round(cal),
    protein:  Math.round(p.weight*proteinMult),
    fiber:    p.gender==='male'?38:25,
  };
}

function iCal(i){ return Math.round(i.cal*(i.qty||1)); }
function iPro(i){ return Math.round(i.pro*(i.qty||1)); }
function iFib(i){ return Math.round(i.fib*(i.qty||1)); }
function mealTotals(items) {
  return items.reduce((a,i)=>({cal:a.cal+iCal(i),pro:a.pro+iPro(i),fib:a.fib+iFib(i)}),{cal:0,pro:0,fib:0});
}
function dayTotals(dm) {
  let t={cal:0,pro:0,fib:0};
  MEALS.forEach(m=>{ const x=mealTotals(dm[m]||[]); t.cal+=x.cal;t.pro+=x.pro;t.fib+=x.fib; });
  return t;
}

// ── TABS ───────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s=>s.classList.add('hidden'));
    btn.classList.add('active');
    const tab=btn.dataset.tab;
    document.getElementById(tab).classList.remove('hidden');
    if(tab==='nutrition') renderNutrition();
    if(tab==='grocery')   renderGrocery();
    if(tab==='profile')   renderProfile();
  });
});

// ── PLANNER ────────────────────────────────────────────
function renderPlanner() {
  const plan    = getWeekPlan();
  const profile = getProfile();
  const targets = calcTargets(profile);
  const split   = MEAL_SPLIT[profile.goal]||MEAL_SPLIT.maintain;
  const end     = new Date(currentWeekStart); end.setDate(end.getDate()+6);
  document.getElementById('weekLabel').textContent=`Week of ${fmt(currentWeekStart)} – ${fmt(end)}`;

  const today=new Date(); today.setHours(0,0,0,0);
  const grid=document.getElementById('plannerGrid');
  grid.innerHTML='';

  DAYS.forEach((day,i)=>{
    const dayDate=new Date(currentWeekStart); dayDate.setDate(dayDate.getDate()+i);
    const isToday=dayDate.getTime()===today.getTime();

    const col=document.createElement('div');
    col.className='day-column';

    const hdr=document.createElement('div');
    hdr.className='day-header'+(isToday?' today':'');
    hdr.textContent=day.slice(0,3);
    col.appendChild(hdr);

    MEALS.forEach(meal=>{
      const items=plan[day][meal]||[];
      const mealTarget=Math.round(targets.calories*split[meal]);
      const actual=mealTotals(items).cal;

      const slot=document.createElement('div');
      slot.className='meal-slot';
      slot.innerHTML=`<div class="meal-slot-label">${EMOJI[meal]} ${meal}</div>`;

      items.forEach((item,idx)=>{
        const row=document.createElement('div');
        row.className='meal-item';
        const qtyLabel=(!item.qty||item.qty===1)?'':` ×${item.qty}`;
        row.innerHTML=`
          <span class="meal-item-name" title="${item.name}">${item.name.split('(')[0].trim()}${qtyLabel}</span>
          <div class="qty-controls">
            <button class="qty-btn" data-day="${day}" data-meal="${meal}" data-idx="${idx}" data-action="dec">−</button>
            <input class="qty-input" type="number" data-day="${day}" data-meal="${meal}" data-idx="${idx}" value="${item.qty||1}" min="0.1" step="0.1">
            <button class="qty-btn" data-day="${day}" data-meal="${meal}" data-idx="${idx}" data-action="inc">+</button>
          </div>
          <button class="meal-item-remove" data-day="${day}" data-meal="${meal}" data-idx="${idx}">×</button>`;
        slot.appendChild(row);
      });

      const hint=document.createElement('div');
      hint.className='meal-cal-hint';
      if(actual>0){
        const color=actual>mealTarget*1.1?'var(--red)':actual<mealTarget*0.75?'var(--yellow)':'var(--green-dark)';
        hint.innerHTML=`<span style="color:${color};font-weight:600">${actual}</span><span style="color:var(--muted)"> / ${mealTarget} cal</span>`;
      } else {
        hint.innerHTML=`<span style="color:var(--muted)">target: ${mealTarget} cal</span>`;
      }
      slot.appendChild(hint);

      const addBtn=document.createElement('button');
      addBtn.className='add-food-btn';
      addBtn.textContent='+ Add food';
      addBtn.dataset.day=day;
      addBtn.dataset.meal=meal;
      addBtn.addEventListener('click',openModal);
      slot.appendChild(addBtn);
      col.appendChild(slot);
    });

    grid.appendChild(col);
  });

  grid.querySelectorAll('.qty-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const p=getWeekPlan();
      const item=p[btn.dataset.day][btn.dataset.meal][+btn.dataset.idx];
      const cur=item.qty||1;
      item.qty=btn.dataset.action==='inc'?+(cur+0.5).toFixed(2):Math.max(0.1,+(cur-0.5).toFixed(2));
      saveWeekPlan(p); renderPlanner();
    });
  });

  grid.querySelectorAll('.qty-input').forEach(inp=>{
    inp.addEventListener('change',()=>{
      const val=Math.max(0.1,parseFloat(inp.value)||1);
      const p=getWeekPlan();
      p[inp.dataset.day][inp.dataset.meal][+inp.dataset.idx].qty=+val.toFixed(2);
      saveWeekPlan(p); renderPlanner();
    });
  });

  grid.querySelectorAll('.meal-item-remove').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const p=getWeekPlan();
      p[btn.dataset.day][btn.dataset.meal].splice(+btn.dataset.idx,1);
      saveWeekPlan(p); renderPlanner();
    });
  });
}

document.getElementById('prevWeek').addEventListener('click',()=>{ currentWeekStart.setDate(currentWeekStart.getDate()-7); renderPlanner(); });
document.getElementById('nextWeek').addEventListener('click',()=>{ currentWeekStart.setDate(currentWeekStart.getDate()+7); renderPlanner(); });

// ── FOOD MODAL ─────────────────────────────────────────
function openModal(e) {
  addingTo={day:e.target.dataset.day,meal:e.target.dataset.meal};
  document.getElementById('modalTitle').textContent=`Add to ${addingTo.day} — ${addingTo.meal}`;
  document.getElementById('foodSearch').value='';
  renderFoodList('');
  document.getElementById('modalOverlay').classList.remove('hidden');
  setTimeout(()=>document.getElementById('foodSearch').focus(),100);
}
document.getElementById('closeModal').addEventListener('click',()=>document.getElementById('modalOverlay').classList.add('hidden'));
document.getElementById('modalOverlay').addEventListener('click',e=>{ if(e.target.id==='modalOverlay') document.getElementById('modalOverlay').classList.add('hidden'); });
document.getElementById('foodSearch').addEventListener('input',e=>renderFoodList(e.target.value));

function renderFoodList(query) {
  const filtered=query.trim()?FOODS.filter(f=>f.name.toLowerCase().includes(query.toLowerCase())):FOODS;
  document.getElementById('foodList').innerHTML=filtered.map(f=>`
    <div class="food-item">
      <div class="food-item-info">
        <div class="food-item-name">${f.name}</div>
        <div class="food-item-macros" data-cal="${f.cal}" data-pro="${f.pro}" data-fib="${f.fib}" data-cat="${f.cat}">
          ${f.cal} cal · ${f.pro}g protein · ${f.fib}g fiber · <em>${f.cat}</em>
        </div>
      </div>
      <div class="food-add-group">
        <div class="serving-wrap">
          <input type="number" class="serving-input" data-name="${f.name}" value="1" min="0.1" step="0.1">
          <span class="serving-label">srv</span>
        </div>
        <button class="food-item-add" data-name="${f.name}">Add</button>
      </div>
    </div>`).join('');

  document.querySelectorAll('.serving-input').forEach(inp=>{
    inp.addEventListener('input',()=>{
      const qty=parseFloat(inp.value)||1;
      const food=FOODS.find(f=>f.name===inp.dataset.name);
      if(!food) return;
      const macros=inp.closest('.food-item').querySelector('.food-item-macros');
      macros.innerHTML=`${Math.round(food.cal*qty)} cal · ${Math.round(food.pro*qty)}g protein · ${Math.round(food.fib*qty)}g fiber · <em>${food.cat}</em>`;
    });
  });

  document.querySelectorAll('.food-item-add').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const food=FOODS.find(f=>f.name===btn.dataset.name);
      if(!food||!addingTo) return;
      const inp=btn.closest('.food-add-group').querySelector('.serving-input');
      const qty=Math.max(0.1,parseFloat(inp.value)||1);
      const plan=getWeekPlan();
      plan[addingTo.day][addingTo.meal].push({...food,qty:+qty.toFixed(2)});
      saveWeekPlan(plan); renderPlanner();
      document.getElementById('modalOverlay').classList.add('hidden');
    });
  });
}

// ── WEEK PLAN MODAL ────────────────────────────────────
document.getElementById('openPlanWeek').addEventListener('click',()=>{ renderWeekModal(); document.getElementById('weekPlanOverlay').classList.remove('hidden'); });
document.getElementById('closeWeekPlan').addEventListener('click',()=>document.getElementById('weekPlanOverlay').classList.add('hidden'));
document.getElementById('weekPlanOverlay').addEventListener('click',e=>{ if(e.target.id==='weekPlanOverlay') document.getElementById('weekPlanOverlay').classList.add('hidden'); });

function renderWeekModal() {
  document.getElementById('templateList').innerHTML=Object.entries(TEMPLATES).map(([name,meals])=>{
    const lines=MEALS.map(m=>`<div style="font-size:11px;color:#6b7280;margin-top:2px">${EMOJI[m]} ${(meals[m]||[]).slice(0,2).map(f=>f.split('(')[0].trim()).join(', ')}</div>`).join('');
    return `<div class="template-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">
        <div><div style="font-weight:700;font-size:14px;margin-bottom:4px">${name}</div>${lines}</div>
        <button class="btn-apply-template" data-template="${name}">Apply</button>
      </div>
    </div>`;
  }).join('');

  document.querySelectorAll('.btn-apply-template').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!confirm(`Apply "${btn.dataset.template}" to all 7 days? This replaces the current week.`)) return;
      applyTemplate(btn.dataset.template);
      document.getElementById('weekPlanOverlay').classList.add('hidden');
      renderPlanner();
    });
  });

  document.getElementById('copyDayBtns').innerHTML=DAYS.map(d=>
    `<button class="btn-secondary" style="font-size:12px;padding:5px 12px;" data-day="${d}">${d.slice(0,3)}</button>`
  ).join('');
  document.querySelectorAll('#copyDayBtns button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!confirm(`Copy ${btn.dataset.day}'s meals to all other days?`)) return;
      copyDayToAll(btn.dataset.day);
      document.getElementById('weekPlanOverlay').classList.add('hidden');
      renderPlanner();
    });
  });
}

function applyTemplate(name) {
  const tpl=TEMPLATES[name]; const plan=emptyWeek();
  DAYS.forEach(day=>{
    MEALS.forEach(meal=>{
      plan[day][meal]=(tpl[meal]||[]).map(n=>{ const f=FOODS.find(x=>x.name===n); return f?{...f,qty:1}:null; }).filter(Boolean);
    });
  });
  saveWeekPlan(plan);
}

function copyDayToAll(src) {
  const plan=getWeekPlan();
  DAYS.forEach(day=>{ if(day!==src) plan[day]=JSON.parse(JSON.stringify(plan[src])); });
  saveWeekPlan(plan);
}

// ── NUTRITION ──────────────────────────────────────────
let selectedDay='Monday';

function renderNutrition() {
  const plan=getWeekPlan(); const profile=getProfile();
  const targets=calcTargets(profile);
  const split=MEAL_SPLIT[profile.goal]||MEAL_SPLIT.maintain;

  document.getElementById('daySelector').innerHTML=
    DAYS.map(d=>`<button class="day-btn ${d===selectedDay?'active':''}" data-day="${d}">${d.slice(0,3)}</button>`).join('');
  document.querySelectorAll('.day-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{ selectedDay=btn.dataset.day; renderNutrition(); });
  });

  const dm=plan[selectedDay]; const tot=dayTotals(dm);

  function bar(label,current,target,unit='') {
    const pct=Math.min((current/target)*100,100);
    const status=current>target*1.1?'high':current<target*0.8?'low':'ok';
    const msg=status==='high'?`⚠️ ${current-target}${unit} over`
              :status==='low'?`↓ ${target-current}${unit} below target`
              :'✓ On track';
    return `<div class="progress-item">
      <div class="progress-header"><span class="progress-label">${label}</span><span class="progress-value">${current}${unit} / ${target}${unit}</span></div>
      <div class="progress-bar-bg"><div class="progress-bar ${status}" style="width:${pct}%"></div></div>
      <span class="status-badge ${status}">${msg}</span>
    </div>`;
  }

  const goalLabel=profile.goal==='loss'?'Weight Loss':profile.goal==='gain'?'Weight Gain':'Maintenance';
  const tips=[];
  if(tot.cal===0){
    tips.push(`📋 No meals planned — use <strong>Plan Whole Week</strong> to fill all 7 days instantly!`);
  } else {
    if(tot.pro<targets.protein*0.8) tips.push(`🥩 Protein low (${tot.pro}g / ${targets.protein}g) — add <strong>Greek Yogurt</strong> (+17g), <strong>Eggs</strong> (+6g each), or <strong>Chicken Breast</strong> (+31g/100g)`);
    if(tot.fib<targets.fiber*0.8)   tips.push(`🥦 Fiber low (${tot.fib}g / ${targets.fiber}g) — add <strong>Raspberry</strong> (+8g/cup), <strong>Broccoli</strong> (+5g), or <strong>Chia Seeds</strong> (+5g/tbsp)`);
    if(tot.cal>targets.calories*1.1) tips.push(`🔥 Over by ${tot.cal-targets.calories} cal — reduce portions using the serving input or swap to lighter options`);
    if(tot.cal<targets.calories*0.8) tips.push(`📉 Under by ${targets.calories-tot.cal} cal — add a snack like <strong>Banana</strong> (+105 cal) or <strong>Peanut Butter</strong> (+190 cal)`);
    if(profile.goal==='gain'&&tot.pro<targets.protein) tips.push(`💪 For weight gain: try adding <strong>Protein Shake</strong> (+25g) or extra <strong>Paneer</strong>`);
  }

  const breakdown=MEALS.map(meal=>{
    const items=dm[meal]||[]; const t=mealTotals(items);
    const mealCal=Math.round(targets.calories*split[meal]);
    const flag=t.cal===0?'':t.cal>mealCal*1.15?'🔴':t.cal<mealCal*0.75?'🟡':'🟢';
    return `<div class="summary-row">
      <span class="label">${EMOJI[meal]} ${meal}</span>
      <span>${t.cal===0?`<span style="color:var(--muted)">Nothing added</span>`:`${flag} ${t.cal} cal · ${t.pro}g prot · ${t.fib}g fiber`}
      <span style="font-size:11px;color:var(--muted)"> / ${mealCal} cal target</span></span>
    </div>`;
  }).join('');

  document.getElementById('nutritionContent').innerHTML=`
    <div class="nutrition-card">
      <h3>📊 ${selectedDay} — <span style="font-size:13px;color:var(--muted);font-weight:500">${goalLabel} · ${targets.calories} cal target</span></h3>
      ${bar('Calories',tot.cal,targets.calories)}
      ${bar('Protein',tot.pro,targets.protein,'g')}
      ${bar('Fiber',tot.fib,targets.fiber,'g')}
    </div>
    <div class="suggestions-card ${tips.length===0?'ok':''}">
      <h3>${tips.length===0?'✅ All on track!':'💡 Suggestions'}</h3>
      ${(tips.length?tips:['Great job! All nutrients are on track for your goal.']).map(s=>`<div class="suggestion-item">${s}</div>`).join('')}
    </div>
    <div class="meals-summary"><h3>Meal Breakdown</h3>${breakdown}</div>`;
}

// ── GROCERY ────────────────────────────────────────────
function renderGrocery() {
  const plan=getWeekPlan();
  const checked=load('wmp_checked_'+weekKey(currentWeekStart),{});
  const items={};

  DAYS.forEach(day=>MEALS.forEach(meal=>{
    (plan[day][meal]||[]).forEach(item=>{
      if(items[item.name]) items[item.name].totalQty+=item.qty||1;
      else items[item.name]={...item,totalQty:item.qty||1};
    });
  }));

  if(!Object.keys(items).length){
    document.getElementById('groceryContent').innerHTML=
      `<div class="empty-state"><div class="icon">🛒</div><p>No meals planned yet.<br>Add meals in the Planner tab!</p></div>`;
    return;
  }

  const byCat={};
  Object.values(items).forEach(i=>{ (byCat[i.cat]=byCat[i.cat]||[]).push(i); });

  document.getElementById('groceryContent').innerHTML=
    Object.entries(byCat).map(([cat,foods])=>`
      <div class="grocery-category">
        <h3>${cat}</h3>
        ${foods.map(f=>{
          const q=Number.isInteger(f.totalQty)?`×${f.totalQty}`:`×${f.totalQty.toFixed(1)}`;
          return `<div class="grocery-item ${checked[f.name]?'checked':''}">
            <input type="checkbox" ${checked[f.name]?'checked':''} data-name="${f.name}">
            <span class="grocery-item-name">${f.name}</span>
            <span class="grocery-item-qty">${q}</span>
          </div>`;
        }).join('')}
      </div>`).join('');

  document.querySelectorAll('#groceryContent input[type=checkbox]').forEach(cb=>{
    cb.addEventListener('change',()=>{
      const ck=load('wmp_checked_'+weekKey(currentWeekStart),{});
      ck[cb.dataset.name]=cb.checked;
      save('wmp_checked_'+weekKey(currentWeekStart),ck);
      cb.closest('.grocery-item').classList.toggle('checked',cb.checked);
    });
  });
}

document.getElementById('clearChecked').addEventListener('click',()=>{
  save('wmp_checked_'+weekKey(currentWeekStart),{}); renderGrocery();
});

// Ingredient → Meal suggestion
let suggestOpen=false;
document.getElementById('toggleSuggest').addEventListener('click',()=>{
  suggestOpen=!suggestOpen;
  document.getElementById('suggestPanel').classList.toggle('hidden',!suggestOpen);
  document.getElementById('suggestArrow').textContent=suggestOpen?'▲':'▼';
  if(suggestOpen) setTimeout(()=>document.getElementById('ingredientSearch').focus(),100);
});

document.getElementById('ingredientSearch').addEventListener('input',e=>{
  const q=e.target.value.trim();
  const el=document.getElementById('ingredientResults');
  if(!q){ el.innerHTML=''; return; }
  const matches=FOODS.filter(f=>f.name.toLowerCase().includes(q.toLowerCase()));
  el.innerHTML=matches.length
    ?matches.map(f=>`
        <div class="food-item">
          <div class="food-item-info">
            <div class="food-item-name">${f.name}</div>
            <div class="food-item-macros">${f.cal} cal · ${f.pro}g protein · ${f.fib}g fiber · ${f.cat}</div>
          </div>
          <button class="food-item-add add-ing-btn" data-name="${f.name}">+ Add to Plan</button>
        </div>`).join('')
    :`<div style="padding:10px 12px;font-size:13px;color:var(--muted)">No matches found</div>`;

  document.querySelectorAll('.add-ing-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const food=FOODS.find(f=>f.name===btn.dataset.name);
      if(!food) return;
      const dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const todayName=dayNames[new Date().getDay()];
      const targetDay=DAYS.includes(todayName)?todayName:'Monday';
      const plan=getWeekPlan();
      plan[targetDay]['Lunch'].push({...food,qty:1});
      saveWeekPlan(plan);
      btn.textContent=`✓ Added to ${targetDay}`;
      btn.disabled=true;
      btn.style.background='var(--green-light)';
    });
  });
});

// ── PROFILE ────────────────────────────────────────────
function renderProfile() {
  const p=getProfile();
  document.getElementById('pName').value   =p.name;
  document.getElementById('pWeight').value =p.weight;
  document.getElementById('pHeight').value =p.height;
  document.getElementById('pAge').value    =p.age;
  document.querySelectorAll('[data-group=gender]').forEach(b=>b.classList.toggle('active',b.dataset.value===p.gender));
  document.querySelectorAll('[data-group=goal]').forEach(b=>b.classList.toggle('active',b.dataset.value===p.goal));
  showTargets(p);
}

document.querySelectorAll('.toggle').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll(`[data-group="${btn.dataset.group}"]`).forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.getElementById('saveProfile').addEventListener('click',()=>{
  const p={
    name:   document.getElementById('pName').value,
    weight: +document.getElementById('pWeight').value,
    height: +document.getElementById('pHeight').value,
    age:    +document.getElementById('pAge').value,
    gender: document.querySelector('[data-group=gender].active')?.dataset.value||'female',
    goal:   document.querySelector('[data-group=goal].active')?.dataset.value||'maintain',
  };
  save('wmp_profile',p); showTargets(p); renderPlanner();
  const btn=document.getElementById('saveProfile');
  btn.textContent='✓ Saved!';
  setTimeout(()=>btn.textContent='Save Profile',2000);
});

function showTargets(p) {
  const t=calcTargets(p);
  document.getElementById('tCalories').textContent=t.calories;
  document.getElementById('tProtein').textContent =t.protein+'g';
  document.getElementById('tFiber').textContent   =t.fiber+'g';
}

// ── INIT ───────────────────────────────────────────────
renderPlanner();
renderProfile();
