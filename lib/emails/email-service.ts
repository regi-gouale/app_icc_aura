import fs from "fs/promises";
import handlebars from "handlebars";
import nodemailer from "nodemailer";
import path from "path";

// Type pour les options d'email
interface EmailOptions {
  to: string;
  subject: string;
  templateName: string;
  variables: Record<string, any>;
}

// Configuration du transporteur nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Charger un template par nom
const loadTemplate = async (templateName: string) => {
  const templatePath = path.join(
    process.cwd(),
    "lib/emails/templates",
    `${templateName}.html`
  );
  return await fs.readFile(templatePath, "utf-8");
};

// Compiler un template avec handlebars
const compileTemplate = (
  templateContent: string,
  variables: Record<string, any>
) => {
  const template = handlebars.compile(templateContent);
  return template(variables);
};

// Envoyer un email
export const sendEmail = async ({
  to,
  subject,
  templateName,
  variables,
}: EmailOptions) => {
  try {
    // Charger et compiler le template
    const templateContent = await loadTemplate(templateName);
    const html = compileTemplate(templateContent, variables);

    // Créer le transporteur
    const transporter = createTransporter();

    // Envoyer l'email
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    console.log(`Email envoyé: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return { success: false, error };
  }
};
