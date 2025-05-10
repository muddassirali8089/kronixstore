'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import axios from 'axios'

const Register = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        agreed: false,
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        const { email, password, confirmPassword, agreed } = form

        if (!email || !password || !confirmPassword) {
            return setError('Please fill in all fields.')
        }

        if (password !== confirmPassword) {
            return setError('Passwords do not match.')
        }

        if (!agreed) {
            return setError('You must agree to the terms.')
        }

        try {
            const response = await axios.post('http://localhost:3030/api/users', form);
            const data = response;
            setSuccess('Registration successful! You can now login.')
            setForm({ email: '', password: '', confirmPassword: '', agreed: false })
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Create An Account' subHeading='Create An Account' />
            </div>

            <div className="register-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Register</div>
                            <form className="md:mt-7 mt-4" onSubmit={handleSubmit}>
                                <div className="email">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        name="email"
                                        type="email"
                                        placeholder="Username or email address *"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="pass mt-5">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        name="password"
                                        type="password"
                                        placeholder="Password *"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="confirm-pass mt-5">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password *"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='flex items-center mt-5'>
                                    <div className="block-input">
                                        <input
                                            type="checkbox"
                                            name='agreed'
                                            id='remember'
                                            checked={form.agreed}
                                            onChange={handleChange}
                                        />
                                        <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                    </div>
                                    <label htmlFor='remember' className="pl-2 cursor-pointer text-secondary2">
                                        I agree to the
                                        <Link href={'#!'} className='text-black hover:underline pl-1'>Terms of User</Link>
                                    </label>
                                </div>

                                {error && <div className="text-red-600 mt-4">{error}</div>}
                                {success && <div className="text-green-600 mt-4">{success}</div>}

                                <div className="block-button md:mt-7 mt-4">
                                    <button type="submit" className="button-main">Register</button>
                                </div>
                            </form>
                        </div>

                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">Already have an account?</div>
                                <div className="mt-2 text-secondary">
                                    Welcome back. Sign in to access your personalized experience, saved preferences, and more. We{String.raw`'re`} thrilled to have you with us again!
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/login'} className="button-main">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Register
