import { Users, Sparkles, Package, Newspaper, ShoppingBag, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/analytics";

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
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

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl">Overview</h1>
        <p className="mt-1 text-muted-foreground">Site-wide stats, last updated on page load.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Users} label="Total users" value={stats.totalUsers} />
        <StatTile icon={Sparkles} label="Premium users" value={stats.premiumUsers} />
        <StatTile icon={Package} label="Products" value={stats.totalProducts} />
        <StatTile icon={Newspaper} label="News items" value={stats.totalNews} />
        <StatTile icon={ShoppingBag} label="Shelf items (all users)" value={stats.totalShelfItems} />
        <StatTile icon={Mail} label="Newsletter subscribers" value={stats.newsletterSubscribers} />
        <StatTile icon={Users} label="New users (7d)" value={stats.newUsersThisWeek} />
      </div>

      <Card className="gap-4">
        <h2 className="font-serif text-lg">Signups — last 14 days</h2>
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
        <h2 className="font-serif text-lg">Activity — last 14 days</h2>
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
  );
}
