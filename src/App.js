import logo from './calamander_logo.png'
import {Container, Row, Col} from 'react-bootstrap';
import Login from './components/Login.js';
import Memos from './components/Memos.js'
// import {createMemo, deleteMemo} from './Services/memos.js';
import {connect} from 'react-redux';
// import {initiateLogin, logout} from './modules/user.js'
import {initiateLogin, logout} from './modules/login_mod.js'
import {initiateCreateMemo, initiateDeleteMemo} from './modules/memos.js'

// var calamanderLogo = require('./calamander_logo.png')


function App({
                 dispatch,
                 loginPending,
                 loginFailure,
                 createUserPending,
                 createUserFailed,
                 token,
                 getMemosPending,
                 getMemosFailure,
                 memos,
                 createMemoPending,
                 createMemoFailure,
                 deleteMemoFailure,
                 deleteMemoPending
             }) {

    return (

        <Container fluid>
            <Row className='bg-primary h-100 align-items-center justify-content-left mb-2 flex'>
                <Col>
                    <img src={logo} alt="logo" className='h-75' />
                </Col>
                <Col className="d-flex align-text-middle justify-content-left display-2 text-secondary">CALAMANDER</Col>
                <Col></Col>
            </Row>
            {token ?
                <Memos
                    handleLogoutRequest={() => dispatch(logout())}
                    handleCreateMemo={memo => dispatch(initiateCreateMemo(memo))}
                    handleDeleteMemo={memo => dispatch(initiateDeleteMemo(memo))}
                    memos={memos}
                    getMemosPending={getMemosPending}
                    getMemosFailure={getMemosFailure}
                    createMemoPending={createMemoPending}
                    createMemoFailure={createMemoFailure}
                    deleteMemoFailure={deleteMemoFailure}
                    deleteMemoPending={deleteMemoPending}
                /> :
                <Login
                    handleLoginRequest={(username, password, newUser) => dispatch(initiateLogin({username, password, newUser}))}
                    loginFailure={loginFailure}
                    loginPending={loginPending}
                    createUserPending={createUserPending}
                    createUserFailed={createUserFailed}
                />
            }

        </Container>
    );
}

function mapStateToProps(state) {
    return {...state.user, ...state.memos}
}

export default connect(mapStateToProps)(App);
