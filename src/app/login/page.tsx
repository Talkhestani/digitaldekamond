"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BottomGradient } from "@/components/BottomGradient";
import { LabelInputContainer } from "@/components/LabelInputContainer";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { fetchRandomUser } from "@/lib/fetchUser";
import { saveUser } from "@/lib/storage";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    phone: z
    .string()
    .regex(/^(?:\+989|00989|09)\d{9}$/, {
        message: "Enter a valid Iranian mobile number.",
    }),
})

export default function Login() {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
        },
    })

    const handleSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const user = await fetchRandomUser();
            saveUser(user);
            router.replace('/dashboard')
        } catch {}
        setLoading(false)
    };

    return (
        <section className="h-dvh flex-col items-center content-center">
            <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Welcome to Interview
                </h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                    For login please use iranian phone number
                </p>

                <Form {...form}>
                    <form className="my-8" onSubmit={form.handleSubmit(handleSubmit)}>
                            

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="phone">Phone</Label>
                                        
                                        <FormControl>
                                            <Input id="phone" placeholder="09xxxxxxxxx"  {...field}/>
                                        </FormControl>

                                        <FormMessage />
                                    </LabelInputContainer>
                                </FormItem>
                            )}
                        />

                        <button
                            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-80 cursor-pointer disabled:from-black/60 disabled:cursor-wait"
                            type="submit"
                            disabled={loading}
                        >
                            Login &rarr;
                            <BottomGradient />
                        </button>
                    </form>
                </Form>
            </div>
        </section>
    );
}


