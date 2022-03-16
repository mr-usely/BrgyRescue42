export const calculateAge = (dateString) => {
    let today = new Date();
    let birthday = new Date(dateString);
    let age = today.getFullYear() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
        age--;
    }
    return age;
}
