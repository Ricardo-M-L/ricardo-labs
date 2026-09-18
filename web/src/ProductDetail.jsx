import React from 'react'
import './product-detail.css'

/* 同页产品详情 —— 每个产品一块(不是独立页面),卡片上的「了解详情」直接跳到对应区块。
 * 结构照站点既有的 anthropic 骨架:eyebrow 小字 → 衬线大标题 → 导语 → 三个要点 → 规格块 → 链接行。
 * 所有事实取自各仓库现状;metis 的 license 在 GitHub 上是 "Other",故不写 MIT。 */

export const DETAIL_IDS = ['p-cordis-di', 'p-agent-memory', 'p-ifscape', 'p-metis']

const DETAILS = [
  {
    id: 'p-cordis-di',
    eyebrow: '01 · Rust · crates.io · MIT',
    title: 'cordis-di',
    lead: '类型化插件与依赖注入。插件声明自己要什么、框架保证装配顺序;需要回收时按声明的逆序拆掉,而不是让资源自生自灭。',
    points: [
      ['清理是契约,不是习惯', 'Fiber 生命周期把"什么时候释放"写进类型里:作用域一撤,持有物按 LIFO 释放,不靠人的自觉。'],
      ['换版本失败就先回滚', 'staged reload 在隔离作用域里装配新版本;装配失败就回滚,旧运行时继续服务,不会半死不活。'],
      ['按需依赖,不背整包', 'workspace 拆成 9 个 crate,已在 crates.io 发布,最小可以从 cordis-di-core 开始。'],
    ],
    code: ['cargo add cordis-di-core', '', '# 依赖在插件里声明,顺序由框架推导', 'core: Fiber / 作用域 / LIFO 释放'],
    links: [['仓库', 'https://github.com/Ricardo-M-L/cordis-di'], ['crate', 'https://crates.io/crates/cordis-di-core']],
  },
  {
    id: 'p-agent-memory',
    eyebrow: '02 · Rust · SQLite · MIT',
    title: 'agent-memory',
    lead: '给 Agent 用的持久化记忆:一个 SQLite 文件,不用起数据库服务,记得住事实,也说得清为什么记得。',
    points: [
      ['两路检索,一个结果', 'BM25 管"原话",向量管"意思",混合打分后一起排序,避免只靠语义漂移或只靠字面错配。'],
      ['老记忆会自己降权', '打分把时效与重要性算进去,不常用的记忆自然沉下去,不需要人工清理表。'],
      ['改记忆留链条', 'supersede 显式演化:新版本覆盖旧版本时链条保留,任何一条记忆都能回溯到它的来历。'],
    ],
    code: ['memory.db        # 单文件,SQLite', 'retrieve: bm25 ⊕ vector ⊕ recency ⊕ importance', 'supersede: old → new   # 历史保留'],
    links: [['仓库', 'https://github.com/Ricardo-M-L/agent-memory']],
  },
  {
    id: 'p-ifscape',
    eyebrow: '03 · TypeScript + Rust · 本地预览 · MIT',
    title: 'Ifscape',
    lead: '后果工作室,也叫 Living Atlas:在想清楚之前,先把后果摆到桌面上——但只摆有限的几个。',
    points: [
      ['只给有界的候选未来', '每次规划产出 2–4 个候选,不给"无限可能"的幻觉;选项少,才谈得上比较。'],
      ['推演标注来源', '每一条未来都标着 model-prediction:这是模型的推测,不是预言,别把它当事实用。'],
      ['提交门只对人打开', '机器可以提议、可以推演、可以算代价,落地那一步必须由人签。'],
    ],
    code: ['intent → futures[2..4] → stakes', 'label: model-prediction', 'gate: human-only'],
    links: [['作者主页', 'https://github.com/Ricardo-M-L']],
  },
  {
    id: 'p-metis',
    eyebrow: '04 · Go · CLI · 许可:依仓库声明',
    title: 'metis',
    lead: '本地优先的 Agent CLI:一个流式循环、16 个内置工具、多家 LLM、三层记忆,在终端里跑;也能作为 ACP server 被别的客户端接进去。',
    points: [
      ['边生成边执行', '流式 agent loop:模型输出、工具调用与结果在同一条流里推进,不用等整段回复落地。'],
      ['工具与模型都可换', '16 个内置工具开箱可用,不用自己拼工具层;provider 只换一行配置,循环本身不动。'],
      ['记忆分三层', '工作 / 情景 / 语义分开存:当轮上下文、发生过什么、以及沉淀下来的规律,不混在一个池子里。'],
    ],
    code: ['loop:    stream → tool call → observe', 'tools:   16 个内置', 'memory:  working / episodic / semantic', 'latest:  v0.4.59'],
    links: [['仓库', 'https://github.com/Ricardo-M-L/metis'], ['发布记录', 'https://github.com/Ricardo-M-L/metis/releases/latest'], ['Issues', 'https://github.com/Ricardo-M-L/metis/issues']],
    note: '许可:依仓库声明(不是 MIT)',
  },
]

export default function ProductDetails() {
  return (
    <>
      {DETAILS.map((d, i) => (
        <section className={'detail-sec' + (i % 2 ? ' is-tint' : '')} id={d.id} key={d.id}
          aria-labelledby={d.id + '-title'}>
          <div className="shell">
            <p className="ds-eyebrow">{d.eyebrow}</p>
            <h2 className="ds-title" id={d.id + '-title'}>{d.title}</h2>
            <p className="ds-lead">{d.lead}</p>
            <div className="ds-points">
              {d.points.map(([h, p]) => (
                <div className="ds-point" key={h}>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              ))}
            </div>
            <pre className="ds-code"><code>{d.code.join('\n')}</code></pre>
            <div className="ds-foot">
              <div className="ds-links">
                {d.links.map(([l, h]) => (
                  <a key={l} href={h} target="_blank" rel="noreferrer">
                    {l}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M3 9L9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.3"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
              {d.note && <p className="ds-note">{d.note}</p>}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
