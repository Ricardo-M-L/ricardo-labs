# 前后端统一构建(按《React 与 Go 或 Rust 完整应用免费部署方案》第 5 节)
# 1) 构建前端静态产物  2) 编译 Go 后端  3) 仅含运行程序与静态资源的运行镜像

FROM node:22-alpine AS web
WORKDIR /build/web
COPY web/package.json web/package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY web/ ./
RUN VITE_BASE=/ npm run build

FROM golang:1.26-alpine AS api
WORKDIR /build/api
COPY api/go.mod ./
RUN go mod download || true
COPY api/ ./
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/server .

FROM alpine:3.20
RUN adduser -D -u 10001 app && apk add --no-cache ca-certificates
WORKDIR /app
COPY --from=api /out/server ./server
COPY --from=web /build/web/dist ./web/dist
USER app
ENV PORT=8080 STATIC_DIR=web/dist
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
CMD ["./server"]
