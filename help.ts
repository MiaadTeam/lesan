import {
  bgBlue,
  bgBrightBlack,
  bgGreen,
  bgMagenta,
  black,
  bold,
  green,
  italic,
  red,
  white,
} from "https://deno.land/std@0.97.0/fmt/colors.ts";

const info = (txt: string) => {
  console.log(
    bgBrightBlack(black(txt)),
  );
};

const command = (txt: string) => {
  console.log(
    bgGreen(black(` -> ${txt} `)),
  );
  console.log();
};

const head = (txt: string) => {
  console.log(
    bgMagenta(white(txt)),
  );
};

export const runHelp = () => {
  /**
     * Please remove log after debug
     * @author syd
     * Please remove log after debug
     */
  console.group();
  console.log();
  console.log(
    bgBlue(italic(red(bold("          Funql Help             ")))),
  );

  console.log();
  console.log();

  head(" init ");
  command("funql --init {blog}");
  info("        it create new funql project.");
  info(
    "        if you pass second parameter {blog}, your project name and folder set by your parameter.",
  );
  console.log("------------------ ");

  console.log();
  console.log();

  head(" upgrade ");
  command("funql --upgrade {version}");
  info("        get the latest or any version of funql");
  info(`        example: pass ${green("latets")} as {version} for parameter`);
  console.log("------------------ ");

  console.log();
  console.log();

  head(" playground ");
  command("funql --playground");
  info("        running one instance of funql playground project");
  console.log("------------------ ");

  console.log();
  console.log();

  head(" declaration ");
  command("funql --declaration");
  info(
    "        generate types and schema and validation declaration of funql project.",
  );
  info("        declaration files saved on declarations folder.");
  info("        be sure to run declaration on funql root project.");
  info("        mosltly used for funql project.");
  console.log("------------------ ");

  console.log();
  console.groupEnd();
};
