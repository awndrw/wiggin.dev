const { exec } = require("child_process");

const { version } = require("../package.json");

require("dotenv").config();

exec(
  `yarn dlx @datadog/datadog-ci sourcemaps upload .next/static/chunks \
--service=wiggin.dev \
--release-version=${version} \
--minified-path-prefix=/_next/static/chunks \
--repository-url=https://github.com/wiggindev/wiggin.dev`,
  process.env,
  (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  }
);
