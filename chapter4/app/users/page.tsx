import { fetchAllUsers } from "@/lib/actions/users";
import Link from "next/link";

async function Users() {
  let { users, success, error } = await fetchAllUsers();
  if (!success) {
    return <p>{error}</p>;
  }
  if (!users || users.length === 0) {
    return <p>No users found</p>;
  }
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
