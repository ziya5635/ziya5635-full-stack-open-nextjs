"use client";

import Button from "@/components/button";
import { useNotification } from "@/components/providers/notificationProvider";
import { generateUserToken } from "@/lib/actions/users";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const initialState = { error: "", token: "" };

export function GenerateTokenForm({ hasToken }: { hasToken: boolean }) {
  const [state, formAction, isPending] = useActionState(
    generateUserToken,
    initialState,
  );
  const router = useRouter();
  const { showNotification } = useNotification();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (state.error) showNotification(state.error, "error");
  }, [state.error, showNotification]);

  // Refresh so `user.hasToken` is up to date on the server component.
  // The local `state.token` survives the refresh (client state is preserved).
  useEffect(() => {
    if (state.token) router.refresh();
  }, [state.token, router]);

  const handleCopy = async () => {
    if (!state.token) return;
    try {
      await navigator.clipboard.writeText(state.token);
      setCopied(true);
      showNotification("Token copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showNotification("Failed to copy token", "error");
    }
  };

  return (
    <>
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          API token
        </h3>
        <form action={formAction}>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Generating..." : "Generate Token"}
          </Button>
        </form>
      </div>

      {state.token ? (
        // Freshly generated — show the raw token ONCE.
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="mb-2 text-xs font-medium text-amber-800">
            Copy your token now — it won&apos;t be shown again.
          </p>
          <div className="flex items-center gap-2">
            <code className="min-w-0 flex-1 break-all rounded border border-amber-200 bg-white px-3 py-2 font-mono text-xs text-gray-800">
              {state.token}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-800 transition hover:bg-amber-100"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      ) : hasToken ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <code className="block break-all font-mono text-xs text-gray-700">
            A token is configured. Regenerate to reveal a new one.
          </code>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center">
          <p className="text-sm text-gray-500">No token generated yet.</p>
        </div>
      )}
    </>
  );
}

// "use client";

// import Button from "@/components/button";
// import { useNotification } from "@/components/providers/notificationProvider";
// import { generateUserToken } from "@/lib/actions/users";
// import { useRouter } from "next/navigation";
// import { useActionState, useEffect } from "react";

// const initialState = { error: "", token: "" };

// export function GenerateTokenForm() {
//   let [state, formAction, isPending] = useActionState(
//     generateUserToken,
//     initialState,
//   );
//   let router = useRouter();
//   let { showNotification } = useNotification();

//   useEffect(() => {
//     if (state?.error) {
//       showNotification(state.error, "error");
//     }
//   }, [state, showNotification]);

//   useEffect(() => {
//     if (state.token) {
//       router.refresh(); //re-fetches the current force-dynamic route
//     }
//   }, [state.token, router]);

//   return (
//     <form action={formAction} className="space-y-4">
//       <Button type="submit" disabled={isPending}>
//         {isPending ? "Generating..." : "Generate Token"}
//       </Button>
//     </form>
//   );
// }
