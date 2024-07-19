"use client"

import { Button } from "@/components/buttons";
import { Checkbox, Input } from "@/components/inputs";
import { InputChangeHandler } from "@/helpers/changeHandlers/types";
import Link from "next/link";
import { FC, FormEventHandler, useState } from "react";

export const BookingForm : FC = () => {

    const [formData, setFormData] = useState<Record<string, any>>({})

    const handleChange : InputChangeHandler = ({name, value}) => {
        setFormData(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        grecaptcha.ready(() => {
            grecaptcha.execute(process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY, { action: 'submit' })
                .then((token) => {
                    console.log(token)
                })
        })
    }

    return (
        <section className="text-start">
            <h1 className="fw-light mb-2 page-title">
                Record Your Memory <span className="fw-semibold">With Us</span>
            </h1>
            <p className="mb-3">
                Lorem ipsum dolor sit amet
            </p>
            <form
                onSubmit={handleSubmit}
                className="row"
            >
                <div className="col-12 mb-3">
                    <Input
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        label="Name"
                        required
                        placeholder="e.g Nama Saya Budi"
                    />
                </div>
                <div className="col-12 mb-3">
                    <Input
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        label="Email"
                        type="email"
                        placeholder="e.g budi@nama.saya"
                    />
                </div>
                <div className="col-12 mb-3">
                    <Input
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        label="Phone"
                        type="tel"
                        required
                        placeholder="e.g 6281122223333"
                    />
                </div>
                <div className="col-6 mb-3">
                    <Input
                        name="location"
                        value={formData.location || ''}
                        onChange={handleChange}
                        label="Location"
                        required
                    />
                </div>
                <div className="col-6 mb-3">
                    <Input
                        name="room"
                        value={formData.room || ''}
                        onChange={handleChange}
                        label="Room"
                        required
                        placeholder="e.g HI-203"
                    />
                </div>
                <div className="col-12 mb-3">
                    <Input
                        name="date"
                        value={formData.date || ''}
                        onChange={handleChange}
                        label="Date"
                        type="date"
                        required
                        placeholder="e.g 22/03/2024"
                    />
                </div>
                <div className="col-12 mb-3">
                    <Checkbox
                        label={(
                            <>
                                I agree to the
                                {' '}
                                <Link href="privacy-policy">
                                    Terms and Conditions
                                </Link>
                            </>
                        )}
                        name="compilance"
                        checked={formData.compilance}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 mb-3 text-danger fst-italic">
                    *required field
                </div>
                <div className="col-12">
                    <div className="d-grid">
                        <Button 
                            type="submit"
                            pill
                        >
                            Book an Appointment
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    )
}