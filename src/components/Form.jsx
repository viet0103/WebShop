import React, { forwardRef, useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import Button from './Button'
import SweetAleart from './SweetAleart'

const Form = forwardRef(({ }, ref) => {

    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)

    const registerSuccessRef = useRef()
    const loginSuccessRef = useRef()
    const registerFaileRef = useRef()
    const loginFaileRef = useRef()
    const alertRef = useRef()

    const showSweetAlert = (alertRef) => {
        alertRef.current.classList.add("success")
        setTimeout(() => {
            alertRef.current.classList.remove("success")
        }, 2000)
    }
    const handleCloseModal = () => {
        ref.current.classList.toggle("scale-0")
        document.body.classList.toggle("overflow-hidden")
        setIsLogin(true)

    }
    const onLogin = () => {
        const user = {
            account,
            password
        }
        if (account === "" || password === "") {
            showSweetAlert(alertRef)
            return
        }
        const hasAccount = (JSON.parse(localStorage.getItem("listAccount")) || []).some((e) => e.account === user.account && e.password === user.password)
        if (hasAccount) {
            showSweetAlert(loginSuccessRef)
            localStorage.setItem("currentUser", JSON.stringify(user))
            setTimeout(() => {
                handleCloseModal()
            }, 2100)
        }
        else {
            showSweetAlert(loginFaileRef)
        }
    }
    const handleRegister = () => {
        if (account === "" || password === "") {
            showSweetAlert(alertRef)
            return
        }
        const user = {
            account,
            password
        }
        const hasAccount = (JSON.parse(localStorage.getItem("listAccount")) || []).some((e) => e.account === user.account)
        if (hasAccount) {
            showSweetAlert(registerFaileRef)
        }
        else {
            localStorage.setItem('listAccount', JSON.stringify([...JSON.parse(localStorage.getItem(`listAccount`)) || [], user]))
            showSweetAlert(registerSuccessRef)
            setIsLogin(true)
        }

    }
    return (

        <div className='fixed top-0 left-0 z-[9999999] w-full h-full flex justify-center items-center bg-gray-300 bg-opacity-50 transition duration-500 scale-0 overflow-hidden' ref={ref}>
            <div className=" bg-white shadow-2xl rounded relative" >
                {isLogin ?
                    <div>
                        <div className="border-b p-4 text-center font-bold text-xl">????ng nh???p</div>
                        <div className="p-4 px-8  flex flex-col">
                            <label htmlFor="sdt" className='py-4'>S??? ??i???n tho???i:</label>
                            <input type="number" name='sdt' className='border px-3 py-2' placeholder='S??? ??i???n tho???i' onInput={(e) => {
                                setAccount(e.target.value)
                            }} value={account} />
                            <label htmlFor="mk" className='py-4'>M???t kh???u:</label>
                            <input type="password" name='mk' className='border px-3 py-2' placeholder='M???t kh???u' value={password} onInput={e => setPassword(e.target.value)} />
                            <span className='py-6'><Button className="mx-auto" onClick={onLogin}>????ng nh???p</Button></span>
                            <p>B???n ch??a c?? t??i kho???n? <span className='text-red-500 font-semibold cursor-pointer' onClick={() => {
                                setAccount("")
                                setPassword("")
                                setIsLogin(false)
                            }}>????ng k?? ngay</span></p>
                        </div>
                        <AiFillCloseCircle size={24} className="absolute top-2 right-2" onClick={handleCloseModal} />
                    </div>
                    :
                    // dang ki
                    <div>
                        <div className="border-b p-4 text-center font-bold text-xl">????ng K??</div>
                        <div className="p-4 px-8  flex flex-col">
                            <label htmlFor="sdt" className='py-4'>S??? ??i???n tho???i:</label>
                            <input type="number" name='sdt' className='border px-3 py-2' placeholder='S??? ??i???n tho???i' onInput={(e) => {
                                setAccount(e.target.value)
                            }} value={account} />
                            <label htmlFor="mk" className='py-4'>M???t kh???u:</label>
                            <input type="password" name='mk' className='border px-3 py-2' placeholder='M???t kh???u' value={password} onInput={e => setPassword(e.target.value)} />
                            <span className='py-6'><Button className="mx-auto" onClick={handleRegister}>????ng K??</Button></span>
                            <p>B???n ???? c?? t??i kho???n? <span className='text-red-500 font-semibold cursor-pointer' onClick={() => setIsLogin(true)}>????ng Nh???p</span></p>
                        </div>
                        <AiFillCloseCircle size={24} className="absolute top-2 right-2" onClick={handleCloseModal} />
                    </div>}
            </div>
            <SweetAleart title="????ng k?? th??nh c??ng" ref={registerSuccessRef} />
            <SweetAleart title="S??? ??i???n tho???i ????? t???n t???i" ref={registerFaileRef} success={false} />
            <SweetAleart title="????ng nh???p th??nh c??ng " ref={loginSuccessRef} />
            <SweetAleart title="????ng nh???p th???t b???i" ref={loginFaileRef} success={false} />
            <SweetAleart title="Vui l??ng nh???p ?????y ????? th??ng tin" ref={alertRef} success={false} />
        </div>
    )
})

export default Form