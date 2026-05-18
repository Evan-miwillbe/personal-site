/**
 * SITE_DATA — 三页个人网站共享数据
 * --------------------------------------------------------------------
 * 用法：所有页面 <script src="data.js"></script>，然后读 window.SITE_DATA
 *
 * 未来切换到飞书 Base：
 *   每个顶层数组（contacts / projects / experiences / awards / skills）
 *   对应飞书 Base 中的一张表，每条记录的字段名 = Base 列名。
 *   迁移时只需把数组里的每个对象一一映射到 Base 行（字段已是扁平 snake_case
 *   原子类型 string/number/bool/array），然后用 lark-base CLI 读 records
 *   并保留同样的字段结构注入 window.SITE_DATA 即可。
 *
 *   建议的 Base 表 schema：
 *     - site_meta       (单行表，每列一个 meta 字段)
 *     - contacts        (列: id, type, url, display, icon, sort_order)
 *     - projects        (列: id, slug, name_en, name_cn, year, ...)
 *     - experiences     (列: id, date_range, role, org, summary, type, sort_order)
 *     - awards          (列: id, name, date, issuer, url, type, related_projects)
 *     - skills          (列: id, category_cn, category_en, items, sort_order)
 *
 * 数据来源：hello.html (line 1-1493)。所有 hello.html 未明示的字段用 null。
 */

window.SITE_DATA = {

  meta: {
    name_cn: "滕美名",
    name_en: "Teng Meiming",
    surname_cn: "滕",
    nickname_en: "Evan",
    age: 22,
    city_cn: "上海",
    city_en: "Shanghai",
    country_en: "China",
    role: "AI Skill 与 Multi-Agent 协作框架开发者",
    role_en: "AI Skill & Multi-Agent Collaboration Framework Developer",
    school_cn: "上海对外经贸大学",
    school_en: "SUIBE",
    graduation_year: 2026,
    veteran: true,
    veteran_branch_cn: "武警",
    veteran_period: "2022—2024",
    email: "Tengmeiming@163.com",
    phone: "+8618516773139",
    phone_display: "+86 185-1677-3139",
    github_handle: "Evan-miwillbe",
    github_url: "https://github.com/Evan-miwillbe",
    tagline_cn: "I make AI things & tools.",
    tagline_en: "I make AI things & tools.",
    tagline_supplement_cn: "22 岁 · AI Skill 与 Multi-Agent 协作框架开发者 · 飞书 CLI 创作者大赛十佳入选",
    bio_short_cn: "滕美名，22 岁，上海。上海对外经贸大学应届，退役军人。从 2026 年 3 月动手做 AI Skill，两个被字节飞书官方选入「十佳」。",
    bio_origin_cn: "一月开始学 AI，中间多次想放弃。某一刻意识到——这是过去 22 年里第一次能拿得触手的东西，所以抓住了。",
    hero_eyebrow: "Hello · 你好 · A PERSONAL INDEX, 2026",
    marathon_full_pb: "3:35",
    marathon_half_pb: "1:42",
    essay_count: 18,
    essay_total_reads: "6w+",
    feishu_top10_ratio: "2/3",
    activity_stats_cn: "13 DAYS · 77 COMMITS · 47 实验轮次",
    looking_for_cn: "腾讯研究院 / 字节研究院类研究岗 · AI Agent / DevEx PM · AI 创业团队早期员工 · AI 行业研究"
  },

  // 飞书表 contacts —— 主页 "Find me around" 4 行 + hero/contact 区复用
  contacts: [
    {
      id: "c-github",
      type: "github",
      label_cn: "GitHub",
      label_en: "GitHub",
      url: "https://github.com/Evan-miwillbe",
      display: "Evan-miwillbe",
      icon: "i-github",
      cursor_label: "OPEN",
      sort_order: 1
    },
    {
      id: "c-email",
      type: "email",
      label_cn: "Email",
      label_en: "Email",
      url: "mailto:Tengmeiming@163.com",
      display: "Tengmeiming@163.com",
      icon: "i-mail",
      cursor_label: "SEND",
      sort_order: 2
    },
    {
      id: "c-phone",
      type: "phone",
      label_cn: "Phone",
      label_en: "Phone",
      url: "tel:+8618516773139",
      display: "+86 185-1677-3139",
      icon: "i-phone",
      cursor_label: "CALL",
      sort_order: 3
    },
    {
      id: "c-location",
      type: "location",
      label_cn: "Location",
      label_en: "Location",
      url: null,
      display: "Shanghai, China",
      icon: "i-pin",
      cursor_label: null,
      sort_order: 4
    }
  ],

  // 飞书表 projects —— 5 个 project rows
  projects: [
    {
      id: "p-multi-agent-research",
      slug: "multi-agent-research",
      name_en: "Multi-Agent Research",
      name_cn: "Multi-Agent Research",
      year: "2026.04 — 05",
      tagline: "13 天 · v1 → v9.0",
      activity_meta: "77 commits · 47 轮实验",
      description_short: "独立设计的多 Agent 研究框架。17 个钩子全部通过消融实验验证。实证 Lost in Middle 效应——关键约束放 prompt 中间合规率 0%，放首尾 100%。",
      description_full: null,
      tags: ["RESEARCH", "CLAUDE CODE", "MULTI-AGENT"],
      tech_stack: [],
      url_detail: "projects/multi-agent-research.html",
      url_github: null,
      featured_award: null,
      cost: null,
      stars: null,
      featured: true,
      stamp_char: "研",
      role_in_loop: "i · 理论",
      loop_meta: "47 轮实验 · 12 篇论文",
      sort_order: 1
    },
    {
      id: "p-knowledge-healer",
      slug: "knowledge-healer",
      name_en: "knowledge-healer",
      name_cn: "飞书知识库自愈巡检",
      year: "2026.05",
      tagline: "飞书知识库自愈巡检",
      activity_meta: null,
      description_short: "3+2 多 Agent 并行架构，7 维健康诊断。关键创新：跨源交叉验证（文档 vs 群聊）检测知识漂移——文档没改，但群里有人说\"现在不这么做了\"。",
      description_full: null,
      tags: ["★ 飞书十佳", "FEISHU CLI", "MIT"],
      tech_stack: [],
      url_detail: "projects/knowledge-healer.html",
      url_github: null,
      featured_award: "飞书十佳",
      cost: null,
      stars: null,
      featured: true,
      stamp_char: "★",
      role_in_loop: "ii · 工程",
      loop_meta: "3+2 Agent · 7 维诊断",
      sort_order: 2
    },
    {
      id: "p-lark-survey-scoreboard",
      slug: "lark-survey-scoreboard",
      name_en: "lark-survey-scoreboard",
      name_cn: "飞书实时评分大屏",
      year: "2026.04",
      tagline: "飞书实时评分大屏",
      activity_meta: null,
      description_short: "培训结束，对着飞书妙记说一句话，AI 替你想题目。手机评分，大屏 1 秒刷新，数据存自己的飞书 Base。总成本 ¥0。来自美动医疗实习的真实需求。",
      description_full: null,
      tags: ["★ 飞书十佳", "ECHARTS", "FROM INTERNSHIP"],
      tech_stack: ["ECharts", "飞书 Base"],
      url_detail: "projects/lark-survey-scoreboard.html",
      url_github: null,
      featured_award: "飞书十佳",
      cost: "¥0",
      stars: null,
      featured: true,
      stamp_char: "★",
      role_in_loop: null,
      loop_meta: null,
      sort_order: 3
    },
    {
      id: "p-obsidian-lifeos",
      slug: "obsidian-lifeos",
      name_en: "Obsidian LifeOS",
      name_cn: "个人知识管理系统",
      year: "2026.03 — 至今",
      tagline: "个人知识管理系统",
      activity_meta: "近 2 万字沉淀",
      description_short: "日 / 周 / 月三层任务视图 + 知识库面板。基于 Claude Code Superpowers。配套韩国开发者开源终端插件二次开发——Tab 多页 + 上下分屏 + 一键复制路径。",
      description_full: null,
      tags: ["OBSIDIAN", "PERSONAL", "DATAVIEW"],
      tech_stack: ["Obsidian", "Dataview", "Claude Code Superpowers"],
      url_detail: "projects/obsidian-lifeos.html",
      url_github: null,
      featured_award: null,
      cost: null,
      stars: null,
      featured: true,
      stamp_char: "私",
      role_in_loop: null,
      loop_meta: null,
      sort_order: 4
    },
    {
      id: "p-bitable-orchestrator",
      slug: "bitable-orchestrator",
      name_en: "bitable-orchestrator",
      name_cn: "飞书多维表格批量编排",
      year: "2026.05",
      tagline: "飞书多维表格批量编排",
      activity_meta: "3 投 2 中的\"那一个\"",
      description_short: "同次大赛野心最大的投稿——5 阶段安全管线 + Dry-Run 预演 + 原子回滚 + 依赖图拓扑排序。诚实交代：未入选。评审更倾向轻量普适，这个定位偏 ToB 重，但工程密度自留底气。",
      description_full: null,
      tags: ["同次大赛投稿", "TOB ENTERPRISE", "未入选"],
      tech_stack: [],
      url_detail: "projects/bitable-orchestrator.html",
      url_github: null,
      featured_award: null,
      award_status: "未入选",
      cost: null,
      stars: null,
      featured: true,
      stamp_char: "实",
      role_in_loop: null,
      loop_meta: null,
      sort_order: 5
    }
  ],

  // 飞书表 experiences —— Timeline section 6 条
  experiences: [
    {
      id: "e-meidong",
      date_range: "2026 · 01—04",
      org_cn: "上海美动医疗器材贸易有限公司",
      org_en: null,
      role_en: "HR Intern · Training",
      role_cn: null,
      summary: "识别跨表汇总痛点 → AI 协作生成 VBA 多表自动化；操作北森 HR 系统；负责\"领航计划\"销售带教数据运营。",
      note: "业务直接孵化项目：培训结束领导问\"能不能做个实时反馈问卷\"——这个真实需求三周后变成了 lark-survey-scoreboard，最终入选飞书 CLI 十佳。",
      related_project_ids: ["p-lark-survey-scoreboard"],
      side_tag: "医疗",
      type: "internship",
      sort_order: 1
    },
    {
      id: "e-tfsc",
      date_range: "2025 · 07—09",
      org_cn: "天风证券行业研究所",
      org_en: null,
      role_en: "Strategy Research Intern",
      role_cn: null,
      summary: "半导体材料行业深度研究，独立产出 40 页+ 行业报告；产出 8 篇 REITs 周报；将周报流程 SOP 化为飞书模板供团队复用。",
      note: null,
      related_project_ids: [],
      side_tag: "证券",
      type: "internship",
      sort_order: 2
    },
    {
      id: "e-pap",
      date_range: "2022 · 09 — 2024 · 09",
      org_cn: "武警湖南总队长沙支队",
      org_en: null,
      role_en: "Service · Clerk",
      role_cn: null,
      summary: "个人嘉奖一次。三公里考核连队第一，支队级比武三公里第二。代理文书期间处理基层表格 90+ 份——最早的 SOP 思维训练。",
      note: null,
      related_project_ids: [],
      side_tag: "武警",
      type: "military",
      sort_order: 3
    },
    {
      id: "e-defense-club",
      date_range: "2024 · 09 — 2025 · 09",
      org_cn: "国防军事协会",
      org_en: null,
      role_en: "Publicity Lead",
      role_cn: null,
      summary: "参与两次线下大型活动方案；牵头\"樱花节个人形象照\"拍摄活动，协调 50+ 社员。",
      note: null,
      related_project_ids: [],
      side_tag: "学社",
      type: "campus",
      sort_order: 4
    },
    {
      id: "e-seagull",
      date_range: "2021 · 10 — 至今",
      org_cn: "校党委宣传部 · 海鸥通讯社",
      org_en: null,
      role_en: "Editor · Writer",
      role_cn: null,
      summary: "采访校园大师剧《汪尧田》成稿获上海市校报好新闻通讯类一等奖；署名稿件 14 篇，总阅读量 6w+。",
      note: null,
      related_project_ids: [],
      side_tag: "校报",
      type: "campus",
      sort_order: 5
    },
    {
      id: "e-pku-fieldwork",
      date_range: "2022 · 07—08",
      org_cn: "北京大学田野经济学暑期实践",
      org_en: null,
      role_en: "Core Member · Fieldwork",
      role_cn: null,
      summary: "电访上海青浦区 30+ 中小微企业，完成 26 份有效问卷，报告被上海市发改委采纳。",
      note: null,
      related_project_ids: [],
      side_tag: "田野",
      type: "fieldwork",
      sort_order: 6
    }
  ],

  // 飞书表 awards
  awards: [
    {
      id: "a-feishu-top10",
      name: "飞书 CLI 创作者大赛「十佳优秀 Skill」",
      date: "2026-05-13",
      issuer: "字节跳动 larksuite",
      issuer_track: "GitHub 赛道",
      url: "https://bytedance.larkoffice.com/wiki/K6wZw4IYQiJGvmkSrZ8cD5ZznHd",
      url_label: "官方公示",
      description: "knowledge-healer 与 lark-survey-scoreboard 入选，将收录至官方开源库附作者署名。",
      related_project_ids: ["p-knowledge-healer", "p-lark-survey-scoreboard"],
      image: "images/github/feishu-cli-top10.png",
      image_caption: "飞书 CLI 创作者大赛十佳公示页 — 含 knowledge-healer 与 lark-survey-scoreboard",
      ratio_display: "2/3",
      type: "competition",
      sort_order: 1
    },
    {
      id: "a-shanghai-campus-news",
      name: "上海市校报好新闻通讯类一等奖",
      date: null,
      issuer: "上海市",
      issuer_track: null,
      url: null,
      url_label: null,
      description: "采访校园大师剧《汪尧田》成稿获奖。",
      related_project_ids: [],
      image: null,
      image_caption: null,
      ratio_display: null,
      type: "journalism",
      sort_order: 2
    },
    {
      id: "a-pap-merit",
      name: "个人嘉奖一次",
      date: null,
      issuer: "武警湖南总队长沙支队",
      issuer_track: null,
      url: null,
      url_label: null,
      description: "服役期间获得个人嘉奖；三公里考核连队第一，支队级比武三公里第二。",
      related_project_ids: [],
      image: null,
      image_caption: null,
      ratio_display: null,
      type: "military",
      sort_order: 3
    }
  ],

  // 飞书表 skills —— Toolkit chip groups (5 个 tool-group)
  skills: [
    {
      id: "s-ai-collab",
      group_num: "i.",
      category_cn: "AI 协作",
      category_en: "AI Collaboration",
      items: [
        "Claude Code",
        "Codex",
        "Cursor",
        "Skill 编排",
        "Multi-Agent",
        "Prompt 工程",
        "MCP",
        "Vibe Coding"
      ],
      sort_order: 1
    },
    {
      id: "s-skill-ecosystem",
      group_num: "ii.",
      category_cn: "Skill 生态",
      category_en: "Skill Ecosystem",
      items: [
        "multi-agent-research",
        "multi-coder",
        "knowledge-healer ★",
        "lark-survey-scoreboard ★",
        "bitable-orchestrator",
        "auto-new",
        "academic-research",
        "pdf-to-md",
        "dream / insights",
        "start-my-day",
        "大V思维框架蒸馏",
        "金龟宠物"
      ],
      sort_order: 2
    },
    {
      id: "s-data-automation",
      group_num: "iii.",
      category_cn: "数据 / 自动化",
      category_en: "Data / Automation",
      items: [
        "Excel (XLOOKUP / FILTER)",
        "VBA",
        "SQL 基础",
        "Python 基础",
        "iFind"
      ],
      sort_order: 3
    },
    {
      id: "s-writing-knowledge",
      group_num: "iv.",
      category_cn: "写作 / 知识",
      category_en: "Writing / Knowledge",
      items: [
        "Obsidian",
        "飞书 Docs / Base / Wiki",
        "Markdown",
        "Notion"
      ],
      sort_order: 4
    },
    {
      id: "s-build-visual",
      group_num: "v.",
      category_cn: "建站 / 视觉",
      category_en: "Build / Visual",
      items: [
        "HTML / CSS",
        "Three.js（学习中）",
        "PowerPoint",
        "秀米"
      ],
      sort_order: 5
    }
  ],

  // 主页底部 "Off-screen" 两块（屏幕之外）
  off_screen: [
    {
      id: "off-run",
      greek_marker: "α",
      label_cn: "RUN · 跑步",
      title_cn: "有氧是脑子转得最快的时刻",
      body_cn: "退伍以后保持的习惯——和 AI 项目的\"慢工\"节奏其实是一样的，都得日复一日地累积。",
      stats: [
        { num: "3:35", label_en: "Full Marathon PB" },
        { num: "1:42", label_en: "Half Marathon PB" }
      ],
      sort_order: 1
    },
    {
      id: "off-write",
      greek_marker: "β",
      label_cn: "WRITE · 写作",
      title_cn: "反复推敲，常用\"其实\"和\"我想\"",
      body_cn: "18 篇随笔。校报市级一等奖。AI 让我更能写了——不是替我写，是帮我把模糊的想法摊开看。",
      stats: [
        { num: "18", label_en: "Personal Essays" },
        { num: "6w+", label_en: "Campus Reads" }
      ],
      sort_order: 2
    }
  ],

  // 方法论闭环（Interlude） —— 四个节点串成一个 loop
  methodology_loop: {
    title_cn: "四个项目，其实是一个闭环",
    nodes: [
      { step: "i · 理论", name: "Multi-Agent Research", meta: "47 轮实验 · 12 篇论文", related_project_id: "p-multi-agent-research" },
      { step: "ii · 工程", name: "knowledge-healer", meta: "3+2 Agent · 7 维诊断", related_project_id: "p-knowledge-healer" },
      { step: "iii · 认证", name: "飞书 十佳", meta: "收录官方开源库", related_project_id: null },
      { step: "iv · 迁移", name: "multi-coder", meta: "同套方法论 · 跨到编程", related_project_id: null }
    ],
    quote_cn: "在 47 轮实验里沉淀的协作机制——三问筛选、首尾约束、停滞梯度——原本是给研究用的，结果发现 12 个机制跨领域成立。这就是为什么有了 multi-coder。"
  },

  // Hero meta pills （主页 hero 4 个圆角胶囊）
  hero_pills: [
    { id: "pill-feishu", style: "accent", icon: "i-star-fill", text: "飞书 CLI 十佳 · 2/3" },
    { id: "pill-pap", style: "sage", icon: "i-shield", text: "武警 · 2022—2024" },
    { id: "pill-marathon", style: "sage", icon: "i-run", text: "全马 PB 3:35" },
    { id: "pill-essays", style: "default", icon: "i-pen", text: "18 篇随笔" }
  ],

  // Marquee 跑马灯文案
  marquee_items: [
    "FEISHU CLI TOP 10",
    "knowledge-healer",
    "lark-survey-scoreboard",
    "Multi-Agent Research",
    "13 DAYS · 77 COMMITS",
    "47 实验轮次"
  ],

  // 导航 / 页面切换
  navigation: {
    top_nav: [
      { label: "WORK", href: "#projects" },
      { label: "TIMELINE", href: "#timeline" },
      { label: "STACK", href: "#toolkit" },
      { label: "CONTACT", href: "#contact" }
    ],
    versions: [
      { label: "编辑版", href: "index.html" },
      { label: "3D 探索", href: "play.html" }
    ]
  }

};
