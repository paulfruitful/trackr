import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
const Hero = ({open,count}) => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/addimage', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log(result); 
    }
  };
  return (
    <div className="flex justify-between px-3 my-[4pc] lg:px-8 w-full ">

       <span className="text-lg border-b-2 lg:p-0 pl-2  border-solid  "><a href="/inventory">Pantry🥗<span className=" bg-white ml-1  text-black rounded-full py-1 px-2 text-md">{count}</span></a></span>
 
        <button onClick={()=>{open()}} className=" p-3 bg-green-600 active:bg-green-700 text-white rounded-[10px] shadow-sm">+ Add Pantry</button>
        <div class="relative">
  <input
    type="file"
    accept="image/*"
    capture="environment"
    id="camera-input"
    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
  <label htmlFor="camera-input" class="flex items-center justify-center w-[50px] h-[50px]   border border-gray-300 rounded-full cursor-pointer">
    <FontAwesomeIcon icon={faCamera} class="fas fa-camera text-white w-[30px] h-[30px]  text-2xl"/>
  </label>
</div>
    </div>
  )
}

export default Hero
