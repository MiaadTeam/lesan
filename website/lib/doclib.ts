/* eslint-disable */

import fs from "fs";
import matter from "gray-matter";
import path from "path";
/**
 * postsDirectory is path file for read and process.swd() which gives
 * us the directory where Next.js is being executed.
 */
const postsDirectory = path.join(process.cwd(), "./mdfile/navbar/docs");
/**
 *
 * @returns Sort fileName by date and return json format
 * @example
 * {
 * date:"2020-03-01",
 * title:"example"
 * }
 */
export function getFileNames() {
  const fileNamePost = fs.readdirSync(postsDirectory);

  const allPostsData = fileNamePost
    .map((id) => {
      const fullPath = path.join(postsDirectory, id, "mod.md");

      if (!fs.existsSync(fullPath)) {
        return;
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");
      const fileContent = matter(fileContents);
      return {
        id,
        ...(fileContent.data as { date: string; title: string }),
      };
    })
    .filter((post) => post);
  /**
   * sort by date
   */
  return allPostsData.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * @returns file name post for dynamic path
 */
export function getAllPostFilesName() {
  let paths: { params: { id: string } }[] = [];

  const postIds = fs.readdirSync(postsDirectory);

  for (let id of postIds) {
    paths.push({ params: { id } });
  }
  return paths;
}
/**
 *
 * @param fileName The first input string file name
 * @param pathFile is optional if it exists, we will use it
 *
 * @returns json content of markdown file with date, title and contentHtml
 */

export async function getDocs(fileName: string, pathFile?: string) {
  const fullPath = pathFile
    ? path.join(process.cwd() + pathFile, fileName, "mod.md")
    : path.join(postsDirectory, fileName, "mod.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  /**
   *  Use gray-matter to parse the post metadata section
   */
  const matterResult = matter(fileContents);

  const contentHtml = matterResult.content.toString();
  /**
   * Combine the data with the id and contentHtml
   */
  return {
    fileName,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
