
export const idCreator = () => {
    let date = new Date()
    let time = date.getTime()
    return time
}
export const dateCreator = () =>{
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth()+1 //month start from 0
    let year = date.getFullYear()
    if(month < 10){month = '0'+ month.toString()}
    if(day < 10){day = '0' + day.toString()}
    return day.toString()+"."+month.toString()+"."+year.toString()
}
export const timeCreator = () => {
    const date = new Date()
    let minute = date.getMinutes()
    if (minute < 10){ minute = '0' + minute.toString()}
    const hour = date.getHours()
    return hour.toString().concat(":",minute.toString())
} 
