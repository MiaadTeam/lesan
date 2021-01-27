import "github-markdown-css";
import styled from "styled-components";

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
const Blog: React.FC<Props> = ({ allPostsData, postData }) => {
  return (
    <Container1>
      <Docse>asdawwwwwwwwwwwwsddjlfhgjdshgjds</Docse>
    </Container1>
  );
};

export default Blog;

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const allPostsData = getFileNames();
//   const postData = await getDocs("Install");

//   return {
//     props: {
//       allPostsData,
//       postData,
//     },
//   };
// };
