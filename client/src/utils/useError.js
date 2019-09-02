import react, {useState,useEffect} from 'react';


export const useError = (message,timer)=>{
  const [mess, setMessage] = useState(message);

  useEffect(()=>{
    setTimeout(() => {
      setMessage('')
    }, timer);
  })

  return [mess, setMessage]
}