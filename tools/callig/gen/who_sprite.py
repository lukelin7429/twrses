# 第九課「這是誰的字？」的拼圖：把兩種拓本的底色處理成一樣（不然看底色就猜得出來），字的形狀照原拓。
from PIL import Image, ImageFilter
import numpy as np, sys
from scipy import ndimage
R, OUT = sys.argv[1], sys.argv[2]
WHO = list('千十三之下心中方法其'); T = 200; N = 400
def otsu(a):
    h, _ = np.histogram(a, 256, (0, 256)); tot = a.size; s = np.dot(np.arange(256), h); sb = wb = 0; best = (0, 128)
    for t in range(256):
        wb += h[t]
        if wb == 0 or wb == tot: continue
        sb += t * h[t]; mb = sb / wb; mf = (s - sb) / (tot - wb); v = wb * (tot - wb) * (mb - mf) ** 2
        if v > best[0]: best = (v, t)
    return best[1]
def norm(fn):
    im = Image.open(fn).convert('L').resize((N, N), Image.LANCZOS)
    a = np.asarray(im.filter(ImageFilter.MedianFilter(7)).filter(ImageFilter.GaussianBlur(1.6))).astype(float)
    t = otsu(a); t2 = otsu(a[a > t])          # 第二次只在亮的那一半裡分：字（最亮）和斑駁的石花（中間）
    strong = ndimage.binary_opening(a > (t + t2) / 2, iterations=2)
    weak = a > t + 10
    lab, n = ndimage.label(weak)
    keep = np.zeros_like(weak)
    c0, c1 = int(N * 0.14), int(N * 0.86)
    for i in range(1, n + 1):
        m = lab == i
        if (m & strong).sum() < 500: continue                 # 沒有夠亮的核心：石花
        ys, xs = np.nonzero(m & strong)
        if xs.max() < c0 or xs.min() > c1 or ys.max() < c0 or ys.min() > c1: continue   # 完全在邊上：鄰字
        keep |= m
    # 弱遮罩的邊可能把石花黏進來：只留離強核心不遠的部分
    near = ndimage.binary_dilation(strong & keep, iterations=7)
    keep &= near
    u = ndimage.gaussian_filter(keep.astype(float), 1.2); u = np.clip((u - 0.3) / 0.4, 0, 1)
    bg = np.array([34, 31, 28]); fg = np.array([232, 222, 198])
    out = (bg[None, None, :] * (1 - u[..., None]) + fg[None, None, :] * u[..., None]).astype('uint8')
    return Image.fromarray(out).resize((T, T), Image.LANCZOS)
sp = Image.new('RGB', (5 * T, 4 * T))
for i, ch in enumerate(WHO):
    sp.paste(norm(f'{R}/yan-duobao-{ch}.png'), ((i % 5) * T, (i // 5) * T))
    sp.paste(norm(f'{R}/liu-xuanmi-{ch}.png'), ((i % 5) * T, (2 + i // 5) * T))
sp.save(OUT, quality=86)
