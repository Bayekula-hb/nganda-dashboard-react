"use client";
import {
  CSSProperties,
  useState,
  useEffect,
  ReactElement,
  FormEvent,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from 'next/navigation';
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from 'react-toastify';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import NgadaValues from "../../src/config/index"


type Inputs = {
  userName: string;
  password: string;
};

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#ffffff",
};

const formSchema = z.object({
    userName: z.string().min(6, {
      message: "Email must be at least 6 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
});

const LoginForm = () => {

  const router = useRouter()
  
  const [loadSubmting, setLoadSubmting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        userName: "",
      password: "",
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoadSubmting(true);
    const response = await fetch(`${NgadaValues.URL_API_LOCAL}auth/login`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {      

      toast.success('connecté avec succès');
      const data = await response.json();
      setLoadSubmting(false);

      if(data.data.userRoles[0].nameRole === 'admin') {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("lastName", data.data.lastName);
        localStorage.setItem("middleName", data.data.middleName);
        localStorage.setItem("firstName", data.data.firstName);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("id", data.data.id);

        setTimeout(() => {
            router.push(`/dashboard/${data.data.lastName}`);
        }, 2000);
      } else {
        toast.error("Vous n'etes pas autorise.e a acceder a une application");
        setLoadSubmting(false);
      }

    } else {
      toast.error("Nom d'utilisateur ou mot de passe incorrecte");
      setLoadSubmting(false);
    }
  }

  return (
    <div className="">
      <Head>
        <title>Connexion | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold uppercase text-blue-700">Connexion</h2>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="example@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="example@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {loadSubmting ?
                    <Button
                    type="submit"
                    disabled={true}
                    className="flex items-center justify-center gap-3 px-5 py-4 text-xs font-semibold text-white rounded-md w-full opacity-50 cursor-not-allowed bg-gradient-to-r from-sky-500 to-indigo-500"
                    >
                    Connectez-vous
                        <HashLoader
                            color="#fff"
                            loading={loadSubmting}
                            cssOverride={override}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </Button> :
                    <Button type="submit" className="w-full bg-blue-700">Connectez-vous</Button>
                }
            </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;