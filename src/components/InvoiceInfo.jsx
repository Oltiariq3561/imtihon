import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import invoiceSlice from '../redux/invoiceSlice';
import formatDate from '../functions/formatDate';
import PaidStatus from './PaidStatus';
import DeleteModal from './DeleteModal';
import CreateInvoice from './CreateInvoice';
import leftArrow from '../assets/icon-arrow-left.svg';

function InvoiceInfo({ onDelete }) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const invoiceId = location.search.substring(1);

    // Foydalanuvchi sahifaga kirganda invoice ma'lumotlarini yuklash
    useEffect(() => {
        dispatch(invoiceSlice.actions.getInvoiceById({ id: invoiceId }));
    }, [invoiceId]);

    const invoice = useSelector((state) => state.invoices.invoiceById);

    // Invoice statusini "paid" qilish
    const onMakePaidClick = () => {
        dispatch(invoiceSlice.actions.updateInvoiceStatus({ id: invoiceId, status: 'paid' }));
    };

    // Invoice-ni o‘chirish
    const onDeleteButtonClick = () => {
        navigate('/');
        setIsDeleteModalOpen(false);
        onDelete(invoiceId);
    };

    if (!invoice) return <>Loading...</>;

    return (
        <div>
            <motion.div
                key='invoice-info'
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                exit={{ x: '200%' }}
                transition={{ duration: 0.5 }}
                className='dark:bg-[#141625] mx-auto min-h-screen bg-[#f8f8fb] py-8 px-4 max-w-3xl'>
                
                {/* Orqaga qaytish tugmasi */}
                <button onClick={() => navigate(-1)} className='flex items-center space-x-4 dark:text-white'>
                    <img src={leftArrow} alt='Back' />
                    <p>Go back</p>
                </button>
                
                {/* Invoice holati va tugmalar */}
                <div className='mt-8 rounded-lg flex justify-between px-6 py-6 bg-white dark:bg-[#1e2139]'>
                    <div className='flex items-center space-x-2'>
                        <h1 className='text-gray-600 dark:text-gray-400'>Status</h1>
                        <PaidStatus type={invoice.status} />
                    </div>
                    <div className='hidden md:flex space-x-3'>
                        <button onClick={() => setIsEditOpen(true)} className='text-[#7e88c3] bg-slate-100 p-3 rounded-full'>Edit</button>
                        <button onClick={() => setIsDeleteModalOpen(true)} className='text-white bg-red-500 p-3 rounded-full'>Delete</button>
                        {invoice.status === 'pending' && (
                            <button onClick={onMakePaidClick} className='text-white bg-[#7c5dfa] p-3 rounded-full'>Mark as Paid</button>
                        )}
                    </div>
                </div>
                
                {/* Invoice tafsilotlari */}
                <div className='mt-4 rounded-lg px-6 py-6 bg-white dark:bg-[#1e2139]'>
                    <h1 className='font-semibold dark:text-white text-xl'><span className='text-[#7e88c3]'>#</span>{invoice.id}</h1>
                    <p className='text-sm text-gray-500'>{invoice.clientName}</p>
                    
                    {/* To‘lov sanasi va mijoz ma’lumotlari */}
                    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 gap-4'>
                        <div>
                            <h3 className='text-gray-400'>Invoice Date</h3>
                            <h1 className='text-lg font-semibold dark:text-white'>{formatDate(invoice.createdAt)}</h1>
                        </div>
                        <div>
                            <h3 className='text-gray-400'>Payment Due</h3>
                            <h1 className='dark:text-white text-lg font-semibold'>{formatDate(invoice.paymentDue)}</h1>
                        </div>
                        <div>
                            <h3 className='text-gray-400'>Sent to</h3>
                            <h1 className='dark:text-white text-lg font-semibold'>{invoice.clientEmail}</h1>
                        </div>
                    </div>
                </div>
                
                {/* Invoice tovar ro‘yxati */}
                <div className='mt-10 bg-[#f9fafe] dark:bg-[#252945] p-6 rounded-lg'>
                    {invoice.items.map((item) => (
                        <div key={item.name} className='flex justify-between text-lg dark:text-white'>
                            <h1>{item.name}</h1>
                            <h1>£{item.total}</h1>
                        </div>
                    ))}
                </div>
                
                {/* Umumiy summa */}
                <div className='p-6 font-semibold text-white flex justify-between dark:bg-black bg-gray-700 rounded-lg'>
                    <h3 className='text-xl'>Amount Due</h3>
                    <h1 className='text-3xl'>£{invoice.total}</h1>
                </div>
            </motion.div>

            {/* O‘chirish modal oynasi */}
            {isDeleteModalOpen && (
                <DeleteModal onDeleteButtonClick={onDeleteButtonClick} setIsDeleteModalOpen={setIsDeleteModalOpen} invoiceId={invoice.id} />
            )}

            {/* Tahrirlash modal oynasi */}
            <AnimatePresence>
                {isEditOpen && (
                    <CreateInvoice invoice={invoice} type='edit' setOpenCreateInvoice={setIsEditOpen} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default InvoiceInfo;
