// псевдокод DistributeOrderUseCase:
// async execute(orderId: string) {
//   const order = await this.orderRepo.findById(orderId);

// 1. Найти подходящих мастеров
//   const makers = await this.userRepo.find({ role: 'MAKER' });

//   const suitableMakers = makers.filter(maker => {
// Проверка навыка
//     const hasSkill = maker.skills.includes(order.cakeType);
// Проверка нагрузки (меньше 3 активных)
//     const isNotBusy = maker.activeOrdersCount < 3;
// Проверка статуса
//     const isOnline = maker.status === 'ONLINE';

//     return hasSkill && isNotBusy && isOnline;
//   });

// 2. Отправить уведомления
//   for (const maker of suitableMakers) {
//     await this.notificationService.send(maker.id, {
//       message: `Новый заказ: ${order.cakeType} на ${order.date}`
//     });
//   }
// }
