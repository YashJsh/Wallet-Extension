export const copy = (data : string)=>{
    navigator.clipboard.writeText(data);
    return true;
}