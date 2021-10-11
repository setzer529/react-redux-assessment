import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';
import {useState} from 'react';

function Login({handleLoginRequest, loginPending, loginFailure}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(event) {
        event.preventDefault();
        handleLoginRequest(username, password);



    }

    function onUsernameChange(event) {
        setUsername(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }


    return (


        <Container fluid>
            <Row className='mt-3'><Col><h2>PLEASE LOGIN!!!</h2></Col></Row>
            <Row>
                <Col>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>User Name: </Form.Label>
                            <Form.Control type="etext" placeholder="User Name" onChange={onUsernameChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={onPasswordChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loginPending}>
                            {loginPending ? 'Logging in...' : 'Submit'}
                        </Button>
                    </Form>
                </Col>
            </Row>
            {loginFailure && <Row>
                <Col>
                    <Alert variant='danger'>Invalid Login</Alert>
                </Col>
            </Row>}
        </Container>
    );
}

export default Login;
