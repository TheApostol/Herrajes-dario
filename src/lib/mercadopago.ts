import { MercadoPagoConfig, Preference } from "mercadopago";

let client: MercadoPagoConfig | null = null;

export function getMpClient(): MercadoPagoConfig {
  if (!client) {
    client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN as string,
    });
  }
  return client;
}

export function getPreferenceClient(): Preference {
  return new Preference(getMpClient());
}
