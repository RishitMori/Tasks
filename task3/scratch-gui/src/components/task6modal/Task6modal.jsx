// src/components/task6-modal/task6-modal.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './newModal.css';

const Task6Modal = ({ isOpen, onRequestClose }) => {
    useEffect(() => {
        // Open the modal after 30 seconds
        const openModalTimeout = setTimeout(() => {
            onRequestClose(false);
        }, 30000);

        // Close the modal after 40 seconds (10 seconds after opening)
        const closeModalTimeout = setTimeout(() => {
            onRequestClose(true);
        }, 40000);

        return () => {
            clearTimeout(openModalTimeout);
            clearTimeout(closeModalTimeout);
        };
    }, [onRequestClose]);

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(true)}
            contentLabel="Task6 Modal"
            className="task6-modal"
        >
            <h1>Title</h1>
            <p>Content (Can be of 1 line)</p>
            <button onClick={() => onRequestClose(true)}>Close</button>
            <button onClick={() => onRequestClose(true)}>Ok</button>
        </ReactModal>
    );
};

Task6Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
};

export default Task6Modal;
