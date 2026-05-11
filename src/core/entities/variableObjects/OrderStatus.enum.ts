export enum OrderStatus {
  NEW = 'NEW', // Создан, ждёт мастера
  ASSIGNED = 'ASSIGNED', // Взят в работу
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY', // Готов к выдаче
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
