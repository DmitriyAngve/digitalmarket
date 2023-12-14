"use client"; // Это отпределяет, что компонент клиентский (без этого не будет работать useState)

import { PRODUCT_CATEGORIES } from "@/config";

import { useRef, useState } from "react";
import NavItem from "./NavItem";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>();

  const isAnyOpen = activeIndex !== null; // Когда активный индекс выбран, то он не равен null!

  // useRef - это хук React, который используется для создания объектных, изменяемых ссылок, которые сохраняются между рендерами.
  // Данный "useRef" можно использовать для обращения к конкретному элементу "div"
  const navRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const isOpen = i === activeIndex;

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
