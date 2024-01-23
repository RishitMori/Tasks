// src/reducers/task6-modal.js
const OPEN_MODAL = 'scratch-gui/modals/OPEN_MODAL';
const CLOSE_MODAL = 'scratch-gui/modals/CLOSE_MODAL';

const initialState = {
    isOpen: false,
};
const task6ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: action.isOpen,
      };  
    default:
      return state;
  }
};

  export default task6ModalReducer;