// ===== 三国英雄测试 v2 - 12角色 30题 =====

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
  dimensionHighlight: string;
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

// ===== 十二位英雄 =====
export const sanguoCharacters: SanguoCharacter[] = [
  // ===== 男将 =====
  {
    id: "caocao", name: "曹操", title: "乱世之奸雄",
    motto: "宁教我负天下人，休教天下人负我",
    color: "#1A1A2E", bgGradient: "linear-gradient(135deg, #2C3E50 0%, #1A1A2E 100%)",
    description: "你是天生的领袖，胸怀天下却不受道德束缚。你果断狠辣，该出手时绝不犹豫。你相信实力才是乱世中唯一的通行证。",
    strengths: ["果断决绝", "知人善任", "军事天才", "胸有大志"],
    weaknesses: ["多疑猜忌", "手段狠辣", "过于自负"],
    career: "创业者 / CEO / 战略咨询",
    loveStyle: "霸道深情，占有欲强",
    rarity: "6%", dimensionHighlight: "权谋+统率"
  },
  {
    id: "liubei", name: "刘备", title: "仁德之君",
    motto: "惟贤惟德，能服于人",
    color: "#D4A017", bgGradient: "linear-gradient(135deg, #FFD700 0%, #D4A017 100%)",
    description: "你是天生的凝聚者，能让最优秀的人为你效力。你以德服人，用真诚打动人心。虽然起步艰难，但你的仁义最终会赢得天下。",
    strengths: ["仁义宽厚", "善于用人", "百折不挠", "深得民心"],
    weaknesses: ["优柔寡断", "感情用事", "缺乏果断"],
    career: "团队领导 / NGO负责人 / 教育工作者",
    loveStyle: "温柔专一，重情重义",
    rarity: "5%", dimensionHighlight: "魅力+统率"
  },
  {
    id: "zhugeliang", name: "诸葛亮", title: "卧龙先生",
    motto: "鞠躬尽瘁，死而后已",
    color: "#2E6B8A", bgGradient: "linear-gradient(135deg, #74b9ff 0%, #2E6B8A 100%)",
    description: "你是运筹帷幄的智者，能从全局视角看清局势。你擅长未雨绸缪，用智慧弥补资源的不足。你追求完美，有时会因操劳过度而忽略自身。",
    strengths: ["深谋远虑", "洞察人心", "多才多艺", "忠贞不渝"],
    weaknesses: ["事必躬亲", "过于理想化", "不善变通"],
    career: "战略规划 / 产品经理 / 学术研究",
    loveStyle: "细水长流，灵魂伴侣型",
    rarity: "5%", dimensionHighlight: "智慧+权谋"
  },
  {
    id: "guanyu", name: "关羽", title: "武圣",
    motto: "玉可碎而不可改其白，竹可焚而不可毁其节",
    color: "#C41E3A", bgGradient: "linear-gradient(135deg, #FF6B6B 0%, #C41E3A 100%)",
    description: "你是义薄云天的英雄，把忠诚和荣誉看得比生命还重。你武艺超群，傲视群雄。你的义气让人敬佩，但你的傲气有时会让你轻敌。",
    strengths: ["忠义无双", "武艺高强", "威震四方", "刚正不阿"],
    weaknesses: ["骄傲自负", "刚愎自用", "不够灵活"],
    career: "执法者 / 军人 / 安保行业",
    loveStyle: "专一深情，守护型",
    rarity: "8%", dimensionHighlight: "武勇+魅力"
  },
  {
    id: "zhangfei", name: "张飞", title: "猛张飞",
    motto: "俺也一样！",
    color: "#8B4513", bgGradient: "linear-gradient(135deg, #D2691E 0%, #8B4513 100%)",
    description: "你是火爆脾气的猛将，性格直爽，有话直说。你看似粗犷，实则粗中有细。你对兄弟忠心耿耿，对敌人毫不留情。",
    strengths: ["勇猛无畏", "性格直爽", "粗中有细", "重情重义"],
    weaknesses: ["脾气暴躁", "容易冲动", "缺乏耐心"],
    career: "运动员 / 消防员 / 创业先锋",
    loveStyle: "热烈直接，敢爱敢恨",
    rarity: "10%", dimensionHighlight: "武勇"
  },
  {
    id: "zhaoyun", name: "赵云", title: "常胜将军",
    motto: "吾乃常山赵子龙也",
    color: "#E8E8E8", bgGradient: "linear-gradient(135deg, #f5f5f5 0%, #bdc3c7 100%)",
    description: "你是完美主义的化身，武艺与品德兼备。你从不争功，却总在关键时刻挺身而出。你是团队中最可靠的人，低调却不可或缺。",
    strengths: ["武艺绝伦", "沉着冷静", "忠心耿耿", "谦逊低调"],
    weaknesses: ["存在感偏低", "不善表达", "过于完美主义"],
    career: "执行者 / 项目经理 / 技术专家",
    loveStyle: "默默守护，用行动证明",
    rarity: "8%", dimensionHighlight: "武勇+统率"
  },
  {
    id: "zhouyu", name: "周瑜", title: "美周郎",
    motto: "既生瑜，何生亮",
    color: "#E74C3C", bgGradient: "linear-gradient(135deg, #ff7675 0%, #E74C3C 100%)",
    description: "你是才华横溢的儒将，文武双全，风度翩翩。你有经天纬地之才，却常因心气太高而与人争锋。你追求完美，不允许自己输给任何人。",
    strengths: ["才华横溢", "军事天才", "风度翩翩", "琴棋书画"],
    weaknesses: ["心气太高", "妒忌心强", "英年早逝"],
    career: "创意总监 / 艺术家 / 音乐家",
    loveStyle: "浪漫多情，才子佳人",
    rarity: "7%", dimensionHighlight: "智慧+魅力"
  },
  {
    id: "simayi", name: "司马懿", title: "冢虎",
    motto: "鹰视狼顾，天下在胸",
    color: "#4A4A4A", bgGradient: "linear-gradient(135deg, #636e72 0%, #2d3436 100%)",
    description: "你是隐忍的猎手，擅长等待最佳时机。你城府极深，能屈能伸。你不争一时之长短，只看最终的胜负。时间是你最好的武器。",
    strengths: ["隐忍克制", "洞察人心", "善于等待", "战略眼光"],
    weaknesses: ["过于阴沉", "猜疑心重", "不够光明磊落"],
    career: "投资人 / 战略顾问 / 幕僚",
    loveStyle: "深藏不露，细水长流",
    rarity: "6%", dimensionHighlight: "权谋+智慧"
  },
  // ===== 女将 =====
  {
    id: "diaochan", name: "貂蝉", title: "闭月羞花",
    motto: "妾身虽弱，亦可倾国",
    color: "#FF69B4", bgGradient: "linear-gradient(135deg, #ffb6c1 0%, #FF69B4 100%)",
    description: "你是乱世中的绝色佳人，用智慧和美貌改变天下格局。你看似柔弱，实则心有乾坤。你懂得利用自己的优势，在男人的游戏中游刃有余。",
    strengths: ["美貌绝伦", "心思细腻", "善于周旋", "敢于牺牲"],
    weaknesses: ["命运多舛", "依赖他人", "难以自主"],
    career: "公关 / 外交 / 品牌营销",
    loveStyle: "深情专一，为爱牺牲",
    rarity: "4%", dimensionHighlight: "魅力+权谋"
  },
  {
    id: "sunshangxiang", name: "孙尚香", title: "弓腰姬",
    motto: "谁说女子不如男",
    color: "#E74C3C", bgGradient: "linear-gradient(135deg, #fd79a8 0%, #E74C3C 100%)",
    description: "你是巾帼不让须眉的女中豪杰。你武艺高强，性格刚烈，不愿被世俗束缚。你敢爱敢恨，活得比大多数男人都精彩。",
    strengths: ["武艺出众", "性格刚烈", "独立自主", "敢爱敢恨"],
    weaknesses: ["过于强势", "不善妥协", "感情用事"],
    career: "运动员 / 警察 / 创业者",
    loveStyle: "势均力敌，互相成就",
    rarity: "5%", dimensionHighlight: "武勇+魅力"
  },
  {
    id: "daqiao", name: "大乔", title: "江东二乔",
    motto: "愿得一心人，白首不相离",
    color: "#DDA0DD", bgGradient: "linear-gradient(135deg, #e8daef 0%, #DDA0DD 100%)",
    description: "你是温婉贤淑的大家闺秀，知书达理，温柔如水。你虽身处乱世，却保持着内心的宁静。你的温柔是最强大的力量，能融化最坚硬的心。",
    strengths: ["温柔贤淑", "知书达理", "善解人意", "内心坚韧"],
    weaknesses: ["过于隐忍", "缺乏主见", "命运被动"],
    career: "教师 / 心理咨询 / 文化传承",
    loveStyle: "温柔包容，默默守候",
    rarity: "4%", dimensionHighlight: "魅力"
  },
  {
    id: "xiaoqiao", name: "小乔", title: "铜雀春深",
    motto: "妾愿随君，生死不离",
    color: "#FFB6C1", bgGradient: "linear-gradient(135deg, #ffeaa7 0%, #FFB6C1 100%)",
    description: "你是才貌双全的奇女子，琴棋书画样样精通。你外表柔弱，内心却有自己的坚持。你懂得在乱世中保全自己，用才华赢得尊重。",
    strengths: ["才华横溢", "琴棋书画", "聪慧过人", "善解人意"],
    weaknesses: ["过于理想化", "缺乏安全感", "容易伤感"],
    career: "艺术家 / 作家 / 教育工作者",
    loveStyle: "浪漫细腻，灵魂共鸣",
    rarity: "4%", dimensionHighlight: "智慧+魅力"
  },
];

// ===== 30道题目 =====
export const sanguoQuestions: SanguoQuestion[] = [
  // --- 战场/危机决策 (1-6) ---
  {
    id: 1, text: "你被任命为一座孤城的守将，敌军十倍于你，粮草只够三天，你会？",
    options: [
      { label: "主动出击，以攻代守，杀出一条血路", scores: { caocao: 2, guanyu: 2, zhangfei: 1 } },
      { label: "设伏诱敌，用地形优势以少胜多", scores: { zhugeliang: 3, simayi: 2 } },
      { label: "坚守待援，稳定军心，相信会有转机", scores: { liubei: 2, zhaoyun: 2 } },
      { label: "派细作散布假情报，拖延时间", scores: { simayi: 3, diaochan: 1 } }
    ]
  },
  {
    id: 2, text: "一场大火烧毁了你的粮仓，士兵人心惶惶，你会？",
    options: [
      { label: "身先士卒，带头救火，稳定军心", scores: { zhaoyun: 3, zhangfei: 1 } },
      { label: "立刻派人去附近村庄借粮", scores: { liubei: 2, zhugeliang: 2 } },
      { label: "对外散布假消息，说粮草充足", scores: { simayi: 3, caocao: 1 } },
      { label: "趁夜偷袭敌军粮仓，以战养战", scores: { caocao: 3, guanyu: 1 } }
    ]
  },
  {
    id: 3, text: "你的盟友突然倒戈，联合敌人夹击你，你会？",
    options: [
      { label: "正面迎敌，绝不退缩", scores: { guanyu: 3, zhangfei: 2 } },
      { label: "暂时撤退，保存实力", scores: { simayi: 3, zhugeliang: 1 } },
      { label: "派使者去离间盟友和敌人", scores: { caocao: 2, zhugeliang: 2 } },
      { label: "坚守阵地，派人去搬救兵", scores: { zhaoyun: 2, liubei: 2 } }
    ]
  },
  {
    id: 4, text: "两军对峙，对方使用了你从未见过的阵法，你会？",
    options: [
      { label: "观察阵法规律，寻找破绽", scores: { zhugeliang: 3, zhouyu: 2 } },
      { label: "不管什么阵法，直接冲", scores: { zhangfei: 3, guanyu: 1 } },
      { label: "按兵不动，先搞清楚对方意图", scores: { simayi: 3, caocao: 1 } },
      { label: "用自己熟悉的阵法应对，以不变应万变", scores: { zhaoyun: 2, zhouyu: 2 } }
    ]
  },
  {
    id: 5, text: "你带兵行军，突然遭遇暴雨，道路泥泞，士兵疲惫不堪，你会？",
    options: [
      { label: "身先士卒，鼓舞士气，继续前进", scores: { zhangfei: 2, liubei: 2 } },
      { label: "就地扎营，等雨停再走", scores: { zhugeliang: 2, zhouyu: 1 } },
      { label: "寻找当地向导，抄小路绕行", scores: { caocao: 2, simayi: 2 } },
      { label: "关心士兵，让大家休息，明天再赶路", scores: { liubei: 3, zhaoyun: 1 } }
    ]
  },
  {
    id: 6, text: "敌军在城外叫阵，言语侮辱你的主帅，士兵们群情激愤，你会？",
    options: [
      { label: "带一队精兵出城迎战", scores: { zhangfei: 3, guanyu: 2 } },
      { label: "不理他们，继续守城", scores: { simayi: 2, zhugeliang: 2 } },
      { label: "派人出去探虚实，看是不是有埋伏", scores: { zhugeliang: 2, zhouyu: 2 } },
      { label: "用弓箭手压制，让他们闭嘴", scores: { caocao: 2, zhaoyun: 2 } }
    ]
  },
  // --- 人际/政治 (7-14) ---
  {
    id: 7, text: "你麾下有一位才华横溢但桀骜不驯的将领，你会？",
    options: [
      { label: "给他足够的权力和尊重，让他心服口服", scores: { liubei: 3, caocao: 1 } },
      { label: "用制度约束他，功过分明", scores: { caocao: 2, zhugeliang: 2 } },
      { label: "找他谈心，了解他真正想要什么", scores: { liubei: 2, diaochan: 1 } },
      { label: "暗中观察，等他犯错再出手", scores: { simayi: 3, caocao: 1 } }
    ]
  },
  {
    id: 8, text: "你发现盟友在暗中与敌人勾结，你会？",
    options: [
      { label: "直接质问他，当面对质", scores: { guanyu: 3, zhangfei: 1 } },
      { label: "假装不知，暗中收集证据", scores: { simayi: 3, caocao: 2 } },
      { label: "找他谈心，给他一个改过的机会", scores: { liubei: 3, daqiao: 1 } },
      { label: "派人去试探他的真实意图", scores: { zhugeliang: 2, diaochan: 2 } }
    ]
  },
  {
    id: 9, text: "你在朝堂上被政敌当众羞辱，你会？",
    options: [
      { label: "当场反击，让他知道厉害", scores: { guanyu: 2, sunshangxiang: 2 } },
      { label: "一笑置之，不与小人计较", scores: { zhugeliang: 2, daqiao: 2 } },
      { label: "记在心里，日后加倍奉还", scores: { simayi: 3, caocao: 1 } },
      { label: "以理服人，用事实证明自己", scores: { liubei: 2, zhouyu: 1 } }
    ]
  },
  {
    id: 10, text: "你的谋士献上一条奇计，但风险很大，成则大胜，败则全军覆没，你会？",
    options: [
      { label: "搏一把！富贵险中求", scores: { caocao: 3, zhangfei: 1 } },
      { label: "仔细分析风险收益比，再做决定", scores: { zhugeliang: 2, zhouyu: 2 } },
      { label: "让谋士再想一个稳妥的方案", scores: { liubei: 2, daqiao: 1 } },
      { label: "先派人试探虚实，再决定是否执行", scores: { simayi: 3, zhaoyun: 1 } }
    ]
  },
  {
    id: 11, text: "你面前有两条路：一条是险峻但快捷的山路，一条是平坦但绕远的官道，你会？",
    options: [
      { label: "走山路！兵贵神速", scores: { caocao: 2, zhangfei: 2 } },
      { label: "走官道，稳扎稳打", scores: { zhugeliang: 2, liubei: 2 } },
      { label: "兵分两路，互为犄角", scores: { zhugeliang: 2, zhouyu: 2 } },
      { label: "先派斥候探路，看哪条更安全", scores: { simayi: 3, zhaoyun: 1 } }
    ]
  },
  {
    id: 12, text: "你的对手派人来求和，条件看起来很优厚，你会？",
    options: [
      { label: "接受求和，保存实力", scores: { simayi: 2, caocao: 2 } },
      { label: "拒绝，一鼓作气消灭他", scores: { guanyu: 2, zhangfei: 2 } },
      { label: "假意接受，暗中部署", scores: { caocao: 3, zhugeliang: 1 } },
      { label: "提出更苛刻的条件试探诚意", scores: { zhugeliang: 2, zhouyu: 2 } }
    ]
  },
  {
    id: 13, text: "你打了一场大胜仗，俘虏了敌方将领，你会？",
    options: [
      { label: "以礼相待，劝他归降", scores: { liubei: 3, zhugeliang: 1 } },
      { label: "关起来，等他投降", scores: { caocao: 2, simayi: 1 } },
      { label: "直接杀了，以绝后患", scores: { guanyu: 2, zhangfei: 2 } },
      { label: "放他回去，施恩于他", scores: { caocao: 2, liubei: 2 } }
    ]
  },
  {
    id: 14, text: "你的上级是个无能之辈，但对你有知遇之恩，你会？",
    options: [
      { label: "继续辅佐他，报答知遇之恩", scores: { guanyu: 3, zhugeliang: 1 } },
      { label: "暗中培养自己的势力", scores: { simayi: 3, caocao: 1 } },
      { label: "直言进谏，帮他改正", scores: { liubei: 2, zhangfei: 1 } },
      { label: "找机会另谋高就", scores: { zhouyu: 2, sunshangxiang: 1 } }
    ]
  },
  // --- 生活/性格 (15-22) ---
  {
    id: 15, text: "你最看重的品质是什么？",
    options: [
      { label: "忠义——人无信不立", scores: { guanyu: 4, zhaoyun: 1 } },
      { label: "智慧——谋定而后动", scores: { zhugeliang: 3, simayi: 2 } },
      { label: "仁德——得民心者得天下", scores: { liubei: 3, daqiao: 2 } },
      { label: "权变——识时务者为俊杰", scores: { caocao: 2, simayi: 2 } }
    ]
  },
  {
    id: 16, text: "你最不能忍受的是？",
    options: [
      { label: "被人背叛", scores: { guanyu: 3, liubei: 2 } },
      { label: "被人轻视", scores: { caocao: 2, sunshangxiang: 2 } },
      { label: "看到不公却无能为力", scores: { liubei: 2, diaochan: 2 } },
      { label: "计划被打乱", scores: { zhugeliang: 2, simayi: 2 } }
    ]
  },
  {
    id: 17, text: "深夜睡不着时你会？",
    options: [
      { label: "研究兵法/谋略", scores: { zhugeliang: 3, simayi: 1 } },
      { label: "练武/锻炼身体", scores: { guanyu: 2, sunshangxiang: 2 } },
      { label: "弹琴/读书/写诗", scores: { zhouyu: 2, xiaoqiao: 2 } },
      { label: "一个人静静发呆", scores: { simayi: 2, daqiao: 2 } }
    ]
  },
  {
    id: 18, text: "你的朋友圈风格是？",
    options: [
      { label: "霸气外露，指点江山", scores: { caocao: 3, zhangfei: 1 } },
      { label: "心灵鸡汤，人生感悟", scores: { liubei: 2, daqiao: 2 } },
      { label: "几乎不发，深藏不露", scores: { simayi: 3, xiaoqiao: 1 } },
      { label: "晒武艺/晒战绩/晒装备", scores: { guanyu: 2, sunshangxiang: 2 } }
    ]
  },
  {
    id: 19, text: "你处理冲突的方式是？",
    options: [
      { label: "正面刚，谁怕谁", scores: { guanyu: 2, zhangfei: 3 } },
      { label: "以理服人，摆事实讲道理", scores: { zhugeliang: 3, liubei: 1 } },
      { label: "退一步海阔天空", scores: { zhaoyun: 2, daqiao: 2 } },
      { label: "暗中解决，不留痕迹", scores: { simayi: 3, diaochan: 1 } }
    ]
  },
  {
    id: 20, text: "你团队里有人能力很强但不服管，你会？",
    options: [
      { label: "用实力碾压他，让他心服口服", scores: { guanyu: 2, sunshangxiang: 2 } },
      { label: "给他空间，用结果说话", scores: { zhugeliang: 2, zhouyu: 2 } },
      { label: "找他谈心，了解他真正想要什么", scores: { liubei: 3, diaochan: 1 } },
      { label: "暗中观察，等他露出破绽", scores: { simayi: 3, caocao: 1 } }
    ]
  },
  {
    id: 21, text: "你穿越到三国，第一件事是？",
    options: [
      { label: "投奔明主，建功立业", scores: { zhaoyun: 3, liubei: 1 } },
      { label: "自立山头，打出一片天地", scores: { caocao: 3, zhangfei: 1 } },
      { label: "隐居山林，等待时机", scores: { simayi: 2, zhugeliang: 2 } },
      { label: "游历四方，结交英雄", scores: { liubei: 2, zhouyu: 2 } }
    ]
  },
  {
    id: 22, text: "如果必须放弃一样东西，你会放弃？",
    options: [
      { label: "忠诚（为了更大的目标）", scores: { caocao: 3, simayi: 2 } },
      { label: "生命（为了守护重要的人）", scores: { guanyu: 2, zhaoyun: 2, diaochan: 1 } },
      { label: "面子（实惠最重要）", scores: { caocao: 2, simayi: 2 } },
      { label: "原则（底线不能破）", scores: { liubei: 2, guanyu: 2, sunshangxiang: 1 } }
    ]
  },
  // --- 情感/价值观 (23-30) ---
  {
    id: 23, text: "你理想中的结局是？",
    options: [
      { label: "一统天下，成就霸业", scores: { caocao: 4, simayi: 1 } },
      { label: "匡扶汉室，还天下太平", scores: { liubei: 3, zhugeliang: 2 } },
      { label: "功成身退，归隐山林", scores: { zhugeliang: 2, zhaoyun: 2, xiaoqiao: 1 } },
      { label: "与心爱之人白头偕老", scores: { daqiao: 3, xiaoqiao: 2, diaochan: 1 } }
    ]
  },
  {
    id: 24, text: "你如何看待战争？",
    options: [
      { label: "战争是建功立业的唯一途径", scores: { zhangfei: 3, guanyu: 1 } },
      { label: "战争是不得已而为之的手段", scores: { liubei: 2, zhugeliang: 2 } },
      { label: "战争是政治的延续", scores: { caocao: 2, simayi: 2 } },
      { label: "战争最终受苦的是百姓", scores: { daqiao: 2, diaochan: 2 } }
    ]
  },
  {
    id: 25, text: "你在酒桌上听到一个改变天下格局的秘密情报，你会？",
    options: [
      { label: "立刻回去部署，抢占先机", scores: { caocao: 3, zhangfei: 1 } },
      { label: "先验证情报真伪，不打无准备之仗", scores: { zhugeliang: 3, simayi: 1 } },
      { label: "告诉最信任的人，一起商量对策", scores: { liubei: 2, guanyu: 2 } },
      { label: "假装不知道，暗中布局", scores: { simayi: 3, diaochan: 1 } }
    ]
  },
  {
    id: 26, text: "你打了一场败仗，损失惨重，逃回营中，你会？",
    options: [
      { label: "重整旗鼓，誓要报仇雪恨", scores: { guanyu: 2, zhangfei: 2 } },
      { label: "冷静复盘，找出失败原因", scores: { zhugeliang: 3, zhouyu: 1 } },
      { label: "安抚将士，稳定军心，来日再战", scores: { liubei: 3, zhaoyun: 1 } },
      { label: "先保全实力，等待时机翻盘", scores: { simayi: 3, caocao: 1 } }
    ]
  },
  {
    id: 27, text: "你如何看待权力？",
    options: [
      { label: "权力是实现理想的工具", scores: { caocao: 2, zhugeliang: 2 } },
      { label: "权力是责任，不是享受", scores: { liubei: 3, zhaoyun: 1 } },
      { label: "权力是危险的，要小心使用", scores: { simayi: 2, daqiao: 2 } },
      { label: "权力不如自由重要", scores: { sunshangxiang: 3, zhouyu: 1 } }
    ]
  },
  {
    id: 28, text: "你的朋友向你倾诉烦恼，你会？",
    options: [
      { label: "帮他分析问题，给出解决方案", scores: { zhugeliang: 2, zhouyu: 2 } },
      { label: "陪他喝酒，让他发泄情绪", scores: { zhangfei: 2, guanyu: 2 } },
      { label: "耐心倾听，给他情感支持", scores: { liubei: 2, daqiao: 2, xiaoqiao: 1 } },
      { label: "告诉他坚强点，人生就是这样", scores: { simayi: 2, caocao: 2 } }
    ]
  },
  {
    id: 29, text: "你最害怕什么？",
    options: [
      { label: "被压在山下，失去自由", scores: { caocao: 2, sunshangxiang: 2 } },
      { label: "误入歧途，偏离正道", scores: { liubei: 2, zhugeliang: 2 } },
      { label: "被遗忘，没有价值", scores: { zhaoyun: 2, diaochan: 2 } },
      { label: "孤独终老，没人陪", scores: { daqiao: 2, xiaoqiao: 2, guanyu: 1 } }
    ]
  },
  {
    id: 30, text: "你觉得什么是真正的强大？",
    options: [
      { label: "武力碾压，让敌人闻风丧胆", scores: { guanyu: 2, zhangfei: 3 } },
      { label: "运筹帷幄，决胜千里之外", scores: { zhugeliang: 3, simayi: 2 } },
      { label: "得道多助，天下归心", scores: { liubei: 4 } },
      { label: "掌控一切，天下在胸", scores: { caocao: 3, simayi: 1 } }
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
      Object.entries(q.options[optIndex].scores).forEach(([charId, pts]) => {
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

  const charToDim: Record<string, Record<string, number>> = {
    caocao:       { strategy: 3, leadership: 2, wisdom: 1 },
    liubei:       { charisma: 3, leadership: 2, martial: 1 },
    zhugeliang:   { wisdom: 3, strategy: 2, charisma: 1 },
    guanyu:       { martial: 3, charisma: 2, leadership: 1 },
    zhangfei:     { martial: 4, charisma: 1 },
    zhaoyun:      { martial: 3, leadership: 2, wisdom: 1 },
    zhouyu:       { wisdom: 2, charisma: 2, leadership: 1 },
    simayi:       { strategy: 3, wisdom: 2, leadership: 1 },
    diaochan:     { charisma: 3, strategy: 2 },
    sunshangxiang:{ martial: 2, charisma: 3, leadership: 1 },
    daqiao:       { charisma: 4, wisdom: 1 },
    xiaoqiao:     { charisma: 2, wisdom: 3 },
  };

  answers.forEach((optIndex, qIndex) => {
    const q = sanguoQuestions[qIndex];
    if (q && q.options[optIndex]) {
      Object.entries(q.options[optIndex].scores).forEach(([charId, pts]) => {
        const dims = charToDim[charId] || {};
        Object.entries(dims).forEach(([dimId, weight]) => {
          dimScores[dimId] = (dimScores[dimId] || 0) + pts * weight;
        });
      });
    }
  });

  return dimScores;
}
