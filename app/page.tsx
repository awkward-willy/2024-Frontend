import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-static";

// This is for users who are not logged in
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <p>請先登入</p>
      <Button variant="outline" asChild>
        <Link href="/api/auth/signin">登入</Link>
      </Button>
    </main>
  );
}
