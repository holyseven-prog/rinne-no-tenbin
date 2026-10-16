# 城鎮／野外／城內來源清理候選（不是最終合格包）

2026-10-15。**原圖民宅標示6棟、實際5種屋頂；建築共26種。第6棟民宅由程式重複使用。** 依SEVEN確認，不新增第27種。

本包是原圖衍生的去背、原生格化與減色候選，尚未宣稱逐點人工重繪、造型100%還原或遊戲內組裝驗收通過。請先用compare逐件檢查，勿當成已合格包直接覆蓋。

每個原圖項目有左原圖／中候選／右50%疊圖。基本16×16 tile有4變化，相關植物與平原tile有季節候選。變化／季節／自動拼接／色階動畫皆逐列標記補畫，待SEVEN確認。

## 尚未完成

- 遠景6張、高解析逐點重描與左右無縫驗收。
- §1-6補畫角色、新魔物、戰敗破壞、城牆等級。
- 火焰、水流、旗子等形變動畫；現在的4幀僅為色階脈動候選，不能冒充已完成動畫。
- 47鄰接遮罩的實機拼圖測試、白邊與全部細節人工驗收。

C6–C9與E重複項以castle來源為準，村莊僅額外交原圖中E沒有的torch、monster_urn、cage；其他共用品請引用castle與field。

| 檔名 | 對應素材圖與裁切 x,y,w,h | 原生尺寸 | 格數 | 色數 | 方向・幀／變化 | 錨點 | 是否鏡像 | 季節 | 狀態 |
|---|---|---|---|---|---|---|---|---|---|
| village/bld_church.png | docs/figures/village/village_design_sheet.png；bld_church；14,108,113,165 | 112×160 | (7, 6) | 32 | — | 56,159 | 否 | — | 原圖清理候選； |
| village/bld_church_winter.png | docs/figures/village/village_design_sheet.png；bld_church；14,108,113,165 | 112×160 | (7, 6) | 32 | — | 56,159 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_guild.png | docs/figures/village/village_design_sheet.png；bld_guild；132,165,90,108 | 112×144 | (7, 5) | 32 | — | 56,143 | 否 | — | 原圖清理候選； |
| village/bld_guild_winter.png | docs/figures/village/village_design_sheet.png；bld_guild；132,165,90,108 | 112×144 | (7, 5) | 32 | — | 56,143 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_tavern.png | docs/figures/village/village_design_sheet.png；bld_tavern；227,161,97,112 | 112×128 | (7, 5) | 32 | — | 56,127 | 否 | — | 原圖清理候選； |
| village/bld_tavern_winter.png | docs/figures/village/village_design_sheet.png；bld_tavern；227,161,97,112 | 112×128 | (7, 5) | 32 | — | 56,127 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_inn.png | docs/figures/village/village_design_sheet.png；bld_inn；331,158,99,115 | 112×128 | (7, 5) | 32 | — | 56,127 | 否 | — | 原圖清理候選； |
| village/bld_inn_winter.png | docs/figures/village/village_design_sheet.png；bld_inn；331,158,99,115 | 112×128 | (7, 5) | 32 | — | 56,127 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_weapon_shop.png | docs/figures/village/village_design_sheet.png；bld_weapon_shop；436,179,76,94 | 96×112 | (6, 4) | 32 | — | 48,111 | 否 | — | 原圖清理候選； |
| village/bld_weapon_shop_winter.png | docs/figures/village/village_design_sheet.png；bld_weapon_shop；436,179,76,94 | 96×112 | (6, 4) | 32 | — | 48,111 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_armor_shop.png | docs/figures/village/village_design_sheet.png；bld_armor_shop；518,176,75,97 | 96×128 | (6, 4) | 32 | — | 48,127 | 否 | — | 原圖清理候選； |
| village/bld_armor_shop_winter.png | docs/figures/village/village_design_sheet.png；bld_armor_shop；518,176,75,97 | 96×128 | (6, 4) | 32 | — | 48,127 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_item_shop.png | docs/figures/village/village_design_sheet.png；bld_item_shop；599,159,80,114 | 96×128 | (6, 4) | 32 | — | 48,127 | 否 | — | 原圖清理候選； |
| village/bld_item_shop_winter.png | docs/figures/village/village_design_sheet.png；bld_item_shop；599,159,80,114 | 96×128 | (6, 4) | 32 | — | 48,127 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_smith.png | docs/figures/village/village_design_sheet.png；bld_smith；684,176,77,97 | 96×128 | (6, 4) | 32 | — | 48,127 | 否 | — | 原圖清理候選； |
| village/bld_smith_winter.png | docs/figures/village/village_design_sheet.png；bld_smith；684,176,77,97 | 96×128 | (6, 4) | 32 | — | 48,127 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_herbalist.png | docs/figures/village/village_design_sheet.png；bld_herbalist；766,174,78,99 | 96×128 | (6, 4) | 32 | — | 48,127 | 否 | — | 原圖清理候選； |
| village/bld_herbalist_winter.png | docs/figures/village/village_design_sheet.png；bld_herbalist；766,174,78,99 | 96×128 | (6, 4) | 32 | — | 48,127 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_market.png | docs/figures/village/village_design_sheet.png；bld_market；850,169,92,104 | 112×128 | (7, 5) | 32 | — | 56,127 | 否 | — | 原圖清理候選； |
| village/bld_market_winter.png | docs/figures/village/village_design_sheet.png；bld_market；850,169,92,104 | 112×128 | (7, 5) | 32 | — | 56,127 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_library.png | docs/figures/village/village_design_sheet.png；bld_library；946,169,68,104 | 112×176 | (7, 5) | 32 | — | 56,175 | 否 | — | 原圖清理候選； |
| village/bld_library_winter.png | docs/figures/village/village_design_sheet.png；bld_library；946,169,68,104 | 112×176 | (7, 5) | 32 | — | 56,175 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_manor.png | docs/figures/village/village_design_sheet.png；bld_manor；1019,157,107,116 | 128×144 | (8, 6) | 32 | — | 64,143 | 否 | — | 原圖清理候選； |
| village/bld_manor_winter.png | docs/figures/village/village_design_sheet.png；bld_manor；1019,157,107,116 | 128×144 | (8, 6) | 32 | — | 64,143 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_barracks.png | docs/figures/village/village_design_sheet.png；bld_barracks；1132,160,90,113 | 112×144 | (7, 5) | 32 | — | 56,143 | 否 | — | 原圖清理候選； |
| village/bld_barracks_winter.png | docs/figures/village/village_design_sheet.png；bld_barracks；1132,160,90,113 | 112×144 | (7, 5) | 32 | — | 56,143 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_watchtower.png | docs/figures/village/village_design_sheet.png；bld_watchtower；1236,158,76,120 | 80×128 | (5, 7) | 32 | — | 40,127 | 否 | — | 原圖清理候選； |
| village/bld_watchtower_winter.png | docs/figures/village/village_design_sheet.png；bld_watchtower；1236,158,76,120 | 80×128 | (5, 7) | 32 | — | 40,127 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_watchtower_flag.png | docs/figures/village/village_design_sheet.png；bld_watchtower_flag；1320,121,68,161 | 80×208 | (5, 7) | 32 | — | 40,207 | 否 | — | 原圖清理候選； |
| village/bld_watchtower_flag_winter.png | docs/figures/village/village_design_sheet.png；bld_watchtower_flag；1320,121,68,161 | 80×208 | (5, 7) | 32 | — | 40,207 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_demon_castle.png | docs/figures/village/village_design_sheet.png；bld_demon_castle；1409,149,116,124 | 112×128 | (7, 8) | 32 | — | 56,127 | 否 | — | 原圖清理候選； |
| village/bld_demon_castle_winter.png | docs/figures/village/village_design_sheet.png；bld_demon_castle；1409,149,116,124 | 112×128 | (7, 8) | 32 | — | 56,127 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_house_red.png | docs/figures/village/village_design_sheet.png；bld_house_red；14,318,99,99 | 80×96 | (5, 4) | 32 | — | 40,95 | 否 | — | 原圖清理候選； |
| village/bld_house_red_winter.png | docs/figures/village/village_design_sheet.png；bld_house_red；14,318,99,99 | 80×96 | (5, 4) | 32 | — | 40,95 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_house_blue.png | docs/figures/village/village_design_sheet.png；bld_house_blue；119,318,98,99 | 80×96 | (5, 4) | 32 | — | 40,95 | 否 | — | 原圖清理候選； |
| village/bld_house_blue_winter.png | docs/figures/village/village_design_sheet.png；bld_house_blue；119,318,98,99 | 80×96 | (5, 4) | 32 | — | 40,95 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_house_green.png | docs/figures/village/village_design_sheet.png；bld_house_green；221,319,102,98 | 80×96 | (5, 4) | 32 | — | 40,95 | 否 | — | 原圖清理候選； |
| village/bld_house_green_winter.png | docs/figures/village/village_design_sheet.png；bld_house_green；221,319,102,98 | 80×96 | (5, 4) | 32 | — | 40,95 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_house_yellow.png | docs/figures/village/village_design_sheet.png；bld_house_yellow；327,318,101,99 | 80×96 | (5, 4) | 32 | — | 40,95 | 否 | — | 原圖清理候選； |
| village/bld_house_yellow_winter.png | docs/figures/village/village_design_sheet.png；bld_house_yellow；327,318,101,99 | 80×96 | (5, 4) | 31 | — | 40,95 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_house_brown.png | docs/figures/village/village_design_sheet.png；bld_house_brown；432,319,104,98 | 80×96 | (5, 4) | 32 | — | 40,95 | 否 | — | 原圖清理候選； |
| village/bld_house_brown_winter.png | docs/figures/village/village_design_sheet.png；bld_house_brown；432,319,104,98 | 80×96 | (5, 4) | 32 | — | 40,95 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_farm_hut_one.png | docs/figures/village/village_design_sheet.png；bld_farm_hut_one；550,319,105,95 | 80×80 | (5, 4) | 32 | — | 40,79 | 否 | — | 原圖清理候選； |
| village/bld_farm_hut_one_winter.png | docs/figures/village/village_design_sheet.png；bld_farm_hut_one；550,319,105,95 | 80×80 | (5, 4) | 32 | — | 40,79 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_farm_hut_two.png | docs/figures/village/village_design_sheet.png；bld_farm_hut_two；664,325,102,89 | 80×80 | (5, 4) | 32 | — | 40,79 | 否 | — | 原圖清理候選； |
| village/bld_farm_hut_two_winter.png | docs/figures/village/village_design_sheet.png；bld_farm_hut_two；664,325,102,89 | 80×80 | (5, 4) | 32 | — | 40,79 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_windmill.png | docs/figures/village/village_design_sheet.png；bld_windmill；785,298,90,118 | 80×128 | (5, 7) | 32 | — | 40,127 | 否 | — | 原圖清理候選； |
| village/bld_windmill_winter.png | docs/figures/village/village_design_sheet.png；bld_windmill；785,298,90,118 | 80×128 | (5, 7) | 32 | — | 40,127 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_small_tower.png | docs/figures/village/village_design_sheet.png；bld_small_tower；898,311,65,105 | 48×96 | (3, 6) | 32 | — | 24,95 | 否 | — | 原圖清理候選； |
| village/bld_small_tower_winter.png | docs/figures/village/village_design_sheet.png；bld_small_tower；898,311,65,105 | 48×96 | (3, 6) | 32 | — | 24,95 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/bld_cemetery.png | docs/figures/village/village_design_sheet.png；bld_cemetery；1202,311,316,114 | 96×80 | (6, 5) | 32 | — | 48,79 | 否 | — | 原圖清理候選； |
| village/bld_cemetery_winter.png | docs/figures/village/village_design_sheet.png；bld_cemetery；1202,311,316,114 | 96×80 | (6, 5) | 32 | — | 48,79 | 否 | winter | 補畫候選：原屋頂薄雪，待SEVEN確認； |
| village/tile_grass_0.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_grass_1.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_2.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_3.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_0_summer.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_1_summer.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_2_summer.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_3_summer.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_0_autumn.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 31 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_1_autumn.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 30 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_2_autumn.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_3_autumn.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 30 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_0_winter.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 19 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_1_winter.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 20 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_2_winter.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 21 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_grass_3_winter.png | docs/figures/village/village_design_sheet.png；tile_grass；17,480,68,70 | 16×16 | (1, 1) | 20 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_0.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_flowers_1.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_2.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_3.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_0_summer.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_1_summer.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_2_summer.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_3_summer.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_0_autumn.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_1_autumn.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_2_autumn.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_3_autumn.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_0_winter.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 28 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_1_winter.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 28 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_2_winter.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 24 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_flowers_3_winter.png | docs/figures/village/village_design_sheet.png；tile_flowers；101,480,67,70 | 16×16 | (1, 1) | 25 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_dirt_0.png | docs/figures/village/village_design_sheet.png；tile_dirt；182,480,68,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_dirt_1.png | docs/figures/village/village_design_sheet.png；tile_dirt；182,480,68,70 | 16×16 | (1, 1) | 31 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_dirt_2.png | docs/figures/village/village_design_sheet.png；tile_dirt；182,480,68,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_dirt_3.png | docs/figures/village/village_design_sheet.png；tile_dirt；182,480,68,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_stone_0.png | docs/figures/village/village_design_sheet.png；tile_stone；267,480,76,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_stone_1.png | docs/figures/village/village_design_sheet.png；tile_stone；267,480,76,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_stone_2.png | docs/figures/village/village_design_sheet.png；tile_stone；267,480,76,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_stone_3.png | docs/figures/village/village_design_sheet.png；tile_stone；267,480,76,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_0.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_farm_1.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_2.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_3.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_0_summer.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_1_summer.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_2_summer.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_3_summer.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_0_autumn.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_1_autumn.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_2_autumn.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_3_autumn.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_0_winter.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 31 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_1_winter.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 30 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_2_winter.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_farm_3_winter.png | docs/figures/village/village_design_sheet.png；tile_farm；370,480,67,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_water_0.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_water_1.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_water_2.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_water_3.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_sand_0.png | docs/figures/village/village_design_sheet.png；tile_sand；512,489,18,20 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_sand_1.png | docs/figures/village/village_design_sheet.png；tile_sand；512,489,18,20 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_sand_2.png | docs/figures/village/village_design_sheet.png；tile_sand；512,489,18,20 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_sand_3.png | docs/figures/village/village_design_sheet.png；tile_sand；512,489,18,20 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_cliff_0.png | docs/figures/village/village_design_sheet.png；tile_cliff；594,485,26,59 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_cliff_1.png | docs/figures/village/village_design_sheet.png；tile_cliff；594,485,26,59 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_cliff_2.png | docs/figures/village/village_design_sheet.png；tile_cliff；594,485,26,59 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_cliff_3.png | docs/figures/village/village_design_sheet.png；tile_cliff；594,485,26,59 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_clifftop_0.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_clifftop_1.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_clifftop_2.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_clifftop_3.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_dark_0.png | docs/figures/village/village_design_sheet.png；tile_dark；726,480,82,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_dark_1.png | docs/figures/village/village_design_sheet.png；tile_dark；726,480,82,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_dark_2.png | docs/figures/village/village_design_sheet.png；tile_dark；726,480,82,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_dark_3.png | docs/figures/village/village_design_sheet.png；tile_dark；726,480,82,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tree_conifer.png | docs/figures/village/village_design_sheet.png；tree_conifer；832,477,67,85 | 16×32 | — | 32 | — | 8,31 | 否 | — | 原圖清理候選； |
| village/tree_conifer_spring.png | docs/figures/village/village_design_sheet.png；tree_conifer；832,477,67,85 | 16×32 | — | 32 | — | 8,31 | 否 | spring | 季節候選，待SEVEN確認； |
| village/tree_conifer_summer.png | docs/figures/village/village_design_sheet.png；tree_conifer；832,477,67,85 | 16×32 | — | 32 | — | 8,31 | 否 | summer | 季節候選，待SEVEN確認； |
| village/tree_conifer_autumn.png | docs/figures/village/village_design_sheet.png；tree_conifer；832,477,67,85 | 16×32 | — | 32 | — | 8,31 | 否 | autumn | 季節候選，待SEVEN確認； |
| village/tree_conifer_winter.png | docs/figures/village/village_design_sheet.png；tree_conifer；832,477,67,85 | 16×32 | — | 22 | — | 8,31 | 否 | winter | 季節候選，待SEVEN確認； |
| village/tree_broadleaf.png | docs/figures/village/village_design_sheet.png；tree_broadleaf；912,478,72,84 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| village/tree_broadleaf_spring.png | docs/figures/village/village_design_sheet.png；tree_broadleaf；912,478,72,84 | 24×32 | — | 32 | — | 12,31 | 否 | spring | 季節候選，待SEVEN確認； |
| village/tree_broadleaf_summer.png | docs/figures/village/village_design_sheet.png；tree_broadleaf；912,478,72,84 | 24×32 | — | 32 | — | 12,31 | 否 | summer | 季節候選，待SEVEN確認； |
| village/tree_broadleaf_autumn.png | docs/figures/village/village_design_sheet.png；tree_broadleaf；912,478,72,84 | 24×32 | — | 32 | — | 12,31 | 否 | autumn | 季節候選，待SEVEN確認； |
| village/tree_broadleaf_winter.png | docs/figures/village/village_design_sheet.png；tree_broadleaf；912,478,72,84 | 24×32 | — | 27 | — | 12,31 | 否 | winter | 季節候選，待SEVEN確認； |
| village/tree_bush.png | docs/figures/village/village_design_sheet.png；tree_bush；993,503,55,58 | 16×16 | — | 31 | — | 8,15 | 否 | — | 原圖清理候選； |
| village/tree_bush_spring.png | docs/figures/village/village_design_sheet.png；tree_bush；993,503,55,58 | 16×16 | — | 31 | — | 8,15 | 否 | spring | 季節候選，待SEVEN確認； |
| village/tree_bush_summer.png | docs/figures/village/village_design_sheet.png；tree_bush；993,503,55,58 | 16×16 | — | 31 | — | 8,15 | 否 | summer | 季節候選，待SEVEN確認； |
| village/tree_bush_autumn.png | docs/figures/village/village_design_sheet.png；tree_bush；993,503,55,58 | 16×16 | — | 31 | — | 8,15 | 否 | autumn | 季節候選，待SEVEN確認； |
| village/tree_bush_winter.png | docs/figures/village/village_design_sheet.png；tree_bush；993,503,55,58 | 16×16 | — | 27 | — | 8,15 | 否 | winter | 季節候選，待SEVEN確認； |
| village/tree_dead.png | docs/figures/village/village_design_sheet.png；tree_dead；1060,482,73,80 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| village/tree_dead_spring.png | docs/figures/village/village_design_sheet.png；tree_dead；1060,482,73,80 | 24×32 | — | 32 | — | 12,31 | 否 | spring | 季節候選，待SEVEN確認； |
| village/tree_dead_summer.png | docs/figures/village/village_design_sheet.png；tree_dead；1060,482,73,80 | 24×32 | — | 32 | — | 12,31 | 否 | summer | 季節候選，待SEVEN確認； |
| village/tree_dead_autumn.png | docs/figures/village/village_design_sheet.png；tree_dead；1060,482,73,80 | 24×32 | — | 32 | — | 12,31 | 否 | autumn | 季節候選，待SEVEN確認； |
| village/tree_dead_winter.png | docs/figures/village/village_design_sheet.png；tree_dead；1060,482,73,80 | 24×32 | — | 32 | — | 12,31 | 否 | winter | 季節候選，待SEVEN確認； |
| village/tile_snow_0.png | docs/figures/village/village_design_sheet.png；tile_snow；1159,481,53,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_snow_1.png | docs/figures/village/village_design_sheet.png；tile_snow；1159,481,53,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_snow_2.png | docs/figures/village/village_design_sheet.png；tile_snow；1159,481,53,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_snow_3.png | docs/figures/village/village_design_sheet.png；tile_snow；1159,481,53,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_ice_0.png | docs/figures/village/village_design_sheet.png；tile_ice；1276,481,58,70 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_ice_1.png | docs/figures/village/village_design_sheet.png；tile_ice；1276,481,58,70 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_ice_2.png | docs/figures/village/village_design_sheet.png；tile_ice；1276,481,58,70 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_ice_3.png | docs/figures/village/village_design_sheet.png；tile_ice；1276,481,58,70 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_lava_0.png | docs/figures/village/village_design_sheet.png；tile_lava；1344,482,54,69 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_lava_1.png | docs/figures/village/village_design_sheet.png；tile_lava；1344,482,54,69 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_lava_2.png | docs/figures/village/village_design_sheet.png；tile_lava；1344,482,54,69 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_lava_3.png | docs/figures/village/village_design_sheet.png；tile_lava；1344,482,54,69 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_lava_rock_0.png | docs/figures/village/village_design_sheet.png；tile_lava_rock；1405,482,55,69 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_lava_rock_1.png | docs/figures/village/village_design_sheet.png；tile_lava_rock；1405,482,55,69 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_lava_rock_2.png | docs/figures/village/village_design_sheet.png；tile_lava_rock；1405,482,55,69 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_lava_rock_3.png | docs/figures/village/village_design_sheet.png；tile_lava_rock；1405,482,55,69 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_poison_0.png | docs/figures/village/village_design_sheet.png；tile_poison；1467,482,54,69 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| village/tile_poison_1.png | docs/figures/village/village_design_sheet.png；tile_poison；1467,482,54,69 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_poison_2.png | docs/figures/village/village_design_sheet.png；tile_poison；1467,482,54,69 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tile_poison_3.png | docs/figures/village/village_design_sheet.png；tile_poison；1467,482,54,69 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| village/tree_snow.png | docs/figures/village/village_design_sheet.png；tree_snow；1216,480,55,71 | 16×32 | — | 32 | — | 8,31 | 否 | — | 原圖清理候選； |
| village/tree_snow_spring.png | docs/figures/village/village_design_sheet.png；tree_snow；1216,480,55,71 | 16×32 | — | 32 | — | 8,31 | 否 | spring | 季節候選，待SEVEN確認； |
| village/tree_snow_summer.png | docs/figures/village/village_design_sheet.png；tree_snow；1216,480,55,71 | 16×32 | — | 32 | — | 8,31 | 否 | summer | 季節候選，待SEVEN確認； |
| village/tree_snow_autumn.png | docs/figures/village/village_design_sheet.png；tree_snow；1216,480,55,71 | 16×32 | — | 32 | — | 8,31 | 否 | autumn | 季節候選，待SEVEN確認； |
| village/tree_snow_winter.png | docs/figures/village/village_design_sheet.png；tree_snow；1216,480,55,71 | 16×32 | — | 32 | — | 8,31 | 否 | winter | 季節候選，待SEVEN確認； |
| village/prop_barrel.png | docs/figures/village/village_design_sheet.png；prop_barrel；22,658,40,50 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| village/prop_crate.png | docs/figures/village/village_design_sheet.png；prop_crate；78,657,46,51 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| village/prop_crate_stack.png | docs/figures/village/village_design_sheet.png；prop_crate_stack；132,645,53,64 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| village/prop_sack.png | docs/figures/village/village_design_sheet.png；prop_sack；200,656,42,52 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| village/prop_pot.png | docs/figures/village/village_design_sheet.png；prop_pot；249,657,43,50 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| village/prop_clothesline.png | docs/figures/village/village_design_sheet.png；prop_clothesline；295,654,45,54 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| village/prop_bench.png | docs/figures/village/village_design_sheet.png；prop_bench；22,742,63,52 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| village/prop_handcart.png | docs/figures/village/village_design_sheet.png；prop_handcart；89,736,67,59 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| village/prop_wheelbarrow.png | docs/figures/village/village_design_sheet.png；prop_wheelbarrow；160,739,62,56 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| village/prop_firewood.png | docs/figures/village/village_design_sheet.png；prop_firewood；226,742,52,53 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| village/prop_logs.png | docs/figures/village/village_design_sheet.png；prop_logs；282,737,58,57 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| village/prop_haystack.png | docs/figures/village/village_design_sheet.png；prop_haystack；359,656,66,52 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| village/prop_scarecrow.png | docs/figures/village/village_design_sheet.png；prop_scarecrow；430,650,58,58 | 16×32 | — | 32 | — | 8,31 | 否 | — | 原圖清理候選； |
| village/prop_beehive.png | docs/figures/village/village_design_sheet.png；prop_beehive；493,653,55,55 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| village/prop_vegetable_garden.png | docs/figures/village/village_design_sheet.png；prop_vegetable_garden；552,656,57,52 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| village/prop_flower_garden.png | docs/figures/village/village_design_sheet.png；prop_flower_garden；401,735,79,62 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| village/prop_water_trough.png | docs/figures/village/village_design_sheet.png；prop_water_trough；487,742,67,54 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| village/prop_streetlamp.png | docs/figures/village/village_design_sheet.png；prop_streetlamp；635,648,39,61 | 16×32 | — | 32 | — | 8,31 | 否 | — | 原圖清理候選； |
| village/prop_signpost.png | docs/figures/village/village_design_sheet.png；prop_signpost；680,655,57,54 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| village/prop_noticeboard.png | docs/figures/village/village_design_sheet.png；prop_noticeboard；744,652,58,57 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| village/prop_flag.png | docs/figures/village/village_design_sheet.png；prop_flag；648,733,41,63 | 16×32 | — | 31 | — | 8,31 | 否 | — | 原圖清理候選； |
| village/prop_stone_lantern.png | docs/figures/village/village_design_sheet.png；prop_stone_lantern；730,733,48,64 | 16×32 | — | 32 | — | 8,31 | 否 | — | 原圖清理候選； |
| village/prop_bush.png | docs/figures/village/village_design_sheet.png；prop_bush；824,656,50,52 | 16×16 | — | 31 | — | 8,15 | 否 | — | 原圖清理候選； |
| village/prop_berries.png | docs/figures/village/village_design_sheet.png；prop_berries；879,650,60,59 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| village/prop_stump.png | docs/figures/village/village_design_sheet.png；prop_stump；943,654,55,55 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| village/prop_mushroom.png | docs/figures/village/village_design_sheet.png；prop_mushroom；826,740,41,57 | 16×24 | — | 30 | — | 8,23 | 否 | — | 原圖清理候選； |
| village/prop_puddle.png | docs/figures/village/village_design_sheet.png；prop_puddle；872,744,58,44 | 24×16 | — | 32 | — | 12,15 | 否 | — | 原圖清理候選； |
| village/prop_pebbles.png | docs/figures/village/village_design_sheet.png；prop_pebbles；936,738,65,56 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| village/prop_gravestone.png | docs/figures/village/village_design_sheet.png；prop_gravestone；1037,655,47,54 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| village/prop_cross.png | docs/figures/village/village_design_sheet.png；prop_cross；1123,654,34,56 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| village/prop_flowerpot.png | docs/figures/village/village_design_sheet.png；prop_flowerpot；1174,656,47,53 | 16×24 | — | 31 | — | 8,23 | 否 | — | 原圖清理候選； |
| village/prop_well.png | docs/figures/village/village_design_sheet.png；prop_well；1030,734,45,61 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| village/prop_anvil.png | docs/figures/village/village_design_sheet.png；prop_anvil；1078,736,50,59 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| village/prop_fence.png | docs/figures/village/village_design_sheet.png；prop_fence；1135,737,48,55 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| village/prop_bones.png | docs/figures/village/village_design_sheet.png；prop_bones；1192,739,43,56 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| village/prop_torch.png | docs/figures/village/village_design_sheet.png；prop_torch；1270,638,38,63 | 16×32 | — | 31 | — | 8,31 | 否 | — | 原圖清理候選； |
| village/prop_monster_urn.png | docs/figures/village/village_design_sheet.png；prop_monster_urn；1463,639,47,62 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| village/prop_cage.png | docs/figures/village/village_design_sheet.png；prop_cage；1412,736,46,57 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_tile_grass_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_grass_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 29 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 26 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 30 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 18 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 19 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 18 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass；23,145,67,66 | 16×16 | (1, 1) | 16 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_tallgrass_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 31 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 29 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 23 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 23 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 23 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_tallgrass_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_tallgrass；103,145,66,66 | 16×16 | (1, 1) | 20 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 31 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_flowers_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 31 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 31 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 27 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 27 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 27 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_flowers_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_flowers；181,145,66,66 | 16×16 | (1, 1) | 29 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_dirt_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dirt_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dirt；260,145,64,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_rutted_road_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rutted_road_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rutted_road；338,145,67,66 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_dry_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry；23,246,66,63 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_rocky_plain_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 27 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 27 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 27 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_rocky_plain_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_rocky_plain；103,246,65,63 | 16×16 | (1, 1) | 26 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_wetland_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 31 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 31 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 31 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 31 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_wetland_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_wetland；182,246,65,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_sand_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand；260,246,64,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_sand_grass_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 30 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 30 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 29 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_sand_grass_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_sand_grass；339,246,66,63 | 16×16 | (1, 1) | 29 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_grass_rock_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_0_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_1_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_2_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_3_summer.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | summer | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_0_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_1_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_2_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_3_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | autumn | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_0_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 30 | 0 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_1_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 28 | 1 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_2_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 29 | 2 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_grass_rock_3_winter.png | docs/figures/field/field_castle_design_sheet.png；field_tile_grass_rock；419,246,67,63 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | winter | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_prop_mountain_small.png | docs/figures/field/field_castle_design_sheet.png；field_prop_mountain_small；20,393,55,60 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| field/field_prop_mountain_large.png | docs/figures/field/field_castle_design_sheet.png；field_prop_mountain_large；77,391,62,62 | 48×48 | — | 32 | — | 24,47 | 否 | — | 原圖清理候選； |
| field/field_prop_rock.png | docs/figures/field/field_castle_design_sheet.png；field_prop_rock；143,403,51,50 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_cliff.png | docs/figures/field/field_castle_design_sheet.png；field_prop_cliff；201,385,52,68 | 32×48 | — | 32 | — | 16,47 | 否 | — | 原圖清理候選； |
| field/field_prop_clifftop.png | docs/figures/field/field_castle_design_sheet.png；field_prop_clifftop；262,385,53,68 | 32×48 | — | 32 | — | 16,47 | 否 | — | 原圖清理候選； |
| field/field_prop_ledge.png | docs/figures/field/field_castle_design_sheet.png；field_prop_ledge；323,392,50,61 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_cave_entrance.png | docs/figures/field/field_castle_design_sheet.png；field_prop_cave_entrance；385,388,52,65 | 32×48 | — | 32 | — | 16,47 | 否 | — | 原圖清理候選； |
| field/field_prop_rock_wall.png | docs/figures/field/field_castle_design_sheet.png；field_prop_rock_wall；448,385,51,68 | 24×48 | — | 32 | — | 12,47 | 否 | — | 原圖清理候選； |
| field/field_prop_bridge_wood.png | docs/figures/field/field_castle_design_sheet.png；field_prop_bridge_wood；268,519,71,58 | 48×32 | — | 32 | — | 24,31 | 否 | — | 原圖清理候選； |
| field/field_prop_bridge_stone.png | docs/figures/field/field_castle_design_sheet.png；field_prop_bridge_stone；348,519,67,58 | 48×32 | — | 32 | — | 24,31 | 否 | — | 原圖清理候選； |
| field/field_prop_bridge_rope.png | docs/figures/field/field_castle_design_sheet.png；field_prop_bridge_rope；426,519,74,58 | 48×32 | — | 32 | — | 24,31 | 否 | — | 原圖清理候選； |
| field/field_prop_conifer.png | docs/figures/field/field_castle_design_sheet.png；field_prop_conifer；17,645,50,70 | 16×32 | — | 32 | — | 8,31 | 否 | — | 原圖清理候選； |
| field/field_prop_conifer_spring.png | docs/figures/field/field_castle_design_sheet.png；field_prop_conifer；17,645,50,70 | 16×32 | — | 32 | — | 8,31 | 否 | spring | 季節候選，待SEVEN確認； |
| field/field_prop_conifer_summer.png | docs/figures/field/field_castle_design_sheet.png；field_prop_conifer；17,645,50,70 | 16×32 | — | 32 | — | 8,31 | 否 | summer | 季節候選，待SEVEN確認； |
| field/field_prop_conifer_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_prop_conifer；17,645,50,70 | 16×32 | — | 31 | — | 8,31 | 否 | autumn | 季節候選，待SEVEN確認； |
| field/field_prop_conifer_winter.png | docs/figures/field/field_castle_design_sheet.png；field_prop_conifer；17,645,50,70 | 16×32 | — | 29 | — | 8,31 | 否 | winter | 季節候選，待SEVEN確認； |
| field/field_prop_broadleaf.png | docs/figures/field/field_castle_design_sheet.png；field_prop_broadleaf；75,642,52,73 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_broadleaf_spring.png | docs/figures/field/field_castle_design_sheet.png；field_prop_broadleaf；75,642,52,73 | 24×32 | — | 32 | — | 12,31 | 否 | spring | 季節候選，待SEVEN確認； |
| field/field_prop_broadleaf_summer.png | docs/figures/field/field_castle_design_sheet.png；field_prop_broadleaf；75,642,52,73 | 24×32 | — | 32 | — | 12,31 | 否 | summer | 季節候選，待SEVEN確認； |
| field/field_prop_broadleaf_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_prop_broadleaf；75,642,52,73 | 24×32 | — | 32 | — | 12,31 | 否 | autumn | 季節候選，待SEVEN確認； |
| field/field_prop_broadleaf_winter.png | docs/figures/field/field_castle_design_sheet.png；field_prop_broadleaf；75,642,52,73 | 24×32 | — | 30 | — | 12,31 | 否 | winter | 季節候選，待SEVEN確認； |
| field/field_prop_small_tree.png | docs/figures/field/field_castle_design_sheet.png；field_prop_small_tree；131,653,34,62 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| field/field_prop_small_tree_spring.png | docs/figures/field/field_castle_design_sheet.png；field_prop_small_tree；131,653,34,62 | 16×24 | — | 32 | — | 8,23 | 否 | spring | 季節候選，待SEVEN確認； |
| field/field_prop_small_tree_summer.png | docs/figures/field/field_castle_design_sheet.png；field_prop_small_tree；131,653,34,62 | 16×24 | — | 32 | — | 8,23 | 否 | summer | 季節候選，待SEVEN確認； |
| field/field_prop_small_tree_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_prop_small_tree；131,653,34,62 | 16×24 | — | 32 | — | 8,23 | 否 | autumn | 季節候選，待SEVEN確認； |
| field/field_prop_small_tree_winter.png | docs/figures/field/field_castle_design_sheet.png；field_prop_small_tree；131,653,34,62 | 16×24 | — | 28 | — | 8,23 | 否 | winter | 季節候選，待SEVEN確認； |
| field/field_prop_bush.png | docs/figures/field/field_castle_design_sheet.png；field_prop_bush；170,656,39,59 | 16×16 | — | 32 | — | 8,15 | 否 | — | 原圖清理候選； |
| field/field_prop_bush_spring.png | docs/figures/field/field_castle_design_sheet.png；field_prop_bush；170,656,39,59 | 16×16 | — | 32 | — | 8,15 | 否 | spring | 季節候選，待SEVEN確認； |
| field/field_prop_bush_summer.png | docs/figures/field/field_castle_design_sheet.png；field_prop_bush；170,656,39,59 | 16×16 | — | 32 | — | 8,15 | 否 | summer | 季節候選，待SEVEN確認； |
| field/field_prop_bush_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_prop_bush；170,656,39,59 | 16×16 | — | 32 | — | 8,15 | 否 | autumn | 季節候選，待SEVEN確認； |
| field/field_prop_bush_winter.png | docs/figures/field/field_castle_design_sheet.png；field_prop_bush；170,656,39,59 | 16×16 | — | 25 | — | 8,15 | 否 | winter | 季節候選，待SEVEN確認； |
| field/field_prop_flowers.png | docs/figures/field/field_castle_design_sheet.png；field_prop_flowers；215,652,35,63 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| field/field_prop_rock_small.png | docs/figures/field/field_castle_design_sheet.png；field_prop_rock_small；252,665,38,50 | 16×16 | — | 32 | — | 8,15 | 否 | — | 原圖清理候選； |
| field/field_prop_rock_large.png | docs/figures/field/field_castle_design_sheet.png；field_prop_rock_large；291,642,61,73 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| field/field_prop_stump.png | docs/figures/field/field_castle_design_sheet.png；field_prop_stump；356,658,44,57 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_fallen_log.png | docs/figures/field/field_castle_design_sheet.png；field_prop_fallen_log；404,658,50,57 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| field/field_prop_dead_tree.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dead_tree；455,643,47,72 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_dead_tree_spring.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dead_tree；455,643,47,72 | 24×32 | — | 32 | — | 12,31 | 否 | spring | 季節候選，待SEVEN確認； |
| field/field_prop_dead_tree_summer.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dead_tree；455,643,47,72 | 24×32 | — | 32 | — | 12,31 | 否 | summer | 季節候選，待SEVEN確認； |
| field/field_prop_dead_tree_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dead_tree；455,643,47,72 | 24×32 | — | 32 | — | 12,31 | 否 | autumn | 季節候選，待SEVEN確認； |
| field/field_prop_dead_tree_winter.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dead_tree；455,643,47,72 | 24×32 | — | 32 | — | 12,31 | 否 | winter | 季節候選，待SEVEN確認； |
| field/field_prop_stele.png | docs/figures/field/field_castle_design_sheet.png；field_prop_stele；533,147,43,63 | 16×32 | — | 32 | — | 8,31 | 否 | — | 原圖清理候選； |
| field/field_prop_shrine.png | docs/figures/field/field_castle_design_sheet.png；field_prop_shrine；591,148,54,62 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_ruin_column.png | docs/figures/field/field_castle_design_sheet.png；field_prop_ruin_column；672,143,47,67 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_stone_arch.png | docs/figures/field/field_castle_design_sheet.png；field_prop_stone_arch；737,143,70,67 | 48×40 | — | 32 | — | 24,39 | 否 | — | 原圖清理候選； |
| field/field_prop_altar.png | docs/figures/field/field_castle_design_sheet.png；field_prop_altar；832,146,56,64 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| field/field_prop_boulder.png | docs/figures/field/field_castle_design_sheet.png；field_prop_boulder；528,251,59,58 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| field/field_prop_pebbles.png | docs/figures/field/field_castle_design_sheet.png；field_prop_pebbles；594,260,46,49 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_tallgrass_big.png | docs/figures/field/field_castle_design_sheet.png；field_prop_tallgrass_big；653,251,59,58 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| field/field_prop_tallgrass_small.png | docs/figures/field/field_castle_design_sheet.png；field_prop_tallgrass_small；722,263,49,46 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_mushrooms.png | docs/figures/field/field_castle_design_sheet.png；field_prop_mushrooms；786,248,46,61 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_berries.png | docs/figures/field/field_castle_design_sheet.png；field_prop_berries；839,248,52,61 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_signpost.png | docs/figures/field/field_castle_design_sheet.png；field_prop_signpost；531,349,46,53 | 24×24 | — | 31 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_fallen_signpost.png | docs/figures/field/field_castle_design_sheet.png；field_prop_fallen_signpost；587,351,50,51 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| field/field_prop_well.png | docs/figures/field/field_castle_design_sheet.png；field_prop_well；648,346,58,57 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| field/field_prop_campfire_remains.png | docs/figures/field/field_castle_design_sheet.png；field_prop_campfire_remains；718,362,52,41 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| field/field_prop_tent.png | docs/figures/field/field_castle_design_sheet.png；field_prop_tent；774,343,57,62 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| field/field_prop_camp_tools.png | docs/figures/field/field_castle_design_sheet.png；field_prop_camp_tools；839,349,58,56 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| field/field_prop_broken_cart.png | docs/figures/field/field_castle_design_sheet.png；field_prop_broken_cart；528,446,65,59 | 40×32 | — | 32 | — | 20,31 | 否 | — | 原圖清理候選； |
| field/field_prop_barrel.png | docs/figures/field/field_castle_design_sheet.png；field_prop_barrel；603,453,42,52 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| field/field_prop_crate.png | docs/figures/field/field_castle_design_sheet.png；field_prop_crate；652,451,54,54 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_rock_cluster.png | docs/figures/field/field_castle_design_sheet.png；field_prop_rock_cluster；712,452,56,53 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| field/field_prop_bone.png | docs/figures/field/field_castle_design_sheet.png；field_prop_bone；775,453,40,52 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_dragon_bones.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dragon_bones；817,445,80,60 | 48×32 | — | 32 | — | 24,31 | 否 | — | 原圖清理候選； |
| field/field_prop_chest_closed.png | docs/figures/field/field_castle_design_sheet.png；field_prop_chest_closed；528,551,48,64 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_chest_open.png | docs/figures/field/field_castle_design_sheet.png；field_prop_chest_open；590,545,49,70 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_gather_light.png | docs/figures/field/field_castle_design_sheet.png；field_prop_gather_light；662,561,32,54 | 16×32 | — | 31 | — | 8,31 | 否 | — | 原圖清理候選； |
| field/field_prop_hidden_stairs.png | docs/figures/field/field_castle_design_sheet.png；field_prop_hidden_stairs；712,543,55,72 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_warp.png | docs/figures/field/field_castle_design_sheet.png；field_prop_warp；776,546,58,69 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_save_crystal.png | docs/figures/field/field_castle_design_sheet.png；field_prop_save_crystal；850,543,48,72 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_fence.png | docs/figures/field/field_castle_design_sheet.png；field_prop_fence；14,904,49,54 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| field/field_prop_hay_roll.png | docs/figures/field/field_castle_design_sheet.png；field_prop_hay_roll；70,905,39,53 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_straw_pile.png | docs/figures/field/field_castle_design_sheet.png；field_prop_straw_pile；117,905,41,53 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_farm_tools.png | docs/figures/field/field_castle_design_sheet.png；field_prop_farm_tools；164,903,40,55 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_water_trough.png | docs/figures/field/field_castle_design_sheet.png；field_prop_water_trough；210,905,42,53 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| field/field_prop_feeding_trough.png | docs/figures/field/field_castle_design_sheet.png；field_prop_feeding_trough；260,905,47,53 | 32×24 | — | 32 | — | 16,23 | 否 | — | 原圖清理候選； |
| field/field_prop_windmill_large.png | docs/figures/field/field_castle_design_sheet.png；field_prop_windmill_large；328,811,63,65 | 48×48 | — | 32 | — | 24,47 | 否 | — | 原圖清理候選； |
| field/field_prop_windmill_small.png | docs/figures/field/field_castle_design_sheet.png；field_prop_windmill_small；395,818,52,58 | 32×40 | — | 32 | — | 16,39 | 否 | — | 原圖清理候選； |
| field/field_prop_barn.png | docs/figures/field/field_castle_design_sheet.png；field_prop_barn；460,815,53,61 | 32×40 | — | 32 | — | 16,39 | 否 | — | 原圖清理候選； |
| field/field_prop_warehouse.png | docs/figures/field/field_castle_design_sheet.png；field_prop_warehouse；525,814,52,62 | 32×40 | — | 32 | — | 16,39 | 否 | — | 原圖清理候選； |
| field/field_prop_icicle.png | docs/figures/field/field_castle_design_sheet.png；field_prop_icicle；425,926,44,44 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_ore.png | docs/figures/field/field_castle_design_sheet.png；field_prop_ore；476,927,42,43 | 24×24 | — | 32 | — | 12,23 | 否 | — | 原圖清理候選； |
| field/field_prop_hole.png | docs/figures/field/field_castle_design_sheet.png；field_prop_hole；526,926,30,44 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| field/field_prop_ladder.png | docs/figures/field/field_castle_design_sheet.png；field_prop_ladder；555,926,31,44 | 16×32 | — | 30 | — | 8,31 | 否 | — | 原圖清理候選； |
| field/field_prop_snow_tree.png | docs/figures/field/field_castle_design_sheet.png；field_prop_snow_tree；676,785,58,49 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_snow_tree_spring.png | docs/figures/field/field_castle_design_sheet.png；field_prop_snow_tree；676,785,58,49 | 24×32 | — | 32 | — | 12,31 | 否 | spring | 季節候選，待SEVEN確認； |
| field/field_prop_snow_tree_summer.png | docs/figures/field/field_castle_design_sheet.png；field_prop_snow_tree；676,785,58,49 | 24×32 | — | 32 | — | 12,31 | 否 | summer | 季節候選，待SEVEN確認； |
| field/field_prop_snow_tree_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_prop_snow_tree；676,785,58,49 | 24×32 | — | 32 | — | 12,31 | 否 | autumn | 季節候選，待SEVEN確認； |
| field/field_prop_snow_tree_winter.png | docs/figures/field/field_castle_design_sheet.png；field_prop_snow_tree；676,785,58,49 | 24×32 | — | 32 | — | 12,31 | 否 | winter | 季節候選，待SEVEN確認； |
| field/field_prop_ice_cliff.png | docs/figures/field/field_castle_design_sheet.png；field_prop_ice_cliff；825,785,56,49 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| field/field_prop_dead_tree_large.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dead_tree_large；827,855,56,48 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| field/field_prop_dead_tree_large_spring.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dead_tree_large；827,855,56,48 | 24×32 | — | 32 | — | 12,31 | 否 | spring | 季節候選，待SEVEN確認； |
| field/field_prop_dead_tree_large_summer.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dead_tree_large；827,855,56,48 | 24×32 | — | 32 | — | 12,31 | 否 | summer | 季節候選，待SEVEN確認； |
| field/field_prop_dead_tree_large_autumn.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dead_tree_large；827,855,56,48 | 24×32 | — | 32 | — | 12,31 | 否 | autumn | 季節候選，待SEVEN確認； |
| field/field_prop_dead_tree_large_winter.png | docs/figures/field/field_castle_design_sheet.png；field_prop_dead_tree_large；827,855,56,48 | 24×32 | — | 32 | — | 12,31 | 否 | winter | 季節候選，待SEVEN確認； |
| field/field_tile_water_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_water_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 30 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_water_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_water_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_shallow_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_shallow；91,522,55,54 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_shallow_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_shallow；91,522,55,54 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_shallow_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_shallow；91,522,55,54 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_shallow_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_shallow；91,522,55,54 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_river_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_river_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_river_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_river_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_waterfall_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_waterfall；214,522,37,54 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_waterfall_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_waterfall；214,522,37,54 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_waterfall_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_waterfall；214,522,37,54 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_waterfall_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_waterfall；214,522,37,54 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_soil_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_soil；23,817,42,50 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_farm_soil_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_soil；23,817,42,50 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_soil_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_soil；23,817,42,50 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_soil_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_soil；23,817,42,50 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_sprout_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_sprout；72,817,45,50 | 16×16 | (1, 1) | 31 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_farm_sprout_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_sprout；72,817,45,50 | 16×16 | (1, 1) | 31 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_sprout_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_sprout；72,817,45,50 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_sprout_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_sprout；72,817,45,50 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_growing_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_growing；122,817,47,50 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_farm_growing_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_growing；122,817,47,50 | 16×16 | (1, 1) | 31 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_growing_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_growing；122,817,47,50 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_growing_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_growing；122,817,47,50 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_ripe_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_ripe；174,817,44,50 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_farm_ripe_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_ripe；174,817,44,50 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_ripe_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_ripe；174,817,44,50 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_ripe_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_ripe；174,817,44,50 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_harvested_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_harvested；223,817,45,50 | 16×16 | (1, 1) | 31 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_farm_harvested_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_harvested；223,817,45,50 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_harvested_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_harvested；223,817,45,50 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_farm_harvested_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_farm_harvested；223,817,45,50 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_cave_floor_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_cave_floor；329,926,45,44 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_cave_floor_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_cave_floor；329,926,45,44 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_cave_floor_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_cave_floor；329,926,45,44 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_cave_floor_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_cave_floor；329,926,45,44 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_cave_wall_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_cave_wall；380,926,41,44 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_cave_wall_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_cave_wall；380,926,41,44 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_cave_wall_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_cave_wall；380,926,41,44 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_cave_wall_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_cave_wall；380,926,41,44 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_snow_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_snow；615,785,53,49 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_snow_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_snow；615,785,53,49 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_snow_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_snow；615,785,53,49 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_snow_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_snow；615,785,53,49 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_ice_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_ice；751,785,53,49 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_ice_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_ice；751,785,53,49 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_ice_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_ice；751,785,53,49 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_ice_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_ice；751,785,53,49 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_autumn_foliage_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_autumn_foliage；615,855,53,48 | 16×16 | (1, 1) | 31 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_autumn_foliage_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_autumn_foliage；615,855,53,48 | 16×16 | (1, 1) | 31 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_autumn_foliage_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_autumn_foliage；615,855,53,48 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_autumn_foliage_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_autumn_foliage；615,855,53,48 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_fallen_leaves_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_fallen_leaves；678,855,54,48 | 16×16 | (1, 1) | 31 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_fallen_leaves_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_fallen_leaves；678,855,54,48 | 16×16 | (1, 1) | 31 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_fallen_leaves_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_fallen_leaves；678,855,54,48 | 16×16 | (1, 1) | 31 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_fallen_leaves_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_fallen_leaves；678,855,54,48 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_grass_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry_grass；751,855,53,48 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_dry_grass_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry_grass；751,855,53,48 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_grass_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry_grass；751,855,53,48 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_dry_grass_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_dry_grass；751,855,53,48 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_swamp_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_swamp；615,938,53,47 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_swamp_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_swamp；615,938,53,47 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_swamp_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_swamp；615,938,53,47 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_swamp_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_swamp；615,938,53,47 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_poison_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_poison；678,938,54,47 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_poison_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_poison；678,938,54,47 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_poison_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_poison；678,938,54,47 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_poison_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_poison；678,938,54,47 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_volcanic_rock_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_volcanic_rock；751,938,53,47 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_volcanic_rock_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_volcanic_rock；751,938,53,47 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_volcanic_rock_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_volcanic_rock；751,938,53,47 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_volcanic_rock_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_volcanic_rock；751,938,53,47 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_lava_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_lava；827,938,56,47 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| field/field_tile_lava_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_lava；827,938,56,47 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_lava_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_lava；827,938,56,47 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| field/field_tile_lava_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_lava；827,938,56,47 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_red_0.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_red；935,143,77,56 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| castle/castle_tile_red_1.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_red；935,143,77,56 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_red_2.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_red；935,143,77,56 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_red_3.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_red；935,143,77,56 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_stone_0.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_stone；1026,143,73,56 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| castle/castle_tile_stone_1.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_stone；1026,143,73,56 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_stone_2.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_stone；1026,143,73,56 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_stone_3.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_stone；1026,143,73,56 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_black_0.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_black；1114,143,65,56 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| castle/castle_tile_black_1.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_black；1114,143,65,56 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_black_2.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_black；1114,143,65,56 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_black_3.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_black；1114,143,65,56 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_magic_0.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_magic；1187,143,73,56 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| castle/castle_tile_magic_1.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_magic；1187,143,73,56 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_magic_2.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_magic；1187,143,73,56 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_magic_3.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_magic；1187,143,73,56 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_carpet_0.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_carpet；1275,143,68,56 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| castle/castle_tile_carpet_1.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_carpet；1275,143,68,56 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_carpet_2.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_carpet；1275,143,68,56 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_carpet_3.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_carpet；1275,143,68,56 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_purple_0.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_purple；1358,143,66,56 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| castle/castle_tile_purple_1.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_purple；1358,143,66,56 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_purple_2.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_purple；1358,143,66,56 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_purple_3.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_purple；1358,143,66,56 | 16×16 | (1, 1) | 31 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_grate_0.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_grate；1438,143,73,56 | 16×16 | (1, 1) | 32 | 0 | 0,0 | 否 | spring | 原圖清理候選； |
| castle/castle_tile_grate_1.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_grate；1438,143,73,56 | 16×16 | (1, 1) | 32 | 1 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_grate_2.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_grate；1438,143,73,56 | 16×16 | (1, 1) | 32 | 2 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_tile_grate_3.png | docs/figures/field/field_castle_design_sheet.png；castle_tile_grate；1438,143,73,56 | 16×16 | (1, 1) | 32 | 3 | 0,0 | 否 | spring | 補畫候選：原圖圖案位移／季節色替，待SEVEN確認； |
| castle/castle_prop_wall.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_wall；935,262,51,81 | 32×48 | — | 32 | — | 16,47 | 否 | — | 原圖清理候選； |
| castle/castle_prop_evil_wall.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_evil_wall；1004,262,58,81 | 32×48 | — | 32 | — | 16,47 | 否 | — | 原圖清理候選； |
| castle/castle_prop_pillar_large.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_pillar_large；1083,260,34,83 | 16×48 | — | 32 | — | 8,47 | 否 | — | 原圖清理候選； |
| castle/castle_prop_pillar_medium.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_pillar_medium；1136,268,31,75 | 16×40 | — | 32 | — | 8,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_pillar_black.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_pillar_black；1187,263,39,80 | 24×48 | — | 32 | — | 12,47 | 否 | — | 原圖清理候選； |
| castle/castle_prop_banner_large.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_banner_large；1242,263,47,80 | 24×48 | — | 32 | — | 12,47 | 否 | — | 原圖清理候選； |
| castle/castle_prop_banner_small.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_banner_small；1324,268,33,75 | 16×40 | — | 32 | — | 8,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_curtain.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_curtain；1378,263,66,80 | 48×48 | — | 32 | — | 24,47 | 否 | — | 原圖清理候選； |
| castle/castle_prop_chain.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_chain；1470,267,30,76 | 16×48 | — | 32 | — | 8,47 | 否 | — | 原圖清理候選； |
| castle/castle_prop_stairs_up.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_stairs_up；935,410,45,58 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_stairs_down.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_stairs_down；990,410,49,58 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_passage.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_passage；1053,410,50,58 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_passage_corner.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_passage_corner；1111,410,48,58 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_air_bridge.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_air_bridge；1172,410,51,58 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_pit.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_pit；1236,410,49,58 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_iron_gate.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_iron_gate；1296,410,52,58 | 32×40 | — | 32 | — | 16,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_magic_circle.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_magic_circle；1360,408,59,60 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_warp_floor.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_warp_floor；1434,408,64,60 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_throne.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_throne；933,536,64,66 | 32×40 | — | 32 | — | 16,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_candelabra_large.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_candelabra_large；1007,540,43,62 | 16×40 | — | 32 | — | 8,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_candelabra_small.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_candelabra_small；1068,550,34,52 | 16×32 | — | 32 | — | 8,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_flame_blue.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_flame_blue；1119,536,38,66 | 16×40 | — | 32 | — | 8,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_flame_purple.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_flame_purple；1172,536,35,66 | 16×40 | — | 32 | — | 8,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_skull.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_skull；1220,548,42,54 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_chest_ornate.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_chest_ornate；1271,545,46,57 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_magic_book.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_magic_book；1335,563,35,39 | 16×24 | — | 32 | — | 8,23 | 否 | — | 原圖清理候選； |
| castle/castle_prop_broken_column.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_broken_column；1381,539,32,63 | 16×40 | — | 32 | — | 8,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_broken_pillar.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_broken_pillar；1425,537,32,65 | 16×40 | — | 32 | — | 8,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_chain_cage.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_chain_cage；1470,537,43,65 | 24×40 | — | 32 | — | 12,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_statue_human.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_statue_human；936,666,41,59 | 24×40 | — | 32 | — | 12,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_statue_monster.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_statue_monster；986,665,51,60 | 24×40 | — | 32 | — | 12,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_gargoyle.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_gargoyle；1046,660,54,65 | 32×40 | — | 32 | — | 16,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_cult_statue.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_cult_statue；1109,660,49,65 | 24×40 | — | 32 | — | 12,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_coffin.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_coffin；1169,661,36,64 | 16×40 | — | 32 | — | 8,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_altar.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_altar；1216,661,41,64 | 24×40 | — | 32 | — | 12,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_blood_pool.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_blood_pool；1270,663,64,62 | 32×32 | — | 32 | — | 16,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_bone_pile.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_bone_pile；1342,673,45,52 | 24×32 | — | 32 | — | 12,31 | 否 | — | 原圖清理候選； |
| castle/castle_prop_demon_emblem.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_demon_emblem；1395,661,51,64 | 24×40 | — | 32 | — | 12,39 | 否 | — | 原圖清理候選； |
| castle/castle_prop_demon_door.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_demon_door；1460,660,49,65 | 24×40 | — | 32 | — | 12,39 | 否 | — | 原圖清理候選； |
| village/tile_water_edge_000.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 0 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_001.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 1 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_002.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 2 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_003.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 32 | 3 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_004.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 32 | 4 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_005.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 5 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_006.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 32 | 6 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_007.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 7 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_008.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 8 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_009.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 9 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_010.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 10 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_011.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 11 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_012.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 12 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_013.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 13 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_014.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 14 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_015.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 28 | 15 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_019.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 19 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_023.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 23 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_027.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 27 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_031.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 29 | 31 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_038.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 38 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_039.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 29 | 39 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_046.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 29 | 46 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_047.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 47 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_055.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 55 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_063.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 63 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_076.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 76 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_077.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 29 | 77 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_078.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 29 | 78 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_079.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 79 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_095.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 29 | 95 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_110.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 110 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_111.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 29 | 111 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_127.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 127 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_137.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 29 | 137 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_139.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 139 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_141.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 29 | 141 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_143.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 143 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_155.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 32 | 155 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_159.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 29 | 159 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_175.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 175 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_191.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 31 | 191 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_205.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 205 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_207.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 207 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_223.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 223 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_239.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 30 | 239 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_water_edge_255.png | docs/figures/village/village_design_sheet.png；tile_water；455,482,34,67 | 16×16 | (1, 1) | 32 | 255 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_000.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 0 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_001.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 30 | 1 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_002.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 30 | 2 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_003.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 3 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_004.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 30 | 4 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_005.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 30 | 5 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_006.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 6 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_007.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 7 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_008.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 30 | 8 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_009.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 9 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_010.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 10 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_011.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 11 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_012.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 12 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_013.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 13 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_014.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 14 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_015.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 15 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_019.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 19 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_023.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 23 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_027.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 27 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_031.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 31 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_038.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 38 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_039.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 39 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_046.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 46 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_047.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 47 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_055.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 55 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_063.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 63 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_076.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 76 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_077.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 77 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_078.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 78 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_079.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 79 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_095.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 95 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_110.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 110 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_111.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 111 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_127.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 127 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_137.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 137 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_139.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 139 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_141.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 141 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_143.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 143 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_155.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 155 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_159.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 159 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_175.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 175 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_191.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 191 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_205.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 31 | 205 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_207.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 207 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_223.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 223 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_239.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 239 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_water_edge_255.png | docs/figures/field/field_castle_design_sheet.png；field_tile_water；23,522,57,54 | 16×16 | (1, 1) | 32 | 255 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_000.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 0 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_001.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 1 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_002.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 2 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_003.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 29 | 3 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_004.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 4 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_005.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 5 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_006.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 6 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_007.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 29 | 7 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_008.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 8 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_009.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 9 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_010.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 29 | 10 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_011.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 11 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_012.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 12 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_013.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 29 | 13 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_014.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 14 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_015.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 15 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_019.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 19 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_023.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 23 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_027.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 27 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_031.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 31 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_038.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 38 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_039.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 39 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_046.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 46 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_047.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 47 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_055.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 29 | 55 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_063.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 63 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_076.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 76 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_077.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 77 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_078.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 29 | 78 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_079.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 79 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_095.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 95 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_110.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 110 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_111.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 111 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_127.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 127 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_137.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 137 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_139.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 30 | 139 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_141.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 141 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_143.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 143 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_155.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 155 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_159.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 159 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_175.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 175 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_191.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 191 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_205.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 28 | 205 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_207.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 31 | 207 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_223.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 223 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_239.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 239 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| field/field_tile_river_edge_255.png | docs/figures/field/field_castle_design_sheet.png；field_tile_river；158,522,37,54 | 16×16 | (1, 1) | 32 | 255 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_000.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 0 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_001.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 30 | 1 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_002.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 31 | 2 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_003.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 3 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_004.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 4 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_005.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 5 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_006.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 6 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_007.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 7 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_008.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 8 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_009.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 9 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_010.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 10 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_011.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 31 | 11 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_012.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 12 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_013.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 29 | 13 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_014.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 14 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_015.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 31 | 15 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_019.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 19 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_023.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 31 | 23 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_027.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 27 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_031.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 31 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_038.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 38 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_039.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 31 | 39 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_046.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 46 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_047.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 47 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_055.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 31 | 55 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_063.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 63 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_076.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 76 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_077.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 31 | 77 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_078.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 78 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_079.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 79 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_095.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 95 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_110.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 110 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_111.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 111 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_127.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 127 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_137.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 137 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_139.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 139 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_141.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 30 | 141 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_143.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 31 | 143 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_155.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 155 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_159.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 159 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_175.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 175 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_191.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 191 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_205.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 30 | 205 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_207.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 207 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_223.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 223 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_239.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 239 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| village/tile_clifftop_edge_255.png | docs/figures/village/village_design_sheet.png；tile_clifftop；577,490,17,16 | 16×16 | (1, 1) | 32 | 255 | 8,15 | 否 | — | 補畫候選：47鄰接遮罩拼接；bit0..7=N,E,S,W,NE,SE,SW,NW；1=同地形鄰格；接縫需遊戲拼圖驗收 |
| fx/fx_fire_blue_0.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_flame_blue；1119,536,38,66 | 16×40 | — | 32 | 0 | 8,39 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_fire_blue_1.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_flame_blue；1119,536,38,66 | 16×40 | — | 32 | 1 | 8,39 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_fire_blue_2.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_flame_blue；1119,536,38,66 | 16×40 | — | 32 | 2 | 8,39 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_fire_blue_3.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_flame_blue；1119,536,38,66 | 16×40 | — | 32 | 3 | 8,39 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_fire_purple_0.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_flame_purple；1172,536,35,66 | 16×40 | — | 32 | 0 | 8,39 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_fire_purple_1.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_flame_purple；1172,536,35,66 | 16×40 | — | 32 | 1 | 8,39 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_fire_purple_2.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_flame_purple；1172,536,35,66 | 16×40 | — | 32 | 2 | 8,39 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_fire_purple_3.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_flame_purple；1172,536,35,66 | 16×40 | — | 32 | 3 | 8,39 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_magic_circle_0.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_magic_circle；1360,408,59,60 | 32×32 | — | 32 | 0 | 16,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_magic_circle_1.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_magic_circle；1360,408,59,60 | 32×32 | — | 32 | 1 | 16,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_magic_circle_2.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_magic_circle；1360,408,59,60 | 32×32 | — | 32 | 2 | 16,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_magic_circle_3.png | docs/figures/field/field_castle_design_sheet.png；castle_prop_magic_circle；1360,408,59,60 | 32×32 | — | 32 | 3 | 16,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_torch_0.png | docs/figures/village/village_design_sheet.png；prop_torch；1270,638,38,63 | 16×32 | — | 31 | 0 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_torch_1.png | docs/figures/village/village_design_sheet.png；prop_torch；1270,638,38,63 | 16×32 | — | 31 | 1 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_torch_2.png | docs/figures/village/village_design_sheet.png；prop_torch；1270,638,38,63 | 16×32 | — | 31 | 2 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_torch_3.png | docs/figures/village/village_design_sheet.png；prop_torch；1270,638,38,63 | 16×32 | — | 31 | 3 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_flag_0.png | docs/figures/village/village_design_sheet.png；prop_flag；648,733,41,63 | 16×32 | — | 31 | 0 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_flag_1.png | docs/figures/village/village_design_sheet.png；prop_flag；648,733,41,63 | 16×32 | — | 31 | 1 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_flag_2.png | docs/figures/village/village_design_sheet.png；prop_flag；648,733,41,63 | 16×32 | — | 31 | 2 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_flag_3.png | docs/figures/village/village_design_sheet.png；prop_flag；648,733,41,63 | 16×32 | — | 31 | 3 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_gather_0.png | docs/figures/field/field_castle_design_sheet.png；field_prop_gather_light；662,561,32,54 | 16×32 | — | 31 | 0 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_gather_1.png | docs/figures/field/field_castle_design_sheet.png；field_prop_gather_light；662,561,32,54 | 16×32 | — | 30 | 1 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_gather_2.png | docs/figures/field/field_castle_design_sheet.png；field_prop_gather_light；662,561,32,54 | 16×32 | — | 31 | 2 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_gather_3.png | docs/figures/field/field_castle_design_sheet.png；field_prop_gather_light；662,561,32,54 | 16×32 | — | 30 | 3 | 8,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_warp_0.png | docs/figures/field/field_castle_design_sheet.png；field_prop_warp；776,546,58,69 | 24×32 | — | 32 | 0 | 12,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_warp_1.png | docs/figures/field/field_castle_design_sheet.png；field_prop_warp；776,546,58,69 | 24×32 | — | 32 | 1 | 12,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_warp_2.png | docs/figures/field/field_castle_design_sheet.png；field_prop_warp；776,546,58,69 | 24×32 | — | 32 | 2 | 12,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_warp_3.png | docs/figures/field/field_castle_design_sheet.png；field_prop_warp；776,546,58,69 | 24×32 | — | 32 | 3 | 12,31 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_waterfall_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_waterfall；214,522,37,54 | 16×16 | (1, 1) | 32 | 0 | 8,15 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_waterfall_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_waterfall；214,522,37,54 | 16×16 | (1, 1) | 32 | 1 | 8,15 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_waterfall_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_waterfall；214,522,37,54 | 16×16 | (1, 1) | 32 | 2 | 8,15 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_waterfall_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_waterfall；214,522,37,54 | 16×16 | (1, 1) | 32 | 3 | 8,15 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_lava_0.png | docs/figures/field/field_castle_design_sheet.png；field_tile_lava；827,938,56,47 | 16×16 | (1, 1) | 32 | 0 | 8,15 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_lava_1.png | docs/figures/field/field_castle_design_sheet.png；field_tile_lava；827,938,56,47 | 16×16 | (1, 1) | 30 | 1 | 8,15 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_lava_2.png | docs/figures/field/field_castle_design_sheet.png；field_tile_lava；827,938,56,47 | 16×16 | (1, 1) | 32 | 2 | 8,15 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| fx/fx_lava_3.png | docs/figures/field/field_castle_design_sheet.png；field_tile_lava；827,938,56,47 | 16×16 | (1, 1) | 32 | 3 | 8,15 | 否 | — | 補畫候選：4幀色階脈動，未完成形變動畫驗收；6fps，循環；只做顏色脈動，不宣稱完成旗面／水流／火焰形變 |
| compare/bld_armor_shop_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_barracks_compare.png | 來源／對照／驗證 | 384×129 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_cemetery_compare.png | 來源／對照／驗證 | 996×130 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_church_compare.png | 來源／對照／驗證 | 387×181 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_demon_castle_compare.png | 來源／對照／驗證 | 396×140 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_farm_hut_one_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_farm_hut_two_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_guild_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_herbalist_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_house_blue_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_house_brown_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_house_green_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_house_red_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_house_yellow_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_inn_compare.png | 來源／對照／驗證 | 384×131 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_item_shop_compare.png | 來源／對照／驗證 | 384×130 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_library_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_manor_compare.png | 來源／對照／驗證 | 384×132 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_market_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_small_tower_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_smith_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_tavern_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_watchtower_compare.png | 來源／對照／驗證 | 384×136 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_watchtower_flag_compare.png | 來源／對照／驗證 | 384×177 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_weapon_shop_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/bld_windmill_compare.png | 來源／對照／驗證 | 384×134 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_air_bridge_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_altar_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_banner_large_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_banner_small_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_blood_pool_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_bone_pile_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_broken_column_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_broken_pillar_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_candelabra_large_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_candelabra_small_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_chain_cage_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_chain_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_chest_ornate_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_coffin_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_cult_statue_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_curtain_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_demon_door_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_demon_emblem_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_evil_wall_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_flame_blue_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_flame_purple_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_gargoyle_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_iron_gate_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_magic_book_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_magic_circle_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_passage_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_passage_corner_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_pillar_black_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_pillar_large_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_pillar_medium_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_pit_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_skull_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_stairs_down_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_stairs_up_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_statue_human_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_statue_monster_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_throne_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_wall_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_prop_warp_floor_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_tile_black_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_tile_carpet_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_tile_grate_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_tile_magic_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_tile_purple_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_tile_red_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/castle_tile_stone_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_altar_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_barn_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_barrel_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_berries_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_bone_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_boulder_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_bridge_rope_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_bridge_stone_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_bridge_wood_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_broadleaf_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_broken_cart_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_bush_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_camp_tools_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_campfire_remains_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_cave_entrance_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_chest_closed_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_chest_open_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_cliff_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_clifftop_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_conifer_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_crate_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_dead_tree_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_dead_tree_large_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_dragon_bones_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_fallen_log_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_fallen_signpost_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_farm_tools_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_feeding_trough_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_fence_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_flowers_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_gather_light_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_hay_roll_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_hidden_stairs_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_hole_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_ice_cliff_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_icicle_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_ladder_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_ledge_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_mountain_large_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_mountain_small_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_mushrooms_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_ore_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_pebbles_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_rock_cluster_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_rock_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_rock_large_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_rock_small_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_rock_wall_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_ruin_column_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_save_crystal_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_shrine_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_signpost_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_small_tree_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_snow_tree_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_stele_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_stone_arch_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_straw_pile_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_stump_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_tallgrass_big_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_tallgrass_small_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_tent_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_warehouse_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_warp_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_water_trough_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_well_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_windmill_large_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_prop_windmill_small_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_autumn_foliage_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_cave_floor_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_cave_wall_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_dirt_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_dry_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_dry_grass_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_fallen_leaves_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_farm_growing_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_farm_harvested_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_farm_ripe_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_farm_soil_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_farm_sprout_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_flowers_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_grass_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_grass_rock_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_ice_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_lava_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_poison_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_river_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_rocky_plain_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_rutted_road_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_sand_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_sand_grass_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_shallow_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_snow_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_swamp_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_tallgrass_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_volcanic_rock_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_water_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_waterfall_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/field_tile_wetland_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_anvil_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_barrel_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_beehive_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_bench_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_berries_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_bones_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_bush_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_cage_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_clothesline_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_crate_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_crate_stack_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_cross_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_fence_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_firewood_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_flag_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_flower_garden_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_flowerpot_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_gravestone_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_handcart_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_haystack_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_logs_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_monster_urn_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_mushroom_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_noticeboard_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_pebbles_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_pot_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_puddle_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_sack_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_scarecrow_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_signpost_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_stone_lantern_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_streetlamp_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_stump_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_torch_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_vegetable_garden_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_water_trough_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_well_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/prop_wheelbarrow_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_cliff_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_clifftop_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_dark_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_dirt_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_farm_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_flowers_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_grass_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_ice_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_lava_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_lava_rock_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_poison_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_sand_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_snow_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_stone_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tile_water_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tree_broadleaf_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tree_bush_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tree_conifer_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tree_dead_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| compare/tree_snow_compare.png | 來源／對照／驗證 | 384×128 | — | — | — | — | — | — | 不是正式遊戲素材 |
| palette/palette_castle.png | 來源／對照／驗證 | 16×16 | — | — | — | — | — | — | 不是正式遊戲素材 |
| palette/palette_field.png | 來源／對照／驗證 | 16×16 | — | — | — | — | — | — | 不是正式遊戲素材 |
| palette/palette_village.png | 來源／對照／驗證 | 16×16 | — | — | — | — | — | — | 不是正式遊戲素材 |
| review/castle_overview.png | 來源／對照／驗證 | 1024×1152 | — | — | — | — | — | — | 不是正式遊戲素材 |
| review/field_overview.png | 來源／對照／驗證 | 1024×3072 | — | — | — | — | — | — | 不是正式遊戲素材 |
| review/village_overview.png | 來源／對照／驗證 | 1024×2176 | — | — | — | — | — | — | 不是正式遊戲素材 |
| source/build_world_candidates.py | 來源／對照／驗證 | — | — | — | — | — | — | — | 不是正式遊戲素材 |
| source/field_castle_design_sheet.png | 來源／對照／驗證 | 1536×1024 | — | — | — | — | — | — | 不是正式遊戲素材 |
| source/source_catalog.json | 來源／對照／驗證 | — | — | — | — | — | — | — | 不是正式遊戲素材 |
| source/village_design_sheet.png | 來源／對照／驗證 | 1536×1024 | — | — | — | — | — | — | 不是正式遊戲素材 |
| source/world_catalog.py | 來源／對照／驗證 | — | — | — | — | — | — | — | 不是正式遊戲素材 |
| validation.json | 來源／對照／驗證 | — | — | — | — | — | — | — | 不是正式遊戲素材 |
| manifest.md | 本清單 | — | — | — | — | — | — | — | — |
