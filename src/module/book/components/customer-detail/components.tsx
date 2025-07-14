import { FC } from "react";
import { CustomerDetailProps } from "./props";

export const CustomerDetail : FC<CustomerDetailProps> = ({
    customer,
    onClick,
    onClose,
    closable = false,
    className = '',
}) => (
    <div 
        className={`${
            "d-flex gap-3 align-items-center justify-content-center px-3 py-2"
        } ${
            className
        }`}
        onClick={onClick}
    >
        <div className="flex-shrink-0">
            <div className="searchable-picture">
                <img 
                    className="object-fit-cover  w-100 h-100"
                    src={`https://ui-avatars.com/api/?name=${customer.name}&rounded=true&color=FFFFFF&background=0099AB&font-size=0.35`}
                    alt={`${customer.name} photo`}
                />
            </div>
        </div>
        <div className="flex-grow-1">
            <p className="d-flex flex-wrap gap-1 mb-1">
                <span className="fw-semibold flex-shrink-0">
                    { customer.name }
                </span>
                <span className="text-grey-600 flex-shrink-0">
                    ({ customer.phone })
                </span>
            </p>
            <p className="mb-1">
                Last Booking: <span className="text-grey-600">{ customer.date }</span>
            </p>
            <p className="mb-0">
                At: <span className="text-grey-600">{ customer.location }</span>
            </p>
        </div>
        { closable ? (
            <div className="flex-shrink-0">
                <button 
                    type="button" 
                    className="btn-close" 
                    aria-label="Close"
                    onClick={onClose}
                />
            </div>
        ) : (<></>) }
    </div>
)