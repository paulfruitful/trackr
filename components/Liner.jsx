
const Liner = ({open,count}) => {
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

       <span className="text-lg border-b-2 lg:p-0 pl-2  border-solid  "><a href="/inventory">Pantry🥗<span className=" bg-white ml-1  text-black rounded-full py-1 px-2 text-md">{typeof window!=='undefined'?? localStorage.getItem('count')}</span></a></span>
 
        <button onClick={()=>{}} className=" p-3 bg-green-600 active:bg-green-700 text-white rounded-[10px] shadow-sm">+ Generate Recipe</button>
    </div>
  )
}

export default Liner
