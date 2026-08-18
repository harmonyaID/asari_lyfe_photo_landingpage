'use client'

import { FC, useContext } from "react"
import { UserCheck, UserPlus } from "react-feather"
import { BookingFormContext, BookingFormContextType, StatusType } from "../contexts/BookingFormContext"

export const StatusForm : FC = () => {
    const { 
        setPhase,
        setStatus
    } = useContext(BookingFormContext) as BookingFormContextType

    
    const handleSelect = (status: StatusType) => {
        setPhase('location')
        setStatus(status)
    }

    return (
        <div className="min-h-screen-60">
            <div className="d-grid grid-cols-2 gap-3">
                <div 
                    className="card selectable grid-span-2 grid-span-md-1"
                    onClick={() => handleSelect('new')}
                >
                    <div className="card-body text-center">
                        <UserPlus
                            size="3rem"
                            strokeWidth={1}
                            className="text-primary"
                        />
                        <div className="fw-semibold">
                            New Customer
                        </div>
                    </div>
                </div>
                <div 
                    className="card selectable grid-span-2 grid-span-md-1"
                    onClick={() => handleSelect('returning')}
                >
                    <div className="card-body text-center">
                        <UserCheck
                            size="3rem"
                            strokeWidth={1}
                            className="text-primary"
                        />
                        <div className="fw-semibold">
                            Returning Customer
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}