const fs = require("node:fs/promises");

const { writeFile } = fs;

const CURRENT_DIR = process.cwd();
const REQUEST_TIME = `In`;

const isString = (s) => typeof s === "string";
const stringFilled = (s) => isString(s) && !!s.length;

const getData = async (url, config) => {
  try {
    if (!url) throw new Error(`Must specify an url`);
    const response = await fetch(url, config);
    const result = await response.json();
    return result || null;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

const writeData = async (saveIn, fileName, data) => {
  try {
    const dest = `${CURRENT_DIR}/${saveIn}/${fileName || "server"}.data.json`;
    await writeFile(dest, data);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = (options = {}) => {
  const dataArr = Array.isArray(options.data) ? options.data : [];
  const saveIn = stringFilled(options.saveIn) ? options.saveIn : "src";

  return {
    name: "saveServerData",
    setup(build) {
      build.onStart(async () => {
        const config = {
          method: "GET",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        };

        for (let i = 0; i < dataArr.length; i++) {
          const data = dataArr[i];
          console.time(REQUEST_TIME);
          console.log(`Getting server data from ${data?.url}...`);
          const result = await getData(data?.url, config);
          if (!result) continue;
          await writeData(saveIn, data?.fileName, JSON.stringify(result));
          console.log(
            `Server data fetched and saved as json in ${saveIn}/${data?.fileName}.data.json`
          );
          console.timeEnd(REQUEST_TIME);
          console.log("-------------------------------------------");
          console.log("-------------------------------------------");
        }
      });
    },
  };
};
