import {Row, Col, ListGroup, Image, Card, Button, Table} from 'react-bootstrap';
import {   useGetProductsQuery, useCreateProductMutation} from "../../redux/slices/productsApiSlice";
import Loader from "../../utils/Loader";
import Message from "../../utils/Message";
import {toast} from 'react-toastify'
import {FaTimes, FaEdit, FaTrash} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {useParams} from "react-router-dom";
import Paginate from "../../components/Paginate";
import React from "react";


const ProductListScreen = () => {

    const {pageNumber} = useParams()
    const {data, isLoading, error} = useGetProductsQuery({pageNumber})

    const [createProduct, {isLoading:loadingCreate}]  = useCreateProductMutation();
    const [deleteProduct, {isLoading:loadingDelete}]  = useCreateProductMutation();


    const createProductHandler = async() => {

        if(window.confirm('Are You sure you want to create a product ?')){
            try{
                await createProduct();
                toast.success('product created successfully')

            }catch(err){
                toast.error(err?.data.message || err.error)
            }
        }
    }
    const deleteHandler = async (id) => {
        if(window.confirm('Aren you sure?')){
            try{
                await deleteProduct(id)
                toast.success('product deleted successfully')

            }catch(err){
                toast.error(err?.data.message || err.error)
            }
        }

    }
    return (

        <>

            <Row classname='align-items-center'>
                <Col>
                    <h1>
                        Products
                    </h1>
                </Col>

                <Col className="text-end">
                    <Button className="btn-sm m-3"
                    onClick={createProductHandler}>

                        <FaEdit/> Create Product
                    </Button>
                </Col>
            </Row>


            {loadingCreate && <Loader/>}
            {loadingDelete && <Loader/>}
                {isLoading ? <Loader /> : error ? <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message> : <Table striped hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>

                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.products?.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>${product.category}</td>
                            <td>${product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button className='btn-sm mx-2' variant='light'>
                                   <FaEdit/>
                                    </Button>
                                </LinkContainer>

                                <Button className='btn-sm' variant='danger'
                                onClick={() => deleteHandler(product._id)}>
                                    <FaTrash style={{color: 'white'}}/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                }
            <Paginate pages={data?.pages} page={data?.page} isAdmin={true}/>

        </>

    )
}
export default ProductListScreen
