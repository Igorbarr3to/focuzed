import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { supabase } from "../../lib/supabase/supabaseClient";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

const signInSchema = z.object({
  email: z.email({ message: "Por favor, insira um e-mail válido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
});

type SignInData = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SignInData) => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
    } catch (error) {
      setError("E-mail ou senha inválidos. Tente novamente.");
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
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Senha"
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
          {loading ? <Loader /> : "Entrar"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
