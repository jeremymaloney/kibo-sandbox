import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export const BTBrandLogo = ({ brandLogoAlt = "Brand logo" }) => {
  return (
    <Link href={"/"}>
      <Image
        src={
          "https://www.boundtree.com/medias/boundtree-logo.png?context=bWFzdGVyfGltYWdlc3w2NzA5fGltYWdlL3BuZ3xpbWFnZXMvaGMyL2hiMi84OTk0NzI1MDAzMjk0LnBuZ3w1NWI4ZTc3NTliZDgxZDAyOTVkNTZmYWNjZDUxMjNkNGQ4N2Y0MDM2ODA5YWUzYmE1YTc5NjJmZWFhMGU4NmFh"
        }
        alt={brandLogoAlt}
        width={170}
        height={29}
      />
    </Link>
  );
};

BTBrandLogo.displayName = "BrandLogo";
