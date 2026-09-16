# Ricardo Labs

Ricardo 的三个 Agent 基础设施项目的官方展示站,风格参考 openai.com。

| 产品 | 定位 | 仓库 |
| --- | --- | --- |
| cordis-di | Rust 类型化插件与依赖注入框架 | https://github.com/Ricardo-M-L/cordis-di |
| agent-memory | Rust Agent 持久化记忆(SQLite/Neo4j) | https://github.com/Ricardo-M-L/agent-memory |
| Ifscape | Agent 后果工作室 · Living Atlas | 本地项目(暂未公开) |

## 结构

```text
web/                    React + Vite 前端
api/                    Go 后端:静态资源 + /api/products + /healthz
migrations/             数据库迁移(当前站点无业务数据,预留)
deploy/                 部署说明
Dockerfile              前后端统一构建(多阶段)
render.yaml             Render Blueprint(新加坡 / Free)
.github/workflows/      GitHub Pages 自动部署
```

## 本地开发

```bash
# 前端
cd web && npm install && npm run dev

# 后端(先构建前端产物)
cd web && npm run build
cd ../api && go run .   # http://localhost:8080
```

## 部署

- **GitHub Pages(当前启用)**:推送 main 即自动构建部署,
  地址 `https://ricardo-m-l.github.io/ricardo-labs/`。
- **Render(方案就绪)**:见 [deploy/RENDER.md](deploy/RENDER.md)。
  本站无业务数据,不需要 Supabase;若增加动态功能再按文档接入。
