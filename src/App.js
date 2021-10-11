import {Container} from 'react-bootstrap';
import Login from './components/Login.js';
import Memos from './components/Memos.js'
// import {createMemo, deleteMemo} from './Services/memos.js';
import {connect} from 'react-redux';
import {initiateLogin, logout} from './modules/user.js'
import {initiateCreateMemo, initiateDeleteMemo} from './modules/memos.js'


function App({
                 dispatch,
                 loginPending,
                 loginFailure,
                 token,
                 getMemosPending,
                 getMemosFailure,
                 memos,
                 createMemoPending,
                 createMemoFailure,
                 deleteMemoFailure,
                 deleteMemoPending
             }) {


    // function handleError(error) {
    //     console.log('Ya Dun Goofed');
    // }
    //
    // function handleRequestMemos() {
    //     dispatch(initiateGetMemos())
    // }

    // function handleLoginRequest(username, password) {
    //     dispatch(initiateLogin({username, password}))
    // }


    // function handleLogoutRequest() {
    //     dispatch(logout())
    // }
    //
    // function handleCreateMemo(memo) {
    //     dispatch(initiateCreateMemo(memo))
    // }
    //
    // function handleDeleteMemo(memo) {
    //     dispatch(initiateDeleteMemo(memo))
    // deleteMemo(token, memo).then(data => data.json(), handleError).then(data => {
    //     handleRequestMemos();
    // }).catch(handleError)
    // }

    return (
        <Container>
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
                    handleLoginRequest={(username, password) => dispatch(initiateLogin({username, password}))}
                    loginFailure={loginFailure}
                    loginPending={loginPending}
                />
            }

        </Container>
    );
}

function mapStateToProps(state) {
    return {...state.user, ...state.memos}
}

export default connect(mapStateToProps)(App);
