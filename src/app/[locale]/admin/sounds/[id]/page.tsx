import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { SoundForm } from "@/components/admin/sound-form";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";

export default async function EditSoundPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sound = await db.sound.findUnique({ where: { id } });
  if (!sound) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Edit sound</h1>
        <AdminDeleteButton
          endpoint={`/api/admin/sounds/${sound.id}`}
          redirectTo="/admin/sounds"
          title="Delete this sound?"
        />
      </div>
      <SoundForm sound={sound} />
    </div>
  );
}
