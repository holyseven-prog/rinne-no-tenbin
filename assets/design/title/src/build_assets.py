from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json, math, random, zipfile, hashlib

HERE=Path(__file__).resolve().parent
ROOT=HERE.parent
OUT=HERE.parent if HERE.name=='src' else ROOT/'outputs'/'rinne_title_sfc_v2'
for folder in ['title','save','settings','mode','god','opening','ui','mockup','src']:(OUT/folder).mkdir(parents=True,exist_ok=True)
records=[]
CUTS={}
NAVY='#071b3c'; BLUE='#103c79'; GOLD='#d7aa49'; LIGHT='#ffe7a2'; WHITE='#eef5ff'
def save(im,path,screen,use,pos='—',layer='—',slice='—',note=''):
 p=OUT/path
 if im.mode=='RGB':im=im.quantize(colors=64,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE)
 im.save(p,optimize=True)
 records.append([path,screen,use,f'{im.width}×{im.height}',pos,layer,slice,note])
 if slice!='—':CUTS[path]=tuple(map(int,slice.split(',')))
def panel(path,state='normal',screen='共用',use='九宮格框',size=(96,64),cut=14):
 im=Image.new('RGBA',size);d=ImageDraw.Draw(im);w,h=size
 colors={'normal':(NAVY,GOLD,LIGHT),'hover':(BLUE,LIGHT,WHITE),'press':('#403318',GOLD,LIGHT),'disabled':('#303744','#727b87','#a7aeb8'),'selected':(BLUE,LIGHT,WHITE),'empty':('#172332','#827b65','#b0a789')}
 fill,edge,hi=colors[state]
 d.rectangle((2,2,w-3,h-3),fill=fill,outline=edge,width=1)
 d.rectangle((4,4,w-5,h-5),outline=hi,width=1)
 d.rectangle((6,6,w-7,h-7),outline='#405378',width=1)
 for x,y,sx,sy in [(8,8,1,1),(w-9,8,-1,1),(8,h-9,1,-1),(w-9,h-9,-1,-1)]:
  d.line([(x+sx*5,y),(x,y),(x,y+sy*5)],fill=edge,width=1)
  d.polygon([(x,y-sy*3),(x+sx*3,y),(x,y+sy*3),(x-sx*3,y)],fill=hi)
  d.point((x+sx*5,y+sy*5),fill=hi)
 if state=='hover':d.line((14,7,w-15,7),fill='#74b9ef')
 cuts=(13,14,13,14) if any(k in path for k in ['ui_btn_small_','ui_btn_back_','settings_tab_']) else (0,14,0,14) if 'mode_badge_recommended' in path else (14,14,14,14)
 padding='8,16,8,16' if h<=32 else '16,16,16,16'
 extra='；高度固定24，只能水平伸縮' if 'mode_badge_recommended' in path else ''
 save(im,path,screen,use,slice=','.join(map(str,cuts)),note=f'RGBA；外緣2px透明；內距{padding}；文字色 {hi}；中心可伸縮'+extra)
 return im
for state in ['normal','hover','press','disabled']:panel(f'ui/ui_btn_menu_{state}.png',state,size=(160,32),use='選單按鈕四狀態')
for state in ['normal','hover','press','disabled']:panel(f'ui/ui_btn_small_{state}.png',state,size=(80,28))
panel('ui/ui_frame_window.png');panel('ui/ui_frame_dialog.png',size=(96,48));panel('title/title_frame_menu.png',size=(96,96),screen='②',use='選單外框')
panel('ui/ui_frame_dialog_dark.png','empty',size=(96,48),use='暗色對話框九宮格')
for state in ['normal','hover','press','disabled']:panel(f'ui/ui_btn_back_{state}.png',state,size=(80,28),use='返回按鈕')
for state in ['normal','empty','selected','disabled']:panel(f'save/save_slot_{state}.png',state,screen='③',use='存檔格',size=(160,64))
for state in ['normal','selected']:panel(f'god/god_card_{state}.png',state,screen='⑥',use='神格卡片',size=(96,128))
for mode in ['normal','easy']:
 for state in ['normal','selected']:panel(f'mode/mode_card_{mode}_{state}.png',state,screen='⑤',use=f'{mode}模式卡',size=(128,160))
for kind in ['normal','easy']:
 im=Image.new('RGBA',(64,64));d=ImageDraw.Draw(im)
 if kind=='normal':
  d.polygon([(32,5),(36,12),(36,38),(32,44),(28,38),(28,12)],fill=WHITE,outline='#8dc4e5')
  d.rectangle((21,38,43,41),fill=GOLD);d.rectangle((30,42,34,54),fill=GOLD);d.rectangle((27,54,37,57),fill=LIGHT)
 else:
  d.line((32,54,32,27),fill='#bde88c',width=3)
  d.polygon([(31,38),(18,35),(11,23),(23,24),(30,30)],fill='#bde88c',outline='#528956')
  d.polygon([(34,30),(40,19),(54,15),(51,27),(41,33)],fill='#d8f5a4',outline='#528956')
  d.line((17,26,30,36),fill=WHITE);d.line((48,20,35,29),fill=WHITE)
 save(im,f'mode/mode_icon_{kind}.png','⑤','普通之劍／簡單新芽',note='RGBA；文字由程式顯示；置於卡片上方')
for state in ['normal','selected']:panel(f'settings/settings_tab_{state}.png',state,screen='④',use='分頁',size=(80,28))
for state in ['on','off']:
 im=Image.new('RGBA',(48,24));d=ImageDraw.Draw(im)
 d.rectangle((2,3,45,20),fill=BLUE if state=='on' else '#303744',outline=GOLD)
 x=31 if state=='on' else 5; d.rectangle((x,6,x+11,17),fill=LIGHT,outline=WHITE)
 save(im,f'settings/settings_toggle_{state}.png','④','開關',note='無文字；程式顯示 ON/OFF；2px透明邊界')
im=Image.new('RGBA',(96,12));d=ImageDraw.Draw(im);d.rectangle((2,4,93,7),fill=NAVY,outline=GOLD)
save(im,'settings/settings_slider_track.png','④','滑桿軌道',slice='2,6,2,6',note='水平伸縮；2px透明邊界')
im=Image.new('RGBA',(16,16));d=ImageDraw.Draw(im);d.polygon([(8,2),(13,6),(13,10),(8,13),(2,10),(2,6)],fill='#67b3e3',outline=WHITE);d.rectangle((6,5,9,9),fill=LIGHT)
save(im,'settings/settings_slider_thumb.png','④','滑桿把手',note='2px透明邊界')
panel('mode/mode_badge_recommended.png','selected',screen='⑤',use='推薦標記底板（文字由程式顯示）',size=(56,24),cut=8)

def emblem(kind,n):
 im=Image.new('RGBA',(32,32));d=ImageDraw.Draw(im)
 c={'mercy':'#b8edff','order':LIGHT,'chaos':'#ca78ef'}[kind]
 d.polygon([(16,2),(27,9),(29,19),(23,27),(16,29),(8,27),(2,19),(4,9)],fill={'mercy':'#103c79','order':'#453311','chaos':'#301052'}[kind],outline=GOLD)
 if kind=='mercy':
  wing=[(14,14),(4,6),(5,12),(8,16),(4,13),(6,19),(11,23),(14,23)]
  d.polygon(wing,fill=WHITE);d.polygon([(32-x,y) for x,y in wing],fill=WHITE)
  for pts in [[(6,10),(12,17)],[(7,17),(12,21)]]:
   d.line(pts,fill='#3989bc');d.line([(32-x,y) for x,y in pts],fill='#3989bc')
  d.polygon([(16,6),(18,9),(16,12),(14,9)],fill=WHITE)
  d.polygon([(16,13),(19,21),(16,26),(13,21)],fill=WHITE)
  d.point((16,3),fill=LIGHT)
 elif kind=='order':
  d.line((16,5,16,24),fill=c,width=2);d.line((7,10,25,10),fill=c,width=2)
  for x in [8,24]:d.line((x,11,x-4,20),fill=c);d.line((x,11,x+4,20),fill=c);d.line((x-4,20,x+4,20),fill=c,width=2)
  d.rectangle((11,25,21,26),fill=c);d.polygon([(16,3),(19,6),(16,9),(13,6)],fill=WHITE)
 else:
  pts=[]
  for i in range(42):
   t=i/41*math.pi*3.5;r=11*(1-i/50);pts.append((round(16+math.cos(t)*r),round(16+math.sin(t)*r)))
  d.line(pts,fill=c,width=3)
  for x,y in [(6,5),(25,6),(26,24)]:d.polygon([(x,y-2),(x+2,y),(x,y+2),(x-2,y)],fill=LIGHT)
 if n>32:
  im=im.resize((64,64),Image.Resampling.NEAREST)
  base={'mercy':'#103c79','order':'#453311','chaos':'#301052'}[kind]
  shades={'mercy':['#14569b','#1a86b5','#3aa5c8','#12385f'],'order':['#725014','#ab7722','#d2a43c','#50401b'],'chaos':['#4c1b79','#722ca0','#943cc0','#361851']}[kind]
  from PIL import ImageColor
  target=ImageColor.getrgb(base)+(255,)
  for y in range(64):
   for x in range(64):
    if im.getpixel((x,y))==target:
     a=math.atan2(y-32,x-32);r=math.hypot(x-32,y-32)
     col=NAVY if abs(math.sin(a*6))<0.10 or 23<r<24 else shades[(int((a+math.pi)*6/math.pi)+int(r//10))%4]
     im.putpixel((x,y),ImageColor.getrgb(col)+(255,))
 return im.resize((n,n),Image.Resampling.NEAREST)
for kind in ['mercy','order','chaos']:
 for n in [128,64,32]:save(emblem(kind,n),f'god/god_emblem_{kind}_{n}.png','⑥',kind+'神紋章',note='RGBA；最近鄰像素；透明外緣≥2px')

def font(n,ja=False):return ImageFont.truetype('C:/Windows/Fonts/yumindb.ttf' if ja else 'C:/Windows/Fonts/mingliu.ttc',n)
def svg_runs(im,path):
 # SVG paths contain only pixel outlines, no text or font dependency.
 groups={}
 for y in range(im.height):
  x=0
  while x<im.width:
   c=im.getpixel((x,y));end=x+1
   if c[3]==0:x=end;continue
   while end<im.width and im.getpixel((end,y))==c:end+=1
   groups.setdefault(c,[]).append(f'M{x} {y}h{end-x}v1h-{end-x}z');x=end
 s=f'<svg xmlns="http://www.w3.org/2000/svg" width="{im.width}" height="{im.height}" viewBox="0 0 {im.width} {im.height}" shape-rendering="crispEdges">'
 for c,segments in groups.items():s+=f'<path fill="#{c[0]:02x}{c[1]:02x}{c[2]:02x}" d="'+''.join(segments)+'"/>'
 (OUT/path).write_text(s+'</svg>',encoding='utf-8')
 records.append([path,'②','Logo 像素輪廓 SVG',f'{im.width}×{im.height}','160,64','10／淡入','—','全部 path；無字型依賴'])
for lang,text in [('ja','輪廻の天秤'),('zh','輪迴之天秤')]:
 for plain in [False,True]:
  # Native 480x112 rasterization: no resizing of any text mask.
  im=Image.new('RGBA',(480,112))
  f=font(58,lang=='ja');box=f.getbbox(text);x=(480-(box[2]-box[0]))//2
  mask=Image.new('1',im.size);ImageDraw.Draw(mask).text((x,24-box[1]),text,font=f,fill=1)
  shadow=Image.new('RGBA',im.size,'#081d3f')
  for ox,oy in [(a,b) for a in range(-1,2) for b in range(-1,2)]:im.paste(shadow,(ox,oy),mask)
  im.paste(Image.new('RGBA',im.size,LIGHT),(0,0),mask)
  if not plain:
   d=ImageDraw.Draw(im);d.line((160,13,320,13),fill=GOLD);d.line((240,3,240,20),fill=GOLD)
   for cx in [176,304]:d.line((cx,13,cx-6,20),fill=GOLD);d.line((cx,13,cx+6,20),fill=GOLD);d.line((cx-6,20,cx+6,20),fill=LIGHT)
  eng='SCALE OF REINCARNATION';ef=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',11);b=ef.getbbox(eng)
  m=Image.new('1',im.size);ImageDraw.Draw(m).text(((480-(b[2]-b[0]))//2,92-b[1]),eng,font=ef,fill=1)
  for ox,oy in [(a,b) for a in range(-1,2) for b in range(-1,2)]:im.paste(shadow,(ox,oy),m)
  im.paste(Image.new('RGBA',im.size,WHITE),(0,0),m)
  stem=f'title/title_logo_{lang}'+('_plain' if plain else '')
  save(im,stem+'.png','②',text+(' 標題專用無天秤 Logo' if plain else ' 含天秤 Logo'),'160,64','10／淡入',note='原生480×112；1px像素格；只以2倍顯示960×224；PNG-32二值透明；迴=U+8FF4，廻=U+5EFB')
  svg_runs(im,stem+'.svg')

def normalize(path):
 im=Image.open(path).convert('RGB').resize((640,360),Image.Resampling.NEAREST)
 return im.quantize(colors=64,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE).convert('RGB')
inputs={k:str(OUT/'src'/(k+'_original.png')) for k in ['title','opening_01_balance','opening_02_village','opening_03_river','opening_04_throne','opening_05_overlook']}
if 'title' not in inputs:raise SystemExit('UI and logos built; awaiting generated backgrounds')
bg=normalize(inputs['title'])
save(bg,'title/title_bg_0_scene.png','①②','靜態村莊天空完整背景','0,0','0／不動',note='640×360；64色；不做視差，避免假分層')
fx=Image.new('RGBA',(640,360));d=ImageDraw.Draw(fx)
for x,y in [(78,44),(212,28),(386,63),(552,25),(320,122)]:d.line((x-2,y,x+2,y),fill=LIGHT);d.line((x,y-2,x,y+2),fill=LIGHT)
save(fx,'title/title_bg_1_sparkles.png','①②','獨立星光層','0,0','1／程式整層閃爍，2秒週期',note='與背景相同畫布；不可捲動；alpha由程式控制')
for screen,folder in [('③','save'),('④','settings'),('⑤','mode'),('⑥','god')]:
 im=bg.copy();overlay=Image.new('RGB',im.size,NAVY);im=Image.blend(im,overlay,0.6).quantize(colors=64,dither=Image.Dither.NONE).convert('RGB')
 save(im,f'{folder}/{folder}_bg.png',screen,'暗化村莊背景','0,0','0／不動',note='靜態；64色')
for name in ['opening_01_balance','opening_02_village','opening_03_river','opening_04_throne','opening_05_overlook']:
 im=normalize(inputs[name]);d=ImageDraw.Draw(im);d.rectangle((0,270,639,359),fill=NAVY)
 # Requantize after dark dialogue safe area to stay within 64 colors.
 im=im.quantize(colors=64,dither=Image.Dither.NONE).convert('RGB')
 save(im,f'opening/{name}.png','⑦','無文字劇情背景','0,0','0／不動',note='下方90px純暗文字安全區；64色')

def nine(im,size,cuts):
 w,h=im.size;W,H=size;t,r,b,l=cuts
 assert w>l+r and h>t+b and W>=l+r and H>=t+b
 if t==b==0:assert H==h,'Horizontal-only nine-slice must retain native height'
 out=Image.new('RGBA',size)
 xs=[0,l,w-r,w];ys=[0,t,h-b,h];X=[0,l,W-r,W];Y=[0,t,H-b,H]
 for i in range(3):
  for j in range(3):
   if xs[i+1]>xs[i] and ys[j+1]>ys[j] and X[i+1]>X[i] and Y[j+1]>Y[j]:
    out.paste(im.crop((xs[i],ys[j],xs[i+1],ys[j+1])).resize((X[i+1]-X[i],Y[j+1]-Y[j]),Image.Resampling.NEAREST),(X[i],Y[j]))
 return out

def asset(p):return Image.open(OUT/p).convert('RGBA')
def place(im,p,xy,size=None):
 a=asset(p);a=nine(a,size,CUTS[p]) if size else a;im.alpha_composite(a,xy)
def txt(im,xy,s,n=12,color=WHITE):
 mask=Image.new('1',im.size);ImageDraw.Draw(mask).text(xy,s,font=font(n),fill=1);im.paste(Image.new('RGBA',im.size,color),(0,0),mask)
def mock(name,im):save(im.convert('RGB'),f'mockup/{name}.png','參考','完成畫面示意（含假文字）',note='僅參考；不可作為runtime背景')
# Logo runtime scale is 480x112 at native screen resolution.
im=bg.convert('RGBA');im.alpha_composite(asset('title/title_logo_zh_plain.png'),(80,32))
place(im,'title/title_frame_menu.png',(450,184),(174,148))
for i,s in enumerate(['新遊戲','繼續遊戲','設定','語言']):place(im,'ui/ui_btn_menu_'+('hover' if i==0 else 'normal')+'.png',(458,190+i*36));txt(im,(506,198+i*36),s)
txt(im,(12,341),'© SEVEN  ·  設計驗收示意',10);mock('title_zh',im)
ja=bg.convert('RGBA');ja.alpha_composite(asset('title/title_logo_ja_plain.png'),(80,32))
place(ja,'title/title_frame_menu.png',(450,184),(174,148))
for i,s in enumerate(['はじめから','つづきから','設定','言語']):place(ja,'ui/ui_btn_menu_'+('hover' if i==0 else 'normal')+'.png',(458,190+i*36));txt(ja,(493,198+i*36),s)
txt(ja,(12,341),'© SEVEN  ·  MOCKUP',10);mock('title_ja',ja)
im=bg.convert('RGBA');txt(im,(224,310),'點擊或按下任意鍵開始',16);mock('boot',im)
im=asset('save/save_bg.png');place(im,'ui/ui_frame_window.png',(56,26),(528,308));txt(im,(272,42),'讀取存檔',18)
for i in range(4):
 x=76+(i%2)*246;y=80+(i//2)*110;place(im,'save/save_slot_'+('selected' if i==0 else 'normal' if i<3 else 'empty')+'.png',(x,y),(232,94));txt(im,(x+14,y+12),f'存檔 {i+1}  '+('第 2 世・第 4 年' if i<3 else '空的存檔'),12)
 if i<3:txt(im,(x+14,y+34),'春季／慈愛之神\n遊玩 02:35\n2026/10/14  12:00',11)
mock('save',im)
im=asset('settings/settings_bg.png');place(im,'ui/ui_frame_window.png',(90,30),(460,300));txt(im,(287,43),'設定',18)
for i,s in enumerate(['基本','音量','遊戲','語言']):place(im,'settings/settings_tab_'+('selected' if i==0 else 'normal')+'.png',(112+i*104,76));txt(im,(135+i*104,82),s)
for i,s in enumerate(['BGM','SE','文字速度','遊戲速度']):
 y=126+i*38;txt(im,(118,y),s);place(im,'settings/settings_slider_track.png',(290,y+2),(196,12));place(im,'settings/settings_slider_thumb.png',(395,y))
txt(im,(118,285),'自動文字');place(im,'settings/settings_toggle_on.png',(290,281));mock('settings',im)
im=asset('mode/mode_bg.png');txt(im,(270,24),'選擇模式',18)
for i,(m,s) in enumerate([('normal','普通'),('easy','簡單')]):
 x=104+i*240;place(im,f'mode/mode_card_{m}_'+('selected' if i else 'normal')+'.png',(x,65),(192,250));place(im,f'mode/mode_icon_{m}.png',(x+64,91));txt(im,(x+76,172),s,18);txt(im,(x+18,209),'標準體驗' if i==0 else '信仰力較多\n魔王軍較弱\n提示較多',14)
 if i:place(im,'mode/mode_badge_recommended.png',(x+128,67));txt(im,(x+138,72),'推薦',12)
mock('mode',im)
im=asset('god/god_bg.png');txt(im,(270,16),'選擇神格',18)
for i,(g,s,desc) in enumerate([('mercy','慈愛之神','溫柔與守護\n恩寵消耗較少\n初始信仰力最高'),('order','秩序之神','公正與天秤\n神諭消耗較少\n神諭容易成功'),('chaos','混沌之神','狂野與變化\n試煉消耗較少\n勢力操作較少\n結果起伏很大')]):
 x=36+i*200;place(im,'god/god_card_'+('selected' if i==0 else 'normal')+'.png',(x,50),(168,244));im.alpha_composite(emblem(g,64),(x+52,72));txt(im,(x+44,148),s,16);txt(im,(x+18,178),'初始信仰力：—',12);txt(im,(x+18,202),desc,12)
place(im,'ui/ui_btn_back_normal.png',(38,315));txt(im,(62,322),'返回');place(im,'ui/ui_btn_menu_hover.png',(442,312));txt(im,(459,321),'就決定是這位神');mock('god',im)
story=['這個世界有一座天秤。光與暗分擔彼此的重量。','人們祈禱，神傾聽。琉米耶鎮今天也一樣。','靈魂順著河流，依因果的重量，再度轉生。','東邊的高地上，有一把魔王之席。','你是神。你擁有聆聽的耳朵，與微薄的信仰力。']
for i,name in enumerate(['opening_01_balance','opening_02_village','opening_03_river','opening_04_throne','opening_05_overlook']):
 im=asset(f'opening/{name}.png');place(im,'ui/ui_frame_dialog.png',(16,278),(608,70));txt(im,(30,295),story[i],14);txt(im,(569,328),'下一頁',10);mock(name,im)
overview=Image.new('RGB',(1280,720),NAVY)
names=['boot','title_zh','title_ja','save','settings','mode','god','opening_01_balance','opening_02_village','opening_03_river','opening_04_throne','opening_05_overlook']
for i,n in enumerate(names):overview.paste(asset('mockup/'+n+'.png').convert('RGB').resize((320,180),Image.Resampling.NEAREST),((i%4)*320,(i//4)*180))
save(overview,'mockup/overview.png','參考','12幅畫面總覽',note='僅參考；四欄三列；最近鄰縮圖')

header='''# 輪迴之天秤／輪廻の天秤 SFC 開頭畫面交付\n\n版本 v2／2026-10-14。

## v2 修改內容

- 必修1：Logo直接在480×112、1px像素格重新繪製；PNG與SVG同步；座標160,64、顯示960×224不變。禁止0.8倍縮放。
- 必修2：大框14,14,14,14；小按鈕與分頁13,14,13,14；推薦標記0,14,0,14、高度固定24；滑桿2,6,2,6不變。UI圖檔未重畫，mockup改用正確切割。
- 補交：src原始生成PNG與修正版重建工具直接包含在同一ZIP，src不列入3MB限制。
- 建議1：新增日中plain版Logo（PNG＋SVG），標題mockup使用plain版，保留含天秤版供單獨使用。
- 建議2／3：本版保留第5頁構圖及慈愛紋章，未變更這兩個非必修項目。

參考使用者提供的藍金色 SFC 提案。場景為原創生成；UI、紋章、Logo為可重建的像素素材。\n\n## 整合規則\n\n- 背景640×360；遊戲1280×720，整數2倍最近鄰顯示。CSS `image-rendering: pixelated`；Canvas `imageSmoothingEnabled=false`。\n- 只有Logo有文字；mockup含假文字只供參考。其餘所有文字由程式顯示。\n- PNG透明素材為RGBA、alpha只有0/255，外緣至少2px透明。PNG非透明背景≤64色。\n- 九宮格順序：上、右、下、左；切割值以素材原寸為單位。四角固定、四邊與中心最近鄰延伸。\n- 原圖層0靜態完整場景，圖層1星光獨立透明畫布；不做視差。星光以程式alpha在0.35至1間，2秒週期變化，減少動態設定時保持1。\n- 系統字型，不嵌入字型檔。文字建議18–28px（1280座標）；主標36px；色#EEF5FF，選中#FFE7A2，禁用#A7AEB8，黑影(2,2)。所有字級都是遊戲顯示尺寸。\n- Logo繁中「迴」U+8FF4，日文「廻」U+5EFB；SVG純path像素輪廓，沒有text或字型依賴。Logo原生480×112，遊戲整數2倍顯示960×224；標題推薦title_logo_ja_plain／title_logo_zh_plain。\n\n## 畫面位置（1280×720座標）\n\n| 區域 | x,y,寬,高 | 備註 |\n|---|---|---|\n| Logo |160,64,960,224| 日中二選一 |\n| 選單外框 |900,368,348,296| 四按鈕 |\n| 選單按鈕 |916,380+72n,320,64| n=0..3；文字新遊戲／繼續遊戲／設定／語言 |\n| 版權列 |24,682,1232,24| 由程式顯示實際版權 |\n| 啟动提示 |320,620,640,40| 與標題共用背景 |\n| 存檔視窗 |112,52,1056,616| 四格2×2 |\n| 存檔格 |152+492c,160+220r,464,188| c,r=0..1；顯示世、年、季節、神格、時間、日期 |\n| 設定視窗 |180,60,920,600| 四分頁；音量、速度滑桿；開關 |\n| 模式卡 |208+480n,130,384,500| 普通／簡單；推薦文字由程式顯示 |\n| 神格卡 |72+400n,100,336,488| n=0..2；紋章128×128顯示 |\n| 神格文字 |108+400n,364,264,184| 初始信仰力數值取實際遊戲資料；不可從mockup推定 |\n| 神格返回 |76,630,160,56| 共用小按鈕 |\n| 神格確認 |884,624,320,64| 共用選單按鈕 |\n| 劇情對話框 |32,556,1216,140| 背景下1/4留暗；5頁逐字與跳過由程式實作 |\n\n## 檔案清單\n\n| 檔名 | 畫面 | 用途 | 大小（px） | 位置 x,y（1280×720 座標） | 圖層順序／動作 | 九宮格切割 | 備註 |\n|---|---|---|---|---|---|---|---|\n'''
records.append(['manifest.md','整合','本清單','—','—','—','—','每個交付檔案都有一列'])
records.append(['validation.json','驗證','自動尺寸／色數／透明度／容量檢查','—','—','—','—','尺寸群組與需求完整性檢查'])
for source in sorted((OUT/'src').rglob('*')):
 if source.is_file():
  sz='×'.join(map(str,Image.open(source).size)) if source.suffix=='.png' else '—'
  records.append([source.relative_to(OUT).as_posix(),'原檔','原始場景／重建工具／製作說明',sz,'—','—','—','src不計入3MB'])
body='\n'.join('| '+' | '.join(row)+' |' for row in records)
(OUT/'manifest.md').write_text(header+body+'\n\n## 範圍\n\n①–⑦全部已交付。Steam商店圖不在本次範圍。原始生成場景和重建工具放src，不列入3MB限制。\n',encoding='utf-8')
(OUT/'src'/'build_assets.py').write_bytes(Path(__file__).read_bytes())
for k,p in inputs.items():
 (OUT/'src'/f'{k}_original.png').write_bytes(Path(p).read_bytes())
(OUT/'validation.json').touch(exist_ok=True)
files=[p for p in OUT.rglob('*') if p.is_file() and 'src' not in p.relative_to(OUT).parts]
errors=[];details=[]
for p in files:
 rel=p.relative_to(OUT).as_posix()
 if p.suffix=='.png':
  a=Image.open(p);colors=len(a.getcolors(a.width*a.height) or []);alpha=sorted(set(a.getchannel('A').get_flattened_data())) if a.mode=='RGBA' else None
  if alpha and alpha!=[0,255]:errors.append(rel+' alpha not binary')
  if a.mode=='RGBA':
   b=a.getchannel('A').getbbox()
   if b and (b[0]<2 or b[1]<2 or b[2]>a.width-2 or b[3]>a.height-2):errors.append(rel+' transparent padding')
  if 'mockup' not in rel and colors>64:errors.append(rel+' >64 colors')
  details.append({'file':rel,'size':list(a.size),'mode':a.mode,'colors':colors,'alpha':alpha})
for group in ['ui_btn_menu','ui_btn_small','save_slot','god_card','mode_card_normal','mode_card_easy','settings_tab','settings_toggle']:
 group_files=list(OUT.rglob(group+'_*.png'));sizes={Image.open(p).size for p in group_files}
 if len(sizes)!=1:errors.append(group+' state sizes differ')
listed={r[0] for r in records}
for p in files:
 if p.relative_to(OUT).as_posix() not in listed:errors.append('unlisted '+p.name)
for p in (OUT/'opening').glob('*.png'):
 a=Image.open(p).convert('RGB')
 if len(a.crop((0,270,640,360)).getcolors(640*90) or [])!=1:errors.append(p.name+' dialogue safe area')
total=sum(p.stat().st_size for p in files)
if total>3000000:errors.append('over 3MB')
report={'status':'PASS' if not errors else 'FAIL','delivery_bytes_excluding_src':total,'file_count':len(files),'errors':errors,'png_checks':details}
for i in range(4):
 (OUT/'validation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
 total=sum(p.stat().st_size for p in OUT.rglob('*') if p.is_file() and 'src' not in p.relative_to(OUT).parts)
 report['delivery_bytes_excluding_src']=total
zip_path=(OUT.parent/'rinne_title_sfc_v2.zip')
with zipfile.ZipFile(zip_path,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for p in OUT.rglob('*'):
  if p.is_file():z.write(p,Path('rinne_title_sfc')/p.relative_to(OUT))
print(json.dumps({'total_bytes':total,'zip_bytes':zip_path.stat().st_size,'errors':errors,'files':len(files)},ensure_ascii=False))
