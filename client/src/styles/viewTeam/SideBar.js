import styled from "styled-components";

const paddingLeft = "padding-left: 10px";

export const SideBarDiv = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #4e3a4c;
  color: #958993;
`;

export const SideBarH1 = styled.h1`
  color: #fff;
  font-size: 20px;
`;

export const SideBarUl = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

export const SideBarLi = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
    cursor: pointer;
  }
`;

export const SideBarLiHeader = styled.li`
  ${paddingLeft};
`;

export const PushLeft = styled.div`
  ${paddingLeft};
`;

export const Green = styled.span`
  color: #38978d;
`;
