const app = document.querySelector("#app");

const state = {
  view: "conversation",
  frame: 1,
  dataState: "success",
  feedbackOpen: false,
  feedbackSubmitted: false,
  feedbackText: "",
  exportOpen: false,
  exportStatus: "idle",
  installedSkills: ["周度商品复盘"],
  expertScope: "all",
  skillCategory: "全部",
  catalogSearch: "",
  activeConversation: "gmv",
  evidenceOpen: false,
  toast: "",
};

const prototypeParams = new URLSearchParams(window.location.search);
const requestedFrame = Number(prototypeParams.get("frame"));
const requestedState = prototypeParams.get("state");
const requestedView = prototypeParams.get("view");
const requestedConversation = prototypeParams.get("conversation");
if ([1, 2, 3].includes(requestedFrame)) {
  state.frame = requestedFrame;
  state.view = "conversation";
}
if (["experts", "skill-hub", "my-skills", "history"].includes(requestedView)) state.view = requestedView;
if (requestedConversation) state.activeConversation = requestedConversation;
if (["success", "loading", "empty", "error", "offline"].includes(requestedState)) state.dataState = requestedState;

const icons = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  spark: '<path d="m12 3 1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8L12 3Z"/><path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/>',
  chart: '<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"/>',
  puzzle: '<path d="M8 3h3v3a2 2 0 1 0 4 0V3h3a3 3 0 0 1 3 3v3h-3a2 2 0 1 0 0 4h3v5a3 3 0 0 1-3 3h-5v-3a2 2 0 1 0-4 0v3H6a3 3 0 0 1-3-3v-3h3a2 2 0 1 0 0-4H3V6a3 3 0 0 1 3-3h2Z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  paperclip: '<path d="m20.5 11.5-8.8 8.8a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  file: '<path d="M6 2h8l4 4v16H6V2Z"/><path d="M14 2v5h5M9 13h6M9 17h6"/>',
  copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  refresh: '<path d="M20 6v5h-5M4 18v-5h5"/><path d="M18 9a7 7 0 0 0-12-3l-2 2M6 15a7 7 0 0 0 12 3l2-2"/>',
  folder: '<path d="M3 5h6l2 2h10v12H3V5Z"/>',
  shield: '<path d="M12 3 4 6v5c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
};

function icon(name, label = "") {
  return `<svg class="qj-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${label ? `aria-label="${label}" role="img"` : 'aria-hidden="true"'}>${icons[name] || icons.spark}</svg>`;
}

function escapeText(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function sidebar() {
  const isConversation = state.view === "conversation";
  const recentConversations = conversationHistory.slice(0, 3);
  return `
    <aside class="qj-app__sidebar qj-sidebar" aria-label="工作台导航">
      <div class="qj-sidebar__brand">
        <span class="brand-mark">AI</span>
        <span class="brand-copy"><strong>业务 AI 工作台</strong><small>千机 · 业务助手</small></span>
      </div>
      <div class="sidebar-new">
        <button class="qj-button qj-button--primary full-width" type="button" data-action="frame" data-frame="1">
          ${icon("plus")}<span class="qj-button__label">新对话</span>
        </button>
      </div>
      <nav class="qj-sidebar__nav qj-menu">
        <div class="qj-menu__group">
          <div class="menu-heading"><span>专家</span><span>1 已添加</span></div>
          <button class="qj-menu__item ${state.view === "experts" ? "is-active" : ""}" type="button" data-action="expert-center">
            <span class="qj-menu__icon">${icon("spark")}</span><span class="qj-menu__label">专家中心</span><span class="qj-badge">全部</span>
          </button>
          <div class="menu-subheading">我的专家</div>
          <button class="qj-menu__item menu-child ${isConversation ? "is-active" : ""}" type="button" data-action="frame" data-frame="1">
            <span class="qj-menu__icon">${icon("database")}</span><span class="qj-menu__label">问数专家</span><span class="qj-status__dot" aria-label="可用"></span>
          </button>
        </div>
        <div class="qj-menu__group">
          <div class="menu-heading"><span>我的工作</span></div>
          <button class="qj-menu__item ${state.view === "skill-hub" ? "is-active" : ""}" type="button" data-action="skill-hub">
            <span class="qj-menu__icon">${icon("spark")}</span><span class="qj-menu__label">Skills Hub</span>
          </button>
          <button class="qj-menu__item ${state.view === "my-skills" ? "is-active" : ""}" type="button" data-action="skills">
            <span class="qj-menu__icon">${icon("puzzle")}</span><span class="qj-menu__label">我的 Skills</span><span class="qj-badge">${state.installedSkills.length + 2}</span>
          </button>
          <button class="qj-menu__item ${state.view === "history" ? "is-active" : ""}" type="button" data-action="history">
            <span class="qj-menu__icon">${icon("clock")}</span><span class="qj-menu__label">使用记录</span>
          </button>
          <button class="qj-menu__item" type="button">
            <span class="qj-menu__icon">${icon("book")}</span><span class="qj-menu__label">知识库</span>
          </button>
        </div>
        <div class="qj-menu__group">
          <div class="menu-heading"><span>最近会话</span></div>
          ${recentConversations.map((conversation) => `<button class="qj-menu__item ${isConversation && state.frame === 3 && state.activeConversation === conversation.id ? "is-active" : ""}" type="button" data-action="open-conversation" data-conversation="${conversation.id}">
            <span class="qj-menu__icon">${icon("message")}</span><span class="qj-menu__label">${conversation.title}</span>
          </button>`).join("")}
        </div>
      </nav>
      <footer class="qj-sidebar__footer">
        <div class="profile-card">
          <span class="qj-avatar">王</span>
          <span class="profile-meta"><strong>王商品</strong><small>商品运营 · 12 家店铺</small></span>
          <button class="qj-button qj-button--text qj-button--icon" type="button" title="设置">${icon("settings")}</button>
        </div>
      </footer>
    </aside>`;
}

function topbar() {
  if (state.view !== "conversation") {
    if (state.view === "history") {
      return `
        <header class="qj-app__topbar qj-topbar">
          <div class="qj-topbar__context"><span class="topbar-title">使用记录</span></div>
        </header>`;
    }
    const isExperts = state.view === "experts";
    const isHub = state.view === "skill-hub";
    const searchPlaceholder = isExperts ? "搜索专家名称或能力" : "搜索 Skill 名称或描述";
    const actionButton = isExperts
      ? `<button class="qj-button qj-button--outline qj-button--sm ${state.expertScope === "mine" ? "is-selected" : ""}" type="button" data-action="expert-scope">${icon("database")} ${state.expertScope === "mine" ? "查看全部专家" : "我的专家"}</button>`
      : isHub
        ? `<button class="qj-button qj-button--outline qj-button--sm" type="button" data-action="skills">${icon("puzzle")} 我的 Skills <span class="qj-badge">${state.installedSkills.length + 2}</span></button>`
        : `<button class="qj-button qj-button--outline qj-button--sm" type="button" data-action="skill-hub">浏览 Skills Hub</button><button class="qj-button qj-button--primary qj-button--sm" type="button" data-action="toast" data-message="已创建仅自己可见的 Skill 草稿">${icon("plus")} 新建 Skill</button>`;
    return `
      <header class="qj-app__topbar qj-topbar capability-topbar">
        <div class="qj-topbar__context">
          <div class="qj-tabs qj-tabs--segment capability-tabs">
            <div class="qj-tabs__list" role="tablist" aria-label="能力中心">
              <button class="qj-tabs__tab ${isExperts ? "is-active" : ""}" type="button" role="tab" aria-selected="${isExperts}" data-action="expert-center">专家</button>
              <button class="qj-tabs__tab ${!isExperts ? "is-active" : ""}" type="button" role="tab" aria-selected="${!isExperts}" data-action="skill-hub">Skills Hub</button>
            </div>
          </div>
        </div>
        <div class="qj-topbar__actions">
          ${state.view === "my-skills" ? "" : `<label class="qj-search catalog-search">${icon("search")}<input class="qj-search__input" type="search" data-catalog-search value="${escapeText(state.catalogSearch)}" placeholder="${searchPlaceholder}" aria-label="${searchPlaceholder}"></label>`}
          ${actionButton}
        </div>
      </header>`;
  }
  const showGmvScope = state.frame === 2 || (state.frame === 3 && state.activeConversation === "gmv");
  const scope = !showGmvScope ? "" : `
        <div class="context-chips" aria-label="已理解的查询范围">
          <span class="context-chip">4 家店铺 · 昨日</span>
          <button class="qj-button qj-button--text qj-button--sm" type="button" data-action="toast" data-message="已回到输入框，可直接补充查询范围">修改</button>
        </div>`;
  return `
    <header class="qj-app__topbar qj-topbar">
      <div class="qj-topbar__context">
        <span class="topbar-title">问数专家 <span class="qj-tag qj-tag--success qj-tag--sm">在线</span></span>
        ${scope}
      </div>
      <div class="qj-topbar__actions">
        <span class="qj-status"><span class="qj-status__dot"></span><span class="qj-status__label">数据服务正常</span></span>
      </div>
    </header>`;
}

function composer({ disabled = false, text = "", scopeText = "" } = {}) {
  return `
    <div class="composer-wrap">
      <div class="composer">
        <textarea aria-label="输入业务问题" placeholder="输入业务问题，例如：昨天 4 家店铺的 GMV 和同比如何？" ${disabled ? "disabled" : ""}>${text}</textarea>
        <div class="composer-footer">
          <div class="composer-tools">
            <button class="qj-button qj-button--text qj-button--icon" type="button" title="添加附件" ${disabled ? "disabled" : ""}>${icon("paperclip")}</button>
            ${scopeText ? `<span class="qj-tag qj-tag--brand qj-tag--sm">${scopeText}</span>` : ""}
          </div>
          <button class="qj-button qj-button--primary qj-button--icon" type="button" data-action="start-query" title="发送" ${disabled ? "disabled" : ""}>${icon("send")}</button>
        </div>
      </div>
    </div>`;
}

function frameOne() {
  return `
    <section class="conversation-pane">
      <div class="conversation-scroll">
        <div class="conversation-inner hero">
          <div class="hero-heading">
            <span class="hero-eyebrow">${icon("spark")} 问数专家</span>
            <h1>下午好，想了解什么？</h1>
            <p>直接说清楚时间、店铺和想看的指标，我会在你的权限范围内查询。</p>
          </div>
          <div class="expert-ready-note"><span class="qj-status__dot"></span><span>已连接店铺经营数据，可直接开始提问</span></div>
        </div>
      </div>
      ${composer()}
    </section>`;
}

function frameTwo() {
  return `
    <section class="conversation-pane">
      <div class="conversation-scroll">
        <div class="conversation-inner">
          <div class="context-line">
            <div><h1>昨日 GMV 及同比</h1><p>正在查询 4 家店铺的经营数据</p></div>
            <div class="context-actions"><button class="qj-button qj-button--outline qj-button--sm" type="button" data-action="toggle-evidence">${state.evidenceOpen ? "收起查询详情" : "查看查询详情"}</button><span class="qj-tag qj-tag--warning">查询中</span></div>
          </div>
          <div class="message-block">
            <div class="message-role">你</div>
            <div class="user-message">帮我看一下昨天 4 家店铺的 GMV、同比和退款率，再告诉我哪家表现最好。</div>
          </div>
          <div class="message-block">
            <div class="message-role">问数专家</div>
            <article class="qj-card activity-card">
              <header class="qj-card__header">
                <div><div class="qj-card__title">正在整理你要看的数据</div><div class="qj-card__meta">完成后会给出结论、对比和数据说明</div></div>
              </header>
              <div class="qj-progress">
                <div class="qj-progress__label"><span>查询进度</span><span class="qj-progress__value">64%</span></div>
                <div class="qj-progress__track"><div class="qj-progress__bar progress-64"></div></div>
              </div>
              <div class="qj-steps">
                <div class="qj-steps__item is-success"><span class="qj-steps__marker">${icon("check")}</span><span class="qj-steps__label">已理解问题和查询范围</span><span class="step-meta">已完成</span></div>
                <div class="qj-steps__item is-success"><span class="qj-steps__marker">${icon("check")}</span><span class="qj-steps__label">已确认 GMV、同比和退款率的统计方式</span><span class="step-meta">已完成</span></div>
                <div class="qj-steps__item is-active"><span class="qj-steps__marker">3</span><span class="qj-steps__label">正在查询 4 家店铺的经营数据</span><span class="step-meta">查询中</span></div>
                <div class="qj-steps__item"><span class="qj-steps__marker">4</span><span class="qj-steps__label">核对数据是否完整、是否为最新</span><span class="step-meta">待处理</span></div>
                <div class="qj-steps__item"><span class="qj-steps__marker">5</span><span class="qj-steps__label">整理结论和店铺对比</span><span class="step-meta">待处理</span></div>
              </div>
            </article>
          </div>
        </div>
      </div>
      ${composer({ disabled: true, text: "正在查询，请稍候…", scopeText: "4 家店铺 · 昨日" })}
    </section>
    ${state.evidenceOpen ? evidencePane("running") : ""}`;
}

function frameThree() {
  const conversation = conversationHistory.find((item) => item.id === state.activeConversation) || conversationHistory[0];
  if (conversation.id !== "gmv") return archivedConversation(conversation);
  return `
    <section class="conversation-pane">
      <div class="conversation-scroll">
        <div class="conversation-inner">
          <div class="context-line">
            <div><h1>昨日 GMV 及同比</h1><p>查询完成 · 数据更新至昨日 23:59</p></div>
            <span class="qj-tag qj-tag--success">数据已核对</span>
          </div>
          <div class="message-block">
            <div class="message-role">你</div>
            <div class="user-message">帮我看一下昨天 4 家店铺的 GMV、同比和退款率，再告诉我哪家表现最好。</div>
          </div>
          <div class="message-block">
            <div class="message-role">问数专家</div>
            <article class="qj-card answer-card">
              <div class="answer-head">
                <div class="answer-kicker">${icon("check")} 结论</div>
                <h2>昨日 4 家店铺 GMV 合计 <strong>128.6 万元</strong>，较去年同日增长 12.4%。</h2>
                <p>旗舰店 GMV 和增速均居首，且退款率低于整体，是本次表现最好的店铺。</p>
              </div>
              <div class="metric-grid">
                <div class="qj-metric"><div class="qj-metric__label">GMV 合计</div><div class="qj-metric__value">128.6<span class="qj-metric__unit">万元</span></div><div class="qj-metric__trend">↑ 12.4% 较去年同日</div></div>
                <div class="qj-metric"><div class="qj-metric__label">支付订单</div><div class="qj-metric__value">8,421<span class="qj-metric__unit">单</span></div><div class="qj-metric__trend">↑ 8.7% 较去年同日</div></div>
                <div class="qj-metric"><div class="qj-metric__label">退款率</div><div class="qj-metric__value">6.8<span class="qj-metric__unit">%</span></div><div class="qj-metric__trend metric-down">↑ 0.6pp 较去年同日</div></div>
              </div>
              <div class="answer-body">
                <h3>各店 GMV 贡献（演示数据）</h3>
                <div class="data-bars" role="img" aria-label="旗舰店 52.8 万元，专卖店 31.6 万元，抖音店 26.4 万元，快手店 17.8 万元">
                  <div class="bar-row"><span>旗舰店</span><span class="bar-track"><span class="bar-fill bar-100"></span></span><strong>52.8 万</strong></div>
                  <div class="bar-row"><span>专卖店</span><span class="bar-track"><span class="bar-fill bar-60"></span></span><strong>31.6 万</strong></div>
                  <div class="bar-row"><span>抖音店</span><span class="bar-track"><span class="bar-fill bar-50"></span></span><strong>26.4 万</strong></div>
                  <div class="bar-row"><span>快手店</span><span class="bar-track"><span class="bar-fill bar-34"></span></span><strong>17.8 万</strong></div>
                </div>
              </div>
              <footer class="answer-actions">
                <button class="qj-button qj-button--text qj-button--sm" type="button" data-action="toast" data-message="答案已复制">${icon("copy")} 复制</button>
                <button class="qj-button qj-button--outline qj-button--sm" type="button" data-action="export">${icon("download")} 导出数据</button>
                <button class="qj-button qj-button--text qj-button--sm" type="button" data-action="toggle-evidence">${icon("info")} ${state.evidenceOpen ? "收起数据依据" : "查看数据依据"}</button>
                <button class="qj-button qj-button--text qj-button--sm feedback-action" type="button" data-action="feedback">${icon("message")} ${state.feedbackSubmitted ? "反馈处理中" : "有问题？"}</button>
              </footer>
            </article>
          </div>
        </div>
      </div>
      ${composer({ scopeText: "4 家店铺 · 昨日" })}
    </section>
    ${state.evidenceOpen ? evidencePane("complete") : ""}`;
}

function archivedConversation(conversation) {
  return `
    <section class="conversation-pane">
      <div class="conversation-scroll">
        <div class="conversation-inner">
          <div class="context-line">
            <div><h1>${conversation.title}</h1><p>${conversation.time} · 问数专家</p></div>
            <span class="qj-tag qj-tag--success">已完成</span>
          </div>
          <div class="message-block"><div class="message-role">你</div><div class="user-message">${conversation.question}</div></div>
          <div class="message-block">
            <div class="message-role">问数专家</div>
            <article class="qj-card answer-card compact-answer">
              <div class="answer-head"><div class="answer-kicker">${icon("check")} 结论</div><h2>${conversation.answer}</h2><p>${conversation.detail}</p></div>
              <footer class="answer-actions">
                <button class="qj-button qj-button--text qj-button--sm" type="button" data-action="toast" data-message="答案已复制">${icon("copy")} 复制</button>
                <button class="qj-button qj-button--text qj-button--sm" type="button" data-action="toast" data-message="该历史会话的数据依据已归档">${icon("info")} 查看数据依据</button>
              </footer>
            </article>
          </div>
        </div>
      </div>
      ${composer()}
    </section>`;
}

function evidencePane(mode) {
  const isRunning = mode === "running";
  return `
    <aside class="evidence-pane" aria-label="${isRunning ? "查询详情" : "数据依据"}">
      <div class="evidence-header"><h2>${isRunning ? "查询详情" : "数据依据"}</h2><button class="qj-button qj-button--text qj-button--icon" type="button" data-action="close-evidence" title="收起">${icon("x")}</button></div>
      <section class="evidence-section"><h3>查询内容</h3><div class="qj-description"><div class="qj-description__item"><span class="qj-description__label">店铺</span><span class="qj-description__value">旗舰店、专卖店、抖音店、快手店</span></div><div class="qj-description__item"><span class="qj-description__label">时间</span><span class="qj-description__value">昨日 00:00–23:59</span></div><div class="qj-description__item"><span class="qj-description__label">对比</span><span class="qj-description__value">去年同日</span></div></div></section>
      <section class="evidence-section"><h3>数据来源</h3><div class="source-list"><div class="source-item"><span class="qj-status__dot"></span><span><strong>店铺经营日报</strong><small>${isRunning ? "正在查询第 4/4 家店铺" : "4 家店铺数据均已返回"}</small></span></div><div class="source-item"><span class="qj-status__dot"></span><span><strong>数据更新时间</strong><small>${isRunning ? "正在核对最新数据" : "昨日 23:59"}</small></span></div></div></section>
      <section class="evidence-section"><h3>统计说明</h3><div class="qj-description"><div class="qj-description__item"><span class="qj-description__label">GMV</span><span class="qj-description__value">统计支付成功订单金额，剔除取消订单</span></div><div class="qj-description__item"><span class="qj-description__label">同比</span><span class="qj-description__value">与去年同日相同店铺范围比较</span></div><div class="qj-description__item"><span class="qj-description__label">退款率</span><span class="qj-description__value">退款金额 ÷ 支付金额</span></div></div></section>
    </aside>`;
}

function loadingState() {
  return `<section class="conversation-pane"><div class="loading-shell" aria-label="正在加载"><div class="qj-skeleton qj-skeleton__line sk-short"></div><div class="qj-skeleton qj-skeleton__line sk-mid"></div><div class="qj-skeleton qj-skeleton__block"></div><div class="qj-skeleton qj-skeleton__block"></div></div></section>`;
}

function errorState() {
  return `<section class="conversation-pane"><div class="qj-state qj-state--error is-error"><div><div class="qj-state__visual">${icon("refresh")}</div><div class="qj-state__title">暂时无法加载</div><div class="qj-state__description">网络连接可能不稳定，你可以稍后重试。</div><div class="qj-state__actions"><button class="qj-button qj-button--primary" type="button" data-action="retry">重新加载</button></div></div></div></section>`;
}

function workspace() {
  if (state.view === "experts") return expertCenterPage();
  if (state.view === "skill-hub") return skillHubPage();
  if (state.view === "my-skills") return mySkillsPage();
  if (state.view === "history") return usageHistoryPage();
  if (state.dataState === "loading") return loadingState();
  if (state.dataState === "error") return errorState();
  const content = state.frame === 1 ? frameOne() : state.frame === 2 ? frameTwo() : frameThree();
  return `${state.dataState === "offline" ? `<div class="offline-banner"><span>当前网络已断开：可以查看已有内容，暂时不能查询或导出。</span><button class="qj-button qj-button--outline qj-button--sm" type="button" data-action="retry">重新连接</button></div>` : ""}<div class="workspace-main ${state.evidenceOpen ? "has-evidence" : ""}">${content}</div>`;
}

function feedbackDrawer() {
  if (!state.feedbackOpen) return "";
  return `
    <aside class="qj-drawer__panel feedback-panel" role="dialog" aria-modal="false" aria-labelledby="feedback-title">
      <header class="qj-drawer__header"><h2 class="qj-drawer__title" id="feedback-title">有问题？</h2><button class="qj-button qj-button--text qj-button--icon" type="button" data-action="close-feedback" title="关闭">${icon("x")}</button></header>
      <div class="qj-drawer__body">
        <div class="feedback-context"><strong>反馈对象</strong><span>昨日 4 家店铺 GMV 合计 128.6 万元</span></div>
        <div class="qj-alert"><span class="qj-alert__icon">${icon("info")}</span><div class="qj-alert__content"><div class="qj-alert__title">直接告诉我们哪里不对</div><div class="qj-alert__description">系统会结合原始数据和统计规则核对，需要时再请相关同事确认。</div></div></div>
        <div class="qj-field"><label class="qj-field__label" for="feedbackText">问题说明（选填）</label><textarea class="qj-textarea" id="feedbackText" autofocus placeholder="例如：退款率应该不包含发货前退款">${state.feedbackText}</textarea><div class="qj-field__help">提交后可在使用记录中查看：已收到 → 处理中 → 已更新/已沉淀。</div></div>
      </div>
      <footer class="qj-drawer__footer"><button class="qj-button qj-button--outline" type="button" data-action="close-feedback">取消</button><button class="qj-button qj-button--primary" type="button" data-action="submit-feedback">提交反馈</button></footer>
    </aside>`;
}

const expertCatalog = [
  { name: "问数专家", owner: "数据产品组", icon: "database", status: "installed", description: "用自然语言查询店铺经营数据，查看指标口径和数据依据，并导出明细。", tags: ["经营数据", "指标口径", "明细导出"] },
  { name: "商品经营专家", owner: "商品运营组", icon: "spark", status: "planned", description: "围绕商品表现、结构变化和异常商品给出经营分析与行动建议。", tags: ["商品分析", "异常定位", "经营建议"] },
  { name: "投放分析专家", owner: "投放运营组", icon: "chart", status: "planned", description: "分析渠道投放表现和异常变化，帮助定位效率和转化问题。", tags: ["渠道投放", "转化漏斗", "效果归因"] },
];

const conversationHistory = [
  { id: "gmv", title: "昨日 GMV 及同比", time: "今天 14:32", question: "帮我看一下昨天 4 家店铺的 GMV、同比和退款率，再告诉我哪家表现最好。", answer: "昨日 4 家店铺 GMV 合计 128.6 万元，同比增长 12.4%。", detail: "旗舰店 GMV 和增速均居首，且退款率低于整体，是本次表现最好的店铺。", status: "数据已核对" },
  { id: "plugin-roi", title: "8 月 9 日 ROI 上升原因", time: "今天 14:18", question: "结合运营报表、直播流量对比和商品销售 SKU 日报，分析 8 月 9 日 ROI 上升原因。", answer: "8 月 9 日 ROI 上升，主要由直播转化与头部商品共同驱动。", detail: "投放消耗较前一日增加 19.9%，但成交金额增长 20.5%；同时直播成交占比和 TOP3 商品贡献均上升，因此 ROI 从 48.77 提升至 55.59。", status: "来自页面插件" },
  { id: "refund", title: "商品退款率分析", time: "昨天 17:08", question: "近 7 天哪些商品的退款率明显升高？", answer: "近 7 天有 6 个商品退款率明显升高，其中 2 个需要优先处理。", detail: "主要集中在尺码偏差和到货破损两类原因，建议先核查 SKU-2048 和 SKU-3176 的详情页说明与仓配记录。", status: "已完成" },
  { id: "weekly", title: "本周店铺趋势", time: "8 月 17 日 10:21", question: "对比一下本周 4 家店铺的销售趋势。", answer: "本周 GMV 较上周增长 8.1%，增长主要来自旗舰店和抖音店。", detail: "周三开始增速明显，专卖店连续两天下滑；建议继续关注专卖店访客数和支付转化率。", status: "已完成" },
  { id: "orders", title: "大促订单峰值", time: "8 月 15 日 21:40", question: "这次大促的订单峰值出现在什么时候？", answer: "订单峰值出现在 8 月 15 日 20:00–21:00，共支付 1,286 单。", detail: "峰值订单量较日常同时间段高 2.7 倍，系统履约与支付链路均无明显异常。", status: "已完成" },
];

function usageHistoryPage() {
  const groups = [
    { label: "今天", items: conversationHistory.slice(0, 2) },
    { label: "更早", items: conversationHistory.slice(2) },
  ];
  return `<section class="qj-page marketplace-page history-page"><div class="marketplace-scroll"><div class="qj-page__body">
    <header class="qj-page__header marketplace-heading"><div><h1 class="qj-page__title">使用记录</h1><p class="qj-page__meta">同一专家的每次新对话都会独立保存；点击任一记录可查看并继续该对话。</p></div><span class="catalog-count">${conversationHistory.length} 次对话</span></header>
    <section class="history-expert qj-card">
      <header class="history-expert__header"><span class="catalog-avatar expert-avatar">${icon("database")}</span><div><h2>问数专家</h2><p>共 ${conversationHistory.length} 个独立对话 · 最近使用于今天 14:32</p></div><span class="qj-tag qj-tag--success qj-tag--sm">在线</span></header>
      ${groups.map((group) => `<div class="history-group"><h3>${group.label}</h3><div class="history-list">${group.items.map((conversation) => `<button class="history-row" type="button" data-action="open-conversation" data-conversation="${conversation.id}"><span class="history-row__icon">${icon("message")}</span><span class="history-row__body"><strong>${conversation.title}</strong><small>${conversation.question}</small></span><span class="history-row__meta"><span>${conversation.time}</span><small>${conversation.status}</small></span><span class="history-row__arrow">→</span></button>`).join("")}</div></div>`).join("")}
    </section>
  </div></div></section>`;
}

const publishedSkills = [
  { name: "周度商品复盘", version: "v2.1", owner: "运营效率组", category: "商品运营", icon: "chart", featured: true, description: "汇总核心指标、异常商品和下周行动建议。" },
  { name: "商品日报生成", version: "v1.4", owner: "商品运营组", category: "内容生成", icon: "file", featured: true, description: "将当日商品表现整理成可直接发送的业务日报。" },
  { name: "活动效果对比", version: "v1.1", owner: "经营分析组", category: "经营分析", icon: "chart", featured: true, description: "对比活动前后关键指标并标记变化较大的商品。" },
  { name: "店铺异常归因", version: "v1.3", owner: "经营分析组", category: "经营分析", icon: "search", description: "根据指标变化定位可能的店铺、商品和时间段原因。" },
  { name: "商品结构分析", version: "v1.0", owner: "商品运营组", category: "商品运营", icon: "database", description: "按价格带、品类和新品老品拆解商品结构与变化。" },
  { name: "经营周报排版", version: "v1.2", owner: "运营效率组", category: "内容生成", icon: "file", description: "把查询结论、图表和行动项整理成标准经营周报。" },
  { name: "退款明细清洗", version: "v1.5", owner: "数据治理组", category: "数据处理", icon: "database", description: "规范退款原因、清理重复记录并输出可分析明细。" },
  { name: "指标口径核对", version: "v2.0", owner: "数据治理组", category: "数据处理", icon: "check", description: "核对常用指标口径、适用范围和数据更新时间。" },
];

const createdSkills = [
  { name: "商品日报摘要", version: "v0.3", status: "私有草稿", statusClass: "qj-tag--info", description: "按自己的日报模板整理当日商品表现。" },
  { name: "异常退款定位", version: "v1.0", status: "待管理员审核", statusClass: "qj-tag--warning", description: "根据退款明细定位集中出现的商品和原因。" },
];

function marketplaceFeedback(noun) {
  if (state.dataState === "loading") {
    return `<div class="catalog-skeleton" aria-label="正在加载${noun}">${Array.from({ length: 6 }, () => `<div class="qj-card market-card"><div class="qj-skeleton qj-skeleton__line sk-short"></div><div class="qj-skeleton qj-skeleton__line sk-mid"></div><div class="qj-skeleton qj-skeleton__block catalog-sk-block"></div></div>`).join("")}</div>`;
  }
  if (state.dataState === "error") {
    return `<div class="qj-state qj-state--error is-error"><div><div class="qj-state__visual">${icon("refresh")}</div><div class="qj-state__title">${noun}暂时无法加载</div><div class="qj-state__description">网络连接可能不稳定，你可以稍后重试。</div><div class="qj-state__actions"><button class="qj-button qj-button--primary" type="button" data-action="retry">重新加载</button></div></div></div>`;
  }
  if (state.dataState === "empty") {
    return `<div class="qj-state qj-state--empty is-empty"><div><div class="qj-state__visual">${icon("info")}</div><div class="qj-state__title">暂时没有可用${noun}</div><div class="qj-state__description">管理端发布后会在这里出现。</div></div></div>`;
  }
  return "";
}

function expertCard(expert) {
  const installed = expert.status === "installed";
  return `<article class="qj-card market-card expert-card" data-catalog-card data-catalog-text="${expert.name} ${expert.owner} ${expert.description} ${expert.tags.join(" ")}">
    <header class="qj-card__header"><span class="catalog-avatar expert-avatar">${icon(expert.icon)}</span><div class="catalog-identity"><h2 class="qj-card__title">${expert.name}</h2><div class="qj-card__meta">${expert.owner}</div></div><span class="qj-tag ${installed ? "qj-tag--success" : "qj-tag--info"} qj-tag--sm">${installed ? "已添加" : "规划中"}</span></header>
    <div class="qj-card__body"><p>${expert.description}</p><div class="catalog-tags">${expert.tags.map((tag) => `<span class="qj-tag qj-tag--neutral qj-tag--sm">${tag}</span>`).join("")}</div></div>
    <footer class="qj-card__footer"><button class="qj-button ${installed ? "qj-button--primary" : "qj-button--outline"} qj-button--sm" type="button" ${installed ? 'data-action="open-expert"' : "disabled"}>${installed ? "打开专家" : "暂不可用"}</button></footer>
  </article>`;
}

function expertCenterPage() {
  const feedback = marketplaceFeedback("专家");
  if (feedback) return `<section class="qj-page marketplace-page"><div class="marketplace-scroll"><div class="qj-page__body">${feedback}</div></div></section>`;
  const term = state.catalogSearch.trim().toLowerCase();
  const experts = expertCatalog.filter((expert) => (state.expertScope === "mine" ? expert.status === "installed" : true)).filter((expert) => `${expert.name} ${expert.owner} ${expert.description} ${expert.tags.join(" ")}`.toLowerCase().includes(term));
  return `<section class="qj-page marketplace-page">
    <div class="marketplace-scroll"><div class="qj-page__body">
      ${state.dataState === "offline" ? `<div class="offline-banner">当前网络已断开：可以浏览已有专家，暂时不能打开新任务。</div>` : ""}
      <header class="qj-page__header marketplace-heading"><div><h1 class="qj-page__title">${state.expertScope === "mine" ? "我的专家" : "发现适合你的专家"}</h1><p class="qj-page__meta">专家由管理端发布；已添加的专家会出现在左侧“我的专家”中。</p></div><span class="catalog-count">${experts.length} 个</span></header>
      <div class="qj-grid qj-grid--3 market-grid">${experts.map(expertCard).join("")}</div>
      <div class="qj-state qj-state--no-result is-empty catalog-no-result" ${experts.length ? "hidden" : ""}><div><div class="qj-state__visual">${icon("search")}</div><div class="qj-state__title">没有找到匹配的专家</div><div class="qj-state__description">换一个名称或能力关键词试试。</div><div class="qj-state__actions"><button class="qj-button qj-button--outline" type="button" data-action="clear-search">清空搜索</button></div></div></div>
    </div></div>
  </section>`;
}

function skillCard(skill, options = {}) {
  const installed = state.installedSkills.includes(skill.name);
  const installDisabled = installed || state.dataState === "offline";
  const showCategory = options.showCategory !== false;
  return `<article class="qj-card market-card skill-card" data-catalog-card data-catalog-text="${skill.name} ${skill.owner} ${skill.category} ${skill.description}">
    <header class="qj-card__header"><span class="catalog-avatar skill-avatar">${icon(skill.icon)}</span><div class="catalog-identity"><h3 class="qj-card__title">${skill.name}</h3><div class="qj-card__meta">${skill.version} · ${skill.owner}</div></div>${showCategory ? `<span class="qj-tag qj-tag--neutral qj-tag--sm">${skill.category}</span>` : ""}</header>
    <div class="qj-card__body"><p>${skill.description}</p></div>
    <footer class="qj-card__footer"><button class="qj-button qj-button--outline qj-button--sm" type="button" ${installDisabled ? "disabled" : `data-action="install-skill" data-skill="${skill.name}"`}>${installed ? `${icon("check")} 已安装` : state.dataState === "offline" ? "离线不可安装" : `${icon("plus")} 安装`}</button></footer>
  </article>`;
}

function skillHubPage() {
  const feedback = marketplaceFeedback("Skill");
  if (feedback) return `<section class="qj-page marketplace-page"><div class="marketplace-scroll"><div class="qj-page__body">${feedback}</div></div></section>`;
  const categories = ["全部", "经营分析", "商品运营", "数据处理", "内容生成"];
  const term = state.catalogSearch.trim().toLowerCase();
  const filtered = publishedSkills.filter((skill) => state.skillCategory === "全部" || skill.category === state.skillCategory).filter((skill) => `${skill.name} ${skill.owner} ${skill.category} ${skill.description}`.toLowerCase().includes(term));
  const featured = publishedSkills.filter((skill) => skill.featured);
  return `<section class="qj-page marketplace-page">
    <div class="marketplace-scroll"><div class="qj-page__body">
      ${state.dataState === "offline" ? `<div class="offline-banner">当前网络已断开：可以浏览已加载的 Skill，暂时不能安装。</div>` : ""}
      <section class="market-section featured-section" ${term ? "hidden" : ""}><header class="market-section-head"><div><h1 class="qj-page__title">精选 Skills</h1><p class="qj-page__meta">管理员近期发布、适合商品运营岗位的 Skills。</p></div></header><div class="qj-grid qj-grid--3 market-grid featured-grid">${featured.map((skill) => skillCard(skill, { showCategory: false })).join("")}</div></section>
      <section class="market-section all-skills-section"><header class="market-section-head"><div><h2>全部 Skills</h2><p>共 ${publishedSkills.length} 个已发布 Skill，安装后进入“我的 Skills”。</p></div></header>
        <div class="qj-tabs qj-tabs--line category-tabs"><div class="qj-tabs__list" role="tablist" aria-label="Skill 分类">${categories.map((category) => `<button class="qj-tabs__tab ${state.skillCategory === category ? "is-active" : ""}" type="button" role="tab" aria-selected="${state.skillCategory === category}" data-action="skill-category" data-category="${category}">${category}</button>`).join("")}</div></div>
        <div class="qj-grid qj-grid--3 market-grid skill-grid">${filtered.map(skillCard).join("")}</div>
        <div class="qj-state qj-state--no-result is-empty catalog-no-result" ${filtered.length ? "hidden" : ""}><div><div class="qj-state__visual">${icon("search")}</div><div class="qj-state__title">没有找到匹配的 Skill</div><div class="qj-state__description">尝试其他关键词或分类。</div><div class="qj-state__actions"><button class="qj-button qj-button--outline" type="button" data-action="clear-search">清空搜索和分类</button></div></div></div>
      </section>
    </div></div>
  </section>`;
}

function mySkillsPage() {
  const feedback = marketplaceFeedback("Skill");
  if (feedback) return `<section class="qj-page marketplace-page"><div class="marketplace-scroll"><div class="qj-page__body">${feedback}</div></div></section>`;
  const installed = publishedSkills.filter((skill) => state.installedSkills.includes(skill.name));
  return `<section class="qj-page marketplace-page">
    <div class="marketplace-scroll"><div class="qj-page__body">
      <header class="qj-page__header marketplace-heading"><div><h1 class="qj-page__title">我的 Skills</h1><p class="qj-page__meta">管理已安装的组织 Skill，以及自己创建、等待审核的 Skill。</p></div></header>
      <section class="market-section"><header class="market-section-head"><div><h2>已安装</h2><p>${installed.length} 个 · 均在你原有的数据和工具权限内运行</p></div></header><div class="qj-grid qj-grid--3 market-grid">${installed.map(skillCard).join("")}</div></section>
      <section class="market-section"><header class="market-section-head"><div><h2>我创建的</h2><p>草稿可自己试用，审核通过后才能发布给其他人。</p></div></header><div class="qj-grid qj-grid--3 market-grid">${createdSkills.map((skill) => `<article class="qj-card market-card created-skill-card"><header class="qj-card__header"><span class="catalog-avatar skill-avatar">${icon("puzzle")}</span><div class="catalog-identity"><h3 class="qj-card__title">${skill.name}</h3><div class="qj-card__meta">${skill.version}</div></div><span class="qj-tag ${skill.statusClass} qj-tag--sm">${skill.status}</span></header><div class="qj-card__body"><p>${skill.description}</p></div><footer class="qj-card__footer"><button class="qj-button qj-button--outline qj-button--sm" type="button" data-action="toast" data-message="已打开 ${skill.name}">查看</button></footer></article>`).join("")}</div></section>
    </div></div>
  </section>`;
}

function exportModal() {
  if (!state.exportOpen) return "";
  return `
    <div class="qj-modal__backdrop" data-action="close-export" role="presentation">
      <section class="qj-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="export-title" data-modal-dialog>
        <header class="qj-modal__header"><h2 class="qj-modal__title" id="export-title">导出本次查询数据</h2><button class="qj-button qj-button--text qj-button--icon" type="button" data-action="close-export" title="关闭">${icon("x")}</button></header>
        <div class="qj-modal__body">
          <div class="qj-alert"><span class="qj-alert__icon">${icon("shield")}</span><div class="qj-alert__content"><div class="qj-alert__title">仅导出你有权限查看的数据</div><div class="qj-alert__description">文件只会保存到你选择的本地目录，不会改动其他文件。</div></div></div>
          <div class="export-grid section-gap">
            <div class="qj-field"><span class="qj-field__label">数据范围</span><div class="radio-cards"><label class="radio-card"><input class="qj-radio" type="radio" name="scope" checked><span><strong>明细 + 汇总</strong><small class="stacked-note">约 8,421 行</small></span></label><label class="radio-card"><input class="qj-radio" type="radio" name="scope"><span><strong>仅汇总</strong><small class="stacked-note">4 家店铺</small></span></label></div></div>
            <div class="qj-field"><span class="qj-field__label">文件格式</span><div class="radio-cards"><label class="radio-card"><input class="qj-radio" type="radio" name="format" checked><span><strong>XLSX</strong><small class="stacked-note">附统计说明</small></span></label><label class="radio-card"><input class="qj-radio" type="radio" name="format"><span><strong>CSV</strong><small class="stacked-note">适合继续处理</small></span></label></div></div>
          </div>
          <div class="qj-field"><span class="qj-field__label">导出字段</span><div class="field-checks"><label><input class="qj-checkbox" type="checkbox" checked> 店铺</label><label><input class="qj-checkbox" type="checkbox" checked> 日期</label><label><input class="qj-checkbox" type="checkbox" checked> GMV</label><label><input class="qj-checkbox" type="checkbox" checked> 支付订单</label><label><input class="qj-checkbox" type="checkbox" checked> 退款率</label><label><input class="qj-checkbox" type="checkbox"> 商品明细</label></div><div class="qj-field__help">统计说明、数据更新时间和查询条件会一起写入文件。</div></div>
          <div class="qj-field"><label class="qj-field__label" for="savePath">保存位置</label><div class="path-row"><input class="qj-input" id="savePath" value="下载/业务问数导出" readonly><button class="qj-button qj-button--outline qj-button--sm" type="button" data-action="toast" data-message="已打开本地目录选择">${icon("folder")} 更改</button></div><div class="qj-field__help">可以在该目录新建和更新导出文件，不会删除已有文件。</div></div>
          ${state.exportStatus === "running" ? `<div class="qj-progress"><div class="qj-progress__label"><span>正在生成导出文件</span><span>72%</span></div><div class="qj-progress__track"><div class="qj-progress__bar progress-72"></div></div></div>` : ""}
        </div>
        <footer class="qj-modal__footer"><button class="qj-button qj-button--outline" type="button" data-action="close-export">取消</button><button class="qj-button qj-button--primary" type="button" data-action="submit-export" ${state.exportStatus === "running" ? "disabled" : ""}>${state.exportStatus === "running" ? "正在导出…" : "开始导出"}</button></footer>
      </section>
    </div>`;
}

function toast() {
  return state.toast ? `<div class="qj-toast-region"><div class="qj-toast is-success" role="status"><span class="qj-toast__icon">${icon("check")}</span><span class="qj-toast__content">${state.toast}</span></div></div>` : "";
}

function render() {
  app.innerHTML = `
    <div class="qj-app" data-view="${state.view}" data-frame="${state.frame}" data-state="${state.dataState}">
      ${sidebar()}
      ${topbar()}
      <main class="qj-app__main">
        ${workspace()}
        ${feedbackDrawer()}
      </main>
      ${exportModal()}
      ${toast()}
    </div>`;
  const autofocus = document.querySelector("[autofocus]");
  if (autofocus) requestAnimationFrame(() => autofocus.focus());
}

let toastTimer;
function showToast(message) {
  state.toast = message;
  clearTimeout(toastTimer);
  render();
  toastTimer = setTimeout(() => {
    state.toast = "";
    render();
  }, 2400);
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "frame") {
    state.view = "conversation";
    state.frame = Number(target.dataset.frame);
    if (state.frame === 1) state.activeConversation = "gmv";
    state.feedbackOpen = false;
    state.catalogSearch = "";
    state.evidenceOpen = false;
    state.dataState = "success";
    render();
  } else if (action === "start-query") {
    state.view = "conversation";
    state.frame = 2;
    state.activeConversation = "gmv";
    state.feedbackOpen = false;
    state.evidenceOpen = false;
    render();
  } else if (action === "toggle-evidence") {
    state.evidenceOpen = !state.evidenceOpen;
    state.feedbackOpen = false;
    render();
  } else if (action === "close-evidence") {
    state.evidenceOpen = false;
    render();
  } else if (action === "feedback") {
    state.feedbackOpen = true;
    state.evidenceOpen = false;
    render();
  } else if (action === "close-feedback") {
    state.feedbackOpen = false;
    render();
  } else if (action === "submit-feedback") {
    state.feedbackText = document.querySelector("#feedbackText")?.value || "";
    state.feedbackSubmitted = true;
    state.feedbackOpen = false;
    showToast("反馈已收到，正在核对相关数据");
  } else if (action === "export") {
    state.exportOpen = true;
    state.exportStatus = "idle";
    render();
  } else if (action === "close-export") {
    if (event.target === target || !target.hasAttribute("data-modal-dialog")) {
      state.exportOpen = false;
      state.exportStatus = "idle";
      render();
    }
  } else if (action === "submit-export") {
    state.exportStatus = "running";
    render();
    setTimeout(() => {
      state.exportOpen = false;
      state.exportStatus = "idle";
      showToast("已导出：昨日_GMV_千机品牌_4店.xlsx");
    }, 900);
  } else if (action === "skills") {
    state.view = "my-skills";
    state.catalogSearch = "";
    state.feedbackOpen = false;
    state.evidenceOpen = false;
    render();
  } else if (action === "skill-hub") {
    state.view = "skill-hub";
    state.catalogSearch = "";
    state.feedbackOpen = false;
    state.evidenceOpen = false;
    render();
  } else if (action === "install-skill") {
    const skillName = target.dataset.skill;
    if (skillName && !state.installedSkills.includes(skillName)) state.installedSkills.push(skillName);
    showToast(`${skillName}已安装，可在“我的 Skills”中使用`);
  } else if (action === "expert-center") {
    state.view = "experts";
    state.catalogSearch = "";
    state.expertScope = "all";
    state.feedbackOpen = false;
    state.evidenceOpen = false;
    render();
  } else if (action === "history") {
    state.view = "history";
    state.catalogSearch = "";
    state.feedbackOpen = false;
    state.evidenceOpen = false;
    render();
  } else if (action === "open-conversation") {
    state.view = "conversation";
    state.frame = 3;
    state.activeConversation = target.dataset.conversation || "gmv";
    state.feedbackOpen = false;
    state.evidenceOpen = false;
    state.dataState = "success";
    render();
  } else if (action === "expert-scope") {
    state.expertScope = state.expertScope === "mine" ? "all" : "mine";
    state.catalogSearch = "";
    render();
  } else if (action === "open-expert") {
    state.view = "conversation";
    state.frame = 1;
    state.activeConversation = "gmv";
    render();
  } else if (action === "skill-category") {
    state.skillCategory = target.dataset.category || "全部";
    render();
  } else if (action === "clear-search") {
    state.catalogSearch = "";
    state.skillCategory = "全部";
    render();
  } else if (action === "retry") {
    state.dataState = "success";
    showToast("已恢复连接");
  } else if (action === "toast") {
    showToast(target.dataset.message || "操作已完成");
  }
});

app.addEventListener("change", (event) => {
  if (event.target.matches('[data-action="data-state"]')) {
    state.dataState = event.target.value;
    state.feedbackOpen = false;
    state.evidenceOpen = false;
    render();
  }
});

app.addEventListener("input", (event) => {
  const input = event.target.closest("[data-catalog-search]");
  if (!input) return;
  state.catalogSearch = input.value;
  const term = input.value.trim().toLowerCase();
  let visibleCards = 0;
  document.querySelectorAll("[data-catalog-card]").forEach((card) => {
    const isFeaturedCard = Boolean(card.closest(".featured-section"));
    const matches = (!term || !isFeaturedCard) && (card.dataset.catalogText || "").toLowerCase().includes(term);
    card.hidden = !matches;
    if (matches) visibleCards += 1;
  });
  const featuredSection = document.querySelector(".featured-section");
  if (featuredSection) featuredSection.hidden = Boolean(term);
  const noResult = document.querySelector(".catalog-no-result");
  if (noResult) noResult.hidden = visibleCards > 0;
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (state.exportOpen) state.exportOpen = false;
  else if (state.feedbackOpen) state.feedbackOpen = false;
  else if (state.evidenceOpen) state.evidenceOpen = false;
  render();
});

render();
