import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { supabase } from "../../lib/supabase/supabaseClient";
import { useState, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const signUpSchema = z
  .object({
    email: z.email({ message: "Por favor, insira um e-mail válido." }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
    repassword: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "As senhas não coincidem.",
    path: ["repassword"],
  });

type SignUpData = z.infer<typeof signUpSchema>;

const SignUpForm = ({ onSignUpSuccess }: any) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", repassword: "" },
  });

  const onSubmit = async (values: SignUpData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
      onSignUpSuccess();
    } catch (error) {
      setError("Erro ao criar a conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="E-mail"
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input
              type="password"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Senha"
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="repassword"
          render={({ field }) => (
            <Input
              type="password"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Confirmar senhas"
              {...field}
            />
          )}
        />

        {error && <p className="text-red-400 text-center text-sm">{error}</p>}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-semibold transition flex items-center justify-center disabled:bg-gray-500"
        >
          {loading ? <Loader /> : "Registrar"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
