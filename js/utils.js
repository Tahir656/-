export const uid = () => crypto.randomUUID();
export const today = () => new Date().toISOString().slice(0, 10);
export const currentMonth = () => today().slice(0, 7);
export const formatMoney = (minor, currency = 'KZT') => new Intl.NumberFormat('ru-RU', { style: 'currency', currency, maximumFractionDigits: 2 }).format(minor / 100);
export const monthName = month => new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(new Date(`${month}-01T12:00:00`));
export const toMinor = value => Math.round(Number(String(value).replace(',', '.')) * 100);
export const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c]));
export const selectedMonthItems = (items, month) => items.filter(x => x.date.startsWith(month));
