export const KeyManagment = (password : string)=>{
    localStorage.setItem("Passcode", password);
    return;
};

export const checkPassword = (password : string)=>{
    const savedPassword = localStorage.getItem("Passcode");
    if (savedPassword === password){
        return true;
    }
    else {
        return false;
    }
}