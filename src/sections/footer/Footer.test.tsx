import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { AppWrapper } from "@/testing/AppWrapper";

const mockUseChainCosmoshub = vi.fn();

beforeEach(() => {
  vi.doMock("@/hooks/useTheme", () => ({
    default: () => ({ themeColors: { negative2: "red" } }),
  }));
  vi.doMock("@/hooks/useChainCosmoshub", () => ({
    useChainCosmoshub: mockUseChainCosmoshub,
  }));
  mockUseChainCosmoshub.mockReturnValue({ isConnected: false });
});

describe("Footer", () => {
  it("renders offline status when not connected", async () => {
    const Footer = (await import("./Footer")).default;
    render(<Footer />, { wrapper: AppWrapper });

    expect(screen.getByText("offline")).toBeInTheDocument();
    expect(screen.getByText("offline").closest("div")).toHaveStyle(
      "color: red"
    );
  });

  it("renders online status when connected", async () => {
    mockUseChainCosmoshub.mockReturnValue({ isConnected: true });
    const Footer = (await import("./Footer")).default;

    render(<Footer />, { wrapper: AppWrapper });

    await waitFor(() => screen.getByText("online"));

    expect(screen.getByText("online")).toBeInTheDocument();
    expect(screen.getByText("online").closest("div")).not.toHaveStyle(
      "color: red"
    );
  });

  it("renders navigation items", async () => {
    const Footer = (await import("./Footer")).default;
    render(<Footer />, { wrapper: AppWrapper });

    expect(screen.getByText("Stats")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });
});
