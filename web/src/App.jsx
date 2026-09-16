import React from 'react'

const GITHUB = 'https://github.com/Ricardo-M-L'

const PRODUCTS = [
  {
    id: 'cordis-di',
    no: '01',
    name: 'cordis-di',
    zh: '类型化插件与依赖注入框架',
    desc: '把插件生命周期变成确定性契约:Fiber 作用域、分层 Context、四种派发模式的事件总线,以及失败自动回滚的 staged reload。',
    lang: 'Rust · v0.1.0 · crates.io',
    links: [
      ['GitHub', 'https://github.com/Ricardo-M-L/cordis-di'],
      ['crates.io', 'https://crates.io/crates/cordis-di-core'],
      ['docs.rs', 'https://docs.rs/cordis-di-core'],
    ],
    features: [
      ['Fiber 生命周期', '每个插件运行在受验证的作用域内,RAII 句柄 + LIFO 清理,作用域结束即回收全部副作用。'],
      ['分层 Context', '用显式类型与注册工厂取代 JS Proxy 魔法,服务查找在编译期检查。'],
      ['事件总线', '同步/异步监听、上下文过滤,serial / bail / waterfall / parallel 四种派发。'],
      ['Staged Reload', 'reload 失败先回滚新作用域的全部副作用,再保留旧运行时——失败的 reload 不弄脏正在运行的应用。'],
    ],
    code: `use cordis_di_core::{disposer, Fiber};

let fiber = Fiber::new();
let _effect = fiber.effect(|| {
    disposer(|| println!("scope ended"))
});

fiber.dispose(); // disposers 以 LIFO 顺序运行`,
  },
  {
    id: 'agent-memory',
    no: '02',
    name: 'agent-memory',
    zh: 'Agent 持久化记忆',
    desc: '默认 SQLite、可选 Neo4j。不搭数据库服务就能保存事实、检索记忆、查询实体关系;被取代的记忆和失效的关系都保留可查。',
    lang: 'Rust · v0.1.1 · MIT',
    links: [['GitHub', 'https://github.com/Ricardo-M-L/agent-memory']],
    features: [
      ['三类记忆', '工作 / 情景 / 语义记忆,SQLite 持久化,默认离线运行。'],
      ['混合检索', 'BM25 + 特征哈希向量,时效、相关度、重要性加权排序。'],
      ['事实演化', 'supersede 显式替换记忆,replace_relation 自动失效旧边,历史可审计。'],
      ['实体图谱', '实体、关系、多跳路径、连通分量、手动实体合并;可选 Neo4j 后端。'],
    ],
    code: `let memory = AgentMemory::open("agent.db")?;
let old = memory.remember_fact(
    Scope::User, "alice",
    "Alice lives in Beijing")?;
memory.supersede(
    Scope::User, "alice", old.id,
    "Alice lives in Shanghai")?;`,
  },
  {
    id: 'ifscape',
    no: '03',
    name: 'Ifscape',
    zh: '后果工作室 · Consequence Studio',
    desc: '不是让 Agent 动手然后祈祷结果正确,而是指着工件表达意图,比较 2-4 个有界的孤立未来,检查证据后显式提交或回滚。',
    lang: 'TypeScript + Rust · pre-alpha · 本地预览',
    links: [['作者 GitHub', GITHUB]],
    features: [
      ['Living Atlas', '一张活地图连接代码、时间线、演示文稿与可玩的 3D 世界,四类工件共用一套事务协议。'],
      ['有界候选未来', '每次规划返回 2-4 个完整候选分支;世界推演始终标注 model-prediction / not-observed。'],
      ['显式提交', '推荐排名永远只是建议:必须由人显式选择候选,提交门才会打开。'],
      ['Tauri 信任边界', 'macOS 优先;Rust 持有目录权限与凭证,渲染层拿不到原始密钥。'],
    ],
    code: `意图 → 候选未来(2-4)
     → 结构化推荐(仅供参考)
     → 人工显式选择
     → 3 检查点 × 4 工件审查
     → 受保护的提交 / 回滚`,
  },
]

const RESEARCH = [
  ['R-01', '从 Proxy 到类型系统:cordis 的 Rust 移植史', '为什么 JS 的动态代理魔法,到了 Rust 要变成显式工厂与生命周期契约。'],
  ['R-02', 'Agent 记忆的三个时间尺度', '工作记忆撑住会话,情景记忆串起轨迹,语义记忆沉淀事实——三种遗忘策略各不相同。'],
  ['R-03', '把"未来"做成可审查的分支', 'Ifscape 的事务协议:推演结果必须标注 model-prediction,提交门只对人打开。'],
]

const Arrow = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GithubMark = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
)

function Nav() {
  return (
    <header className="nav">
      <a className="nav-logo" href="#top">RICARDO<em>·</em>LABS</a>
      <nav className="nav-links" aria-label="主导航">
        <a href="#research">研究</a>
        <a href="#cordis-di">cordis-di</a>
        <a href="#agent-memory">agent-memory</a>
        <a href="#ifscape">Ifscape</a>
        <a href="#about">关于</a>
      </nav>
      <div className="nav-cta-group">
        <a className="btn btn-sm btn-ghost" href={GITHUB} target="_blank" rel="noreferrer">
          <GithubMark /> GitHub
        </a>
        <a className="btn btn-sm btn-dark" href="#products">产品 <Arrow size={12} /></a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero wrap" id="top">
      <p className="hero-kicker reveal">Ricardo Labs · Agent 基础设施</p>
      <h1 className="hero-title reveal">
        装得稳<span className="tick">,</span>记得住<span className="tick">,</span>
        <br />看得见后果<span className="tick">.</span>
      </h1>
      <div className="hero-side reveal">
        <p className="hero-desc">
          三个开源项目,一套关于 Agent 工程的完整主张:确定性生命周期、持久化记忆、可检查的未来。
        </p>
        <div className="hero-cta">
          <a className="btn btn-accent" href="#products">浏览产品 <Arrow size={13} /></a>
          <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noreferrer">
            <GithubMark /> 访问 GitHub
          </a>
        </div>
        <p className="hero-meta">RUST / TYPESCRIPT · MIT · EST. 2026</p>
      </div>
    </section>
  )
}

function Research() {
  return (
    <section className="research wrap" id="research">
      <div className="research-head">
        <h2>研究与笔记</h2>
        <span className="count">{String(RESEARCH.length).padStart(2, '0')} 篇</span>
      </div>
      {RESEARCH.map(([no, title, desc]) => (
        <a key={no} className="row reveal" href={'#' + no.toLowerCase()}>
          <span className="row-no">{no}</span>
          <span className="row-body">
            <h3>{title}</h3>
            <p>{desc}</p>
          </span>
          <span className="row-arr"><Arrow /></span>
        </a>
      ))}
    </section>
  )
}

function Product({ p }) {
  return (
    <section className={'product wrap'} id={p.id}>
      <div className="product-grid">
        <div className="reveal">
          <span className="product-no">{p.no} / {p.lang}</span>
          <h2>{p.name}</h2>
          <p className="product-zh">{p.zh}</p>
          <p className="product-desc">{p.desc}</p>
          <div className="product-links">
            {p.links.map(([label, href]) => (
              <a key={label} className="plink" href={href} target="_blank" rel="noreferrer">
                {label} <Arrow size={11} />
              </a>
            ))}
          </div>
          <figure className="term" style={{ margin: 'var(--space-xl) 0 0' }}>
            <pre><code>{p.code}</code></pre>
          </figure>
        </div>
        <ul className="feat-list reveal">
          {p.features.map(([t, d]) => (
            <li key={t}>
              <span className="dot" aria-hidden="true" />
              <span>
                <strong>{t}</strong>
                <span>{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Products({ children }) {
  return <div id="products">{children}</div>
}

function BigCta() {
  return (
    <section className="cta wrap">
      <h2 className="cta-title reveal">
        模型给的是提议,不是真理<span className="accent">.</span>
      </h2>
      <div className="cta-actions reveal">
        <a className="btn btn-dark" href={GITHUB} target="_blank" rel="noreferrer">
          <GithubMark /> 在 GitHub 上阅读源码
        </a>
        <a className="btn btn-ghost" href="#top">回到顶部 ↑</a>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about wrap" id="about">
      <div>
        <h2>关于</h2>
        <p>
          Ricardo(Ricardo-M-L),开源 Agent 工具链长期贡献者。Ricardo Labs
          不追热点,只造 Agent 工程里真正缺的地基。
        </p>
      </div>
      <div className="about-nums">
        <div className="num"><b>77</b><span>上游已合并 PR(ragflow / ag2 / diffusers / pydantic-ai 等)</span></div>
        <div className="num"><b>3</b><span>开源产品 · cordis-di / agent-memory / Ifscape</span></div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <p className="footer-statement">
            装得稳<span className="accent">·</span>记得住<span className="accent">·</span>看得见后果
          </p>
          <a className="btn btn-sm btn-dark" href={GITHUB} target="_blank" rel="noreferrer">
            <GithubMark /> Ricardo-M-L
          </a>
        </div>
        <div className="footer-cols">
          <div className="fcol">
            <b>产品</b>
            <a href="#cordis-di">cordis-di</a>
            <a href="#agent-memory">agent-memory</a>
            <a href="#ifscape">Ifscape</a>
          </div>
          <div className="fcol">
            <b>仓库</b>
            <a href="https://github.com/Ricardo-M-L/cordis-di" target="_blank" rel="noreferrer">Ricardo-M-L/cordis-di</a>
            <a href="https://github.com/Ricardo-M-L/agent-memory" target="_blank" rel="noreferrer">Ricardo-M-L/agent-memory</a>
            <a href="https://github.com/Ricardo-M-L" target="_blank" rel="noreferrer">Ricardo-M-L</a>
          </div>
          <div className="fcol">
            <b>本站</b>
            <a href="https://ricardo-m-l.github.io/ricardo-labs/">GitHub Pages</a>
            <a href="#research">研究与笔记</a>
            <a href="#about">关于</a>
          </div>
        </div>
        <div className="footer-base">
          <span>© 2026 Ricardo Labs · MIT</span>
          <span>Built with restraint · Space Grotesk / Inter</span>
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
      <Research />
      <Products>
        {PRODUCTS.map(p => <Product key={p.id} p={p} />)}
      </Products>
      <BigCta />
      <About />
      <Footer />
    </>
  )
}
