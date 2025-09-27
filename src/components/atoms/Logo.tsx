import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-center mb-8">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/Rick_and_Morty%281%29%281%29-ghTsc6jvxZtT4JuXIrdoctCSf5G5wo.svg"
        alt="Rick and Morty Logo"
        width={300}
        height={64}
      />
    </div>
  );
}
