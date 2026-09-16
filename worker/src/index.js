// ricardo-labs Cloudflare Worker:与 api/main.go(Go 版)等价的轻量后端。
// Static Assets 模式:命中静态文件直接由平台返回(不计请求数额度),
// 未命中的路径进入本 Worker——/api/* 与 /healthz 在这里处理,其余回退 SPA 入口。

const products = [
  {
    id: 'cordis-di',
    name: 'cordis-di',
    zh: '类型化插件与依赖注入框架',
    lang: 'Rust',
    status: 'v0.1.0 · crates.io',
    url: 'https://github.com/Ricardo-M-L/cordis-di',
  },
  {
    id: 'agent-memory',
    name: 'agent-memory',
    zh: 'Agent 持久化记忆(SQLite / Neo4j)',
    lang: 'Rust',
    status: 'v0.1.1 · MIT',
    url: 'https://github.com/Ricardo-M-L/agent-memory',
  },
  {
    id: 'ifscape',
    name: 'Ifscape',
    zh: '后果工作室 · Living Atlas',
    lang: 'TypeScript + Rust',
    status: 'pre-alpha · 本地预览',
    url: 'https://github.com/Ricardo-M-L',
  },
];

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/products') {
      return Response.json(products);
    }
    if (pathname === '/healthz') {
      return new Response('ok');
    }
    if (pathname.startsWith('/api/')) {
      // 未定义的 API 路径返回 404,不落入前端入口(与 Go 版行为一致)
      return new Response('not found', { status: 404 });
    }
    // 其余路径交给静态资源绑定:not_found_handling=single-page-application
    // 会让未匹配的路径返回 index.html(SPA 刷新深层路由可用)
    return env.ASSETS.fetch(request);
  },
};
