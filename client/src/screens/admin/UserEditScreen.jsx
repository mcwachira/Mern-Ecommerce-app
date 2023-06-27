import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';

import Loader from "../../utils/Loader";
import Message from "../../utils/Message";
import {useGetUserDetailsQuery, useUpdateUserAdminMutation} from "../../redux/slices/usersApiSlice";

const UserEditScreen = () => {
    const { id: userId } = useParams();
    console.log(userId)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [isAdmin, setIsAdmin] = useState(false);

    const {
        data: user,
        isLoading,
        refetch,
        error,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] =
        useUpdateUserAdminMutation();


    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({
                userId,
                name,
                email,
                isAdmin
            });
            toast.success('user updated successfully');
            refetch();
            navigate('/admin/userslist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };


    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);

        }
    }, [user]);

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin' className='my-2'>
                            <Form.Label>Admin</Form.Label>
                        <Form.Check type='checkbox' label='Is Admin' onChange={(e) => setIsAdmin(e.target.checked)}>

                        </Form.Check>
                        </Form.Group>

                        <Button
                            type='submit'
                            variant='primary'
                            style={{ marginTop: '1rem' }}
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};
export default UserEditScreen





