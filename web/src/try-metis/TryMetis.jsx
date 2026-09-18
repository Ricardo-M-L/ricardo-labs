import React from 'react'
import { Nav, Footer } from '../App'

/* 「Try metis」独立页 —— 结构参照 anthropic.com 的产品页:
 * hero(eyebrow + 大标题 + 两个 CTA + 真实截图)→「两种用法」双卡 → 能力网格 →
 * 真实截图画廊 → 安装/下载 → FAQ → 收尾 CTA。
 * 所有事实取自 metis 仓库 README / metis-desktop README,不编数字;
 * license 在 GitHub 上是 "Other",全页不声称 MIT。 */

const REPO = 'https://github.com/Ricardo-M-L/metis'
const RELEASES = REPO + '/releases/latest'
const ASSET = import.meta.env.BASE_URL + 'try-metis/'
// 直连发行包:点击即下载(releases/latest/download/<asset> 会 302 到 CDN 附件)
const DL = (n) => REPO + '/releases/latest/download/' + n
const CURL = 'curl -fsSL https://raw.githubusercontent.com/Ricardo-M-L/metis/main/install/install.sh | bash'
const DESKTOP = [
  ['macOS', 'metis-desktop-darwin-universal.dmg', 'dmg · 9.1 MB'],
  ['Windows', 'metis-desktop-windows-amd64.zip', 'zip · 4.7 MB'],
  ['Linux', 'metis-desktop-linux-amd64.tar.gz', 'tar.gz · 4.2 MB'],
]

const Arrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 9L9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const USES = [
  {
    tag: '01 · CLI · Go',
    title: 'metis',
    lead: '单个静态二进制,冷启动不到 100ms——循环里没有 Node,也没有 Python。',
    items: [
      ['流式优先', '文本增量与工具入参增量边到边渲染;安全工具并行、可排队工具 FIFO、独占工具串行,后台工具立刻返回。'],
      ['权限感知', 'Claude Code 的 5 个公开模式(default / acceptEdits / plan / dontAsk / bypassPermissions),加上 METIS 的 fullAccess;权限按托管策略 > CLI > 会话内批准 > 配置 > 已持久化批准级联。'],
      ['MCP 原生', 'stdio 与 Streamable HTTP/SSE 客户端,工具自动注册并按 server 加命名空间。'],
    ],
  },
  {
    tag: '02 · Desktop · Wails',
    title: 'metis desktop',
    icon: 'appicon.png',
    lead: '原生客户端:Go 负责后端,WebView 负责界面——外壳下面就是同一个 metis。',
    items: [
      ['先装 CLI', '桌面端把会话、设置与 CLI 执行委托给本地 metis,它不是独立的推理运行时;装桌面端之前先把 CLI 装好。'],
      ['工作区范围内', '窗口绑定一个 workspace,会话访问不跨工作区;macOS 上还会用 codesign 校验应用包。'],
      ['数据与设置', 'METIS_HOME 决定数据目录,桌面设置写在 $METIS_HOME/desktop-settings.json。'],
    ],
  },
]

const ABILITIES = [
  ['快', '单个静态 Go 二进制,无 Node/Python 运行时拖在后面。'],
  ['本地优先', '持久状态放 ~/.metis/,项目内可用 .metis/;模型请求、MCP/网页工具与更新检查才联网,METIS_NO_UPDATE_CHECK=1 可关掉更新检查与安装。'],
  ['多 provider', '原生 Anthropic Messages、OpenAI Chat Completions、Google Gemini;自定义 profile 还能接 Azure OpenAI 与 Vertex / Bedrock 上的 Anthropic。'],
  ['MCP 原生', 'stdio + Streamable HTTP/SSE,工具自动注册、按 server 命名空间隔离。'],
  ['权限模式', '5 个公开模式 + fullAccess(无审批、无进程沙箱),外加一个依赖输入的 bash 分类器。'],
  ['三层记忆', 'Core block / Archival JSONL / Recall history,带回滚快照语义与上下文围栏。'],
]

const SHOTS = [
  ['welcome.jpg', '欢迎页', '选模型与 effort,直接描述要构建的东西;上下文占用就摆在标题栏上。'],
  ['palette.jpg', '命令面板', '输入 / 唤起,全流程键盘走完,不用记参数。'],
  ['executed.jpg', '命令执行', '命令在会话里跑完,结果留在上下文中,后面的对话可以直接引用。'],
  ['marketplace.jpg', '插件市场', '浏览、安装插件,按需扩展工具面。'],
]

const PLATFORMS = DESKTOP  // 兼容旧引用(安装区仍用)

const FAQ = [
  ['桌面端能单独用吗?', '不能。它把会话、设置与 CLI 执行都委托给本地 metis,所以要先安装 CLI,再下对应平台的桌面端压缩包。'],
  ['什么许可?', '依仓库声明,不是 MIT。本页与站点都没有把 metis 标成 MIT。'],
  ['从源码构建要什么?', 'Go 1.25.8 或更新,加上 Wails CLI v2.12.x 与 Wails 要求的平台依赖(用 wails doctor 自检)。直接下发行包的话不需要这些。'],
]

export default function TryMetis() {
  const [copied, setCopied] = React.useState(false)
  const copyCmd = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800) }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CURL).then(done).catch(done)
    } else { done() }
  }
  return (
    <>
      <Nav />
      <main id="top">
        <header className="tm-hero">
          <div className="shell">
            <p className="tm-eyebrow">Try metis</p>
            <h1>终端里跑,<br />桌面上用</h1>
            <p className="tm-lead">
              metis 是本地优先的 Agent CLI:一个静态 Go 二进制、完整的终端界面、多家 provider 的流式输出、MCP 原生,外加持久记忆。
              桌面端是它的原生外壳——同一个内核,不必敲命令。
            </p>
            <div className="tm-dl">
              {DESKTOP.map(([os, file, meta]) => (
                <a className="tm-dl-btn" key={os} href={DL(file)} download>
                  <span className="tm-dl-os">{os}</span>
                  <span className="tm-dl-meta">{meta}</span>
                </a>
              ))}
            </div>
            <div className="tm-cli">
              <p className="tm-cli-label">CLI,一行装好</p>
              <div className="tm-cmd">
                <code>{CURL}</code>
                <button type="button" className="tm-copy" onClick={copyCmd}>{copied ? '已复制' : '复制'}</button>
              </div>
            </div>
            <p className="tm-note">最新版本 v0.4.59 · 桌面端需先安装 CLI · 三个包都是直连下载 · 许可:依仓库声明</p>
          </div>
        </header>

        <section className="tm-shotband">
          <div className="shell">
            <figure className="tm-shot-frame">
              <img src={ASSET + 'welcome.jpg'} width="1108" height="768" alt="metis desktop 欢迎页截图" />
              <figcaption>metis desktop · 欢迎页</figcaption>
            </figure>
          </div>
        </section>

        <section className="tm-uses">
          <div className="shell">
            <h2>两种用法,同一套内核</h2>
            <div className="tm-use-grid">
              {USES.map(u => (
                <article className="tm-use" key={u.title}>
                  <p className="tm-tag">{u.tag}</p>
                  <h3>
                    {u.icon && <img className="tm-app-icon" src={ASSET + u.icon} width="26" height="26" alt="" aria-hidden="true" />}
                    {u.title}
                  </h3>
                  <p className="tm-use-lead">{u.lead}</p>
                  <dl>
                    {u.items.map(([t, d]) => (
                      <React.Fragment key={t}>
                        <dt>{t}</dt>
                        <dd>{d}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tm-abil is-tint">
          <div className="shell">
            <h2>它把哪些事做成了默认</h2>
            <div className="tm-abil-grid">
              {ABILITIES.map(([t, d]) => (
                <div className="tm-abil-cell" key={t}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tm-gallery">
          <div className="shell">
            <h2>桌面端长什么样</h2>
            <p className="tm-section-lead">四张真实截图,来自仓库的界面记录,不是概念图。</p>
            <div className="tm-shots">
              {SHOTS.map(([f, t, d]) => (
                <figure key={f}>
                  <img src={ASSET + f} width="1108" height="768" alt={`metis desktop ${t}截图`} loading="lazy" />
                  <figcaption><b>{t}</b><span>{d}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="tm-install is-tint" id="install">
          <div className="shell">
            <h2>装起来</h2>
            <div className="tm-install-grid">
              <div>
                <p className="tm-step">第一步 · CLI</p>
                <div className="tm-cmdhead">
                  <span className="tm-cli-label">在终端里执行</span>
                  <button type="button" className="tm-copy" onClick={copyCmd}>{copied ? '已复制' : '复制'}</button>
                </div>
                <pre className="tm-code"><code>{CURL}</code></pre>
                <p className="tm-note">macOS / Linux 均可用,装完执行 metis version 确认。</p>
              </div>
              <div>
                <p className="tm-step">第二步 · 桌面端</p>
                <ul className="tm-plat">
                  {DESKTOP.map(([os, file, meta]) => (
                    <li key={os}>
                      <b>{os}</b>
                      <a href={DL(file)} download><code>{file}</code></a>
                      <span>{meta}</span>
                    </li>
                  ))}
                </ul>
                <p className="tm-note">点文件名就直接下载(直连最新发行版);macOS 的 dmg 打开后把 app 拖进应用程序目录。</p>
              </div>
            </div>
          </div>
        </section>

        <section className="tm-faq">
          <div className="shell">
            <h2>常见问题</h2>
            <div className="tm-qa">
              {FAQ.map(([q, a]) => (
                <div key={q}>
                  <h3>{q}</h3>
                  <p>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tm-cta">
          <div className="shell">
            <h2>先装 CLI,再开桌面端</h2>
            <p>源码、发行包与 issue 都在公开仓库里;终端和桌面端跑的是同一套循环。</p>
            <div className="tm-dl">
              {DESKTOP.map(([os, file, meta]) => (
                <a className="tm-dl-btn" key={os} href={DL(file)} download>
                  <span className="tm-dl-os">{os}</span>
                  <span className="tm-dl-meta">{meta}</span>
                </a>
              ))}
            </div>
            <div className="tm-act">
              <a className="btn btn-secondary" href={REPO} target="_blank" rel="noreferrer">仓库 <Arrow /></a>
              <a className="btn btn-secondary" href={REPO + '/issues'} target="_blank" rel="noreferrer">Issues <Arrow /></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
