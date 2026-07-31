// ===== 三国英雄测试 =====

export interface Dimension {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface SanguoCharacter {
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
  dimensionHighlight: string; // 最突出的维度
}

export interface SanguoQuestion {
  id: number;
  text: string;
  options: {
    label: string;
    scores: Record<string, number>;
  }[];
}

// ===== 五大维度 =====
export const dimensions: Dimension[] = [
  { id: "martial", name: "武勇", icon: "⚔️", color: "#C41E3A", description: "战斗力、胆识、冲锋陷阵" },
  { id: "wisdom", name: "智慧", icon: "🧠", color: "#2E6B8A", description: "谋略、洞察、全局思维" },
  { id: "strategy", name: "权谋", icon: "👑", color: "#D4A017", description: "政治手腕、驭人之术" },
  { id: "charisma", name: "魅力", icon: "✨", color: "#7B4FA2", description: "人格感召、收服人心" },
  { id: "leadership", name: "统率", icon: "🏰", color: "#1A8A6A", description: "带兵打仗、治国理政" },
];

// ===== 六位英雄 =====
export const sanguoCharacters: SanguoCharacter[] = [
  {
    id: "caocao",
    name: "曹操",
    title: "乱世之奸雄",
    motto: "宁教我负天下人，休教天下人负我",
    color: "#1A1A2E",
    bgGradient: "linear-gradient(135deg, #2C3E50 0%, #1A1A2E 100%)",
    description: "你是天生的领袖，胸怀天下却不受道德束缚。你果断狠辣，该出手时绝不犹豫。你相信实力才是乱世中唯一的通行证，规则是用来打破的。",
    strengths: ["果断决绝", "知人善任", "军事天才", "胸有大志"],
    weaknesses: ["多疑猜忌", "手段狠辣", "过于自负"],
    career: "创业者 / CEO / 战略咨询",
    loveStyle: "霸道深情，占有欲强",
    rarity: "8%",
    dimensionHighlight: "权谋+统率"
  },
  {
    id: "liubei",
    name: "刘备",
    title: "仁德之君",
    motto: "惟贤惟德，能服于人",
    color: "#D4A017",
    bgGradient: "linear-gradient(135deg, #FFD700 0%, #D4A017 100%)",
    description: "你是天生的凝聚者，能让最优秀的人为你效力。你以德服人，用真诚打动人心。虽然起步艰难，但你的仁义最终会赢得天下。",
    strengths: ["仁义宽厚", "善于用人", "百折不挠", "深得民心"],
    weaknesses: ["优柔寡断", "感情用事", "缺乏果断"],
    career: "团队领导 / NGO负责人 / 教育工作者",
    loveStyle: "温柔专一，重情重义",
    rarity: "5%",
    dimensionHighlight: "魅力+统率"
  },
  {
    id: "zhugeliang",
    name: "诸葛亮",
    title: "卧龙先生",
    motto: "鞠躬尽瘁，死而后已",
    color: "#2E6B8A",
    bgGradient: "linear-gradient(135deg, #74b9ff 0%, #2E6B8A 100%)",
    description: "你是运筹帷幄的智者，能从全局视角看清局势。你擅长未雨绸缪，用智慧弥补资源的不足。你追求完美，有时会因操劳过度而忽略自身。",
    strengths: ["深谋远虑", "洞察人心", "多才多艺", "忠贞不渝"],
    weaknesses: ["事必躬亲", "过于理想化", "不善变通"],
    career: "战略规划 / 产品经理 / 学术研究",
    loveStyle: "细水长流，灵魂伴侣型",
    rarity: "6%",
    dimensionHighlight: "智慧+权谋"
  },
  {
    id: "guanyu",
    name: "关羽",
    title: "武圣",
    motto: "玉可碎而不可改其白，竹可焚而不可毁其节",
    color: "#C41E3A",
    bgGradient: "linear-gradient(135deg, #FF6B6B 0%, #C41E3A 100%)",
    description: "你是义薄云天的英雄，把忠诚和荣誉看得比生命还重。你武艺超群，傲视群雄。你的义气让人敬佩，但你的傲气有时会让你轻敌。",
    strengths: ["忠义无双", "武艺高强", "威震四方", "刚正不阿"],
    weaknesses: ["骄傲自负", "刚愎自用", "不够灵活"],
    career: "执法者 / 军人 / 安保行业",
    loveStyle: "专一深情，守护型",
    rarity: "10%",
    dimensionHighlight: "武勇+魅力"
  },
  {
    id: "zhaoyun",
    name: "赵云",
    title: "常胜将军",
    motto: "吾乃常山赵子龙也",
    color: "#E8E8E8",
    bgGradient: "linear-gradient(135deg, #f5f5f5 0%, #bdc3c7 100%)",
    description: "你是完美主义的化身，武艺与品德兼备。你从不争功，却总在关键时刻挺身而出。你是团队中最可靠的人，低调却不可或缺。",
    strengths: ["武艺绝伦", "沉着冷静", "忠心耿耿", "谦逊低调"],
    weaknesses: ["存在感偏低", "不善表达", "过于完美主义"],
    career: "执行者 / 项目经理 / 技术专家",
    loveStyle: "默默守护，用行动证明",
    rarity: "12%",
    dimensionHighlight: "武勇+统率"
  },
  {
    id: "simayi",
    name: "司马懿",
    title: "冢虎",
    motto: "鹰视狼顾，天下在胸",
    color: "#4A4A4A",
    bgGradient: "linear-gradient(135deg, #636e72 0%, #2d3436 100%)",
    description: "你是隐忍的猎手，擅长等待最佳时机。你城府极深，能屈能伸。你不争一时之长短，只看最终的胜负。时间是你最好的武器。",
    strengths: ["隐忍克制", "洞察人心", "善于等待", "战略眼光"],
    weaknesses: ["过于阴沉", "猜疑心重", "不够光明磊落"],
    career: "投资人 / 战略顾问 / 幕僚",
    loveStyle: "深藏不露，细水长流",
    rarity: "7%",
    dimensionHighlight: "权谋+智慧"
  },
];

// ===== 20道题目 =====
export const sanguoQuestions: SanguoQuestion[] = [
  {
    id: 1,
    text: "你被任命为一座孤城的守将，敌军十倍于你，粮草只够三天，你会？",
    options: [
      { label: "主动出击，以攻代守，杀出一条血路", scores: { caocao: 3, guanyu: 2, zhaoyun: 1 } },
      { label: "设伏诱敌，用地形优势以少胜多", scores: { zhugeliang: 4, simayi: 2 } },
      { label: "坚守待援，稳定军心，相信会有转机", scores: { liubei: 3, zhaoyun: 2 } },
      { label: "派细作散布假情报，拖延时间", scores: { simayi: 4, caocao: 1 } }
    ]
  },
  {
    id: 2,
    text: "你麾下有一位才华横溢但桀骜不驯的将领，你会？",
    options: [
      { label: "给他足够的权力和尊重，让他心服口服", scores: { liubei: 4, caocao: 1 } },
      { label: "用制度约束他，功过分明", scores: { caocao: 3, zhugeliang: 2 } },
      { label: "以德感化他，用真诚打动他", scores: { liubei: 3, guanyu: 2 } },
      { label: "暗中观察，等他犯错再出手", scores: { simayi: 4, caocao: 1 } }
    ]
  },
  {
    id: 3,
    text: "你发现盟友在暗中与敌人勾结，你会？",
    options: [
      { label: "直接质问他，当面对质", scores: { guanyu: 4, zhaoyun: 1 } },
      { label: "假装不知，暗中收集证据", scores: { simayi: 4, caocao: 2 } },
      { label: "派人去试探他的真实意图", scores: { zhugeliang: 3, caocao: 2 } },
      { label: "找他谈心，给他一个改过的机会", scores: { liubei: 4, zhugeliang: 1 } }
    ]
  },
  {
    id: 4,
    text: "你在朝堂上被政敌当众羞辱，你会？",
    options: [
      { label: "当场反击，让他知道厉害", scores: { guanyu: 3, caocao: 2 } },
      { label: "一笑置之，不与小人计较", scores: { zhugeliang: 3, liubei: 2 } },
      { label: "记在心里，日后加倍奉还", scores: { simayi: 4, caocao: 2 } },
      { label: "以理服人，用事实证明自己", scores: { liubei: 2, zhugeliang: 3 } }
    ]
  },
  {
    id: 5,
    text: "你带兵行军，突然遭遇暴雨，道路泥泞，士兵疲惫不堪，你会？",
    options: [
      { label: "身先士卒，鼓舞士气，继续前进", scores: { zhaoyun: 4, guanyu: 2 } },
      { label: "就地扎营，等雨停再走", scores: { zhugeliang: 3, liubei: 2 } },
      { label: "寻找当地向导，抄小路绕行", scores: { caocao: 3, simayi: 2 } },
      { label: "关心士兵，让大家休息，明天再赶路", scores: { liubei: 4, zhaoyun: 1 } }
    ]
  },
  {
    id: 6,
    text: "你的谋士献上一条奇计，但风险很大，成则大胜，败则全军覆没，你会？",
    options: [
      { label: "搏一把！富贵险中求", scores: { caocao: 4, guanyu: 1 } },
      { label: "仔细分析风险收益比，再做决定", scores: { zhugeliang: 3, simayi: 2 } },
      { label: "让谋士再想一个稳妥的方案", scores: { liubei: 3, zhaoyun: 2 } },
      { label: "先派人试探虚实，再决定是否执行", scores: { simayi: 4, caocao: 1 } }
    ]
  },
  {
    id: 7,
    text: "你最看重的品质是什么？",
    options: [
      { label: "忠义——人无信不立", scores: { guanyu: 5, zhaoyun: 1 } },
      { label: "智慧——谋定而后动", scores: { zhugeliang: 4, simayi: 2 } },
      { label: "仁德——得民心者得天下", scores: { liubei: 5, zhugeliang: 1 } },
      { label: "权变——识时务者为俊杰", scores: { caocao: 3, simayi: 3 } }
    ]
  },
  {
    id: 8,
    text: "你在酒桌上听到一个改变天下格局的秘密情报，你会？",
    options: [
      { label: "立刻回去部署，抢占先机", scores: { caocao: 4, simayi: 1 } },
      { label: "先验证情报真伪，不打无准备之仗", scores: { zhugeliang: 4, simayi: 1 } },
      { label: "告诉最信任的人，一起商量对策", scores: { liubei: 3, guanyu: 2 } },
      { label: "假装不知道，暗中布局", scores: { simayi: 4, caocao: 2 } }
    ]
  },
  {
    id: 9,
    text: "你打了败仗，损失惨重，逃回营中，你会？",
    options: [
      { label: "重整旗鼓，誓要报仇雪恨", scores: { guanyu: 3, caocao: 2 } },
      { label: "冷静复盘，找出失败原因", scores: { zhugeliang: 4, simayi: 1 } },
      { label: "安抚将士，稳定军心，来日再战", scores: { liubei: 4, zhaoyun: 1 } },
      { label: "先保全实力，等待时机翻盘", scores: { simayi: 4, caocao: 1 } }
    ]
  },
  {
    id: 10,
    text: "你面前有两条路：一条是险峻但快捷的山路，一条是平坦但绕远的官道，你会？",
    options: [
      { label: "走山路！兵贵神速", scores: { caocao: 3, zhaoyun: 2 } },
      { label: "走官道，稳扎稳打", scores: { zhugeliang: 3, liubei: 2 } },
      { label: "兵分两路，互为犄角", scores: { zhugeliang: 2, caocao: 2 } },
      { label: "先派斥候探路，看哪条更安全", scores: { simayi: 4, zhaoyun: 1 } }
    ]
  },
  {
    id: 11,
    text: "你最想拥有三国里谁的能力？",
    options: [
      { label: "关羽的武艺——过五关斩六将", scores: { guanyu: 5 } },
      { label: "诸葛亮的智慧——借东风、空城计", scores: { zhugeliang: 5 } },
      { label: "曹操的权术——挟天子以令诸侯", scores: { caocao: 4, simayi: 1 } },
      { label: "刘备的人格魅力——让天下英雄归心", scores: { liubei: 5 } }
    ]
  },
  {
    id: 12,
    text: "你的朋友圈风格是？",
    options: [
      { label: "霸气外露，指点江山", scores: { caocao: 4, guanyu: 1 } },
      { label: "心灵鸡汤，人生感悟", scores: { liubei: 3, zhugeliang: 2 } },
      { label: "几乎不发，深藏不露", scores: { simayi: 4, zhaoyun: 2 } },
      { label: "晒武艺/晒战绩/晒装备", scores: { guanyu: 3, zhaoyun: 2 } }
    ]
  },
  {
    id: 13,
    text: "你团队里有人能力很强但不服管，你会？",
    options: [
      { label: "用实力碾压他，让他心服口服", scores: { guanyu: 3, caocao: 2 } },
      { label: "给他空间，用结果说话", scores: { zhugeliang: 3, simayi: 2 } },
      { label: "找他谈心，了解他真正想要什么", scores: { liubei: 4, zhaoyun: 1 } },
      { label: "暗中观察，等他露出破绽", scores: { simayi: 4, caocao: 1 } }
    ]
  },
  {
    id: 14,
    text: "如果必须放弃一样东西，你会放弃？",
    options: [
      { label: "忠诚（为了更大的目标）", scores: { caocao: 4, simayi: 2 } },
      { label: "生命（为了守护重要的人）", scores: { guanyu: 3, zhaoyun: 3 } },
      { label: "面子（实惠最重要）", scores: { caocao: 3, simayi: 2 } },
      { label: "原则（底线不能破）", scores: { liubei: 3, guanyu: 3 } }
    ]
  },
  {
    id: 15,
    text: "深夜睡不着时你会？",
    options: [
      { label: "研究兵法/谋略", scores: { zhugeliang: 4, simayi: 1 } },
      { label: "练武/锻炼身体", scores: { guanyu: 3, zhaoyun: 3 } },
      { label: "思考天下大势", scores: { caocao: 3, liubei: 2 } },
      { label: "一个人静静发呆", scores: { simayi: 3, zhaoyun: 2 } }
    ]
  },
  {
    id: 16,
    text: "你最不能忍受的是？",
    options: [
      { label: "被人背叛", scores: { guanyu: 4, liubei: 2 } },
      { label: "被人轻视", scores: { caocao: 4, simayi: 1 } },
      { label: "看到不公却无能为力", scores: { liubei: 4, zhaoyun: 2 } },
      { label: "计划被打乱", scores: { zhugeliang: 3, simayi: 3 } }
    ]
  },
  {
    id: 17,
    text: "你理想中的结局是？",
    options: [
      { label: "一统天下，成就霸业", scores: { caocao: 5 } },
      { label: "匡扶汉室，还天下太平", scores: { liubei: 4, zhugeliang: 1 } },
      { label: "功成身退，归隐山林", scores: { zhugeliang: 3, zhaoyun: 3 } },
      { label: "活着就好，其他的再说", scores: { simayi: 4, caocao: 1 } }
    ]
  },
  {
    id: 18,
    text: "你穿越到三国，第一件事是？",
    options: [
      { label: "投奔明主，建功立业", scores: { zhaoyun: 4, liubei: 2 } },
      { label: "自立山头，打出一片天地", scores: { caocao: 4, guanyu: 1 } },
      { label: "隐居山林，等待时机", scores: { simayi: 3, zhugeliang: 3 } },
      { label: "游历四方，结交英雄", scores: { liubei: 3, guanyu: 2 } }
    ]
  },
  {
    id: 19,
    text: "你处理冲突的方式是？",
    options: [
      { label: "正面刚，谁怕谁", scores: { guanyu: 4, caocao: 2 } },
      { label: "以理服人，摆事实讲道理", scores: { zhugeliang: 4, liubei: 1 } },
      { label: "退一步海阔天空", scores: { zhaoyun: 3, liubei: 3 } },
      { label: "暗中解决，不留痕迹", scores: { simayi: 5 } }
    ]
  },
  {
    id: 20,
    text: "你觉得什么是真正的强大？",
    options: [
      { label: "武力碾压，让敌人闻风丧胆", scores: { guanyu: 4, zhaoyun: 3 } },
      { label: "运筹帷幄，决胜千里之外", scores: { zhugeliang: 4, simayi: 2 } },
      { label: "得道多助，天下归心", scores: { liubei: 5 } },
      { label: "掌控一切，天下在胸", scores: { caocao: 3, simayi: 3 } }
    ]
  },
];

// ===== 计算结果 =====
export function calculateSanguoResult(answers: number[]): SanguoCharacter {
  const scores: Record<string, number> = {};
  sanguoCharacters.forEach(c => scores[c.id] = 0);

  answers.forEach((optIndex, qIndex) => {
    const q = sanguoQuestions[qIndex];
    if (q && q.options[optIndex]) {
      const chosen = q.options[optIndex];
      Object.entries(chosen.scores).forEach(([charId, pts]) => {
        scores[charId] = (scores[charId] || 0) + pts;
      });
    }
  });

  let maxScore = 0;
  let winner = sanguoCharacters[0];
  Object.entries(scores).forEach(([id, score]) => {
    if (score > maxScore) { maxScore = score; winner = sanguoCharacters.find(c => c.id === id)!; }
  });
  return winner;
}

// ===== 计算维度得分 =====
export function calculateDimensionScores(answers: number[]): Record<string, number> {
  const dimScores: Record<string, number> = { martial: 0, wisdom: 0, strategy: 0, charisma: 0, leadership: 0 };

  // 维度映射：每个角色主要贡献的维度
  const charToDim: Record<string, Record<string, number>> = {
    caocao:     { strategy: 3, leadership: 2, wisdom: 1 },
    liubei:     { charisma: 3, leadership: 2, martial: 1 },
    zhugeliang: { wisdom: 3, strategy: 2, charisma: 1 },
    guanyu:     { martial: 3, charisma: 2, leadership: 1 },
    zhaoyun:    { martial: 3, leadership: 2, wisdom: 1 },
    simayi:     { strategy: 3, wisdom: 2, leadership: 1 },
  };

  answers.forEach((optIndex, qIndex) => {
    const q = sanguoQuestions[qIndex];
    if (q && q.options[optIndex]) {
      const chosen = q.options[optIndex];
      Object.entries(chosen.scores).forEach(([charId, pts]) => {
        const dims = charToDim[charId] || {};
        Object.entries(dims).forEach(([dimId, weight]) => {
          dimScores[dimId] = (dimScores[dimId] || 0) + pts * weight;
        });
      });
    }
  });

  return dimScores;
}
