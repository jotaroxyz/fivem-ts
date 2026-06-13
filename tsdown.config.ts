import { defineConfig, type UserConfig } from "tsdown";
import postBuild from "./scripts/postBuild.ts";

const config: Record<string, UserConfig> = {
  resource: {
    outExtensions() {
      return { js: ".js" };
    },
    outputOptions: {
      keepNames: true,
      entryFileNames: "[name].js",
    },
    deps: {
      skipNodeModulesBundle: false,
      alwaysBundle: "/.*/",
      onlyBundle: false,
      neverBundle: "static/*",
    },
  },

  client: {
    platform: "browser",
    target: "es2023",
    format: "iife",
  },

  server: {
    platform: "node",
    format: "cjs",
  },
};

function createConfig(name: string): UserConfig {
  return {
    name,
    entry: {
      [name]: `./${name}/index.ts`,
    },
    tsconfig: `./${name}/tsconfig.json`,
    ...config.resource,
    ...config[name],
    onSuccess: postBuild,
  };
}

export default defineConfig([createConfig("client"), createConfig("server")]);
