import * as esbuild from "esbuild";
import saveServerData from "../index.js";
import { writeFile } from "node:fs/promises";

const OUT_DIR = "test/prod";
const JS_FROM = "test/src/main.jsx";
const SAVE_DATA_IN = "test/src/data";

const TIME_LOG = `Build time`;

console.time(TIME_LOG);
const result = await esbuild.build({
  entryPoints: [JS_FROM],
  bundle: true,
  minify: true,
  plugins: [
    saveServerData({
      saveIn: SAVE_DATA_IN,
      data: [
        {
          fileName: `posts`,
          url: `https://jsonplaceholder.typicode.com/posts`,
        },
        {
          fileName: `todos`,
          url: `https://jsonplaceholder.typicode.com/todos`,
        },
      ],
    }),
  ],
  outdir: `${OUT_DIR}/js`,
  metafile: true,
  legalComments: "none",
  pure: ["console"],
});
console.timeEnd(TIME_LOG);

await writeFile("meta.json", JSON.stringify(result.metafile));
