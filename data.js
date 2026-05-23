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
    bio_origin_cn: "从 2026 年 1 月开始学 AI，感谢 Waytoagi 社区。跨过了很多困难，中间多次想过放弃，但知道这是喜欢的事情，所以，还在加油。",
    hero_eyebrow: "Hello · 你好 · A PERSONAL INDEX, 2026",
    marathon_full_pb: "3:35",
    marathon_half_pb: "1:42",
    essay_count: 18,
    essay_total_reads: "6w+",
    feishu_top10_ratio: "2/3",
    activity_stats_cn: "13 DAYS · 77 COMMITS · 47 实验轮次",
    looking_for_cn: "大厂研究院类研究岗 · AI Agent / DevEx PM · AI 创业团队早期员工 · AI 行业研究"
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

  // 飞书表 projects —— 6 个 project rows
  projects: [
    {
      id: "p-multi-agent-research",
      slug: "multi-agent-research",
      name_en: "Multi-Agent Research",
      name_cn: "Multi-Agent Research",
      year: "2026.04 — 05",
      tagline: "13 天 · v1 → v9.0",
      activity_meta: "77 commits · 47 轮实验",
      description_short: "独立完成 v1→v9 七轮架构重构 + 47 轮控制实验（31 验证 + 16 消融）。实证 Lost in Middle 效应：关键约束放 prompt 中间合规率 0%、放首尾 100%。框架累计调用 65 次 / 跨度 28 天，单次会话最大并行 spawn 216 个 sub-agent。",
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
      pricetag: "大厂研究院级别的实验严谨度，本科生独立完成。",
      sort_order: 1
    },
    {
      id: "p-auto-new",
      slug: "auto-new",
      name_en: "auto-new",
      name_cn: "自迭代框架",
      year: "2026.05",
      tagline: "Skill 自迭代引擎——元工具迭代它的母工具",
      activity_meta: "v3.5 · 4 范式 + 16 铁律 · Multi-Agent 31 轮自驱动",
      description_short: "从 Multi-Agent Research 31 轮迭代中抽离出「读经验→诊断瓶颈→选变量→实验→评估→沉淀」通用循环，工程化为独立 Skill。4 种实验范式 + 16 条工程铁律。Multi-Agent v6.4→v9.0 全 31 轮由 auto-new 驱动——元工具迭代它的母工具，形成「应用层→元层→反哺应用层」闭环。",
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
      loop_meta: "31 轮自驱动 · 迭代引擎",
      pricetag: "把'提炼方法论'本身工程化为元工具——Anthropic 研究员的工作模式。",
      sort_order: 2
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
      pricetag: "Multi-Agent 方法论的第一个工业级落地——证明'多 Agent 框架不是 Demo'。",
      sort_order: 3
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
      pricetag: "业务一线 → AI 工具落地的完整闭环——AI 产品经理岗最稀缺的能力。",
      sort_order: 4
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
      pricetag: "2 个月 85 会话长程使用的真实证据，不是 Demo。",
      sort_order: 5
    },
    {
      id: "p-bitable-orchestrator",
      slug: "bitable-orchestrator",
      name_en: "bitable-orchestrator",
      name_cn: "飞书多维表格批量编排",
      year: "2026.05",
      tagline: "飞书多维表格批量编排",
      activity_meta: "3 投 2 中的\"那一个\"",
      description_short: "飞书CLI大赛（投稿），关注飞书多维表格——5 阶段安全管线 + Dry-Run 预演 + 原子回滚 + 依赖图拓扑排序。参赛情况：未入选。评审更倾向轻量普适，这个定位偏 ToB 重，但工程密度自留底气。",
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
      pricetag: "未入选，但完整——展示'评审看不到但工程必要'的系统设计能力。",
      sort_order: 6
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
    { id: "sg-auto-new", num: "02", name: "auto-new", desc: "Skill 自迭代引擎。元工具迭代它的母工具。", tags: ["NEW v3.5", "Case Study"], featured: true, url: "projects/auto-new.html" },
    { id: "sg-knowledge-healer", num: "03", name: "knowledge-healer", star: true, desc: "飞书知识库 7 维健康诊断 + 跨源验证。", tags: ["★ 飞书十佳", "larksuite 官方"], featured: true, url: "projects/knowledge-healer.html" },
    { id: "sg-lark-survey", num: "04", name: "lark-survey-scoreboard", star: true, desc: "飞书培训反馈实时大屏。1 秒刷新，¥0 成本。", tags: ["★ 飞书十佳", "larksuite 官方"], featured: true, url: "projects/lark-survey-scoreboard.html" },
    { id: "sg-bitable", num: "05", name: "bitable-orchestrator", desc: "飞书多维表批量编排，5 阶段安全管线。", tags: ["飞书 CLI 投稿", "ToB"], featured: false, url: "projects/bitable-orchestrator.html" },
    { id: "sg-multi-coder", num: "06", name: "multi-coder", desc: "Multi-Agent 方法论跨领域迁移到编程。", tags: ["方法论复用", "664 行"], featured: false, url: null },
    { id: "sg-academic", num: "07", name: "academic-research", desc: "学术研究多 Agent 框架。PDF 解析 + 文献引用。", tags: ["Skill 生态", "配合 multi-agent"], featured: false, url: null },
    { id: "sg-pdf2md", num: "08", name: "pdf-to-md", desc: "PDF 转 Markdown（MinerU API，3 worker 并发）。", tags: ["工程工具", "11x 加速"], featured: false, url: null },
    { id: "sg-dream", num: "09", name: "dream / insights", desc: "基于 Claude Code 源码机制的经验沉淀系统。", tags: ["元工具", "持续迭代"], featured: false, url: null },
    { id: "sg-start-day", num: "10", name: "start-my-day", desc: "每日工作流自动化——回顾昨日 + 规划今日。", tags: ["个人工具", "日常使用"], featured: false, url: null },
    { id: "sg-dav", num: "11", name: "大V思维框架蒸馏", desc: "把常读公众号大V的文章蒸馏成思维框架 Skill。", tags: ["内容工具", "审美外包"], featured: false, url: null },
    { id: "sg-pet", num: "12", name: "金龟宠物", desc: "Claude Code 宠物 Skill。第一个自研 Skill。", tags: ["2026.04 首作", "致敬卡兹克"], featured: false, url: null }
  ],

  // § What's Next —— 2026 下半年要做的（4 个方向）
  whats_next: [
    { id: "wn-video", marker: "α", title_cn: "开一个视频分享账号，把过程讲出来", body_cn: "过去 4 个月做的东西大部分留在了 README 和 commit 里。下一步想把'怎么和 AI 协作做 Skill''47 轮实验里学到的东西'用视频讲清楚——不是教程，是过程的复盘。文字适合沉淀，视频适合传染。" },
    { id: "wn-iterate", marker: "β", title_cn: "让现有 Skill 进入持续迭代状态", body_cn: "v9.0 是阶段性收敛，不是终点。日常阅读 / 看视频 / 学习里冒出来的新想法和见解，都应该有路径反哺到 Skill 里——让工具跟着我的认知一起长，而不是停在某一版冻起来。" },
    { id: "wn-real", marker: "γ", title_cn: "做立足真实业务的 Skill", body_cn: "lark-survey-scoreboard 是个起点——它从美动 HR 实习的真实痛点长出来，而不是为了'做个 Skill 而做'。下一步继续找真实问题、真实需求、有真实用户的场景，用过往项目经验直接落地，不为技术炫技。" },
    { id: "wn-input", marker: "δ", title_cn: "突破 AI 的输入端壁垒", body_cn: "AI 产出端工具已成熟，但输入端还是壁垒：AI 亲近 Markdown，对 PDF / 复杂图文 / 跨领域文献的理解远没到位。/mineru-pdf 解决了一部分（MinerU API 比 OCR 截图更结构化），但只是把 PDF 转 MD，不等于让 AI 读懂。更大的问题是预训练知识不够：某个小众领域 / 新兴学科 / 内部文档预训练里都没有。怎么通过工具 / 主动建知识库 / 辅助搜索，让 AI 真正读懂跨领域内容？方法还在摸索。", source_url: "https://www.bilibili.com/video/BV13BdfBoELd/", source_label: "张小珺对话 Axiom 洪乐潼" }
  ],

  // § Why me —— Contact 段三条"为什么是我"statement
  why_me: [
    { id: "wm-loop", num: "①", title_cn: "从业务一线到 AI 工具落地的完整闭环", body_cn: "美动 HR 实习 → 识别培训反馈痛点 → 三周开发 → lark-survey-scoreboard → 入选飞书十佳 → larksuite 官方开源库。这是 AI 产品经理岗最稀缺的能力。" },
    { id: "wm-rigor", num: "②", title_cn: "47 轮控制实验 + 16 轮消融的研究级实证", body_cn: "不是'做了一堆 Skill'，是用大厂研究院级别的实验严谨度把每一个机制都做过因果验证。Lost in Middle 0% vs 100%、机制有效 ≠ 必要——这些洞察是研究员的母语。" },
    { id: "wm-meta", num: "③", title_cn: "把方法论本身工程化为元工具的元认知能力", body_cn: "多数候选人能做一个项目。少数能从项目里提炼出方法论。我做了第三件事——把'提炼方法论'本身工程化为 auto-new。元工具迭代它的母工具——这是 Anthropic 研究员的工作模式。" }
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
      title_cn: "在没有 AI 的时刻，用文字思考",
      body_cn: "退伍后保持的另一种'慢节奏'。AI 帮我把模糊想法摊开看，文字帮我把它收回去。",
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
    title_cn: "看上去是 6 个项目。其实是一套方法论在不同场景的复用。",
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
