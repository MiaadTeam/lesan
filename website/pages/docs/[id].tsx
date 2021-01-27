import "github-markdown-css";
import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styled from "styled-components";
import { SideBar } from "../../component/SideBar";
import { getAllPostIds, getDocs, getFileNames } from "../../lib/doclib";
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2.5rem 0;
  display: flex;
  justify-content: center;
`;
const Docs = styled.div`
  width: 70%;
  height: 100%;
`;
export const Post = ({ postData, allPostsData }): JSX.Element => {
  return (
    <Container>
      <SideBar
        margin="1rem 4.5rem 0 0"
        list={allPostsData.map((id) => id.id)}
      />
      <Docs>
        <div className="markdown-body">
          <ReactMarkdown plugins={[gfm]} children={postData.contentHtml} />
        </div>
      </Docs>
    </Container>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log({ params });
  const allPostsData = getFileNames();

  const postData = await getDocs(params.id.toString() as string);
  return {
    props: {
      postData,
      allPostsData,
    },
  };
};
