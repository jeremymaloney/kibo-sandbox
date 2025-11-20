"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeSwitcher from "@/components/theme-switcher";
import "@/app/cms-page-styles.css";

interface CmsPageData {
  id?: string;
  name?: string;
  content?: string;
  htmlContent?: string;
}

interface CmsPageProps {
  pageId: string;
  pageType?: "support" | "about" | "default";
}

export default function CmsPage({
  pageId,
  pageType = "default",
}: CmsPageProps) {
  const [pageData, setPageData] = useState<CmsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPage() {
      try {
        const response = await fetch(`/api/cms-page/${pageId}`);
        const data = await response.json();
        console.log(`CMS Page API Response (${pageId}):`, data);

        if (data.error) {
          setError(data.error);
        } else {
          setPageData(data.data);
        }
      } catch (err) {
        console.error(`Error fetching CMS page ${pageId}:`, err);
        setError("Failed to load page");
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [pageId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Theme Switcher */}
        <div className="container mx-auto px-theme-md py-theme-md flex justify-center">
          <ThemeSwitcher />
        </div>

        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg text-muted-foreground">Loading page...</div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg text-destructive">Error: {error}</div>
          </div>
        )}

        {!loading && !error && pageData && (
          <div
            className={`cms-page-content ${
              pageType === "support"
                ? "support-style"
                : pageType === "about"
                ? "about-style"
                : ""
            }`}
            dangerouslySetInnerHTML={{
              __html:
                pageData.htmlContent ||
                pageData.content ||
                "<p>No content available</p>",
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
