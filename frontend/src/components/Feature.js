import React from 'react'
import { Col } from 'react-bootstrap'
import Icon from './Icon'

function Feature({icon,title,description}) {
    return (
        <Col className='d-flex mb-5'>
            <Icon icon={icon} color='success' size='2'  />
            <div className='ps-3 pe-5 pe-sm-2 pe-lg-5'>
                <h5>{title}</h5>
                <p className='text-muted'>{description}</p>
            </div>
        </Col>
    )
}

export default Feature
