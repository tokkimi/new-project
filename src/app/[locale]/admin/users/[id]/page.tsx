import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserDetailForm } from "@/components/admin/user-detail-form";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await db.user.findUnique({
    where: { id },
    include: {
      skinProfile: true,
      _count: { select: { shelfItems: true } },
    },
  });
  if (!user) notFound();

  const [bilans, faceScans] = await Promise.all([
    db.bilan.findMany({ where: { userId: id }, orderBy: { createdAt: "desc" }, take: 5 }),
    db.faceScanResult.findMany({ where: { userId: id }, orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">{user.name ?? user.email}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Joined {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(user.createdAt)} ·{" "}
            {user._count.shelfItems} shelf items
          </p>
        </div>
        <AdminDeleteButton
          endpoint={`/api/admin/users/${user.id}`}
          redirectTo="/admin/users"
          title="Delete this user?"
          description="This permanently deletes the account and their shelf. This can't be undone."
        />
      </div>

      <UserDetailForm
        userId={user.id}
        name={user.name}
        email={user.email}
        role={user.role}
        subscriptionStatus={user.subscriptionStatus}
        faceScanCredits={user.faceScanCredits}
        newsletterSubscribed={user.newsletterSubscribed}
      />

      <Card className="rounded-[1.5rem]">
        <h2 className="font-serif text-xl">Skin profile</h2>
        {user.skinProfile ? (
          <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <p>
              <span className="font-medium text-foreground">Skin type: </span>
              {user.skinProfile.skinType}
            </p>
            <p>
              <span className="font-medium text-foreground">Age range: </span>
              {user.skinProfile.ageRange ?? "—"}
            </p>
            <p>
              <span className="font-medium text-foreground">Climate: </span>
              {user.skinProfile.climate ?? "—"}
            </p>
            <p>
              <span className="font-medium text-foreground">Budget: </span>
              {user.skinProfile.budget ?? "—"}
            </p>
            <p className="sm:col-span-2">
              <span className="font-medium text-foreground">Concerns: </span>
              {user.skinProfile.concerns.join(", ") || "—"}
            </p>
            <p className="sm:col-span-2">
              <span className="font-medium text-foreground">Sensitivities: </span>
              {user.skinProfile.sensitivities.join(", ") || "—"}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No skin profile quiz completed yet.</p>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-[1.5rem]">
          <h2 className="font-serif text-xl">Recent check-ins (bilans)</h2>
          {bilans.length === 0 ? (
            <p className="text-sm text-muted-foreground">No check-ins yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {bilans.map((bilan) => (
                <div key={bilan.id} className="flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">
                    {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(bilan.createdAt)}
                  </span>
                  <Badge>{bilan.overallScore}/100</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="rounded-[1.5rem]">
          <h2 className="font-serif text-xl">Recent face scans</h2>
          {faceScans.length === 0 ? (
            <p className="text-sm text-muted-foreground">No face scans yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {faceScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">
                    {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(scan.createdAt)}
                  </span>
                  <Badge>{scan.overallScore}/100</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
