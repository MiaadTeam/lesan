import { GetStaticProps } from "next";
import styled from "styled-components";
import { Button } from "../component/Button";
import { getDocs } from "../lib/doclib";
import { Container } from "./docs";
interface Props {
  postData: any;
}
const BodyHome = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  height: 100%;
`;
const Box = styled.div`
  margin: 2.5rem 0 0 0;
  display: flex;
  justify-content: center;
`;
const Header = styled.header`
  font-size: 8rem;
  font-weight: bold;
`;
const Text = styled.h3`
  color: gray;
  margin: 1.5rem 0;
  text-align: center;
`;
const Home: React.FC<Props> = ({ postData }) => {
  return (
    <Container>
      <BodyHome>
        <Header>{postData.title}</Header>
        <Text>{postData.contentHtml}</Text>
        <Box>
          <Button
            bgColor="#0070f3"
            margin="0 0.5rem"
            height="2.5rem"
            width="12rem"
          >
            Start Learing
          </Button>
          <Button
            bgColor="white"
            margin="0 0.5rem"
            height="2.5rem"
            color="#696969"
            width="12rem"
          >
            Documentation
          </Button>
        </Box>
      </BodyHome>
    </Container>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async ({}) => {
  const postData = await getDocs("firstpage", "/mdfile/");

  return {
    props: {
      postData,
    },
  };
};
