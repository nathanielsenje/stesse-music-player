// PlayerDetails.js

import React from "react";
import { Container, Row, Col, Image, Table } from 'react-bootstrap';
import PlayerControls from "./PlayerControls";
import { TbStar,TbStarHalf } from 'react-icons/tb'

function PlayerDetails(props) {
  return (    <Container className="sectopm" fluid>
          <Row>
            <Col className="artwork" md="auto">
              <Image src="https://source.unsplash.com/featured/400x400" rounded fluid>
              </Image>
              <PlayerControls />
            </Col>
            <Col className="playlistCol">
              <Row>
                <Col>
                  <h2 className="heavy">Lorem Mask</h2>
                  <p><span>Jimmy Needham</span>&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;<span>2019</span>&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;<span>14 Songs</span></p>
                </Col>
                <Col md="auto">
                  <TbStar />
                  <TbStar />
                  <TbStar />
                  <TbStar />
                  <TbStarHalf />
                </Col>
              </Row>
              <Row>
                <Table hover>
                  <tbody className="playlist">
                    <tr>
                      <td>1</td>
                      <td>MarkLorem ipsum dolor sit amet</td> 
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Iam ruinas videres consectetur</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Cur deinde Metrodori libeross</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Cur deinde Metrodori libeross</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Vonsectetur adipiscing elit</td>
                      <td>@fat</td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Col>
          </Row>
        </Container>
  );
}

export default PlayerDetails;