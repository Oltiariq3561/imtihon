import React from 'react'
import PaidStatus from './PaidStatus'
import rightArrow from '../assets/icon-arrow-right.svg'
import { Link } from 'react-router-dom'

function InvoiceCard({ invoice }) {
    // Ekran kengligini tekshirish (mobil yoki katta ekran)
    const isMobile = window.innerWidth < 768;

    return (
        <Link to={`invoice?${invoice.id}`}>
            <div className={`flex cursor-pointer hover:border border-purple-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white rounded-lg items-center ${isMobile ? 'justify-between' : 'justify-between md:flex-row flex-col md:items-center'}`}>
                {/* Invoice ID */}
                <div className='flex flex-col md:flex-row md:items-center'>
                    <h2 className='dark:text-white'>
                        <span className='text-[#7e88c3]'>#</span>{invoice.id}
                    </h2>
                    <h2 className='text-sm text-gray-400 font-light mt-3 md:mt-0 md:ml-6'>
                        Due {invoice.paymentDue}
                    </h2>
                    <h2 className='text-sm text-gray-400 font-light mt-3 md:mt-0 md:ml-10'>
                        {invoice.clientName}
                    </h2>
                </div>

                {/* Invoice Amount va Status */}
                <div className='flex items-center justify-between md:justify-end w-full md:w-auto mt-3 md:mt-0'>
                    <h1 className='text-xl dark:text-white mr-8'>
                        £ {invoice.total}
                    </h1>
                    <PaidStatus type={invoice.status} />
                    {!isMobile && <img src={rightArrow} className='ml-4' />}
                </div>
            </div>
        </Link>
    )
}

export default InvoiceCard
