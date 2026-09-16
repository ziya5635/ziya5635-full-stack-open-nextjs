"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Navbar() {
  let { data: session } = useSession();
  return (
    <nav>
      <Link href="/">home</Link>
      {" | "}
      <Link href="/users">users</Link>
      {" | "}
      <Link href="/blogs">blogs</Link>
      {" | "}
      {session ? (
        <>
          <Link href="/blogs/new">create new</Link>
          {" | "}
          <em>{session.user?.name} logged in</em>
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          {" | "}
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
