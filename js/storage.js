export const STORAGE_KEY = 'my-finance-app-v1';

const defaults = {
  currency: 'KZT', theme: 'light',
  categories: {
    expense: ['Продукты', 'Транспорт', 'Дом и коммунальные платежи', 'Здоровье', 'Образование', 'Развлечения', 'Покупки', 'Подписки', 'Другое'],
    income: ['Зарплата', 'Подработка', 'Подарки', 'Возврат средств', 'Другое']
  },
  transactions: [], budgets: [], goals: [], reminders: []
};

export function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...structuredClone(defaults), ...saved, categories: { ...defaults.categories, ...saved.categories } } : structuredClone(defaults);
  } catch { return structuredClone(defaults); }
}
export function saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
export function downloadJson(data) {
  download(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), `my-finances-${new Date().toISOString().slice(0,10)}.json`);
}
export function downloadCsv(items) {
  const header = ['Дата','Тип','Категория','Сумма','Способ оплаты','Комментарий'];
  const rows = items.map(x => [x.date, x.type === 'income' ? 'Доход' : 'Расход', x.category, (x.amount / 100).toFixed(2), x.payment, x.note]);
  download(new Blob(['\uFEFF' + [header, ...rows].map(r => r.map(v => `"${String(v ?? '').replaceAll('"','""')}"`).join(';')).join('\n')], { type: 'text/csv;charset=utf-8' }), 'operations.csv');
}
function download(blob, name) { const url = URL.createObjectURL(blob); const a = Object.assign(document.createElement('a'), { href: url, download: name }); a.click(); URL.revokeObjectURL(url); }
