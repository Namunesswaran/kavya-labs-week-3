"use client";

import { useMemo, useState } from "react";

const ROLES = ["Admin", "Operator", "Viewer"];
const STATUS_DOT = {
  Active: "#3AA87F",
  Invited: "#C4821F",
  Suspended: "#D6524A",
};

export default function UsersTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  function updateRole(id, role) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }

  function toggleSuspend(id) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Suspended" ? "Active" : "Suspended" }
          : u
      )
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
        <input
          type="text"
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-kavya-panel border border-kavya-line rounded px-4 py-2.5 text-sm text-kavya-fg placeholder:text-kavya-muted focus:outline-none focus:border-kavya-accent w-full max-w-xs"
        />
        <span className="text-kavya-muted text-sm">
          {filtered.length} of {users.length} team members
        </span>
      </div>

      <div className="overflow-x-auto border border-kavya-line rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-kavya-line text-left text-kavya-muted">
              <th scope="col" className="px-4 py-3 font-medium">Name</th>
              <th scope="col" className="px-4 py-3 font-medium">Role</th>
              <th scope="col" className="px-4 py-3 font-medium">Status</th>
              <th scope="col" className="px-4 py-3 font-medium">Joined</th>
              <th scope="col" className="px-4 py-3 font-medium sr-only">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-kavya-line last:border-b-0">
                <td className="px-4 py-3">
                  <div>{u.name}</div>
                  <div className="text-kavya-muted text-xs">{u.email}</div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => updateRole(u.id, e.target.value)}
                    aria-label={`Role for ${u.name}`}
                    className="bg-kavya-bg border border-kavya-line rounded px-2 py-1.5 text-sm focus:outline-none focus:border-kavya-accent"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: STATUS_DOT[u.status] }}
                    />
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-kavya-muted">{u.joined}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => toggleSuspend(u.id)}
                    className="text-kavya-muted hover:text-kavya-fg transition-colors text-sm"
                  >
                    {u.status === "Suspended" ? "Reinstate" : "Suspend"}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-kavya-muted">
                  No one matches &quot;{query}&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-kavya-muted text-xs mt-3">
        Changes here are local to this browser session — no database is connected yet.
      </p>
    </div>
  );
}
