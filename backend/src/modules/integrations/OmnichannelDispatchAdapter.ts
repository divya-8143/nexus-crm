export class OmnichannelDispatchAdapter {
  public static async sendSms(toPhone: string, message: string): Promise<{ success: boolean; messageId: string }> {
    console.log(`[SMS DISPATCH] To: ${toPhone} | Text: ${message}`);
    return {
      success: true,
      messageId: `sms_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
  }

  public static async sendEmail(toEmail: string, subject: string, htmlContent: string): Promise<{ success: boolean; messageId: string }> {
    console.log(`[EMAIL DISPATCH] To: ${toEmail} | Subject: ${subject}`);
    return {
      success: true,
      messageId: `eml_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };
  }
}
