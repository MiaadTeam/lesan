/* eslint-disable */

import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "./mdfile/navbar/docs");

export function getFileNames() {
  console.log(process.cwd(), "process.cwd()");
  const postIds = fs.readdirSync(postsDirectory);

  const allPostsData = postIds
    .map((id) => {
      const filename = "mod.md";
      const fullPath = path.join(postsDirectory, id, filename);

      if (!fs.existsSync(fullPath)) {
        return;
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");
      const mydata = matter(fileContents);
      return {
        id,
        ...(mydata.data as { date: string; title: string }),
      };
    })
    .filter((post) => post);

  return allPostsData.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function ListPost() {
  const postIds = fs.readdirSync(postsDirectory);

  return postIds;
}
export function getAllPostIds() {
  let paths: { params: { id: string } }[] = [];

  const postIds = fs.readdirSync(postsDirectory);

  for (let id of postIds) {
    paths.push({ params: { id } });
  }
  return paths;
}
export async function getDate() {
  const postIds = fs.readdirSync(path.join(process.cwd(), "./mdfile/navbar"));

  const allPostsData = postIds
    .map((id) => {
      const fullPath = path.join(postsDirectory, id, "mod.md");

      if (!fs.existsSync(fullPath)) {
        return;
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");

      const mydata = matter(fileContents);
      return {
        id,
        ...(mydata.data as { date: string; title: string }),
      };
    })
    .filter((post) => post);

  return allPostsData.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
export async function getDocs(id: string) {
  const fullPath = path.join(postsDirectory, id, "mod.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  // let processedContent = new showdown.Converter()
  //   text      = '# hello, markdown!',
  //   html      = processedContent.makeHtml(matterResult.content);

  const contentHtml = matterResult.content.toString();
  // console.log(contentHtml);
  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
