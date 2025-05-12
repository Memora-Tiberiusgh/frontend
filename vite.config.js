//TEST
export default {
  root: "src",
  build: {
    outDir: "../dist",
    target: "esnext",
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ["cscloud8-66.lnu.se"],
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
}
