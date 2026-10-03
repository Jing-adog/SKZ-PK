/* ---------- 能力检测：flex gap 是否生效 ----------
   Chrome 61 不支持 flex gap（间距由 CSS margin 基线承担，见 index.html 兼容层）；
   支持 flex gap 的内核给 <html> 加 .supports-flex-gap，启用 gap 并清除 margin。 */
(function supportsFlexGap(){
  var flex = document.createElement('div');
  flex.style.position = 'absolute';
  flex.style.visibility = 'hidden';
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';
  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));
  document.body.appendChild(flex);
  var supported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  if (supported) document.documentElement.classList.add('supports-flex-gap');
})();


/* ============================================================
   决战迷曲之巅｜SKZ 主打曲 PK 器
   ============================================================ */

/* ---------- 视图切换 ---------- */
const VIEWS = ['home', 'pk', 'top6', 'report'];
function showView(name){
  VIEWS.forEach(v => document.getElementById('view-' + v).classList.toggle('active', v === name));
  window.scrollTo(0, 0);
}

/* ============================================================
   歌曲数据区（主打曲，可自行修改填充）
   name     歌名
   year     发行年份
   album    专辑
   genre    主曲风（用于偏好报告统计，多值用 " / " 分隔）
   bpm      BPM（公开资料的大致值，可能有误差，可自行校正）
   intro    曲目介绍（卡片折叠面板内容）
   新增曲目：复制下面任一条目改字段即可；请成对添加（保持偶数首，
   瑞士轮两两配对不支持奇数），场次/轮数/每首出场次数自动同步。
   ============================================================ */
const SONGS = [
  { id: 0, name: 'Hellevator', year: 2017, album: 'Mixtape', genre: 'Hip-hop / Trap', bpm: 78,
    intro: '歌名由“地狱Hell”与“电梯Elevator”组合而成，是Stray Kids正式出道前的预热自作曲。歌曲将追逐梦想的艰辛历程比作地狱电梯，承载成员在生存节目中经历的压力与挣扎。作品展现极具爆发力的说唱与演唱，营造独特黑暗氛围，也是3RACHA创作之路的重要起点。' },
  { id: 1, name: 'District 9', year: 2018, album: 'I am NOT', genre: 'Hip-hop / Rock / K-Pop', bpm: 140,
    intro: 'Stray Kids正式出道主打曲。歌曲融入警笛音效与摇滚吉他riff，构建名为District 9的独立乌托邦。表达拒绝被世俗框架定义，挣脱外界的偏见，寻找属于自己的空间，宣告组合独树一帜的音乐态度。' },
  { id: 2, name: 'My Pace', year: 2018, album: 'I am WHO', genre: 'Pop / Hip-hop', bpm: 120,
    intro: '传递不必追赶别人脚步的内核。很多人在与他人的比较里感到焦虑迷茫，这首歌想告诉听众，不用被外界的节奏裹挟，按照属于自己的步调慢慢前行，接纳自身节奏，活出独属于自己的人生。' },
  { id: 3, name: 'I am YOU', year: 2018, album: 'I am YOU', genre: 'Hip-hop / Pop', bpm: 115,
    intro: '“I am”系列三部曲收官主打。歌词探讨迷茫、疲惫时刻人与人之间的羁绊，当自我陷入困顿，彼此可以成为对方的依靠，在相互陪伴之中找到共鸣，读懂“我即是你”这份温暖联结。' },
  { id: 4, name: 'MIROH', year: 2019, album: 'Clé 1: MIROH', genre: 'Trap / Hip-hop', bpm: 138,
    intro: 'MIROH取自韩文“迷宫”，寓意踏入充满未知挑战的世界。歌曲讲述踏入迷宫之后，不畏惧前路坎坷，带着燃烧的斗志奋勇向前，是让Stray Kids收获广泛关注度的标志性作品。' },
  { id: 5, name: 'Side Effects（副作用）', year: 2019, album: 'Clé 2: Yellow Wood', genre: 'Trap / EDM', bpm: 141,
    intro: '人生每一次选择都会带来对应的副作用。即便清楚选择会伴随痛苦、混乱与代价，依旧愿意承担这份结果，直面抉择带来的复杂情绪，描绘在十字路口挣扎纠结的内心状态。' },
  { id: 6, name: 'Double Knot', year: 2019, album: 'Double Knot', genre: 'Hip-hop / Trap', bpm: 135,
    intro: '数字单曲，歌名双重绳结寓意牢牢锁定目标。利落强劲的节奏，传递下定决心、整装出发，向着目标全力奔跑的信念。鞋带系紧，代表做好全部准备，奔赴下一段旅程。' },
  { id: 7, name: 'Levanter（风）', year: 2019, album: 'Clé : Levanter', genre: 'Pop / Hip-hop', bpm: 106,
    intro: 'Levanter意为风。歌词表达挣脱困住自己的枷锁，放下内心的纠结与束缚，如同风一般自由前行，走出困住自己的隧道，奔赴属于自己的道路，看见隧道尽头倾泻而下的光芒。' },
  { id: 8, name: 'God\'s Menu（神메뉴）', year: 2020, album: 'GO生', genre: 'Trap / Hip-hop', bpm: 144,
    intro: '将音乐比作厨师手中的菜单，各种风格都是可以自由调配的食材。Stray Kids展现不受曲风限制的创作实力，大胆玩转多元声音，宣告他们可以随心所欲打造属于自己的音乐。' },
  { id: 9, name: 'Back Door', year: 2020, album: 'IN生', genre: 'Hip-hop / Pop', bpm: 163,
    intro: '邀请听众推开后门，走进Stray Kids独有的世界。打破常规入口的限制，不用遵循既定的规则，进入充满活力、惊喜与未知的空间，展现充满爆发力的舞台与听觉魅力。' },
  { id: 10, name: 'ALL IN', year: 2020, album: 'ALL IN', genre: 'Hip-hop / Trap', bpm: 140,
    intro: '日本出道单曲，寓意赌上一切，全身心投入梦想。表达破釜沉舟、全力以赴的决心，不惧前路挑战，倾尽所有奔赴目标，展现坚定的信念感。' },
  { id: 11, name: 'TOP (Japanese ver.)', year: 2020, album: 'TOP', genre: 'Rock / Hip-hop', bpm: 196,
    intro: '动漫《神之塔》日文版片头曲。激昂有力的摇滚嘻哈曲风，搭配充满力量的歌词，描绘攀登高塔、不断向上突破的故事，传递永不放弃、向着顶峰冲刺的热血精神。' },
  { id: 12, name: 'Thunderous（소리꾼）', year: 2021, album: 'NOEASY', genre: 'Trap / 韩国传统民乐 / Hip-hop', bpm: 172,
    intro: '融合韩国传统盘索里元素。面对外界的杂音、非议与评判，不必沉默，坚持发出属于自己的声音。歌曲传递MZ世代的骨气，无论旁人如何评价，都不会泄气、坚守自我表达。' },
  { id: 13, name: 'Christmas EveL', year: 2021, album: 'Christmas EveL', genre: 'Pop / Hip-hop', bpm: 128,
    intro: '圣诞特别专辑双主打之一，颠覆传统温馨治愈的圣诞歌曲。描绘圣诞前夜躁动、热烈又特别的故事，跳出圣诞曲目固有的甜蜜框架，打造属于Stray Kids风格的圣诞氛围。' },
  { id: 14, name: 'Mixtape : OH', year: 2021, album: 'Mixtape : OH', genre: 'Pop / Hip-hop', bpm: 110,
    intro: 'Mixtape系列单曲，聚焦青春里悸动又忐忑的复杂情绪。捕捉心动瞬间慌乱无措的心境，细腻描绘少年心事，用轻快旋律诉说藏在心底、难以说出口的情感。' },
  { id: 15, name: 'Scars', year: 2021, album: 'Scars / Sorikun', genre: 'Pop / Hip-hop', bpm: 126,
    intro: '日语原创单曲，伤疤不是弱点，而是一路走来的证明。回顾一路走来所有的艰难时刻，过往留下的伤痕都是成长印记，带着这些回忆继续向前奔跑。' },
  { id: 16, name: 'Maniac', year: 2022, album: 'ODDINARY', genre: 'Trap / Pop', bpm: 140,
    intro: '讲述世人眼中的怪人。那些被别人视作怪异、不正常的特质，恰恰是最真实的自我。鼓励大家接纳自己与众不同的一面，不必强行迎合世俗标准，拥抱独属于自身的特质。' },
  { id: 17, name: 'Circus', year: 2022, album: 'CIRCUS', genre: 'Hip-hop / Pop', bpm: 131,
    intro: '日语迷你专主打，世界如同马戏团。他们在舞台之上尽情释放魅力，上演精彩表演，寓意人生就像马戏团，大胆展现自我，尽情释放独有的舞台能量。' },
  { id: 18, name: 'Case 143', year: 2022, album: 'MAXIDENT', genre: 'Pop / Hip-hop', bpm: 102,
    intro: '专辑名MAXIDENT代表大型意外事件，这首主打将坠入爱情比作案件，143代表“I love you”。用趣味的叙事，诉说毫无预兆坠入爱河之后，心动、慌乱又甜蜜的复杂情绪。' },
  { id: 19, name: 'Mixtape : Time Out', year: 2022, album: 'Mixtape : Time Out', genre: 'Pop Rock', bpm: 118,
    intro: '为纪念粉丝四周年推出的Mixtape单曲。鼓励人们暂时停下不停赶路的脚步，跳出忙碌日常，给自己一段喘息放空的时光，活在当下，尽情享受短暂的休憩与自由。' },
  { id: 20, name: 'S-Class（특）', year: 2023, album: '★★★★★ (5-STAR)', genre: 'Hip-hop / Pop / 多元素融合', bpm: 146,
    intro: '诠释何为S级，自信宣告自身的独特价值。整首歌融合多种曲风，节奏层次丰富，充满力量感，展现组合丰富的音乐表现力与游刃有余驾驭多元风格的创作能力。' },
  { id: 21, name: 'Social Path (feat. LiSA)', year: 2023, album: 'Social Path / Super Bowl', genre: 'Pop / Rock', bpm: 124,
    intro: '和LiSA合作的日语单曲，讲述在社会的道路上前行。一路上会遇见各种坎坷，依然坚持自我，不随波逐流，坚定走属于自己的道路。' },
  { id: 22, name: 'LALALALA（락）', year: 2023, album: '樂-STAR', genre: 'Drift Phonk / Afrobeats', bpm: 120,
    intro: '核心主题是无论经历何种情绪，最终选择享受快乐，在痛苦之中寻找欢愉。就算身处低谷，依旧拥抱音乐带来的释放，在旋律里尽情宣泄情绪，享受属于自己的狂欢时刻。' },
  { id: 23, name: 'The Sound', year: 2023, album: 'THE SOUND（首张日语正规专辑）', genre: 'Rock / Hip-hop', bpm: 115,
    intro: 'Stray Kids首张日语正规专辑主打，摇滚与嘻哈碰撞。厚重吉他riff搭配爆发力十足的演唱，传递属于他们独有的音乐之声，舞台冲击力极强。' },
  { id: 24, name: 'Chk Chk Boom', year: 2024, album: 'ATE', genre: 'Latin Hip-hop', bpm: 124,
    intro: '带着十足自信，采用拉丁风嘻哈节奏。歌曲表达瞄准目标，一击即中，利落抓耳的律动，是Stray Kids一次全新的风格尝试，充满野性又鲜活的魅力。' },
  { id: 25, name: 'GIANT', year: 2024, album: 'GIANT', genre: 'Pop / Hip-hop', bpm: 129,
    intro: '日语专辑主打，希望成为能够守护他人的巨人。想要拥有强大的内心，扛起身上的重量，守护身边重要的人，带着温柔与力量继续前行。' },
  { id: 26, name: 'Walkin On Water', year: 2024, album: '合(HOP)', genre: 'Pop / Hip-hop', bpm: 116,
    intro: '传递携手同行、不惧风浪的内核。如同行走在水面之上，伙伴之间彼此支撑，一同跨越眼前所有难关，怀揣希望往前走，一起奔赴更好的未来。' },
  { id: 27, name: 'lose my breath', year: 2024, album: 'Lose My Breath (feat. Charlie Puth)', genre: 'Pop', bpm: 133,
    intro: '与Charlie Puth合作的英文单曲，轻快流行律动。抓耳的旋律搭配流畅人声，描绘对视瞬间心跳失控的心动感，清爽又抓耳。' },
  { id: 28, name: 'CEREMONY', year: 2025, album: 'KARMA（正规4辑）', genre: 'Hip-hop', bpm: 122,
    intro: '在忍耐与努力之后收获成功、庆祝在这一过程中克服无数逆境的历程。强烈的Trap EDM曲调节奏、Baile Funk节奏、强劲的Pluck、充满力量感的节拍以及极具感染力的副歌。Stray Kids走过的过去、闪耀的现在以及即将迈向的未来，将如全景画一般在大家面前展开。' },
  { id: 29, name: 'DO IT', year: 2025, album: 'DO IT', genre: 'Hip-hop', bpm: 104,
    intro: '以Reggaeton为基底，是一首主Riff抓耳、在从容酷飒的氛围中蕴含强烈能量的流行歌曲。「不要犹豫，此刻就相信本能，果断去尝试吧！」。' },
  { id: 30, name: 'hollow', year: 2025, album: 'Hollow（日本3rd迷你专）', genre: 'Pop', bpm: 106,
    intro: '意为「空荡」的英文单词Hollow以及表示「孤独」的韩语单词홀로，用深切的歌词、感性的旋律表现了某一天突然感到空虚或觉得空落落的感情。' },
  { id: 31, name: 'This & That', year: 2026, album: 'THIS & THAT', genre: 'Hip-hop', bpm: 87,
    intro: '一首将Stray Kids独有的Chill且Cool氛围发挥到极致的曲目。在充满律动感的嘻哈基底之上，搭配慵懒却极具中毒性的旋律，以及自由穿梭于各种选项之间的歌词。SKZ在这首歌中注入了「无论想要什么，这个那个统统搞定」的从容准备与自信态度。' },
];

/* ---------- 瑞士轮配对：每轮按当前胜场分组，同胜场互打（胜者打胜者、败者打败者） ----------
   组内奇数时随机一首「下浮」到相邻低分组（胜场差 1）；
   30 首总数偶数 → 下浮级联后所有组都成对，每轮恰好 15 场。第 1 轮全员 0 胜 = 随机混战。 */
function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

function pairRound(wins){
  const groups = {};
  SONGS.forEach((s, i) => {
    const w = wins[i] || 0;
    (groups[w] = groups[w] || []).push(i);
  });
  const pairs = [];
  const keys = Object.keys(groups).sort((a, b) => b - a);
  keys.forEach((k, ki) => {
    const g = shuffle(groups[k]);
    if (g.length % 2 && ki + 1 < keys.length){
      groups[keys[ki + 1]].push(g.pop());   /* 组内落单 → 下浮到相邻低分组 */
    }
    for (let i = 0; i + 1 < g.length; i += 2) pairs.push([g[i], g[i + 1]]);
  });
  return pairs;
}

/* ---------- 是否曾经交锋（用于「再次交锋」标签） ---------- */
function isRematch(pa, pb){
  for (let k = 0; k < Game.history.length; k++){
    const m = Game.history[k];
    if ((m.a === pa && m.b === pb) || (m.a === pb && m.b === pa)) return true;
  }
  return false;
}

/* ---------- 对战状态（4 轮瑞士轮） ---------- */
const ROUNDS_TOTAL = 4;                     /* 轮数：30 首 → 每轮 15 场 × 4 轮 = 60 场（想改场数改这里，全站数字自动同步） */
const MATCHES_PER_ROUND = SONGS.length / 2; /* 每轮场次 = 歌曲数 ÷ 2（全体各出场一次） */
const TOTAL_MATCHES = ROUNDS_TOTAL * MATCHES_PER_ROUND; /* 主赛总场次；冠军对决/同分打擂/垫底对决均为加赛 */

const Game = {
  rounds: [],       /* 每轮的配对（生成后保存；撤销跨轮时旧轮配对不变） */
  idx: 0,           /* 已完成的场次 0..60 */
  wins: {},         /* 歌曲 id → 胜场 */
  history: [],      /* { a, b, winner, kind: 'main' | 'final' | 'tb' | 'bottom' } */
  phase: 'main',    /* main | final | top6 | bottom | done */
  duelPair: null,   /* 加赛对决的两首（冠军/同分打擂/垫底） */
  duelLabel: '',    /* 冠军对决 / 同分打擂 / 垫底对决 */
  finalDone: false, top6Done: false, bottomDone: false,

  start(){
    this.wins = {}; this.history = [];
    this.rounds = [ pairRound(this.wins) ];
    this.idx = 0; this.phase = 'main'; this.duelPair = null;
    this.finalDone = this.top6Done = this.bottomDone = false;
    showView('pk');
    this.render();
  },

  currentMatch(){
    if (this.duelPair) return this.duelPair;
    return this.rounds[Math.floor(this.idx / MATCHES_PER_ROUND)][this.idx % MATCHES_PER_ROUND];
  },

  choose(side){
    const m = this.currentMatch();
    const winner = side === 'a' ? m[0] : m[1];
    /* 同分打擂只记录二选一的偏好（计入直接交手），不累计胜场 */
    if (this.phase !== 'top6'){
      this.wins[winner] = (this.wins[winner] || 0) + 1;
    }
    this.history.push({
      a: m[0], b: m[1], winner,
      kind: this.phase === 'final' ? 'final' : this.phase === 'bottom' ? 'bottom'
        : this.phase === 'top6' ? 'tb' : 'main'
    });

    if (this.phase === 'final') this.finalDone = true;
    else if (this.phase === 'bottom'){
      this.bottomDone = true;
      this.top6Done = false; /* 垫底胜者 +1 会改变对手总胜场，TOP6 需重新检查 */
    }
    else if (this.phase === 'main'){
      this.idx++;
      if (this.idx < TOTAL_MATCHES && this.idx % MATCHES_PER_ROUND === 0){
        this.rounds[this.idx / MATCHES_PER_ROUND] = pairRound(this.wins); /* 新一轮按当前胜场配对 */
      }
    }
    /* top6 同分打擂：每场打完重新推导，仍同分就继续下一场 */
    this.reDerive();
  },

  /* 从当前状态推导下一阶段：主赛 → 冠军对决 → 垫底对决 → TOP6 同分打擂（最后，避免后续对局再扰动榜单） → 出榜 */
  reDerive(){
    /* 1) 主赛未完 */
    if (this.idx < TOTAL_MATCHES){
      this.phase = 'main'; this.duelPair = null;
      this.render();
      return;
    }

    /* 2) 冠军未定：恰好 2 首全胜 → 冠军对决；否则直接定 */
    if (!this.finalDone){
      const top = [];
      SONGS.forEach((s, i) => { if ((this.wins[i] || 0) === ROUNDS_TOTAL) top.push(i); });
      if (top.length === 2){
        this.phase = 'final'; this.duelPair = top; this.duelLabel = '冠军对决';
        this.render();
        return;
      }
      this.finalDone = true;
    }

    /* 3) 垫底未定：恰好 2 首垫底 → 垫底对决（先打，避免其胜场扰动 TOP6 的对手总胜场） */
    if (!this.bottomDone){
      let minW = Infinity; const bottom = [];
      SONGS.forEach((s, i) => {
        const w = this.wins[i] || 0;
        if (w < minW){ minW = w; bottom.length = 0; bottom.push(i); }
        else if (w === minW){ bottom.push(i); }
      });
      if (bottom.length === 2){
        this.phase = 'bottom'; this.duelPair = bottom; this.duelLabel = '垫底对决';
        this.render();
        return;
      }
      this.bottomDone = true;
    }

    /* 4) TOP6 仍有细则全同的并列（含第 6/7 名边界）→ 同分打擂：与 PK 相同的二选一对决，直到排出名次 */
    if (!this.top6Done){
      let pair = null;
      /* 撤销打擂后优先恢复刚撤销的那一对 */
      if (this.phase === 'top6' && this.duelPair &&
          compareSongs(this.duelPair[0], this.duelPair[1]) === 0) pair = this.duelPair;
      if (!pair) pair = findTop6TiePair();
      if (pair){
        this.phase = 'top6'; this.duelPair = pair; this.duelLabel = '同分打擂';
        this.render();
        return;
      }
      this.top6Done = true; /* TOP6 与边界均无并列 */
    }

    this.finish();
  },

  undo(){
    if (!this.history.length) return;
    const h = this.history.pop();
    if (h.kind !== 'tb') this.wins[h.winner]--; /* 打擂不计胜场，撤销同样不减 */
    if (h.kind === 'main'){
      this.idx--;
      if (this.idx < TOTAL_MATCHES){
        this.finalDone = this.top6Done = this.bottomDone = false;
      }
    } else if (h.kind === 'final'){
      this.finalDone = this.top6Done = this.bottomDone = false;
    } else if (h.kind === 'tb'){
      /* 恢复刚撤销的那一对，重新检查 TOP6 是否仍同分 */
      this.phase = 'top6'; this.duelPair = [h.a, h.b];
      this.top6Done = false;
    } else {
      this.bottomDone = false;
      this.top6Done = false; /* 撤销垫底对决后对手总胜场变化，TOP6 也需重查 */
    }
    this.reDerive();
  },

  finish(){
    this.phase = 'done';
    renderBoard();
    showView('top6');
  },

  render(){
    const isMain = this.phase === 'main';
    if (isMain){
      document.getElementById('pk-round').innerHTML =
        '第 <b>' + (this.idx + 1) + '</b> / <b>' + TOTAL_MATCHES + '</b> 场';
    } else {
      /* 加赛场次不固定：冠军对决 / 同分打擂 / 垫底对决累计计数 */
      let extras = 0;
      this.history.forEach(h => { if (h.kind !== 'main') extras++; });
      document.getElementById('pk-round').innerHTML = '加赛 · 第 <b>' + (extras + 1) + '</b> 场';
    }
    document.getElementById('pk-bar-fill').style.width =
      (isMain ? this.idx / TOTAL_MATCHES : 1) * 100 + '%';
    document.getElementById('btn-undo').disabled = !this.history.length;

    const m = this.currentMatch();
    const sA = SONGS[m[0]], sB = SONGS[m[1]];

    /* 阶段提示：轮次/对决 + 双方当前胜场 */
    if (!isMain){
      document.getElementById('pk-stage').textContent =
        (this.phase === 'final' ? '🏆 ' : '⚔️ ') + this.duelLabel +
        ' · ' + (this.wins[m[0]] || 0) + ' 胜 vs ' + (this.wins[m[1]] || 0) + ' 胜';
    } else if (this.idx < MATCHES_PER_ROUND){
      document.getElementById('pk-stage').textContent = '第 1 轮 · 随机混战';
    } else {
      const r = Math.floor(this.idx / MATCHES_PER_ROUND) + 1;
      document.getElementById('pk-stage').textContent =
        '第 ' + r + ' 轮 · ' + (this.wins[m[0]] || 0) + ' 胜 vs ' + (this.wins[m[1]] || 0) + ' 胜';
    }

    const rematch = isRematch(m[0], m[1]);
    document.getElementById('card-a').innerHTML = cardHTML(sA, 'a', rematch);
    document.getElementById('card-b').innerHTML = cardHTML(sB, 'b', rematch);
    window.scrollTo(0, 0);
  },

};

/* ---------- 排名细则：总胜场 → 直接交手 → 对手总胜场(Buchholz) → 累计净胜分 ---------- */
function songStats(id){
  let losses = 0, oppWins = 0;
  Game.history.forEach(h => {
    if (h.kind === 'tb') return; /* 同分打擂只计入直接交手，不影响胜场/负场/对手总胜场 */
    if (h.a !== id && h.b !== id) return;
    if (h.winner !== id) losses++;
    oppWins += Game.wins[h.a === id ? h.b : h.a] || 0;
  });
  return { wins: Game.wins[id] || 0, losses, buchholz: oppWins, net: (Game.wins[id] || 0) - losses };
}

function h2hResult(a, b){ /* 直接交手胜负差：>0 = a 占优；<0 = b 占优；0 = 无交手或打平 */
  let d = 0;
  Game.history.forEach(h => {
    if ((h.a === a && h.b === b) || (h.a === b && h.b === a)) d += h.winner === a ? 1 : -1;
  });
  return d;
}

function compareSongs(a, b){ /* 细则比较：负值 = a 排前 */
  const sa = songStats(a), sb = songStats(b);
  if (sa.wins !== sb.wins) return sb.wins - sa.wins;
  const h = h2hResult(a, b);
  if (h !== 0) return -h;
  if (sa.buchholz !== sb.buchholz) return sb.buchholz - sa.buchholz;
  if (sa.net !== sb.net) return sb.net - sa.net;
  return 0;
}

/* 相邻交换至无逆序（限趟，防环状互胜震荡） */
function settle(rows){
  for (let pass = 0; pass < rows.length; pass++){
    let swapped = false;
    for (let i = 0; i + 1 < rows.length; i++){
      if (compareSongs(rows[i + 1].id, rows[i].id) < 0){
        const t = rows[i]; rows[i] = rows[i + 1]; rows[i + 1] = t;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}

/* TOP6 内、或第 6 名与榜下任何曲目的细则全同并列 → 取一对作同分打擂对决
   （不依赖相邻：并列簇内可夹杂已交手的歌，打乱顺序不应掩盖边界并列） */
function findTop6TiePair(){
  const rows = buildRanking();
  for (let i = 0; i < 6; i++){
    for (let j = i + 1; j < rows.length; j++){
      if (compareSongs(rows[i].id, rows[j].id) === 0) return [rows[i].id, rows[j].id];
    }
  }
  return null;
}

/* ---------- 榜单：按细则排序，全部相同才并列 ---------- */
function buildRanking(){
  const rows = SONGS.map((s, i) => ({
    id: i, song: s,
    wins: Game.wins[i] || 0,
    stats: songStats(i)
  }));
  /* 基准排序用稳定键（胜场 → Buchholz → 净胜），直接交手随后用相邻交换修正 */
  rows.sort((a, b) =>
    b.stats.wins - a.stats.wins ||
    b.stats.buchholz - a.stats.buchholz ||
    b.stats.net - a.stats.net
  );
  settle(rows);
  /* 细则全同的并列簇内：先按簇内交手胜场数，再交手胜者前移（限趟防环状互胜震荡） */
  for (let i = 0; i < rows.length; ){
    let j = i + 1;
    while (j < rows.length && compareSongs(rows[j - 1].id, rows[j].id) === 0) j++;
    const hw = {};
    for (let x = i; x < j; x++)
      for (let y = i; y < j; y++)
        if (x !== y && h2hResult(rows[x].id, rows[y].id) > 0) hw[rows[x].id] = (hw[rows[x].id] || 0) + 1;
    const seg = rows.slice(i, j).sort((a, b) => (hw[b.id] || 0) - (hw[a.id] || 0));
    for (let pass = 0; pass < seg.length; pass++){
      let swapped = false;
      for (let x = 0; x + 1 < seg.length; x++){
        if (h2hResult(seg[x + 1].id, seg[x].id) > 0){
          const t = seg[x]; seg[x] = seg[x + 1]; seg[x + 1] = t;
          swapped = true;
        }
      }
      if (!swapped) break;
    }
    for (let x = 0; x < seg.length; x++) rows[i + x] = seg[x];
    i = j;
  }
  /* 簇内重排可能让组边界产生新的逆序（如簇末位与下一组首曲有交手关系），再修正一遍
     注意：buildRanking 必须完全确定——同分打擂的检查与最终出榜渲染都调用它，
     任何随机性都会让「检查说无并列」与「渲染出并列」不一致 */
  settle(rows);
  /* 名次：细则全同 → 并列，否则名次前进 */
  let rank = 0;
  rows.forEach((r, i) => {
    const sameAsPrev = i > 0 && compareSongs(rows[i - 1].id, r.id) === 0;
    if (!sameAsPrev) rank = i + 1;
    r.rank = rank;
    r.tied = sameAsPrev || (i + 1 < rows.length && compareSongs(r.id, rows[i + 1].id) === 0);
  });
  return rows;
}

function top6CardHTML(r, i){
  const s = r.song;
  const tie = r.tied ? '<span class="t6-tie">并列</span>' : '';
  return `
    <details class="top6-card${i === 0 ? ' top6-first' : ''}">
      <summary>
        ${i === 0 ? '<span class="crown">👑</span>' : ''}
        <span class="t6-rank-wrap"><span class="t6-rank">${r.rank}</span>${tie}</span>
        <span class="t6-name">${s.name}</span>
        <span class="t6-wins">${r.wins} 胜</span>
        <span class="t6-arrow">▼</span>
      </summary>
      <div class="t6-detail">
        <p class="t6-meta">${s.year} · ${s.album}</p>
        <div class="t6-chips">
          <span class="card-chip">${s.genre}</span>
          <span class="card-chip">BPM ${s.bpm}</span>
        </div>
        <p class="t6-intro">${s.intro}</p>
      </div>
    </details>`;
}

function rankRowHTML(r, isTop){
  const s = r.song;
  return `
    <details class="rank-row${isTop ? ' top-row' : ''}">
      <summary>
        <span class="rk-num">${r.rank}${r.tied ? '<small>并列</small>' : ''}</span>
        <span class="rk-main">
          <span class="rk-name">${s.name}</span>
          <span class="rk-meta">${s.year} · ${s.album}</span>
        </span>
        <span class="rk-wins">${r.wins} 胜</span>
        <span class="arrow">▼</span>
      </summary>
      <div class="rk-detail">
        <div class="rk-chips">
          <span class="card-chip">${s.genre}</span>
          <span class="card-chip">BPM ${s.bpm}</span>
        </div>
        <p class="rk-stats">胜场 ${r.wins} · 净胜分 ${r.stats.net >= 0 ? '+' : ''}${r.stats.net} · 对手总胜场 ${r.stats.buchholz}</p>
        <p class="rk-intro">${s.intro}</p>
      </div>
    </details>`;
}

function renderBoard(){
  const rows = buildRanking();
  const top6 = rows.slice(0, 6);
  const t6HTML = top6.map((r, i) => top6CardHTML(r, i)).join('')
    + '<button id="btn-report" class="top6-more" type="button"><span class="icon">📊</span><b>个人偏好报告</b><span class="more-tip">查看你的听歌人格 →</span></button>';
  document.getElementById('top6-grid').innerHTML = t6HTML;
  document.getElementById('rank-list').innerHTML = rows.map(r => rankRowHTML(r, top6.indexOf(r) !== -1)).join('');
  document.getElementById('board-sub').textContent = '对决全部完成 · 共 ' + SONGS.length + ' 首 · 点击卡片查看歌曲详情';
}

/* ---------- 偏好报告：TOP6 的节奏人格 / 曲风雷达 / 年代分布 / 一句话总结 ---------- */
const PACES = [
  { max: 105, key: '温柔', range: '<105 BPM', line: '旋律先行，慢下来也上头' },
  { max: 125, key: '中速', range: '105-125 BPM', line: '节奏刚好的舒适区，越听越稳' },
  { max: 145, key: '高能', range: '125-145 BPM', line: '鼓点一响，原地蹦迪' },
  { max: Infinity, key: '硬核', range: '≥145 BPM', line: '全程高速，心脏跟着副歌跳' }
];
const ERAS = [
  { max: 2020, key: '出道期', range: '2017-2019' },
  { max: 2022, key: '爆发期', range: '2020-2021' },
  { max: 2024, key: '转型期', range: '2022-2023' },
  { max: Infinity, key: '成熟期', range: '2024 至今' }
];

function buildReport(){
  const top6 = buildRanking().slice(0, 6).map(r => r.song);
  /* BPM：平均 → 档位 */
  const avg = Math.round(top6.reduce((s, x) => s + x.bpm, 0) / top6.length);
  const pace = PACES.find(p => avg < p.max);
  /* 曲风：按 " / " 拆分统计，多值曲风每段各计一次 */
  const gc = {};
  top6.forEach(x => x.genre.split('/').forEach(g => {
    const k = g.trim();
    if (k) gc[k] = (gc[k] || 0) + 1;
  }));
  const genreRows = Object.keys(gc).map(k => [k, gc[k]])
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-Hans-CN'));
  /* 年代：每首所属阶段计数 */
  const ec = { '出道期': 0, '爆发期': 0, '转型期': 0, '成熟期': 0 };
  top6.forEach(x => { ec[ERAS.find(e => x.year < e.max).key]++; });
  const topEra = ERAS.find(e => e.key === Object.keys(ec).sort((a, b) => ec[b] - ec[a])[0]);
  return { top6, avg, pace, genreRows, ec, topEra };
}

function renderReport(){
  const r = buildReport();
  document.getElementById('report-sub').textContent = '基于你的 TOP6 生成 · 共 ' + r.top6.length + ' 首';

  /* 节奏人格 */
  document.getElementById('report-bpm').textContent = r.avg;
  document.getElementById('report-pace-name').textContent = r.pace.key + ' · ' + r.pace.range;
  document.getElementById('report-pace-scale').innerHTML = PACES.map(p =>
    '<span class="pace-step' + (p === r.pace ? ' cur' : '') + '">' + p.key + '</span>').join('');
  document.getElementById('report-pace-line').textContent = '「' + r.pace.line + '」';

  /* 曲风雷达（最多 5 条，宽度按最高计数等比） */
  const maxG = r.genreRows[0][1];
  document.getElementById('report-genre').innerHTML = r.genreRows.slice(0, 5).map(([g, c]) =>
    '<div class="bar-row"><span class="bar-label">' + g + '</span>' +
    '<span class="bar-track"><span class="bar-fill" style="width:' + Math.round(c / maxG * 100) + '%"></span></span>' +
    '<span class="bar-count">' + c + ' 首</span></div>').join('');

  /* 年代分布（只显示有曲目的阶段） */
  const eraRows = ERAS.filter(e => r.ec[e.key] > 0);
  const maxE = Math.max.apply(null, eraRows.map(e => r.ec[e.key]));
  document.getElementById('report-era').innerHTML = eraRows.map(e =>
    '<div class="bar-row"><span class="bar-label">' + e.key + '<small>' + e.range + '</small></span>' +
    '<span class="bar-track"><span class="bar-fill" style="width:' + Math.round(r.ec[e.key] / maxE * 100) + '%"></span></span>' +
    '<span class="bar-count">' + r.ec[e.key] + ' 首</span></div>').join('');

  /* 一句话总结 */
  const topG = r.genreRows[0];
  document.getElementById('report-summary').innerHTML =
    '你的本命雷达锁定 <b class="hl">' + topG[0] + ' × ' + r.pace.key + '</b>：' +
    'TOP6 平均 BPM <b>' + r.avg + '</b>，曲风基因里 <b>' + topG[0] + '</b> 出现 ' + topG[1] + ' 次领先，' +
    '最常 pick 的是 <b>' + r.topEra.key + '（' + r.topEra.range + '）</b> 的 Stray Kids。' +
    r.pace.line + '。';
}

/* ---------- 歌曲卡片模板 ---------- */
function cardHTML(song, side, rematch){
  const tag = side === 'a' ? 'A' : 'B';
  const rematchTag = rematch ? '<span class="rematch-tag">↻ 再次交锋</span>' : '';
  return `
    <article class="song-card card-${side}">
      <div class="card-tag">${tag}</div>
      <h2 class="card-name">${song.name}</h2>
      ${rematchTag}
      <p class="card-meta">${song.year} · ${song.album}</p>
      <div class="card-chips">
        <span class="card-chip">${song.genre}</span>
        <span class="card-chip">BPM ${song.bpm}</span>
      </div>
      <details class="card-detail">
        <summary>曲目介绍 <span class="arrow">▼</span></summary>
        <p class="card-intro">${song.intro}</p>
      </details>
      <button class="btn-choose" data-side="${side}">选择这首</button>
    </article>`;
}

/* ---------- 首页数字随歌曲数据动态生成（总场次不写死） ---------- */
document.querySelector('meta[name="description"]').content =
  '决战迷曲之巅——Stray Kids 主打曲 PK 器：' + SONGS.length + ' 首主打两两对决，选出你的本命 TOP6 与听歌偏好报告';
document.getElementById('chip-songs').textContent = SONGS.length;
document.getElementById('chip-matches').textContent = TOTAL_MATCHES;
document.getElementById('rules-total').textContent = TOTAL_MATCHES;
document.getElementById('rules-rounds').textContent = ROUNDS_TOTAL;
document.getElementById('rules-times').textContent = ROUNDS_TOTAL;
document.getElementById('home-note').textContent =
  '全程 ' + TOTAL_MATCHES + ' 场 + 同分打擂加赛 · 约 ' +
  Math.round(TOTAL_MATCHES * 12 / 60) + '–' + Math.round(TOTAL_MATCHES * 18 / 60) + ' 分钟 · 随时重新挑战';

/* ---------- 事件绑定 ---------- */
document.getElementById('btn-start').addEventListener('click', () => Game.start());
document.getElementById('btn-undo').addEventListener('click', () => Game.undo());
document.getElementById('btn-restart').addEventListener('click', () => Game.start());
document.getElementById('view-pk').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-choose');
  if (btn) Game.choose(btn.dataset.side);
});
document.getElementById('view-top6').addEventListener('click', (e) => {
  if (e.target.closest('#btn-report')){ renderReport(); showView('report'); }
});
document.getElementById('btn-back-board').addEventListener('click', () => showView('top6'));
document.getElementById('btn-restart2').addEventListener('click', () => Game.start());
