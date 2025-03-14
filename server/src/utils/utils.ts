export function getNameFromEmail(email:string){
    const nameFromMail = email.split('@')[0];
    const wordArr = nameFromMail.split('.').map((word)=>{
        const arr = word.split('');
        arr[0] = arr[0].toUpperCase();
        return arr.join('');
    });
    return wordArr.join(" ");
}