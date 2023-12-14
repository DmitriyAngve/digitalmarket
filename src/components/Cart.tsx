"use client";

import { ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCartIcon />
      </SheetTrigger>
    </Sheet>
  );
};

export default Cart;
