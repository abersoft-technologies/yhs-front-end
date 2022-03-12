import styled from 'styled-components';

interface IBarProgIndiNum {
  position: number;
  lastItem: boolean;
}

export const BarProgressIndicatonNumber = styled.div`
  position: absolute;
  background: #eaeaea;
  top: 100%;
  left: calc(
    ${(props: IBarProgIndiNum) => props.position}% -
      ${(props: IBarProgIndiNum) => (props.lastItem ? 1 : 0)}%
  );
  width: 4px;
  height: 20px;
  display: flex;
  justify-content: center;
  label {
    position: absolute;
    top: 100%;
    color: #464646;
  }
`;
export const BarProgressIndicatonNumberSmall = styled.div`
  position: absolute;
  background: #eaeaea;
  top: 100%;
  left: ${(props: IBarProgIndiNum) => props.position}%;
  width: 4px;
  height: 10px;
  display: flex;
  justify-content: center;

  label {
    position: absolute;
    top: 100%;
    color: #464646;
    font-size: 0.8rem;
  }
`;
