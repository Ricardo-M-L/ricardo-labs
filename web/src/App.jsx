import React from 'react'
import HeroField from './HeroField'
import ProductDetails from './ProductDetail'

const GITHUB = 'https://github.com/Ricardo-M-L'
const METIS = 'https://github.com/Ricardo-M-L/metis'
// 「Try metis」独立页(GitHub Pages 是静态托管,用真实 HTML 入口而不是前端路由)
const TRY = import.meta.env.BASE_URL + 'try-metis.html'

/* ---------- 小图标 ---------- */
const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.2 8h9.6M8.6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Ext = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3h7v7M13 3 5 11M11 9v4H3V5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ---------- 卡片插画:两色编辑风格,不用渐变糊 ---------- */
const ArtScopes = () => (
  <svg viewBox="0 0 320 132" role="img" aria-label="Fiber 作用域树">
    <g fill="none" stroke="rgba(20,20,19,.55)" strokeWidth="1.2">
      <rect x="10" y="12" width="300" height="26" rx="4" />
      <rect x="26" y="52" width="130" height="26" rx="4" />
      <rect x="170" y="52" width="140" height="26" rx="4" />
      <rect x="42" y="92" width="98" height="26" rx="4" />
      <rect x="186" y="92" width="108" height="26" rx="4" />
      <path d="M160 38v14M91 66v12M240 66v12M91 78v14M240 78v14" />
    </g>
    <g fontSize="10.5" fontFamily="JetBrains Mono, monospace" fill="rgba(20,20,19,.82)">
      <text x="18" y="29">root · Context</text>
      <text x="34" y="69">loader</text>
      <text x="178" y="69">timer</text>
      <text x="50" y="109">hmr</text>
      <text x="194" y="109">logger</text>
    </g>
    <circle cx="160" cy="38" r="3" fill="#c6613f" />
  </svg>
)

const ArtRetrieval = () => (
  <svg viewBox="0 0 320 132" role="img" aria-label="混合检索打分">
    {[
      ['BM25 · 0.91', 0.91, '#c6613f'],
      ['vector · 0.78', 0.78, '#3d3d3a'],
      ['recency · 0.64', 0.64, '#788c5d'],
      ['importance · 0.52', 0.52, '#6a9bcc'],
    ].map(([label, v, color], i) => (
      <g key={label} transform={`translate(0 ${14 + i * 30})`}>
        <text x="0" y="10" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fill="rgba(20,20,19,.72)">{label}</text>
        <rect x="118" y="2" width="180" height="5" rx="2.5" fill="rgba(20,20,19,.12)" />
        <rect x="118" y="2" width={180 * v} height="5" rx="2.5" fill={color} />
      </g>
    ))}
  </svg>
)

const ArtFutures = () => (
  <svg viewBox="0 0 320 132" role="img" aria-label="候选未来分支与提交门">
    <g fill="none" stroke="rgba(20,20,19,.5)" strokeWidth="1.2">
      <path d="M20 66h58" />
      <path d="M78 66c34 0 34-40 68-40h60" />
      <path d="M78 66h128" />
      <path d="M78 66c34 0 34 40 68 40h60" />
      <path d="M206 26h64M206 66h64M206 106h64" />
    </g>
    <g fontSize="10.5" fontFamily="JetBrains Mono, monospace" fill="rgba(20,20,19,.8)">
      <text x="14" y="52">intent</text>
      <text x="86" y="20">future A</text>
      <text x="86" y="60">future B</text>
      <text x="86" y="100">future C</text>
      <text x="212" y="30">outcome</text>
      <text x="212" y="70">outcome</text>
      <text x="212" y="110">outcome</text>
    </g>
    <g>
      <circle cx="78" cy="66" r="3.5" fill="#c6613f" />
      <rect x="250" y="58" width="16" height="16" rx="3" fill="none" stroke="#c6613f" strokeWidth="1.4" />
      <path d="M254 66l3 3 5-6" stroke="#c6613f" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

const ArtLoop = () => (
  <svg viewBox="0 0 320 132" role="img" aria-label="Agent 流式循环与分层记忆">
    <g fill="none" stroke="rgba(20,20,19,.5)" strokeWidth="1.2">
      <rect x="8" y="48" width="58" height="36" rx="4" />
      <rect x="96" y="12" width="126" height="108" rx="6" />
      <path d="M66 66h30M222 66h18" />
      <path d="M198 100c0 14-16 14-16 14h-58c-14 0-14-14-14-14" />
      <path d="M240 24h72M240 54h72M240 84h72" />
      <rect x="240" y="18" width="72" height="24" rx="4" />
      <rect x="240" y="48" width="72" height="24" rx="4" />
      <rect x="240" y="78" width="72" height="24" rx="4" />
    </g>
    <g fontSize="10.5" fontFamily="JetBrains Mono, monospace" fill="rgba(20,20,19,.8)">
      <text x="15" y="70">prompt</text>
      <text x="106" y="32">stream</text>
      <text x="106" y="70">tool call ×16</text>
      <text x="106" y="108">observe</text>
      <text x="247" y="34">core</text>
      <text x="247" y="64">archival</text>
      <text x="247" y="94">recall</text>
    </g>
    <g>
      <circle cx="210" cy="66" r="3.5" fill="#c6613f" />
      <path d="M210 62v-16" stroke="#c6613f" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M207 52l3-6 3 6" stroke="#c6613f" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
)

/* ---------- 内容(全部为项目事实) ---------- */
const NL = '\n'
const PRODUCTS = [
  {
    id: 'cordis-di', tone: 't-oat', label: '01 · Rust · crates.io',
    title: 'cordis-di', desc: '类型化插件与依赖注入。Fiber 生命周期把"什么时候清理"变成确定性契约,staged reload 失败会先回滚新作用域、保住旧运行时。',
    art: <ArtScopes />,
    links: [['了解详情', '#p-cordis-di'], ['仓库', 'https://github.com/Ricardo-M-L/cordis-di'], ['crate', 'https://crates.io/crates/cordis-di-core']],
  },
  {
    id: 'agent-memory', tone: 't-manilla', label: '02 · Rust · SQLite',
    title: 'agent-memory', desc: '不搭数据库服务就能存事实:混合检索（BM25 + 向量）加权时效与重要性,supersede 显式演化记忆,历史全程可审计。',
    art: <ArtRetrieval />,
    links: [['了解详情', '#p-agent-memory'], ['仓库', 'https://github.com/Ricardo-M-L/agent-memory']],
  },
  {
    id: 'ifscape', tone: 't-kraft', label: '03 · TypeScript + Rust · 本地预览',
    title: 'Ifscape', desc: '后果工作室:每次规划只给 2–4 个有界的候选未来,推演结果一律标注 model-prediction,提交门只对人打开。',
    art: <ArtFutures />,
    links: [['了解详情', '#p-ifscape'], ['作者主页', GITHUB]],
  },
  {
    id: 'metis', tone: 't-cactus', label: '04 · Go · CLI',
    title: 'metis', desc: '本地优先的 Agent CLI:流式 agent loop、16 个内置工具、多 provider LLM,记忆分 core / archival / recall 三层,终端里跑,也能当 ACP server 被别的客户端调用;另有一个原生桌面端。',
    art: <ArtLoop />,
    links: [['了解详情', '#p-metis'], ['Try metis', TRY], ['仓库', METIS], ['发布记录', METIS + '/releases/latest']],
  },
]

const STAGE_CODE = [
  [['// 作用域结束 → LIFO 回收全部副作用', 'cm']],
  [['use ', 'kw'], ['cordis_di_core', 'fn'], ['::{disposer, Fiber};\n', '']],
  ['\n'],
  [['let ', 'kw'], ['fiber', ''], [' = ', ''], ['Fiber', 'fn'], ['::new();\n', '']],
  [['let ', 'kw'], ['_e', ''], [' = fiber.', ''], ['effect', 'fn'], ['(|| {\n    ', '']],
  [['disposer', 'fn'], ['(|| println!(', ''], ['"scope ended"', 'st'], ['))\n});\n\n', '']],
  [['fiber.', ''], ['dispose', 'fn'], ['();  ', ''], ['// 清理顺序可预期', 'cm']],
]

const NOTES = [
  ['R-01', '#d97757', '从 Proxy 到类型系统:一次 DI 框架的 Rust 移植', 'JS 动态代理的魔法,到了 Rust 变成显式工厂、显式作用域和编译期可查的查找。', '工程笔记 · 9 月'],
  ['R-02', '#6a9bcc', 'Agent 记忆的三个时间尺度', '工作记忆撑住一次会话,情景记忆串起整条轨迹,语义记忆沉淀可复用的事实。', '工程笔记 · 8 月'],
  ['R-03', '#788c5d', '把"未来"做成可审查的分支', '推演不冒充预言:候选分支有界、结论标注来源、提交前必须有人点头。', '设计记录 · 8 月'],
]

/* ---------- 组件 ---------- */

/* 顶栏下拉大菜单:分栏 = 产品 / 源码 / metis(实测参照:链接 16px 衬线,分栏右对齐) */
const MENU = [
  ['产品', [
    ['cordis-di', '#p-cordis-di'],
    ['agent-memory', '#p-agent-memory'],
    ['Ifscape', '#p-ifscape'],
    ['metis', '#p-metis'],
  ]],
  ['源码', [
    ['cordis-di 仓库', 'https://github.com/Ricardo-M-L/cordis-di'],
    ['agent-memory 仓库', 'https://github.com/Ricardo-M-L/agent-memory'],
    ['metis 仓库', METIS],
    ['crates.io · cordis-di-core', 'https://crates.io/crates/cordis-di-core'],
  ]],
  ['metis', [
    ['Try metis(桌面端 + CLI)', TRY],
    ['最新版本 v0.4.59', METIS + '/releases/latest'],
    ['README', METIS + '#readme'],
    ['Issues', METIS + '/issues'],
    ['作者主页', GITHUB],
  ]],
]

const Caret = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GithubMark = () => (
  <svg width="21" height="21" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
)

const isExt = (href) => !(href.startsWith('#') || href === TRY)

export function Nav() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const wrap = React.useRef(null)
  const byHover = React.useRef(false)
  const closeMenu = React.useCallback(() => { byHover.current = false; setOpen(false) }, [])
  const hoverOpen = () => { byHover.current = true; setOpen(true) }
  const clickToggle = () => {
    if (byHover.current) { byHover.current = false; return }  // 悬停已开,点击不再关掉
    setOpen((v) => !v)
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120)
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    const onDoc = (e) => { if (wrap.current && !wrap.current.contains(e.target)) closeMenu() }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onDoc)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onDoc)
    }
  }, [closeMenu])

  return (
    <header
      className={'nav' + (scrolled ? ' is-scrolled' : '')}
      ref={wrap}
      onMouseLeave={closeMenu}
    >
      <div className="shell nav-in">
        <a className="wordmark" href="#top">Ricardo Labs<em>.</em></a>
        <div className="nav-right">
          <nav className="nav-links" aria-label="主导航">
            <button
              type="button"
              className="nav-trigger"
              aria-expanded={open}
              aria-haspopup="true"
              onClick={clickToggle}
              onMouseEnter={hoverOpen}
            >
              产品 <Caret />
            </button>
            <a href="#notes">笔记</a>
            <a href="#claim">关于</a>
          </nav>
          <a className="nav-cta ghost" href={TRY}>
            Try metis <Arrow />
          </a>
          <a className="nav-cta" href={GITHUB} target="_blank" rel="noreferrer">
            GitHub <Ext />
          </a>
        </div>
      </div>
      <div className="nav-panel" hidden={!open}>
        <div className="shell nav-panel-in">
          {MENU.map(([head, items]) => (
            <div className="nav-group" key={head}>
              <p className="nav-group-head">{head}</p>
              {items.map(([label, href]) => (
                <a key={label} href={href}
                  {...(isExt(href) ? { target: '_blank', rel: 'noreferrer' } : {})}
                  onClick={closeMenu}>{label}{isExt(href) ? " ↗" : ""}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell">
        <h1>为 Agent 造地基:<i>装得稳</i>、<i>记得住</i>、看得见后果。</h1>
        <p className="sub">
          四个开源项目,四条工程主张——确定性生命周期、可审计的持久记忆、把推演变成可提交的分支,以及一个本地优先的 Agent CLI。均以源码开放。
        </p>
        <div className="hero-act">
          <a className="btn btn-primary" href="#products">浏览四个产品 <Arrow /></a>
          <a className="btn btn-secondary" href="https://crates.io/crates/cordis-di-core" target="_blank" rel="noreferrer">
            <span className="mono" style={{ fontSize: 14 }}>cargo add cordis-di-core</span>
          </a>
        </div>
        <div className="hero-meta">
          <span>MIT 许可(metis 依仓库声明)</span>
          <span>9 个 crate</span>
          <span>77 个上游合并 PR</span>
          <span>维护者 Ricardo-M-L</span>
        </div>
      </div>
    </section>
  )
}

function Stage() {
  return (
    <section className="shell stage" aria-label="cordis-di 生命周期">
      <div className="stage-card">
        <div className="stage-glow" />
        <HeroField />
        <div className="stage-scrim" />
        <div className="stage-grain" />
        <div className="stage-copy">
          <p className="detail">旗舰 · cordis-di</p>
          <h2>每个副作用都有归属,每次重载都能退回。</h2>
          <p>
            Fiber 持有作用域内的全部资源,销毁按 LIFO 执行;reload 失败时,新作用域先回滚,旧运行时继续服务。
            插件因此可以热插拔,而不是"重启试试"。
          </p>
          <div className="stage-badges">
            <span className="badge">Fiber 生命周期</span>
            <span className="badge">分层 Context</span>
            <span className="badge">4 种事件派发</span>
            <span className="badge">Staged reload</span>
          </div>
        </div>
        <div className="stage-code">
          <div className="bar"><i /><i /><i /><span>src/main.rs — cordis-di</span></div>
          <pre><code>
            {STAGE_CODE.map((line, i) => (
              <React.Fragment key={i}>
                {Array.isArray(line) ? line.map(([t, c], j) => <span key={j} className={'s-' + c}>{t}</span>) : line}
              </React.Fragment>
            ))}
          </code></pre>
        </div>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section className="shell releases" id="products">
      <div className="sec-head">
        <h2>四个项目</h2>
        <a className="detail" href={GITHUB} target="_blank" rel="noreferrer">全部仓库 ↗</a>
      </div>
      <div className="cards-4">
        {PRODUCTS.map(p => (
          <article key={p.id} id={p.id} className={'rcard ' + p.tone}>
            <p className="detail">{p.label}</p>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="art">{p.art}</div>
            <div className="foot">
              {p.links.map(([l, h]) => (
                <a key={l} href={h}
                  {...(isExt(h) ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {l} {isExt(h) ? <Ext /> : <Arrow />}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Claim() {
  return (
    <section className="claim" id="claim">
      <div className="shell claim-in">
        <div>
          <h2>把不确定性关进笼子,而不是假装它不存在。</h2>
          <p>
            模型给的是提议,不是真理。所以我们造的东西都遵循同一条规矩:状态变化要显式、要可回滚、要留下痕迹——
            无论是插件的生命周期、记忆的演化,还是"未来"的分支。这些能力不靠提示词,靠代码结构。
          </p>
        </div>
        <div className="stats">
          <div className="stat"><b>77</b><span>已合并的上游 PR(agent 工具链生态)</span></div>
          <div className="stat"><b>9</b><span>cordis-di 独立 crate,已发布 crates.io</span></div>
          <div className="stat"><b>4</b><span>开源产品:框架 / 记忆 / 后果工作室 / Agent CLI</span></div>
          <div className="stat"><b>MIT</b><span>许可,无商业限制(metis 依仓库声明)</span></div>
        </div>
      </div>
    </section>
  )
}

function Notes() {
  return (
    <section className="shell notes" id="notes">
      <div className="sec-head">
        <h2>工程笔记</h2>
        <a className="detail" href="#top">回到顶部 ↑</a>
      </div>
      {NOTES.map(([no, tint, title, desc, who]) => (
        <a key={no} className="note" href={'#' + no.toLowerCase()}>
          <span className="note-tile" style={{ background: tint }}>{no}</span>
          <span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </span>
          <span className="who">{who}</span>
          <span className="go" style={{ color: 'rgba(20,20,19,.55)' }}><Arrow /></span>
        </a>
      ))}
    </section>
  )
}

function Cta() {
  return (
    <section className="shell cta">
      <h2>先读源码,再决定要不要用。</h2>
      <p>四个项目都在公开仓库里,提交历史、测试与发布流程可查。欢迎在 issue 里直接挑战设计。</p>
      <div className="cta-act">
        <a className="btn btn-primary" href={GITHUB} target="_blank" rel="noreferrer">打开 GitHub <Ext /></a>
        <a className="btn btn-secondary" href="https://docs.rs/cordis-di-core" target="_blank" rel="noreferrer">读文档</a>
      </div>
    </section>
  )
}

/* 页脚四栏(实测参照:栏宽 215/间隔 31.5,标题 12px/500,链接 12px #b0aea5;
 * 参照首栏堆叠两组,故「产品」栏再叠一组「资源」) */
const FOOT = [
  [
    ['产品', [
      ['cordis-di', '#cordis-di'],
      ['agent-memory', '#agent-memory'],
      ['Ifscape', '#ifscape'],
      ['metis', METIS],
    ]],
    ['资源', [
      ['crates.io · cordis-di-core', 'https://crates.io/crates/cordis-di-core'],
      ['docs.rs · cordis-di-core', 'https://docs.rs/cordis-di-core'],
      ['全部仓库', GITHUB],
    ]],
  ],
  [
    ['源码', [
      ['cordis-di 仓库', 'https://github.com/Ricardo-M-L/cordis-di'],
      ['agent-memory 仓库', 'https://github.com/Ricardo-M-L/agent-memory'],
      ['metis 仓库', METIS],
      ['metis 发布记录', METIS + '/releases'],
    ]],
  ],
  [
    ['metis', [
      ['最新版本 v0.4.59', METIS + '/releases/latest'],
      ['README', METIS + '#readme'],
      ['Issues', METIS + '/issues'],
      ['作者主页', GITHUB],
    ], '许可:依仓库声明'],
  ],
  [
    ['站点', [
      ['产品总览', '#products'],
      ['工程笔记', '#notes'],
      ['关于本站', '#claim'],
      ['回到顶部', '#top'],
    ]],
  ],
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell foot-top">
        <div className="foot-brandcol">
          <p className="foot-brand">Ricardo Labs</p>
          <p className="blurb">为 Agent 工程造地基:确定性生命周期、可审计记忆、可提交的推演,以及一个本地优先的 Agent CLI。</p>
          <p className="foot-copy">© 2026 Ricardo Labs · cordis-di / agent-memory / Ifscape 为 MIT 许可,metis 依仓库声明</p>
          <div className="foot-social">
            <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubMark /></a>
          </div>
        </div>
        {FOOT.map((groups) => (
          <div key={groups[0][0]}>
            {groups.map(([head, items, note]) => (
              <div className="foot-group" key={head}>
                <h3 className="foot-head">{head}</h3>
                {items.map(([label, href]) => (
                  <a key={label} href={href} {...(isExt(href) ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    {label}{isExt(href) ? ' ↗' : ''}
                  </a>
                ))}
                {note && <p className="foot-note">{note}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </footer>
  )
}

export default function App() {
  // 深链修复:浏览器解析 #anchor 发生在 React 挂载之前,那时目标元素还不存在,
  // 所以首次打开 .../#products 会停在页顶。挂载后自己补一次跳转(减去 sticky 顶栏高度)。
  React.useEffect(() => {
    const jump = () => {
      const h = window.location.hash
      if (h.length < 2) return
      let el = null
      try { el = document.querySelector(h) } catch { return }
      if (!el) return
      const y = el.getBoundingClientRect().top + window.scrollY - 92
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' })
    }
    jump()
    const raf = requestAnimationFrame(jump)
    const t = window.setTimeout(jump, 400)   // 等字体加载完、布局稳定后再校正一次
    return () => { cancelAnimationFrame(raf); window.clearTimeout(t) }
  }, [])

  return (
    <>
      <Nav />
      <Hero />
      <Stage />
      <Products />
      <ProductDetails />
      <Claim />
      <Notes />
      <Cta />
      <Footer />
    </>
  )
}
