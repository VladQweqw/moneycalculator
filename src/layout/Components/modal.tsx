import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

export default function Modal(props: any) {
    const navigate = useNavigate();

   return(
    <motion.div 
    initial={{
        opacity:0
    }}
    animate={{
        opacity:1
    }}
    className="add-wrapper"   onClick={(e) => {
        if((e.target as HTMLElement).classList.contains('add-wrapper')) {
            navigate(-1)
        }        
    }}>

    {props.children}

    </motion.div>
   )
}