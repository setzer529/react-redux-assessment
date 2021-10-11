import {Card, Col, Placeholder} from "react-bootstrap";

export function LoadingMemo() {
    return(<Card>
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6}/>
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
                    <Placeholder xs={6}/> <Placeholder xs={8}/>
                </Placeholder>

            </Card.Body>
            <Card.Footer className="text-muted">FOOTER</Card.Footer>
        </Card>
    )}