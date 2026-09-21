"use client";
import { signOut, useSession } from "next-auth/react";
import NavLink from "./navLink";

function Navbar() {
  let { data: session } = useSession();
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/users">Users</NavLink>
      <NavLink href="/blogs">Blogs</NavLink>
      {session && <NavLink href="/blogs/new">New blog</NavLink>}
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <em className="text-gray-300">{session.user?.name} logged in</em>
            <button
              onClick={() => signOut()}
              className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">Login</NavLink>
            <NavLink href="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
