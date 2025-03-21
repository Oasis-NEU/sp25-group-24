import { useEffect, useState } from 'react';
import {supabase} from '../supabase'

export function useSupabaseAuth(){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(()=> {

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user || null);
            setLoading(false);
          });


        // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
        }
      );
  
      return () => subscription.unsubscribe();


    },[])



    return {user,loading,isAuthenticated:!!user}
}

