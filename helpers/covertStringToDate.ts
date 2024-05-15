export function convertStringToDate(dateString: string | undefined): Date | null {
    if (dateString == undefined) return null;
    
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;

    const [, year, month, day] = match.map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
}