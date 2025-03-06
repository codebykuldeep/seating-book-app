import { useCallback, useState } from 'react'
import { AlertType, SnackType } from '../types/errorTypes';


function useSnack() {
   const [snackState,setSnackState]=useState<SnackType>({open:false,status: undefined,message:''})
   const snackClose = useCallback(function snackClose(){
    setSnackState({open:false,status:undefined,message:''});
    },[])
    const snackOpen =useCallback(function snackOpen(open:boolean,status:AlertType,message:string){
        setSnackState({open,status,message});
    },[])

    return {snackState,snackOpen,snackClose};
}

export default useSnack