'use client';

import { Button, LinkButton } from "@/components/buttons";
import { SUCCESS_MESSAGE } from "@/configs/session-storage-keys";
import { formatPhoneNumber } from "@/helpers/formatter";
import { FC, useEffect, useRef, useState } from "react";

export const SuccessNotification : FC = () => {
    const [message, setMessage] = useState('')
    const [contactName, setContactName] = useState('')
    const [contact, setContact] = useState('')
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
            try {
                
                const decoded = JSON.parse(msg)
                if (typeof decoded == 'string') {
                    setMessage(decoded)
                } else if (typeof decoded == 'object' && Object.keys(decoded).length) {
                    setMessage(decoded?.text)
                    if (typeof decoded?.user?.phone == 'string') {
                        setContact(formatPhoneNumber(decoded.user.phone))
                    }
                    if (typeof decoded?.user?.name == 'string') {
                        setContactName(decoded.user.name)
                    }
                }

            } catch (error) {
                console.error('Failed to decode success msg')
            }
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
                            <div 
                                dangerouslySetInnerHTML={{__html: message}} 
                                className="mb-4"
                            />
                        ) : (
                            <p className="fs-5 mb-4">
                                The photo session has been successfully scheduled and our admin will confirm
                                your appointment via Whatsapp/Email that you have provided
                            </p>
                        ) }
                        { contact ? (
                            <div className="mb-4 text-center">
                                <p className="fw-semibold mb-1">Contact person:</p>
                                <p className="mb-0">{ contactName } (+{contact})</p>
                            </div>
                        ) : (<></>) }
                        <div 
                            className={`${
                                "d-grid"
                            } ${
                                contact ? 'grid-cols-2 gap-2' : ''
                            }`}
                        >
                            { contact ? (
                                <LinkButton
                                    href={`https://wa.me/${contact}`}
                                    target="_blank"
                                    pill
                                    outline
                                >
                                    Open Whatsapp
                                </LinkButton>
                            ) : <></> }
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