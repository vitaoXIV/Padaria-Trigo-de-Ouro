export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center dark:text-white">Entrar</h2>

        <input
          type="text"
          placeholder="Usuário"
          className="p-2 rounded bg-white dark:bg-gray-700 dark:text-white outline-none"
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded bg-white dark:bg-gray-700 dark:text-white outline-none"
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition">
          Acessar
        </button>
      </form>
    </div>
  );
}
