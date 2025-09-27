import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-center mb-8">
      <Image src="/header-logo.svg" alt="Rick and Morty Logo" width={300} height={64} />
    </div>
  );
}
