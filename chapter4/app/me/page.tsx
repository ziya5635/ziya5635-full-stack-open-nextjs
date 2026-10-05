import { notFound } from "next/navigation";
import { GenerateTokenForm } from "./generateTokenForm";
import { getCurrentUserAction } from "@/lib/actions/users";
import ErrorBox from "@/components/errorBox";
import { getReadAndUnreadAction } from "@/lib/actions/readingLists";
import ReadingListItem from "./readingListItem";

export const dynamic = "force-dynamic";

async function MePage() {
  let userResult = await getCurrentUserAction();
  let readingListResult = await getReadAndUnreadAction();

  if (!userResult.success) {
    return <ErrorBox text={userResult.error} />;
  }
  if (!readingListResult.success) {
    return <ErrorBox text={readingListResult.error} />;
  }

  let { user } = userResult;
  let { read = [], unread = [] } = readingListResult;

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

        {/* Reading list card */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Reading list
          </h3>

          <section className="mb-6">
            <h4 className="mb-3 text-sm font-semibold text-gray-700">
              Unread ({unread.length})
            </h4>
            {unread.length === 0 ? (
              <p className="text-sm text-gray-500">Nothing unread.</p>
            ) : (
              <ul className="space-y-2">
                {unread.map((item) => (
                  <ReadingListItem
                    key={item.id}
                    item={item}
                    alreadyRead={false}
                  />
                ))}
              </ul>
            )}
          </section>

          <section>
            <h4 className="mb-3 text-sm font-semibold text-gray-700">
              Read ({read.length})
            </h4>
            {read.length === 0 ? (
              <p className="text-sm text-gray-500">Nothing read yet.</p>
            ) : (
              <ul className="space-y-2">
                {read.map((item) => (
                  <ReadingListItem key={item.id} item={item} />
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Token card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <GenerateTokenForm hasToken={user.hasToken} />
        </div>
      </div>
    </div>
  );
}

export default MePage;
