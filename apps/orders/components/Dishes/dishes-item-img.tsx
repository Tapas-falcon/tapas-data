import { Chip, Skeleton } from "@mui/joy";
import { Suspense, createElement, lazy, useState } from "react";

export interface DishesItemImgProps {
  name: string;
  icon: string;
  key: string;
}

export default function DishesItemImg({ icon, name, key }: DishesItemImgProps) {
  const [iconLoad, setIconLoad] = useState(true);
  return (
    <Skeleton key={key} animation="wave" loading={!name && iconLoad}>
      <Chip
        key={key}
        sx={{
          color: "neutral.540",
          backgroundColor: "neutral.4",
          gap: "0",
          "--Chip-radius": "0.25rem",
          "--Chip-decoratorChildHeight": "1rem",
        }}
        className="rounded text-xs px-1"
        variant="soft"
        startDecorator={
          <Suspense fallback={<></>}>
            {createElement(
              lazy(() =>
                import("@tapas/ui/icons").then((module) => {
                  setIconLoad(false);
                  return {
                    default: (module as unknown as any)[icon] ?? "",
                  };
                })
              ),
              {}
            )}
          </Suspense>
        }
      >
        {name}
      </Chip>
    </Skeleton>
  );
}
