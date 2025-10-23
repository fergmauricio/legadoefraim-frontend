import { renderHook, act } from "@testing-library/react";
import { useIsClient } from "./use-is-client";

describe("Hook useIsClient", () => {
  it("deve retornar true após a montagem do componente (ambiente cliente)", () => {
    const { result } = renderHook(() => useIsClient());

    expect(result.current).toBe(true);
  });

  it("deve continuar retornando true após re-renderização", () => {
    const { result, rerender } = renderHook(() => useIsClient());
    act(() => rerender());
    expect(result.current).toBe(true);
  });
});
