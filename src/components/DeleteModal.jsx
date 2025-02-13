import React from 'react';

function DeleteModal({ invoiceId, onDeleteButtonClick, setIsDeleteModalOpen }) {
    // Modal foniga bosilganda yopish
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <div 
            onClick={handleBackgroundClick} 
            className="fixed inset-0 flex justify-center items-center bg-[#000005be] z-50 px-2 py-4 overflow-scroll scrollbar-hide">
            
            {/* Modal oyna */}
            <div className="bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md w-full p-8 rounded-xl overflow-y-scroll max-h-[95vh] scrollbar-hide">
                <h3 className="text-red-500 text-xl font-bold">Confirm Deletion</h3>
                
                {/* Tasdiqlash matni */}
                <p className="text-gray-500 font-semibold tracking-wide text-xs pt-6">
                    Are you sure you want to delete invoice {invoiceId}? This action cannot be undone.
                </p>
                
                {/* Tugmalar */}
                <div className="flex w-full mt-4 space-x-4">
                    <button 
                        onClick={onDeleteButtonClick} 
                        className="w-full text-white bg-red-500 py-2 rounded-full hover:opacity-75">
                        Delete
                    </button>
                    <button 
                        onClick={() => setIsDeleteModalOpen(false)} 
                        className="w-full text-[#635fc7] bg-[#635fc71a] dark:bg-white py-2 rounded-full hover:opacity-75">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
