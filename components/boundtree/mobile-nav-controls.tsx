import React from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const MobileNavControls = () => {
  return (
    <>
      <Collapsible>
        <div className="bg-bt-dark-blue w-full flex justify-between lg:hidden">
          <div className="headerNavIconWrapper">
            <Menu />
          </div>
          <div className="headerNavIconWrapper">
            <CollapsibleTrigger>
              <Search />
            </CollapsibleTrigger>
          </div>
          <div className="headerNavIconWrapper">
            <Link href={"/login"}>
              <UserRound />
            </Link>
          </div>
          <div className="headerNavIconWrapper">
            <div className="relative w-fit">
              <span className="absolute rounded-full bg-bt-yellow text-gray-900 font-bold p-0.5 leading-none -top-2.5 -right-1.5 z-10">
                0
              </span>
              <ShoppingCart />
            </div>
          </div>
        </div>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default MobileNavControls;
