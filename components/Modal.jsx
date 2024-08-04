import React,{forwardRef} from 'react'

const Modal = forwardRef(({},ref) => {
    const closeModal=()=>{
        if (ref.current) {
        ref.current.className = "fixed z-10 overflow-y-auto top-0 w-full left-0 hidden";
      }
      console.log('You touched')
      }
    
  return (
<div ref={ref} class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
  <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-900 opacity-75" />
    </div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label class="font-medium text-gray-800">Name</label>
        <input type="text" class="w-full outline-none rounded bg-gray-100 text-black p-2 mt-2 mb-3" />
        <label class="font-medium text-gray-800">Quantity</label>
        <input type="number" class="w-full outline-none rounded bg-gray-100 text-black p-2 mt-2 mb-3" />
      </div>
      <div class="bg-gray-200 px-4 py-3 text-right">
        <button onClick={()=>{closeModal()}} class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" ><i class="fas fa-times"></i> Cancel</button>
        <button type="button" class="py-2 px-4 bg-green-600 text-white rounded font-medium hover:bg-green-700 mr-2 transition duration-500"><i class="fas fa-plus"></i> Create</button>
      </div>
    </div>
  </div>
  </div>
  )
})

export default Modal
