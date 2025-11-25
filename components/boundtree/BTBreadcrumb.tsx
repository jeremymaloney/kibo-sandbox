import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BTBreadcrumb = ({
  currentPage,
  category,
  categorySlug,
}: {
  currentPage: string;
  category?: string;
  categorySlug?: string;
}) => {
  return (
    <div className="py-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {category && categorySlug ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/boundtree/${categorySlug}`}>
                  {category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : (
            ""
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BTBreadcrumb;
