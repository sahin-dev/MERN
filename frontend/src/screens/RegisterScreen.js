
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FromContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} =  userRegister

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if( password !== confirmpassword){
            setMessage('Passwords does not match')
        }else{
            dispatch(register( name, email, password))
        }
        

    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={ (e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={ (e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={ (e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmpassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder=' Confirm Password' value={confirmpassword} onChange={ (e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>

            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account? {' '} <Link to= {redirect ? `/login?redirect=${redirect}` : '/login'}>Log In</Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default RegisterScreen
