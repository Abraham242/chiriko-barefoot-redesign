import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductPage from "@/pages/ProductPage";
import NotFound from "@/pages/NotFound";

describe("ProductPage routing behavior", () => {
  it("renders product details for a valid product id", () => {
    render(
      <MemoryRouter initialEntries={["/product/barebarics-zing-white-black"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Barebarics Zing/i,
      })
    ).toBeInTheDocument();
  });

  it("shows 404 page for an invalid product id", () => {
    render(
      <MemoryRouter initialEntries={["/product/id-inexistente"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "404",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Volver al inicio")).toBeInTheDocument();
  });
});
