# NexusCRM Enterprise Security, Compliance & Data Governance Whitepaper

## 1. Zero Secrets & Security Compliance
- **No Stored Credentials**: No API keys, database passwords, or third-party secret tokens are committed to source control.
- **Cryptographic Password Hashing**: Passwords hashed using bcrypt with salt rounds >= 10.
- **JWT Session Security**: Stateless signed JWTs with explicit expiration and refresh token rotation.
- **RBAC Matrix**: Enforced through middleware at every API endpoint for 6 discrete enterprise roles (`SUPER_ADMIN`, `ADMIN`, `SALES_MANAGER`, `SALES_AGENT`, `SUPPORT_AGENT`, `COMPLIANCE_AUDITOR`).

## 2. Immutable Cryptographic Audit Ledger
Every state change (Customer, Deal, Ticket, Invoice, User) generates an audit entry containing:
- Unique UUID & timestamp
- Actor ID & email
- Action type (`CREATE`, `UPDATE`, `DELETE`, `STATUS_CHANGE`, `LOGIN`)
- Complete JSON snapshot of before and after states
- SHA-256 block hash linked to the previous entry, establishing a tamper-evident audit chain.
