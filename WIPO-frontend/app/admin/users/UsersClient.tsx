"use client";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
};

const DUMMY_USERS: User[] = [
  { id: 1, name: "Aman Kumar", email: "aman@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Rahul Sharma", email: "rahul@example.com", role: "User", status: "Inactive" },
  { id: 3, name: "Neha Verma", email: "neha@example.com", role: "User", status: "Active" },
];

export default function UsersClient() {
  return (
    <main className="min-h-screen bg-white px-6 py-10">
      {/* Page Header */}
      <section className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-700 mb-1">Admin Users</h1>
          <p className="text-gray-600">
            View and manage all users in the system.
          </p>
        </div>

        <button
          className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
          onClick={() => console.log("Add new user")}
        >
          + Add User
        </button>
      </section>

      {/* Users Table */}
      <section className="max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full border border-green-100 rounded-xl overflow-hidden">
          <thead className="bg-green-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">Name</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">Email</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">Role</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">Status</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-green-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_USERS.map((user) => (
              <tr
                key={user.id}
                className="border-t border-green-100 hover:bg-green-50/40 transition"
              >
                <td className="px-4 py-3 text-sm text-gray-700">{user.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{user.role}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm flex gap-2">
                  <button
                    className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                    onClick={() => console.log("View user", user.id)}
                  >
                    View
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg border border-green-600 text-green-700 hover:bg-green-50 transition"
                    onClick={() => console.log("Edit user", user.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
