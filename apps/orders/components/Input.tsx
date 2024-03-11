import { Box, Input, Typography } from "@mui/joy";
import { ColorPaletteProp, SxProps, VariantProp } from "@mui/joy/styles/types";
import { ReactNode } from "react";

export interface Props {
  label?: string;
  sx?: SxProps;
  variant?: VariantProp;
  color?: ColorPaletteProp;
  placeholder?: string;
  height?: string;
  inputHeight?: string;
  className?: string;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  width?: string;
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
}

export default function TapasInput({
  sx,
  variant,
  color,
  placeholder,
  label,
  className,
  disabled,
  error,
  size,
  inputHeight,
  startDecorator,
  endDecorator,
  height,
  width,
}: Props) {
  return (
    <Box
      className={`flex grow flex-col pt-4 ${className}`}
      sx={{ ...sx, width: width, height: height }}
    >
      <Input
        variant={variant ?? "outlined"}
        color={color ?? "neutral"}
        disabled={disabled}
        error={error}
        size={size}
        placeholder={placeholder ?? ""}
        startDecorator={
          <>
            {label && (
              <Typography
                className="absolute left-4 px-0.5 z-20"
                fontSize={12}
                fontWeight={400}
                lineHeight="normal"
                sx={{
                  color: "neutral.870",
                  top: "-0.5rem",
                  backgroundColor: "primary.100",
                }}
              >
                {label}
              </Typography>
            )}
            {startDecorator}
          </>
        }
        endDecorator={endDecorator}
        sx={{ height: inputHeight ?? "2.5rem" }}
        className="relative"
      />
    </Box>
  );
}
