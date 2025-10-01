import { Button } from "../ui/button";

const EmailConfirmationMessage = ({ onGoToLogin }: any) => {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-4">Verifique seu Email</h3>
      <p className="text-gray-300 mb-8">
        Enviamos um link de confirmação para o seu endereço de e-mail. Por favor, clique no link para ativar sua conta.
      </p>
      <Button
        onClick={onGoToLogin} 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-semibold transition"
      >
        Voltar para o Login
      </Button>
    </div>
  );
};

export default EmailConfirmationMessage;