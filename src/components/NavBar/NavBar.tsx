import React from "react";
import styled from "styled-components";
import AlarmIcon from "@material-ui/icons/Alarm";

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 75%;
  padding: 1em;

  margin: 0 auto;
`;

const NavBar = () => {
  return (
    <Nav>
      <h1>
        TODO LIST <AlarmIcon />
      </h1>
    </Nav>
  );
};

export default NavBar;
