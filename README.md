# Ricardo Labs

Ricardo 的开源项目展示站,包含重点产品、更多 Agent 工具以及 Metis 下载入口。

| 产品 | 定位 | 仓库 |
| --- | --- | --- |
| cordis-di | Rust 类型化插件与依赖注入框架 | https://github.com/Ricardo-M-L/cordis-di |
| agent-memory | Rust Agent 持久化记忆(SQLite/Neo4j) | https://github.com/Ricardo-M-L/agent-memory |
| Ifscape | Agent 后果工作室 · Living Atlas(开发者预览,MPL-2.0) | https://github.com/Ricardo-M-L/ifscape |
| metis | 本地优先 Agent CLI 与桌面端 | https://github.com/Ricardo-M-L/metis |

更多项目区还展示 `agent-apprentice`、`metis-cu`、`mcphub`、`anthrogo`、
`claude-skills` 和 `synapse-ai`。旧实验和配套仓库可通过「全部仓库」查看。

页面不固定产品版本号、下载包大小或构建工具版本。发布入口使用
`releases/latest`,Metis 下载使用 `releases/latest/download/<asset>`;
源码构建要求以对应项目仓库为准。

Ifscape 提供源码和中英文使用说明,尚未发布正式签名、公证的桌面安装包。
各项目许可证分别以各自仓库为准。

## 结构

```text
web/                    React + Vite 前端
api/                    Go 后端:静态资源 + /api/products + /healthz(Render/Docker 路线)
worker/                 Cloudflare Workers 版后端(JS,与 api/ 等价,Static Assets 模式)
migrations/             数据库迁移(当前站点无业务数据,预留)
deploy/                 部署说明(RENDER.md / CLOUDFLARE.md)
Dockerfile              前后端统一构建(多阶段,Render 路线)
render.yaml             Render Blueprint(新加坡 / Free)
.github/workflows/      GitHub Pages 自动部署
```

## 本地开发

```bash
# 前端
cd web && npm install && npm run dev

# Go 后端(先构建前端产物)
cd web && npm run build
cd ../api && go run .   # http://localhost:8080

# Cloudflare Worker 后端(本地模拟,无需登录)
cd worker && npm install && npm run build:web && npx wrangler dev  # http://127.0.0.1:8787
```

## 部署

- **GitHub Pages(当前启用)**:推送 main 即自动构建部署,
  地址 `https://ricardo-m-l.github.io/ricardo-labs/`。
- **Cloudflare Workers(推荐)**:见 [deploy/CLOUDFLARE.md](deploy/CLOUDFLARE.md),
  两条命令部署,不休眠,静态资源不限量。
- **Render(方案就绪)**:见 [deploy/RENDER.md](deploy/RENDER.md)。
  本站无业务数据,不需要 Supabase;若增加动态功能再按文档接入。
