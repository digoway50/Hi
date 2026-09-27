import { CartItem, CustomerOrderInfo, Product } from '../types';

export const DEFAULT_STORE_PHONE = '+15557892026';

/**
 * Sanitizes phone number to international E.164 digits required by WhatsApp (no +, -, spaces)
 */
export function sanitizePhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits;
}

/**
 * Creates a clean wa.me direct URL with encoded text
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = sanitizePhoneNumber(phoneNumber);
  const encodedText = encodeURIComponent(message);
  if (!cleanPhone) {
    return `https://wa.me/?text=${encodedText}`;
  }
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Formats a comprehensive, professional WhatsApp order placement message
 */
export function formatCartOrderMessage(
  items: CartItem[],
  customer: CustomerOrderInfo,
  orderNumber: string,
  totalPrice: number,
  shippingCost: number
): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const lines: string[] = [];
  lines.push(`🛍️ *NEW ORDER — FLEEX GARMENTS*`);
  lines.push(`*Order Ref:* #${orderNumber}`);
  lines.push(`*Date:* ${dateStr}`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);

  if (customer.name.trim()) {
    lines.push(`*Customer Details:*`);
    lines.push(`• *Name:* ${customer.name.trim()}`);
    if (customer.phone.trim()) lines.push(`• *Phone:* ${customer.phone.trim()}`);
    if (customer.address.trim()) {
      lines.push(`• *Shipping Address:* ${customer.address.trim()}${customer.city ? `, ${customer.city.trim()}` : ''}`);
    }
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  }

  lines.push(`*Items Ordered:*`);
  items.forEach((item, index) => {
    const itemSubtotal = (item.product.price * item.quantity).toFixed(2);
    lines.push(`${index + 1}. *${item.product.name}*`);
    lines.push(`   Size: ${item.size} | Color: ${item.color}`);
    lines.push(`   Qty: ${item.quantity} × $${item.product.price.toFixed(2)} = $${itemSubtotal}`);
  });

  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  lines.push(`• *Subtotal:* $${subtotal.toFixed(2)}`);
  lines.push(`• *Shipping:* ${shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}`);
  lines.push(`• *Total Amount:* *$${totalPrice.toFixed(2)}*`);

  if (customer.notes.trim()) {
    lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`*Customer Notes:*`);
    lines.push(`"${customer.notes.trim()}"`);
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`Please confirm item availability and send payment / dispatch instructions. Thank you!`);

  return lines.join('\n');
}

/**
 * Formats a single item direct purchase message on WhatsApp
 */
export function formatDirectBuyMessage(product: Product, size: string, color: string, quantity = 1): string {
  const total = (product.price * quantity).toFixed(2);
  const lines: string[] = [
    `👋 Hello Fleex Garments!`,
    `I would like to place an immediate order for:`,
    ``,
    `*${product.name}*`,
    `• Size: ${size}`,
    `• Color: ${color}`,
    `• Quantity: ${quantity}`,
    `• Total: $${total}`,
    ``,
    `Could you please verify stock availability and guide me through the payment details?`
  ];
  return lines.join('\n');
}

/**
 * Formats a quick product inquiry message
 */
export function formatProductInquiryMessage(product: Product): string {
  return [
    `👋 Hi Fleex Garments team,`,
    `I have a question about the *${product.name}* (Ref: ${product.id}, $${product.price}).`,
    `Could you tell me more about sizing recommendation, fabric care, and delivery timeframes?`
  ].join('\n');
}

/**
 * Formats general customer support inquiry
 */
export function formatSupportMessage(topic: string, details?: string): string {
  return [
    `👋 Hi Fleex Garments Customer Care,`,
    `I am reaching out regarding: *${topic}*.`,
    details ? `\nDetails: ${details}` : '',
    `\nLooking forward to your assistance!`
  ].filter(Boolean).join('\n');
}
