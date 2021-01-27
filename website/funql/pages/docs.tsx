import "github-markdown-css";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styled from "styled-components";
import { SideBar } from "../component/SideBar";
import { getDocs, getFileNames } from "../lib/doclib";

export const Container = styled.div`
  height: 100%;
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container1 = styled.div`
  width: 100%;
  height: 100%;
  padding: 2.5rem 0;
  display: flex;
  justify-content: center;
`;
const Docse = styled.div`
  width: 70%;
  height: 100%;
`;
interface Props {
  allPostsData: any;
  postData: any;
}
const Docs: React.FC<Props> = ({ allPostsData, postData }) => {
  return (
    <Container1>
      <SideBar
        margin="1rem 4.5rem 0 0"
        list={allPostsData.map((id) => id.id)}
      />
      <Docse>
        <div className="markdown-body">
          <ReactMarkdown plugins={[gfm]} children={postData.contentHtml} />
        </div>
      </Docse>
    </Container1>
  );
};

export default Docs;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPostsData = getFileNames();
  const postData = await getDocs("Install");

  return {
    props: {
      allPostsData,
      postData,
    },
  };
};
