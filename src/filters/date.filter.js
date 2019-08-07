export default function dateFilter(value, format = 'date') {
  const options = {}
// Настройка фильтра для даты
  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }
// Настройка фильтра для времени
  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}
