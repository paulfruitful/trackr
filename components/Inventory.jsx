import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Inventory = () => (
    <div className="flex w-[350px] lg:w-[600px] shadow-lg mt-[30px] self-center  justify-between bg-[#1A1A1A] ">
        <div className="flex p-3 ">
            <img src='data:image/webp;base64,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' className="w-[50px] h-[50px]"/>
            <span className="text-white p-3  text-[23px]">Carrot</span>
        </div>

        
        <div className=" p-3 flex items-center">
            <span className="text-[12px]  p-3 text-center font-bold text-white">Qty: 1</span>
           
            <button className="bg-white text-black  rounded-full text-center  shadow-sm px-3 ">+</button>
            <button className="bg-black rounded-md mx-2 shadow-sm px-3  ">-</button> 
            <button  className=" shadow-sm p-3">      <FontAwesomeIcon icon={faTrash} className='text-gray-300 transition-colors duration-300 ease-in-out hover:text-red-500'/></button>

        </div>




    </div>
)

export default Inventory
