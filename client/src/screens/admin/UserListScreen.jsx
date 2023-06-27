
import {Row, Col, ListGroup, Image, Card, Button, Table} from 'react-bootstrap';
import {   useGetProductsQuery, useCreateProductMutation} from "../../redux/slices/productsApiSlice";
import Loader from "../../utils/Loader";
import Message from "../../utils/Message";
import {toast} from 'react-toastify'
import {FaTimes, FaEdit, FaTrash, FaCheck} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {useDeleteUserMutation, useGetUsersQuery} from "../../redux/slices/usersApiSlice";

const UserListScreen = () => {
    const {data:users, refetch,isLoading, error} = useGetUsersQuery()

    const [deleteUser, {isLoading:loadingDelete}]  = useDeleteUserMutation();
    const deleteHandler = async (id) => {
        if(window.confirm('Aren you sure?')){
            try{
                await deleteUser(id)
                refetch()
                toast.success('user deleted successfully')

            }catch(err){
                toast.error(err?.data.message || err.error)
            }
        }

    }
    return (

        <>
            <h2> Users </h2>


            {isLoading ? <Loader /> : error ? <Message variant='danger'>
                {error?.data?.message || error.error}
            </Message> : <Table striped hover responsive className='table-sm'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>

                    <th></th>
                </tr>
                </thead>
                <tbody>
                {users?.map((user) => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td> <a href={`mailto:${user.email}`}>{user.email}</a>

                        </td>
                        {user.isAdmin ? (
                            <FaCheck style={{color:'green'}}/>
                        ): (
                            <FaTimes style={{color:'red'}}/>
                        )}
                        <td>${user.isAdmin}</td>

                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button className='btn-sm mx-2' variant='light'>
                                    <FaEdit/>
                                </Button>
                            </LinkContainer>

                            <Button className='btn-sm' variant='danger'
                                    onClick={() => deleteHandler(user._id)}>
                                <FaTrash style={{color: 'white'}}/>
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            }


        </>

    )

}
export default UserListScreen



