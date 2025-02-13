import React from 'react'
import { TrashIcon } from '@heroicons/react/24/solid'
import { validateItemCount, validateItemName, validateItemPrice } from '../functions/createInvoiceValidator'

function AddItem({ itemDetails, handelOnChange, onDelete, isValidatorActive }) {
    return (
        <div className='flex dark:text-white justify-between items-center'>
            <div className='flex flex-wrap'>

                {/* Mahsulot nomi */}
                <InputField
                    label="Item Name"
                    name="name"
                    value={itemDetails.name}
                    onChange={(e) => handelOnChange(itemDetails.id, e)}
                    isInvalid={isValidatorActive && !validateItemName(itemDetails.name)}
                />

                {/*Miqdor*/}
                <InputField
                    label="Qty."
                    name="quantity"
                    type="number"
                    value={itemDetails.quantity}
                    onChange={(e) => handelOnChange(itemDetails.id, e)}
                    isInvalid={isValidatorActive && !validateItemCount(itemDetails.quantity)}
                    min={0}
                    maxWidth="60px"
                />

                {/* Narx */}
                <InputField
                    label="Price"
                    name="price"
                    type="number"
                    value={itemDetails.price}
                    onChange={(e) => handelOnChange(itemDetails.id, e)}
                    isInvalid={isValidatorActive && !validateItemPrice(itemDetails.price)}
                    min={0}
                    maxWidth="100px"
                />

                {/* Jami narx */}
                <div className='flex px-2 py-2 flex-col items-start'>
                    <h1>Total</h1>
                    <div className='max-w-[100px] dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg border-gray-300 dark:border-gray-800 dark:text-white'>
                        {itemDetails.total}
                    </div>
                </div>
            </div>

            {/* O'chirish */}
            <button onClick={() => onDelete(itemDetails.id)}>
                <TrashIcon className='text-gray-500 hover:text-red-500 cursor-pointer mt-4 h-6 w-6' />
            </button>

        </div>
    )
}

/* Inputlarni qayta-qayta yozmaslik uchun alohida komponent */
function InputField({ label, name, type = "text", value, onChange, isInvalid, min, maxWidth }) {
    return (
        <div className='flex px-2 py-2 flex-col items-start'>
            <h1>{label}</h1>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                min={min}
                className={`dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800
                ${isInvalid ? 'border-red-500 dark:border-red-500 outline-red-500 border-2' : ''}`}
                style={{ maxWidth: maxWidth }} // Agar maxWidth berilgan bo'lsa, qo‘llanadi
            />
        </div>
    )
}

export default AddItem
