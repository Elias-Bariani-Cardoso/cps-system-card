import { Invoice } from '../entities/invoice.entity';
import { InvoiceStatus } from '../enums/invoice-status.enum';

export class InvoiceStatusService {
  static shouldBeMarkedAsOverdue(invoice: Invoice, today: Date = new Date()): boolean {
    return invoice.isOverdue(today);
  }

  static markAsOverdue(invoice: Invoice, today: Date = new Date()): void {
    if (this.shouldBeMarkedAsOverdue(invoice, today)) {
      invoice.status = InvoiceStatus.VENCIDA;
    }
  }

  static markAsPaid(invoice: Invoice): void {
    if (invoice.status === InvoiceStatus.CANCELADA) {
      throw new Error('Não é possível pagar uma fatura cancelada');
    }

    invoice.status = InvoiceStatus.PAGA;
  }

  static cancel(invoice: Invoice): void {
    if (invoice.status === InvoiceStatus.PAGA) {
      throw new Error('Não é possível cancelar uma fatura já paga');
    }

    invoice.status = InvoiceStatus.CANCELADA;
  }
}
