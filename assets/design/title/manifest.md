# 輪迴之天秤／輪廻の天秤 SFC 開頭畫面交付

版本 v2／2026-10-14。

## v2 修改內容

- 必修1：Logo直接在480×112、1px像素格重新繪製；PNG與SVG同步；座標160,64、顯示960×224不變。禁止0.8倍縮放。
- 必修2：大框14,14,14,14；小按鈕與分頁13,14,13,14；推薦標記0,14,0,14、高度固定24；滑桿2,6,2,6不變。UI圖檔未重畫，mockup改用正確切割。
- 補交：src原始生成PNG與修正版重建工具直接包含在同一ZIP，src不列入3MB限制。
- 建議1：新增日中plain版Logo（PNG＋SVG），標題mockup使用plain版，保留含天秤版供單獨使用。
- 建議2／3：本版保留第5頁構圖及慈愛紋章，未變更這兩個非必修項目。

參考使用者提供的藍金色 SFC 提案。場景為原創生成；UI、紋章、Logo為可重建的像素素材。

## 整合規則

- 背景640×360；遊戲1280×720，整數2倍最近鄰顯示。CSS `image-rendering: pixelated`；Canvas `imageSmoothingEnabled=false`。
- 只有Logo有文字；mockup含假文字只供參考。其餘所有文字由程式顯示。
- PNG透明素材為RGBA、alpha只有0/255，外緣至少2px透明。PNG非透明背景≤64色。
- 九宮格順序：上、右、下、左；切割值以素材原寸為單位。四角固定、四邊與中心最近鄰延伸。
- 原圖層0靜態完整場景，圖層1星光獨立透明畫布；不做視差。星光以程式alpha在0.35至1間，2秒週期變化，減少動態設定時保持1。
- 系統字型，不嵌入字型檔。文字建議18–28px（1280座標）；主標36px；色#EEF5FF，選中#FFE7A2，禁用#A7AEB8，黑影(2,2)。所有字級都是遊戲顯示尺寸。
- Logo繁中「迴」U+8FF4，日文「廻」U+5EFB；SVG純path像素輪廓，沒有text或字型依賴。Logo原生480×112，遊戲整數2倍顯示960×224；標題推薦title_logo_ja_plain／title_logo_zh_plain。

## 畫面位置（1280×720座標）

| 區域 | x,y,寬,高 | 備註 |
|---|---|---|
| Logo |160,64,960,224| 日中二選一 |
| 選單外框 |900,368,348,296| 四按鈕 |
| 選單按鈕 |916,380+72n,320,64| n=0..3；文字新遊戲／繼續遊戲／設定／語言 |
| 版權列 |24,682,1232,24| 由程式顯示實際版權 |
| 啟动提示 |320,620,640,40| 與標題共用背景 |
| 存檔視窗 |112,52,1056,616| 四格2×2 |
| 存檔格 |152+492c,160+220r,464,188| c,r=0..1；顯示世、年、季節、神格、時間、日期 |
| 設定視窗 |180,60,920,600| 四分頁；音量、速度滑桿；開關 |
| 模式卡 |208+480n,130,384,500| 普通／簡單；推薦文字由程式顯示 |
| 神格卡 |72+400n,100,336,488| n=0..2；紋章128×128顯示 |
| 神格文字 |108+400n,364,264,184| 初始信仰力數值取實際遊戲資料；不可從mockup推定 |
| 神格返回 |76,630,160,56| 共用小按鈕 |
| 神格確認 |884,624,320,64| 共用選單按鈕 |
| 劇情對話框 |32,556,1216,140| 背景下1/4留暗；5頁逐字與跳過由程式實作 |

## 檔案清單

| 檔名 | 畫面 | 用途 | 大小（px） | 位置 x,y（1280×720 座標） | 圖層順序／動作 | 九宮格切割 | 備註 |
|---|---|---|---|---|---|---|---|
| ui/ui_btn_menu_normal.png | 共用 | 選單按鈕四狀態 | 160×32 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #ffe7a2；中心可伸縮 |
| ui/ui_btn_menu_hover.png | 共用 | 選單按鈕四狀態 | 160×32 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #eef5ff；中心可伸縮 |
| ui/ui_btn_menu_press.png | 共用 | 選單按鈕四狀態 | 160×32 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #ffe7a2；中心可伸縮 |
| ui/ui_btn_menu_disabled.png | 共用 | 選單按鈕四狀態 | 160×32 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #a7aeb8；中心可伸縮 |
| ui/ui_btn_small_normal.png | 共用 | 九宮格框 | 80×28 | — | — | 13,14,13,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #ffe7a2；中心可伸縮 |
| ui/ui_btn_small_hover.png | 共用 | 九宮格框 | 80×28 | — | — | 13,14,13,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #eef5ff；中心可伸縮 |
| ui/ui_btn_small_press.png | 共用 | 九宮格框 | 80×28 | — | — | 13,14,13,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #ffe7a2；中心可伸縮 |
| ui/ui_btn_small_disabled.png | 共用 | 九宮格框 | 80×28 | — | — | 13,14,13,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #a7aeb8；中心可伸縮 |
| ui/ui_frame_window.png | 共用 | 九宮格框 | 96×64 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #ffe7a2；中心可伸縮 |
| ui/ui_frame_dialog.png | 共用 | 九宮格框 | 96×48 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #ffe7a2；中心可伸縮 |
| title/title_frame_menu.png | ② | 選單外框 | 96×96 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #ffe7a2；中心可伸縮 |
| ui/ui_frame_dialog_dark.png | 共用 | 暗色對話框九宮格 | 96×48 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #b0a789；中心可伸縮 |
| ui/ui_btn_back_normal.png | 共用 | 返回按鈕 | 80×28 | — | — | 13,14,13,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #ffe7a2；中心可伸縮 |
| ui/ui_btn_back_hover.png | 共用 | 返回按鈕 | 80×28 | — | — | 13,14,13,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #eef5ff；中心可伸縮 |
| ui/ui_btn_back_press.png | 共用 | 返回按鈕 | 80×28 | — | — | 13,14,13,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #ffe7a2；中心可伸縮 |
| ui/ui_btn_back_disabled.png | 共用 | 返回按鈕 | 80×28 | — | — | 13,14,13,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #a7aeb8；中心可伸縮 |
| save/save_slot_normal.png | ③ | 存檔格 | 160×64 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #ffe7a2；中心可伸縮 |
| save/save_slot_empty.png | ③ | 存檔格 | 160×64 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #b0a789；中心可伸縮 |
| save/save_slot_selected.png | ③ | 存檔格 | 160×64 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #eef5ff；中心可伸縮 |
| save/save_slot_disabled.png | ③ | 存檔格 | 160×64 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #a7aeb8；中心可伸縮 |
| god/god_card_normal.png | ⑥ | 神格卡片 | 96×128 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #ffe7a2；中心可伸縮 |
| god/god_card_selected.png | ⑥ | 神格卡片 | 96×128 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #eef5ff；中心可伸縮 |
| mode/mode_card_normal_normal.png | ⑤ | normal模式卡 | 128×160 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #ffe7a2；中心可伸縮 |
| mode/mode_card_normal_selected.png | ⑤ | normal模式卡 | 128×160 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #eef5ff；中心可伸縮 |
| mode/mode_card_easy_normal.png | ⑤ | easy模式卡 | 128×160 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #ffe7a2；中心可伸縮 |
| mode/mode_card_easy_selected.png | ⑤ | easy模式卡 | 128×160 | — | — | 14,14,14,14 | RGBA；外緣2px透明；內距16,16,16,16；文字色 #eef5ff；中心可伸縮 |
| mode/mode_icon_normal.png | ⑤ | 普通之劍／簡單新芽 | 64×64 | — | — | — | RGBA；文字由程式顯示；置於卡片上方 |
| mode/mode_icon_easy.png | ⑤ | 普通之劍／簡單新芽 | 64×64 | — | — | — | RGBA；文字由程式顯示；置於卡片上方 |
| settings/settings_tab_normal.png | ④ | 分頁 | 80×28 | — | — | 13,14,13,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #ffe7a2；中心可伸縮 |
| settings/settings_tab_selected.png | ④ | 分頁 | 80×28 | — | — | 13,14,13,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #eef5ff；中心可伸縮 |
| settings/settings_toggle_on.png | ④ | 開關 | 48×24 | — | — | — | 無文字；程式顯示 ON/OFF；2px透明邊界 |
| settings/settings_toggle_off.png | ④ | 開關 | 48×24 | — | — | — | 無文字；程式顯示 ON/OFF；2px透明邊界 |
| settings/settings_slider_track.png | ④ | 滑桿軌道 | 96×12 | — | — | 2,6,2,6 | 水平伸縮；2px透明邊界 |
| settings/settings_slider_thumb.png | ④ | 滑桿把手 | 16×16 | — | — | — | 2px透明邊界 |
| mode/mode_badge_recommended.png | ⑤ | 推薦標記底板（文字由程式顯示） | 56×24 | — | — | 0,14,0,14 | RGBA；外緣2px透明；內距8,16,8,16；文字色 #eef5ff；中心可伸縮；高度固定24，只能水平伸縮 |
| god/god_emblem_mercy_128.png | ⑥ | mercy神紋章 | 128×128 | — | — | — | RGBA；最近鄰像素；透明外緣≥2px |
| god/god_emblem_mercy_64.png | ⑥ | mercy神紋章 | 64×64 | — | — | — | RGBA；最近鄰像素；透明外緣≥2px |
| god/god_emblem_mercy_32.png | ⑥ | mercy神紋章 | 32×32 | — | — | — | RGBA；最近鄰像素；透明外緣≥2px |
| god/god_emblem_order_128.png | ⑥ | order神紋章 | 128×128 | — | — | — | RGBA；最近鄰像素；透明外緣≥2px |
| god/god_emblem_order_64.png | ⑥ | order神紋章 | 64×64 | — | — | — | RGBA；最近鄰像素；透明外緣≥2px |
| god/god_emblem_order_32.png | ⑥ | order神紋章 | 32×32 | — | — | — | RGBA；最近鄰像素；透明外緣≥2px |
| god/god_emblem_chaos_128.png | ⑥ | chaos神紋章 | 128×128 | — | — | — | RGBA；最近鄰像素；透明外緣≥2px |
| god/god_emblem_chaos_64.png | ⑥ | chaos神紋章 | 64×64 | — | — | — | RGBA；最近鄰像素；透明外緣≥2px |
| god/god_emblem_chaos_32.png | ⑥ | chaos神紋章 | 32×32 | — | — | — | RGBA；最近鄰像素；透明外緣≥2px |
| title/title_logo_ja.png | ② | 輪廻の天秤 含天秤 Logo | 480×112 | 160,64 | 10／淡入 | — | 原生480×112；1px像素格；只以2倍顯示960×224；PNG-32二值透明；迴=U+8FF4，廻=U+5EFB |
| title/title_logo_ja.svg | ② | Logo 像素輪廓 SVG | 480×112 | 160,64 | 10／淡入 | — | 全部 path；無字型依賴 |
| title/title_logo_ja_plain.png | ② | 輪廻の天秤 標題專用無天秤 Logo | 480×112 | 160,64 | 10／淡入 | — | 原生480×112；1px像素格；只以2倍顯示960×224；PNG-32二值透明；迴=U+8FF4，廻=U+5EFB |
| title/title_logo_ja_plain.svg | ② | Logo 像素輪廓 SVG | 480×112 | 160,64 | 10／淡入 | — | 全部 path；無字型依賴 |
| title/title_logo_zh.png | ② | 輪迴之天秤 含天秤 Logo | 480×112 | 160,64 | 10／淡入 | — | 原生480×112；1px像素格；只以2倍顯示960×224；PNG-32二值透明；迴=U+8FF4，廻=U+5EFB |
| title/title_logo_zh.svg | ② | Logo 像素輪廓 SVG | 480×112 | 160,64 | 10／淡入 | — | 全部 path；無字型依賴 |
| title/title_logo_zh_plain.png | ② | 輪迴之天秤 標題專用無天秤 Logo | 480×112 | 160,64 | 10／淡入 | — | 原生480×112；1px像素格；只以2倍顯示960×224；PNG-32二值透明；迴=U+8FF4，廻=U+5EFB |
| title/title_logo_zh_plain.svg | ② | Logo 像素輪廓 SVG | 480×112 | 160,64 | 10／淡入 | — | 全部 path；無字型依賴 |
| title/title_bg_0_scene.png | ①② | 靜態村莊天空完整背景 | 640×360 | 0,0 | 0／不動 | — | 640×360；64色；不做視差，避免假分層 |
| title/title_bg_1_sparkles.png | ①② | 獨立星光層 | 640×360 | 0,0 | 1／程式整層閃爍，2秒週期 | — | 與背景相同畫布；不可捲動；alpha由程式控制 |
| save/save_bg.png | ③ | 暗化村莊背景 | 640×360 | 0,0 | 0／不動 | — | 靜態；64色 |
| settings/settings_bg.png | ④ | 暗化村莊背景 | 640×360 | 0,0 | 0／不動 | — | 靜態；64色 |
| mode/mode_bg.png | ⑤ | 暗化村莊背景 | 640×360 | 0,0 | 0／不動 | — | 靜態；64色 |
| god/god_bg.png | ⑥ | 暗化村莊背景 | 640×360 | 0,0 | 0／不動 | — | 靜態；64色 |
| opening/opening_01_balance.png | ⑦ | 無文字劇情背景 | 640×360 | 0,0 | 0／不動 | — | 下方90px純暗文字安全區；64色 |
| opening/opening_02_village.png | ⑦ | 無文字劇情背景 | 640×360 | 0,0 | 0／不動 | — | 下方90px純暗文字安全區；64色 |
| opening/opening_03_river.png | ⑦ | 無文字劇情背景 | 640×360 | 0,0 | 0／不動 | — | 下方90px純暗文字安全區；64色 |
| opening/opening_04_throne.png | ⑦ | 無文字劇情背景 | 640×360 | 0,0 | 0／不動 | — | 下方90px純暗文字安全區；64色 |
| opening/opening_05_overlook.png | ⑦ | 無文字劇情背景 | 640×360 | 0,0 | 0／不動 | — | 下方90px純暗文字安全區；64色 |
| mockup/title_zh.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/title_ja.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/boot.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/save.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/settings.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/mode.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/god.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/opening_01_balance.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/opening_02_village.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/opening_03_river.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/opening_04_throne.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/opening_05_overlook.png | 參考 | 完成畫面示意（含假文字） | 640×360 | — | — | — | 僅參考；不可作為runtime背景 |
| mockup/overview.png | 參考 | 12幅畫面總覽 | 1280×720 | — | — | — | 僅參考；四欄三列；最近鄰縮圖 |
| manifest.md | 整合 | 本清單 | — | — | — | — | 每個交付檔案都有一列 |
| validation.json | 驗證 | 自動尺寸／色數／透明度／容量檢查 | — | — | — | — | 尺寸群組與需求完整性檢查 |
| src/build_assets.py | 原檔 | 原始場景／重建工具／製作說明 | — | — | — | — | src不計入3MB |
| src/generation_notes.md | 原檔 | 原始場景／重建工具／製作說明 | — | — | — | — | src不計入3MB |
| src/opening_01_balance_original.png | 原檔 | 原始場景／重建工具／製作說明 | 1672×941 | — | — | — | src不計入3MB |
| src/opening_02_village_original.png | 原檔 | 原始場景／重建工具／製作說明 | 1672×941 | — | — | — | src不計入3MB |
| src/opening_03_river_original.png | 原檔 | 原始場景／重建工具／製作說明 | 1672×941 | — | — | — | src不計入3MB |
| src/opening_04_throne_original.png | 原檔 | 原始場景／重建工具／製作說明 | 1672×941 | — | — | — | src不計入3MB |
| src/opening_05_overlook_original.png | 原檔 | 原始場景／重建工具／製作說明 | 1672×941 | — | — | — | src不計入3MB |
| src/title_original.png | 原檔 | 原始場景／重建工具／製作說明 | 1672×941 | — | — | — | src不計入3MB |

## 範圍

①–⑦全部已交付。Steam商店圖不在本次範圍。原始生成場景和重建工具放src，不列入3MB限制。
