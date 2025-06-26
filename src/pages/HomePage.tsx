import React from 'react'
import { Button } from '@/components/ui/button' 
import { useNavigate } from 'react-router-dom'


function HomePage() {
   const navigate = useNavigate()
    const handleLogin = () => {
      navigate('/login')
  }
    const handleSingUp = () => {
        navigate('/signup')
    }

  return (
    <>
      <div className='w-full px-7 py-5'>
        <nav className='flex items-center justify-between'>
            <p className='text-xl'>Spliters..</p>
            <div className='flex gap-4'>
                <Button variant="secondary" onClick={handleLogin}>Log in</Button>
                <Button onClick={handleSingUp}>Sign up</Button>
            </div>
        </nav>

      

      </div>
    </>
  )
}

export default HomePage
