"use client";

import { useSession } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RoutineWorkspace } from "@/components/routine-workspace";

export default function ShelfPage() {
  const { status } = useSession();

  if (status !== "authenticated") {
    return (
      <Card className="mx-auto max-w-md items-center gap-4 py-14 text-center">
        <h1 className="font-serif text-2xl">Mon espace routine</h1>
        <p className="max-w-sm text-muted-foreground">
          Connecte-toi pour gérer tes produits, favoris, notes, vidéos et routines personnelles.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link href="/sign-in">Se connecter</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-up">Créer un compte</Link>
          </Button>
        </div>
      </Card>
    );
  }

  return <RoutineWorkspace />;
}
