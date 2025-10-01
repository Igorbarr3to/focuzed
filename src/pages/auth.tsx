import { useState } from "react";

import SignInForm from "../components/auth/signIn-form";
import SignUpForm from "../components/auth/signUp-form";
import EmailConfirmationMessage from "../components/auth/confirm-email-message";

export function AuthPage() {
  const [view, setView] = useState("signIn");

  const renderView = () => {
    switch (view) {
      case "signUp":
        return <SignUpForm onSignUpSuccess={() => setView("checkEmail")} />;
      case "checkEmail":
        return (
          <EmailConfirmationMessage onGoToLogin={() => setView("signIn")} />
        );
      case "signIn":
      default:
        return <SignInForm />;
    }
  };

  return (
    <div className="h-screen bg-gray-700 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Focuzed
        </h1>
        {view !== "checkEmail" && (
          <h2 className="text-xl text-center text-gray-300 mb-8">
            {view === "signIn" ? "Entrar na sua conta" : "Criar uma nova conta"}
          </h2>
        )}
        {renderView()}

        {view !== "checkEmail" && (
          <p className="mt-6 text-center text-gray-400">
            {view === "signIn" ? "Não tem uma conta?" : "Já tem uma conta?"}
            <button
              onClick={() => setView(view === "signIn" ? "signUp" : "signIn")}
              className="ml-2 text-blue-400 hover:underline font-semibold"
            >
              {view === "signIn" ? "Cadastre-se" : "Faça o login"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
