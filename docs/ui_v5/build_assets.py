"""Deterministic native UI artwork. Pillow only; no source game art is edited."""
from pathlib import Path
from PIL import Image, ImageDraw
import json, hashlib
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'assets/design/ui_v5'
OUT.mkdir(parents=True,exist_ok=True)
NAVY='#101e35'; INK='#080f20'; GOLD='#bea271'; LIGHT='#f3dfaa'; MUTED='#64758b'
records=[]
def save(im,name,role,slice_=None):
 p=OUT/(name+'.png');im.save(p,optimize=True)
 colors=len(im.getcolors(im.width*im.height) or [])
 assert set(im.getchannel('A').getdata())<={0,255}
 assert colors<=256
 records.append(dict(file=p.name,width=im.width,height=im.height,colors=colors,bytes=p.stat().st_size,alpha=[0,255],role=role,nine_slice=slice_,sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
def frame(name,w,h,state='normal',role='nine-slice panel',ornate=False):
 im=Image.new('RGBA',(w,h));d=ImageDraw.Draw(im)
 fill={'normal':NAVY,'hover':'#1b3551','selected':'#263e53','disabled':'#242d39','urgent':'#39272f','danger':'#39272f','unread':'#182e46','pressed':'#0b1728'}.get(state,NAVY)
 edge=LIGHT if state in ('hover','selected') else '#ee9a87' if state in ('urgent','danger') else MUTED if state=='disabled' else GOLD
 d.polygon([(5,0),(w-6,0),(w-1,5),(w-1,h-6),(w-6,h-1),(5,h-1),(0,h-6),(0,5)],fill=INK)
 d.rectangle((2,5,w-3,h-6),fill=fill);d.rectangle((5,2,w-6,h-3),fill=fill)
 d.line([(6,2),(w-7,2)],fill=edge,width=1);d.line([(6,h-3),(w-7,h-3)],fill=edge,width=1)
 d.line([(2,6),(2,h-7)],fill=edge);d.line([(w-3,6),(w-3,h-7)],fill=edge)
 for x,y,sx,sy in [(4,4,1,1),(w-5,4,-1,1),(4,h-5,1,-1),(w-5,h-5,-1,-1)]:
  d.line([(x,y+6*sy),(x,y),(x+6*sx,y)],fill=edge,width=1)
  if ornate:
   d.polygon([(x+3*sx,y+6*sy),(x+6*sx,y+3*sy),(x+9*sx,y+6*sy),(x+6*sx,y+9*sy)],fill=edge)
 if state=='selected':d.rectangle((8,h-7,w-9,h-5),fill=LIGHT)
 if state=='unread':d.rectangle((w-12,7,w-8,11),fill='#9ed7e4')
 cut=8 if name.startswith('ui_tab_') else 12 if name.startswith(('ui_button_','ui_card_','power_')) else 16
 save(im,name,role,[cut]*4)
for name,w,h in [('topbar',64,64),('side_panel',64,64),('power_tray',64,48),('map_window',64,64),('modal',64,64),('tooltip',48,48),('notification',64,48),('titlebar',64,48),('display_menu',64,64)]:frame('ui_'+name,w,h,ornate=name in ('modal','map_window','side_panel'))
for s in ('normal','danger'):frame('ui_battle_'+s,64,48,s)
for s in ('normal','selected','unread'):frame('ui_tab_'+s,48,40,s)
for s in ('normal','hover','selected','urgent'):frame('ui_card_'+s,64,48,s)
for s in ('normal','hover','pressed','selected','disabled'):frame('ui_button_'+s,48,48,s)
for p in ('oracle','grace','trial','soul','force'):
 for s in ('normal','hover','selected','disabled'):frame('power_'+p+'_'+s,64,48,s,role='power button nine-slice')
for s in ('open','closed','notification'):frame('ui_visibility_'+s,64,48,'unread' if s=='notification' else 'normal')
for name,w,h,fill in [('scroll_track',8,32,INK),('scroll_thumb',8,32,GOLD),('meter_track',32,8,INK),('meter_faith',32,8,'#7ecfcb'),('meter_light',32,8,'#e2c77e'),('meter_dark',32,8,'#a59bde'),('focus',32,32,LIGHT)]:
 im=Image.new('RGBA',(w,h));d=ImageDraw.Draw(im)
 if name=='focus':d.rectangle((0,0,w-1,h-1),outline=fill,width=2)
 else:d.rectangle((1,1,w-2,h-2),fill=fill)
 save(im,'ui_'+name,'meter/scroll repeat strip' if name!='focus' else 'focus overlay',[3,3,3,3])
im=Image.new('RGBA',(16,8));ImageDraw.Draw(im).polygon([(0,0),(15,0),(7,7)],fill=GOLD);save(im,'ui_tooltip_arrow','tooltip arrow')
# Code-native pixel glyph system: integer coordinates, opaque facets, no filtering.
def icon(name,size,kind,color,glass=False):
 im=Image.new('RGBA',(size,size));d=ImageDraw.Draw(im);s=size/32
 def pts(v):return [(round(x*s),round(y*s)) for x,y in v]
 def poly(v,c):d.polygon(pts(v),fill=c)
 def line(v,c=LIGHT,width=2):d.line(pts(v),fill=c,width=max(1,round(width*s)))
 if glass:
  poly([(16,1),(28,7),(30,21),(23,30),(9,30),(2,21),(4,7)],INK)
  poly([(16,3),(26,8),(28,20),(22,28),(10,28),(4,20),(6,8)],color)
  poly([(16,4),(16,15),(6,8)],'#e7ddad');poly([(17,16),(27,20),(22,27)],'#304773')
  line([(6,8),(16,15),(26,8)],INK,1);line([(4,20),(16,15),(10,28)],INK,1);line([(16,15),(22,28)],INK,1)
 c=LIGHT if glass else color
 if kind in ('oracle','eye'): # eye + oracle diamond
  poly([(5,16),(11,11),(21,11),(27,16),(21,21),(11,21)],INK if glass else c)
  poly([(7,16),(12,13),(20,13),(25,16),(20,19),(12,19)],c if glass else INK)
  poly([(16,11),(20,16),(16,21),(12,16)],c)
  if kind=='oracle':line([(16,6),(16,9)],c,1);line([(16,23),(16,26)],c,1)
 elif kind in ('grace','faith','spring'):
  line([(16,25),(16,14)],c);poly([(15,19),(7,17),(7,11),(12,12),(16,17)],c);poly([(17,15),(20,8),(26,7),(25,13),(19,17)],c)
 elif kind in ('trial','awe','warning'):
  poly([(16,5),(27,25),(5,25)],INK if glass else c);poly([(16,8),(24,23),(8,23)],c if glass else INK);line([(16,12),(16,18)],INK if glass else c);line([(16,20),(16,21)],INK if glass else c)
 elif kind in ('soul','hero'):
  poly([(16,6),(21,12),(22,20),(26,24),(20,24),(17,22),(13,25),(8,24),(11,19),(11,12)],c);line([(14,13),(14,16)],INK,1);line([(18,13),(18,16)],INK,1)
 elif kind in ('force','balance'):
  line([(16,6),(16,25)],c);line([(7,11),(25,11)],c);line([(11,26),(21,26)],c)
  for x in (8,24):line([(x,12),(x-4,20),(x+4,20),(x,12)],c,1)
 elif kind in ('light','summer'):
  poly([(12,10),(20,10),(23,16),(20,22),(12,22),(9,16)],c)
  for v in [[(16,3),(16,7)],[(16,25),(16,29)],[(3,16),(7,16)],[(25,16),(29,16)]]:line(v,c)
 elif kind=='dark':poly([(19,5),(11,7),(6,13),(7,22),(14,27),(24,25),(18,22),(14,16),(15,9)],c)
 elif kind=='autumn':poly([(17,5),(26,8),(24,20),(15,25),(8,20),(7,12)],c);line([(9,26),(22,11)],INK,1)
 elif kind=='winter':
  for v in [[(16,4),(16,28)],[(5,10),(27,22)],[(5,22),(27,10)]]:line(v,c)
 elif kind=='speed':poly([(5,7),(16,16),(5,25)],c);poly([(16,7),(27,16),(16,25)],c)
 elif kind=='pause':poly([(9,7),(13,7),(13,25),(9,25)],c);poly([(19,7),(23,7),(23,25),(19,25)],c)
 elif kind=='menu':
  for y in (8,16,24):line([(6,y),(26,y)],c)
 elif kind in ('ui','map'):
  line([(5,6),(27,6),(27,26),(5,26),(5,6)],c)
  if kind=='ui':line([(5,11),(27,11)],c);line([(21,11),(21,26)],c)
  else:line([(12,7),(12,25)],c,1);line([(20,7),(20,25)],c,1);poly([(16,12),(20,16),(16,20),(12,16)],c)
 elif kind=='close':line([(8,8),(24,24)],c);line([(24,8),(8,24)],c)
 elif kind=='check':line([(7,16),(13,23),(26,9)],c,3)
 elif kind=='arrow':line([(11,8),(20,16),(11,24)],c)
 elif kind=='bell':poly([(13,7),(19,7),(23,12),(23,20),(26,23),(6,23),(9,20),(9,12)],c);line([(14,26),(18,26)],c)
 save(im,name,'native pixel glyph; no text')
colors={'oracle':'#68b6d1','grace':'#81c69b','trial':'#df9b6d','soul':'#af98d5','force':'#d9bd74'}
for kind,color in colors.items():
 for size in (64,32):icon('icon_power_'+kind+'_'+str(size),size,kind,color,True)
for kind in ('faith','eye','awe','light','dark','spring','summer','autumn','winter','speed','pause','ui','menu','map','warning','hero','close','check','arrow','bell','balance'):
 icon('icon_'+kind+'_32',32,kind,LIGHT)
data={'version':'5.0','coordinate_system':'1280x720, native UI pixels','nine_slice_order':['top','right','bottom','left'],'text':'runtime only','assets':records}
(OUT/'manifest.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
lines=['# UI v5 素材清單','','全部為原生 UI 像素；PNG 不含文字，alpha 僅 0/255。九宮格依上、右、下、左。','', '| 檔名 | 尺寸 | 色數含透明 | 位元組 | 九宮格 T/R/B/L | 用途 |','|---|---|---:|---:|---|---|']
for r in records:lines.append(f"| {r['file']} | {r['width']}×{r['height']} | {r['colors']} | {r['bytes']} | {r['nine_slice'] or '—'} | {r['role']} |")
lines+=['',f"PNG 合計 {len(records)} 張，{sum(r['bytes'] for r in records):,} bytes。",'','所有 power_*_disabled 同時代表不可用狀態；原因以程式文字說明（信仰不足／不適用）。顏色不是唯一辨識方式。','圖示 32 / 64 各自在整數座標繪製。所有角飾不拉伸，中心平鋪或實色延展；不做整張雙線性放大。']
(OUT/'manifest.md').write_text('\n'.join(lines),encoding='utf-8')
print(f'{len(records)} PNG; {sum(r["bytes"] for r in records)} bytes; all alpha binary; <=256 colors')
