export function addMock(moduleName: string, exports: Record<string, any>) {
  const mockModule = new Proxy(exports, {
    get(target, prop) {
      if (!(prop in target)) {
        console.warn(
          `[Mock] Acesso ao módulo ${moduleName}.${String(prop)} não definido`
        );
      }
      return target[prop as keyof typeof target];
    },
  });

  // @ts-ignore
  globalThis.__vite_ssr_exports__ = globalThis.__vite_ssr_exports__ || {};
  // @ts-ignore
  globalThis.__vite_ssr_exports__[moduleName] = mockModule;
}
