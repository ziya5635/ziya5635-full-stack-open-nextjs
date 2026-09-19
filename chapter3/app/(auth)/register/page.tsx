"use client";

import { useActionState } from "react";
import { registerUser } from "@/lib/actions/users";

const initialState = {
  error: "",
  field: "",
};

export default function RegisterPage() {
  let [state, formAction, pending] = useActionState(registerUser, initialState);

  return (
    <div>
      <h2>Register</h2>

      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              aria-invalid={state.field === "username"}
            />
          </label>

          {state.field === "username" && <p>{state.error}</p>}
        </div>

        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>

        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>

        {state.error && !state.field && <p>{state.error}</p>}

        <button type="submit" disabled={pending}>
          {pending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
