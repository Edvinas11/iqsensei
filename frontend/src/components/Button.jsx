import React from 'react'

const Button = ({ styles, text }) => {
  return (
    <button type='button' className={`py-2 px-6 font-poppins font-medium text-[18px] rounded-lg outline-none  ${styles}`}>
      { text }
    </button>
  )
}

export default Button