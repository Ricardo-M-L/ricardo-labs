import React from 'react'

const GITHUB = 'https://github.com/Ricardo-M-L'

const Arrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GithubMark = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
)

const PRODUCTS = [
  {
    id: 'cordis-di', no: '01', name: 'cordis-di',
    zh: '类型化插件与依赖注入框架 — Rust',
    desc: '插件生命周期成为确定性契约:Fiber 作用域、分层 Context、四种事件派发、失败自动回滚的 staged reload。9 个独立 crate,已发布 crates.io。',
    featured: true,
    links: [
      ['GitHub', 'https://github.com/Ricardo-M-L/cordis-di'],
      ['crates.io', 'https://crates.io/crates/cordis-di-core'],
      ['docs.rs', 'https://docs.rs/cordis-di-core'],
    ],
    features: [
      ['Fiber 生命周期', 'RAII 句柄 + LIFO 清理,作用域结束即回收全部副作用。'],
      ['分层 Context', '显式类型与注册工厂取代 Proxy 魔法,查找在编译期检查。'],
      ['事件总线', 'serial / bail / waterfall / parallel 四种派发模式。'],
      ['Staged Reload', 'reload 失败先回滚新作用域,保留旧运行时。'],
    ],
    code: `use cordis_di_core::{disposer, Fiber};

let fiber = Fiber::new();
let _e = fiber.effect(|| {
    disposer(|| println!("scope ended"))
});
fiber.dispose(); // LIFO 回收`,
  },
  {
    id: 'agent-memory', no: '02', name: 'agent-memory',
    zh: 'Agent 持久化记忆 — Rust · SQLite/Neo4j',
    desc: '不搭数据库服务即可保存事实、混合检索、查询实体图谱;supersede 显式演化记忆,历史全部可审计。v0.1.1 · MIT。',
    featured: false,
    links: [['GitHub', 'https://github.com/Ricardo-M-L/agent-memory']],
    features: [
      ['三类记忆', '工作/情景/语义,SQLite 持久化,默认离线。'],
      ['混合检索', 'BM25 + 特征哈希向量,时效/相关度/重要性加权。'],
      ['事实演化', 'replace_relation 自动失效旧边,可回溯。'],
      ['实体图谱', '多跳路径、连通分量、可选 Neo4j 后端。'],
    ],
    code: `let mem = AgentMemory::open("agent.db")?;
let old = mem.remember_fact(
    Scope::User, "alice", "…Beijing")?;
mem.supersede(Scope::User, "alice",
    old.id, "…Shanghai")?;`,
  },
  {
    id: 'ifscape', no: '03', name: 'Ifscape',
    zh: '后果工作室 · Living Atlas — TS + Rust',
    desc: '指着工件表达意图,比较 2-4 个有界的孤立未来,检查证据后显式提交或回滚。推演结果永远标注 model-prediction。pre-alpha 本地预览。',
    featured: false,
    links: [['作者 GitHub', GITHUB]],
    features: [
      ['Living Atlas', '代码、时间线、演示与 3D 世界共用一套事务协议。'],
      ['有界候选未来', '每次规划返回 2-4 个完整候选分支。'],
      ['显式提交', '推荐只是建议,提交门只对人打开。'],
      ['Tauri 信任边界', 'Rust 持有凭证,渲染层拿不到密钥。'],
    ],
    code: `意图 → 候选未来(2-4)
→ 推荐(仅供参考)
→ 人工显式选择
→ 3 检查点 × 4 工件
→ 提交 / 回滚`,
  },
]

const RESEARCH = [
  ['R-01', '从 Proxy 到类型系统:cordis 的 Rust 移植史', 'JS 动态代理的魔法,到 Rust 变成显式工厂与生命周期契约。'],
  ['R-02', 'Agent 记忆的三个时间尺度', '工作记忆撑住会话,情景记忆串起轨迹,语义记忆沉淀事实。'],
  ['R-03', '把"未来"做成可审查的分支', 'Ifscape 事务协议:推演必须标注 model-prediction,提交门只对人开。'],
]

function Nav() {
  return (
    <header className="nav">
      <a className="nav-logo" href="#top">RICARDO<b>·</b>LABS</a>
      <nav className="nav-links" aria-label="主导航">
        <a href="#products"><span className="n">01</span>产品</a>
        <a href="#research"><span className="n">02</span>研究</a>
        <a href="#cordis-di"><span className="n">03</span>cordis-di</a>
        <a href="#agent-memory"><span className="n">04</span>agent-memory</a>
        <a href="#ifscape"><span className="n">05</span>Ifscape</a>
      </nav>
      <div className="nav-cta">
        <a className="btn btn-sm btn-ghost" href={GITHUB} target="_blank" rel="noreferrer">
          <GithubMark size={13} /> GitHub
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-main">
            <p className="hero-kicker">/// OPEN-SOURCE AGENT INFRASTRUCTURE</p>
            <h1 className="hero-title">
              装得稳<span className="gold">_</span><br />
              记得住<span className="purple">_</span><br />
              看得见后果<span className="gold">_</span>
            </h1>
            <p className="hero-sub">
              三个开源项目,一套 Agent 工程主张:确定性生命周期、持久化记忆、可检查的未来。
            </p>
            <div className="hero-cta">
              <a className="btn btn-gold" href="#products">浏览产品 <Arrow /></a>
              <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noreferrer">
                <GithubMark size={13} /> Ricardo-M-L
              </a>
            </div>
          </div>
          <aside className="hero-aside">
            <div className="hero-install">
              <p className="lbl">$ CARGO ADD</p>
              <pre><code>{'cargo add cordis-di-core\ncargo install agent-memory'}</code></pre>
            </div>
            <div className="hero-stats">
              <div className="hstat"><b>77</b><span>已合并上游 PR</span></div>
              <div className="hstat"><b>3</b><span>开源产品</span></div>
              <div className="hstat"><b>MIT</b><span>许可证</span></div>
            </div>
            <p className="hero-aside-note">
              ragflow / ag2 / diffusers / pydantic-ai / unsloth / sglang …<br />
              <em>长期贡献者,不是套壳营销页。</em>
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section className="wrap" id="products">
      <div className="section-head">
        <h2>产品</h2>
        <span className="tag">/// 03 PROJECTS</span>
      </div>
      <div className="bento">
        {PRODUCTS.map(p => (
          <article key={p.id} id={p.id} className={'prod' + (p.featured ? ' prod-featured' : '')}>
            <span className="prod-no">[{p.no}]</span>
            <h3>{p.name}</h3>
            <p className="zh">{p.zh}</p>
            <p className="desc">{p.desc}</p>
            <div className="prod-links">
              {p.links.map(([l, h]) => (
                <a key={l} className="chip" href={h} target="_blank" rel="noreferrer">{l} ↗</a>
              ))}
            </div>
            <ul className="feat">
              {p.features.map(([t, d]) => (
                <li key={t}><span><strong>{t}</strong><span>{d}</span></span></li>
              ))}
            </ul>
            <figure className="term">
              <pre><code>{p.code}</code></pre>
            </figure>
          </article>
        ))}
      </div>
    </section>
  )
}

function Research() {
  return (
    <section className="wrap" id="research">
      <div className="section-head">
        <h2>研究与笔记</h2>
        <span className="tag">/// {String(RESEARCH.length).padStart(2, '0')} NOTES</span>
      </div>
      {RESEARCH.map(([no, t, d]) => (
        <a key={no} className="row" href={'#' + no.toLowerCase()}>
          <span className="row-no">{no}</span>
          <span><h3>{t}</h3><p>{d}</p></span>
          <span className="row-arr"><Arrow /></span>
        </a>
      ))}
    </section>
  )
}

function Cta() {
  return (
    <div className="wrap">
      <div className="cta-block">
        <h2>模型给的是提议,不是真理。</h2>
        <a className="btn btn-ink" href={GITHUB} target="_blank" rel="noreferrer">
          <GithubMark size={13} /> 阅读源码
        </a>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="fcell">
            <b>RICARDO·LABS</b>
            <p>不追热点,只造 Agent 工程里真正缺的地基。装得稳、记得住、看得见后果。</p>
          </div>
          <div className="fcell">
            <b>产品</b>
            <a href="#cordis-di">cordis-di</a>
            <a href="#agent-memory">agent-memory</a>
            <a href="#ifscape">Ifscape</a>
          </div>
          <div className="fcell">
            <b>仓库</b>
            <a href="https://github.com/Ricardo-M-L/cordis-di" target="_blank" rel="noreferrer">cordis-di ↗</a>
            <a href="https://github.com/Ricardo-M-L/agent-memory" target="_blank" rel="noreferrer">agent-memory ↗</a>
            <a href={GITHUB} target="_blank" rel="noreferrer">Ricardo-M-L ↗</a>
          </div>
          <div className="fcell">
            <b>本站</b>
            <a href="#research">研究笔记</a>
            <a href="#top">回到顶部</a>
          </div>
        </div>
        <div className="footer-base">
          <span>© 2026 RICARDO LABS · MIT</span>
          <span>INTER / JETBRAINS MONO · BRUTALIST BUILD</span>
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
      <Products />
      <Research />
      <Cta />
      <Footer />
    </>
  )
}
