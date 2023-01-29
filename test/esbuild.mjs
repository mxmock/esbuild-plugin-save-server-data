import * as esbuild from "esbuild";
import saveServerData from "../index.js";

const OUT_DIR = "test/build";
const JS_FROM = "test/src/main.jsx";
const SAVE_DATA_IN = "test/src/data";

const ctx = await esbuild.context({
  entryPoints: [JS_FROM],
  bundle: true,
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
});

await ctx.watch();
