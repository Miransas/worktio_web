// src/components/login-button.tsx

import { signIn } from "../../../auth";


export default function LoginButton() {
  return (
    <form
      action={async () => {
       "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <button 
        type="submit"
        className="px-6 py-2 bg-zinc-900 text-white border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-all"
      >
        Worktio&lsquo;ya Google ile Başla
      </button>
    </form>
  );
}