import React from 'react'
import Provider from './Provider'

const Userpagelayout = ({children}) => {
  return (
    <div>
        <Provider>
            {children}
        </Provider>
    </div>
  )
}

export default Userpagelayout