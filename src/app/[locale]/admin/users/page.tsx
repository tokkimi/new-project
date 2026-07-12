import { db } from "@/lib/db";
import { Link } from "@/i18n/navigation";
import { UserRowActions } from "@/components/admin/user-row-actions";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const users = await db.user.findMany({
    where: q
      ? {
          OR: [
            { email: { contains: q, mode: "insensitive" } },
            { name: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      subscriptionStatus: true,
      createdAt: true,
      _count: { select: { shelfItems: true } },
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl">Users</h1>
        <p className="mt-1 text-muted-foreground">{users.length} shown (max 100)</p>
      </div>

      <form className="max-w-sm">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by name or email..."
          className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm"
        />
      </form>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-3">Name / Email</th>
              <th className="p-3">Joined</th>
              <th className="p-3">Shelf</th>
              <th className="p-3">Role / Plan</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border/60 last:border-0">
                <td className="p-3">
                  <Link href={`/admin/users/${u.id}`} className="font-medium hover:underline">
                    {u.name ?? "—"}
                  </Link>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </td>
                <td className="p-3 text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(u.createdAt)}
                </td>
                <td className="p-3 text-xs text-muted-foreground">{u._count.shelfItems}</td>
                <td className="p-3">
                  <UserRowActions
                    userId={u.id}
                    role={u.role}
                    subscriptionStatus={u.subscriptionStatus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
