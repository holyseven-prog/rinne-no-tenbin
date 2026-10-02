# 《輪迴之天秤》素材對照表（給美術／視覺改造 AI）

> 基準：公開版 v0.2（src 2026-10-02）。**專案沒有任何素材檔**：所有圖與音由程式碼生成。「檔名」＝ 程式檔＋函式＋鍵名。程度分級：L1＝每部位 1 色純色塊（現況）→ L3＝FF5 級（目標）。


## ★總則

| 對象 | 識別鍵 | 定位 | 現況畫法與規格 | 程度 | 改造指引 |
|---|---|---|---|---|---|
| 有沒有素材檔？ | 無 | — | 專案內沒有任何 png/ogg/字型檔。圖與音全部由程式在啟動時用 Canvas 2D `fillRect` 與 WebAudio 即時生成，成品存在記憶體快取（`spriteCache`、`worldCache`、`SONG_CACHE`）。所以沒有「檔名／編號」，對應關係＝「程式檔＋函式＋鍵名」。 | — | 要換圖：①直接改對應函式（見下表）；②或依 V3.3 做 Sprite DSL（字元矩陣）取代 `fillRect` 拼圖；③若要改用真正的圖檔，需先在 V3 規則 1（無外部素材）加例外，並讓程式「無圖檔時退回程式生成」。 |
| 程度分級（本表用） | L0–L4 | — | L0 黑白/2 階（GB）／**L1 每部位 1 色純色塊、無輪廓、無漸層（現況）**／L2 3 階色＋外框／L3 4 階色＋選擇性外框＋抖色＋多幀動畫（FF5 目標）／L4 HD-2D 光影 | L1 → 目標 L3 | 請以「從 L1 升到 L3」為基準估工；尺寸與座標不變。 |
| 解析度與座標 | TS=16；MW=64、MH=40 | `01_util.js` 第 3 行；`15_main.js` Scale.fit；`head.html` #stage/#game | 地圖 64×40 格，每格 16×16px＝1024×640px；遊戲畫布 `#game` 640×360（邏輯）以 CSS 放大 2 倍顯示為 1280×720；名字標籤畫在另一層 `#labels`（1280×720，不縮放）；UI 視窗是 HTML/CSS（`#ui`），不在畫布內。鏡頭視野 640×360px＝40×22.5 格。 | — | 任何新圖必須維持 16×16 格、人物 16×24。 |
| 季節 | seasonOf(tick) → 0春 1夏 2秋 3冬 | `01_util.js` seasonOf；`11_sprites.js` SEASON_COL、getWorldCanvas(sea) | 1 年＝12 日，每 3 日換季。地形整張預繪 4 份（每季 1 張 1024×640），只換草/葉/作物顏色，**無專屬冬雪貼圖**（僅建築屋頂加一條白色雪線）。 | L1 | 季節要改成專屬貼圖（V3.3）；入口 `getWorldCanvas(sea)`。 |

## 地形

| 對象 | 識別鍵 | 定位 | 現況畫法與規格 | 程度 | 改造指引 |
|---|---|---|---|---|---|
| 草地 | T.GRASS = 0 | `03_world.js` 第 2 行；`11_sprites.js` paintTile → grass() | 底色 SEASON_COL.grass[sea]（春 #58a840／夏 #3f9a38／秋 #a69b3c／冬 #d6e2e6）＋ 2 個小色塊（grassD）；依座標雜湊變化 8 種位置。 | L1 | 無邊緣過渡；需 autotile 與 ≥3 變體。 |
| 花地 | T.FLOWER = 6 | paintTile → T.FLOWER | 草地＋ 2 朵 2×2 色點（黃 #f0e050／粉 #f08aa0／白／淡藍 #a0b8ff 輪替）。出現機率 7%（`buildWorld` 底層）。 | L1 | 可改成花叢貼圖。 |
| 道路 | T.PATH = 1 | paintTile → T.PATH / T.DOOR；`buildWorld` road() | 底色 #c8aa78＋ 3 個深/淺小點。幹道：橫 y=23（x0–60）、縱 x=28（y6–35）等 7 條。 | L1 | 需車轍/碎石變體、與草地的邊緣過渡。 |
| 廣場石板 | T.PLAZA = 11 | paintTile → T.PLAZA | 底色 #a8a8b0＋ 縱橫縫線（#8a8a96）。範圍 x25–31、y17–22（鎮中央）。 | L1 | 磚紋/磨損/縫線需細化。 |
| 水（湖） | T.WATER = 2 | paintTile → T.WATER；`Render.draw` 水面閃光 | 底色 #2f6ec8＋ 2 條波紋線；執行時另在 4 格取 1 的位置疊白色閃光像素（`Render.draw` 「animated water sparkle」）。湖：橢圓中心 (49,30)，x45–53、y25–35。 | L1（略動） | 需 4 幀流動、岸邊泡沫、倒影。 |
| 沙岸 | T.SAND = 13 | paintTile → T.SAND | 底色 #e0cc90＋ 小點；自動鋪在湖周圍 1 格。 | L1 | 與水/草的過渡。 |
| 樹 | T.TREE = 3（阻擋通行） | paintTile → T.TREE | 草地＋ 樹幹（#5a3a22 3×6）＋ 3 個矩形疊成樹冠（葉色 SEASON_COL.leaf/leafD 依季節）＋ 底部黑色半透明陰影。只有 1 種樹形。分布：北/南邊界 75%、野外 11%、農場邊 55%。 | L1 | 需 3 種樹形（圓/尖/枯）、3 階樹冠、樹皮；冬季積雪。 |
| 岩石 | T.ROCK = 4（阻擋） | paintTile → T.ROCK | 草地＋灰色矩形（#7a7a86/#9a9aa6/#5a5a66）。高原區（x≥56）12% 機率散布；地圖外視為 ROCK。 | L1 | 岩面紋理、陰影。 |
| 籬笆 | T.FENCE = 5（阻擋） | paintTile → T.FENCE | 草地＋ 棕色橫條＋ 2 根立柱。地圖生成目前**幾乎未使用**。 | L1 | 需轉角/連續變體。 |
| 田地（農作） | T.FIELD = 8 | paintTile → T.FIELD | 底色 #8a6038＋ 4 道深色壟溝＋ 作物小點（SEASON_COL.crop：春 #7ad050／夏 #e0c040／秋 #b87830／冬 #eef4f8）。農場區 5 塊矩形，西側 x2–12。 | L1 | 作物成長階段、收穫動畫。 |
| 魔王領（暗地） | T.DARK = 9 | paintTile → T.DARK；`Render.draw` plateau fog | 底色 #3a3446＋ 深/淺小色塊＋ 偶爾紫色晶點。x≥56 全區；畫面進入該區時疊紫色霧（#9a50d0，覺醒後更濃）。 | L1 | 覺醒前後需不同地表與黑霧邊。 |
| 橋 | T.BRIDGE = 7 | — | 已定義，但 `paintTile` 無對應分支（會畫成草地），地圖亦無放置。 | 未使用 | 若需要橋，須新增繪製與放置。 |
| 建築佔位／門 | T.BLD = 10（阻擋）／T.DOOR = 12 | `buildWorld` mk()；getWorldCanvas（BLD 先畫草地再疊建築） | BLD 只是碰撞佔位，實際外觀由 drawBuilding 疊畫；DOOR 與道路同色。 | — | 改建築外觀不得改佔格（碰撞/尋路依賴）。 |
| 小地圖 | Mini.build() | `11_sprites.js` Mini | 每格 1px，依地形取一色；建築以色塊（城堡紫/公會黃/教會白/其他紅）。畫在左上 `miniCv`。 | L1 | 可保持簡單；視窗框為白色矩形。 |

## 裝飾

| 對象 | 識別鍵 | 定位 | 現況畫法與規格 | 程度 | 改造指引 |
|---|---|---|---|---|---|
| 噴水池 | drawFountain(28,19) | `11_sprites.js` getWorldCanvas | 灰色池緣＋ 藍色水面，1 格大小，位於廣場中央（28,19）。 | L1 | 需水柱動畫。 |
| 水井（2 口） | drawWell(25,21)、(31,21) | 同上 | 木頂＋石井口，各 1 格。 | L1 | — |

## 建築

| 對象 | 識別鍵 | 定位 | 現況畫法與規格 | 程度 | 改造指引 |
|---|---|---|---|---|---|
| 教會 | kind:'church'；(25,9) 6×5；roof 6 | `03_world.js` buildWorld mk；`11_sprites.js` drawBuilding | 牆 #ececf4；招牌＝白色塔＋金色十字。屋頂色 PAL.roof[6]（#5a5a68）。 | L1 | 需尖塔、彩窗。 |
| 民宅 ×12 | kind:'house'；3×3；roof 0–3 輪替 | buildWorld（座標：(18,11)(22,11)(33,11)(37,11)(40,11)(37,28)(41,28)(18,32)(22,32)(32,32)(36,32)(40,32)） | 牆 #e4d2a4＋ 門 #6a4220＋ 窗；屋頂色 4 種（紅/藍/綠/棕）。無招牌。 | L1 | 12 棟外觀相同只換屋頂色，需變體。 |
| 小屋 ×2（農場） | kind:'hut'；(3,20)(11,20)；3×3 | buildWorld | 同民宅外觀。 | L1 | — |
| 風車 | kind:'mill'；(6,19) 3×4；roof 7 | drawBuilding mill 分支 | 牆 #e8e0cc＋ 風車翼（靜態圖，不旋轉）。冬季不加雪線。 | L1 | 需旋轉翼動畫。 |
| 冒險者公會 | kind:'guild'；(18,19) 6×4；roof 2 | drawBuilding | 牆 #b8905a；招牌＝木牌＋劍紋。 | L1 | — |
| 酒館 | kind:'tavern'；(33,19) 5×4；roof 3 | drawBuilding | 牆 #c8a070；招牌＝啤酒杯。 | L1 | — |
| 商店 | kind:'shop'；(39,19) 4×4；roof 1 | drawBuilding | 招牌＝袋/金幣。 | L1 | — |
| 鐵匠鋪 | kind:'smithy'；(17,27) 5×4；roof 4 | drawBuilding | 牆 #9a9aa6；招牌＝砧/鎚。 | L1 | 需煙囪冒煙。 |
| 藥局 | kind:'apothecary'；(23,27) 4×4；roof 5 | drawBuilding | 招牌＝綠十字。 | L1 | — |
| 旅館 | kind:'inn'；(30,27) 6×4；roof 0 | drawBuilding | 招牌＝紅床鋪。 | L1 | — |
| 魔王城 | kind:'castle'；(58,11) 5×6；roof 8 | drawBuilding | 牆 #4a4258、牆高 26px、門 #1a1020、紫屋頂 #40304f。 | L1 | 覺醒演出（光環/閃電）。 |
| 屋頂色盤 | PAL.roof[0..8] | `11_sprites.js` 第 6–11 行 | #b84a3a #3a6ab0 #5a8a3a #8a5a3a #7a4a9a #c09a30 #5a5a68 #a05a30 #40304f | L1 | 需瓦片紋（橫排）與受光/背光兩階。 |

## 人物

| 對象 | 識別鍵 | 定位 | 現況畫法與規格 | 程度 | 改造指引 |
|---|---|---|---|---|---|
| 全部居民（共用繪製） | humanSprite(h, dir, frame) | `11_sprites.js` 第 114 行；快取鍵 job.hair.style.skin.cloth.acc.child.elder.dir.frame | 16×24px；dir 0下/1上/2左/3右（3＝2 的水平翻轉）；frame 0站/1左步/2右步（3 幀）。每個部位 1 色（髮/膚/衣/褲#3a3248/靴#4a3020），無外框、無陰影階。 | L1 | **沒有「第 n 號角色」**：外觀＝職業 ×（髮色8 × 髮型4 × 膚色3 × 衣色8 × 配件3）隨機組合，存於 `human.look`（`04_state.js` 第 64 行）。 |
| 髮色（8） | look.hair 0–7 → PAL.hair | `11_sprites.js` PAL.hair | 0 #1c1c24 黑／1 #5a3a22 棕／2 #8a5a2a 淺棕／3 #d8b050 金／4 #b03a2a 紅／5 #9a9aa4 灰／6 #e8e8f0 白／7 #1e2850 藍黑 | L1 | — |
| 髮型（4） | look.style 0–3 | humanSprite「// hair」段 | 0 短髮／1 長髮（兩側垂至肩）／2 三叉翹髮／3 頭頂小髮髻。 | L1 | 需 ≥8 種明顯不同的輪廓（V3.3）。 |
| 膚色（3） | look.skin 0–2 → PAL.skin | PAL.skin | #f4cfa8／#d8a070／#a87048 | L1 | — |
| 衣色（8，僅小孩用） | look.cloth 0–7 → PAL.cloth | PAL.cloth；`04_state.js` JOB_CLOTH 第 136 行 | #b84040 #3c5ac0 #e0e0e8 #2a5a3a #8a6a3a #7a4a9a #c07a2a #2a8a8a。成人的上衣色會被職業色覆蓋（見下）。 | L1 | — |
| 配件（3） | look.acc 0–2 | humanSprite「head」段 | 只有 acc=1 時在臉頰加淡紅暈；0、2 無效果。 | L1 | 可擴為眼鏡/髮飾/鬍子等。 |
| 劍士（戰士） | job:'swordsman'（無編號） | `02_data.js` JOBS.swordsman；`11_sprites.js` jobCol／weapon 段 | 上衣 #b84040（紅）；右手持劍（劍身 #d8d8e4、護手 #8a6a3a、柄 #5a3a22）；無帽。屬性 hp44 atk9 def6，屬「冒險者」。 | L1 | 需護肩/劍的完整輪廓；注意「劍」只給劍士。 |
| 魔法師 | job:'mage' | JOBS.mage | 上衣 #6a4ac0（紫）＋ 長袍下擺＋ 金邊；紫色尖帽（#5a3aa0）；手持法杖（棕桿＋藍色寶珠 #60c0ff）。 | L1 | — |
| 僧侶 | job:'priest' | JOBS.priest | 上衣 #ececf4（白）；白頭巾；金色十字杖。 | L1 | — |
| 盜賊 | job:'thief' | JOBS.thief | 上衣 #2e3a30（暗綠）；兜帽＋面罩（白色眼點）；短刀。移動速度 1.3。 | L1 | — |
| 農夫 | job:'farmer' | JOBS.farmer | 上衣 #a88850；草帽（#d8b860）；農具（棕桿＋銀色頭）。 | L1 | — |
| 商人 | job:'merchant' | JOBS.merchant | 上衣 #c88a30；橘棕帽；背包/木箱＋金色扣。 | L1 | — |
| 鐵匠 | job:'smith' | JOBS.smith（顯示名「鍛冶／鐵匠」） | 上衣 #7a7a86；紅色頭巾條；圍裙（棕）；鎚。 | L1 | — |
| 藥師 | job:'herbalist' | JOBS.herbalist | 上衣 #3a8a4a；綠色圍裙條；手持藥草籃（綠＋粉紅花點）。 | L1 | — |
| 史官 | job:'historian' | JOBS.historian | 上衣 #2a3a6a（藏青）；藏青帽；手持書（米白＋紅書脊）；背後有書卷線。 | L1 | — |
| 小孩 | 條件：age < 14（ADULT_AGE，`04_state.js` 第 3 行） | humanSprite（child 分支，scale 0.78） | **不是獨立圖**：先畫成人再縮成 0.78 倍貼上；衣色用 look.cloth（不用職業色）；沒有劍/杖/面罩等職業裝備（部分帽子仍會出現，如農夫草帽）。 | L1（偷懶） | 需單獨設計：頭大身小、3 頭身以下。 |
| 老人 | 條件：age ≥ 56（`humanSprite` 內 elder；`ELDER_AGE=55` 為另一處常數） | humanSprite（elder → hairC = PAL.hair[5]） | **只把髮色強制改為灰 #9a9aa4**，體型與成人完全相同（無駝背、鬍子、拐杖）。 | L1（偷懶） | 需駝背、白髮/白鬍、拐杖等獨立造型。 |
| 死亡／祈禱／受傷等狀態 | — | — | **沒有專屬圖**。受傷＝血條；祈禱＝頭上「！」與光點（`labels` 層與 `Render` 粒子）；死亡＝直接消失，靈魂進「靈魂之河」列表。 | — | V3.3 需補狀態幀。 |
| 名字標籤 | #labels 畫布（1280×720） | `15_main.js` 繪製標籤；`13b_ui2.js` | 白字黑邊，職業小圖示（文字方塊「農」「劍」等字）；寵愛者金牌；祈禱者「！」。 | L1 | 人群聚集會重疊（V3.2 B-5）。 |

## 怪物

| 對象 | 識別鍵 | 定位 | 現況畫法與規格 | 程度 | 改造指引 |
|---|---|---|---|---|---|
| 噗噗菇 | m.type:'mush'（tier1） | `11_sprites.js` monsterSprite；`02_data.js` MONS.mush | 16×16；紅蘑菇傘＋ 白點＋ 米白柄；frame 0/1。 | L1 | — |
| 影蝠 | 'bat'（tier1） | monsterSprite | 16×16；紫色蝙蝠，翅膀隨 frame 上下，紅眼；飛行時上浮 6px。 | L1 | — |
| 岩殼龜 | 'turtle'（tier2） | monsterSprite | 16×16；綠殼灰頭。 | L1 | — |
| 小鬼斥候 | 'goblin'（tier2） | monsterSprite | 16×16；綠膚黃眼尖耳。 | L1 | — |
| 骷髏劍士 | 'skel'（tier3） | monsterSprite | 16×16；白骨＋黑眼窩。 | L1 | — |
| 魔狼 | 'wolf'（tier3） | monsterSprite | 16×16；灰狼身紅眼。 | L1 | — |
| 三位幹部 | CADRES[0..2]：verna 霧公爵／garum 骨將軍／serene 影女王 | `02_data.js` CADRES；monsterSprite（m.cad 分支） | 28×36；共用同一身型，只換 3 組色（紫/骨白紅/暗紫粉）＋各自小配件（霧裙/骨翼劍/暗影腳）。 | L1 | 需各自獨立剪影。 |
| 魔王 | BOSS（key:'noctal' 黑冠之王 諾克塔爾） | `02_data.js` BOSS；monsterSprite（m.boss 分支） | 40×48；黑袍＋ 金冠＋ 紫色雙眼；覺醒後全畫面加紫黑暈影（`Render.draw` 末段 radial gradient），但魔王本身無光環。 | L1 | 需 ≥32×40 大型精細 sprite、覺醒光環。 |

## 特效

| 對象 | 識別鍵 | 定位 | 現況畫法與規格 | 程度 | 改造指引 |
|---|---|---|---|---|---|
| 神力演出 | Render.beam / parts / rings / nums | `11_sprites.js` Render.consumeFx（約第 229–245 行） | 神力：從天而降的光柱（beam）＋ 30 粒子；整個畫面變暗（dim 0.5）；傷害數字（白/黃暴擊/紅被擊/綠回復）；爆散粒子（poof）。**5 種神力共用同一套光柱**，僅依「結果」換色（失敗＝灰藍／曲解＝紫／其他＝金黃）；另有全畫面閃白（flash）。 | L1 | V3.3：各神力專屬演出。 |
| 晝夜 | Render.nightAlpha(hf) | `11_sprites.js` 第 245 行；draw() 「overlays: day/night」 | 單層暗藍色疊加（夜 0.58、黃昏漸變）。夜間會把建築窗戶提亮（`WIN_RECTS` 於夜晚疊畫暖色窗光，城堡為紫色）；**沒有路燈、火把、人物光源**。 | L1 | V3.3：多段色調＋局部光。 |
| 魔王領霧 | plateau fog | Render.draw | x≥56 區域疊紫色半透明（#9a50d0，覺醒後更濃，緩慢脈動）。 | L1 | — |
| 天氣 | — | — | **無**（沒有雨雪粒子）。 | — | V3.3 新增。 |

## UI

| 對象 | 識別鍵 | 定位 | 現況畫法與規格 | 程度 | 改造指引 |
|---|---|---|---|---|---|
| 視窗框 | CSS .win | `head.html` 第 20–24 行 | HTML/CSS：背景 var(--bg)＝#07070f、3px 白邊（var(--edge)=#f4f4f4）＋ 內陰影雙層線＋ 3px 陰影；標題 h3 色 var(--head)=#ffe9a0。黑底預設；`body.theme-blue`（#0a1a6e 藍底）可切換。 | L1 | V3.3：9-slice 像素框＋漸層。 |
| 按鈕 | .btn / .btn.on / .btn.dis | head.html 第 25–30 行 | 2px 白邊直角；on＝金底 #c8960c；dis＝半透明。 | L1 | — |
| 槽條（信仰/HP/需求） | .gauge / .gauge.hp / .gauge.need | head.html 第 31–34 行 | CSS 線性漸層：金/綠/藍。 | L1（有漸層） | — |
| 祈禱卡/資料卡 | .card（.u1 黃框 .u2 紅框=緊急度） | head.html 第 41–44 行 | 深色卡片＋ 邊框色表緊急度。 | L1 | — |
| 史官書（羊皮紙） | .par；.tag.witness/.hearsay/.infer；.ink.wet/.draft/.final | head.html 第 46–51 行 | 羊皮紙色 #efe0b4→#e0cd96 漸層＋ 棕框；目擊/轉述/推想為綠/橙/紫標籤；墨跡狀態藍/黃/灰。 | L1 | — |
| 標題大字 | .title-logo | head.html 第 60 行 | 84px 系統字型粗體＋ 陰影。**無像素字型**；字型為系統字型（MS Gothic／Meiryo／Noto／微軟正黑）。 | — | V3.3：標題描邊、數字用點陣字。 |
| 選神徽章（3 神） | drawEmblem(cv, id)；id：mercy 慈愛／order 秩序／chaos 混沌 | `14_screens.js` 第 281 行 | 66×66 畫布，以 11×10 字元矩陣（`.`、r、w、y、p）每格 5px 放大；深藍底（#05083a/#10299a）。**這是目前唯一用「字元矩陣」畫的圖**（即 Sprite DSL 的雛形）。 | L1（偏簡） | 可直接擴為更大尺寸與 3 階色。 |
| 開場 5 幕插圖 | drawOpening(c,o,dt)；o.i 0–4 | `14_screens.js` 第 298 行 | 全程式繪製：漸層天空＋ 星點＋ 天秤剪影（動態傾斜）；第 2 幕為實際地圖鏡頭；第 3 幕紫色月亮與暗色漸層；打字機文字。 | L1 | — |
| 標題畫面 | scene 'title' | `14_screens.js`／`15_main.js` demo()（約第 60、93 行） | 背景＝即時渲染地圖（固定 seed 20240601，鏡頭緩慢左右漂移）＋ 標題大字與選單。 | L1 | — |
| 結局畫面 | scene 'ending' | `14_screens.js` | 文字＋ 全史梗概，無專屬插圖。 | — | — |

## 音樂

| 對象 | 識別鍵 | 定位 | 現況畫法與規格 | 程度 | 改造指引 |
|---|---|---|---|---|---|
| BGM（12 首） | SONGS：title／opening／town_day／town_night／battle／divine／boss_awake／decisive／victory／revelation／doom | `12_audio.js` 第 64 行 SONGS；composeSong(sp) 第 12 行 | 完全由程式作曲（調式 maj/min/dor/lyd/harm、BPM、和弦進行 prog、固定 seed）＋ WebAudio 合成樂器（strings/brass/flute/harp/pizz/cello/timp/snare/cym/bell/choir）。 | — | 若要換成真實音檔：需改 `Snd`；保留程式生成作為退路。 |

## 音效

| 對象 | 識別鍵 | 定位 | 現況畫法與規格 | 程度 | 改造指引 |
|---|---|---|---|---|---|
| SE（20 種） | Snd.se(name)：cursor／ok／cancel／pray／power1–5／success／crit／twist／fail／hit／level／reincarnate／awaken／page／victory／defeat | `12_audio.js` 第 163–185 行 | 由 `p(樂器, 音高, 起始, 長度, 音量)` 組成和弦/琶音；與 5 種神力、4 級結果對應（success＝成功、crit＝大成功、twist＝曲解、fail＝失敗）。 | — | — |
