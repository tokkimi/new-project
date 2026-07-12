import type { ComponentType } from "react";
import {
  Activity,
  AlertTriangle,
  ExternalLink,
  Mail,
  Newspaper,
  Package,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDashboardStats } from "@/lib/analytics";
import { db } from "@/lib/db";

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
}) {
  return (
    <Card className="gap-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        <p className="text-sm">{label}</p>
      </div>
      <p className="font-serif text-3xl">{value}</p>
    </Card>
  );
}

export default async function AdminOverviewPage() {
  const stats = await getDashboardStats();
  const maxSignups = Math.max(...stats.signupsByDay.map((d) => d.count), 1);
  const topProductIds = stats.topShelfProducts.map((p) => p.productId);
  const topProducts = topProductIds.length
    ? await db.product.findMany({
        where: { id: { in: topProductIds } },
        select: { id: true, name: true, brand: true },
      })
    : [];
  const topById = new Map(topProducts.map((p) => [p.id, p]));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl">Admin cockpit</h1>
        <p className="mt-1 text-muted-foreground">
          Vision globale, actions rapides, alertes catalogue et activite recente.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Button asChild variant="outline" className="justify-start">
          <Link href="/admin/products/new">
            <Package className="size-4" /> Ajouter un produit
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/admin/news/new">
            <Newspaper className="size-4" /> Publier une news
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/admin/newsletter">
            <Mail className="size-4" /> Newsletter
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-start">
          <Link href="/admin/logs">
            <Activity className="size-4" /> Logs
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Users} label="Total users" value={stats.totalUsers} />
        <StatTile icon={Sparkles} label="Premium users" value={stats.premiumUsers} />
        <StatTile icon={Package} label="Products" value={stats.totalProducts} />
        <StatTile icon={Newspaper} label="News items" value={stats.totalNews} />
        <StatTile icon={ShoppingBag} label="Shelf items" value={stats.totalShelfItems} />
        <StatTile icon={Mail} label="Newsletter subscribers" value={stats.newsletterSubscribers} />
        <StatTile icon={Users} label="New users 7d" value={stats.newUsersThisWeek} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="gap-4">
          <h2 className="font-serif text-lg">Signups - last 14 days</h2>
          <div className="flex h-40 items-end gap-1.5">
            {stats.signupsByDay.map((d) => (
              <div key={d.date} className="group relative flex-1" title={`${d.date}: ${d.count}`}>
                <div
                  className="w-full rounded-t-md bg-primary transition-opacity group-hover:opacity-80"
                  style={{ height: `${Math.max((d.count / maxSignups) * 100, d.count > 0 ? 6 : 2)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{stats.signupsByDay[0]?.date}</span>
            <span>{stats.signupsByDay[stats.signupsByDay.length - 1]?.date}</span>
          </div>
        </Card>

        <Card className="gap-4">
          <h2 className="font-serif text-lg">Activity - last 14 days</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-medium">{stats.events.scansCompleted}</p>
              <p className="text-xs text-muted-foreground">Product scans</p>
            </div>
            <div>
              <p className="text-2xl font-medium">{stats.events.routinesBuilt}</p>
              <p className="text-xs text-muted-foreground">Routines built</p>
            </div>
            <div>
              <p className="text-2xl font-medium">{stats.events.auditsRun}</p>
              <p className="text-xs text-muted-foreground">Audits run</p>
            </div>
            <div>
              <p className="text-2xl font-medium">{stats.events.shelfItemsAdded}</p>
              <p className="text-xs text-muted-foreground">Shelf items added</p>
            </div>
            <div>
              <p className="text-2xl font-medium">{stats.events.checkoutsStarted}</p>
              <p className="text-xs text-muted-foreground">Checkouts started</p>
            </div>
            <div>
              <p className="text-2xl font-medium">{stats.events.pageViews}</p>
              <p className="text-xs text-muted-foreground">Page views</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-warning" />
            <h2 className="font-serif text-lg">Catalogue a ameliorer</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Images manquantes", stats.catalogIssues.missingImages],
              ["Compositions a completer", stats.catalogIssues.missingComposition],
              ["Usage a completer", stats.catalogIssues.missingUsage],
              ["Source officielle manquante", stats.catalogIssues.missingSource],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-border p-3">
                <p className="text-2xl font-medium">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/admin/products">
              Corriger les produits <ExternalLink className="size-4" />
            </Link>
          </Button>
        </Card>

        <Card className="gap-4">
          <h2 className="font-serif text-lg">Produits les plus sauvegardes</h2>
          <div className="grid gap-2">
            {stats.topShelfProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">Pas encore assez de donnees.</p>
            ) : (
              stats.topShelfProducts.map((item) => {
                const product = topById.get(item.productId);
                return (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{product?.name ?? item.productId}</p>
                      <p className="text-xs text-muted-foreground">{product?.brand ?? "Produit"}</p>
                    </div>
                    <Badge>{item._count.productId}</Badge>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="gap-4">
          <h2 className="font-serif text-lg">Nouveaux utilisateurs</h2>
          <div className="grid gap-2">
            {stats.latestUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{user.name ?? user.email}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Badge variant={user.subscriptionStatus === "ACTIVE" ? "default" : "outline"}>
                  {user.subscriptionStatus}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="gap-4">
          <h2 className="font-serif text-lg">Derniers evenements</h2>
          <div className="grid gap-2">
            {stats.latestEvents.map((event) => (
              <div key={event.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{event.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("en", { dateStyle: "short", timeStyle: "short" }).format(event.createdAt)}
                  </p>
                </div>
                <p className="truncate text-xs text-muted-foreground">{event.path ?? event.userId ?? "No path"}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
