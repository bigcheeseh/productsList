import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
`;
const ImageWrapper = styled.div`
  margin: 5px;
  box-shadow: 1px 1px 3px #07364455;
  border-radius: 4px;
`;
const ImagesWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const TextWrapper = styled.div`
  width: 100%;
  padding: 5px 10px;
  color: #073644;
  font-size: 12px;
`;

const EmptyWrapper = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 24px;
`;

const FilterSection = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

const Link = styled.div`
  padding: 10px 0;
  color: #41addd;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 15px;
`;

const TableSection = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 20px 0;
  margin: 25px 0;
`;

export {
  ButtonWrapper,
  EmptyWrapper,
  FilterSection,
  Link,
  Wrapper,
  TableSection,
  SpinnerWrapper,
  ImagesWrapper,
  ImageWrapper,
  TextWrapper,
};
