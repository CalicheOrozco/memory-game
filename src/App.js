import React, { useState } from "react";
import { useForm } from "react-hook-form";
import GameTable from "./components/GameTable";

function App() {
  const [name, setName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    setName(data.name);
  };
  return (
    <div className="App bg-gradient-to-r from-[#005B40] to-[#00A37C] max-w-full min-h-screen">
      <h1 className="text-4xl text-center py-5 text-white font-bold">Memory Game</h1>

      {name === "" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="flex flex-col items-center justify-center gap-4 py-5 p-5">
            <label className="text-2xl text-center text-white font-bold">
              {watch("name") ? `Nickname: ${watch("name")}` : "Nickname"}
            </label>
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-[20px] max-w-[150px]  p-2.5"
              placeholder="Caliche Orozco"
              {...register("name", {
                required: true,
                maxLength: 20,
                minLength: 3,
              })}
            />
            {errors.name && (<span className="text-red-500 font-bold"> This field is required </span>)}
            {errors.name?.type === "maxLength" && ( <span className="text-red-500 font-bold"> Max length exceeded </span>)}
            {errors.name?.type === "minLength" && ( <span className="text-red-500 font-bold">Min length is 3</span> )}
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-1/2 px-5 py-2.5 text-center font-bold"
          >
            Start
          </button>
        </form>
      ) : (
        <GameTable name={name} />
      )}
    </div>
  );
}

export default App;
