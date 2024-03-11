import type { Config } from 'tailwindcss'
import sharedConfig from "@tapas/tailwind-config/tailwind.config"

const config: Pick<Config, "important" | "presets"> = {
  presets: [sharedConfig],

};
export default config
