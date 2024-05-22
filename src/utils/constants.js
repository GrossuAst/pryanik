export const BASE_URL = 'https://test.v5.pryaniky.com';

export const apiConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
    }
};

export function formatDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}.${month}.${year}`;
}    

// export const properties = ['№', 'Дата подписания', 'Кем подписан', 'Название документа', 'Статус документа', 'Тип документа', 'Сотрудник', 'Дата подписи сотрудником', 'Кем подписан'];