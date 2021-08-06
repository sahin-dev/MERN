import React from 'react'
import {Alert} from 'react-bootstrap'

const Message = ({variant,children,color}) => {
    return (
        <Alert variant={variant} style={{color}}>
            {children}
        </Alert>
    )
}

Message.defaultProps = {
    variant:'info',
    color:'white',
}

export default Message
