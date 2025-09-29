"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <div className="flex items-center justify-center bg-background p-8">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center text-8xl mb-8">
          <Image src="/error.png" alt="Error image" width={140} height={64} />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Algo salio mal</h1>
        <p className="text-muted-foreground mb-8 text-lg">Revisa tu conexión a internet o intenta nuevamente más tarde.</p>
        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="w-full px-6 py-3 bg-transparent text-primary rounded-md transition-colors font-medium border border-primary "
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
