const { wirteFileSync, mkdirSync, writeFileSync } = require("fs");
require("dotenv").config();

const targetPath = "./src/environments/environments.ts";
const envFileContent = `
    export const environments = {
    baseUrl: 'http://localhost:8083',
    jwt_expiration: 30 * 60 * 1000,
    mapbox_key: '${process.env["MAPBOX_KEY"]}'
};
`;

mkdirSync("./src/environments", { recursive: true });

writeFileSync(targetPath, envFileContent);
