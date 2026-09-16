# Render 部署步骤(对照《React 与 Go 或 Rust 完整应用免费部署方案》第 6 节)

本仓库已具备:统一 Dockerfile(前端构建 → Go 编译 → 运行镜像)、
`render.yaml` Blueprint、`/healthz` 健康检查、SPA 回退路由。

> 本站是静态展示站,没有业务数据,因此**不需要创建 Supabase**。
> 若以后增加留言、访问统计等功能,再按文档第 6 节第二步创建 Supabase 项目并配置 `DATABASE_URL`。

1. 注册/登录 https://render.com (免费套餐)。
2. New → Blueprint → 连接 GitHub 账号并选择 `Ricardo-M-L/ricardo-labs` 仓库。
   Blueprint 会读取 `render.yaml`:Docker 运行时、新加坡区域、Free 实例。
   (或手动 New → Web Service → 选仓库 → Runtime 选 Docker → Region 选 Singapore → Instance Type 选 Free)
3. 发起部署,等待构建完成;地址形如 `https://ricardo-labs.onrender.com`。
4. 验收(文档第 8 节摘录):
   - `https://<name>.onrender.com/healthz` 返回 ok
   - 首页正常渲染,`/api/products` 返回 JSON
   - 免费实例 15 分钟无流量会休眠,唤醒约需一分钟

## 注意

- Render 免费实例每月共享 750 实例小时;构建分钟与带宽另有额度。
- 大陆访问 onrender.com 的质量需实测;不理想时可改用自定义域名 + CDN。
