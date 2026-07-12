import { SoundForm } from "@/components/admin/sound-form";

export default function NewSoundPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-3xl">New sound</h1>
      <SoundForm />
    </div>
  );
}
