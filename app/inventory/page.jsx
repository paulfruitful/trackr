"use client"
import Nav from '@components/nav';
import '@/fontawesome';
import Hero from '@components/Hero';
import Inventory from '@components/Inventory';
import Modal from '@components/Modal';
import { useState, useRef } from 'react';

function Page() {
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const del = (id) => {
    const inv = inventory.filter(item => item.id !== id);
    setInventory(inv);
    setCount(count-1)
  };

  const [inventory,setInventory]=useState([
    {
      id:1,
      name:'Carrot',
      quantity:4,
      image:'data:image/webp;base64,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'
    },
    {
      id:2,
      name:'Beans',
      quantity:5,
      image:'https://th.bing.com/th/id/OIP.EbYquhjyNuj1RwqjO5vouwHaFj?w=252&h=189&c=7&r=0&o=5&pid=1.7'  
      },
    {
      id:3,
      name:'Apple',
      quantity:2,
      image:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAC2AJIDASIAAhEBAxEB/8QAHAAAAQQDAQAAAAAAAAAAAAAAAAMEBQYBAgcI/8QAPxAAAgIBAwMCBAQDBQUJAQAAAQIDEQAEEiEFMUEiUQYTYXEygZGhFCOxB0JSYtFygrLB4RUzQ0RTc4OSovH/xAAbAQACAwEBAQAAAAAAAAAAAAAABAIDBQYBB//EAC8RAAICAQMDAgMHBQAAAAAAAAABAgMRBBIhBRMxQVEGIjIUFWFxsdHwQlKBocH/2gAMAwEAAhEDEQA/AOt4YYYAGGGGABhhhgAYYYYAGcx+Lfif4g6Z1LqWlh1DDTI8SxiEiKVFaJGoPtYdyTdX+WdOzj3x3GH651EWK2xu1+y6ZCcR1tjhGLXv/wAY7o4xlN7l6fsdI+F+pTdX6D0jqE9fPmhZZq8yRSNCx/Or/PJnIb4X0Q6f8PdB0vO5dDDLJff5k4+e/wC7HJnHIfSsis8bngMMMMkQDDDDAAwwwwAMMMMADDDDAAwwwwAMMMMADDDDAAzk3xRp/wCO+IdTALLajUxaUV43fLhzrPtnN9PF/G/F0LAUo6pPqLr8SRK8v9QMyepPLrh7v+fqPaR7d8vwOjKqoqqopVAVQOwA4AzbDDNYRDDDDAAwwwwAMMMMADDDDAAwwzGAGcMb6rWabRx/MnegeEUcu59lXK9qOp9S1jbYkMMP+FXCSMP8zfi/KsptujUvmHNPo7L+Vwvdlim1ekgsSSoGH90ep7/2V5xq3VIr/lwyOO1kqv7cnIGHThqLQ7W77lb1A/XbWOLaMAWWry1X+2Zduvm/oQ29JVXxJ5ZKN1KWvRGg/wBosf6ViQ6lqiQNsNG6IVuf/wBd8im1YDKDX61Q+2ZEikcGiDf55m/eF7eMnvZqS8ErL1PUJFO+2K0jdgabggGj3yqdDkrrnzVQMINJO1dhbsiXdffJPXzVodRtYWQq8/VgcjPhmMtqOs6k3StptOvtdPKw/cYlZqrbLoyk+Y8hGuEYvC8ltk6s0Qt9MSKJ9EgJ/cAfvia9e06i9RA8XF0HRyB9arGEpEjhf/qByW+pzK6fSx+tgm76kE/vm1VrbpLLI9mjGMc/gS0PWelT7Qk9EntJHIv6tW398kFZXAZWVlPYqQR+oyqS6iNVO0BgPF843XqRhcNE5R/YGifoR2OOw1v9yIvQSlzWi6YZB6Hr0UxEepARga+YoIX/AHlPbJsEEAiiDyCOQQcfhZGazFmfZVOp7ZozhhhkysMMMMADGmu1sOg07zyckAiNAaMj1wo/5nHV5Sesa863UuFYiGG0jPFKvlq92/09srsnsjkf0Gkeqt2vwvIi+o1PUNTJLK/rPAIPpjXwijtkxpdLFECCS78b+b2n29sg45kipQwDp227QVvySByx8e33zd+ryRkRxq2wlVtVIZix4UH3buT4AJ+/P3WOUsnV3aeycVXUsJFkLQiwtMRwaN19zjOeZLKKis44K7glZFP1CaEEIm+ZlAtKK7j4UGuB7Y1aWWFXU8vyzDcN+5jxQ4FCxi26eMoWq6c3zIfNFptSwCmRWAbfJGR8tCPG58axxRCREj6hL6w0gZkVmYD0bipPYngdsbzTpptI8cbbJJCYlrn1SXuf7AXjWHUwtqdeoBDxNFpVW9rfLjVV3HuR5vKnta3NcjcemRknL0/n7kjO2jkheJp5wnzNoNKoeQMR2APnviPT9VF0+PVx/wAwKZmkkbce7KoBFD2AyO0mrBgl3SRmVHI3k2oAY7TZ4PeuPP3yNkMqy6iEOkis8k1sGN1TenfwfBz2Nabzgfr6PU3KEl4LT/HFTtVUqUEpLua2v+6zX39vH6YmdeqHbK7KCwALbipYmghJ8+3OV7TSoYBCJWfb8l1KLTJZJVa7DbRAx1NLJPD8tW/mkBFAICSMvJHPv/18ZdlrgPu+FT244Jc6gtvO7aQASLYkCwDwMYaqRpjLEk4WTaSodUDUPxVv4I7dhkaZZ5YYnje5aIDSbRJFItAI6rxzRDcYtDrDq4A4UKyMYyNxLxtX28ntnmGuSf2bt/MhxDq5IwolgeOUBSWRyVcDjcp7fkectXQ+u7Smm1DEwsQFZu8JJr1f5TlKin5naViUkljjZDuJikK0GFHgGscaZ/kScn1Wd452kWfWti+fOXU3SqllGdrtHC6LTXJ1vM5B9B6iJ4hpZGJkjQNEW7tF2q/p/T7ZOZ0dc1OKkjhrK3XJxkGGGGTKxh1bUDTaDUtdM4+Up8+rvX5XnOtbqylBaG0/MkJF+prCgj6D+uW74plIXRQL5+ZKw96pR/zzm/VNYC7RIXFtuej3U8Acc9gT+eJalncfDulUobn6smtKWJWyQQCwU/QepjXn3x9DtYrfLuajA7VXJb2GQ+idlV32gHakRG5j+Fea+xvJLS6nTyeuKtijYpJIsoaJofXMzt5fJt6iDy8CxSWOSd6KkAKoJBuv74HP9fGMpY9RI0O1yEUkk0eTfHJN5L6SSOd2jkFghe9WpPe/H2zXqEIRKDVuuNTyCAeAQctVSwJwvcJ7WuSKfeZEZiDDskVYyF9IjsiQseb75WtLJKeopK7+smSSQ7gC1qzEV5yw9TVtNp5CE52LuP8AeZSApC/Xvle07wR6rfIlL8ttorcBzXAyl0KK4NzRyUoSwPZXjsQRhAjqwhREvcd12w7VjmARi1eElJA3zCWUkbqBsE3fnInUaspI5hNXQDEKGAvkKK7d6GKaTWTyu4dm2uGKttFB+LJNe2Ly4XA1OqTgbadnSWw42SXVVW6M0wtffxj/AExp5GbuzpIV4A3KCGojn2/TINhIoYRbuDIhZbp0s8nx5zMepIoSuxSuRQHf+tV++RXnJ5qNO5rKJ6aBdPNM6WqSqJGK2Qslc0Dz/wDz9W0bQxPIdwDSktJS0GePzRoV5xCPqfzPkxtJv3u4LMCGHpuiOb78ds1E+mkmVCxlAQvQAajZUr2vJ2LMeDK2TWYyFGkkWdtRtFWiSK34SvupUVQBxxL85pA2nJMqIXi3HjZ5S/Y1x3/1YtqCzIqj+TuKTLIBan8NMB7g/tj2FSrsqXtbsSSdgAuuco3Y8lFscLLJ/pmqlhkglQHdGyyJftXqU/cWDnRYpI5oopYzaSIrqfowsZyXSzygbXAaRSwcpY2jutWe9Z0L4d1Jk0smnYnfpnBFm7jlth++4ZsaC3+g43qtG17ybwwwzXMEpXxXLWrjF8R6ZLr2JY5zN2dtS7V6tyMPJFmwPb28Z0P4ysarUeD/AAkQUjvyGGc2lf1h1sHcG578GhiN6zk+k/D+I6dMepqTCRUnCxOPXZWi1hTt+uPun6hvkE8HbEwBU0TTAba448DIFjYlNjsePPv9sV00pSGRg5VTEQexYtRrb+eIRnltM6SyKnwWrpnU0lSSSgrb3sCtwUUbHnJGTXQzwHc3cigaLqF5/D75SNNqnggkXin9QJBtTW3gjnEJNVK/y/W3BJBvm+3fvlkbElliF2ghJ7s4LZ1bqCSaRJVFMqxsbFhAzf3q4v8A0yoBzutSdt2OeRzm2qnkeOMF2ICqp3G+3tif8tY4tu8ttJkLVW7ceFA8VWU2T3LgYorWnl21+Yq8hYgsSWPcnkk44i1MvyxCPStEDZd898YluOPyPtmyua478i/b6isXcR3uRbwx0XDLSkgBaqyaPnue2Jzbdy7SSHb0763ertdYkJNp97vv2rtg7Ege4qvyzxLBKU008CSg3IG4K03n3rHEYYyDY2wqQd4PkewH7YjQaRSWADcEm6GbowRlBu91WCexFHJy58CTjhND95z8mQIo9EjFyGO47aNMO9+Tz/TJHTTCSNJgAE7d+Aao8D3yJ01mWRAARTFy5I3c7as4vp/mQUiAKm/edpJLeBVnFZpf5M6+CfBKaUj507I675IwxBHmPgHLl8Natl1kcUh9UyPEeOGIBkUn9D+uUrTMu+xsUfLpAo4Aum785P8ARJCmr0cvlNXpFYgk+l2Ef/PGNLLbYjnuo1qcJZ9jpWGYwzpziSjfG6sskLjs+nXxfqjdv9c5jqV/mMKA5J4B881nXPjWK9HpJ6NRySRsR7OAwH7HOU6naHmu9wIF+PHN4ravJ9A+H7E6FFjMg7XrsRtGYJ2pQv8ACFxQhRYu+1V9c1kBoe1cX9+2ZDXPg6yUcJtP0MSFxCoux4HgdrwjSwrccWCL5+9ZsDvAXb34usylAAffIyeFwSjBSmn6YMTLuT7EYjv5CkduxxzIeCOAQQKHb6nG0l2DtAo9/fPIexDU/LLcgIauOec3FbQbHcgjz2wP4R9fpmK989zkhjDygY2UH1vnNiTR9/64mwAJbyMyD6VJ9sMcHik9zTMg/rmTzyT4sX/0zTsxP6Zt5544OGA3ZWGOtPch4cKeO44BbvQ/TJAqrQvbgMgcm+5HfsfyORQ3AIFJXtJuPdaHJFY5md20zHc+5q5XzdCj9Di045kmJ2psk9MCuoVqJ3o43VwAvIu/Jyw9P2BomUctLASQe4WUEZXIZJFj0pABkdQpBtRezzYye6cpL6FStb9REq7SD/4igE3xkqs7kYetWY5Z1E9zhmSOThnUcnAcER8Saf8AiOj68USYlScV7I3qP6XnF9epDsaP4rJ8VW2yP0zvssaTRSwv+CWN4nHurqVOcN61ppNPLPBICGgmlU/Rl9J/pkJ+TqugXY3Q9uSGsg2Pb98ySW481478DnNSaUccWBmTQqr/AD7/ALZkXLEjvoSyjEZ4Yfbm838/c9/GIo20tyQQRRHFHvm5b0g33PJOUSXJKqa2mWblPqaN9s1mJrgdr/fE3NKh/wA2bNyv3oZ6ljBVKxyUkAf0r78H9MyWujifPauB3+mZJrbXbJYKlY8YYSE1Q7n34zALEAk2a55wbkC+2ZAGy+PtzZvPfQreXNvPBkt2uu2Kw/LJcsCSFNVZ78eMbBgWI+mLRnabBo2B7ZGUeAjZu8McQqjmG28uDu4FlfGPIIhKEDFiqOfmAgiiKHB8/wDXEV2AsCAdv/dl++2uDYyS07RilZySRTC7BP3HnE7Ji103gFQ/P9fcOCBYAoBjuH34GWXoqDUavoxA/wDNRNQII2qd5P7ZW5WVd6kkl3hjTtupjtNCvvl0+E9OG6hGy8R6XSO4H1f+Ut/Wry/Sx3TiYvUJ7aXL8C9/phmcM6Y4YM5n8cdO+VrjqFX+Xqo/m8DjeBscf0P550zIf4g6cOo9PlVVuaAGaH3NCmQfcf0GRksoe0Go+z3qb8eGcJlXaoFcqSeb9QvuMwxDCwKNAcfT3yQ1+lMTEf4S33rngXketVTcHtX/ADvM69Z5Pp+nmpLz5NFHLXZ88nvm4HoII+30zAoXXeivI982BAAB74jKQzXBLhiZXcKPgisJDRHtQusye5rsO3v+eaMb5wRXPGHjyY78gZhgdpvC6u+2YkYhWA9smlyLTa2tsAfSPvWbdwKP0IxNT6Bfbdm4BNkdu2etYIQluQklmZx9sdgMhbaLU0tGjdjjEAB81qPG0Y9QIV2r3+YlbhY/L7ZCyR5UtsX+bNk5lRiCoCBQOeSOL+2O4v5bB27HgKGPI/EzEdr4xuqhiU8KxTzZYmvHti6KX1BamKxDaBXNUwoVib5ZGeCR08fzijSA2rhl4HG2yDf550n4T0xTRT6wjnVy1H2H8mG0B49zuOUfp+ml1M+i0kK1LO4UD/AKss1ewsn7Z1eCGLTQQaeIVHDGkSD/ACqKF5p9Pry979DkOsX8Ktev6CuGGGbJzYYYYYAc6+MOgiKU6yBKgnYn0ihHLySvHvyV/TxnONQNkpB7ePes9DanTQauCbTTpuilUq48/Qg+47jOP/FHQJunapgQxja2hlA/Gt9wPf3H+vK9taZ2HRepcdmb59CqblJFMOa554++Bbb3o8cV4sZp8to22tXPIN96zRyQQfF0MypV4eDrO+9uX5FB5IzTknjt35zYE7eOOOfrhYv8qORR6+UhvIzA0R2PBxQAstG+QO/1zWSNmN+BzziiggWe2WNrCEoRl3JbvAm3ppfAPOOkUbK9wOT7HyM0VFdS3Aoj88yNwBIB2mrNGr8ZXJ54Ga4bW2G0bmAok8A+DQxWJVtbZidm4Bfp4zaFTayeB6UHlmY1xWKRAnUOzgB3bYg8Di7r2+uUyl5QSeB0hklVStWSSngg3X34x/p4lELkgAIASWPqYtQ/U+MaRNtZVKHi1V9tW/cm/Y5Y+h9Gk6tqk07gjTRMs+skWwVS/SgP+JqofmfHK8Iuc1GPqZequjXFyk8ItHwf0woknVZ0CvMnydIvB2xA+t/948D6D65bs1REjRI41CpGqoirwFVRQAGbZ1FNaqgoo4HUXO+xzYYYYZaUBhhhgAYy6n03R9U0sml1K2rAlHFb4n7B1Jx7hgSjJxe6Pk4b8Q9A13S9QYZUvkvDIoOyaP8AxJft5Hj9zXpY9ycUHU+odjXgi89Fa3Q6LqEDafVwpLE3hh6lb/EjDkH6g5zXr3wLrdMZJ+nq2s03LFFoamId/wAA4b8hf084ndS2so7Hp/WK7F2tRw/f3OfqpqrHA8+c1cbVJxzNC8ZcVRjtTa0QeQQwbyPtjdi4jKngE32HJHtmdhp8nTtxccRMqkjKp2GzYFWbzJico9DkA3Zr78ZiOQnwbWiK7isWYtJu9NMbO3tdZXJtME4uI3jFJRam4NEd+cXkRgsZBPYluRwfbE4kI3uxAN0Lq681i6swVrYCiartyO5vxnk3zweRliODfTlI4XkY8hjtJN/hAXgH74bJD8qcFybOwf8Aqsx/CL5+5xNQm1A/CE2LsEgGyefGWXoHw71jrckckUR0+iUlTq51JjC9v5K8Fj9uB5Pg1qEpS+VZYlqNTCmLnN4Qn0zQdQ6pqY9BpQralgHmko/K08ZoNIx/wj+779s670vpul6VpI9LBZr1SytW+aUgAu9ft7DjxmnSej9O6NphptGhG4h5pZPVNPJVb5Gr9B2HjJHNnS6RULL8nDa/XPVS2x4igwwwx0zAwwwwAMMMMADDDDAAzGGGAEV1X4e6D1gH+O0aNKRXz4iYpx/8iUT+d5TdX/Zktt/2f1P0WSItdDuIP/uwkf8ABhhlc64yXKHtNrdRS1GE2kQc/wDZ38S6YkjVdIYdwTLqQfzHyD/XGq/CHxECdsvS9x4BafUmr9v5GGGK9it+UbM+oahL6v8AS/Yewf2c/FGoFya3pKoSWLLJqnez34+So/fJfTf2Xj0/x3WXZPMek0yoR9pJXb/gwwyyNFfsJ3dR1KSxP9CzdO+C/hXpzRyro/4qdBSzdQc6hhXbajfyx+SDLHxhhjCio8JGPOydjzN5M4YYZIgGGGGABhhhgB//2Q=='    }
  ])
const [count,setCount]=useState(inventory.length)
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.className = "fixed z-10 overflow-y-auto top-0 w-full left-0";
    }
    setIsModalOpen(true);
    console.log('You clicked')
  };

  const search=(e)=>{
    const name=e.target.value
    console.log(name)
    const regex = new RegExp(name, 'i');
    setInventory(inventory.filter(item => regex.test(item.name)));
  }

  return (
    <div className="grid w-full overflow-hidden" style={{height:'100vh',width:'100vw'}}>
      <div className="flex flex-col">
      <Nav />
      <div className="p-6 flex flex-col items-center w-full">
  <div className="relative flex border-2 border-gray-400  px-4 py-[4px] pl-10">
    <input type="search" name="search" placeholder="cabbages..." className="outline-none self-start p-[3px] bg-transparent text-white text-lg" onChange={(e)=>search(e)} />
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[30px] justify-self-center p-[3px] mt-[2px] h-[30px]  text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      <input type="submit" value="" />
    
    </svg>   

  </div>
</div>
      <Hero open={openModal} count={count}/>
        {inventory.length>0?inventory.map((obj)=>{
          return <Inventory del={del} key={obj.id} id={obj.id} inventory={inventory} setInventory={setInventory} name={obj.name} quantity={obj.quantity} image={obj.image}/>
        }): <span className="text-lg text-center mt-[50px] text-gray-400 "> No Items</span>}
      </div>
      <Modal inventory={inventory} setInventory={setInventory} count={setCount}  ref={modalRef} />
    </div>
  )
}

export default Page
