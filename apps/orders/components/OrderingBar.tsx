import { Box, Button, ButtonGroup, Sheet, Typography } from "@mui/joy";
import { ShoppingCartIcon } from "@tapas/ui/icons";

type Props = {
  total: number;
  confirmText?: string;
  secondaryText?: string;
  cartCount?: number;
  className?: string;
  disabled?: boolean;
  startDecorator?: any;
  onSecondary?: () => void;
  onConfirm?: () => void;
};

export default function OrderingBar({
  total,
  confirmText,
  secondaryText,
  cartCount,
  className,
  disabled,
  startDecorator,
  onSecondary,
  onConfirm,
}: Props) {
  return (
    <Box
      className={`${className} w-full h-12 pl-6 pr-1 rounded-[360px] shadow justify-between items-center inline-flex`}
      sx={{
        backgroundColor: "var(--joy-palette-common-white)",
        borderRadius: 8,
        boxShadow: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
      }}
    >
      <Typography startDecorator={startDecorator} level="title-md">€ {total.toFixed(2)}</Typography>
      <Box className="inline-flex gap-2">
        <Button
          variant="plain"
          color="neutral"
          className="rounded-[360px]"
          onClick={onSecondary}
        >
          {secondaryText ?? "Cancel"}
        </Button>
        {cartCount === undefined ? (
          <Button
            variant="solid"
            color="neutral"
            disabled={disabled}
            className="rounded-[100px]"
            onClick={onConfirm}
          >
            {confirmText ?? "Confirm"}
          </Button>
        ) : (
          <ButtonGroup
            variant="solid"
            color="neutral"
            disabled={disabled}
            sx={{
              "--ButtonGroup-separatorColor": "var(--joy-palette-neutral-16)",
              "& button": {
                "--Button-gap": "0.25rem",
              },
            }}
          >
            <Button
              className="rounded-tl-[100px] rounded-bl-[100px]"
              disabled={disabled}
              startDecorator={<ShoppingCartIcon size={20} />}
            >
              <Sheet
                variant="solid"
                color="accent"
                sx={(theme) => ({
                  ...(disabled && {
                    ...(theme.variants["solidDisabled"]["accent"] as any),
                    "&:hover, &:active":
                      (theme.variants["solidDisabled"]["accent"] as any),
                  }),
                })}
                className="min-w-[24px] rounded-full"
              >
                {cartCount}
              </Sheet>
            </Button>
            <Button
              className="rounded-tr-[100px] rounded-br-[100px]"
              disabled={disabled}
              onClick={onConfirm}
            >
              {confirmText ?? "Confirm"}
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Box>
  );
}
