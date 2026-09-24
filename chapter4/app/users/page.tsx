import { fetchAllUsers } from "@/lib/actions/users";
import Link from "next/link";

async function Users() {
  const { users, success, error } = await fetchAllUsers();

  if (!success) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-700 shadow-sm">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-50">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Community
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-500">
            Meet the people writing on our platform.
          </p>
        </header>

        {/* Empty state */}
        {!users || users.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-medium text-gray-700">No users found</p>
            <p className="mt-1 text-sm text-gray-500">
              There are no users to display yet.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {users.map((user) => (
              <li key={user.id}>
                <Link
                  href={`/users/${user.username}`}
                  className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  {/* Avatar with initials */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-semibold uppercase text-white shadow-sm">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-gray-900 group-hover:text-blue-600">
                      {user.name}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      @{user.username}
                    </p>
                  </div>

                  <span className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Users;
