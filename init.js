import { $, file } from "bun";

const cwd = process.cwd();
const name = process.argv[3] || cwd.slice(cwd.lastIndexOf("/") + 1);

const pkg = file("./package.json");

await pkg.json().then((obj) => {
  obj.name = name;
  obj.license = "ISC";
  obj.scripts = {
    "build": "bun run build.js",
    "watch": "bun run build.js --watch",
    "format": "bun run biome format --write",
    "lint": "bun run biome lint --write"
  }

  delete obj.bugs;
  delete obj.repository;

  return pkg.write(JSON.stringify(obj, null, 2));
});

await $`rm -rf init.js`;