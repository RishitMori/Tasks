// src/containers/task6-modal.jsx
import { connect } from 'react-redux';
import Task6Modal from '../components/task6modal/Task6modal.jsx';

const mapStateToProps = (state) => ({
    isOpen: state.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
    onRequestClose: (shouldClose) => {
        dispatch({ type: 'OPEN_MODAL', isOpen: !shouldClose });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Task6Modal);
