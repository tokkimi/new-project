/** The full Haru Skin logo lockup (monogram + wordmark). */
export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/haru-header-logo.png" alt="Haru Skin" className={className} />
  );
}
