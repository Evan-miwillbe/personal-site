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
    bio_origin_cn: "2026 年 1 月，我从 Waytoagi 社区开始学 AI。很多概念在过去的经历里找不到对应物，我中间几次想放弃，但还是想把这件喜欢的事继续做下去。",
    hero_eyebrow: "Hello · 你好 · A PERSONAL INDEX, 2026",
    marathon_full_pb: "3:35",
    marathon_half_pb: "1:42",
    essay_count: 18,
    essay_total_reads: "6w+",
    feishu_top10_ratio: "2/3",
    activity_stats_cn: "13 DAYS · 77 COMMITS · 47 实验轮次",
    looking_for_cn: "偏研究方向 · 大厂研究院 / 研究助理 · AI Agent 工程师 · AI 产品 · AI 创业团队早期员工"
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
      year: "2026.04 —",
      tagline: "多 Agent 深度研究框架",
      activity_meta: "深度调研报告 · 多角色协作",
      description_short: "输入调研主题，约 25 分钟后得到一份有数据、有来源、经过交叉验证的报告。工作流把分工调研、独立质检和综合成稿拆给不同 Agent，已用于跨境电商选品、行业与竞品调研、产品开发等场景。",
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
      loop_meta: "深度调研 · 独立质检",
      pricetag: "课题输入 → 可信报告输出的一套多 Agent 工作流。",
      pricetag_link: { keyword: "阶段性结项方式", url: "notes.html" },
      sort_order: 1
    },
    {
      id: "p-auto-new",
      slug: "auto-new",
      name_en: "auto-new",
      name_cn: "自迭代框架",
      year: "2026.05",
      tagline: "Skill / 脚本 / prompt 自迭代引擎",
      activity_meta: "v3.9 · 自迭代范式",
      description_short: "先定义验收标准，再让 AI 按“修改→实验→评估→保留或回滚”的顺序迭代 skill、脚本或 prompt。循环可以离场运行，直到达到量化目标；原本需要持续盯着调试的工作，可以改成批量验收。",
      description_full: null,
      tags: ["META-FRAMEWORK", "SKILL FACTORY", "SELF-EVOLUTION"],
      tech_stack: ["Claude Code", "Skill Engineering"],
      url_detail: "projects/auto-new.html",
      url_github: "https://github.com/Evan-miwillbe",
      featured_award: null,
      cost: null,
      stars: null,
      featured: true,
      stamp_char: "元",
      role_in_loop: "meta · 元层",
      loop_meta: "自迭代范式 · v3.9",
      pricetag: "让 AI 系统的优化过程可以离场运行，再由人统一验收。",
      sort_order: 2
    },
    {
      id: "p-personal-context-system",
      slug: "personal-context-system",
      name_en: "Personal Context System",
      name_cn: "个人 Context 系统",
      year: "2026.03 — 2026.06",
      tagline: "可维护个人 Context 系统",
      activity_meta: "Human-in-the-loop",
      description_short: "把个人经历、偏好和目标整理成可维护的 context。信息量太大时，AI 先按方向和画像做初筛，人再做最终判断。目前这套流程用于求职岗位筛选，也能迁移到其他信息密集的决策任务。",
      description_full: null,
      tags: ["CONTEXT", "MEMORY", "AI WORKFLOW"],
      tech_stack: ["Claude Code", "Personal Context"],
      url_detail: "projects/obsidian-lifeos-3d-preview.html",
      url_github: null,
      featured_award: null,
      cost: null,
      stars: null,
      featured: true,
      stamp_char: "人",
      role_in_loop: "iii · 个体化",
      loop_meta: "画像库 · 预判断",
      pricetag: "把个性化判断前置为可复用的 context 资产。",
      sort_order: 3
    },
    {
      id: "p-knowledge-healer",
      slug: "knowledge-healer",
      name_en: "knowledge-healer",
      name_cn: "飞书知识库自愈巡检",
      year: "2026.05",
      tagline: "飞书知识库自愈巡检",
      activity_meta: null,
      description_short: "用多 Agent 检查持续增长的团队知识库。系统会对照正式文档和群聊记录，找出过期、冲突、缺失或归属错误的内容，再把问题整理成可以直接处理的修复任务。",
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
      role_in_loop: "iv · 工程",
      loop_meta: "多 Agent · 知识维护",
      pricetag: "把 Multi-Agent 方法论用到一个真实团队知识库场景。",
      sort_order: 4
    },
    {
      id: "p-lark-survey-scoreboard",
      slug: "lark-survey-scoreboard",
      name_en: "lark-survey-scoreboard",
      name_cn: "飞书实时评分大屏",
      year: "2026.04",
      tagline: "飞书实时评分大屏",
      activity_meta: null,
      description_short: "一套基于飞书 Base 的实时评分流程，包含问卷生成、数据存储、维度统计、手机评分页和大屏展示。团队可以用接近零成本的方式搭建培训、年会、评审或投票现场。",
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
      role_in_loop: "v · 应用",
      loop_meta: "实时评分 · ¥0 成本",
      pricetag: "从美动 HR 实习的真实需求里长出来的工具。",
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
      note: "培训结束后，领导问我“能不能做个实时反馈问卷”。三周后，这个需求变成了 lark-survey-scoreboard，并入选飞书 CLI 十佳。",
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
      summary: "个人嘉奖一次。三公里考核连队第一，支队级比武三公里第二。代理文书期间处理基层表格 90+ 份，这是我最早的 SOP 训练。",
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

  // 飞书表 skills —— Toolkit chip groups (4 个 tool-group，Skill 生态已拆为独立 § Skill Garden)
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
      id: "s-data-automation",
      group_num: "ii.",
      category_cn: "数据 / 自动化",
      category_en: "Data / Automation",
      items: [
        "Excel (XLOOKUP / FILTER)",
        "VBA",
        "SQL 基础",
        "Python 基础",
        "iFind"
      ],
      sort_order: 2
    },
    {
      id: "s-writing-knowledge",
      group_num: "iii.",
      category_cn: "写作 / 知识",
      category_en: "Writing / Knowledge",
      items: [
        "Obsidian",
        "飞书 Docs / Base / Wiki",
        "Markdown",
        "Notion"
      ],
      sort_order: 3
    },
    {
      id: "s-build-visual",
      group_num: "iv.",
      category_cn: "建站 / 视觉",
      category_en: "Build / Visual",
      items: [
        "HTML / CSS",
        "Three.js（学习中）",
        "PowerPoint",
        "秀米"
      ],
      sort_order: 4
    }
  ],

  // § Skill Garden —— 12 个独立 Skill 卡片（从 Stack 拆出来）
  skill_garden: [
    { id: "sg-multi-agent", num: "01", name: "multi-agent-research", desc: "多 Agent 研究框架。47 轮控制实验 + 16 轮消融。", tags: ["主推", "Case Study"], featured: true, url: "projects/multi-agent-research.html" },
    { id: "sg-auto-new", num: "02", name: "auto-new", desc: "从 31 轮实验中整理出的 Skill 自迭代引擎。", tags: ["NEW v3.5", "Case Study"], featured: true, url: "projects/auto-new.html" },
    { id: "sg-knowledge-healer", num: "03", name: "knowledge-healer", star: true, desc: "飞书知识库 7 维健康诊断 + 跨源验证。", tags: ["★ 飞书十佳", "larksuite 官方"], featured: true, url: "projects/knowledge-healer.html" },
    { id: "sg-lark-survey", num: "04", name: "lark-survey-scoreboard", star: true, desc: "飞书培训反馈实时大屏。1 秒刷新，¥0 成本。", tags: ["★ 飞书十佳", "larksuite 官方"], featured: true, url: "projects/lark-survey-scoreboard.html" },
    { id: "sg-multi-coder", num: "05", name: "multi-coder", desc: "Multi-Agent 方法论跨领域迁移到编程。", tags: ["方法论复用", "664 行"], featured: false, url: null },
    { id: "sg-academic", num: "06", name: "academic-research", desc: "学术研究多 Agent 框架。PDF 解析 + 文献引用。", tags: ["Skill 生态", "配合 multi-agent"], featured: false, url: null },
    { id: "sg-pdf2md", num: "07", name: "pdf-to-md", desc: "PDF 转 Markdown（MinerU API，3 worker 并发）。", tags: ["工程工具", "11x 加速"], featured: false, url: null },
    { id: "sg-dream", num: "08", name: "dream / insights", desc: "基于 Claude Code 源码机制的经验沉淀系统。", tags: ["元工具", "持续迭代"], featured: false, url: null },
    { id: "sg-start-day", num: "09", name: "start-my-day", desc: "每日回顾昨日，再整理今天的计划。", tags: ["个人工具", "日常使用"], featured: false, url: null },
    { id: "sg-dav", num: "10", name: "大V思维框架蒸馏", desc: "把常读公众号大V的文章蒸馏成思维框架 Skill。", tags: ["内容工具", "审美外包"], featured: false, url: null },
    { id: "sg-pet", num: "11", name: "金龟宠物", desc: "Claude Code 宠物 Skill。第一个自研 Skill。", tags: ["2026.04 首作", "致敬卡兹克"], featured: false, url: null }
  ],

  // § What's Next —— 2026 下半年要做的（4 个方向）
  whats_next: [
    { id: "wn-video", marker: "α", title_cn: "开一个视频分享账号，把过程讲出来", body_cn: "过去 3 个月的工作大多留在 README 和 commit 里。下一步想用视频复盘：我怎么和 AI 协作做 Skill，以及 47 轮实验具体改掉了什么。" },
    { id: "wn-iterate", marker: "β", title_cn: "让现有 Skill 继续迭代", body_cn: "v9.0 只是一次阶段性收敛。以后在阅读、看视频和真实使用中发现新问题，就把它们带回实验，再决定是否更新 Skill。" },
    { id: "wn-real", marker: "γ", title_cn: "继续从真实业务里做 Skill", body_cn: "lark-survey-scoreboard 来自美动 HR 实习中的实际需求。接下来还想继续找有具体用户、能拿到反馈的问题，而不是为了展示技术再造一个工具。" },
    { id: "wn-input", marker: "δ", title_cn: "继续补 AI 的输入端", body_cn: "AI 更容易处理 Markdown，面对 PDF、复杂图文和跨领域文献时仍会丢信息。/mineru-pdf 解决了格式转换，但“转成 MD”和“真正读懂”是两件事。我还在尝试用知识库和辅助搜索补足这部分。", source_url: "https://www.bilibili.com/video/BV13BdfBoELd/", source_label: "张小珺对话 Axiom 洪乐潼" }
  ],

  // § 三件我比较在意的事 —— Contact 段
  why_me: [
    { id: "wm-rigor", num: "①", title_cn: "把每一个机制都放到实验里验证", body_cn: "和 Claude Code 协作做了 47 轮控制实验 + 16 轮消融测试。Lost in Middle 关键约束放中间合规率 0% / 放首尾 100%、机制有效 ≠ 必要——这些结论都来自实验本身，不是凭感觉。这是我目前最在意的部分，也是我想继续做研究类工作的原因。" },
    { id: "wm-meta", num: "②", title_cn: "把方法论工程化为元工具的尝试", body_cn: "做 Multi-Agent 时发现每轮迭代都在用同一套循环——「读经验→诊断瓶颈→选变量→实验→评估→沉淀」。把这套循环工程化成 auto-new，回过头驱动 Multi-Agent 自己的 31 轮迭代。把'提炼方法论'本身工程化是我现在的一个长期方向。" },
    { id: "wm-loop", num: "③", title_cn: "从真实业务需求长出工具", body_cn: "美动 HR 实习识别培训反馈痛点 → 三周开发 → lark-survey-scoreboard → 入选飞书十佳 → larksuite 官方开源库。一个从真实需求长出来的工具——我尝试理解产品的过程。自己做的产品和大厂一线 PM 做的事不一样，这是我承认的。" }
  ],

  // 主页底部 "Off-screen" 两块（屏幕之外）
  off_screen: [
    {
      id: "off-run",
      greek_marker: "α",
      label_cn: "RUN · 跑步",
      title_cn: "有氧是脑子转得最快的时刻",
      body_cn: "跑步时我给自己留下一点思考时间，让我应对赶路的慌张。",
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
      title_cn: "在没有 AI 的时刻，用文字思考",
      body_cn: "在关闭电脑的时候，想用文字记录下每一次体验的'慢节奏'。",
      award_badge_cn: "🏆 上海市校报好新闻通讯类一等奖（市级）— 大师剧《汪尧田》通讯稿",
      stats: [
        { num: "18", label_en: "Personal Essays" },
        { num: "6w+", label_en: "Campus Reads" }
      ],
      sort_order: 2
    }
  ],

  // 方法论闭环（Interlude） —— 五个节点串成一个 loop（含 meta 元层）
  methodology_loop: {
    title_cn: "看上去是 5 个项目。其实是一套方法论在不同场景的复用。",
    nodes: [
      { step: "i · 理论", name: "Multi-Agent Research", meta: "47 轮实验 · 12 篇论文", related_project_id: "p-multi-agent-research" },
      { step: "meta · 元层", name: "auto-new", meta: "31 轮自驱动 · 迭代引擎", related_project_id: "p-auto-new" },
      { step: "ii · 工程", name: "knowledge-healer", meta: "3+2 Agent · 7 维诊断", related_project_id: "p-knowledge-healer" },
      { step: "iii · 认证", name: "飞书 十佳", meta: "收录官方开源库", related_project_id: null },
      { step: "iv · 迁移", name: "multi-coder", meta: "同套方法论 · 跨到编程", related_project_id: null }
    ],
    quote_cn: "在 47 轮实验里沉淀的协作机制——三问筛选、首尾约束、停滞梯度——原本是给研究用的，结果发现 12 个机制跨领域成立。这就是为什么有了 multi-coder。"
  },

  // Hero meta pills （主页 hero 5 个圆角胶囊）
  hero_pills: [
    { id: "pill-feishu", style: "accent", icon: "i-star-fill", text: "飞书十佳 · 2/3" },
    { id: "pill-experiments", style: "accent", icon: "i-pen", text: "47 轮控制实验" },
    { id: "pill-pap", style: "sage", icon: "i-shield", text: "退役军人 · 2022—24" },
    { id: "pill-skills", style: "sage", icon: "i-pen", text: "12+ 自研 Skill" },
    { id: "pill-marathon", style: "default", icon: "i-run", text: "全马 PB 3:35" }
  ],

  // Marquee 跑马灯文案
  marquee_items: [
    "LOST IN MIDDLE 0% vs 100%",
    "17 机制 · 16 轮消融",
    "AGENT SWARM × 216",
    "CONTEXT COMPRESSION 893→221",
    "META-ITERATION FRAMEWORK",
    "元工具迭代母工具"
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
