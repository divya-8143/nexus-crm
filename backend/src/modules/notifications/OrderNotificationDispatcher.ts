// Order Lifecycle Notification Dispatcher
export class OrderNotificationDispatcher {
  public static formatDeliveryAlert(orderId: string, customerName: string, status: string): string {
    return `Hello ${customerName}, your order #${orderId} is currently ${status}. Thank you for shopping with us!`;
  }
}
