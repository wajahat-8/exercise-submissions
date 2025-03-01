import React from 'react'

const Notification = ({ notification, type }) => {
    if (notification === null) {
        return;
    }

    else {
        return (
            <h1 className={`notification ${type}`}>{notification}</h1>
        )
    }
}

export default Notification