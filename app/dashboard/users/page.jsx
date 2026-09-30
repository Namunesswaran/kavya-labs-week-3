import UsersTable from "@/components/dashboard/UsersTable";
import { MOCK_USERS } from "@/lib/mock-data";

export const metadata = {
  title: "Users — Kavya Labs",
};

export default function UsersPage() {
  return (
    <div className="wrap md:px-8 py-8 md:py-10">
      <h1 className="font-serif font-medium text-2xl mb-1">Team members</h1>
      <p className="text-kavya-muted text-sm mb-8">
        Manage roles and access for everyone on the Kavya Labs account.
      </p>

      <UsersTable initialUsers={MOCK_USERS} />
    </div>
  );
}
