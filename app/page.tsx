"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import MarketingBannerV1 from "@/components/marketing-banner-v1";
import Header from "../components/header";
import Footer from "../components/footer";
import ProductsDisplay from "@/components/products-display";
import FaqAccordion from "../components/faqs-accordion";
import ThemeSwitcher from "@/components/theme-switcher";

interface HeroBannerEntity {
  id: string;
  isActive: boolean;
  title?: string;
  description?: string;
  cta?: string;
  imageUrl?: string;
}

interface FaqEntity {
  id: string;
  question: string;
  answer: string;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroBanner, setHeroBanner] = useState<HeroBannerEntity | null>(null);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [faqs, setFaqs] = useState<FaqEntity[]>([]);
  const [faqsLoading, setFaqsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        console.log("API Response:", data);
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchHeroBanner() {
      try {
        const response = await fetch("/api/hero-banner");
        const data = await response.json();
        console.log("Hero Banner API Response:", data);

        // Find the active banner
        const activeBanner = data.data?.find(
          (banner: HeroBannerEntity) => banner.isActive === true
        );
        if (activeBanner) {
          setHeroBanner(activeBanner);
        }
      } catch (error) {
        console.error("Error fetching hero banner:", error);
      } finally {
        setBannerLoading(false);
      }
    }

    fetchHeroBanner();
  }, []);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const response = await fetch("/api/faqs");
        const data = await response.json();
        console.log("FAQs API Response:", data);
        setFaqs(data.data || []);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setFaqsLoading(false);
      }
    }

    fetchFaqs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header/Navigation */}
      <Header />

      {/* Theme Switcher */}
      <div className="bg-muted py-theme-md">
        <div className="container mx-auto px-theme-lg flex justify-center">
          <ThemeSwitcher />
        </div>
      </div>

      {/* Hero Section */}
      {!bannerLoading && heroBanner && (
        <MarketingBannerV1
          title={heroBanner.title}
          description={heroBanner.description}
          badgeText={heroBanner.cta}
          imageUrl={heroBanner.imageUrl || "vercel.svg"}
        />
      )}

      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-theme-xl">
        <div className="container mx-auto px-theme-lg text-center">
          <h1 className="text-theme-4xl font-bold mb-4">
            Welcome to Kibo Sandbox
          </h1>
          <p className="text-theme-xl mb-8">
            A developer learning environment for Next.js, React, and Kibo
            Commerce
          </p>
          <div className="flex gap-theme-md justify-center">
            <Button onClick={() => console.log("Button clicked!")}>
              Click Me
            </Button>
            <Button variant={"secondary"} size={"lg"}>
              Secondary Button
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-theme-xl bg-background">
        <div className="container mx-auto px-theme-lg">
          <h2 className="text-theme-3xl font-bold text-center mb-12 text-foreground">
            What You&apos;ll Learn
          </h2>
          <div className="grid md:grid-cols-3 gap-theme-lg">
            <div className="text-center p-theme-lg">
              <div className="text-theme-4xl mb-4">⚛️</div>
              <h3 className="text-theme-xl font-semibold mb-2">
                React & Next.js
              </h3>
              <p className="text-theme-base text-muted-foreground">
                Build modern web applications with the latest React features and
                Next.js App Router
              </p>
            </div>
            <div className="text-center p-theme-lg">
              <div className="text-theme-4xl mb-4">🎨</div>
              <h3 className="text-theme-xl font-semibold mb-2">Tailwind CSS</h3>
              <p className="text-theme-base text-muted-foreground">
                Style components quickly with utility-first CSS framework
              </p>
            </div>
            <div className="text-center p-theme-lg">
              <div className="text-theme-4xl mb-4">🛒</div>
              <h3 className="text-theme-xl font-semibold mb-2">
                Kibo Commerce
              </h3>
              <p className="text-theme-base text-muted-foreground">
                Integrate with Kibo APIs to build e-commerce experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Display Section */}
      <ProductsDisplay products={products} loading={loading} />

      {/* FAQ Section */}
      <section className="bg-muted px-theme-lg">
        {!faqsLoading && (
          <FaqAccordion items={faqs} className="w-full max-w-[700px] mx-auto" />
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-theme-xl">
        <div className="container mx-auto px-theme-lg text-center">
          <h2 className="text-theme-3xl font-bold mb-4 text-foreground">
            Ready to Start Building?
          </h2>
          <p className="text-theme-base text-muted-foreground mb-8">
            Explore the components and start experimenting with your own
            features
          </p>
          <Button>View Components</Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
