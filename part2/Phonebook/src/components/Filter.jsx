import React from 'react'

const Filter = ({ show, setShow }) => (
    <div>
        filter shown with <input value={show} onChange={(e) => setShow(e.target.value)} />
    </div>
);
export default Filter