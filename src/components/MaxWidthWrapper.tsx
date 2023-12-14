// Цель этого компонента в том, чтобы управлять максимальной шириной контента и центровать его на странице.

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Компонент принимает дополнительный класс через пропс "className", который позволяет добавлять пользовательские стили или переопределеять их
const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    // Первый аргумент в "cn" ф-ии - это default класс. Второ аргумент это из пропсов!
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
