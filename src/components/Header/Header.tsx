import { Typography } from "@mui/material";
import React from "react";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full my-5 items-center text-center justify-center">
      <Typography color="black" variant="h3">
        {children}
      </Typography>
    </div>
  );
}
