"use client"; // Это отпределяет, что компонент клиентский (без этого не будет работать useState)

import { PRODUCT_CATEGORIES } from "@/config";

import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>();

  // Добавляю закрытие навбара с помощью клавиши ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler); // когда "Escape" нажали, то запуститься "handler" => закроется навбар

    return () => {
      document.removeEventListener("keydown", handler);
    }; // После срабатывания удаляю из памяти этот ивентлистенер
  }, []);

  const isAnyOpen = activeIndex !== null; // Когда активный индекс выбран, то он не равен null!

  // useRef - это хук React, который используется для создания объектных, изменяемых ссылок, которые сохраняются между рендерами.
  // Данный "useRef" можно использовать для обращения к конкретному элементу "div"
  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null)); // Если клиент кликнет на навбар, то он закроется (=== setActiveIndex(null)). Делаю то же самое и для "navRef"

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
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
