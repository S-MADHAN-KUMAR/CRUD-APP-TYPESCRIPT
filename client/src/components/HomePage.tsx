import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center text-center h-[100vh] w-[100vw] gap-4">
      <h1 className="text-[#111826] text-6xl font-bold w-3/4 ">
        Wellcome to the <span className="text-[blue]">Type script</span> 
      </h1>
      <div className="flex items-center w-full justify-center gap-6">
      <img src="/logo.png" className="w-20 h-20 shadow-lg rounded-3xl" />
      <h1 className="text-[#111826] text-6xl font-bold  ">
      crud app 
      </h1>
      </div>
      <div className="flex gap-12 mt-20">
      <button onClick={()=>navigate('/users')} type="submit" className="min-w-38 rounded-full hover:scale-105 duration-500 cursor-pointer shadow-lg bg-blue-900 text-white  py-2 ">
          See Users
        </button>
      <button onClick={()=>navigate('/create-user')} type="submit" className="min-w-38 rounded-full hover:scale-105 duration-500 cursor-pointer shadow-lg bg-gray-900 text-white px-4 py-2 ">
          Add Users
        </button>
      </div>
    </div>
  )
}

export default HomePage