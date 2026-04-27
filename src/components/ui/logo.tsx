import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/Lederer Logo.svg"
      alt="Lederer Elastic-Garne"
      width={200}
      height={49}
      className={className}
      priority
    />
  );
}
