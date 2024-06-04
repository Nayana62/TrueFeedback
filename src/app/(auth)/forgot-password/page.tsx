"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(
        "/api/forgot-password",
        data
      );

      toast({
        title: "Success",
        description: response.data.message,
      });

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error sending reset password email", error);

      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;
      ("There was a problem sending reset password email. Please try again.");

      toast({
        title: "Failed to send email",
        description: errorMessage,
        variant: "destructive",
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-4 md:space-y-8 bg-white rounded-lg shadow-md mx-2 md:mx-0">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl text-start font-extrabold tracking-tight lg:text-5xl mb-2">
            Forgot Password
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="input"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Enter email or username
                  </FormLabel>
                  <Input {...field} type="text" required />
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "send reset password email"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
