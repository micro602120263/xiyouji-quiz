# 性格测试框架 UI 优化规范

> 基于5个优秀网站的研究成果
> 版本：v1.0
> 日期：2026-07-31

---

## 一、设计系统（Design Tokens）

### 1.1 颜色系统

```css
:root {
  /* 背景层级 */
  --bg: #0a0a0c;
  --surface: #12121a;
  --surface2: #1a1a24;
  --surface3: #222230;

  /* 主题色（每个测试内容包可覆盖） */
  --accent: #c9a84c;
  --accent-dim: #8a7235;
  --accent-bright: #e8c85a;
  --accent-glow-rgb: 201, 168, 76;

  /* 文字层级 */
  --text: #e2ddd0;
  --text-dim: #8a8478;
  --text-faint: #5a564e;

  /* 边框 */
  --border: #2a2a35;
  --border-light: #3a3a48;
}
```

### 1.2 字体系统

```css
/* 标题字体（衬线体，有力量感） */
--font-heading: 'Cinzel', 'Noto Serif SC', serif;

/* 正文字体（中文宋体 + 英文衬线） */
--font-body: 'Noto Serif SC', 'EB Garamond', Georgia, serif;

/* 辅助字体（标签、小字） */
--font-label: 'Cinzel', 'Noto Serif SC', serif;
```

### 1.3 间距系统

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

---

## 二、页面结构规范

### 2.1 Landing Page（首页）

```
┌──────────────────────────────────────┐
│  [Logo]              [语言切换]      │  ← 固定顶部
├──────────────────────────────────────┤
│                                      │
│     ✦ ─── 装饰线 ─── ✦             │
│                                      │
│        测试标题（Cinzel，clamp）     │
│        副标题/Tagline（斜体）        │
│                                      │
│        [ 开始测试 ]                  │  ← 暗红渐变+金色边框
│                                      │
│     "经典语录或描述"                 │
│                                      │
├──────────────────────────────────────┤
│  📊 已测试 N 人 · 无需注册 · 即时结果│  ← 信任信号
├──────────────────────────────────────┤
│  How It Works                        │
│  ① 开始 → ② 回答 → ③ 获得结果      │  ← 3步骤说明
├──────────────────────────────────────┤
│  Footer · 打赏/赞助链接              │
└──────────────────────────────────────┘
```

**关键规则：**
- 首页**不展示任何角色头像**
- Hero区域全屏居中，大量留白
- 装饰线：`1px linear-gradient(90deg, transparent, var(--accent-dim), transparent)` + 中心✦
- 开始按钮：`linear-gradient(135deg, var(--accent), var(--accent-bright))`

### 2.2 测试界面

```
┌──────────────────────────────────────┐
│  1/30    [████████░░░░░░░]   性格    │  ← sticky顶部
├──────────────────────────────────────┤
│                                      │
│  01 · 性格                           │  ← 题号（金色，Cinzel）
│                                      │
│  你更喜欢哪种工作方式？              │  ← 题目（大号，加粗）
│                                      │
│  ┌─ A · 独立思考，安静专注           │
│  ├─ B · 团队协作，头脑风暴           │  ← 选中：左侧3px金色竖条
│  ├─ C · 先观察再行动                 │
│  └─ D · 直接行动，边做边学           │
│                                      │
├──────────────────────────────────────┤
│  [← 上一题]         [下一题 →]      │  ← sticky底部
└──────────────────────────────────────┘
```

**选项卡片样式：**
```css
.quiz-option {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  transition: all .3s;
}

/* 选中时左侧竖条 */
.quiz-option::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--accent);
  transform: scaleY(0);
  transition: transform .3s;
}

.quiz-option.selected::before {
  transform: scaleY(1);
}
```

### 2.3 结果页

```
┌──────────────────────────────────────┐
│                                      │
│        角色名（clamp(24px, 6vw, 40px)）│  ← 主题色+发光
│        English Name                   │
│        "经典语录"（引号+金色）        │
│                                      │
├──────────────────────────────────────┤
│  📊 灵魂档案                         │
│  [五维雷达图 SVG/Canvas]             │
├──────────────────────────────────────┤
│  维度详情                            │
│  武勇 ████████░░░░ 85/100            │  ← 渐变条+扫描线
│  智慧 ██████░░░░░░ 62/100            │
│  权谋 █████████░░░ 78/100            │
│  魅力 ███████░░░░░ 71/100            │
│  统率 ██████████░░ 92/100            │
├──────────────────────────────────────┤
│  [性格解读]  [背景故事]              │  ← Tab切换
│                                      │
│  解读内容（左侧2px金色边框）         │
│                                      │
├──────────────────────────────────────┤
│  🏆 最佳匹配                         │
│  1. 曹操 · 92%                       │
│  2. 司马懿 · 85%                     │
│  3. 孙权 · 78%                       │
├──────────────────────────────────────┤
│  📤 分享截图  ·  复制链接            │
├──────────────────────────────────────┤
│  ☕ 打赏作者                          │
│  [微信赞赏码] [支付宝收款码]         │
└──────────────────────────────────────┘
```

---

## 三、组件规范

### 3.1 按钮

```css
/* 主按钮（开始测试、下一题） */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 48px;
  background: linear-gradient(135deg, var(--accent), var(--accent-bright));
  color: var(--text);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  border: 1px solid rgba(var(--accent-glow-rgb), .3);
  position: relative;
  overflow: hidden;
  transition: all .4s;
}

/* 悬停扫光效果 */
.btn-primary::before {
  content: "";
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,.08) 50%, transparent 60%);
  transform: translate(-100%);
  transition: transform .6s;
}
.btn-primary:hover::before {
  transform: translate(100%);
}

/* 次要按钮（上一题、分享） */
.btn-secondary {
  padding: 14px 40px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  letter-spacing: 2px;
  transition: all .3s;
}
```

### 3.2 卡片

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 24px 22px;
}
```

### 3.3 进度条

```css
.progress-bar {
  height: 2px;
  background: var(--border);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-bright));
  transition: width .5s cubic-bezier(.4, 0, .2, 1);
}
```

### 3.4 维度条

```css
.dim-bar {
  height: 3px;
  background: var(--border);
  border-radius: 1.5px;
  overflow: hidden;
}
.dim-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-dim), var(--accent));
  border-radius: 1.5px;
  box-shadow: 0 0 6px rgba(var(--accent-glow-rgb), .4);
  transition: width 1.2s cubic-bezier(.4, 0, .2, 1);
  position: relative;
  overflow: hidden;
}

/* 扫描线动画 */
.dim-bar-fill::after {
  content: "";
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent);
  width: 40%;
  animation: dimScanline 3s ease-in-out infinite;
}
@keyframes dimScanline {
  0% { transform: translate(-100%); }
  100% { transform: translate(350%); }
}
```

---

## 四、图片使用规范

### 4.1 背景图（9:16竖屏）

**❌ 错误做法：**
```css
/* 直接铺满，被拉伸裁切 */
background-image: url("bg.jpg");
background-size: cover;
```

**✅ 正确做法：**
```css
/* 方案A：作为Hero区域背景，有渐变遮罩 */
.hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 60vh;
  background-image: url("bg.jpg");
  background-position: center top;
  background-size: cover;
  z-index: 0;
}
.hero-bg::after {
  content: "";
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 200px;
  background: linear-gradient(transparent, var(--bg));
}

/* 方案B：居中显示，周围留黑边 */
.bg-container {
  width: 100%;
  max-width: 430px; /* 手机宽度 */
  margin: 0 auto;
  aspect-ratio: 9/16;
  background-image: url("bg.jpg");
  background-position: center center;
  background-size: cover;
  border-radius: 12px;
}
```

### 4.2 装饰元素

```css
.decoration {
  position: absolute;
  opacity: 0.15; /* 透明度15-25%，不要太抢眼 */
  pointer-events: none;
  z-index: 0;
}
```

### 4.3 角色头像

```css
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  box-shadow: 0 0 20px rgba(var(--accent-glow-rgb), .3);
  object-fit: cover;
}
```

---

## 五、动效规范

### 5.1 允许的动效
- ✅ 按钮hover扫光（translate, 0.6s）
- ✅ 选项选中竖条缩放（scaleY, 0.3s）
- ✅ 进度条宽度过渡（cubic-bezier, 0.5s）
- ✅ 维度条宽度过渡（cubic-bezier, 1.2s）
- ✅ 维度条扫描线循环（3s）
- ✅ 结果页主题色呼吸发光（4s）
- ✅ 卡片淡入上移（fadeIn, 0.5s + 延迟）

### 5.2 禁止的动效
- ❌ 全屏粒子/浮动效果
- ❌ 毛玻璃+复杂动画同时出现
- ❌ 页面级Framer Motion动画
- ❌ 加载时的旋转/弹跳

---

## 六、移动端适配规范

```css
/* 最小点击区域 */
.quiz-option {
  min-height: 44px;
  padding: 16px 18px;
}

/* 底部导航固定 */
.quiz-footer {
  position: sticky;
  bottom: 0;
  z-index: 9;
  background: linear-gradient(transparent, var(--bg) 24%, var(--bg));
}

/* 字体自适应 */
.quiz-question-text {
  font-size: clamp(18px, 4.5vw, 24px);
}

.result-name {
  font-size: clamp(24px, 6vw, 40px);
}

/* 480px以下 */
@media (max-width: 480px) {
  .quiz-body { padding: 20px 16px; gap: 14px; }
  .quiz-option { padding: 12px 14px; }
  .quiz-nav { padding: 4px 16px 32px; }
  .btn-nav { padding: 12px; }
}
```

---

## 七、分享与SEO规范

### 7.1 Open Graph
```html
<meta property="og:title" content="你是西游记里的谁？">
<meta property="og:description" content="通过30道题发现你的西游角色">
<meta property="og:image" content="https://域名/og-image.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

### 7.2 分享按钮
- **截图分享**：html2canvas生成结果图 → 下载/复制
- **链接分享**：URL编码结果参数 → 复制到剪贴板
- **toast提示**：底部居中，金色边框

---

## 八、实施优先级

| 优先级 | 任务 | 影响 |
|--------|------|------|
| P0 | 建立CSS变量系统 | 所有后续工作的基础 |
| P0 | 字体加载（Google Fonts） | 视觉质感提升 |
| P1 | 选项卡片+选中动画 | 测试体验核心 |
| P1 | 结果页主题色系统 | 每个角色有独立视觉 |
| P2 | 首页Landing Page重写 | 第一印象 |
| P2 | 维度条+扫描线动画 | 数据可视化提升 |
| P3 | 扫光按钮、呼吸发光 | 细节打磨 |
| P3 | 分享截图功能 | 传播性 |

---

## 九、美术资源清单

### 需要AI生成的资源

| 资源 | 用途 | 尺寸 | 风格 |
|------|------|------|------|
| 12个角色头像 | 结果页展示 | 512x512 | 水墨古风，统一风格 |
| 首页背景图 | Landing Page Hero | 1080x1920 (9:16) | 水墨山水，已有一张 |
| OG分享图 | 社交媒体分享 | 1200x630 | 包含测试标题+品牌 |

### 已有资源
- ✅ 水墨背景图（`/home/kai/.hermes/cache/images/img_313f1ec105fe.jpg`）
- ✅ 6个水墨装饰元素（剑、棋子、龙、竹简、头盔、山水）
