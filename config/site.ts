import { SidebarNavItem, SiteConfig } from "@/types";

const site_url = process.env.NEXT_PUBLIC_APP_URL!;

export const siteConfig: SiteConfig = {
  name: "EzDiagram",
  description:
    "Get your project off to an explosive start with SaaS Starter! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui and Stripe to build your next big thing.",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/ezdiagram",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "support@ezdiagram.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "About",
    items: [
      { title: "Pricing", href: "#" },
      { title: "Docs", href: "#" },
      { title: "Blog", href: "#" },
    ],
  },
  {
    title: "Social",
    items: [
      { title: "Twitter", href: "#" },
      { title: "Github", href: "#" },
      { title: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Terms & Conditions", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "Refund Policy", href: "#" },
    ],
  },
];
