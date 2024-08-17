import { defineConfig } from "cypress";

const { removeDirectory } = require("cypress-delete-downloads-folder");

// const { lstatSync, readdirSync } = require("fs");
import { lstatSync, readdirSync } from "fs";
import { join } from "path";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:4200",
        trashAssetsBeforeRuns: true,
        setupNodeEvents(on, _config) {
            on("task", {
                removeDirectory,

                readdirSync({ path }) {
                    return readdirSync(path);
                },

                lstatSync({ path }) {
                    return lstatSync(path);
                },

                getFilesOrderedByTime({ path }) {
                    return readdirSync(path)
                        .map((entry) => join(path, entry))
                        .filter((entryWithPath) =>
                            lstatSync(entryWithPath).isFile()
                        )
                        .map((fileName) => ({
                            fileName,
                            mtime: lstatSync(fileName).mtime,
                        }))
                        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
                        .map((f) => f.fileName);
                },
            });
        },
    },
});
