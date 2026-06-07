import { GridBackground } from "@/components/portfolio/grid-background";
import { Nav } from "@/components/portfolio/nav";
import { Footer } from "@/components/portfolio/footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GridBackground />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
