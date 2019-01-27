import React from 'react'
import {Col,Container,Row,Footer as FooterMDB} from "mdbreact"


const Footer = () =>
      <FooterMDB className="font-small pt-4 mt-12 footer-color">
        <Container fluid
                   className="text-center col-6">
          <Row>
            <Col md="12">
              <h2 className="title">News online</h2>
              <h3>
                  This site was written by <a href='https://www.instagram.com/korrpus/' >Max Korsun </a>
                  KPI FAM KV-71
              </h3>
            </Col>
          </Row>
        </Container>
        <div className="footer-copyright text-center py-3">
          <Container fluid>
            <h3>&copy; {new Date().getFullYear()}</h3>
          </Container>
        </div>
      </FooterMDB>


export default Footer