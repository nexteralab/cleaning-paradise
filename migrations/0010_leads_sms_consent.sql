-- Opt-in de SMS (Twilio / TCPA). 0/1. Junto con created_at y source queda la
-- prueba de quién aceptó, cuándo y desde qué formulario.

ALTER TABLE leads ADD COLUMN sms_consent INTEGER NOT NULL DEFAULT 0;
