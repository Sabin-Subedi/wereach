
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { categoryWithIcon } from '../constants/data'


function CategoryIconsBox() {
    return (
        <div className='bg-tan py-5'>
            <Container>
         <h2 className='text-center mb-5'>Browse project by category</h2>
         <Row md={4}>
         {
                categoryWithIcon.map(cat => (
                    <LinkContainer to={`/discover?category=${cat.category.replace(/\s+/g, '').toLowerCase()}`}>
                    <Col >
                        <div className='d-flex flex-column text-center align-items-center my-3 pointer hover-green'>

                        <img src={`icons/${cat.icon}`} alt="" />
                        <p className='fw-normal mt-2'>{cat.category}</p>
                        </div>
                    </Col>
                    </LinkContainer>
                ))
            }
         </Row>
            </Container>
            
        </div>
    )
}

export default CategoryIconsBox
