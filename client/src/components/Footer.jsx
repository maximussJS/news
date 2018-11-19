import React from 'react'
import {Col,Container,Row,Footer as FooterMDB} from "mdbreact"

const Footer = () =>
      <FooterMDB color='red'
                 className="font-small pt-4 mt-12">
        <Container fluid
                   className="text-center col-6">
          <Row>
            <Col md="12">
              <h2 className="title">News online</h2>
              <p>
                <h3>
                  This site was written by <a href='https://www.instagram.com/korrpus/' >Max Korsun </a>
                  KPI FAM KV-71
                </h3>
                <h3>It was written on React and Node</h3>
              </p>
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