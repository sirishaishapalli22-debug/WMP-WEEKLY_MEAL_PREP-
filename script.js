// ── FOOD DATABASE ──────────────────────────────────────
const FOODS = [

  // ── RICE & GRAINS ──
  { name:"White Rice, cooked (1 cup)",          cal:195, pro:4,  fib:1,  cat:"Rice & Grains" },
  { name:"White Rice (1.5 cups)",               cal:290, pro:6,  fib:1,  cat:"Rice & Grains" },
  { name:"Brown Rice (1 cup)",                  cal:215, pro:5,  fib:4,  cat:"Rice & Grains" },
  { name:"Red Rice (1 cup)",                    cal:210, pro:5,  fib:3,  cat:"Rice & Grains" },
  { name:"Jeera Rice (1 cup)",                  cal:230, pro:4,  fib:1,  cat:"Rice & Grains" },
  { name:"Ghee Rice (1 cup)",                   cal:270, pro:4,  fib:1,  cat:"Rice & Grains" },
  { name:"Lemon Rice (1 cup)",                  cal:250, pro:5,  fib:2,  cat:"Rice & Grains" },
  { name:"Pulihora / Tamarind Rice (1 cup)",    cal:270, pro:5,  fib:2,  cat:"Rice & Grains" },
  { name:"Coconut Rice (1 cup)",                cal:300, pro:5,  fib:3,  cat:"Rice & Grains" },
  { name:"Tomato Rice (1 cup)",                 cal:230, pro:4,  fib:2,  cat:"Rice & Grains" },
  { name:"Curd Rice (1 cup)",                   cal:220, pro:6,  fib:1,  cat:"Rice & Grains" },
  { name:"Curd Rice with Tempering (1 cup)",    cal:240, pro:6,  fib:1,  cat:"Rice & Grains" },
  { name:"Vegetable Pulao (1 cup)",             cal:250, pro:5,  fib:3,  cat:"Rice & Grains" },
  { name:"Veg Biryani (1 cup)",                 cal:300, pro:6,  fib:3,  cat:"Rice & Grains" },
  { name:"Chicken Biryani (1 cup)",             cal:400, pro:23, fib:2,  cat:"Rice & Grains" },
  { name:"Mutton Biryani (1 cup)",              cal:450, pro:23, fib:2,  cat:"Rice & Grains" },
  { name:"Prawn Biryani (1 cup)",               cal:400, pro:20, fib:2,  cat:"Rice & Grains" },
  { name:"Fried Rice (1 cup)",                  cal:325, pro:7,  fib:2,  cat:"Rice & Grains" },
  { name:"Khichdi (1 cup)",                     cal:250, pro:9,  fib:5,  cat:"Rice & Grains" },
  { name:"Poha (1 cup cooked)",                 cal:200, pro:4,  fib:2,  cat:"Rice & Grains" },
  { name:"Sabudana Khichdi (1 cup)",            cal:315, pro:4,  fib:2,  cat:"Rice & Grains" },
  { name:"Oats, dry (40g)",                     cal:150, pro:5,  fib:4,  cat:"Rice & Grains" },
  { name:"Ragi Flour (50g)",                    cal:170, pro:4,  fib:5,  cat:"Rice & Grains" },
  { name:"Gongura Rice (1 cup)",                cal:250, pro:5,  fib:3,  cat:"Rice & Grains" },
  { name:"Curry Leaf Rice (1 cup)",             cal:260, pro:5,  fib:3,  cat:"Rice & Grains" },
  { name:"Mint Rice (1 cup)",                   cal:250, pro:5,  fib:2,  cat:"Rice & Grains" },
  { name:"Pudina Pulao (1 cup)",                cal:260, pro:5,  fib:3,  cat:"Rice & Grains" },
  { name:"Capsicum Rice (1 cup)",               cal:240, pro:5,  fib:2,  cat:"Rice & Grains" },
  { name:"Carrot Rice (1 cup)",                 cal:240, pro:5,  fib:3,  cat:"Rice & Grains" },
  { name:"Beetroot Rice (1 cup)",               cal:240, pro:5,  fib:3,  cat:"Rice & Grains" },
  { name:"Peas Pulao (1 cup)",                  cal:260, pro:7,  fib:4,  cat:"Rice & Grains" },
  { name:"Mushroom Rice (1 cup)",               cal:260, pro:7,  fib:3,  cat:"Rice & Grains" },
  { name:"Egg Rice (1 cup)",                    cal:300, pro:10, fib:2,  cat:"Rice & Grains" },
  { name:"Chicken Rice (1 cup)",                cal:350, pro:20, fib:2,  cat:"Rice & Grains" },
  { name:"Mutton Rice (1 cup)",                 cal:400, pro:22, fib:2,  cat:"Rice & Grains" },
  { name:"Mango Rice (1 cup)",                  cal:250, pro:5,  fib:2,  cat:"Rice & Grains" },
  { name:"Sesame Rice (1 cup)",                 cal:280, pro:7,  fib:3,  cat:"Rice & Grains" },
  { name:"Dal Rice (1 cup)",                    cal:300, pro:10, fib:5,  cat:"Rice & Grains" },
  { name:"Dal + Rice + Ghee (1 cup)",           cal:350, pro:10, fib:5,  cat:"Rice & Grains" },
  { name:"Rice + Sambar (1 cup)",               cal:280, pro:8,  fib:4,  cat:"Rice & Grains" },
  { name:"Rice + Rasam (1 cup)",                cal:240, pro:6,  fib:3,  cat:"Rice & Grains" },
  { name:"Rice + Vegetable Curry (1 cup)",      cal:320, pro:7,  fib:4,  cat:"Rice & Grains" },
  { name:"Rice + Chicken Curry (1 cup)",        cal:400, pro:25, fib:2,  cat:"Rice & Grains" },
  { name:"Rice + Fish Curry (1 cup)",           cal:350, pro:22, fib:2,  cat:"Rice & Grains" },
  { name:"Rice + Dal + Vegetable (1 plate)",    cal:550, pro:18, fib:9,  cat:"Rice & Grains" },

  // ── ROTI & BREAD ──
  { name:"Chapati (1 medium)",                  cal:110, pro:3,  fib:2,  cat:"Roti & Bread" },
  { name:"Phulka / Pulka (1)",                  cal:90,  pro:3,  fib:2,  cat:"Roti & Bread" },
  { name:"Roti (1 medium)",                     cal:110, pro:3,  fib:2,  cat:"Roti & Bread" },
  { name:"Multigrain Roti (1)",                 cal:120, pro:4,  fib:3,  cat:"Roti & Bread" },
  { name:"Tandoori Roti (1)",                   cal:135, pro:4,  fib:2,  cat:"Roti & Bread" },
  { name:"Plain Naan (1)",                      cal:265, pro:8,  fib:2,  cat:"Roti & Bread" },
  { name:"Butter Naan (1)",                     cal:325, pro:8,  fib:2,  cat:"Roti & Bread" },
  { name:"Garlic Naan (1)",                     cal:325, pro:8,  fib:2,  cat:"Roti & Bread" },
  { name:"Laccha Paratha (1)",                  cal:275, pro:5,  fib:3,  cat:"Roti & Bread" },
  { name:"Plain Paratha (1)",                   cal:225, pro:5,  fib:3,  cat:"Roti & Bread" },
  { name:"Aloo Paratha (1)",                    cal:275, pro:6,  fib:4,  cat:"Roti & Bread" },
  { name:"Gobi Paratha (1)",                    cal:245, pro:6,  fib:4,  cat:"Roti & Bread" },
  { name:"Paneer Paratha (1)",                  cal:315, pro:10, fib:3,  cat:"Roti & Bread" },
  { name:"Methi Paratha (1)",                   cal:225, pro:6,  fib:4,  cat:"Roti & Bread" },
  { name:"Thepla (1)",                          cal:140, pro:4,  fib:2,  cat:"Roti & Bread" },
  { name:"Puri (1)",                            cal:110, pro:2,  fib:1,  cat:"Roti & Bread" },
  { name:"Bhatura (1)",                         cal:300, pro:6,  fib:2,  cat:"Roti & Bread" },
  { name:"Rumali Roti (1)",                     cal:115, pro:3,  fib:1,  cat:"Roti & Bread" },
  { name:"Kerala Parotta (1)",                  cal:275, pro:5,  fib:2,  cat:"Roti & Bread" },
  { name:"Appam (1)",                           cal:135, pro:2,  fib:1,  cat:"Roti & Bread" },
  { name:"Neer Dosa (1)",                       cal:90,  pro:2,  fib:1,  cat:"Roti & Bread" },
  { name:"Bhakri (1 medium)",                   cal:165, pro:4,  fib:3,  cat:"Roti & Bread" },
  { name:"3 Pulkas + Vegetable Curry",          cal:500, pro:13, fib:8,  cat:"Roti & Bread" },
  { name:"2 Eggs + 2 Chapatis",                 cal:325, pro:18, fib:4,  cat:"Roti & Bread" },
  { name:"100g Chicken + 2 Chapatis",           cal:385, pro:37, fib:4,  cat:"Roti & Bread" },

  // ── SOUTH INDIAN ──
  { name:"Idli (1)",                            cal:60,  pro:2,  fib:1,  cat:"South Indian" },
  { name:"Idli (2)",                            cal:120, pro:4,  fib:2,  cat:"South Indian" },
  { name:"Idli (3)",                            cal:180, pro:6,  fib:3,  cat:"South Indian" },
  { name:"Plain Dosa (1 medium)",               cal:180, pro:4,  fib:1,  cat:"South Indian" },
  { name:"Masala Dosa (1)",                     cal:350, pro:7,  fib:3,  cat:"South Indian" },
  { name:"Set Dosa (2)",                        cal:275, pro:6,  fib:2,  cat:"South Indian" },
  { name:"Rava Dosa (1)",                       cal:215, pro:4,  fib:1,  cat:"South Indian" },
  { name:"Pesarattu (1)",                       cal:200, pro:9,  fib:4,  cat:"South Indian" },
  { name:"Onion Dosa (1)",                      cal:250, pro:5,  fib:2,  cat:"South Indian" },
  { name:"Egg Dosa (1)",                        cal:285, pro:13, fib:2,  cat:"South Indian" },
  { name:"Uttapam (1)",                         cal:215, pro:5,  fib:2,  cat:"South Indian" },
  { name:"Vegetable Uttapam (1)",               cal:250, pro:6,  fib:3,  cat:"South Indian" },
  { name:"Upma (1 cup)",                        cal:225, pro:5,  fib:2,  cat:"South Indian" },
  { name:"Vegetable Upma (1 cup)",              cal:245, pro:6,  fib:3,  cat:"South Indian" },
  { name:"Pongal (1 cup)",                      cal:275, pro:7,  fib:3,  cat:"South Indian" },
  { name:"Medu Vada (1)",                       cal:150, pro:4,  fib:2,  cat:"South Indian" },
  { name:"Masala Vada (1)",                     cal:140, pro:5,  fib:3,  cat:"South Indian" },
  { name:"Punugulu (6 pieces)",                 cal:275, pro:6,  fib:3,  cat:"South Indian" },
  { name:"Mysore Bonda (2)",                    cal:275, pro:5,  fib:2,  cat:"South Indian" },
  { name:"Sambar (1 cup)",                      cal:115, pro:5,  fib:5,  cat:"South Indian" },
  { name:"Rasam (1 cup)",                       cal:60,  pro:2,  fib:2,  cat:"South Indian" },
  { name:"Karam Dosa (1)",                      cal:225, pro:5,  fib:2,  cat:"South Indian" },
  { name:"Ghee Dosa (1)",                       cal:275, pro:4,  fib:1,  cat:"South Indian" },
  { name:"Butter Dosa (1)",                     cal:275, pro:5,  fib:1,  cat:"South Indian" },
  { name:"Cheese Dosa (1)",                     cal:400, pro:12, fib:1,  cat:"South Indian" },
  { name:"Paneer Dosa (1)",                     cal:400, pro:15, fib:3,  cat:"South Indian" },
  { name:"Chicken Dosa (1)",                    cal:400, pro:20, fib:2,  cat:"South Indian" },
  { name:"Pesara Attu (1)",                     cal:200, pro:9,  fib:4,  cat:"South Indian" },
  { name:"MLA Pesarattu (1)",                   cal:350, pro:12, fib:4,  cat:"South Indian" },
  { name:"Pesarattu + Upma (1)",                cal:325, pro:10, fib:5,  cat:"South Indian" },
  { name:"Kanchipuram Idli (2)",                cal:165, pro:5,  fib:2,  cat:"South Indian" },
  { name:"Thatte Idli (1)",                     cal:115, pro:3,  fib:1,  cat:"South Indian" },
  { name:"Kotte Idli (2)",                      cal:135, pro:4,  fib:2,  cat:"South Indian" },
  { name:"Idiyappam (2)",                       cal:200, pro:3,  fib:2,  cat:"South Indian" },
  { name:"Appam + Veg Stew (2 + 1 cup)",        cal:400, pro:7,  fib:4,  cat:"South Indian" },
  { name:"Appam + Chicken Stew (2 + 1 cup)",    cal:500, pro:25, fib:2,  cat:"South Indian" },
  { name:"Puttu (1 cup)",                       cal:275, pro:5,  fib:4,  cat:"South Indian" },
  { name:"Puttu + Kadala Curry (1 serving)",    cal:450, pro:12, fib:10, cat:"South Indian" },
  { name:"Kuzhi Paniyaram (6)",                 cal:275, pro:6,  fib:3,  cat:"South Indian" },
  { name:"Kara Paniyaram (6)",                  cal:285, pro:7,  fib:3,  cat:"South Indian" },
  { name:"Adai (1)",                            cal:205, pro:8,  fib:5,  cat:"South Indian" },
  { name:"Adai + Avial (1 serving)",            cal:350, pro:10, fib:7,  cat:"South Indian" },
  { name:"Bread Upma (1 cup)",                  cal:250, pro:6,  fib:2,  cat:"South Indian" },
  { name:"Vegetable Sandwich (1)",              cal:250, pro:7,  fib:4,  cat:"South Indian" },
  { name:"Bread Omelette (2 bread + 2 eggs)",   cal:340, pro:16, fib:3,  cat:"South Indian" },
  { name:"2 Idlis + Sambar",                    cal:245, pro:9,  fib:7,  cat:"South Indian" },
  { name:"1 Dosa + Sambar",                     cal:295, pro:9,  fib:6,  cat:"South Indian" },

  // ── DAL & CURRY ──
  { name:"Toor Dal (1 cup)",                    cal:205, pro:11, fib:7,  cat:"Dal & Curry" },
  { name:"Moong Dal (1 cup)",                   cal:190, pro:12, fib:8,  cat:"Dal & Curry" },
  { name:"Masoor Dal (1 cup)",                  cal:205, pro:13, fib:8,  cat:"Dal & Curry" },
  { name:"Chana Dal (1 cup)",                   cal:235, pro:12, fib:10, cat:"Dal & Curry" },
  { name:"Dal Tadka (1 cup)",                   cal:250, pro:10, fib:7,  cat:"Dal & Curry" },
  { name:"Dal Fry (1 cup)",                     cal:250, pro:10, fib:7,  cat:"Dal & Curry" },
  { name:"Palak Dal (1 cup)",                   cal:205, pro:10, fib:6,  cat:"Dal & Curry" },
  { name:"Rajma Curry (1 cup)",                 cal:250, pro:13, fib:9,  cat:"Dal & Curry" },
  { name:"Chole (1 cup)",                       cal:275, pro:12, fib:10, cat:"Dal & Curry" },
  { name:"Black Chana Curry (1 cup)",           cal:270, pro:13, fib:10, cat:"Dal & Curry" },
  { name:"Aloo Curry (1 cup)",                  cal:215, pro:4,  fib:4,  cat:"Dal & Curry" },
  { name:"Beans Curry (1 cup)",                 cal:175, pro:5,  fib:5,  cat:"Dal & Curry" },
  { name:"Cabbage Curry (1 cup)",               cal:155, pro:4,  fib:4,  cat:"Dal & Curry" },
  { name:"Bhindi Fry / Curry (1 cup)",          cal:215, pro:4,  fib:5,  cat:"Dal & Curry" },
  { name:"Brinjal Curry (1 cup)",               cal:185, pro:3,  fib:5,  cat:"Dal & Curry" },
  { name:"Cauliflower Curry (1 cup)",           cal:175, pro:5,  fib:5,  cat:"Dal & Curry" },
  { name:"Mixed Vegetable Curry (1 cup)",       cal:215, pro:5,  fib:5,  cat:"Dal & Curry" },
  { name:"Palak Curry (1 cup)",                 cal:150, pro:5,  fib:4,  cat:"Dal & Curry" },
  { name:"Vegetable Korma (1 cup)",             cal:300, pro:6,  fib:5,  cat:"Dal & Curry" },
  { name:"Dal Makhani (1 cup)",                 cal:315, pro:10, fib:8,  cat:"Dal & Curry" },
  { name:"Dal Palak (1 cup)",                   cal:225, pro:10, fib:7,  cat:"Dal & Curry" },
  { name:"Lauki Dal (1 cup)",                   cal:190, pro:8,  fib:6,  cat:"Dal & Curry" },
  { name:"Ridge Gourd Dal (1 cup)",             cal:195, pro:9,  fib:6,  cat:"Dal & Curry" },
  { name:"Bottle Gourd Curry (1 cup)",          cal:125, pro:3,  fib:3,  cat:"Dal & Curry" },
  { name:"Pumpkin Curry (1 cup)",               cal:155, pro:3,  fib:4,  cat:"Dal & Curry" },
  { name:"Sweet Potato Curry (1 cup)",          cal:230, pro:4,  fib:5,  cat:"Dal & Curry" },
  { name:"Beetroot Curry (1 cup)",              cal:175, pro:3,  fib:4,  cat:"Dal & Curry" },
  { name:"Carrot Peas Curry (1 cup)",           cal:210, pro:5,  fib:5,  cat:"Dal & Curry" },
  { name:"Mushroom Curry (1 cup)",              cal:240, pro:7,  fib:3,  cat:"Dal & Curry" },
  { name:"Mushroom Masala (1 cup)",             cal:260, pro:7,  fib:3,  cat:"Dal & Curry" },
  { name:"Mushroom Pepper Fry (1 cup)",         cal:240, pro:7,  fib:3,  cat:"Dal & Curry" },
  { name:"Corn Masala (1 cup)",                 cal:260, pro:7,  fib:5,  cat:"Dal & Curry" },

  // ── NORTH INDIAN (PANEER) ──
  { name:"Aloo Gobi (1 cup)",                   cal:230, pro:5,  fib:5,  cat:"North Indian" },
  { name:"Palak Paneer (1 cup)",                cal:300, pro:12, fib:4,  cat:"North Indian" },
  { name:"Paneer Butter Masala (1 cup)",        cal:400, pro:15, fib:2,  cat:"North Indian" },
  { name:"Kadai Paneer (1 cup)",                cal:350, pro:16, fib:4,  cat:"North Indian" },
  { name:"Shahi Paneer (1 cup)",                cal:400, pro:15, fib:2,  cat:"North Indian" },
  { name:"Matar Paneer (1 cup)",                cal:315, pro:14, fib:5,  cat:"North Indian" },
  { name:"Paneer Tikka Masala (1 cup)",         cal:350, pro:18, fib:3,  cat:"North Indian" },
  { name:"Malai Kofta (2 pieces)",              cal:350, pro:8,  fib:3,  cat:"North Indian" },
  { name:"Vegetable Kofta (2 pieces)",          cal:300, pro:6,  fib:4,  cat:"North Indian" },
  { name:"Navratan Korma (1 cup)",              cal:350, pro:7,  fib:5,  cat:"North Indian" },
  { name:"Aloo Matar (1 cup)",                  cal:230, pro:6,  fib:5,  cat:"North Indian" },
  { name:"Matar Masala (1 cup)",                cal:235, pro:8,  fib:6,  cat:"North Indian" },

  // ── ANDHRA SPECIAL ──
  { name:"Pappu / Mudda Pappu (1 cup)",         cal:200, pro:11, fib:6,  cat:"Andhra Special" },
  { name:"Tomato Pappu (1 cup)",                cal:205, pro:10, fib:6,  cat:"Andhra Special" },
  { name:"Palakura Pappu (1 cup)",              cal:205, pro:10, fib:6,  cat:"Andhra Special" },
  { name:"Gongura Pappu (1 cup)",               cal:215, pro:10, fib:7,  cat:"Andhra Special" },
  { name:"Mamidikaya Pappu (1 cup)",            cal:215, pro:10, fib:6,  cat:"Andhra Special" },
  { name:"Gongura Pachadi (2 tbsp)",            cal:80,  pro:2,  fib:2,  cat:"Andhra Special" },
  { name:"Tomato Pachadi (2 tbsp)",             cal:55,  pro:1,  fib:2,  cat:"Andhra Special" },
  { name:"Vankaya Pachadi (2 tbsp)",            cal:75,  pro:1,  fib:2,  cat:"Andhra Special" },
  { name:"Beerakaya Pachadi (2 tbsp)",          cal:55,  pro:1,  fib:2,  cat:"Andhra Special" },
  { name:"Dosakaya Pachadi (2 tbsp)",           cal:50,  pro:1,  fib:1,  cat:"Andhra Special" },
  { name:"Peanut Chutney Andhra (2 tbsp)",      cal:90,  pro:4,  fib:2,  cat:"Andhra Special" },
  { name:"Nalla Karam (1 tbsp)",                cal:60,  pro:2,  fib:2,  cat:"Andhra Special" },
  { name:"Kandi Podi (1 tbsp)",                 cal:55,  pro:3,  fib:2,  cat:"Andhra Special" },
  { name:"Idli Podi (1 tbsp)",                  cal:55,  pro:2,  fib:1,  cat:"Andhra Special" },
  { name:"Gongura Chicken (1 cup)",             cal:340, pro:28, fib:3,  cat:"Andhra Special" },
  { name:"Andhra Chicken Curry (1 cup)",        cal:315, pro:25, fib:2,  cat:"Andhra Special" },
  { name:"Kodi Vepudu (100g)",                  cal:315, pro:25, fib:1,  cat:"Andhra Special" },
  { name:"Chicken Iguru (1 cup)",               cal:340, pro:27, fib:2,  cat:"Andhra Special" },
  { name:"Chicken Fry Andhra (100g)",           cal:315, pro:25, fib:1,  cat:"Andhra Special" },
  { name:"Gongura Mutton (1 cup)",              cal:400, pro:25, fib:3,  cat:"Andhra Special" },
  { name:"Mutton Iguru (1 cup)",                cal:400, pro:25, fib:2,  cat:"Andhra Special" },
  { name:"Royyala Iguru (1 cup)",               cal:315, pro:25, fib:2,  cat:"Andhra Special" },
  { name:"Royyala Vepudu (100g)",               cal:315, pro:25, fib:1,  cat:"Andhra Special" },
  { name:"Chepala Pulusu (1 cup)",              cal:260, pro:22, fib:2,  cat:"Andhra Special" },
  { name:"Chepala Fry (100g)",                  cal:285, pro:22, fib:1,  cat:"Andhra Special" },
  { name:"Gutti Vankaya (1 cup)",               cal:260, pro:4,  fib:6,  cat:"Andhra Special" },
  { name:"Gutti Dondakaya (1 cup)",             cal:240, pro:4,  fib:5,  cat:"Andhra Special" },
  { name:"Bendakaya Fry (1 cup)",               cal:240, pro:4,  fib:5,  cat:"Andhra Special" },
  { name:"Aloo Fry (1 cup)",                    cal:260, pro:4,  fib:4,  cat:"Andhra Special" },
  { name:"Dondakaya Fry (1 cup)",               cal:215, pro:4,  fib:5,  cat:"Andhra Special" },
  { name:"Cabbage Poriyal (1 cup)",             cal:160, pro:4,  fib:4,  cat:"Andhra Special" },
  { name:"Carrot Beans Poriyal (1 cup)",        cal:175, pro:5,  fib:5,  cat:"Andhra Special" },
  { name:"Sorakaya Curry (1 cup)",              cal:125, pro:3,  fib:3,  cat:"Andhra Special" },
  { name:"Beerakaya Curry (1 cup)",             cal:145, pro:3,  fib:3,  cat:"Andhra Special" },
  { name:"Dosakaya Curry (1 cup)",              cal:150, pro:3,  fib:3,  cat:"Andhra Special" },
  { name:"Majjiga Pulusu (1 cup)",              cal:150, pro:5,  fib:2,  cat:"Andhra Special" },
  { name:"Avakaya (1 tbsp)",                    cal:50,  pro:0,  fib:1,  cat:"Andhra Special" },
  { name:"Gongura Pickle (1 tbsp)",             cal:50,  pro:1,  fib:1,  cat:"Andhra Special" },
  { name:"Mango Pickle (1 tbsp)",               cal:58,  pro:0,  fib:1,  cat:"Andhra Special" },
  { name:"Bobbatlu / Puran Poli (1)",           cal:250, pro:5,  fib:3,  cat:"Andhra Special" },
  { name:"Poornalu (1)",                        cal:175, pro:3,  fib:2,  cat:"Andhra Special" },
  { name:"Ariselu (1)",                         cal:175, pro:2,  fib:1,  cat:"Andhra Special" },
  { name:"Garelu (1)",                          cal:150, pro:4,  fib:2,  cat:"Andhra Special" },
  { name:"Sarvapindi (1 piece)",                cal:250, pro:5,  fib:4,  cat:"Andhra Special" },
  { name:"Sakinalu (30g)",                      cal:165, pro:3,  fib:2,  cat:"Andhra Special" },
  { name:"Chekkalu (30g)",                      cal:155, pro:3,  fib:2,  cat:"Andhra Special" },

  // ── CHICKEN ──
  { name:"Chicken Breast, cooked (100g)",       cal:165, pro:31, fib:0,  cat:"Chicken" },
  { name:"Chicken Thigh, cooked (100g)",        cal:210, pro:26, fib:0,  cat:"Chicken" },
  { name:"Chicken Curry (1 cup)",               cal:300, pro:25, fib:2,  cat:"Chicken" },
  { name:"Chicken Fry (100g)",                  cal:285, pro:25, fib:1,  cat:"Chicken" },
  { name:"Chicken Tikka (100g)",                cal:195, pro:28, fib:1,  cat:"Chicken" },
  { name:"Tandoori Chicken (1 leg)",            cal:240, pro:25, fib:0,  cat:"Chicken" },
  { name:"Chicken 65 (100g)",                   cal:315, pro:22, fib:1,  cat:"Chicken" },
  { name:"Butter Chicken (1 cup)",              cal:400, pro:25, fib:2,  cat:"Chicken" },
  { name:"Chicken Kebab (100g)",                cal:215, pro:25, fib:1,  cat:"Chicken" },
  { name:"Chicken Chettinad (1 cup)",           cal:350, pro:28, fib:3,  cat:"Chicken" },
  { name:"Chicken Korma (1 cup)",               cal:400, pro:25, fib:2,  cat:"Chicken" },
  { name:"Chicken Stew (1 cup)",                cal:300, pro:25, fib:2,  cat:"Chicken" },
  { name:"Chicken Sukka (1 cup)",               cal:350, pro:28, fib:2,  cat:"Chicken" },
  { name:"Chicken Pepper Fry (100g)",           cal:315, pro:27, fib:1,  cat:"Chicken" },
  { name:"Chicken Lollipop (2 pieces)",         cal:300, pro:18, fib:1,  cat:"Chicken" },
  { name:"Chicken Wings (4 pieces)",            cal:350, pro:25, fib:0,  cat:"Chicken" },
  { name:"Chicken Seekh Kebab (2 pieces)",      cal:275, pro:20, fib:1,  cat:"Chicken" },
  { name:"Chicken Shawarma (1 roll)",           cal:475, pro:25, fib:3,  cat:"Chicken" },
  { name:"Chicken Roll (1)",                    cal:425, pro:20, fib:3,  cat:"Chicken" },
  { name:"Chicken Frankie (1)",                 cal:450, pro:20, fib:3,  cat:"Chicken" },
  { name:"Chicken Burger (1)",                  cal:475, pro:25, fib:3,  cat:"Chicken" },
  { name:"Chicken Sandwich (1)",                cal:400, pro:23, fib:3,  cat:"Chicken" },
  { name:"100g Chicken + 1 cup Rice",           cal:365, pro:35, fib:1,  cat:"Chicken" },

  // ── MUTTON & SEAFOOD ──
  { name:"Mutton Curry (1 cup)",                cal:350, pro:25, fib:2,  cat:"Mutton & Seafood" },
  { name:"Mutton Fry (100g)",                   cal:350, pro:25, fib:1,  cat:"Mutton & Seafood" },
  { name:"Mutton Kebab (100g)",                 cal:300, pro:25, fib:0,  cat:"Mutton & Seafood" },
  { name:"Keema Curry (1 cup)",                 cal:400, pro:25, fib:2,  cat:"Mutton & Seafood" },
  { name:"Fish Curry (1 cup)",                  cal:230, pro:23, fib:2,  cat:"Mutton & Seafood" },
  { name:"Fried Fish (100g)",                   cal:260, pro:23, fib:1,  cat:"Mutton & Seafood" },
  { name:"Fish Tikka (100g)",                   cal:215, pro:25, fib:1,  cat:"Mutton & Seafood" },
  { name:"Fish Fingers (4)",                    cal:300, pro:20, fib:1,  cat:"Mutton & Seafood" },
  { name:"Prawn Curry (1 cup)",                 cal:260, pro:25, fib:2,  cat:"Mutton & Seafood" },
  { name:"Prawn Fry (100g)",                    cal:290, pro:24, fib:1,  cat:"Mutton & Seafood" },

  // ── DAIRY ──
  { name:"Curd (1 cup)",                        cal:125, pro:7,  fib:0,  cat:"Dairy" },
  { name:"Low-fat Curd (1 cup)",                cal:90,  pro:8,  fib:0,  cat:"Dairy" },
  { name:"Buttermilk (1 glass)",                cal:48,  pro:3,  fib:0,  cat:"Dairy" },
  { name:"Paneer (100g)",                       cal:280, pro:19, fib:0,  cat:"Dairy" },
  { name:"Low-fat Paneer (100g)",               cal:195, pro:23, fib:0,  cat:"Dairy" },
  { name:"Toned Milk (250ml)",                  cal:130, pro:8,  fib:0,  cat:"Dairy" },
  { name:"Full-fat Milk (250ml)",               cal:160, pro:8,  fib:0,  cat:"Dairy" },
  { name:"Cheese (1 slice)",                    cal:70,  pro:4,  fib:0,  cat:"Dairy" },
  { name:"Ghee (1 tsp)",                        cal:45,  pro:0,  fib:0,  cat:"Dairy" },
  { name:"Butter (1 tsp)",                      cal:35,  pro:0,  fib:0,  cat:"Dairy" },
  { name:"Paneer Tikka (100g)",                 cal:230, pro:16, fib:1,  cat:"Dairy" },
  { name:"Raita (1 cup)",                       cal:125, pro:6,  fib:2,  cat:"Dairy" },
  { name:"Cucumber Raita (1 cup)",              cal:105, pro:6,  fib:1,  cat:"Dairy" },
  { name:"Boondi Raita (1 cup)",                cal:215, pro:6,  fib:2,  cat:"Dairy" },

  // ── MILLETS ──
  { name:"Ragi Mudde (1 medium)",               cal:180, pro:4,  fib:3,  cat:"Millets" },
  { name:"Ragi Sangati (1 cup)",                cal:220, pro:5,  fib:4,  cat:"Millets" },
  { name:"Ragi Dosa (1)",                       cal:175, pro:4,  fib:3,  cat:"Millets" },
  { name:"Ragi Roti (1)",                       cal:165, pro:4,  fib:3,  cat:"Millets" },
  { name:"Ragi Idli (2)",                       cal:145, pro:5,  fib:3,  cat:"Millets" },
  { name:"Ragi Upma (1 cup)",                   cal:220, pro:6,  fib:4,  cat:"Millets" },
  { name:"Jowar Roti (1)",                      cal:135, pro:4,  fib:3,  cat:"Millets" },
  { name:"Bajra Roti (1)",                      cal:165, pro:4,  fib:3,  cat:"Millets" },
  { name:"Foxtail Millet Upma (1 cup)",         cal:220, pro:6,  fib:4,  cat:"Millets" },
  { name:"Foxtail Millet Rice (1 cup)",         cal:200, pro:6,  fib:3,  cat:"Millets" },
  { name:"Little Millet Rice (1 cup)",          cal:200, pro:6,  fib:3,  cat:"Millets" },
  { name:"Kodo Millet Rice (1 cup)",            cal:200, pro:6,  fib:3,  cat:"Millets" },
  { name:"Barnyard Millet Rice (1 cup)",        cal:190, pro:6,  fib:4,  cat:"Millets" },
  { name:"Millet Pongal (1 cup)",               cal:240, pro:8,  fib:4,  cat:"Millets" },
  { name:"Millet Dosa (1)",                     cal:170, pro:5,  fib:3,  cat:"Millets" },

  // ── SNACKS & NAMKEEN ──
  { name:"Roasted Peanuts (30g)",               cal:170, pro:7,  fib:3,  cat:"Snacks" },
  { name:"Roasted Chana (30g)",                 cal:115, pro:6,  fib:5,  cat:"Snacks" },
  { name:"Peanut Chutney (2 tbsp)",             cal:85,  pro:3,  fib:2,  cat:"Snacks" },
  { name:"Coconut Chutney (2 tbsp)",            cal:60,  pro:1,  fib:1,  cat:"Snacks" },
  { name:"Samosa (1)",                          cal:240, pro:4,  fib:2,  cat:"Snacks" },
  { name:"Kachori (1)",                         cal:240, pro:5,  fib:2,  cat:"Snacks" },
  { name:"Pakora (100g)",                       cal:300, pro:6,  fib:3,  cat:"Snacks" },
  { name:"Mirchi Bajji (1)",                    cal:150, pro:3,  fib:2,  cat:"Snacks" },
  { name:"Papad (1)",                           cal:40,  pro:2,  fib:1,  cat:"Snacks" },
  { name:"Potato Chips (30g)",                  cal:160, pro:2,  fib:1,  cat:"Snacks" },
  { name:"Mixture (30g)",                       cal:165, pro:4,  fib:2,  cat:"Snacks" },
  { name:"Murukku (30g)",                       cal:150, pro:2,  fib:1,  cat:"Snacks" },
  { name:"Biscuits (2)",                        cal:100, pro:2,  fib:1,  cat:"Snacks" },
  { name:"Popcorn, plain (3 cups)",             cal:100, pro:3,  fib:3,  cat:"Snacks" },
  { name:"Makhana / Fox Nuts (1 cup)",          cal:100, pro:4,  fib:1,  cat:"Snacks" },
  { name:"Sprouts (1 cup)",                     cal:62,  pro:9,  fib:4,  cat:"Snacks" },
  { name:"Dhokla (2 pieces)",                   cal:100, pro:4,  fib:1,  cat:"Snacks" },
  { name:"Almonds (28g)",                       cal:164, pro:6,  fib:4,  cat:"Snacks" },
  { name:"Cashews (28g)",                       cal:157, pro:5,  fib:1,  cat:"Snacks" },
  { name:"Walnuts (28g)",                       cal:185, pro:4,  fib:2,  cat:"Snacks" },
  { name:"Mixed Nuts (28g)",                    cal:173, pro:5,  fib:2,  cat:"Snacks" },
  { name:"Chia Seeds (1 tbsp)",                 cal:58,  pro:2,  fib:5,  cat:"Snacks" },
  { name:"Pumpkin Seeds (28g)",                 cal:151, pro:7,  fib:2,  cat:"Snacks" },
  { name:"Protein Bar (1)",                     cal:210, pro:20, fib:3,  cat:"Snacks" },
  { name:"Dark Chocolate (20g)",                cal:112, pro:1,  fib:1,  cat:"Snacks" },

  // ── FRUITS ──
  { name:"Apple (1 medium)",                    cal:95,  pro:1,  fib:4,  cat:"Fruits" },
  { name:"Banana (1 medium)",                   cal:105, pro:1,  fib:3,  cat:"Fruits" },
  { name:"Orange (1 medium)",                   cal:60,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Mosambi (1 medium)",                  cal:55,  pro:1,  fib:2,  cat:"Fruits" },
  { name:"Pomegranate (1 cup)",                 cal:145, pro:3,  fib:7,  cat:"Fruits" },
  { name:"Full Pomegranate (1 medium)",         cal:150, pro:3,  fib:7,  cat:"Fruits" },
  { name:"Papaya (1 cup)",                      cal:55,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Watermelon (1 cup)",                  cal:45,  pro:1,  fib:1,  cat:"Fruits" },
  { name:"Mango (1 cup)",                       cal:103, pro:1,  fib:3,  cat:"Fruits" },
  { name:"Guava (1 medium)",                    cal:65,  pro:2,  fib:5,  cat:"Fruits" },
  { name:"Grapes (1 cup)",                      cal:100, pro:1,  fib:1,  cat:"Fruits" },
  { name:"Pineapple (1 cup)",                   cal:80,  pro:1,  fib:2,  cat:"Fruits" },
  { name:"Chikoo (1 medium)",                   cal:140, pro:1,  fib:5,  cat:"Fruits" },
  { name:"Pear (1 medium)",                     cal:100, pro:1,  fib:5,  cat:"Fruits" },
  { name:"Custard Apple (1 cup)",               cal:200, pro:4,  fib:5,  cat:"Fruits" },
  { name:"Jackfruit (1 cup)",                   cal:155, pro:3,  fib:3,  cat:"Fruits" },
  { name:"Kiwi (1 medium)",                     cal:61,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Strawberry (1 cup)",                  cal:49,  pro:1,  fib:3,  cat:"Fruits" },
  { name:"Dates (3 pieces)",                    cal:80,  pro:1,  fib:2,  cat:"Fruits" },
  { name:"Fruit Bowl (1 medium bowl)",          cal:200, pro:3,  fib:7,  cat:"Fruits" },

  // ── EGGS ──
  { name:"Egg (1 whole)",                       cal:78,  pro:6,  fib:0,  cat:"Eggs" },
  { name:"Boiled Eggs (2)",                     cal:155, pro:12, fib:0,  cat:"Eggs" },
  { name:"Omelette (2 eggs)",                   cal:190, pro:13, fib:0,  cat:"Eggs" },
  { name:"Egg Bhurji (2 eggs)",                 cal:200, pro:14, fib:1,  cat:"Eggs" },
  { name:"Egg Whites (2)",                      cal:34,  pro:7,  fib:0,  cat:"Eggs" },
  { name:"Scrambled Eggs (2)",                  cal:180, pro:12, fib:0,  cat:"Eggs" },

  // ── SWEETS & DESSERTS ──
  { name:"Gulab Jamun (1)",                     cal:135, pro:2,  fib:0,  cat:"Sweets" },
  { name:"Rasgulla (1)",                        cal:115, pro:2,  fib:0,  cat:"Sweets" },
  { name:"Rasmalai (1 piece)",                  cal:175, pro:5,  fib:0,  cat:"Sweets" },
  { name:"Jalebi (1 medium)",                   cal:125, pro:1,  fib:0,  cat:"Sweets" },
  { name:"Kheer (½ cup)",                       cal:185, pro:4,  fib:1,  cat:"Sweets" },
  { name:"Payasam (½ cup)",                     cal:185, pro:3,  fib:1,  cat:"Sweets" },
  { name:"Carrot Halwa (½ cup)",                cal:215, pro:3,  fib:2,  cat:"Sweets" },
  { name:"Badam Halwa (½ cup)",                 cal:300, pro:5,  fib:2,  cat:"Sweets" },
  { name:"Mysore Pak (1 piece)",                cal:175, pro:2,  fib:1,  cat:"Sweets" },
  { name:"Kaju Katli (1 piece)",                cal:60,  pro:1,  fib:1,  cat:"Sweets" },
  { name:"Laddu (1)",                           cal:175, pro:3,  fib:1,  cat:"Sweets" },
  { name:"Motichoor Laddu (1)",                 cal:200, pro:3,  fib:1,  cat:"Sweets" },
  { name:"Besan Laddu (1)",                     cal:195, pro:4,  fib:2,  cat:"Sweets" },
  { name:"Coconut Laddu (1)",                   cal:145, pro:2,  fib:2,  cat:"Sweets" },
  { name:"Boondi Laddu (1)",                    cal:200, pro:3,  fib:1,  cat:"Sweets" },
  { name:"Rava Laddu (1)",                      cal:175, pro:2,  fib:1,  cat:"Sweets" },
  { name:"Dry Fruit Laddu (1)",                 cal:215, pro:4,  fib:3,  cat:"Sweets" },
  { name:"Modak (1)",                           cal:185, pro:3,  fib:2,  cat:"Sweets" },
  { name:"Kozhukattai (1)",                     cal:125, pro:2,  fib:1,  cat:"Sweets" },
  { name:"Peda (1)",                            cal:110, pro:3,  fib:0,  cat:"Sweets" },
  { name:"Barfi (1 piece)",                     cal:125, pro:2,  fib:0,  cat:"Sweets" },
  { name:"Soan Papdi (1 piece)",                cal:125, pro:2,  fib:1,  cat:"Sweets" },
  { name:"Payasam (1 cup)",                     cal:250, pro:4,  fib:1,  cat:"Sweets" },
  { name:"Semiya Payasam (1 cup)",              cal:260, pro:5,  fib:1,  cat:"Sweets" },
  { name:"Rice Kheer (1 cup)",                  cal:260, pro:5,  fib:1,  cat:"Sweets" },
  { name:"Shrikhand (½ cup)",                   cal:250, pro:7,  fib:0,  cat:"Sweets" },
  { name:"Kulfi (1 stick)",                     cal:215, pro:5,  fib:0,  cat:"Sweets" },
  { name:"Ice Cream (1 scoop)",                 cal:165, pro:3,  fib:0,  cat:"Sweets" },
  { name:"Falooda (1 glass)",                   cal:375, pro:7,  fib:2,  cat:"Sweets" },
  { name:"Brownie (1 medium)",                  cal:300, pro:4,  fib:2,  cat:"Sweets" },

  // ── BEVERAGES ──
  { name:"Masala Chai (1 cup)",                 cal:100, pro:2,  fib:0,  cat:"Beverages" },
  { name:"Tea with Milk & Sugar (1 cup)",       cal:85,  pro:3,  fib:0,  cat:"Beverages" },
  { name:"Tea without Sugar (1 cup)",           cal:40,  pro:2,  fib:0,  cat:"Beverages" },
  { name:"Ginger Tea (1 cup)",                  cal:85,  pro:2,  fib:0,  cat:"Beverages" },
  { name:"Elaichi Tea (1 cup)",                 cal:85,  pro:2,  fib:0,  cat:"Beverages" },
  { name:"Filter Coffee (1 cup)",               cal:95,  pro:3,  fib:0,  cat:"Beverages" },
  { name:"Black Coffee (1 cup)",                cal:4,   pro:0,  fib:0,  cat:"Beverages" },
  { name:"Cold Coffee (1 glass)",               cal:240, pro:6,  fib:0,  cat:"Beverages" },
  { name:"Buttermilk / Chaas (1 glass)",        cal:48,  pro:3,  fib:0,  cat:"Beverages" },
  { name:"Sweet Lassi (1 glass)",               cal:215, pro:6,  fib:0,  cat:"Beverages" },
  { name:"Salt Lassi (1 glass)",                cal:100, pro:5,  fib:0,  cat:"Beverages" },
  { name:"Mango Lassi (1 glass)",               cal:250, pro:7,  fib:1,  cat:"Beverages" },
  { name:"Tender Coconut Water (1 glass)",      cal:50,  pro:1,  fib:1,  cat:"Beverages" },
  { name:"Fresh Lime Water (1 glass)",          cal:15,  pro:0,  fib:0,  cat:"Beverages" },
  { name:"Fresh Lime Soda with Sugar (1 glass)",cal:100, pro:0,  fib:0,  cat:"Beverages" },
  { name:"Orange Juice (1 glass)",              cal:110, pro:2,  fib:0,  cat:"Beverages" },
  { name:"Sugarcane Juice (1 glass)",           cal:175, pro:0,  fib:0,  cat:"Beverages" },
  { name:"Milkshake (1 glass)",                 cal:325, pro:10, fib:1,  cat:"Beverages" },
  { name:"Mango Shake (1 glass)",               cal:300, pro:7,  fib:2,  cat:"Beverages" },
  { name:"Banana Shake (1 glass)",              cal:300, pro:8,  fib:3,  cat:"Beverages" },
  { name:"Strawberry Shake (1 glass)",          cal:270, pro:7,  fib:2,  cat:"Beverages" },
  { name:"Chocolate Shake (1 glass)",           cal:375, pro:8,  fib:2,  cat:"Beverages" },
  { name:"Pomegranate Juice (1 glass)",         cal:140, pro:1,  fib:0,  cat:"Beverages" },
  { name:"Watermelon Juice (1 glass)",          cal:85,  pro:1,  fib:1,  cat:"Beverages" },
  { name:"Sweet Lime Juice (1 glass)",          cal:120, pro:1,  fib:0,  cat:"Beverages" },
  { name:"Aam Panna (1 glass)",                 cal:100, pro:0,  fib:1,  cat:"Beverages" },
  { name:"Rooh Afza Milk (1 glass)",            cal:215, pro:7,  fib:0,  cat:"Beverages" },
  { name:"Jaljeera (1 glass)",                  cal:35,  pro:0,  fib:1,  cat:"Beverages" },
  { name:"Tea + 2 Biscuits",                    cal:175, pro:3,  fib:1,  cat:"Beverages" },

  // ── SALADS & SOUPS ──
  { name:"Cucumber Salad (1 cup)",              cal:15,  pro:1,  fib:1,  cat:"Salads & Soups" },
  { name:"Tomato Salad (1 cup)",                cal:30,  pro:1,  fib:2,  cat:"Salads & Soups" },
  { name:"Carrot Salad (1 cup)",                cal:50,  pro:1,  fib:4,  cat:"Salads & Soups" },
  { name:"Beetroot Salad (1 cup)",              cal:60,  pro:2,  fib:4,  cat:"Salads & Soups" },
  { name:"Sprouts Salad (1 cup)",               cal:125, pro:8,  fib:5,  cat:"Salads & Soups" },
  { name:"Chickpea Salad (1 cup)",              cal:275, pro:12, fib:10, cat:"Salads & Soups" },
  { name:"Corn Salad (1 cup)",                  cal:160, pro:5,  fib:4,  cat:"Salads & Soups" },
  { name:"Clear Vegetable Soup (1 bowl)",       cal:80,  pro:3,  fib:3,  cat:"Salads & Soups" },
  { name:"Tomato Soup (1 bowl)",                cal:115, pro:3,  fib:2,  cat:"Salads & Soups" },
  { name:"Sweet Corn Soup (1 bowl)",            cal:150, pro:4,  fib:3,  cat:"Salads & Soups" },
  { name:"Chicken Clear Soup (1 bowl)",         cal:125, pro:12, fib:1,  cat:"Salads & Soups" },

  // ── STREET FOOD & CHAAT ──
  { name:"Pani Puri (6)",                       cal:215, pro:4,  fib:3,  cat:"Street Food" },
  { name:"Pani Puri (10)",                      cal:350, pro:6,  fib:5,  cat:"Street Food" },
  { name:"Bhel Puri (1 plate)",                 cal:300, pro:6,  fib:5,  cat:"Street Food" },
  { name:"Sev Puri (6)",                        cal:350, pro:6,  fib:4,  cat:"Street Food" },
  { name:"Dahi Puri (6)",                       cal:400, pro:8,  fib:4,  cat:"Street Food" },
  { name:"Papdi Chaat (1 plate)",               cal:350, pro:7,  fib:4,  cat:"Street Food" },
  { name:"Aloo Tikki (2)",                      cal:300, pro:5,  fib:4,  cat:"Street Food" },
  { name:"Aloo Tikki Chaat (1 plate)",          cal:400, pro:8,  fib:6,  cat:"Street Food" },
  { name:"Samosa Chaat (1 plate)",              cal:450, pro:10, fib:6,  cat:"Street Food" },
  { name:"Pav Bhaji (1 plate)",                 cal:475, pro:10, fib:6,  cat:"Street Food" },
  { name:"Vada Pav (1)",                        cal:315, pro:6,  fib:4,  cat:"Street Food" },
  { name:"Dabeli (1)",                          cal:300, pro:6,  fib:4,  cat:"Street Food" },
  { name:"Ragda Pattice (1 plate)",             cal:400, pro:10, fib:8,  cat:"Street Food" },
  { name:"Corn Chaat (1 cup)",                  cal:185, pro:5,  fib:4,  cat:"Street Food" },
  { name:"Peanut Chaat (1 cup)",                cal:275, pro:10, fib:5,  cat:"Street Food" },
  { name:"Sprouts Chaat (1 cup)",               cal:175, pro:9,  fib:6,  cat:"Street Food" },
  { name:"Chana Chaat (1 cup)",                 cal:250, pro:11, fib:9,  cat:"Street Food" },

  // ── FAST FOOD ──
  { name:"Veg Burger (1)",                      cal:400, pro:10, fib:4,  cat:"Fast Food" },
  { name:"Paneer Burger (1)",                   cal:525, pro:18, fib:4,  cat:"Fast Food" },
  { name:"French Fries (100g)",                 cal:315, pro:4,  fib:3,  cat:"Fast Food" },
  { name:"Veg Pizza (2 slices)",                cal:450, pro:16, fib:4,  cat:"Fast Food" },
  { name:"Chicken Pizza (2 slices)",            cal:500, pro:22, fib:3,  cat:"Fast Food" },
  { name:"Cheese Pizza (2 slices)",             cal:550, pro:20, fib:2,  cat:"Fast Food" },
  { name:"Margherita Pizza (2 slices)",         cal:450, pro:18, fib:2,  cat:"Fast Food" },
  { name:"White Sauce Pasta (1 cup)",           cal:400, pro:10, fib:2,  cat:"Fast Food" },
  { name:"Red Sauce Pasta (1 cup)",             cal:330, pro:10, fib:4,  cat:"Fast Food" },
  { name:"Chicken Pasta (1 cup)",               cal:450, pro:25, fib:3,  cat:"Fast Food" },
  { name:"Veg Noodles (1 cup)",                 cal:350, pro:7,  fib:3,  cat:"Fast Food" },
  { name:"Chicken Noodles (1 cup)",             cal:400, pro:20, fib:3,  cat:"Fast Food" },
  { name:"Schezwan Noodles (1 cup)",            cal:400, pro:8,  fib:3,  cat:"Fast Food" },
  { name:"Veg Momos (6)",                       cal:215, pro:7,  fib:3,  cat:"Fast Food" },
  { name:"Chicken Momos (6)",                   cal:260, pro:14, fib:2,  cat:"Fast Food" },
  { name:"Fried Momos (6)",                     cal:350, pro:12, fib:2,  cat:"Fast Food" },
  { name:"Veg Manchurian (6 pieces)",           cal:350, pro:7,  fib:3,  cat:"Fast Food" },
  { name:"Chicken Manchurian (6 pieces)",       cal:400, pro:22, fib:2,  cat:"Fast Food" },
  { name:"Spring Roll (2)",                     cal:300, pro:6,  fib:2,  cat:"Fast Food" },
  { name:"Shawarma (1)",                        cal:475, pro:25, fib:3,  cat:"Fast Food" },
  { name:"Paneer Wrap (1)",                     cal:475, pro:18, fib:5,  cat:"Fast Food" },
  { name:"Veg Wrap (1)",                        cal:375, pro:10, fib:5,  cat:"Fast Food" },
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

// ── STATE ──────────────────────────────────────────────
let currentWeekStart = getMonday(new Date());
let addingTo = null;
let selectedNutrDay = null;

//── ACTIVITY TARGET HELPER ─────────────────────────────
function getDayCalTarget(targets, day) {
  const p = getProfile();
  if (!p.enableActivity) return targets.calories;
  const acts = load('wmp_act_' + weekKey(currentWeekStart), {});
  const act   = acts[day] || { type: 'normal', steps: 0 };
  if (act.type === 'workout') return targets.calories + (p.workoutExtra || 300);
  if (act.type === 'steps')   return targets.calories + Math.round((act.steps || 0) * 0.04);
  return targets.calories;
}


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
     const mealTarget=Math.round(getDayCalTarget(targets,day)*split[meal]);
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
  addingTo={day:e.target.dataset.day, meal:e.target.dataset.meal};
  document.getElementById('modalTitle').textContent=`${EMOJI[addingTo.meal]} ${addingTo.meal}`;
  document.getElementById('foodSearch').value='';
  document.getElementById('modalAddedMsg').classList.add('hidden');
  renderModalDayTabs();
  renderFoodList('');
  document.getElementById('modalOverlay').classList.remove('hidden');
  setTimeout(()=>document.getElementById('foodSearch').focus(),100);
}

function renderModalDayTabs() {
  document.getElementById('modalDayTabs').innerHTML=
    DAYS.map(d=>`<button id="daytab_${d}" onclick="selectModalDay('${d}')" class="modal-day-tab ${d===addingTo.day?'active':''}">${d.slice(0,3)}</button>`).join('');
}

function selectModalDay(day) {
  addingTo.day = day;
  DAYS.forEach(d => {
    const t = document.getElementById('daytab_' + d);
    if(t) t.className = 'modal-day-tab' + (d===day?' active':'');
  });
  document.getElementById('modalAddedMsg').classList.add('hidden');
}

document.getElementById('closeModal').addEventListener('click',()=>{
  document.getElementById('modalOverlay').classList.add('hidden');
  renderPlanner();
});
document.getElementById('modalOverlay').addEventListener('click',e=>{
  if(e.target.id==='modalOverlay'){
    document.getElementById('modalOverlay').classList.add('hidden');
    renderPlanner();
  }
});
document.getElementById('foodSearch').addEventListener('input',e=>renderFoodList(e.target.value));

function renderFoodList(query) {
  const filtered=query.trim()?FOODS.filter(f=>f.name.toLowerCase().includes(query.toLowerCase())):FOODS;
  document.getElementById('foodList').innerHTML=filtered.map(f=>`
    <div class="food-item">
      <div class="food-item-info">
        <div class="food-item-name">${f.name}</div>
        <div class="food-item-macros" data-name="${f.name}">
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
      saveWeekPlan(plan);
      // Show confirmation, keep modal open
      const msg=document.getElementById('modalAddedMsg');
      msg.textContent=`✓ Added to ${addingTo.day}`;
      msg.classList.remove('hidden');
      setTimeout(()=>msg.classList.add('hidden'),1500);
      // Reset serving to 1
      inp.value='1';
      const macros=inp.closest('.food-add-group').previousElementSibling.querySelector('.food-item-macros');
      if(macros) macros.innerHTML=`${food.cal} cal · ${food.pro}g protein · ${food.fib}g fiber · <em>${food.cat}</em>`;
    });
  });
}

// ── NUTRITION — FULL WEEK VIEW ─────────────────────────
function renderNutrition() {
  const plan    = getWeekPlan();
  const profile = getProfile();
  const targets = calcTargets(profile);
  const split   = MEAL_SPLIT[profile.goal]||MEAL_SPLIT.maintain;
  const end     = new Date(currentWeekStart); end.setDate(end.getDate()+6);
  const goalLabel = profile.goal==='loss'?'Weight Loss':profile.goal==='gain'?'Weight Gain':'Maintenance';

  // Week totals
  let wk={cal:0,pro:0,fib:0};
  const dayData=DAYS.map(day=>{ const t=dayTotals(plan[day]); wk.cal+=t.cal; wk.pro+=t.pro; wk.fib+=t.fib; return {day,t}; });

  const wkCalTarget = targets.calories*7;
  const wkProTarget = targets.protein*7;
  const wkFibTarget = targets.fiber*7;

  function statusOf(cur,target){
    if(cur===0) return 'empty';
    if(cur>target*1.1) return 'over';
    if(cur<target*0.75) return 'low';
    return 'ok';
  }
  function statusIcon(s){ return s==='ok'?'🟢':s==='over'?'🔴':s==='low'?'🟡':'⬜'; }
  function statusColor(s){ return s==='ok'?'var(--green-dark)':s==='over'?'var(--red)':s==='low'?'#92400e':'var(--muted)'; }

  // Week summary bar
  function miniBar(cur, target){
    const pct = Math.min((cur/target)*100,100);
    const s = statusOf(cur,target);
    const cls = s==='ok'?'ok':s==='over'?'high':'low';
    return `<div class="progress-bar-bg" style="height:8px;margin-top:4px">
      <div class="progress-bar ${cls}" style="width:${pct}%"></div>
    </div>`;
  }

  // Day detail HTML
  function dayDetail(day){
    const dm=plan[day]; const tot=dayTotals(dm);
    function bar(label,current,target,unit=''){
      const pct=Math.min((current/target)*100,100);
      const s=statusOf(current,target);
      const cls=s==='ok'?'ok':s==='over'?'high':'low';
      const msg=s==='over'?`⚠️ ${current-target}${unit} over`
               :s==='low'?`↓ ${target-current}${unit} below target`
               :s==='empty'?'Nothing added yet'
               :'✓ On track';
      return `<div class="progress-item">
        <div class="progress-header"><span class="progress-label">${label}</span><span class="progress-value">${current}${unit} / ${target}${unit}</span></div>
        <div class="progress-bar-bg"><div class="progress-bar ${cls}" style="width:${pct}%"></div></div>
        <span class="status-badge ${cls}">${msg}</span>
      </div>`;
    }
    const breakdown=MEALS.map(meal=>{
      const items=dm[meal]||[]; const t=mealTotals(items);
      const mealCal=Math.round(targets.calories*split[meal]);
      const s=statusOf(t.cal,mealCal);
      const flag=t.cal===0?'':statusIcon(s);
      return `<div class="summary-row">
        <span class="label">${EMOJI[meal]} ${meal}</span>
        <span>${t.cal===0
          ?`<span style="color:var(--muted)">Nothing added</span>`
          :`${flag} ${t.cal} cal · ${t.pro}g prot · ${t.fib}g fiber`}
        <span style="font-size:11px;color:var(--muted)"> / ${mealCal} cal target</span></span>
      </div>`;
    }).join('');

    const tips=[];
    if(tot.cal===0){
      tips.push(`📋 No meals planned for ${day} yet.`);
    } else {
      if(tot.pro<targets.protein*0.8) tips.push(`🥩 Protein low (${tot.pro}g / ${targets.protein}g) — add eggs, chicken, paneer or dal`);
      if(tot.fib<targets.fiber*0.8)   tips.push(`🥦 Fiber low (${tot.fib}g / ${targets.fiber}g) — add fruits, vegetables or dal`);
      if(tot.cal>targets.calories*1.1) tips.push(`🔥 Over by ${tot.cal-targets.calories} cal — reduce portions`);
      if(tot.cal<targets.calories*0.8) tips.push(`📉 Under by ${targets.calories-tot.cal} cal — add a snack or side`);
    }

    return `<div class="nutrition-card" style="margin-top:16px">
      <h3>📊 ${day} — <span style="font-size:13px;color:var(--muted);font-weight:500">${goalLabel} · ${targets.calories} cal target</span></h3>
      ${bar('Calories',tot.cal,targets.calories)}
      ${bar('Protein',tot.pro,targets.protein,'g')}
      ${bar('Fiber',tot.fib,targets.fiber,'g')}
    </div>
    ${tips.length?`<div class="suggestions-card">
      <h3>💡 Suggestions</h3>
      ${tips.map(s=>`<div class="suggestion-item">${s}</div>`).join('')}
    </div>`:`<div class="suggestions-card ok"><h3>✅ All on track!</h3><div class="suggestion-item">Great job! Nutrients look good for this day.</div></div>`}
    <div class="meals-summary"><h3>Meal Breakdown</h3>${breakdown}</div>`;
  }

  // Build 7-day cards
  const dayCards = dayData.map(({day,t})=>{
    const s=statusOf(t.cal, targets.calories);
    const isSelected = day===selectedNutrDay;
    return `<div class="day-nutr-card ${s} ${isSelected?'active':''}" data-day="${day}">
      <div class="day-nutr-name">${day.slice(0,3)}</div>
      <div class="day-nutr-cal" style="color:${statusColor(s)}">${t.cal===0?'—':t.cal}</div>
      <div class="day-nutr-macros">${t.cal===0?'no meals':`${t.pro}g pro · ${t.fib}g fib`}</div>
      <div class="day-nutr-status">${statusIcon(s)}</div>
      ${miniBar(t.cal, targets.calories)}
    </div>`;
  }).join('');

  const calStatus=statusOf(wk.cal,wkCalTarget);
  const proStatus=statusOf(wk.pro,wkProTarget);
  const fibStatus=statusOf(wk.fib,wkFibTarget);

  document.getElementById('nutritionContent').innerHTML=`
    <div class="week-summary-card">
      <h3>📅 Week of ${fmt(currentWeekStart)} – ${fmt(end)}
        <span style="font-size:13px;color:var(--muted);font-weight:500;margin-left:8px">${goalLabel}</span>
      </h3>
      <div class="week-macro-row">
        <div class="week-macro-item">
          <span class="week-macro-label">Week Calories</span>
          <span class="week-macro-val" style="color:${statusColor(calStatus)}">${wk.cal} <span style="font-size:13px;color:var(--muted);font-weight:400">/ ${wkCalTarget} target</span></span>
          ${miniBar(wk.cal, wkCalTarget)}
        </div>
        <div class="week-macro-item">
          <span class="week-macro-label">Week Protein</span>
          <span class="week-macro-val" style="color:${statusColor(proStatus)}">${wk.pro}g <span style="font-size:13px;color:var(--muted);font-weight:400">/ ${wkProTarget}g target</span></span>
          ${miniBar(wk.pro, wkProTarget)}
        </div>
        <div class="week-macro-item">
          <span class="week-macro-label">Week Fiber</span>
          <span class="week-macro-val" style="color:${statusColor(fibStatus)}">${wk.fib}g <span style="font-size:13px;color:var(--muted);font-weight:400">/ ${wkFibTarget}g target</span></span>
          ${miniBar(wk.fib, wkFibTarget)}
        </div>
      </div>
    </div>

    <p style="font-size:12px;color:var(--muted);margin-bottom:10px">Click any day to see details ↓</p>
    <div class="week-nutrition-grid">${dayCards}</div>

    <div id="dayNutrDetail">${selectedNutrDay ? dayDetail(selectedNutrDay) : ''}</div>`;

  document.querySelectorAll('.day-nutr-card').forEach(card=>{
    card.addEventListener('click',()=>{
      const d=card.dataset.day;
      selectedNutrDay = selectedNutrDay===d ? null : d;
      renderNutrition();
    });
  });
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
