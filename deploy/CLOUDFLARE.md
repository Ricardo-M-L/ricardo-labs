# Cloudflare Workers 部署步骤

Worker 版后端在 `worker/`,与 `api/`(Go 版,供 Render/Docker 用)功能等价:
`/api/products`、`/healthz`、SPA 回退;静态资源由 Workers Static Assets 直接服务
(不计入请求数额度)。

## 前置

- 注册 Cloudflare 账号(免费)
- 本地 Node 22+

## 部署(两条命令)

```bash
cd worker
npx wrangler login        # 浏览器 OAuth 授权,一次即可
npm install
npm run deploy            # 构建前端(VITE_BASE=/) + wrangler deploy
```

部署完成后得到公网地址:`https://ricardo-labs.<你的子域>.workers.dev`
(子域在 Cloudflare 控制台 Workers & Pages → 右上角 Subdomain 查看/修改)。

## 本地验证(不需要登录)

```bash
cd worker && npm install
npm run build:web         # 先产出 ../web/dist
npx wrangler dev          # http://127.0.0.1:8787
```

## 免费额度(Workers Free)

- 静态资源(Assets)请求:免费,不限量
- Worker 调用(即 /api/* 与 SPA 回退):每天 10 万次,每次 10ms CPU
- 无休眠;`workers.dev` 子域 + HTTPS 由平台管理,无需买域名

## 注意

- **Workers 无法运行 Go**:本方案用约 60 行 JS 等价替换了 Go 后端的三个路由;
  以后若出现重后端逻辑(数据库、长任务),Go 版继续走 Render 路线更合适。
- **大陆访问**:`*.workers.dev` 在大陆部分网络不稳定,正式推广建议绑定自定义域名
  (Cloudflare 免费提供 DNS/CDN,域名本身需自购)。
- 需要 CI 自动部署时,在仓库 Secrets 配置 `CLOUDFLARE_API_TOKEN`(需 Workers Scripts
  编辑权限),再用 workflow 调 `wrangler deploy`。
