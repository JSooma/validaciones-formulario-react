import React from 'react'

//Componente Header.
export const Header = () => {
  return (
    <>
        <header className='header w-full bg-red-600 shadow-sm shadow-white'>
            <div className='header-container p-5 flex justify-center items-center'>
                <p className='header-container__p text-white text-lg font-semibold'>REACT + TAILWIND + FORMSUBMIT.</p>
            </div>
        </header>
    </>
  )
}
