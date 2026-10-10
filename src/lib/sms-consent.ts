// Textos legales del opt-in de SMS (Twilio A2P 10DLC / TCPA). Cambiar cualquier texto de
// este archivo exige subir SMS_CONSENT_VERSION: la API guarda la versión con cada
// consentimiento, así se puede probar exactamente qué aceptó cada cliente.
export const SMS_CONSENT_VERSION = "2026-10-09";

export const SMS_CONSENT_LABEL = "Text me about my cleanings, invoices and receipts.";

// Formularios web (home, /contact, páginas de servicio). Los links a Terms y Privacy los agrega SmsConsent.tsx.
export const SMS_DISCLOSURE =
	"Optional. By ticking this box you agree to receive automated text messages from Cleaning Paradise LLC at the number above: booking confirmations, visit reminders, invoices, invoice reminders and payment receipts. Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out. Consent is not a condition of purchase.";

// Chatbot: mismo contenido, en forma de pregunta (los mensajes del bot son texto plano).
export const SMS_CHAT_PROMPT =
	"Optional: may Cleaning Paradise LLC send you automated text messages at this number for booking confirmations, visit reminders, invoices, invoice reminders and payment receipts? Msg frequency varies. Msg & data rates may apply. Reply HELP for help, STOP to opt out. Consent is not a condition of purchase. Terms: cleaningparadisellc.com/terms#sms · Privacy: cleaningparadisellc.com/privacy";
