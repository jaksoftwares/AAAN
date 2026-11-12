import Image from "next/image";

// Photo wrapper. Uses the brand panel when no image is supplied, so a page never shows a broken image.
// Phase 1: sources are files in /public/media. Phase 2: the same props take a Cloudinary path.

export function Photo({
  src,
  alt,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
  fit = "cover",
  focus = "center",
}: {
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fit?: "cover" | "contain";
  // Where a cropped image keeps its subject: portraits use "top" so faces are not cut off.
  focus?: "center" | "top";
}) {
  if (!src) {
    return (
      <div role="img" aria-label={alt} className={`relative flex items-center justify-center bg-forest ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logos/svg/aaan-mark-white.svg" alt="" className="h-1/3 w-auto" aria-hidden="true" />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-surface-sand ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${fit === "cover" ? "object-cover" : "object-contain"} ${focus === "top" ? "object-top" : "object-center"}`}
      />
    </div>
  );
}
