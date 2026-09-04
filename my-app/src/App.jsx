import Button from "./components/Button";
import ThemeToggle from "./components/ThemeToggle";
import UserCard from "./components/cards/UserCard";
import { useEffect, useState } from "react";

function App(){
  const [ count , setCount ] = useState(0)

  useEffect(() => {
    localStorage.setItem("count", String(count))
  }, [count])

  const savedUser = JSON.parse(localStorage.getItem("user"))

   return (
    <div className="h-screen w-full p-8 flex flex-col">
      Good Evening Everyone!
      <UserCard user={savedUser}/>
      <div className="bg-gray-800 p-10 font-normal flex flex-col border border-gray-100 m-auto rounded-xl gap-4 text-center">
        <span className="text-xl text-gray-100">
        Count : { count }
        </span>
        <Button onClick={() => setCount(count + 1)}>
          Increment
        </Button>
        <ThemeToggle />
      </div>
    </div>
   )
}

export default App;
