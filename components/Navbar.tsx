import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();
  if (session) {
    return (
      <nav>
        <h1>Dcard 前端實習作業</h1>
        <Image
          src={session.user.image ?? ""}
          alt="user avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <Button variant="link" asChild>
          <Link href="/auth/post/create">Create</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/api/auth/signout">Signout</Link>
        </Button>
      </nav>
    );
  }

  return <div>Navbar</div>;
}
