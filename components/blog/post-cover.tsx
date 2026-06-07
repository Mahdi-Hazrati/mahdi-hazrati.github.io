import Image from "next/image";
import { cn } from "@/lib/utils";

type PostCoverProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function PostCover({ src, alt, className, priority }: PostCoverProps) {
  const isExternal = src.startsWith("http://") || src.startsWith("https://");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/80 bg-muted/30 aspect-[16/9]",
        className
      )}
    >
      {isExternal ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
          priority={priority}
          unoptimized
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
