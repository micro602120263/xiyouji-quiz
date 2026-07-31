import { useState, useCallback } from "react";
import { sanguoCharacters, sanguoQuestions, calculateSanguoResult, calculateDimensionScores, dimensions } from "./packs/sanguo";

// ===== 数据定义 =====
type TestType = "xiyouji" | "sanguo";

interface Question {
  id: number;
  text: string;
  options: { label: string; scores: Record<string, number> }[];
}

interface Character {
  id: string;
  name: string;
  title: string;
  motto: string;
  color: string;
  bgGradient: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  career: string;
  loveStyle: string;
  rarity: string;
}

const characters: Character[] = [
  {
    id: "wukong", name: "孙悟空", title: "齐天大圣",
    motto: "我要这天，再遮不住我眼",
    color: "#C41E3A", bgGradient: "linear-gradient(135deg, #FF6B6B 0%, #C41E3A 100%)",
    description: "你是天生的斗士，无所畏惧，永远冲在最前面。你嫉恶如仇，眼里容不得半点沙子。虽然有时冲动，但你的勇气和忠诚让所有人敬佩。",
    strengths: ["勇敢无畏", "忠诚可靠", "能力出众", "创意十足"],
    weaknesses: ["容易冲动", "有时自负", "缺乏耐心"],
    career: "创业者 / 项目经理 / 销售冠军",
    loveStyle: "热烈直接，会为爱的人赴汤蹈火",
    rarity: "8%"
  },
  {
    id: "sanzang", name: "唐三藏", title: "旃檀功德佛",
    motto: "贫僧自东土大唐而来，去往西天拜佛求经",
    color: "#D4A017", bgGradient: "linear-gradient(135deg, #FFD700 0%, #D4A017 100%)",
    description: "你是团队的精神领袖，温和而坚定。你相信善良的力量，即使面对困难也不放弃信念。你的包容和耐心是团队的粘合剂。",
    strengths: ["善良包容", "意志坚定", "有大局观", "善于凝聚团队"],
    weaknesses: ["有时优柔寡断", "容易轻信他人", "缺乏实战能力"],
    career: "管理者 / 教育工作者 / NGO负责人",
    loveStyle: "温柔专一，细水长流型",
    rarity: "5%"
  },
  {
    id: "bajie", name: "猪八戒", title: "天蓬元帅",
    motto: "猴哥，等等我！",
    color: "#D4548A", bgGradient: "linear-gradient(135deg, #FF9A9E 0%, #D4548A 100%)",
    description: "你是团队的开心果，乐观豁达，懂得享受生活。你看似懒散，实则大智若愚。你懂得审时度势，关键时刻从不含糊。",
    strengths: ["乐观开朗", "社交达人", "适应力强", "懂得变通"],
    weaknesses: ["有时偷懒", "贪图享乐", "容易动摇"],
    career: "市场/公关 / 美食博主 / 自由职业",
    loveStyle: "浪漫多情，注重仪式感",
    rarity: "25%"
  },
  {
    id: "wujing", name: "沙悟净", title: "金身罗汉",
    motto: "大师兄，师父被妖怪抓走了",
    color: "#2E6B8A", bgGradient: "linear-gradient(135deg, #74b9ff 0%, #2E6B8A 100%)",
    description: "你是团队最可靠的后盾，默默付出，从不邀功。你踏实稳重，责任心极强。虽然不善言辞，但你的存在让所有人安心。",
    strengths: ["踏实可靠", "任劳任怨", "忠诚稳定", "执行力强"],
    weaknesses: ["存在感低", "缺乏主见", "不善表达"],
    career: "技术支持 / 后勤管理 / 公务员",
    loveStyle: "默默守护，用行动证明爱",
    rarity: "15%"
  },
  {
    id: "bailong", name: "白龙马", title: "八部天龙",
    motto: "我虽不说话，但我一直在",
    color: "#7B4FA2", bgGradient: "linear-gradient(135deg, #a29bfe 0%, #7B4FA2 100%)",
    description: "你是隐藏的贵族，低调而有实力。你默默承载着重要使命，从不抱怨。你的坚韧和牺牲精神令人敬佩。",
    strengths: ["隐忍坚韧", "默默奉献", "有大局观", "关键时刻靠谱"],
    weaknesses: ["缺乏存在感", "有时压抑自己", "不善于争取"],
    career: "幕后工作者 / 科研人员 / 幕僚",
    loveStyle: "默默守护，不求回报",
    rarity: "10%"
  },
  {
    id: "guanyin", name: "观世音菩萨", title: "大慈大悲观世音",
    motto: "你来了，我等你很久了",
    color: "#1A8A6A", bgGradient: "linear-gradient(135deg, #55efc4 0%, #1A8A6A 100%)",
    description: "你是天生的导师和治愈者，温暖而有智慧。你总是能在关键时刻给出指引。你的善良和包容感染着身边的每一个人。",
    strengths: ["智慧通透", "善良慈悲", "善于引导", "情绪稳定"],
    weaknesses: ["有时过度付出", "容易被人依赖", "忽略自己"],
    career: "心理咨询 / 教师 / 医疗行业 / 辅导员",
    loveStyle: "包容理解，像光一样温暖",
    rarity: "3%"
  }
];

// 题目数据
const questions: Question[] = [
  { id: 1, text: "团队遇到一个几乎不可能完成的项目，你第一反应是？", options: [
    { label: "干就完了，我来当先锋", scores: { wukong: 4, bajie: 1 } },
    { label: "先理清目标，我们一定能做到", scores: { sanzang: 4, guanyin: 1 } },
    { label: "默默开始做，不废话", scores: { wujing: 4, bailong: 2 } },
    { label: "先看看有没有捷径可走", scores: { bajie: 3, wukong: 1 } }
  ]},
  { id: 2, text: "周末你最想做什么？", options: [
    { label: "约朋友出去疯玩", scores: { wukong: 3, bajie: 2 } },
    { label: "去大自然静静", scores: { sanzang: 3, bailong: 2 } },
    { label: "宅在家做自己的事", scores: { wujing: 4, bailong: 1 } },
    { label: "帮朋友解决烦恼", scores: { guanyin: 4, sanzang: 1 } }
  ]},
  { id: 3, text: "你最不能忍受的是？", options: [
    { label: "被人冤枉或欺负", scores: { wukong: 4, bajie: 1 } },
    { label: "有人背叛团队", scores: { sanzang: 4, wujing: 1 } },
    { label: "付出不被看见", scores: { bailong: 4, wujing: 2 } },
    { label: "看到有人受苦却帮不上忙", scores: { guanyin: 4, sanzang: 1 } }
  ]},
  { id: 4, text: "朋友向你倾诉烦恼，你会？", options: [
    { label: "谁欺负你了？我去找他", scores: { wukong: 4, bajie: 1 } },
    { label: "耐心听完，给他讲道理", scores: { sanzang: 3, guanyin: 2 } },
    { label: "走，先去吃顿好的", scores: { bajie: 4, wukong: 1 } },
    { label: "默默陪着他，不说话", scores: { wujing: 3, bailong: 2 } }
  ]},
  { id: 5, text: "你在团队里的角色通常是？", options: [
    { label: "冲在前面的业务骨干", scores: { wukong: 4, bajie: 1 } },
    { label: "把控方向的领导", scores: { sanzang: 4, guanyin: 1 } },
    { label: "默默干活的老黄牛", scores: { wujing: 4, bailong: 2 } },
    { label: "活跃气氛的社交达人", scores: { bajie: 4, guanyin: 1 } }
  ]},
  { id: 6, text: "面对一个不公平的决定，你会？", options: [
    { label: "直接怼回去，凭什么？", scores: { wukong: 4, bajie: 1 } },
    { label: "试图沟通，讲道理", scores: { sanzang: 3, guanyin: 2 } },
    { label: "忍了，继续干活", scores: { wujing: 4, bailong: 1 } },
    { label: "算了，找别的出路", scores: { bajie: 3, bailong: 2 } }
  ]},
  { id: 7, text: "你最看重的品质是？", options: [
    { label: "勇气", scores: { wukong: 5, bajie: 1 } },
    { label: "善良", scores: { sanzang: 3, guanyin: 3 } },
    { label: "靠谱", scores: { wujing: 4, bailong: 2 } },
    { label: "快乐", scores: { bajie: 5, wukong: 1 } }
  ]},
  { id: 8, text: "你理想中的旅行是？", options: [
    { label: "冒险刺激，探索未知", scores: { wukong: 4, bajie: 1 } },
    { label: "朝圣之旅，寻找意义", scores: { sanzang: 4, guanyin: 1 } },
    { label: "吃遍美食，享受人生", scores: { bajie: 5 } },
    { label: "一个人的安静旅行", scores: { wujing: 3, bailong: 3 } }
  ]},
  { id: 9, text: "你的朋友圈风格是？", options: [
    { label: "霸气宣言，无所畏惧", scores: { wukong: 4, bajie: 1 } },
    { label: "心灵鸡汤，正能量", scores: { sanzang: 3, guanyin: 2 } },
    { label: "美食美景，生活精彩", scores: { bajie: 4, wukong: 1 } },
    { label: "几乎不发，或只发工作", scores: { wujing: 4, bailong: 2 } }
  ]},
  { id: 10, text: "团队里有人偷懒，你会？", options: [
    { label: "直接说他，别拖后腿", scores: { wukong: 4, bajie: 1 } },
    { label: "私下沟通，了解原因", scores: { sanzang: 3, guanyin: 2 } },
    { label: "默默把他的活也干了", scores: { wujing: 4, bailong: 2 } },
    { label: "自己多干点算了", scores: { bajie: 2, wujing: 2 } }
  ]},
  { id: 11, text: "如果必须放弃一样东西，你会放弃？", options: [
    { label: "自由（为了守护重要的人）", scores: { wukong: 4, bailong: 2 } },
    { label: "安逸（为了更大的使命）", scores: { sanzang: 4, guanyin: 1 } },
    { label: "面子（实惠最重要）", scores: { bajie: 4, wukong: 1 } },
    { label: "被看见（默默就好）", scores: { bailong: 4, wujing: 2 } }
  ]},
  { id: 12, text: "你最害怕什么？", options: [
    { label: "被压在山下，失去自由", scores: { wukong: 5 } },
    { label: "误入歧途，偏离正道", scores: { sanzang: 4, guanyin: 1 } },
    { label: "被遗忘，没有价值", scores: { wujing: 4, bailong: 2 } },
    { label: "孤独终老，没人陪", scores: { bajie: 4, sanzang: 1 } }
  ]},
  { id: 13, text: "你处理冲突的方式是？", options: [
    { label: "正面刚，谁怕谁", scores: { wukong: 5, bajie: 1 } },
    { label: "以德服人，感化对方", scores: { sanzang: 3, guanyin: 3 } },
    { label: "退一步，不争了", scores: { wujing: 3, bailong: 3 } },
    { label: "打哈哈，化解尴尬", scores: { bajie: 4, guanyin: 1 } }
  ]},
  { id: 14, text: "你觉得自己最像什么动物？", options: [
    { label: "猴子（聪明机灵）", scores: { wukong: 5 } },
    { label: "鹿（温和优雅）", scores: { sanzang: 3, guanyin: 2 } },
    { label: "牛（踏实勤恳）", scores: { wujing: 4, bailong: 2 } },
    { label: "熊猫（憨态可掬）", scores: { bajie: 4, wukong: 1 } }
  ]},
  { id: 15, text: "你的手机里最多的APP是？", options: [
    { label: "游戏/运动类", scores: { wukong: 4, bajie: 1 } },
    { label: "读书/学习类", scores: { sanzang: 3, guanyin: 2 } },
    { label: "美食/外卖/社交", scores: { bajie: 4, wukong: 1 } },
    { label: "工具/效率类", scores: { wujing: 4, bailong: 1 } }
  ]},
  { id: 16, text: "你最想拥有的超能力是？", options: [
    { label: "七十二变（想变什么变什么）", scores: { wukong: 5 } },
    { label: "读心术（理解每个人）", scores: { guanyin: 4, sanzang: 1 } },
    { label: "瞬间移动（想去哪就去哪）", scores: { bajie: 4, wukong: 1 } },
    { label: "隐身（不被注意）", scores: { bailong: 4, wujing: 2 } }
  ]},
  { id: 17, text: "深夜睡不着时你会？", options: [
    { label: "刷视频/打游戏到天亮", scores: { wukong: 3, bajie: 2 } },
    { label: "思考人生意义", scores: { sanzang: 3, guanyin: 2 } },
    { label: "起来找吃的", scores: { bajie: 5 } },
    { label: "一个人静静发呆", scores: { bailong: 3, wujing: 3 } }
  ]},
  { id: 18, text: "你最羡慕《西游记》里谁的能力？", options: [
    { label: "火眼金睛（看穿一切）", scores: { wukong: 5 } },
    { label: "金蝉子转世（天生佛缘）", scores: { sanzang: 4, guanyin: 1 } },
    { label: "化身白马（默默守护）", scores: { bailong: 4, wujing: 2 } },
    { label: "净瓶甘露（救苦救难）", scores: { guanyin: 5 } }
  ]},
  { id: 19, text: "如果给你一个西游记的法宝，你选？", options: [
    { label: "如意金箍棒（战无不胜）", scores: { wukong: 5 } },
    { label: "锦襕袈裟（护身宝物）", scores: { sanzang: 4, guanyin: 1 } },
    { label: "九齿钉耙（实用主义）", scores: { bajie: 4, wujing: 1 } },
    { label: "定风珠（稳如泰山）", scores: { bailong: 4, wujing: 2 } }
  ]},
  { id: 20, text: "你的人生终极目标是？", options: [
    { label: "打破规则，活出自我", scores: { wukong: 5 } },
    { label: "修成正果，造福世人", scores: { sanzang: 4, guanyin: 1 } },
    { label: "吃饱喝足，快乐一生", scores: { bajie: 5 } },
    { label: "默默守护，功成身退", scores: { bailong: 4, wujing: 2 } }
  ]}
];

// 计算结果
function calculateResult(answers: number[]): Character {
  const scores: Record<string, number> = {};
  characters.forEach(c => scores[c.id] = 0);
  answers.forEach((optIndex, qIndex) => {
    const q = questions[qIndex];
    if (q && q.options[optIndex]) {
      Object.entries(q.options[optIndex].scores).forEach(([charId, pts]) => {
        scores[charId] = (scores[charId] || 0) + pts;
      });
    }
  });
  let maxScore = 0;
  let winner = characters[0];
  Object.entries(scores).forEach(([id, score]) => {
    if (score > maxScore) { maxScore = score; winner = characters.find(c => c.id === id)!; }
  });
  return winner;
}

const optionLetters = ["A", "B", "C", "D"];

// ===== 主应用 =====
function App() {
  const [page, setPage] = useState<"select" | "home" | "quiz" | "result">("select");
  const [testType, setTestType] = useState<TestType>("xiyouji");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Character | null>(null);
  const [sanguoResult, setSanguoResult] = useState<any>(null);
  const [dimScores, setDimScores] = useState<Record<string, number> | null>(null);
  const [showTipModal, setShowTipModal] = useState(false);
  const [tipMethod, setTipMethod] = useState<"wechat" | "alipay" | null>(null);
  const [activeTab, setActiveTab] = useState<"reading" | "lore">("reading");

  const currentQuestions = testType === "sanguo" ? sanguoQuestions : questions;

  const selectTest = useCallback((type: TestType) => {
    setTestType(type);
    setAnswers([]); setCurrentQ(0); setResult(null);
    setSanguoResult(null); setDimScores(null);
    setPage("home");
  }, []);

  const startQuiz = useCallback(() => {
    setAnswers([]); setCurrentQ(0); setPage("quiz");
  }, []);

  const answerQuestion = useCallback((optIndex: number) => {
    const newAnswers = [...answers, optIndex];
    setAnswers(newAnswers);
    if (newAnswers.length < currentQuestions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      if (testType === "sanguo") {
        setSanguoResult(calculateSanguoResult(newAnswers));
        setDimScores(calculateDimensionScores(newAnswers));
      } else {
        setResult(calculateResult(newAnswers));
      }
      setPage("result");
    }
  }, [answers, currentQ, testType, currentQuestions.length]);

  const restart = useCallback(() => {
    setPage("select"); setResult(null); setSanguoResult(null);
    setDimScores(null); setAnswers([]); setCurrentQ(0); setActiveTab("reading");
  }, []);

  const share = useCallback((text: string, title: string) => {
    if (navigator.share) navigator.share({ title, text });
    else { navigator.clipboard?.writeText(text); alert("已复制到剪贴板！发到小红书或朋友圈吧~"); }
  }, []);

  // ===== 测试选择页 =====
  if (page === "select") {
    return (
      <div id="landing" className="screen active">
        <div className="landing-ornament" />
        <div className="landing-subtitle">选择你的测试</div>
        <h1 className="landing-title">你是<span>谁</span>？</h1>
        <p className="landing-tagline">选择一个测试，发现你的另一面</p>
        <div className="test-cards">
          <button className="test-card" onClick={() => selectTest("xiyouji")}>
            <div className="test-card-icon">🐵</div>
            <div>
              <div className="test-card-title">你是西游记里的谁？</div>
              <div className="test-card-desc">20道趣味场景题 · 2分钟完成</div>
            </div>
          </button>
          <button className="test-card" onClick={() => selectTest("sanguo")}>
            <div className="test-card-icon">⚔️</div>
            <div>
              <div className="test-card-title">你是三国里的谁？</div>
              <div className="test-card-desc">30道谋略场景题 · 3分钟完成</div>
            </div>
          </button>
        </div>
        <div className="cta-text" style={{ marginTop: 24 }}>🚧 更多测试正在开发中...</div>
      </div>
    );
  }

  // ===== 首页 =====
  if (page === "home") {
    const isSanguo = testType === "sanguo";
    const title = isSanguo ? "你是三国里的谁？" : "你是西游记里的谁？";
    const subtitle = isSanguo ? "30道谋略场景题 · 约3分钟完成" : "20道趣味场景题 · 约2分钟完成";
    const chars = isSanguo ? sanguoCharacters : characters;

    return (
      <div id="home" className="screen active">
        {isSanguo && (
          <div className="home-bg">
            <img className="home-bg-image" src="/images/sanguo-bg.jpg" alt="" />
            <div className="home-bg-overlay" />
          </div>
        )}
        <div className="home-content">
          <div className="landing-ornament" />
          <div className="landing-subtitle">{isSanguo ? "三国" : "西游记"}</div>
          <h1 className="landing-title">{title}</h1>
          <p className="landing-tagline">{subtitle}</p>

          <div className="character-grid">
            {chars.map((c) => (
              <div key={c.id} className="character-tile">
                <div className="character-circle" style={{ background: c.bgGradient }}>
                  {c.name.slice(0, 1)}
                </div>
                <div className="character-name">{c.name}</div>
              </div>
            ))}
          </div>

          <button className="btn-start" onClick={startQuiz}>开始测试 →</button>
        </div>
      </div>
    );
  }

  // ===== 答题页 =====
  if (page === "quiz") {
    const q = currentQuestions[currentQ];
    const progress = ((currentQ + 1) / currentQuestions.length) * 100;

    return (
      <div id="quiz" className="screen active">
        <div className="quiz-header">
          <span className="quiz-progress-text">{currentQ + 1} / {currentQuestions.length}</span>
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="quiz-type-badge">{testType === "sanguo" ? "谋略" : "性格"}</span>
        </div>

        <div className="quiz-body">
          <div>
            <div className="quiz-question-number">
              {String(currentQ + 1).padStart(2, "0")} · {testType === "sanguo" ? "谋略" : "性格"}
            </div>
            <div className="quiz-question-text">{q.text}</div>
            <div className="quiz-options">
              {q.options.map((opt, i) => (
                <button
                  key={`${q.id}-${i}`}
                  className="quiz-option"
                  onClick={() => answerQuestion(i)}
                >
                  <div className="option-letter">{optionLetters[i]}</div>
                  <div className="option-text">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== 三国结果页 =====
  if (page === "result" && sanguoResult && dimScores) {
    const r = sanguoResult;
    const maxDim = Math.max(...Object.values(dimScores) as number[], 1);
    const shareText = `我是《三国》里的${r.name}｜${r.title}\n「${r.motto}」\n${r.rarity}的人是${r.name}，你是哪个？扫码测测👇`;

    return (
      <div id="results" className="screen active" data-theme={r.id || "default"}>
        <div className="result-hero">
          <div className="result-faction">{r.title}</div>
          <h1 className="result-name">{r.name}</h1>
          <div className="result-name-en">{r.title}</div>
          <div className="result-quote">{r.motto}</div>
        </div>

        <div className="result-section">
          <div className="result-section-title">灵魂档案</div>
          {dimensions.map(dim => {
            const score = dimScores[dim.id] || 0;
            const percent = Math.round((score / maxDim) * 100);
            return (
              <div key={dim.id} className="dim-item fade-in">
                <div className="dim-header">
                  <span className="dim-name">{dim.icon} {dim.name}</span>
                  <span className="dim-score">{score}</span>
                </div>
                <div className="dim-bar">
                  <div className="dim-bar-fill" style={{ width: `${percent}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="result-section">
          <div className="reading-tabs">
            <button className={`reading-tab ${activeTab === "reading" ? "active" : ""}`} onClick={() => setActiveTab("reading")}>性格解读</button>
            <button className={`reading-tab ${activeTab === "lore" ? "active" : ""}`} onClick={() => setActiveTab("lore")}>背景故事</button>
          </div>
          <div className="result-description">
            {activeTab === "reading" ? r.description : `在三国乱世中，${r.name}以其独特的魅力和能力闻名。${r.description}`}
          </div>
        </div>

        <div className="result-section">
          <div className="result-section-title">你的特质</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 14 }}>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 8, fontWeight: 700 }}>✨ 优势</div>
              {r.strengths.map((s: string) => <div key={s} style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 3 }}>{s}</div>)}
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 14 }}>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 8, fontWeight: 700 }}>⚠️ 不足</div>
              {r.weaknesses.map((w: string) => <div key={w} style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 3 }}>{w}</div>)}
            </div>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 14, marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 6, fontWeight: 700 }}>💼 适合角色</div>
            <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 10 }}>{r.career}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 6, fontWeight: 700 }}>💕 恋爱风格</div>
            <div style={{ fontSize: 13, color: "var(--text)" }}>{r.loveStyle}</div>
          </div>
          <div style={{ padding: 10, background: "var(--surface)", border: "1px solid var(--border)", textAlign: "center", marginBottom: 24 }}>
            <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 700 }}>🏆 你是 {r.rarity} 的人</span>
          </div>
        </div>

        <div className="share-section">
          <div className="share-buttons">
            <button className="btn-share" onClick={() => share(shareText, "三国英雄测试")}>
              <svg viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              分享结果
            </button>
            <button className="btn-share" onClick={restart}>
              再测一次
            </button>
          </div>
        </div>

        <div className="app-footer-support">
          <span className="footer-support-label">请作者喝咖啡 · </span>
          <a href="https://ifdian.net/a/char1ee" target="_blank" rel="noopener">爱发电</a>
          <span className="footer-support-sep">·</span>
          <a href="https://ko-fi.com/char1ee" target="_blank" rel="noopener">Ko-fi</a>
        </div>

        <div className="cta-text" style={{ maxWidth: 400, margin: "16px auto 0", padding: "16px", background: "var(--surface)", border: "1px solid var(--border)", textAlign: "center" }}>
          🎯 分享给好友，测测TA是三国里的谁？<br/>
          <span style={{ color: "var(--accent)", fontWeight: 700 }}>看看你们能组个什么阵容~</span>
        </div>
      </div>
    );
  }

  // ===== 西游结果页 =====
  if (page === "result" && result) {
    const shareText = `我是《西游记》里的${result.name}｜${result.title}\n「${result.motto}」\n${result.rarity}的人是${result.name}，你是哪个？扫码测测👇`;

    return (
      <div id="results" className="screen active" data-theme={result.id}>
        <div className="result-hero">
          <div className="result-faction">{result.title}</div>
          <h1 className="result-name">{result.name}</h1>
          <div className="result-name-en">{result.title}</div>
          <div className="result-quote">{result.motto}</div>
        </div>

        <div className="result-section">
          <div className="result-section-title">性格解读</div>
          <div className="result-description">{result.description}</div>
        </div>

        <div className="result-section">
          <div className="result-section-title">你的特质</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 14 }}>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 8, fontWeight: 700 }}>✨ 优势</div>
              {result.strengths.map((s: string) => <div key={s} style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 3 }}>{s}</div>)}
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 14 }}>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 8, fontWeight: 700 }}>⚠️ 不足</div>
              {result.weaknesses.map((w: string) => <div key={w} style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 3 }}>{w}</div>)}
            </div>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 14, marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 6, fontWeight: 700 }}>💼 适合职业</div>
            <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 10 }}>{result.career}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 6, fontWeight: 700 }}>💕 恋爱风格</div>
            <div style={{ fontSize: 13, color: "var(--text)" }}>{result.loveStyle}</div>
          </div>
          <div style={{ padding: 10, background: "var(--surface)", border: "1px solid var(--border)", textAlign: "center", marginBottom: 24 }}>
            <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 700 }}>🏆 你是 {result.rarity} 的人</span>
          </div>
        </div>

        <div className="share-section">
          <div className="share-buttons">
            <button className="btn-share" onClick={() => share(shareText, "西游记角色测试")}>
              <svg viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              分享结果
            </button>
            <button className="btn-share" onClick={restart}>
              再测一次
            </button>
          </div>
        </div>

        <div className="app-footer-support">
          <span className="footer-support-label">请作者喝咖啡 · </span>
          <a href="https://ifdian.net/a/char1ee" target="_blank" rel="noopener">爱发电</a>
          <span className="footer-support-sep">·</span>
          <a href="https://ko-fi.com/char1ee" target="_blank" rel="noopener">Ko-fi</a>
        </div>

        <div className="cta-text" style={{ maxWidth: 400, margin: "16px auto 0", padding: "16px", background: "var(--surface)", border: "1px solid var(--border)", textAlign: "center" }}>
          🎯 分享给好友，测测TA是西游记里的谁？<br/>
          <span style={{ color: "var(--accent)", fontWeight: 700 }}>看看你们的组合像不像取经团队~</span>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
