-- Cómo, cuándo y quién registró el consentimiento SMS. method: 'web' (formulario o
-- chatbot) | 'phone' | 'in-person' (guion de /terms#sms-consent, registrado desde el admin).
-- by = id del usuario del admin que lo registró (NULL en los de la web).

ALTER TABLE leads ADD COLUMN sms_consent_method TEXT;
ALTER TABLE leads ADD COLUMN sms_consent_at TEXT;
ALTER TABLE leads ADD COLUMN sms_consent_by TEXT;

UPDATE leads SET sms_consent_method = 'web', sms_consent_at = created_at WHERE sms_consent = 1;
