# 製作與重建說明

場景使用內建 imagegen，未使用 CLI/API。UI、紋章與 Logo 以附上的 build_assets.py 製作。原始生成圖保存在本資料夾。

## 生成提示詞集

共通要求：Original 16-bit SFC era fantasy JRPG pixel art inspired by DQ6 and FF5 era, not copied game assets. Crisp handcrafted pixel clusters, maximum 64 colors, no anti-aliasing, no blur, no text, no letters, no UI, no watermark. Full bleed 16:9, target native 640x360. Warm wistful mood suitable for children. Production assets use nearest-neighbor resampling and palette reduction without dithering to enforce dimensions and color count.

1. Title: rich cobalt sky, blocky cumulus clouds, wooded cliffs, warm orange-roof village at lower left, blue soul river and stone bridge across center, celestial golden balance high in the sky, castle on distant upper right cliff; upper center available for logo and lower right calm for menu.
2. Opening 01: huge luminous golden balance of light and darkness above sea of clouds under cobalt stars. One pan sunlight, the other violet starlight.
3. Opening 02: cozy orange-roof village square at morning, baker at bread shop, tiny blacksmith sharpening sword, villagers praying beside fountain, green cliffs and flowers.
4. Opening 03: blue ethereal river at night through gentle forest cliffs; glowing abstract soul wisps downstream toward luminous new sapling; peaceful reincarnation.
5. Opening 04: majestic empty dark violet throne on eastern highland terrace, distant fantasy castle, magenta dusk and small gold stars; child-friendly mystery.
6. Opening 05: God's elevated view down on orange-roof village and winding river, green forests and mountain horizon, golden dawn; no visible human god; overhead angled JRPG map perspective.

Opening common: lower quarter y=270..360 very dark quiet navy, no important scene elements, no text. Final files enforce a solid dark dialogue safe area.

## 魔王城修正提示詞

Edit only the castle on the upper-right cliff of this reference image. It is the DEMON KING'S CASTLE, not a bright white friendly palace. Replace its white masonry with very dark indigo and violet-black stone, more sharply pointed spires, subtle magenta window lights and a faint violet shadow aura, a stern mysterious silhouette. Child-friendly majestic darkness, no gore, no skulls, no text. Preserve EXACTLY the rest of the image: blue sky, gold celestial scales, village lower left, river, stone bridge, cliff shapes, framing, pixel art style, color mood, composition. Upper-right castle position and its footprint stay unchanged. Original crisp 16-bit SFC fantasy JRPG pixel art, no antialiasing, no blur, no UI. Output one 16:9 full background.

## 原檔保存與重建

原檔包解壓縮後把 src 放進正式交付的 rinne_title_sfc 資料夾。Python 3 與 Pillow 可執行 build_assets.py 重建 PNG、SVG、manifest 與驗證報告。Logo 字形建立時使用 Windows MingLiU 與 Yu Mincho；交付 SVG 已是 path，不依賴字型。背景為靜態完整場景加獨立星光，沒有可移動的五層視差背景。
