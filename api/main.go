// ricardo-labs 后端:提供 React 静态资源、业务 API 与健康检查。
// 按部署文档约定:监听 0.0.0.0,端口读 PORT;静态目录可用 STATIC_DIR 覆盖。
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type product struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Zh     string `json:"zh"`
	Lang   string `json:"lang"`
	Status string `json:"status"`
	URL    string `json:"url"`
}

var products = []product{
	{ID: "cordis-di", Name: "cordis-di", Zh: "类型化插件与依赖注入框架", Lang: "Rust", Status: "v0.1.0 · crates.io", URL: "https://github.com/Ricardo-M-L/cordis-di"},
	{ID: "agent-memory", Name: "agent-memory", Zh: "Agent 持久化记忆(SQLite / Neo4j)", Lang: "Rust", Status: "v0.1.1 · MIT", URL: "https://github.com/Ricardo-M-L/agent-memory"},
	{ID: "ifscape", Name: "Ifscape", Zh: "后果工作室 · Living Atlas", Lang: "TypeScript + Rust", Status: "pre-alpha · 本地预览", URL: "https://github.com/Ricardo-M-L"},
}

func apiMux() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/products", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		if err := json.NewEncoder(w).Encode(products); err != nil {
			log.Printf("encode products: %v", err)
		}
	})
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})
	return mux
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	staticDir := os.Getenv("STATIC_DIR")
	if staticDir == "" {
		staticDir = "web/dist"
	}

	api := apiMux()
	fileServer := http.FileServer(http.Dir(staticDir))

	mux := http.NewServeMux()
	mux.Handle("/api/", api)
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// 静态文件存在则直接返回;否则回退到前端入口(SPA 刷新深层路由)。
		path := filepath.Join(staticDir, filepath.Clean("/"+r.URL.Path))
		if r.URL.Path != "/" && !strings.HasPrefix(r.URL.Path, "/api/") {
			if st, err := os.Stat(path); err == nil && !st.IsDir() {
				fileServer.ServeHTTP(w, r)
				return
			}
		}
		http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
	})

	log.Printf("ricardo-labs listening on 0.0.0.0:%s (static: %s)", port, staticDir)
	if err := http.ListenAndServe("0.0.0.0:"+port, mux); err != nil {
		log.Fatal(err)
	}
}
