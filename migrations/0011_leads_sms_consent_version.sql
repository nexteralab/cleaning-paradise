-- Versión del texto de consentimiento SMS aceptado (src/lib/sms-consent.ts).
-- NULL = sin consentimiento, o lead anterior a esta columna (no se re-inscribe a nadie).

ALTER TABLE leads ADD COLUMN sms_consent_version TEXT;
