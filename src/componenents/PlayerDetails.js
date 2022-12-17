// PlayerDetails.js

import React from "react";
import { Container, Row, Col, Image, Table, InputGroup, Form } from 'react-bootstrap';
import PlayerControls from "./PlayerControls";
import Seeker from "./Seeker";
import { TbStar, TbStarHalf, TbSearch } from 'react-icons/tb'

function PlayerDetails(props) {
  return (
    <Container className="mt-3 player p-5" fluid>
      {/* Search field */}
      <InputGroup>
        <InputGroup.Text id="btnGroupAddon" className="search-bar">
          <TbSearch />
        </InputGroup.Text>
        <Form.Control
          className="search-bar"
          type="text"
          placeholder="Search"
          aria-describedby="btnGroupAddon"
        />
      </InputGroup>

      <Row id="details-starts" className="d-flex aligns-items-center justify-content-center mt-3">
        <Col className="artwork paused" md="auto">
          <Image src="https://source.unsplash.com/featured/400x400" fluid rounded className="paused" />
            <PlayerControls />
        </Col>
        <Col className="mt-5">
          <Row className="text-center">
            <Col>
              <h2 className="heavy">Set the Stage</h2>
              <p><span>Jimmy Needham</span>&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;<span>2019</span>&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;<span>14 Songs</span></p>
              <>
                <TbStar />
                <TbStar />
                <TbStar />
                <TbStar />
                <TbStarHalf />
              </>
            </Col>
          </Row>

          <Row>
            <Table hover>
              <tbody className="playlist">
                <tr>
                  <td>1</td>
                  <td>Mark Lorem ipsum</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Iam ruinas videres</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Cur deinde Metrodori</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Cur deinde Metrodori</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Vonsectetur adipiscing</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Col>

        <Seeker />
      </Row>

    </Container>
  );
}

export default PlayerDetails;