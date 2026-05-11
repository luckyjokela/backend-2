export enum OrderStatus {
<<<<<<< HEAD
  NEW = 'New',
  ACCEPTED = 'Accepted',
  BAKING = 'Baking',
  READY = 'Ready',
  CANCELLED = 'Cancelled',
=======
  NEW = 'NEW', // Создан, ждёт мастера
  ASSIGNED = 'ASSIGNED', // Взят в работу
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY', // Готов к выдаче
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
>>>>>>> 33b11ba (update)
}
