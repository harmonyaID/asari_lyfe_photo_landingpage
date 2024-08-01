'use client';

import { FC } from "react";
import { useGetPolicy } from "../../hooks";
import { ErrorMsg, Loader } from "@/components/misc";

export const PolicySection : FC = () => {

    const { data, isLoading, error } = useGetPolicy()

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center gap-2">
                <Loader/>
                <span>Loading...</span>
            </div>
        )
    }

    if (error || !data?.result) {
        return (
            <ErrorMsg message="Failed to get policy"/>
        )
    }

    return (
        <div 
            className="overflow-y-auto max-h-screen-60 min-h-screen-60"
            dangerouslySetInnerHTML={{
                __html: data.result.content
            }}
        />
    )
}