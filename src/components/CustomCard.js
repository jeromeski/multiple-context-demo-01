import { Card } from "react-bootstrap";

export default function CustomCard({ children }) {
  return <Card className="p-4">{children}</Card>;
}
