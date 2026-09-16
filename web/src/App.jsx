import React from 'react'

const GITHUB = 'https://github.com/Ricardo-M-L'

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

/* ---------- 内容(全部为项目事实) ---------- */
const NL = '\n'
const PRODUCTS = [
  {
    id: 'cordis-di', tone: 't-oat', label: '01 · Rust · crates.io',
    title: 'cordis-di', desc: '类型化插件与依赖注入。Fiber 生命周期把"什么时候清理"变成确定性契约,staged reload 失败会先回滚新作用域、保住旧运行时。',
    art: <ArtScopes />,
    links: [['仓库', 'https://github.com/Ricardo-M-L/cordis-di'], ['crate', 'https://crates.io/crates/cordis-di-core']],
  },
  {
    id: 'agent-memory', tone: 't-manilla', label: '02 · Rust · SQLite',
    title: 'agent-memory', desc: '不搭数据库服务就能存事实:混合检索（BM25 + 向量）加权时效与重要性,supersede 显式演化记忆,历史全程可审计。',
    art: <ArtRetrieval />,
    links: [['仓库', 'https://github.com/Ricardo-M-L/agent-memory']],
  },
  {
    id: 'ifscape', tone: 't-kraft', label: '03 · TypeScript + Rust · 本地预览',
    title: 'Ifscape', desc: '后果工作室:每次规划只给 2–4 个有界的候选未来,推演结果一律标注 model-prediction,提交门只对人打开。',
    art: <ArtFutures />,
    links: [['作者主页', GITHUB]],
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
function Nav() {
  return (
    <header className="nav">
      <div className="shell nav-in">
        <a className="wordmark" href="#top">Ricardo Labs<em>.</em></a>
        <nav className="nav-links" aria-label="主导航">
          <a href="#products">产品</a>
          <a href="#claim">关于</a>
          <a href="#notes">笔记</a>
          <a href="#cordis-di">cordis-di</a>
          <a href="#agent-memory">agent-memory</a>
          <a href="#ifscape">Ifscape</a>
        </nav>
        <a className="btn btn-primary btn-sm" href={GITHUB} target="_blank" rel="noreferrer">
          GitHub <Ext />
        </a>
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
          三个开源项目,三条工程主张——确定性生命周期、可审计的持久记忆、把推演变成可提交的分支。均以源码开放。
        </p>
        <div className="hero-act">
          <a className="btn btn-primary" href="#products">浏览三个产品 <Arrow /></a>
          <a className="btn btn-secondary" href="https://crates.io/crates/cordis-di-core" target="_blank" rel="noreferrer">
            <span className="mono" style={{ fontSize: 14 }}>cargo add cordis-di-core</span>
          </a>
        </div>
        <div className="hero-meta">
          <span>MIT 许可</span>
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
        <h2>三个项目</h2>
        <a className="detail" href={GITHUB} target="_blank" rel="noreferrer">全部仓库 ↗</a>
      </div>
      <div className="cards-3">
        {PRODUCTS.map(p => (
          <article key={p.id} id={p.id} className={'rcard ' + p.tone}>
            <p className="detail">{p.label}</p>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="art">{p.art}</div>
            <div className="foot">
              {p.links.map(([l, h]) => (
                <a key={l} href={h} target="_blank" rel="noreferrer">{l} <Arrow /></a>
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
          <div className="stat"><b>3</b><span>开源产品:框架 / 记忆 / 后果工作室</span></div>
          <div className="stat"><b>MIT</b><span>许可,无商业限制</span></div>
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
      <p>三个项目都在公开仓库里,提交历史、测试与发布流程可查。欢迎在 issue 里直接挑战设计。</p>
      <div className="cta-act">
        <a className="btn btn-primary" href={GITHUB} target="_blank" rel="noreferrer">打开 GitHub <Ext /></a>
        <a className="btn btn-secondary" href="https://docs.rs/cordis-di-core" target="_blank" rel="noreferrer">读文档</a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="foot-top">
          <div>
            <p className="foot-brand">Ricardo Labs</p>
            <p className="blurb">为 Agent 工程造地基:确定性生命周期、可审计记忆、可提交的推演。</p>
          </div>
          <div>
            <h4>产品</h4>
            <a href="#cordis-di">cordis-di</a>
            <a href="#agent-memory">agent-memory</a>
            <a href="#ifscape">Ifscape</a>
          </div>
          <div>
            <h4>仓库</h4>
            <a href="https://github.com/Ricardo-M-L/cordis-di" target="_blank" rel="noreferrer">cordis-di ↗</a>
            <a href="https://github.com/Ricardo-M-L/agent-memory" target="_blank" rel="noreferrer">agent-memory ↗</a>
            <a href="https://crates.io/crates/cordis-di-core" target="_blank" rel="noreferrer">crates.io ↗</a>
          </div>
          <div>
            <h4>站点</h4>
            <a href="#products">产品总览</a>
            <a href="#notes">工程笔记</a>
            <a href="#claim">关于本站</a>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 Ricardo Labs · MIT</span>
          <span>版式参照 anthropic.com 实测骨架重建 · 字体 Source Serif 4 / DM Sans / JetBrains Mono</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Stage />
      <Products />
      <Claim />
      <Notes />
      <Cta />
      <Footer />
    </>
  )
}
