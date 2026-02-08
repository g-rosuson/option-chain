/**
 * Returns the timestamp for next Friday at 08:00 UTC.
 * Binance options expire at 08:00 UTC on Fridays.
 */
const getNextFridayTimestamp = (): number => {
    const now = new Date();
    const day = now.getUTCDay();
    const daysUntilFriday = (5 - day + 7) % 7 || 7;

    const nextFri = new Date(now);
    nextFri.setUTCDate(now.getUTCDate() + daysUntilFriday);
    nextFri.setUTCHours(8, 0, 0, 0);

    return nextFri.getTime();
};

const time = {
    getNextFridayTimestamp
};

export default time;