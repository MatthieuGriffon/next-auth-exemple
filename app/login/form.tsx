'use client'

import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Form () {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Form submitted")
        const formData = new FormData(e.currentTarget);
        const response = await signIn ('credentials', {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        });
        console.log(response);
        if (!response?.error) {
            router.push("/");
            router.refresh();
        }
    } 
    return (
    <form  
        onSubmit = {handleSubmit} 
        className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
        <input name="email" 
            className="border border-black text-black" 
            type="email" 
            placeholder="Email"
         />
        <input name="password"
             className="border border-black text-black" 
             type="password" 
             placeholder="Password"
        />
        <button type="submit">
            Login
        </button>
    </form>
    );
}