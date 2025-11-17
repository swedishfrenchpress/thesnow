import { Gallery } from "@/components/gallery";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen pt-24 sm:pt-32">
      <Gallery />
      <Footer />
    </div>
  );
}

