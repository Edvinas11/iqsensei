import React from 'react'

const Button = ({ bgColor, color, size, text, borderRadius, styles, type }) => {
  return (
    <button type={type} style={{ backgroundColor: bgColor, color, borderRadius }} className={`text-${size} font-semibold p-3 hover:drop-shadow-xl ${styles}`}>
      {text}
    </button>
  )
}

export default Button