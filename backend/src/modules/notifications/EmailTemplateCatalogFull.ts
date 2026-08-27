export interface ResponsiveEmailTemplate {
  templateId: string;
  name: string;
  category: string;
  subjectLine: string;
  htmlContent: string;
}

export const ENTERPRISE_HTML_EMAIL_TEMPLATES: ResponsiveEmailTemplate[] = [
  {
    templateId: 'TPL_RESPONSIVE_001',
    name: 'Enterprise Invoicing Notification Template #001',
    category: 'INVOICING',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_002',
    name: 'Enterprise Helpdesk Sla Notification Template #002',
    category: 'HELPDESK_SLA',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_003',
    name: 'Enterprise Sales Pipeline Notification Template #003',
    category: 'SALES_PIPELINE',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_004',
    name: 'Enterprise Security Audit Notification Template #004',
    category: 'SECURITY_AUDIT',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_005',
    name: 'Enterprise Onboarding Notification Template #005',
    category: 'ONBOARDING',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_006',
    name: 'Enterprise Invoicing Notification Template #006',
    category: 'INVOICING',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_007',
    name: 'Enterprise Helpdesk Sla Notification Template #007',
    category: 'HELPDESK_SLA',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_008',
    name: 'Enterprise Sales Pipeline Notification Template #008',
    category: 'SALES_PIPELINE',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_009',
    name: 'Enterprise Security Audit Notification Template #009',
    category: 'SECURITY_AUDIT',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_010',
    name: 'Enterprise Onboarding Notification Template #010',
    category: 'ONBOARDING',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_011',
    name: 'Enterprise Invoicing Notification Template #011',
    category: 'INVOICING',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_012',
    name: 'Enterprise Helpdesk Sla Notification Template #012',
    category: 'HELPDESK_SLA',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_013',
    name: 'Enterprise Sales Pipeline Notification Template #013',
    category: 'SALES_PIPELINE',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_014',
    name: 'Enterprise Security Audit Notification Template #014',
    category: 'SECURITY_AUDIT',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_015',
    name: 'Enterprise Onboarding Notification Template #015',
    category: 'ONBOARDING',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_016',
    name: 'Enterprise Invoicing Notification Template #016',
    category: 'INVOICING',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_017',
    name: 'Enterprise Helpdesk Sla Notification Template #017',
    category: 'HELPDESK_SLA',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_018',
    name: 'Enterprise Sales Pipeline Notification Template #018',
    category: 'SALES_PIPELINE',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_019',
    name: 'Enterprise Security Audit Notification Template #019',
    category: 'SECURITY_AUDIT',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_020',
    name: 'Enterprise Onboarding Notification Template #020',
    category: 'ONBOARDING',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_021',
    name: 'Enterprise Invoicing Notification Template #021',
    category: 'INVOICING',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_022',
    name: 'Enterprise Helpdesk Sla Notification Template #022',
    category: 'HELPDESK_SLA',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_023',
    name: 'Enterprise Sales Pipeline Notification Template #023',
    category: 'SALES_PIPELINE',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_024',
    name: 'Enterprise Security Audit Notification Template #024',
    category: 'SECURITY_AUDIT',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
  {
    templateId: 'TPL_RESPONSIVE_025',
    name: 'Enterprise Onboarding Notification Template #025',
    category: 'ONBOARDING',
    subjectLine: 'NexusCRM Enterprise Alert: Action Required Regarding Account {{customer.name}}',
    htmlContent: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
      .header { background: #0284c7; padding: 24px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
      .body { padding: 32px 24px; line-height: 1.6; font-size: 14px; }
      .card { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #cbd5e1; }
      .btn { display: inline-block; background: #0284c7; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 16px; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">NexusCRM Enterprise Platform</div>
      <div class="body">
        <h2>Important Update: {{event.title}}</h2>
        <p>Dear {{contact.firstName}},</p>
        <p>We are writing to notify you of an important operational update regarding your enterprise account <strong>{{customer.name}}</strong> (Account #{{customer.accountNumber}}).</p>
        <div class="card">
          <strong>Event Details:</strong><br>
          Timestamp: {{event.timestamp}}<br>
          Status: {{event.status}}<br>
          Reference Code: {{event.referenceId}}
        </div>
        <p>Please log in to your NexusCRM administrative console to view full diagnostic reports and event histories.</p>
        <a href="{{action.url}}" class="btn">View in Nexus Console</a>
      </div>
      <div class="footer">
        &copy; 2026 NexusCRM Enterprise Systems. All rights reserved. Confidential & Proprietary.
      </div>
    </div>
  </body>
</html>`,
  },
];
