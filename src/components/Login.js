import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';
import {useEffect, useState} from 'react';

function Login({handleLoginRequest, loginPending, loginFailure, createUserPending, createUserFailed}) {
    const [username, setUsername] = useState('imalcolm')
    const [password, setPassword] = useState('shirtlesschaos')
    const [newUser, setNewUser] = useState(false)

    function handleLogin(event) {
        event.preventDefault();
        handleLoginRequest(username, password, newUser);
    }

    function onUsernameChange(event) {
        setUsername(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    function onNewUserChange(event) {
        setNewUser(!newUser);
    }

    useEffect(() => {
        if (createUserPending === false) {
            setNewUser(false)
        }

    }, [createUserPending, createUserFailed])




    return (


        <Container fluid>
            <Row className='mt-3'><Col><h2>PLEASE LOGIN</h2></Col></Row>
            <Row>
                <Col>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>User Name: </Form.Label>
                            <Form.Control type="etext" placeholder={newUser ? 'Create a User Name' : 'Enter User Name'} onChange={onUsernameChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control type="password" placeholder={newUser ? 'Create a Password' : 'Enter Password'} onChange={onPasswordChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Register as a New User" checked={newUser} onChange={onNewUserChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loginPending || createUserPending}>
                            {loginPending || createUserPending ? 'Logging in...' : 'Submit'}
                        </Button>
                    </Form>
                </Col>
            </Row>
            {loginFailure && <Row>
                <Col>
                    <Alert variant='danger'>Invalid Login</Alert>
                </Col>
            </Row>}
            {createUserFailed && <Row>
                <Col>
                    <Alert variant='danger'>User Creation Failed</Alert>
                </Col>
            </Row>}
        </Container>
    );
}

export default Login;
