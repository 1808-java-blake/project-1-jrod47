export class Reimbursement {
    id = 0;
    amount = 0;
    status = 'Pending';
    type = '';
    description = '';
    submitted = '';
    author = 0;
    resolved = '';
    resolver = 0;

  
    constructor(id?: number, amount?: number, status?: string, type?: string, description?: string, submitted?: string, author?: number, resolved?: string, resolver?: number) {
      id && (this.id = id);
      amount && (this.amount = amount);
      status && (this.status = status);
      type && (this.type = type);
      description && (this.description = description);
      submitted && (this.submitted = submitted);
      author && (this.author = author);
      resolved && (this.resolved = resolved);
      resolver && (this.resolver = resolver);
    }
  }