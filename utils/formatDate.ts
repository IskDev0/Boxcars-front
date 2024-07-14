export default function formatDate(dateString: Date):string {
    let date = new Date(dateString);
    const day:string = String(date.getUTCDate()).padStart(2, '0');
    const month:string = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year:number = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
}