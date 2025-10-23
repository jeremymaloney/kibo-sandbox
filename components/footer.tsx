"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
} from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterSocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FooterContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface FooterProps {
  companyName?: string;
  companyDescription?: string;
  sections?: FooterSection[];
  socialLinks?: FooterSocialLink[];
  contactInfo?: FooterContactInfo;
  newsletterTitle?: string;
  newsletterDescription?: string;
  onNewsletterSubmit?: (email: string) => Promise<void>;
  copyrightText?: string;
  showScrollToTop?: boolean;
  className?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { title: "All Products", href: "/products" },
      { title: "Electronics", href: "/categories/electronics" },
      { title: "Accessories", href: "/categories/accessories" },
      { title: "Sale", href: "/sale" },
    ],
  },
  {
    title: "Support",
    links: [
      { title: "Contact Us", href: "/contact" },
      { title: "FAQ", href: "/faq" },
      { title: "Shipping", href: "/shipping" },
      { title: "Returns", href: "/returns" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Careers", href: "/careers" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
];

const defaultSocialLinks: FooterSocialLink[] = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "YouTube", href: "#", icon: Youtube },
];

const defaultContactInfo: FooterContactInfo = {
  email: "support@yourstore.com",
  phone: "+1 (555) 123-4567",
  address: "123 Commerce St, City, State 12345",
};

export default function Footer({
  companyName = "Your Store",
  companyDescription = "Your trusted partner for quality electronics and tech accessories.",
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  contactInfo = defaultContactInfo,
  newsletterTitle = "Stay Updated",
  newsletterDescription = "Get the latest deals and updates delivered to your inbox.",
  onNewsletterSubmit,
  copyrightText,
  showScrollToTop = true,
  className = "",
}: FooterProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const handleNewsletterSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      if (onNewsletterSubmit) {
        await onNewsletterSubmit(data.email);
      } else {
        console.log("Newsletter subscription:", data.email);
      }
      form.reset();
    } catch (error) {
      console.error("Newsletter submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();
  const copyright =
    copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`;

  return (
    <footer
      className={`border-t-2 border-t-primary bg-gradient-to-b from-muted/20 via-muted/30 to-muted/40 ${className}`}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Company Logo/Name */}
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {companyName}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {companyDescription}
                </p>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h4 className="font-semibold text-foreground">
                  {newsletterTitle}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {newsletterDescription}
                </p>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleNewsletterSubmit)}
                    className="mt-3 flex gap-2"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <div>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                disabled={isSubmitting}
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "..." : "Subscribe"}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Contact</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="transition-colors hover:text-foreground"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="transition-colors hover:text-foreground"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span>{contactInfo.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => (
                <div key={section.title}>
                  <h4 className="mb-4 font-semibold text-foreground">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">{copyright}</p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {showScrollToTop && (
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:bg-primary/10"
            >
              <ChevronUp className="h-4 w-4" />
              <span className="text-sm">Back to Top</span>
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
}
