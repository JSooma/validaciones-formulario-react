import React from 'react'
import { Validations } from './Validations/Validations'

//Componente que contendrá todo el cuerpo de la página.
export const Container = () => {
  return (
    <>
        <main className='main'>
            <div className='main-container md:p-14'>
                <Validations/>
            </div>
        </main>
    </>
  )
}
