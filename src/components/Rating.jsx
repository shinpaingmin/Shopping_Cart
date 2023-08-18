import React from 'react'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'

const Rating = ({rate, setRate, style, status}) => {
  return (
    <div>
        {
            status === true? (      //onClick handling
                [...Array(5)].map((_,i) => (
                    <span key={i} onClick={()=>setRate(i)} style={style}>
                        {i < rate ? (
                            <AiFillStar fontSize="15px"/>
                        ) : (
                            <AiOutlineStar fontSize="15px"/>
                        )}
                    </span>
                ))
            ) : (
                [...Array(5)].map((_,i) => (
                    <span key={i}>
                        {i < rate ? (
                            <AiFillStar fontSize="15px"/>
                        ) : (
                            <AiOutlineStar fontSize="15px"/>
                        )}
                    </span>
                ))
            )
        }
    </div>
  )
}

export default Rating