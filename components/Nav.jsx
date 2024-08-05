import { getCookie, getCookies } from "cookies-next"
const Nav = () => {
  return (
  
<div className="flex flex-row justify-between w-full h-[100px]">
  <div className="relative flex  p-6 font-bold  text-white">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
  <line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" stroke-width="2"/>
  <line x1="12" y1="12" x2="18" y2="12" stroke="currentColor" stroke-width="2"/>
  </svg>

   <a href="/inventory" className='ml-2 text-4xl lg:text-[27px]'> Trackr</a>
  </div>

    <div className="flex p-6 justify-center items-center">
      <div className="w-[30px] h-[30px] rounded-full" style={{backgroundColor:getCookie('color')}}> </div> 
      <span className="lg:mx-2 ml-[2px]"></span>
     
      <span className="text-[16px] dark:text-white text-center text-white">{getCookie('name')}</span>
    </div>

</div>
  )
}

export default Nav
