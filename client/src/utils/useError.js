import  {useState,useEffect} from 'react';


export const useError = (message,timer)=>{
  const [mess, setMessage] = useState(message);
  let time = timer || null

  useEffect(()=>{
    setTimeout(() => {
      setMessage('')
    }, time);
  },)

  return [mess, setMessage]
}