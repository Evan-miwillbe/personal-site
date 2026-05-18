# drive.html v2 设计规格书

> 基于 10 份并行调研整合，作为开干前的对齐文档。
> 调研日期：2026-05-19
> 目标：bruno-simon 风格 + 中式书院主题 + 单文件 HTML 实现

---

## 0. 核心设计哲学

**一句话**：高级中式 = **少 + 静 + 留白 + 现代字体 + 1 个杀手级手法**，而不是堆 10 个中国元素。

**Bruno 2019 的三个真秘密**（必抄）：
1. 装饰物 ≤ 20 种，**物件密度低 + 单件辨识度高 + 物理可撞**
2. **零 HTML UI**，所有提示都是 in-world 3D 物体
3. **一个 hex 染全场**（Bruno 用 `#d04500`，我们用酒红 `#7F2020` 做 indirect color）

**中式翻车避雷 Top 6**：
- 元素堆砌（春晚舞美灾难）— **当前 play.html 就是这病**
- 字体混用（中老年表情包气质）
- 配色浓烈（过年祝福廉价感）
- 缺少留白（计白当黑被破）
- 只有符号没意境（命题作文感）
- 仿古像景区门票

**当前 play.html UI 病根**：HUD 88% 实底米黄 + 整圈红边 + SaaS 阴影 + 三角米黄盒子夹击 + 三页色值/字体不一致 + 链接 `←` ASCII 箭头 + dialog 底部 toast 弹出 + 缺 cursor-ring 系统。

---

## 1. 装饰物清单（书院极简版，14 件）

**铁律**：宁少勿多。每件必须满足"高辨识度 + 物理可撞 + 单文件能写 ≤ 60 行"三选二。

### 建筑 (5 件)
| # | 名称 | 几何 | hex | 功能 |
|---|---|---|---|---|
| 1 | 牌楼（主入口） | 4 柱 + 双层飞檐 ConeGeometry(4) | #7F2020 柱 / #3A3530 瓦 | 标志物，开车穿过=进入 |
| 2 | 讲堂（中央地标） | BoxGeometry 主体 + ConeGeometry(4) 歇山顶 | #F6F3EB 墙 / #3A3530 瓦 | 中央集合点（参考 bruno 的"BRUNO'S MISSION" 区） |
| 3 | 藏书楼（远景） | 三层 BoxGeometry 叠加 + 每层飞檐 | #F6F3EB + #3A3530 + #C0392B 窗 | 远处导航地标 |
| 4 | 月洞门（区域分隔） | TorusGeometry 半埋 + 墙基 | #F6F3EB 墙 / #3A3530 边 | 开车穿过有过门感 |
| 5 | 白墙黛瓦围墙 | BoxGeometry + 顶 ConeGeometry(3) | #F6F3EB + #3A3530 | 场景边界 |

### 植物 (3 件，只保留辨识度最高的)
| # | 名称 | 几何 | hex |
|---|---|---|---|
| 6 | 竹 | CylinderGeometry 节 + PlaneGeometry 叶 | #869B7E + #5D7B5D |
| 7 | 松 | CylinderGeometry 干 + 3 层 ConeGeometry 针叶 | #2a2520 + #5D7B5D |
| 8 | 梅（含花苞） | 弯干 BufferGeometry + SphereGeometry 花簇 | #2a2520 + #C0392B |

### 水景 (1 件)
| # | 名称 | 几何 | hex |
|---|---|---|---|
| 9 | 荷塘 | PlaneGeometry + 顶点 sin 波动 + 荷叶 + 锦鲤路径动画 | #4A6B7C 水 + #5D7B5D 叶 + #C0392B 鲤 |

### 互动可撞物 (5 件 = bruno 的灵魂)
| # | 名称 | 反应 | 实现 |
|---|---|---|---|
| 10 | 战鼓 | 撞 → 鼓面 0.3s 震动 + 古琴 "宫" 音 | CylinderGeometry + 2 CircleGeometry，物理刚体 |
| 11 | 铜铃阵（5 串） | 撞 → 摇晃 + 古琴 "商" 音 | 5 CylinderGeometry 悬挂 + HingeConstraint |
| 12 | 铜钱堆 | 撞 → 散开滚动 + 古琴 "角" 音 | 20 TorusGeometry 堆叠，物理刚体 |
| 13 | 立体毛笔字"格物致知"（**核心**） | 进场即看到，撞飞 | 4 个独立 Mesh + mass=1.5（**bruno BRUNO'S MISSION 中式翻版**） |
| 14 | 灯笼阵 | 沿主路布置，车靠近发光更亮 | SphereGeometry 拉长 + PointLight |

**砍掉**：石桌石凳、砚台、笔架、棋盘、风铃、卷轴、香炉、笔筒、茶具、抱鼓石、石狮、回廊、六角亭、古井、瀑布、桃兰菊苔藓藤蔓、仙鹤蝴蝶萤火虫灵猫——v2 完善版再说，先做对核心 14 件。

### 内容承载物（数据驱动）
- 项目石碑 × 5（不是墓碑感的方碑，改"竹简卷轴"形状：CylinderGeometry 轴 + PlaneGeometry 展开纸）
- 联系方式 floor decal × 4（地上凸字母 LOGO：GitHub / Email / 公众号 / 飞书）
- 荣誉牌饰 × 3（颁奖台/奖杯 雕塑：飞书十佳 / 校报 / 武警嘉奖）

---

## 2. 场景布局（30m × 30m）

```
       ────────北墙────────────────────
   ┌──────────────────────────────────┐
   │ 松林  [藏书楼远景] 梅园 [影壁]   │  北：荣誉区（3 奖杯雕塑）
   │  奖杯1  奖杯2  奖杯3              │
   │                                    │
   │                                    │
   │ 项目4卷轴   [讲堂]      项目5卷轴 │  中：5 项目区呈梅花形围绕讲堂
   │ (Multi-Agent) │8m│   (Skill 系统) │
   │                                    │
   │ 项目3卷轴               项目2卷轴 │
   │ (Knowledge)             (Obsidian)│
   │                                    │
   │      ~~ 荷塘 + 锦鲤 ~~            │  中南：水景过渡
   │       ≋ 弧形小桥 ≋                │
   │                                    │
   │ 项目1卷轴                          │
   │ (飞书 CLI)                         │
   │   联系: G  E  公  飞               │  南：4 floor decal + 5 互动物
   │   ╔═══ "格物致知" ═══╗            │  ★ 中央可撞立体字（核心 wow point）
   │  战鼓 铜铃 铜钱        灯笼阵     │
   │                                    │
   │           ║║月洞门║║              │  入口
   │     ━━━━━━牌楼━━━━━━              │
   └──────────────────────────────────┘
```

**动线**：牌楼 → 撞"格物致知"立体字 → 撞互动物 → 沿灯笼路 → 荷塘 → 5 项目石碑（梅花形）→ 讲堂 → 北区 3 奖杯。

---

## 3. 车物理（cannon-es RaycastVehicle）

```
chassis: BoxGeometry(1×0.6×2) + 4 CylinderGeometry 轮 + 天线 + 刹车灯
mass: 40, allowSleep: false
4 wheels: radius 0.3, suspensionStiffness 30, frictionSlip 5
gravity: -13 Y-up
```

**车造型**：黑色车身 + 米黄车顶 + 酒红条 + 黄色车灯 + 天线（顶端小铃铛）+ 刹车灯（红色透明度切换）。
**车铃**（不要喇叭）：H 键触发 + 古铃叮叮 1 声。

**操控**：
- W/↑ 加速 / S/↓ 倒车 / A/D/←/→ 转向
- Space 跳跃（短按）
- Shift 加速 boost
- R 复位（卡墙时）
- C 切第一/第三人称视角
- F 上下车
- H 鸣车铃
- E 互动（进入项目区时）

---

## 4. 视角切换

| 模式 | distance | height | fov | damping | 显示 |
|---|---|---|---|---|---|
| 第三人称（默认） | 6m | 2.8m | 55° | 6 | 看着车 + 卷轴 HUD |
| 第一人称 | 0 | (0.35, 1.15, 0.2) | 65° | — | 看车头 + 仪表盘 mesh |
| 走路（下车后） | 3.5m | 1.8m | 60° | 8 | 看着角色 + 卷轴 HUD |

**切换 C**：0.5s cubic ease-in-out + 锁输入。
**下车 F**：角色 spawn 车左 1.2m，走到车 2m 内显示"按 F 上车"（3D 灯笼提示）。

---

## 5. UI/HUD 设计语言

**一句话**：**半透宣纸 HUD + 朱砂细线 + 老宋体印章 + 玻璃酒红光标**，**HUD 永远比场景更暗更透**。

### 5.1 三页共用 design tokens（写进 :root）
```css
--bg: #F6F3EB;          /* 米黄底 - 三页统一 */
--ink: #2a2520;         /* 墨色字 */
--ink-soft: #6b6358;
--accent: #7F2020;      /* 酒红，三页统一不再有 #8b2f2f */
--hud-bg: rgba(246, 243, 235, 0.35);   /* 半透宣纸，不再是 88% */
--hud-border: rgba(127, 32, 32, 0.4);
--hud-blur: blur(14px) saturate(1.1);
--cinnabar-line: 1px solid rgba(127, 32, 32, 0.4);
```

### 5.2 角落布局（每角 ≤ 1 元素，中央永远空着）
- **TL**：站点名"砺剑 · 美名书院"（纯文字浮链接，无盒子）
- **TR**：3 页切换 mono 小写英文 `home · editorial · drive · walk`（透明 + hover 朱砂下划线）
- **BL**：当前模式 + 速度（mono 小字，淡灰，不抢戏）
- **BR**：🔇 呼吸图标（首次点击解锁声音）+ `?` 帮助
- **中央**：永远空，只在 dialog 时占用

### 5.3 替换当前 4 个问题样式
1. **HUD 框**：35% 米黄底 + 1px 朱砂左单边 + blur 14px，**删整圈边框 + 删 SaaS 阴影**
2. **顶部链接**：transparent + JetBrains Mono 11px lowercase + hover 朱砂下划线
3. **proximity 提示**：宣纸贴条样（55% 米黄 + 朱砂细边 + 直角 + 印章字），不要实心酒红 toast
4. **dialog**：改"右侧抽屉"（translateX 从右滑入 0.5s），不再底部抖落

### 5.4 字体限制
- **标题**：思源宋体（已加载 Noto Serif SC）+ Cormorant Garamond
- **正文/UI**：思源黑体 / Inter（fallback）
- **代码/标签**：JetBrains Mono
- **三页统一**，不再各用各的

### 5.5 光标系统
- 抄 hello.html 的 cursor-ring（酒红玻璃环 + .hover .text 状态 + lerp 0.22）
- 三页统一用同一套 cursor-ring

### 5.6 弹窗 = in-world 3D（bruno 哲学）
- 项目石碑触发 → **不弹 HTML modal**，竹简卷轴在 3D 场景里"展开"动画 0.5s（PlaneGeometry 缩放）
- 撞到牌坊"E"灯笼呼吸光 + 按 E 触发卷轴
- 卷轴上文字用 CanvasTexture 渲染（已有 wrapText 工具函数）
- 按 ESC 关闭卷轴卷起 0.3s

---

## 6. 入门引导 30 秒脚本

| 时间 | 看到 | 系统 |
|---|---|---|
| 0.0s | 牌楼 + 停在路口的木轮小车 + 远处"格物致知"立体字 + BGM 古琴渐入 | 锁定车后视角，0.5s 禁输入 |
| 0.5s | 右下卷轴展开「驾车 W A S D」 + 键盘小图标 | 监听首次按键 |
| 3s | 若无输入：卷轴轻抖 | 软提示 |
| 5s | 按 W 车启动 → 卷轴缩成右下角小卷图标 → 第一对灯笼点亮（Journey 光路） | 第一阶段完成 |
| 8s | 自然拖鼠标 → 右上"按住鼠标 观四方" 1s 淡入 3s 卷起 | 第二技能 |
| 15s | 沿灯笼路开过去 → "格物致知"立体字进入视野 + 牌坊"E"红灯笼呼吸光 | 视觉锚点 |
| 20s | 距牌坊 8m → 第三卷轴「按 E 阅卷」 | 上下文触发 |
| 25s | 按 Shift → "疾驰"二字 0.8s 淡入淡出（发现奖励） | show don't tell |
| 30s | 停在牌坊前 → 准备打开项目卷轴 | 留尾巴（Space/R 不教，第一次卡才教） |

**双轨制**：东方卷轴 + 西式键盘图标兜底。

---

## 7. 音效架构（v1 预留 hook，v2 接入）

```js
// v1 留 4 个空 hook：
onCarSpeed(v01)   // 引擎 rate 跟速度
onStelaHit(idx)   // 古琴五声音阶 pitch 切换
onTrophy()        // 编钟余音 + base ducking
onCollision()     // 木质 bump 限流 200ms
```

7 文件 ≤ 1.5MB：base（庭院 8s loop）+ bell（钟）+ koi（水）+ pluck（古琴 D 五声）+ chime（编钟）+ engine（idle）+ bump（木撞）。Howler.js 接入。

v1 默认静音 + 右上呼吸 🔇 图标，**首次点击解锁**（绝不弹"点击开始声音"遮罩）。

---

## 8. 杀手级手法（书院主题的 1 招）

参考三选一：

**A. 框景式项目卡片**（苏博漏窗思路）
- 项目石碑改"竹简卷轴"展开 + 卷轴像窗洞看进 3D 场景小景（项目截图视差）
- 鼠标 hover 卷轴 → 窗后景视差移动 1.5x

**B. NPR 水墨 shader 后期 pass**（Susurrus 思路）
- 整个场景上一遍 Kuwahara 后期，输出自带"宣纸画卷感"
- 实现难度：post-processing pass，约 80 行 GLSL

**C. 纹样导览**（故宫缠枝纹思路）
- 地面铺缠枝纹动线，从一个项目区延伸到下一个
- 鼠标沿纹样滑动触发不同项目

**推荐 A**：实现成本最低（不需要 shader），书院"竹简卷轴+窗洞透景"语义最贴切。**B 留 v3**（水墨 shader 太重）。

---

## 9. 阶段切分 + 验收标准

### v1（跨夜 8-12h）：**能开车 + 撞物 + 打开卷轴**
**必须达成**：
- [ ] 程序化卡通车 + RaycastVehicle 物理（WASD + Space + R）
- [ ] 第三人称跟随相机 + 鼠标拖拽 + spring-arm 避障
- [ ] 5 个项目竹简卷轴（数据来自 SITE_DATA.projects）+ 触发"竹简展开"动画
- [ ] 4 个联系 floor decal（GitHub/Email/公众号/飞书）+ 点击 window.open
- [ ] 3 个荣誉奖杯雕塑（来自 SITE_DATA.awards）
- [ ] 牌楼 + 讲堂 + 月洞门 + 围墙
- [ ] 灯笼阵 8 盏（Journey 光路）
- [ ] **可撞立体字"格物致知"**（mass=1.5）
- [ ] 战鼓 + 铜铃阵 + 铜钱堆 物理互动
- [ ] 入门 30 秒脚本完整跑通
- [ ] UI 全面采用新设计语言（HUD/光标/卷轴 dialog）
- [ ] 三页 design tokens 统一

**验收方式**：CDP 自动化跑 30 秒脚本 + 截图 5 张（牌楼/项目区/格物致知撞前撞后/卷轴弹出/奖杯区）

### v2（追加 4-6h）：**视角切换 + 下车走路 + 杀手级手法 A**
- [ ] C 切第一/第三人称（0.5s cubic ease）
- [ ] F 上下车 + 角色模型 + 走路控制（沿用 play.html walking 逻辑）
- [ ] 项目竹简卷轴里嵌入"窗洞透景"视差小景
- [ ] 音效 7 文件接入 + 4 个 hook 点连通
- [ ] 移动端虚拟摇杆 + 速度按钮（v2 可选）

### v3（未来）：水墨 NPR shader + Blender 真车 + 完整移动端

---

## 10. 与三页关系

| 页 | 角色 | 改动 |
|---|---|---|
| hello.html | 主页（书院风极致） | 顶部链接加 `drive`，光标系统保持，design tokens 统一到三页共用 |
| index.html | 古籍/文人编辑版 | `--accent` 改 #7F2020、`--bg` 改 #F6F3EB、`--ink` 改 #2a2520 与另两页对齐 |
| play.html | 书院漫步（步行 3D） | 标题/链接改"书院漫步"区别于 drive；HUD 改 35% 透 + 1px 朱砂左单边；toplinks 去盒子化 |
| drive.html（新） | 开车版（本规格书） | 全新单文件，沿用 data.js + design tokens |

三页顶部统一：`home · editorial · walk · drive`（mono 小写英文 + hover 朱砂下划线）。

---

## 11. 实施前必须确认的 3 件事

1. **杀手级手法**选 A（框景卷轴）/ B（NPR 水墨）/ C（纹样导览）？— 我推荐 A
2. **是否走 ESM + import map**加载 cannon-es？这是单文件能跑 RaycastVehicle 的唯一办法
3. **是否同步重做 play.html 书院漫步**的 UI（35% 透 + design tokens 统一），还是仅做 drive.html

---

## 12. Bruno 真秘密总结（贴在屏幕上）

- 装饰物 ≤ 20 种，物件密度低 + 高辨识度 + 物理可撞
- 零 HTML UI，全是 in-world 3D 物体
- **一个 hex `#7F2020` 染全场**（indirect light + matcap）
- 第一交互是可撞立体字
- 互动区是地面拓印 + "E" 按键升起 + window.open 不弹 modal
- 颜色调色板 13 个 matcap + flat color，**没有动态光照**（性能极好）
- 单乐器（古琴 D 五声）一个文件干所有互动音变奏
