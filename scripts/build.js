import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import eslint from "@rollup/plugin-eslint";
import pkg from "../package.json";

export default [{
    input: "src/index.ts",
    output: [{
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "es",
      },
      {
        file: pkg.browser,
        name: pkg.name,
        format: "umd",
        globals: {
          lodash: "-"
        }
      },
    ],
    external: ["lodash"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        exclude: "node_modules/**",
        typescript: require("typescript"),
        useTsconfigDeclarationDir: true,
      }),
      eslint()
    ],
  },

];