import React from 'react';

const ConfirmationModal = ({ message, name, handleCloseModal, handleDeleteingItem, modalData, successActionName, highlightsColor }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{message} <strong className={`border-${highlightsColor} border-b-2`}>{name}</strong></h3>
                    {/* <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p> */}
                    <div className="modal-action">
                        <label onClick={() => handleDeleteingItem(modalData)} className={`btn bg-${highlightsColor}`}>{successActionName}</label>
                        <button onClick={handleCloseModal} className='btn btn-warning'>Cancel</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ConfirmationModal;