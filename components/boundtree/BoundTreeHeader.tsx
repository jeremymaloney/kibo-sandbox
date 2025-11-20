import React from "react";
import CCBanner from "./CCBanner";
import MobileNavControls from "./MobileNavControls";
import { BTBrandLogo } from "./BTBrandLogo";
import BTMegaMenu from "./BTMegaMenu";

const BoundTreeHeader = () => {
  return (
    <header>
      <CCBanner />

      <div className="flex flex-col items-center lg:hidden p-4 bg-bt-blue">
        <BTBrandLogo />
      </div>

      <MobileNavControls />

      <BTMegaMenu />
    </header>
  );
};

export default BoundTreeHeader;
