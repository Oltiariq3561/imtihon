import React, { useEffect, useState } from 'react'; 
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import invoiceSlice from '../redux/invoiceSlice';
import InvoiceCard from './InvoiceCard';
import CreateInvoice from './CreateInvoice';
import arrowDown from '../assets/icon-arrow-down.svg';
import plus from '../assets/plus.png';

function Center() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isDropdown, setIsDropdown] = useState(false);
    const [openCreateInvoice, setOpenCreateInvoice] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const invoices = useSelector((state) => state.invoices.filteredInvoice);
    const filterOptions = ['paid', 'pending', 'draft'];

    // Filterni o‘zgartirganda, store dagi invoice larni filter qilish
    useEffect(() => {
        dispatch(invoiceSlice.actions.filterInvoice({ status: filterValue }));
    }, [filterValue, dispatch]);

    return (
        <div>
            <div className='dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]'>
                <motion.div
                    key={location.pathname}
                    initial={{ x: '0' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-150%' }}
                    transition={{ duration: 0.5 }}
                    className='max-w-3xl flex flex-col mx-auto my-auto'>
                    
                    {/* Sarlavha qismi */}
                    <div className='min-w-full max-h-[64px] flex items-center justify-between'>
                        <div>
                            <h1 className='lg:text-4xl md:text-2xl text-xl dark:text-white tracking-wide font-semibold'>Invoices</h1>
                            <p className='text-gray-500 font-light'>There are {invoices.length} total invoices.</p>
                        </div>
                        
                        {/* Filter va Yangi invoice tugmasi */}
                        <div className='flex max-h-full items-center'>
                            <p className='dark:text-white font-medium hidden md:block'>Filter by status</p>
                            <p className='dark:text-white font-medium md:hidden'>Filter</p>
                            
                            {/* Filter dropdown */}
                            <div onClick={() => setIsDropdown(!isDropdown)} className='cursor-pointer ml-3'>
                                <motion.img src={arrowDown} animate={{ rotate: isDropdown ? -180 : 0 }} />
                            </div>
                            {isDropdown && (
                                <motion.div className='w-40 bg-white dark:bg-[#1E2139] dark:text-white flex px-6 py-4 flex-col absolute shadow-2xl rounded-xl space-y-2'>
                                    {filterOptions.map((item, i) => (
                                        <div key={i} onClick={() => setFilterValue(filterValue === item ? '' : item)} className='flex items-center cursor-pointer space-x-2'>
                                            <input type='checkbox' checked={filterValue === item} className='accent-[#7c5dfa]' readOnly />
                                            <p>{item}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                            
                            {/* Yangi invoice yaratish tugmasi */}
                            <button onClick={() => setOpenCreateInvoice(true)} className='hover:opacity-80 ml-4 md:ml-10 flex items-center py-2 px-2 md:space-x-3 space-x-2 bg-[#7c5dfa] rounded-full'>
                                <img src={plus} alt='' />
                                <p className='md:block hidden text-white font-semibold text-lg'>New invoice</p>
                                <p className='md:hidden block text-white font-semibold text-base'>New</p>
                            </button>
                        </div>
                    </div>
                    
                    {/* Invoice ro‘yxati */}
                    <div className='mt-10 space-y-4'>
                        {invoices.map((invoice, index) => (
                            <motion.div key={invoice.id} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }}>
                                <InvoiceCard invoice={invoice} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
            
            {/* Yangi invoice yaratish modal oynasi */}
            <AnimatePresence>
                {openCreateInvoice && <CreateInvoice openCreateInvoice={openCreateInvoice} setOpenCreateInvoice={setOpenCreateInvoice} />}
            </AnimatePresence>
        </div>
    );
}

export default Center;
