# Generates the Daedalus color ramps in lib/labs/dsManager/seed/tokens.ts.
# Usage: python3 scripts/generate-daedalus-ramps.py out.json  (then paste the ramps)
# Anchors are the chosen brand colors; each becomes a 50-950 OKLCH ramp.

import math, json, sys

def srgb_to_lin(c): return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def lin_to_srgb(c): return 12.92*c if c<=0.0031308 else 1.055*c**(1/2.4)-0.055
def hex_to_rgb(h): h=h.lstrip('#'); return [int(h[i:i+2],16)/255 for i in (0,2,4)]
def rgb_to_hex(rgb): return '#'+''.join(f'{round(max(0,min(1,c))*255):02x}' for c in rgb)

def rgb_to_oklch(h):
    r,g,b=[srgb_to_lin(c) for c in hex_to_rgb(h)]
    l=0.4122214708*r+0.5363325363*g+0.0514459929*b
    m=0.2119034982*r+0.6806995451*g+0.1073969566*b
    s=0.0883024619*r+0.2817188376*g+0.6299787005*b
    l,m,s=[x**(1/3) for x in (l,m,s)]
    L=0.2104542553*l+0.7936177850*m-0.0040720468*s
    a=1.9779984951*l-2.4285922050*m+0.4505937099*s
    bb=0.0259040371*l+0.7827717662*m-0.8086757660*s
    return L, math.hypot(a,bb), math.degrees(math.atan2(bb,a))%360

def oklch_to_rgb(L,C,H):
    a=C*math.cos(math.radians(H)); b=C*math.sin(math.radians(H))
    l=(L+0.3963377774*a+0.2158037573*b)**3
    m=(L-0.1055613458*a-0.0638541728*b)**3
    s=(L-0.0894841775*a-1.2914855480*b)**3
    r=4.0767416621*l-3.3077115913*m+0.2309699292*s
    g=-1.2684380046*l+2.6097574011*m-0.3413193965*s
    bl=-0.0041960863*l-0.7034186147*m+1.7076147010*s
    return [r,g,bl]

def in_gamut(rgb): return all(-0.0005<=c<=1.0005 for c in rgb)

def to_hex(L,C,H):
    # reduce chroma until in sRGB gamut
    while C>0:
        lin=oklch_to_rgb(L,C,H)
        if in_gamut(lin): break
        C-=0.002
    lin=oklch_to_rgb(L,max(C,0),H)
    return rgb_to_hex([lin_to_srgb(max(0,min(1,c))) for c in lin])

STEPS=['50','100','200','300','400','500','600','700','800','900','950']
TARGET=[0.975,0.945,0.89,0.82,0.73,0.64,0.55,0.47,0.39,0.31,0.24]

def ramp(anchor):
    La,Ca,Ha=rgb_to_oklch(anchor)
    idx=min(range(len(TARGET)),key=lambda i:abs(TARGET[i]-La))
    out={}
    for i,(s,L) in enumerate(zip(STEPS,TARGET)):
        if i==idx: out[s]=anchor.lower(); continue
        # chroma tapers toward the ends of the ramp, peaking at the anchor
        span=(0.99-La) if L>La else (La-0.18)
        t=min(1,abs(L-La)/span)
        C=Ca*max(0.12,1-0.85*t*t) if L<La else Ca*max(0.08,1-t**1.3)
        out[s]=to_hex(L,C,Ha)
    return out, idx, (La,Ca,Ha)

def contrast(h1,h2):
    def lum(h):
        r,g,b=[srgb_to_lin(c) for c in hex_to_rgb(h)]
        return 0.2126*r+0.7152*g+0.0722*b
    a,b=lum(h1),lum(h2); hi,lo=max(a,b),min(a,b)
    return (hi+0.05)/(lo+0.05)

# Indigo: Shane's #2F39A9 rotated +15° toward purple in OKLCH (same lightness/chroma).
palette={'indigo':'#4B2FA4','steel':'#2E6FA0','lagoon':'#49A4BB','mint':'#15D8B3',
         # status hues the palette doesn't cover, re-ramped to sit with it
         'coral':'#d6462a','amber':'#e09a12'}
result={}
for name,hx in palette.items():
    r,idx,lch=ramp(hx)
    result[name]=r
    print(f"{name:7} anchor {hx} at {STEPS[idx]}  L={lch[0]:.3f} C={lch[1]:.3f} H={lch[2]:.0f}")
    print('   ', ' '.join(f"{s}:{v}" for s,v in r.items()))

# Cool neutral: tinted with the ORIGINAL indigo hue (#2F39A9, ~272°) so it stays cool even though the brand indigo
# moved toward purple. Low chroma, lightness matched to the old neutral so contrast behavior carries over.
H=rgb_to_oklch('#2F39A9')[2]
NL={'0':1.0,'50':0.978,'100':0.952,'200':0.902,'300':0.81,'400':0.67,'500':0.53,'600':0.445,'700':0.365,'800':0.285,'900':0.222,'950':0.172}
neutral={}
for s,L in NL.items():
    if s=='0': neutral[s]='#ffffff'; continue
    C=0.006+0.022*math.sin(math.pi*min(1,max(0,(1-L)/0.85)))  # coolest in the mid-tones
    neutral[s]=to_hex(L,C,H)
result['neutral']=neutral
print('neutral', ' '.join(f"{s}:{v}" for s,v in neutral.items()))
json.dump(result,open(sys.argv[1],'w'),indent=1)

print('\ncontrast checks')
for fg,bg,label in [('#ffffff',result['indigo']['700'],'white on indigo.700'),('#ffffff','#2f39a9','white on anchor'),(result['indigo']['300'],neutral['900'],'indigo.300 on n900'),
                    (neutral['600'],'#ffffff','n600 on white'),(neutral['400'],'#ffffff','n400 on white (border)'),(neutral['500'],'#ffffff','n500 on white'),
                    (result['mint']['800'],result['mint']['50'],'mint800/mint50'),(result['steel']['700'],result['steel']['50'],'steel700/steel50')]:
    print(f"  {label:28} {contrast(fg,bg):.2f}")
