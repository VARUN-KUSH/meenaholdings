import Animations from "@/components/Animations";
import Footer from "@/components/Footer";

// Re-mounts on every navigation, so scroll animations are rebuilt per page.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Animations>
      <main>{children}</main>
      <Footer />
    </Animations>
  );
}
