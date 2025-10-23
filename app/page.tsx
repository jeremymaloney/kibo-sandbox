"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import MarketingBannerV1 from "@/components/marketing-banner-v1";
import Header from "../components/header";
import Footer from "../components/footer";
import ProductsDisplay from "@/components/products-display";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header/Navigation */}
      <Header />

      {/* Hero Section */}
      <MarketingBannerV1
        title="I'm a Marketing Banner!"
        description="A reusable banner component made from Aries-UI"
        badgeText="Super cool!"
        imageUrl="vercel.svg"
      />

      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Kibo Sandbox</h1>
          <p className="text-xl mb-8">
            A developer learning environment for Next.js, React, and Kibo
            Commerce
          </p>
          <Button onClick={() => console.log("Button clicked!")}>
            Click Me
          </Button>
          <Button variant={"secondary"} size={"lg"}>
            Secondary Button
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What You&apos;ll Learn
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚛️</div>
              <h3 className="text-xl font-semibold mb-2">React & Next.js</h3>
              <p className="text-gray-600">
                Build modern web applications with the latest React features and
                Next.js App Router
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Tailwind CSS</h3>
              <p className="text-gray-600">
                Style components quickly with utility-first CSS framework
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold mb-2">Kibo Commerce</h3>
              <p className="text-gray-600">
                Integrate with Kibo APIs to build e-commerce experiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Display Section */}
      <ProductsDisplay products={products} loading={loading} />

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to Start Building?
          </h2>
          <p className="text-gray-600 mb-8">
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
