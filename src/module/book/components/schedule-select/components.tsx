'use client';

import { FC, Fragment } from "react";
import { ScheduleSelectProps } from "./props";
import { useGetSchedule } from "@/book/hooks";
import { changeHandlerGenerator } from "@/helpers/changeHandlers";
import { ErrorMsg, Loader } from "@/components/misc";

export const ScheduleSelect : FC<ScheduleSelectProps> = ({
    wrapperClassName = '',
    locationId = 0,
    date = '',
    onChange,
    value,
    required = false,
    className = '',
    ...props
}) => {
    const {data, isLoading, error} = useGetSchedule(locationId, date)

    const handleChange = changeHandlerGenerator<HTMLInputElement>(onChange)

    if (!locationId || !date) {
        return (
            <></>
        )
    }

    return (
        <div className={wrapperClassName}>
            <label
                className="form-label"
            >
                Time
                {' '}
                { required ? <span className="text-danger">*</span> : <></> }
            </label>
            <div className="d-grid gap-2 grid-cols-2 grid-cols-md-4 grid-cols-lg-6">
                { isLoading ? (
                    <div className="grid-span-2 grid-span-md-4 grid-span-lg-6">
                        <Loader small/> Loading...
                    </div>
                ) : error || !data?.result?.length ? (
                    <div className="grid-span-2 grid-span-md-4 grid-span-lg-6">
                        <ErrorMsg message="Unable to find schedule for this date"/>
                    </div>
                ) : data.result.map((schedule) => (
                    <Fragment key={schedule.id}>
                        <input
                            type="radio"
                            className={`btn-check ${className}`}
                            name="scheduleId" 
                            id={`schedule-select-${schedule.id}`}
                            autoComplete="off" 
                            value={schedule.id}
                            checked={value == schedule.id}
                            disabled={!schedule.isAvailable}
                            onChange={handleChange}
                            required={required}
                            {...props}
                        />
                        <label
                            className="btn btn-outline-primary px-1 py-2"
                            htmlFor={`schedule-select-${schedule.id}`}
                        >
                            { schedule.fromTime }
                        </label>
                    </Fragment>
                )) }
            </div>
        </div>
    )
}