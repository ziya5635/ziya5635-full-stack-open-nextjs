"use client";

import { useActionState } from "react";
import { registerUser } from "@/lib/actions/users";

const initialState = {
  error: "",
  username: "",
  name: "",
  password: "",
  passwordConfirm: "",
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
              defaultValue={state.username}
            />
          </label>
        </div>

        <div>
          <label>
            Name
            <input type="text" name="name" required defaultValue={state.name} />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              defaultValue={state.password}
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              required
              defaultValue={state.passwordConfirm}
            />
          </label>
        </div>

        {state.error && <p style={{ color: "red" }}>{state.error}</p>}

        <button type="submit" disabled={pending}>
          {pending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
