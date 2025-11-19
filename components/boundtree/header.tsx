import React from "react";
import CCBanner from "./cc-banner";
import Link from "next/link";
import Image from "next/image";
import MobileNavControls from "./mobile-nav-controls";

const BoundTreeHeader = () => {
  return (
    <header>
      <CCBanner />

      <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:gap-4 p-4 bg-bt-blue">
        <Link href={"/"}>
          <Image
            src={
              "https://www.boundtree.com/medias/boundtree-logo.png?context=bWFzdGVyfGltYWdlc3w2NzA5fGltYWdlL3BuZ3xpbWFnZXMvaGMyL2hiMi84OTk0NzI1MDAzMjk0LnBuZ3w1NWI4ZTc3NTliZDgxZDAyOTVkNTZmYWNjZDUxMjNkNGQ4N2Y0MDM2ODA5YWUzYmE1YTc5NjJmZWFhMGU4NmFh"
            }
            alt="Logo"
            width={170}
            height={29}
          />
        </Link>
      </div>
      <MobileNavControls />
    </header>
  );
};

export default BoundTreeHeader;
