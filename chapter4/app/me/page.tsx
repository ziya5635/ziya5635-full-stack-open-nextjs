import { notFound } from "next/navigation";
import { GenerateTokenForm } from "./generateTokenForm";
import { getCurrentUserAction } from "@/lib/actions/users";

export const dynamic = "force-dynamic";

async function MePage() {
  let { user, success, error } = await getCurrentUserAction();

  if (!success) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-700 shadow-sm">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Account
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">My profile</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your account details and API token.
          </p>
        </header>

        {/* Profile card */}
        <div className="mb-6 flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-lg font-semibold uppercase text-white shadow-sm">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-2xl font-bold text-gray-900">
              {user.name}
            </h2>
            <p className="truncate text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>

        {/* Details card */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Details
          </h3>

          <dl className="space-y-3">
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-sm font-medium text-gray-500">User ID</dt>
              <dd className="truncate text-sm font-medium text-gray-900">
                {user.id}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="truncate text-sm font-medium text-gray-900">
                {user.username}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="truncate text-sm font-medium text-gray-900">
                {user.name}
              </dd>
            </div>
          </dl>
        </div>

        {/* Token card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                API token
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Use this token to authenticate API requests.
              </p>
            </div>
            <GenerateTokenForm />
          </div>

          {user.token ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <code className="block break-all font-mono text-xs text-gray-700">
                {user.token}
              </code>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center">
              <p className="text-sm text-gray-500">No token generated yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MePage;
