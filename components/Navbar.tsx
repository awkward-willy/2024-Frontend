import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Navbar() {
  const admin = process.env.ADMIN_NAME;
  const session = await auth();
  if (session) {
    return (
      <nav className="sticky top-0 flex items-center border-b-2 backdrop-blur-sm">
        <h1 className="my-4 flex-grow">Dcard 前端實習作業</h1>
        {session.user.accountName === admin && (
          <Button variant="link" asChild>
            <Link href="/auth/post/create">Create</Link>
          </Button>
        )}
        <Button variant="link" asChild>
          <Link href="/api/auth/signout">Signout</Link>
        </Button>
        <Image
          src={session.user.image ?? ""}
          alt="user avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </nav>
    );
  }

  return <div>Navbar</div>;
}
