export function getToken(){
    if(localStorage.getItem('token'))
         return localStorage.getItem('token') ;
    else
        return '';
}

export function setToken(token:string){
    return localStorage.setItem('token',token);
}

export function removeToken(){
    return localStorage.removeItem('token');
}
