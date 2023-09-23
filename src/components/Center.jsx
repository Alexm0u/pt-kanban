import React, { useEffect } from 'react'

function Center({boardModalOpen, setBoardModalOpen}) {
  
  const [windowSize, setWindowSize] = useState(
    [
      window.innerWidth,
      window.innerHeight
    ]
  )
  useEffect(()=> {
    const handleWindowResize = ()=> {
      setWindowSize([window.innerWidth,window.innerHeight])
    }
    window.addEventListener("resize", handleWindowResize0)
    return ()=> {
      window.removeEventListener("resize", handleWindowResize)
    }
  })
  
  
  return (
    <div></div>
  )
}

export default Center