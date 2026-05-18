# drive.html v2 - 江南书院山水 (辽阔版)

**版本**: v2.0
**日期**: 2026-05-19
**基线**: f365d63 (v1.1 polish 已 push 到 GitHub)
**作者**: Claude (设计) + codex (实施) + Claude (集成验证)

## 0. 为什么要 v2 (动机)

v1.1 的问题：30m×30m 场地 + 4 面围墙 + 14 件装饰堆砌 + 朱红泛滥 + 白天空 + 纯平地，玩家进入即感"被困小盒子"。bruno-simon.com 的辽阔感来自 **无边界 + 远景 + 物体稀疏 + 单一基色 + 蓝天主导**。v2 把书院从"小院子"重做成"江南山水路径"，玩家在 100m×100m 的草地+水塘+桃林里开车，远处有水墨远山和雾蒙书院作为视觉锚。

## 1. 设计哲学 (不变 + 强化)

| 原则 | 含义 | v1 偏差 | v2 矫正 |
|------|------|---------|---------|
| **少** | 装饰 ≤30 件，分散在 100m 场地 | 14 件挤 30m | 30 件铺 100m |
| **静** | 单一色调主导，朱红 ≤5% | 朱红 25%+ | 米黄 60% / 墨灰 20% / 草绿 10% / 朱红 5% / 其他 5% |
| **远** | 远景比近景多，营造景深 | 无远景 | 远山剪影 + 远景书院 + 雾 + 天空渐变 |
| **空** | 大块留白，60% 视野是地+天 | 视野塞满物体 | 路径两侧 5m 内无物，远景才有 |
| **匠** | 1-2 个杀手级手法精致到位 | 14 件平均用力 | 杀手级 = 石拱桥 + 远景书院剪影 |

## 2. 场地参数

```
v1: groundGeo = PlaneGeometry(60, 60)  半径 30m
v2: groundGeo = PlaneGeometry(200, 200) 半径 100m

物理边界 halfBound: 14 → 80（车子撞远山剪影前会撞软边界 70）

朝向约定（保留 v1）:
  +X = 东   -X = 西
  +Z = 南   -Z = 北
  玩家出生点: 南方草地，朝北看
```

### 区域分布图

```
                       北 (-Z, 远景区, z=-90~-50)
            ╱╲ ╱╲ ╱╲ ╱╲ ╱╲ ╱╲   ← 远山剪影 (z=-95, 水墨灰)
                                    ☁     ☁           ☁
                  ╔════[ 明伦堂 ]════╗     ← 远景书院 (z=-55, 雾遮蔽)
                  ║   美名书院     ║
                  ╚════════════════╝
            🎋竹林             🎋竹林  ← 北侧软边界 (z=-45, 桃林+竹林)

              📜书院东路 (z=-30~-10)
   西        🎴卷轴1 .... 🎴卷轴2 .... 🎴卷轴3       东
  (-X,80)                                          (+X,80)
   🎋松     ━━━━━━━ 石拱桥 (z=0) ━━━━━━━              🏔奖项坡
  竹林     ░░ 水塘 (z=-5~5, x=-15~15) 🐟 ░░             ⛰
                                                     🏆×3 (x=25~35)
              🎴卷轴4 ......... 🎴卷轴5
              (z=10~25, 路径南段)

   🌸桃花林    🌸  🌸          🌸  🌸    🌸桃花林
                                                    ← 西/东 软边界 (x=±40)
        📜联系地刻 4 个 (z=35~42, 散在出生草地)
                  🚗 出生点 (0, 1.5, 45)
                                              ← 南侧软边界 (z=+55)
                       南 (+Z, 出生区)
   ───────────────── x: -50 to +50 ─────────────────
```

### 三层视觉景深

| 层 | 距离 | 内容 | 透明度/雾 |
|---|------|------|----------|
| 远景 | z < -50 | 远山剪影 + 远景书院 + 雾 | 雾 70%+，单层背景 plane |
| 中景 | -50 < z < +20 | 拱桥/水塘/卷轴/奖项坡 | 雾 0-30%，全细节 |
| 近景 | z > +20 | 桃林/草地/出生区/地刻 | 无雾，最清晰 |

雾参数: `scene.fog = new THREE.Fog(C.bg, 50, 130)` (近 50m / 远 130m)

## 3. 调色板 v2

**核心原则**：辽阔感 = 单一基色主导 + 远景压低饱和度 + 朱红只点缀

```javascript
const C = {
  // === 基础 (60% 视野) ===
  sky:       0xD8DDD0,  // 天空 雾色青灰
  bg:        0xE8E2D0,  // 远雾色 (背景色 + fog color)
  grassNear: 0x8FA268,  // 近景草地 嫩绿带暖
  grassFar:  0x6B7858,  // 远景草地 沉静橄榄
  sandPath:  0xCBB890,  // 沙土路径 暖米黄

  // === 远景 (20%) ===
  mountainBack: 0x9CA5A8,  // 远山墨灰
  mountainFront: 0x7A8385, // 中山墨青
  hallFar:   0x8B7960,  // 远景书院 雾化米褐
  fog:       0xE8E2D0,  // 雾色 = bg

  // === 水/桥 (5%) ===
  pondShallow: 0xA8B8AE, // 水塘浅 灰绿
  pondDeep:    0x6B7A75, // 水塘深 墨青
  bridge:    0xC8B998,  // 石桥 米石色

  // === 植物 (8%) ===
  bamboo:    0x6B8B5C,  // 竹绿
  pine:      0x4F6347,  // 松绿 (深)
  plum:      0xD2A8B3,  // 梅粉 (淡)
  peach:     0xEFB8C2,  // 桃粉 (亮)
  moss:      0x7E8C5D,  // 苔藓黄绿

  // === 建筑/木质 (4%) ===
  woodLight: 0xC9A86A,  // 浅木 (亭/桥栏)
  woodDark:  0x6B4F38,  // 深木 (柱/梁)
  tile:      0x524940,  // 黛瓦 (v1.1 后)
  wallStone: 0xE8DFC9,  // 墙石 米白

  // === 朱红点缀 (3% only!) ===
  accent:    0x7F2020,  // 朱红 (仅匾额/印章/锦鲤)
  accentSoft: 0xA84747, // 朱红淡 (卷轴轴帽)

  // === 灯 (≤1%) ===
  lantern:   0xC0392B,  // 灯笼朱（仅 2 个，仅书院门口）
  lanternEmissive: 0.15, // 大幅降低
};
```

**关键变化对比 v1.1**:
- 新增 `sky/grassNear/grassFar/sandPath/mountainBack/mountainFront/hallFar/pondShallow/pondDeep/bridge` 10 个新色
- 朱红用量：v1.1 ~25% → v2 ~3%（仅匾额、印章、锦鲤眼、卷轴轴帽）
- 移除：朱红墙、车顶酒红、铜钱朱、酒瓮朱（v1.1 已部分修，v2 全部清零）

## 4. 物体清单 (30 件)

### 区域 A: 出生区 (z=+35 ~ +55, 南侧)
1. **草地起步点** (0, 0, 45) - 嫩绿 PlaneGeometry 20×20，子区域
2. **4 联系地刻** (z=35~42) - 沿弧形铺开，间距 8m，地面贴图
3. **南桃林** (z=+50, x=-30~+30) - 5 棵桃花，作为南向软边界

### 区域 B: 路径 + 卷轴南段 (z=+25 ~ +10)
4. **5 项目卷轴** - **完全重做 3D**：见 §5
   - 卷轴 1: (-15, 0, 25) 朝南
   - 卷轴 2: (+15, 0, 25) 朝南
   - 卷轴 3: (-20, 0, 10) 朝南偏东
   - 卷轴 4: (+20, 0, 10) 朝南偏西
   - 卷轴 5: (0, 0, 15) 朝南 (居中款)
5. **沙土路径纹理** - z=+45 → z=-30 的曲线小路，CanvasTexture 绘在 ground 上

### 区域 C: 拱桥 + 水塘 (z=-10 ~ +5, x=-20 ~ +20)
6. **石拱桥** (0, 1, 0) - 真 3D 拱形，宽 4m 长 14m 高 1.5m，可开车上去
7. **水塘** (0, -0.3, 0) - 椭圆形 30×12，浅水材质（半透明）
8. **3 条锦鲤** - 简化 mesh，沿水塘缓动
9. **荷花 6 朵** - 小 PlaneGeometry，散点漂浮

### 区域 D: 卷轴北段 + 路灯 (z=-10 ~ -30)
10. **格物致知 4 字** - 保留 v1.1 立体字，但缩小到 0.7x，放在桥北侧 z=-12 一字排开
11. **石灯笼 2 座** - 替换朱红灯笼，改成石质刻花，仅放书院门口 z=-40

### 区域 E: 奖项坡 (x=+25 ~ +40, z=-5 ~ +15, 东侧小坡)
12. **小土坡** - BoxGeometry 缓坡 15×3×20，沙土色
13. **3 奖项雕塑** - 放坡顶，间距 6m

### 区域 F: 远景书院 (z=-55 ~ -50, 北侧)
14. **明伦堂** (0, 0, -52) - 主殿，飞檐 + 黛瓦 + 匾额"美名书院"
15. **东西厢房 2 座** - (±8, 0, -50)
16. **牌楼** (0, 0, -42) - 朝南，作为书院入口

### 区域 G: 远山 + 天空 (z < -60)
17. **远山剪影**（关键！）- BackgroundPlane (200×40, z=-95)，CanvasTexture 绘山形
18. **天空渐变球壳** - SphereGeometry 半径 150，反面材质 ShaderMaterial 顶蓝底米黄

### 区域 H: 软边界 (x=±40, z=±50)
19. **东西桃林** - x=±42, 沿 z 轴每 8m 一棵桃花，共 12 棵
20. **北侧竹林** - z=-40, 沿 x 轴 6 簇竹林（每簇 8 株，共 48 株）

### 区域 I: 散点装饰
21. **苔藓** - 边缘随机 25 个，仅生长在草地边缘
22. **松树** - 4 棵，放各区过渡点 (±35, 0, ±20)
23. **梅花** - 3 棵，零星点缀
24. **石碾子** - 1 个，路边小道具，可推
25. **木栈道** - 出生区到桥的 3m 木板路（CanvasTexture）

### 区域 J: 入口 (玩家第一眼)
26. **"美名书院" 木牌** (0, 1.5, 50) - 矮立式木牌，作为第一交互提示
27. **入门指示箭头** (0, 0.05, 30) - 地面贴图 ↑ 朝北

### 区域 K: 远景细节 (可选)
28. **远处飞鸟剪影** 2-3 只，AnimateLoop 缓慢飘
29. **远山雾化层** 1 个 - 在远山和书院之间，PlaneGeometry 渐变贴图
30. **远树丛剪影** - 远山脚下，低饱和度树形剪影

## 5. 项目卷轴 v2 - 真正的"竹简卷轴"

v1.1 的卷轴还是太像盒子。v2 重做：

```
立面视图 (玩家从南面正对看):

    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄    ← 上轴 (朱红 Cylinder, r=0.08, length=2.2)
   ⬤                          ⬤  ← 轴帽 (朱红 SphereGeometry, r=0.15)
    █                          █
    █   ╔══════════════════╗   █  ← 米黄竹简纸 (PlaneGeometry 1.8×1.5)
    █   ║                  ║   █     上面是 CanvasTexture:
    █   ║   FIG.1          ║   █     - "FIG.1" 朱红印章 (左上)
    █   ║                  ║   █     - 项目标题 (中, 大字)
    █   ║   项目标题        ║   █     - 副标题 (中下, 小字)
    █   ║                  ║   █     - 年份 (右下, monospace)
    █   ║   tagline...     ║   █
    █   ║                  ║   █
    █   ║          2025    ║   █
    █   ╚══════════════════╝   █
   ⬤                          ⬤  ← 轴帽
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄    ← 下轴

斜视图:
    ╱──────────╲     上轴弧形（不是直线）
   ⬤            ⬤
   │            │   ← 两侧朱红垂带，4cm 宽
   │  画面 ↓    │
   │            │
   │            │
   │            │
   ⬤            ⬤
    ╲──────────╱

物理碰撞: chassisBody isTrigger 仅触发 dialog, 不挡车
但 mesh 是立体的，车可以撞但卷轴不动（mass=0 静态）
```

**关键尺寸**:
- 总高 2.5m，总宽 1.8m
- 上下轴: Cylinder(0.08, 0.08, 2.2, 8), rotation.z=π/2 (横置)
- 轴帽: Sphere(0.15) × 4
- 卷纸: BoxGeometry(1.8, 1.5, 0.04) - 加薄厚度，避免纸面镜像问题
- 矮石台底座: BoxGeometry(2.0, 0.2, 0.5), 米石色

**5 个卷轴 yaw 角**:
- 卷轴 1 (-15, 25): rotation.y = 0 (面南)
- 卷轴 2 (+15, 25): rotation.y = 0
- 卷轴 3 (-20, 10): rotation.y = π/12 (微东南向)
- 卷轴 4 (+20, 10): rotation.y = -π/12 (微西南向)
- 卷轴 5 (0, 15):  rotation.y = 0

**镜像问题彻底解决**：
- 用 BoxGeometry 多材质 6 面，前后两面贴正向 canvas，左右贴米黄纯色，上下贴轴端 canvas
- 不再用 PlaneGeometry，避免单面渲染镜像

## 6. 远山剪影实现（杀手级手法）

```javascript
// === 远山剪影 ===
function buildDistantMountains() {
  const w = 240, h = 50;
  const canvas = document.createElement('canvas');
  canvas.width = 2048; canvas.height = 400;
  const ctx = canvas.getContext('2d');

  // 三层山，远到近
  // 第一层 (最远): 浅墨灰
  ctx.fillStyle = '#9CA5A8';
  ctx.beginPath();
  ctx.moveTo(0, 400);
  for (let x = 0; x <= 2048; x += 40) {
    const y = 120 + Math.sin(x * 0.005) * 30 + Math.random() * 20;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(2048, 400);
  ctx.fill();

  // 第二层 (中远): 中墨青
  ctx.fillStyle = '#7A8385';
  ctx.beginPath();
  ctx.moveTo(0, 400);
  for (let x = 0; x <= 2048; x += 30) {
    const y = 180 + Math.sin(x * 0.008 + 1.2) * 35 + Math.random() * 15;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(2048, 400);
  ctx.fill();

  // 第三层 (最近的远山): 深墨
  ctx.fillStyle = '#5E6868';
  ctx.beginPath();
  ctx.moveTo(0, 400);
  for (let x = 0; x <= 2048; x += 25) {
    const y = 240 + Math.sin(x * 0.012 + 2.4) * 25 + Math.random() * 10;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(2048, 400);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    alphaTest: 0.1,
    fog: false,  // 远山不被雾遮蔽，是雾本身的视觉延伸
  });
  const geo = new THREE.PlaneGeometry(w, h);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 18, -95);
  mesh.renderOrder = -1;  // 最后渲染
  scene.add(mesh);
}
```

## 7. 远景书院实现

```javascript
function buildDistantHall() {
  // 主殿 (远景版，比 v1 缩小到 0.6x, 黛瓦淡化, 朱红匾额仍可见)
  const g = new THREE.Group();

  // 基台
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(20, 0.5, 12),
    new THREE.MeshStandardMaterial({ color: C.wallStone, roughness: 0.92 })
  );
  base.position.y = 0.25; g.add(base);

  // 红木柱 4 根 (颜色淡化, 不要那么红)
  for (const [x, z] of [[-7, -4], [-7, 4], [7, -4], [7, 4]]) {
    const c = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 6, 8),
      new THREE.MeshStandardMaterial({ color: C.woodDark, roughness: 0.85 })
    );
    c.position.set(x, 3.5, z); g.add(c);
  }

  // 屋顶 (深黛瓦)
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(13, 3.5, 4),  // 4 边棱锥模拟歇山顶
    new THREE.MeshStandardMaterial({ color: C.tile, roughness: 0.8 })
  );
  roof.position.y = 8.5;
  roof.rotation.y = Math.PI / 4;
  g.add(roof);

  // 匾额 "美名书院" (朱红, 镜像修复)
  const plaqueTex = makeBigChar('美名书院', false);
  const plaqueMat = new THREE.MeshStandardMaterial({ map: plaqueTex, transparent: true });
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(6, 1.2, 0.1), plaqueMat);
  plaque.position.set(0, 6.5, 6);
  // 双面材质保正向
  g.add(plaque);

  g.position.set(0, 0, -52);
  scene.add(g);

  // 加雾化效果：在书院和玩家之间放一层半透明 plane，模拟"远处看不清"
  const fogPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 25),
    new THREE.MeshBasicMaterial({
      color: C.bg,
      transparent: true,
      opacity: 0.32,  // 半透明雾化
      depthWrite: false,
    })
  );
  fogPlane.position.set(0, 7, -45);
  scene.add(fogPlane);
}
```

## 8. 石拱桥实现

```javascript
function buildArchBridge() {
  const g = new THREE.Group();

  // 拱形桥面（用 ExtrudeGeometry 沿 arch shape 拉伸）
  const shape = new THREE.Shape();
  shape.moveTo(-7, 0);
  shape.lineTo(7, 0);
  shape.lineTo(7, 1.2);
  // 拱形上沿
  shape.absarc(0, 0.8, 5, 0, Math.PI, true);
  shape.lineTo(-7, 1.2);
  shape.lineTo(-7, 0);

  const extrudeSettings = { depth: 4, bevelEnabled: false };
  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const mat = new THREE.MeshStandardMaterial({
    color: C.bridge,
    roughness: 0.88,
    flatShading: true
  });
  const bridge = new THREE.Mesh(geo, mat);
  bridge.rotation.y = Math.PI / 2;
  bridge.position.set(0, 0.6, 2);
  g.add(bridge);

  // 桥栏杆 - 两侧 6 根矮石柱
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const pillar = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.6, 0.25),
        new THREE.MeshStandardMaterial({ color: C.bridge, roughness: 0.88 })
      );
      pillar.position.set(-5 + i * 2, 1.8, side * 2);
      g.add(pillar);
    }
  }

  // 桥面纹理 - PlaneGeometry 贴在拱顶
  // (此处简化，让 codex 写时按需)

  scene.add(g);

  // 物理: 拱桥用 cannon-es 凸壳近似 - 让玩家可以开车上去
  // 简化方案: 用 5 个 Box 阶梯近似拱形
  const halfDepth = 2;
  const stepCount = 9;
  for (let i = 0; i < stepCount; i++) {
    const t = (i / (stepCount - 1)) * 2 - 1;  // -1 to 1
    const yArch = 1.5 * Math.cos(t * Math.PI / 2);  // 桥的拱形高度
    const x = t * 7;
    const stepBody = new CANNON.Body({
      mass: 0,
      material: groundMat,
      shape: new CANNON.Box(new CANNON.Vec3(0.9, 0.3, halfDepth)),
    });
    stepBody.position.set(x, 0.6 + yArch, 2);
    world.addBody(stepBody);
  }
}
```

## 9. 水塘 (椭圆) 实现

```javascript
function buildPond() {
  // 浅水 PlaneGeometry 30×12, 椭圆形 mask 通过 alphaMap
  const w = 30, d = 12;
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // 椭圆 mask
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 512);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(512, 256, 480, 230, 0, 0, Math.PI * 2);
  ctx.fill();
  const alphaTex = new THREE.CanvasTexture(canvas);

  // 水色 渐变 + 涟漪纹理
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = 1024; colorCanvas.height = 512;
  const cctx = colorCanvas.getContext('2d');
  const grad = cctx.createRadialGradient(512, 256, 0, 512, 256, 480);
  grad.addColorStop(0, '#6B7A75');  // 中心深
  grad.addColorStop(0.7, '#A8B8AE');
  grad.addColorStop(1, '#C8D2C5'); // 边浅
  cctx.fillStyle = grad;
  cctx.fillRect(0, 0, 1024, 512);
  // 添加细微噪点模拟波纹
  for (let i = 0; i < 200; i++) {
    cctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
    cctx.beginPath();
    cctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 8, 0, Math.PI * 2);
    cctx.fill();
  }
  const colorTex = new THREE.CanvasTexture(colorCanvas);

  const geo = new THREE.PlaneGeometry(w, d);
  const mat = new THREE.MeshStandardMaterial({
    map: colorTex,
    alphaMap: alphaTex,
    transparent: true,
    roughness: 0.4,
    metalness: 0.2,
    side: THREE.DoubleSide,
  });
  const pond = new THREE.Mesh(geo, mat);
  pond.rotation.x = -Math.PI / 2;
  pond.position.set(0, -0.05, 0);
  scene.add(pond);

  // 锦鲤 3 条 - 缓动 mesh
  const fishGroup = [];
  for (let i = 0; i < 3; i++) {
    const fish = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 8, 6),
      new THREE.MeshStandardMaterial({ color: C.accent, emissive: 0x551111 })
    );
    fish.scale.set(1, 0.4, 0.6);
    fish.position.set((i - 1) * 6, 0, (i % 2 === 0 ? -2 : 2));
    fish.userData = {
      baseX: fish.position.x,
      baseZ: fish.position.z,
      phase: i * 1.2,
    };
    scene.add(fish);
    fishGroup.push(fish);
  }
  // 在 animate loop 里:
  // for (const f of fishGroup) {
  //   const t = clock.getElapsedTime();
  //   f.position.x = f.userData.baseX + Math.sin(t * 0.5 + f.userData.phase) * 2;
  //   f.position.z = f.userData.baseZ + Math.cos(t * 0.3 + f.userData.phase) * 1.5;
  // }
}
```

## 10. 入门 30 秒脚本

```
T=0s    [玩家进入场景]
        相机位置 (0, 8, 60) 朝北
        视野: 出生草地 + 远处石拱桥 + 极远处书院剪影 + 远山
        中央 4 联系地刻 + "美名书院" 矮立木牌

T=0.5s  [intro 淡出, 入门提示淡入]
        提示文字: "WASD 开车 · 朝北开 ↑"
        地面浮现箭头朝北

T=3s    [第一次按 W]
        车子向前开
        相机切第三视角跟随

T=10s   [开到桥头 z=10]
        proximity 触发: "桥头·小心拱形"
        cursor-ring 显示 "上桥"

T=15s   [开上拱桥]
        车物理上爬坡
        镜头微抬 (lookahead 提高)
        视野扩大: 看到桥另一边 + 远景书院更近

T=20s   [开到桥南北任一卷轴附近]
        卷轴 trigger 范围 5m → cursor-ring "阅卷"
        按 E 弹 dialog

T=30s   [玩家自由探索]
        - 往东开 → 奖项坡
        - 往北开 → 书院近景 (可走到 z=-50 附近)
        - 往南开 → 联系地刻
```

## 11. 物理参数（继承 v1.1, 仅调）

```javascript
// 车物理保留 v1.1:
// - chassis Box mass=40
// - 4 wheel suspensionStiffness=30, frictionSlip=5

// 边界 halfBound: 14 → 80
// 边界外: bodybody.position.x = Math.sign(x) * 80; (cosmetic clamp, 视野提示)

// 翻车 reset 保留 v1.1: upDot < 0.3 持续 1.5s

// fog: scene.fog = new THREE.Fog(C.bg, 50, 130)
// 相机 far: PerspectiveCamera fov=55, near=0.1, far=300 (从 200 调到 300)
```

## 12. 保留 / 移除 / 新增清单

### 保留 (v1.1 → v2 不变)
- 车物理 + 翻车 reset 系统
- cursor-ring + HUD 设计
- 5 项目 + 3 奖项 + 4 联系数据
- 入门 intro 流程 / dialog 抽屉
- ProximityTrigger / dialog 触发逻辑
- makeAwardTex / makeBigChar / makeScrollTex / wrapText / makeContactDecal 函数（仅修 mirror 用 BoxGeometry 多材质）
- HUD CSS + design tokens (--accent / --bg / --ink)

### 移除 / 大改
- ~~围墙 4 面 (30×30)~~ → 完全删除 addWallSegment / wallTex
- ~~月洞门 north wall~~ → 删除
- ~~14 件装饰物布局~~ → 重新分布
- ~~灯笼 8/4 个~~ → 仅 2 个石灯笼放书院门口
- ~~铜钱堆 / 战鼓 / 铜铃阵 / 酒瓮~~ → 全部移除
- ~~"格物致知" 4 立体字 1m×1m~~ → 缩小到 0.5×0.5，放桥北 z=-12 一字排
- ~~groundGeo PlaneGeometry(60,60)~~ → PlaneGeometry(200, 200)
- ~~groundTex 棋盘格~~ → 重写 makeGroundTex：草地+沙路混合（曲线小路从 z=+45 蜿蜒到 z=-30）
- ~~halfBound = 14~~ → 80
- ~~scene.fog Fog(C.bg, 35, 70)~~ → Fog(C.bg, 50, 130)

### 新增 (v2)
- `buildDistantMountains()` 远山剪影
- `buildSkyDome()` 天空渐变球壳
- `buildDistantHall()` 远景书院（替换 buildHall）
- `buildArchBridge()` 石拱桥（含物理 9-step 近似）
- `buildPond()` 重写（椭圆水塘 + 锦鲤动效）
- `makePeach()` 加密版（南侧 5 棵 + 东西各 6 棵 = 17 棵）
- `makeBambooCluster()` 北侧 6 簇
- `buildStoneLantern()` 2 座（替换灯笼）
- `buildArrivalSign()` 出生区 "美名书院 →" 矮立木牌
- `buildGuideArrow()` 出生区地面箭头
- `buildSandPath()` 蜿蜒沙路（CanvasTexture 上画曲线）
- Update `makeGroundTex` - 草地基底 + 沙路曲线

## 13. 阶段切分 (codex exec 分批)

⚠️ **重要**: 给 codex 分批跑，避免单次 prompt 太大失败。每批跑完 Claude 介入验证再下一批。

### Phase A: 调色 + 场地 + 远景 (最重要, 占视觉 60%)
任务给 codex:
1. 修改 `const C = {...}` 加入新色（保留 v1.1 字段）
2. 修改 `groundGeo PlaneGeometry(60,60)` → `(200, 200)`
3. 重写 `makeGroundTex()` - 草地基底 + 蜿蜒沙路
4. 删除 `addWallSegment` 调用（保留函数定义以防 v3 用）
5. 调整 `scene.fog` 50/130
6. 添加 `buildDistantMountains()` 远山剪影
7. 添加 `buildSkyDome()` 天空渐变球壳
8. 修改 `halfBound = 14` → `80`

**验收**: 开车进场，能看到远山 + 蓝天 + 大草地，无围墙，雾接得自然。

### Phase B: 远景书院 + 移除/缩小 v1 物体
1. 用 `buildDistantHall()` 替换 `buildHall()` + `buildLibrary()` + `buildMoonGate()` 调用
2. 缩小 `buildStereoWord()` 字号 0.5x，重定位到 (z=-12, x=-3/-1/+1/+3)
3. 移除 buildDrum/buildBells/buildCoins 调用（不删函数定义，仅注释 build*()）
4. 灯笼 buildLanterns 改为 buildStoneLantern() 仅 2 座

**验收**: 远处能看到书院剪影，"格物致知"4 字在桥北变小，零灯笼朱红。

### Phase C: 拱桥 + 水塘
1. 实现 `buildArchBridge()` 含物理 9-step
2. 重写 `buildPond()` 椭圆水塘 + 锦鲤
3. 在 animate loop 里加锦鲤摆动

**验收**: 拱桥可开车上下，水塘是椭圆有锦鲤摆动。

### Phase D: 卷轴重做 + 路径分布
1. 重写 `buildScrolls()` - 5 个 3D 真竹简卷轴 (上下轴+轴帽+米黄纸+矮石台)
2. 修改 `scrollPositions` 数组到新坐标
3. 修改 `buildContactDecals()` 4 联系地刻位置到出生区
4. 修改 `buildTrophies()` 3 奖项位置到东侧坡

**验收**: 5 卷轴在路径两侧，3 奖项在东坡，4 联系在出生区。

### Phase E: 植物 + 软边界
1. 加密桃林：南侧 5 棵 + 东西 12 棵
2. 北侧竹林 6 簇
3. 松/梅/苔藓 重新散布
4. 添加 `buildStoneLantern()` 2 座
5. 添加 `buildArrivalSign()` + `buildGuideArrow()`

**验收**: 桃林作软边界明显，竹林在北，引导箭头清晰。

### Phase F: 入门脚本 + dialog 触发位置更新
1. 更新出生位置 (0, 1.5, 45)
2. 更新 firstMoveTime 后的提示文字
3. dialog trigger 位置同步卷轴新坐标

**验收**: 入门 30 秒流程畅通，proximity 触发正常。

## 14. CDP 验收截图清单

每个 Phase 完成后 Claude CDP 截图：

1. `v2-phase-a-distance.png` - 入场全景，远山 + 蓝天 + 大草地
2. `v2-phase-a-far.png` - 开到中央回望，三层景深
3. `v2-phase-b-hall.png` - 远景书院剪影 + 雾化
4. `v2-phase-c-bridge.png` - 拱桥近景 + 水塘锦鲤
5. `v2-phase-c-bridge-top.png` - 上桥俯视
6. `v2-phase-d-scrolls.png` - 5 卷轴沿路径分布
7. `v2-phase-d-scroll-close.png` - 卷轴近景看 3D 立体感
8. `v2-phase-e-peach.png` - 桃林软边界
9. `v2-phase-e-bamboo.png` - 北侧竹林
10. `v2-phase-f-intro.png` - 入门提示淡入

最终一张：`v2-final-hero.png` 从出生点拍向北的英雄镜头

## 15. 验收红线

- [ ] 入场第一帧：看不到任何围墙，远处必须看到 (a) 远山剪影 (b) 远景书院 (c) 蓝天渐变 三者俱全
- [ ] 朱红用量肉眼 ≤ 5%（仅匾额/卷轴轴帽/锦鲤眼/印章）
- [ ] 至少能识别 3 层视觉景深（远山/书院/前景）
- [ ] 拱桥可开车上去且回得来
- [ ] 翻车 reset 仍然工作
- [ ] cursor-ring 在卷轴/奖项前正常显示文字态
- [ ] dialog 弹出后内容正确
- [ ] FPS ≥ 30 (200×200 ground + 多 mesh，性能可能掉)

## 16. 已知风险 & Plan B

| 风险 | 影响 | Plan B |
|------|------|--------|
| 200×200 ground + 30+ mesh 导致 FPS < 30 | 卡顿 | 远山/天空用 BasicMaterial 不计算光照；远树用 LowDetail；fog 拉近到 100 |
| 拱桥 9-step 物理不平滑（车子卡顿） | 体验差 | 改用 ConvexPolyhedron 凸壳 + 6 个顶点近似 |
| 远景书院太小看不清 | 失去视觉锚 | 加大到 0.8x v1 尺寸，雾透明度从 0.32 → 0.20 |
| 卷轴 3D 后碰撞复杂 | 触发不准 | 保留单独的 isTrigger Box 体积，3D 视觉只是包装 |
| 沙路曲线纹理在 200×200 plane 上模糊 | 路径看不清 | 改用 4096×4096 canvas + repeat 4 |

## 17. v3 待办（v2 后再做）

- 框景卷轴 3D 展开（dialog 改成实景 3D 卷轴）
- 音效层 Howler.js（鸟鸣/水声/竹叶沙沙/桥木吱呀）
- 视角切换 C 键（第一/第三/俯视）
- 上下车 F 键 + 走路模式
- 移动端虚拟摇杆
- 季节切换（春樱/秋枫/冬雪）

---

**spec 起草**: Claude Opus 4.7 (1M context), 2026-05-19
**执行**: codex-cli 0.130.0 (Phase A-F)
**集成验证**: Claude Opus 4.7 + agent-browser CDP
