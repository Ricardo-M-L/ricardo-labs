import React from 'react'

const PRODUCTS = [
  {
    id: 'cordis-di',
    name: 'cordis-di',
    zh: '类型化插件与依赖注入框架',
    slogan: '装得稳',
    desc: '把插件生命周期变成确定性契约:Fiber 作用域、分层 Context、多种派发模式的事件总线,以及失败自动回滚的 staged reload。',
    lang: 'Rust',
    status: 'v0.1.0 · 已发布 crates.io',
    accent: '#e8590c',
    gradient: 'linear-gradient(135deg,#1f1209 0%,#4d2606 55%,#8a3d08 100%)',
    links: [
      { label: 'GitHub', href: 'https://github.com/Ricardo-M-L/cordis-di' },
      { label: 'crates.io', href: 'https://crates.io/crates/cordis-di-core' },
      { label: 'docs.rs', href: 'https://docs.rs/cordis-di-core' },
    ],
    features: [
      ['Fiber 生命周期', '每个插件运行在受验证的作用域内,RAII 句柄 + LIFO 清理,作用域结束即回收全部副作用。'],
      ['分层 Context', '用显式类型与注册工厂取代 JS Proxy 魔法,服务查找在编译期检查。'],
      ['事件总线', '同步/异步监听、上下文过滤、serial / bail / waterfall / parallel 四种派发。'],
      ['Staged Reload', 'reload 失败时先回滚新作用域的全部副作用,再保留旧运行时——失败的 reload 不会弄脏正在运行的应用。'],
      ['文件热重载信号', '递归文件监听、防抖、传递依赖 reload 事件,应用自行映射到模块工厂。'],
      ['9 个独立 crate', 'core / timer / logger / utils / group / include / loader / hmr / create,按需取用。'],
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
    name: 'agent-memory',
    zh: 'Agent 持久化记忆',
    slogan: '记得住',
    desc: '默认 SQLite、可选 Neo4j。不搭数据库服务就能保存事实、检索记忆、查询实体关系;被取代的记忆和失效的关系都保留可查。',
    lang: 'Rust',
    status: 'v0.1.1 · MIT',
    accent: '#1971c2',
    gradient: 'linear-gradient(135deg,#081226 0%,#0b3353 55%,#0f5a8a 100%)',
    links: [
      { label: 'GitHub', href: 'https://github.com/Ricardo-M-L/agent-memory' },
    ],
    features: [
      ['三类记忆', '工作 / 情景 / 语义记忆,SQLite 持久化,默认离线运行。'],
      ['混合检索', 'BM25 + 特征哈希向量,时效、相关度、重要性加权求和排序。'],
      ['事实演化', 'supersede 显式替换记忆,单值关系 replace_relation 自动失效旧边,历史可审计。'],
      ['实体图谱', '实体、关系、多跳路径、连通分量、手动实体合并;可选 Neo4j 后端。'],
      ['LLM 可选', '规则抽取器开箱即用,LLM 抽取与模型嵌入按需注入;检索结果作为不可信上下文交给模型。'],
      ['CLI + 库', 'cargo install 即得 CLI,或作为库嵌入任意 Rust Agent。'],
    ],
    code: `let memory = AgentMemory::open("agent-memory.db")?;
let old = memory.remember_fact(
    Scope::User, "alice", "Alice lives in Beijing")?;
memory.supersede(
    Scope::User, "alice", old.id,
    "Alice lives in Shanghai")?;`,
  },
  {
    id: 'ifscape',
    name: 'Ifscape',
    zh: '后果工作室 · Consequence Studio',
    slogan: '看得见后果',
    desc: '不是让 Agent 动手然后祈祷结果正确,而是指着工件表达意图,比较 2-4 个有界的孤立未来,检查证据后显式提交或回滚。',
    lang: 'TypeScript + Rust',
    status: 'pre-alpha · 本地优先开发者预览',
    accent: '#7048e8',
    gradient: 'linear-gradient(135deg,#150826 0%,#2f1a5c 55%,#5433a8 100%)',
    links: [
      { label: '本地项目 · 暂未公开仓库', href: '#ifscape' },
    ],
    features: [
      ['Living Atlas', '一张活地图连接代码、时间线、演示文稿与可玩的 3D 世界,四类工件共用一套事务协议。'],
      ['有界候选未来', '每次规划返回 2-4 个完整候选分支;世界推演始终标注 model-prediction / not-observed。'],
      ['显式提交', '推荐排名永远只是建议:必须由人显式选择候选,提交门才会打开。'],
      ['检查点证据', '三个预览检查点 × 四类工件,变更面、来源与差异全部可检查。'],
      ['确定性 Agent SDK', '有限视野与调用预算、证据关联评分、取消、陈旧分支保护、提交与回滚。'],
      ['Tauri 信任边界', 'macOS 优先;Rust 持有目录权限与凭证,渲染层拿不到原始密钥。'],
    ],
    code: `意图 → 候选未来(2-4)
     → 结构化推荐(仅供参考)
     → 人工显式选择
     → 3 检查点 × 4 工件审查
     → 受保护的提交 / 回滚`,
  },
]

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
)

function Nav() {
  return (
    <header className="nav">
      <a className="nav-logo" href="#top">RICARDO<span> LABS</span></a>
      <nav className="nav-links">
        <a href="#products">产品</a>
        <a href="#philosophy">理念</a>
        <a href="#about">关于</a>
      </nav>
      <a className="btn btn-dark btn-sm" href="https://github.com/Ricardo-M-L" target="_blank" rel="noreferrer">
        <GithubIcon /> GitHub
      </a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <p className="hero-eyebrow">Ricardo Labs · 开源 Agent 基础设施</p>
      <h1 className="hero-title">
        让 Agent 装得稳、记得住、<br />看得见后果。
      </h1>
      <p className="hero-sub">
        三个开源项目,一套关于 Agent 工程的完整主张:<br className="mobile-hide" />
        确定性生命周期、持久化记忆、可检查的未来。
      </p>
      <div className="hero-cta">
        <a className="btn btn-dark" href="#products">浏览产品 <Arrow /></a>
        <a className="btn btn-ghost" href="https://github.com/Ricardo-M-L" target="_blank" rel="noreferrer">
          <GithubIcon /> 访问 GitHub
        </a>
      </div>
    </section>
  )
}

function ProductCards() {
  return (
    <section className="section" id="products">
      <div className="container">
        <h2 className="section-title">三件作品,一个主张</h2>
        <div className="cards">
          {PRODUCTS.map(p => (
            <a key={p.id} className={'card card-' + p.id} href={'#' + p.id} style={{ background: p.gradient }}>
              <div className="card-top">
                <span className="card-slogan">{p.slogan}</span>
              </div>
              <div className="card-bottom">
                <h3>{p.name}</h3>
                <p className="card-zh">{p.zh}</p>
                <p className="card-desc">{p.desc}</p>
                <span className="card-more">了解详情 <Arrow /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductDetail({ p, flip }) {
  return (
    <section className={'section detail detail-' + p.id} id={p.id}>
      <div className="container">
        <div className={'detail-grid' + (flip ? ' flip' : '')}>
          <div className="detail-copy">
            <p className="detail-kicker" style={{ color: p.accent }}>{p.lang} · {p.status}</p>
            <h2>{p.name}</h2>
            <p className="detail-zh">{p.zh}</p>
            <p className="detail-desc">{p.desc}</p>
            <div className="detail-links">
              {p.links.map(l => (
                <a key={l.label} href={l.href} target={l.href.startsWith('#') ? undefined : '_blank'} rel="noreferrer" className="detail-link">
                  {l.label} <Arrow />
                </a>
              ))}
            </div>
          </div>
          <div className="detail-visual">
            <div className="code-window">
              <div className="code-dots"><i /><i /><i /></div>
              <pre><code>{p.code}</code></pre>
            </div>
          </div>
        </div>
        <ul className="feature-grid">
          {p.features.map(([t, d]) => (
            <li key={t}>
              <strong>{t}</strong>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Philosophy() {
  return (
    <section className="section section-dark" id="philosophy">
      <div className="container">
        <h2 className="section-title">为什么是这三件</h2>
        <div className="philo-grid">
          <div>
            <h3>骨架</h3>
            <p>插件系统不该是运行时魔法。cordis-di 用 Rust 类型系统把生命周期、作用域与重载变成可验证的契约。</p>
          </div>
          <div>
            <h3>记忆</h3>
            <p>没有持久化记忆的 Agent 每次从零开始。agent-memory 让事实可存、可查、可演化,且保留全部历史证据。</p>
          </div>
          <div>
            <h3>未来</h3>
            <p>Agent 的建议不该等于现实。Ifscape 把"未来"变成可以并列比较、逐点检查、显式采纳或丢弃的分支。</p>
          </div>
        </div>
        <blockquote>
          “模型给的是提议,不是真理。工程的责任是让每一步可验证、可回退。”
        </blockquote>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div>
          <h2 className="section-title">关于</h2>
          <p>
            Ricardo(Ricardo-M-L),开源 Agent 工具链的长期贡献者,向 ragflow、ag2、diffusers、
            pydantic-ai、unsloth、sglang 等项目提交过 70+ 已合并 PR。
            Ricardo Labs 是他的个人项目集合:不追热点,只造 Agent 工程里真正缺的地基。
          </p>
        </div>
        <div className="about-links">
          <a href="https://github.com/Ricardo-M-L" target="_blank" rel="noreferrer"><GithubIcon /> github.com/Ricardo-M-L</a>
          <a href="https://github.com/Ricardo-M-L/cordis-di" target="_blank" rel="noreferrer">cordis-di ↗</a>
          <a href="https://github.com/Ricardo-M-L/agent-memory" target="_blank" rel="noreferrer">agent-memory ↗</a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>© 2026 Ricardo Labs · 保留部分权利(MIT)</span>
        <span>cordis-di · agent-memory · Ifscape</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <ProductCards />
      {PRODUCTS.map((p, i) => <ProductDetail key={p.id} p={p} flip={i % 2 === 1} />)}
      <Philosophy />
      <About />
      <Footer />
    </>
  )
}
