import React from "react";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full my-5 items-center justify-center text-center">
      <h3 className="text-black text-2xl sm:text-4xl font-medium">
        {children}
      </h3>
    </div>
  );
}
