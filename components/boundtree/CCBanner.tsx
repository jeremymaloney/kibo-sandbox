import Link from "next/link";
import React from "react";

const CCBanner = () => {
  return (
    <div className="hidden lg:block bg-bt-light-blue text-white py-1 px-4 lg:px-8">
      <p className="text-end text-sm">
        Customer Care:{" "}
        <Link href={"mailto:customercare@boundtree.com"}>
          customercare@boundtree.com
        </Link>{" "}
        <span className="ms-2">
          <Link href={"tel:800.533.0523"}>800.533.0523</Link>
        </span>
      </p>
    </div>
  );
};

export default CCBanner;
