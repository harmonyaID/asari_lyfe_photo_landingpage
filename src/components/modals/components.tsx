'use client';

import { FC, useEffect, useRef } from "react";
import { ModalProps } from "./props";
import { Modal as BsModal } from "bootstrap";

export const Modal : FC<ModalProps> = ({
    title       = '',
    subTitle    = '',
    className   = '',
    size,
    onHide,
    onShow,
    preventClose    = false,
    open            = false,
    children
}) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const bsModalRef = useRef<BsModal | null>(null)

    let width = ''
    switch (size) {
        case 'large':
            width = 'modal-lg'
            break

        case 'small':
            width = 'modal-sm'
            break
    }

    useEffect(() => {
        if (typeof onShow != 'function') {
            return
        }

        if (!modalRef.current) {
            return
        }

        modalRef.current.addEventListener('show.bs.modal', onShow)
        const modal = modalRef.current

        return () => {
            modal.removeEventListener('show.bs.modal', onShow)
        }
    }, [onShow])

    useEffect(() => {
        if (typeof onHide != 'function') {
            return
        }

        if (!modalRef.current) {
            return
        }

        modalRef.current.addEventListener('hidden.bs.modal', onHide)
        const modal = modalRef.current

        return () => {
            modal.removeEventListener('hidden.bs.modal', onHide)
        }
    }, [onHide])

    useEffect(() => {
        if (!modalRef.current) {
            return
        }

        
        if (open) {
            if (!bsModalRef.current) {
                bsModalRef.current = window.bootstrap.Modal.getOrCreateInstance(modalRef.current)
            }
            bsModalRef.current?.show()
        } else {
            if (bsModalRef.current) {
                bsModalRef.current.hide()
            }
        }
    }, [open])

    useEffect(() => {
        return () => {
            bsModalRef.current?.dispose()
        }
    }, [])

    return (
        <div
            ref={modalRef}
            className={`modal fade ${ className }`}
            tabIndex={-1}
            aria-hidden={true}
            role="dialog"
            data-bs-keyboard={ !preventClose }
            data-bs-backdrop={ preventClose ? 'static' : 'true' }
        >
            <div
                className={`modal-dialog modal-dialog-centered ${width}`}
                role="dialog"
            >
                <div className="modal-content">
                    { title || !preventClose ? (
                        <div className="modal-header">
                            { title ? (
                                <h5 className="modal-title">
                                    { title }
                                    { subTitle ? (
                                        <p className="text-grey-600">
                                            { subTitle }
                                        </p>
                                    ) : (<></>) }
                                </h5>
                            ) : (<></>) }
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                hidden={ preventClose }
                            />
                        </div>
                    ) : (<></>) }
                    <div className="modal-body">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    )
}
