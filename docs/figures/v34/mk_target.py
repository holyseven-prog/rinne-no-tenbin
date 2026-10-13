from PIL import Image, ImageDraw
import random
R=random.Random(7)
def hx(c): c=c.lstrip('#'); return tuple(int(c[i:i+2],16) for i in (0,2,4))+(255,)
OUT=hx('#181020')
G=[hx(c) for c in ['#1d4520','#2b6428','#3c8030','#529c38','#78bc48']]
D=[hx(c) for c in ['#4e3620','#71502e','#94703f','#b58f58','#d6b47c']]
S=[hx(c) for c in ['#3a3230','#6a5e52','#8c7e6e','#ad9f8b','#d0c4ae']]
RF=[hx(c) for c in ['#3a1418','#6a1e22','#962c28','#c04434','#e2745a']]
W=[hx(c) for c in ['#2a1a0e','#523420','#784c2c','#a06c3e','#c8945c']]
CL=[hx(c) for c in ['#2a2618','#4a4226','#6c6034','#8e8046','#b0a060']]
TW,TH=16,9
img=Image.new('RGBA',(TW*16,TH*16)); px=img.load()
def put(x,y,c):
    if 0<=x<img.width and 0<=y<img.height: px[x,y]=c
# ---- grass everywhere (dense 5-tone noise + tufts)
for y in range(0,img.height,2):
    for x in range(0,img.width,2):
        r=R.random(); c=G[2] if r<0.6 else G[3] if r<0.82 else G[1]
        for dy in (0,1):
            for dx in (0,1):
                px[x+dx,y+dy]=c if R.random()<0.85 else (G[1] if c==G[2] else G[2])
for _ in range(260):
    x=R.randrange(img.width); y=R.randrange(img.height)
    put(x,y,G[4]); put(x-1,y+1,G[3]); put(x+1,y+1,G[3]); put(x,y+1,G[1]); put(x,y+2,G[0])
# ---- cliff band rows 0-1 (irregular rock faces, grass lip)
rocks=[]
x=0
while x<img.width:
    w=R.randint(7,13); rocks.append((x,w)); x+=w
for y in range(0,31):
    for x in range(img.width): px[x,y]=CL[0]
for row,(ya,yb) in enumerate([(5,17),(17,30)]):
    x=-R.randint(0,6)
    while x<img.width:
        w=R.randint(8,14)
        for y in range(ya,yb):
            for xx in range(x,x+w):
                if not(0<=xx<img.width): continue
                fx=xx-x; fy=y-ya
                c=CL[2]
                if fx<=1 or fy<=1: c=CL[4] if fy<=1 and fx<w-2 else CL[3]
                if fx>=w-2 or fy>=yb-ya-2: c=CL[1]
                if fx==w-1 or fy==yb-ya-1: c=CL[0]
                if (xx*5+y*3)%17==0 and 1<fx<w-2: c=CL[3]
                px[xx,y]=c
        x+=w
for y in range(0,5):
    for x in range(img.width): px[x,y]=G[3] if (x*3+y)%5 else G[4]
for x in range(img.width):
    px[x,5]=G[1] if R.random()<0.5 else CL[0]
    if R.random()<0.25: px[x,6]=G[2]
    px[x,30]=G[0]
# ---- dirt path: vertical from house door + horizontal
def dirt(x0,y0,x1,y1):
    for y in range(y0,y1):
        for x in range(x0,x1):
            r=R.random(); px[x,y]=D[3] if r<0.5 else D[2] if r<0.8 else D[4] if r<0.9 else D[1]
    for x in range(x0,x1):
        if R.random()<0.6: put(x,y0,G[1])
        if R.random()<0.6: put(x,y1-1,G[1])
    for y in range(y0,y1):
        if R.random()<0.6: put(x0,y,G[1])
        if R.random()<0.6: put(x1-1,y,G[1])
    for _ in range((x1-x0)*(y1-y0)//40):
        x=R.randrange(x0+1,x1-1); y=R.randrange(y0+1,y1-1); put(x,y,D[4]); put(x+1,y+1,D[0])
dirt(4*16+8,7*16,6*16-4,9*16); dirt(0,7*16+4,16*16,8*16+12)
# ---- house: x 2..8 (6 tiles), roof y 2..4.5, wall y 4.5..7
hx0,hy0,hw=2*16,2*16+4,6*16
# shadow to the right
for y in range(hy0+10,7*16+6):
    for x in range(hx0+hw,hx0+hw+6):
        c=px[x,y]; px[x,y]=tuple(int(v*0.62) for v in c[:3])+(255,)
# wall (stone bricks) y 66..112
wy0,wy1=4*16+6,7*16
for y in range(wy0,wy1):
    for x in range(hx0+2,hx0+hw-2):
        ry=(y-wy0)//5; bx=(x-hx0+ (4 if ry%2 else 0))%10; by=(y-wy0)%5
        if by==4 or bx==9: c=S[0]
        elif by==0 or bx==0: c=S[4] if bx<6 else S[3]
        elif by==3 or bx==8: c=S[1]
        else: c=S[3] if (x+y)%7 else S[2]
        px[x,y]=c
for y in range(wy0,wy1): px[hx0+1,y]=OUT; px[hx0+hw-2,y]=OUT
# timber beam under roof
for x in range(hx0+1,hx0+hw-1):
    px[x,wy0]=W[1]; px[x,wy0+1]=W[3]; px[x,wy0+2]=W[2]
# door
dx0=hx0+hw//2-6
for y in range(wy0+16,wy1):
    for x in range(dx0,dx0+12):
        c=W[3] if (x-dx0)%4==1 else W[2]
        if x in (dx0,dx0+11) or y==wy0+16: c=W[0]
        px[x,y]=c
put(dx0+8,wy0+30,hx('#e8c050')); put(dx0+8,wy0+31,hx('#9a7020'))
for x in range(dx0-1,dx0+13): px[x,wy1-1]=S[1]
# windows
for wx in (hx0+10,hx0+hw-24):
    for y in range(wy0+12,wy0+28):
        for x in range(wx,wx+14):
            c=hx('#2c3c64')
            if y<wy0+16 and x<wx+6: c=hx('#7a9ad0')
            if x in (wx,wx+13) or y in (wy0+12,wy0+27): c=W[1]
            if x==wx+7 or y==wy0+20: c=W[2]
            px[x,y]=c
    for x in range(wx-1,wx+15): px[x,wy0+28]=W[3]; px[x,wy0+29]=W[1]
# flower box
    for x in range(wx,wx+14):
        if x%3==0: put(x,wy0+27,hx('#e86080'))
# roof y 36..66: rows of tiles
ry0,ry1=hy0,wy0
for y in range(ry0,ry1):
    inset=max(0,(ry0+6-y)) 
    for x in range(hx0-2+inset,hx0+hw+2-inset):
        row=(y-ry0)//5; t=(y-ry0)%5; xx=(x-hx0+(3 if row%2 else 0))%6
        c=RF[3]
        if t==4: c=RF[0]
        elif t==3: c=RF[1]
        elif t==0: c=RF[4] if xx<3 else RF[3]
        if xx==5 and t<4: c=RF[1]
        if xx==0 and t<3: c=RF[4]
        px[x,y]=c
for x in range(hx0-2,hx0+hw+2): px[x,ry1-1]=RF[0]; px[x,ry1]=OUT
# ridge
for x in range(hx0+4,hx0+hw-4): px[x,ry0]=RF[4]; px[x,ry0-1]=OUT
# chimney
for y in range(ry0-10,ry0+8):
    for x in range(hx0+hw-20,hx0+hw-12):
        c=S[3] if (y//3)%2==((x//4)%2) else S[2]
        if x in (hx0+hw-20,hx0+hw-13): c=OUT
        px[x,y]=c
# ---- conifers
def pine(cx,base):
    # trunk
    for y in range(base-6,base):
        for x in range(cx-2,cx+2): put(x,y,W[1] if x<cx else W[0])
    # shadow
    for y in range(base-1,base+3):
        for x in range(cx-7,cx+9):
            if (x-cx-1)**2/64+(y-base-1)**2/4<1 and 0<=x<img.width and 0<=y<img.height:
                c=px[x,y]; px[x,y]=tuple(int(v*0.6) for v in c[:3])+(255,)
    top=base-34
    for layer in range(4):
        ly0=top+layer*7; h=10; wmax=4+layer*2
        for y in range(ly0,ly0+h):
            w=int(1+(y-ly0)/h*wmax)
            for x in range(cx-w,cx+w+1):
                c=G[2]
                if x<cx-w//2: c=G[3]
                if x==cx-w or y==ly0: c=G[4] if x<cx else G[3]
                if x>cx+w//3: c=G[1]
                if y>=ly0+h-2: c=G[0]
                if x==cx+w: c=OUT
                put(x,y,c)
        for x in range(cx-wmax-1,cx+wmax+2): 
            if px[x,ly0+h-1][:3]!=G[2][:3]: pass
pine(12*16+4,6*16+8); pine(14*16+6,5*16+12); pine(13*16+8,8*16+12); pine(1*16,7*16+2)
# ---- fence + barrels
for x in range(9*16,11*16+8):
    for y in (6*16+6,6*16+10):
        put(x,y,W[3]); put(x,y+1,W[1])
    if x%8==0:
        for y in range(6*16+2,6*16+15): put(x,y,W[2]); put(x+1,y,W[0])
def barrel(x0,y0):
    for y in range(y0,y0+14):
        for x in range(x0,x0+11):
            c=W[2] if 2<x-x0<8 else W[1]
            if x-x0==3: c=W[3]
            if y-y0 in (3,10): c=S[1]
            if x in (x0,x0+10) or y in (y0,y0+13): c=OUT
            px[x,y]=c
    for x in range(x0+1,x0+10): px[x,y0+1]=W[4]
barrel(8*16+10,5*16+12); barrel(9*16+8,5*16+14)
# ---- characters (16x24 chibi, original design)
SP=["....oooooooo....","...ohhHHHhhhko..","..ohhHHHHhhhhko.","..ohhHHhhhhhhko.",".ohhhhhhhhhhhkko",".ohkhsSSSSshkko.",
".okssSSSSSsskko.",".oksseSSSesddko.",".oksseSSSesddko.","..ossssddsssdo..","...osssssssdo...","..ooqccccccqoo..",
".oqcCCCccccccqo.","osqcCCcccccccqso","osqcCccccccccqso","odsqbbbbbbbbqsdo",".ooqccccccccqoo.","..oqcccccccqqo..",
"..oPPPPpPPPPpo..","..oPPPpoPPPppo..","..oPPpo.oPPppo..","..oBBBo.oBBBBo..",".oBBBBo..oBBBBo.",".ooooo....ooooo."]
def sprite(x0,y0,pal):
    for j,row in enumerate(SP):
        assert len(row)==16,(j,len(row))
        for i,ch in enumerate(row):
            if ch!='.': put(x0+i,y0+j,pal[ch])
    for i in range(4,12):
        if y0+24>=img.height: break
        c=px[x0+i,y0+24]; px[x0+i,y0+24]=tuple(int(v*0.6) for v in c[:3])+(255,)
base=dict(o=OUT,H=hx('#c8844a'),h=hx('#8e5228'),k=hx('#562e16'),S=hx('#fcd8b0'),s=hx('#eab080'),d=hx('#b87850'),e=hx('#201828'),
C=hx('#76c856'),c=hx('#3e9038'),q=hx('#245428'),b=hx('#6a4020'),P=hx('#5a609c'),p=hx('#383a6c'),B=hx('#4a2c18'))
alt=dict(base,H=hx('#f8e078'),h=hx('#d8a838'),k=hx('#906018'),C=hx('#e86858'),c=hx('#b03030'),q=hx('#681c20'),P=hx('#7a5a38'),p=hx('#4e3820'))
alt2=dict(base,H=hx('#9aa0b8'),h=hx('#6a7088'),k=hx('#3e4258'),C=hx('#6a90e0'),c=hx('#3858b0'),q=hx('#203270'),S=hx('#e8b88c'),s=hx('#c88a60'))
sprite(5*16+1,7*16-14,base); sprite(7*16+4,7*16+2,alt); sprite(10*16+6,7*16+0,alt2)
img.save('./target_scene_1x.png')
big=img.resize((img.width*3,img.height*3),Image.NEAREST); big.save('./target_scene_3x.png')
# sprite sheet (three palettes) x8
sh=Image.new('RGBA',(16*3+16,24+8),(112,112,224,255)); 
img2=Image.new('RGBA',(64,32),(112,112,224,255))
px2=img2.load()
for k,pal in enumerate([base,alt,alt2]):
    for j,row in enumerate(SP):
        for i,ch in enumerate(row):
            if ch!='.': px2[4+k*20+i,4+j]=pal[ch]
img2.resize((64*8,32*8),Image.NEAREST).save('./target_chars_8x.png')
print('ok',img.size)
