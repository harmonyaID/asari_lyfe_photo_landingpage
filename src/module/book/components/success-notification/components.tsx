'use client';

import { Button } from "@/components/buttons";
import { SUCCESS_MESSAGE } from "@/configs/session-storage-keys";
import { FC, useEffect, useRef, useState } from "react";

export const SuccessNotification : FC = () => {
    const [message, setMessage] = useState('')
    const elementRef = useRef<HTMLDivElement>(null)

    const toggle = (value: boolean = true) => {
        if (!elementRef.current) {
            return
        }

        if (!window.bootstrap) {
            setTimeout(() => {
                toggle(value)
            }, 100)
            return
        }

        const modal = window.bootstrap.Modal.getOrCreateInstance(elementRef.current)

        if (value) {
            modal.show()
        } else {
            modal.hide()
        }
    }

    useEffect(() => {
        const msg = sessionStorage.getItem(SUCCESS_MESSAGE)
        if (msg) {
            setMessage(msg)
        }

        toggle()
    }, [])

    return (
        <div 
            className="modal" 
            tabIndex={-1}
            ref={elementRef}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-2">
                    <div className="modal-body text-center p-4">
                        { message ? (
                            <div dangerouslySetInnerHTML={{__html: message}}/>
                        ) : (
                            <p className="fs-5 mb-4">
                                The photo session has been successfully scheduled and our admin will confirm
                                your appointment via Whatsapp/Email that you have provided
                            </p>
                        ) }
                        <div className="d-grid">
                            <Button 
                                onClick={() => toggle(false)}
                                pill
                            >
                                OK
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}