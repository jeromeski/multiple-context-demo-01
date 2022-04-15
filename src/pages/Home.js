import { Col, Container, Row } from "react-bootstrap";
import { useLogger } from "react-use";

export default function Home() {
  useLogger("Home -->");
  return (
    <Container className="h-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <h1 className="display-1">Home</h1>
        </Col>
      </Row>
    </Container>
  );
}
