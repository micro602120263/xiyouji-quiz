import { useState, useCallback } from "react";

// ===== 数据定义 =====

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

// ===== 新版题目：每题3-4个选项，每个选项给多个角色加分 =====
const questions: Question[] = [
  {
    id: 1, text: "团队遇到一个几乎不可能完成的项目，你第一反应是？",
    options: [
      { label: "干就完了，我来当先锋", scores: { wukong: 4, bajie: 1 } },
      { label: "先理清目标，我们一定能做到", scores: { sanzang: 4, guanyin: 1 } },
      { label: "默默开始做，不废话", scores: { wujing: 4, bailong: 2 } },
      { label: "先看看有没有捷径可走", scores: { bajie: 3, wukong: 1 } }
    ]
  },
  {
    id: 2, text: "周末你最想做什么？",
    options: [
      { label: "约朋友出去疯玩", scores: { wukong: 3, bajie: 2 } },
      { label: "去大自然静静", scores: { sanzang: 3, bailong: 2 } },
      { label: "宅在家做自己的事", scores: { wujing: 4, bailong: 1 } },
      { label: "帮朋友解决烦恼", scores: { guanyin: 4, sanzang: 1 } }
    ]
  },
  {
    id: 3, text: "你最不能忍受的是？",
    options: [
      { label: "被人冤枉或欺负", scores: { wukong: 4, bajie: 1 } },
      { label: "有人背叛团队", scores: { sanzang: 4, wujing: 1 } },
      { label: "付出不被看见", scores: { bailong: 4, wujing: 2 } },
      { label: "看到有人受苦却帮不上忙", scores: { guanyin: 4, sanzang: 1 } }
    ]
  },
  {
    id: 4, text: "朋友向你倾诉烦恼，你会？",
    options: [
      { label: "谁欺负你了？我去找他", scores: { wukong: 4, bajie: 1 } },
      { label: "耐心听完，给他讲道理", scores: { sanzang: 3, guanyin: 2 } },
      { label: "走，先去吃顿好的", scores: { bajie: 4, wukong: 1 } },
      { label: "默默陪着他，不说话", scores: { wujing: 3, bailong: 2 } }
    ]
  },
  {
    id: 5, text: "你在团队里的角色通常是？",
    options: [
      { label: "冲在前面的业务骨干", scores: { wukong: 4, bajie: 1 } },
      { label: "把控方向的领导", scores: { sanzang: 4, guanyin: 1 } },
      { label: "默默干活的老黄牛", scores: { wujing: 4, bailong: 2 } },
      { label: "活跃气氛的社交达人", scores: { bajie: 4, guanyin: 1 } }
    ]
  },
  {
    id: 6, text: "面对一个不公平的决定，你会？",
    options: [
      { label: "直接怼回去，凭什么？", scores: { wukong: 4, bajie: 1 } },
      { label: "试图沟通，讲道理", scores: { sanzang: 3, guanyin: 2 } },
      { label: "忍了，继续干活", scores: { wujing: 4, bailong: 1 } },
      { label: "算了，找别的出路", scores: { bajie: 3, bailong: 2 } }
    ]
  },
  {
    id: 7, text: "你最看重的品质是？",
    options: [
      { label: "勇气", scores: { wukong: 5, bajie: 1 } },
      { label: "善良", scores: { sanzang: 3, guanyin: 3 } },
      { label: "靠谱", scores: { wujing: 4, bailong: 2 } },
      { label: "快乐", scores: { bajie: 5, wukong: 1 } }
    ]
  },
  {
    id: 8, text: "你理想中的旅行是？",
    options: [
      { label: "冒险刺激，探索未知", scores: { wukong: 4, bajie: 1 } },
      { label: "朝圣之旅，寻找意义", scores: { sanzang: 4, guanyin: 1 } },
      { label: "吃遍美食，享受人生", scores: { bajie: 5 } },
      { label: "一个人的安静旅行", scores: { wujing: 3, bailong: 3 } }
    ]
  },
  {
    id: 9, text: "你的朋友圈风格是？",
    options: [
      { label: "霸气宣言，无所畏惧", scores: { wukong: 4, bajie: 1 } },
      { label: "心灵鸡汤，正能量", scores: { sanzang: 3, guanyin: 2 } },
      { label: "美食美景，生活精彩", scores: { bajie: 4, wukong: 1 } },
      { label: "几乎不发，或只发工作", scores: { wujing: 4, bailong: 2 } }
    ]
  },
  {
    id: 10, text: "团队里有人偷懒，你会？",
    options: [
      { label: "直接说他，别拖后腿", scores: { wukong: 4, bajie: 1 } },
      { label: "私下沟通，了解原因", scores: { sanzang: 3, guanyin: 2 } },
      { label: "默默把他的活也干了", scores: { wujing: 4, bailong: 2 } },
      { label: "自己多干点算了", scores: { bajie: 2, wujing: 2 } }
    ]
  },
  {
    id: 11, text: "如果必须放弃一样东西，你会放弃？",
    options: [
      { label: "自由（为了守护重要的人）", scores: { wukong: 4, bailong: 2 } },
      { label: "安逸（为了更大的使命）", scores: { sanzang: 4, guanyin: 1 } },
      { label: "面子（实惠最重要）", scores: { bajie: 4, wukong: 1 } },
      { label: "被看见（默默就好）", scores: { bailong: 4, wujing: 2 } }
    ]
  },
  {
    id: 12, text: "你最害怕什么？",
    options: [
      { label: "被压在山下，失去自由", scores: { wukong: 5 } },
      { label: "误入歧途，偏离正道", scores: { sanzang: 4, guanyin: 1 } },
      { label: "被遗忘，没有价值", scores: { wujing: 4, bailong: 2 } },
      { label: "孤独终老，没人陪", scores: { bajie: 4, sanzang: 1 } }
    ]
  },
  {
    id: 13, text: "你处理冲突的方式是？",
    options: [
      { label: "正面刚，谁怕谁", scores: { wukong: 5, bajie: 1 } },
      { label: "以德服人，感化对方", scores: { sanzang: 3, guanyin: 3 } },
      { label: "退一步，不争了", scores: { wujing: 3, bailong: 3 } },
      { label: "打哈哈，化解尴尬", scores: { bajie: 4, guanyin: 1 } }
    ]
  },
  {
    id: 14, text: "你觉得自己最像什么动物？",
    options: [
      { label: "猴子（聪明机灵）", scores: { wukong: 5 } },
      { label: "鹿（温和优雅）", scores: { sanzang: 3, guanyin: 2 } },
      { label: "牛（踏实勤恳）", scores: { wujing: 4, bailong: 2 } },
      { label: "熊猫（憨态可掬）", scores: { bajie: 4, wukong: 1 } }
    ]
  },
  {
    id: 15, text: "你的手机里最多的APP是？",
    options: [
      { label: "游戏/运动类", scores: { wukong: 4, bajie: 1 } },
      { label: "读书/学习类", scores: { sanzang: 3, guanyin: 2 } },
      { label: "美食/外卖/社交", scores: { bajie: 4, wukong: 1 } },
      { label: "工具/效率类", scores: { wujing: 4, bailong: 1 } }
    ]
  },
  {
    id: 16, text: "你最想拥有的超能力是？",
    options: [
      { label: "七十二变（想变什么变什么）", scores: { wukong: 5 } },
      { label: "读心术（理解每个人）", scores: { guanyin: 4, sanzang: 1 } },
      { label: "瞬间移动（想去哪就去哪）", scores: { bajie: 4, wukong: 1 } },
      { label: "隐身（不被注意）", scores: { bailong: 4, wujing: 2 } }
    ]
  },
  {
    id: 17, text: "深夜睡不着时你会？",
    options: [
      { label: "刷视频/打游戏到天亮", scores: { wukong: 3, bajie: 2 } },
      { label: "思考人生意义", scores: { sanzang: 3, guanyin: 2 } },
      { label: "起来找吃的", scores: { bajie: 5 } },
      { label: "一个人静静发呆", scores: { bailong: 3, wujing: 3 } }
    ]
  },
  {
    id: 18, text: "你最羡慕《西游记》里谁的能力？",
    options: [
      { label: "火眼金睛（看穿一切）", scores: { wukong: 5 } },
      { label: "金蝉子转世（天生佛缘）", scores: { sanzang: 4, guanyin: 1 } },
      { label: "化身白马（默默守护）", scores: { bailong: 4, wujing: 2 } },
      { label: "净瓶甘露（救苦救难）", scores: { guanyin: 5 } }
    ]
  },
  {
    id: 19, text: "如果给你一个西游记的法宝，你选？",
    options: [
      { label: "如意金箍棒（战无不胜）", scores: { wukong: 5 } },
      { label: "锦襕袈裟（护身宝物）", scores: { sanzang: 4, guanyin: 1 } },
      { label: "九齿钉耙（实用主义）", scores: { bajie: 4, wujing: 1 } },
      { label: "定风珠（稳如泰山）", scores: { bailong: 4, wujing: 2 } }
    ]
  },
  {
    id: 20, text: "你的人生终极目标是？",
    options: [
      { label: "打破规则，活出自我", scores: { wukong: 5 } },
      { label: "修成正果，造福世人", scores: { sanzang: 4, guanyin: 1 } },
      { label: "吃饱喝足，快乐一生", scores: { bajie: 5 } },
      { label: "默默守护，功成身退", scores: { bailong: 4, wujing: 2 } }
    ]
  }
];

// 计算结果
function calculateResult(answers: number[]): Character {
  const scores: Record<string, number> = {};
  characters.forEach(c => scores[c.id] = 0);

  answers.forEach((optIndex, qIndex) => {
    const q = questions[qIndex];
    if (q && q.options[optIndex]) {
      const chosen = q.options[optIndex];
      Object.entries(chosen.scores).forEach(([charId, pts]) => {
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

// 角色头像 - AI生成的风格化头像
function CharacterAvatar({ character, size = 120 }: { character: Character; size?: number }) {
  const avatarMap: Record<string, string> = {
    wukong: "/images/wukong.jpg",
    sanzang: "/images/sanzang.jpg",
    bajie: "/images/bajie.jpg",
    wujing: "/images/shaseng.jpg",
    bailong: "/images/bailongma.jpg",
    guanyin: "/images/guanyin.jpg"
  };
  const src = avatarMap[character.id] || "";

  return (
    <img
      src={src}
      alt={character.name}
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
        border: `3px solid ${character.color}30`,
        boxShadow: `0 4px 16px ${character.color}22`
      }}
    />
  );
}

// ===== 主应用 =====
function App() {
  const [page, setPage] = useState<"home" | "quiz" | "result">("home");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Character | null>(null);

  const startQuiz = useCallback(() => {
    setAnswers([]); setCurrentQ(0); setPage("quiz");
  }, []);

  const answerQuestion = useCallback((optIndex: number) => {
    const newAnswers = [...answers, optIndex];
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setResult(calculateResult(newAnswers));
      setPage("result");
    }
  }, [answers, currentQ]);

  const restart = useCallback(() => {
    setPage("home"); setResult(null); setAnswers([]); setCurrentQ(0);
  }, []);

  // ===== 首页 =====
  if (page === "home") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFF8E7 0%, #FFE8C0 40%, #FFDAB9 70%, #FCB69F 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "40px 20px", fontFamily: "'Noto Serif SC', 'STKaiti', serif"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px", opacity: 0.5, letterSpacing: "12px" }}>☁ ☁ ☁</div>
          <h1 style={{ fontSize: "36px", color: "#8B0000", marginBottom: "8px", textShadow: "0 2px 4px rgba(0,0,0,0.08)", letterSpacing: "2px" }}>
            你是《西游记》里的谁？
          </h1>
          <p style={{ fontSize: "13px", color: "#999", letterSpacing: "1px" }}>20道趣味场景题 · 约2分钟完成</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "36px", maxWidth: "360px", width: "100%" }}>
          {characters.map((c) => (
            <div key={c.id} style={{ background: "rgba(255,255,255,0.85)", borderRadius: "16px", padding: "14px 6px 10px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid rgba(255,255,255,0.8)" }}>
              <CharacterAvatar character={c} size={88} />
            </div>
          ))}
        </div>
        <button onClick={startQuiz} style={{
          background: "linear-gradient(135deg, #C41E3A 0%, #E74C3C 100%)", color: "white", border: "none",
          padding: "15px 52px", borderRadius: "50px", fontSize: "17px", fontWeight: "bold", cursor: "pointer",
          boxShadow: "0 4px 16px rgba(196,30,58,0.35)", letterSpacing: "2px", transition: "transform 0.2s"
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >开始测试 →</button>
      </div>
    );
  }

  // ===== 答题页 =====
  if (page === "quiz") {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;
    return (
      <div style={{
        minHeight: "100vh", background: "linear-gradient(180deg, #FFF8E7 0%, #FFECD2 100%)",
        padding: "24px 16px", fontFamily: "'Noto Serif SC', 'STKaiti', serif",
        display: "flex", flexDirection: "column", alignItems: "center"
      }}>
        <div style={{ width: "100%", maxWidth: "560px", marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "12px", color: "#aaa" }}>
            <span>第 {currentQ + 1}/{questions.length} 题</span>
            <span style={{ color: "#C41E3A", fontWeight: "bold" }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: "4px", background: "rgba(0,0,0,0.06)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #C41E3A, #D4A017)", borderRadius: "2px", transition: "width 0.4s ease" }} />
          </div>
        </div>
        <div style={{ maxWidth: "560px", width: "100%", background: "rgba(255,255,255,0.92)", borderRadius: "20px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(255,255,255,0.9)" }}>
          <h2 style={{ fontSize: "18px", color: "#2C3E50", marginBottom: "24px", lineHeight: "1.6", textAlign: "center", fontWeight: "bold" }}>
            {q.text}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {q.options.map((opt, i) => (
              <button key={`${q.id}-${i}`} onClick={() => answerQuestion(i)}
                style={{
                  padding: "14px 18px", background: "white", border: "1.5px solid #EDE8E0",
                  borderRadius: "12px", cursor: "pointer", fontSize: "14px", color: "#444",
                  textAlign: "left", transition: "all 0.2s", lineHeight: "1.4"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#C41E3A"; e.currentTarget.style.background = "#FFF8F8"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDE8E0"; e.currentTarget.style.background = "white"; e.currentTarget.style.transform = "translateX(0)"; }}
              >{opt.label}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===== 结果页 =====
  if (page === "result" && result) {
    return (
      <div style={{
        minHeight: "100vh", background: result.bgGradient, padding: "40px 16px",
        fontFamily: "'Noto Serif SC', 'STKaiti', serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{ maxWidth: "380px", width: "100%", background: "rgba(255,255,255,0.93)", borderRadius: "24px", padding: "36px 28px", boxShadow: "0 8px 40px rgba(0,0,0,0.12)", textAlign: "center", border: "1px solid rgba(255,255,255,0.9)" }}>
          <div style={{ marginBottom: "16px" }}><CharacterAvatar character={result} size={150} /></div>
          <div style={{ fontSize: "12px", color: result.color, letterSpacing: "4px", marginBottom: "6px", fontWeight: "bold" }}>{result.title}</div>
          <h1 style={{ fontSize: "34px", color: "#1a1a2e", margin: "0 0 10px", fontWeight: "900", letterSpacing: "2px" }}>{result.name}</h1>
          <p style={{ fontSize: "14px", color: "#888", fontStyle: "italic", margin: "0 0 20px", lineHeight: "1.6" }}>「{result.motto}」</p>
          <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.9", margin: "0 0 24px", textAlign: "left", padding: "0 4px" }}>{result.description}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            <div style={{ background: "#F8F9FA", borderRadius: "12px", padding: "14px", textAlign: "left" }}>
              <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px", fontWeight: "bold" }}>✨ 你的优势</div>
              {result.strengths.map(s => <div key={s} style={{ fontSize: "12px", color: "#444", marginBottom: "3px" }}>{s}</div>)}
            </div>
            <div style={{ background: "#FFF5F5", borderRadius: "12px", padding: "14px", textAlign: "left" }}>
              <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "8px", fontWeight: "bold" }}>⚠️ 可能的不足</div>
              {result.weaknesses.map(w => <div key={w} style={{ fontSize: "12px", color: "#444", marginBottom: "3px" }}>{w}</div>)}
            </div>
          </div>
          <div style={{ background: "#F0F8FF", borderRadius: "12px", padding: "14px", marginBottom: "20px", textAlign: "left" }}>
            <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "6px", fontWeight: "bold" }}>💼 适合你的职业</div>
            <div style={{ fontSize: "13px", color: "#444", marginBottom: "10px" }}>{result.career}</div>
            <div style={{ fontSize: "11px", color: "#aaa", marginBottom: "6px", fontWeight: "bold" }}>💕 恋爱风格</div>
            <div style={{ fontSize: "13px", color: "#444" }}>{result.loveStyle}</div>
          </div>
          <div style={{ padding: "10px", borderRadius: "10px", background: `${result.color}10`, border: `1px solid ${result.color}25`, marginBottom: "24px" }}>
            <span style={{ fontSize: "13px", color: result.color, fontWeight: "bold" }}>🏆 你是 {result.rarity} 的人</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={restart} style={{ flex: 1, padding: "13px", background: result.bgGradient, color: "white", border: "none", borderRadius: "12px", fontSize: "14px", fontWeight: "bold", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >再测一次</button>
            <button onClick={() => {
              const text = `我是《西游记》里的${result.name}\n${result.title}｜${result.motto}`;
              if (navigator.share) navigator.share({ title: "西游记角色测试", text });
              else { navigator.clipboard?.writeText(text); alert("已复制到剪贴板！"); }
            }} style={{ flex: 1, padding: "13px", background: "white", color: result.color, border: `1.5px solid ${result.color}`, borderRadius: "12px", fontSize: "14px", fontWeight: "bold", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >📤 分享结果</button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default App;
