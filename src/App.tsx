import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase/supabaseClient";
import { Outlet, useNavigate } from "react-router-dom";

import type { Session } from "@supabase/supabase-js";
import { Loader } from "lucide-react";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);

      if (!session) {
        navigate("/auth");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return session ? <Outlet context={{ session }} /> : null;
}

export default App;
