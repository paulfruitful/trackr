const Hero = ({open}) => {
  return (
    <div className="flex justify-between px-3 mt-3 lg:px-8 w-full ">

        <span className="text-lg border-b-2 lg:p-0 pl-2  border-solid  ">Pantry🥗<span className=" bg-white ml-1  text-black rounded-full py-1 px-2 text-md">1</span></span>

        <button onClick={()=>{open()}} className=" p-3 bg-green-600  text-white rounded-[10px] shadow-sm">+ Add Pantry</button>
     
    </div>
  )
}

export default Hero
