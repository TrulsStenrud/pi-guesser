import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";

export function useFetchUsers(gameCode: string | null) {

  async function fetch() {
    const { data } = await supabase.from('users').select('username').eq('gamecode',gameCode)
    return (data ?? []).map((o) => o.username)
  }

  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    if(gameCode === null){
      return;
    }

    console.log("START FETCHING USERS");

    const interval = setInterval(async function(){
      const users = await fetch()
      setUsers(users);
    }, 1000)

    return () => { console.log("STOPPING FETCHING USERS: unloaded"); clearInterval(interval); };
  }, [gameCode]);


  return users;

}
