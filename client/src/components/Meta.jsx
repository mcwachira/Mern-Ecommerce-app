import React from 'react'
import  {Helmet} from "react-helmet-async";

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>
                {title}
            </title>

            <Meta name='description' content={description}/>
            <Meta name='keywords' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'Welcome to pro shop',
    description:'We sell the best products for cheap',
    keywords:'electronics , buy electronics, cheap electronics'
}
export default Meta
