import { Id } from './variableObjects/IdGenerator';
import { Username, Name, MiddleName, Surname } from './variableObjects/UserBio';
import { ProductName, ProductDescription } from './variableObjects/ProductBio';

export class Product {
  constructor(
    private readonly id: Id,
    private readonly ClientUsername: Username,
    private readonly ClientName: Name,
    private readonly ClientMiddleName: MiddleName,
    private readonly ClientSurname: Surname,
    private readonly ProductName: ProductName,
    private readonly ProductDescription: ProductDescription,
  ) {}
  getId(): Id {
    return this.id;
  }
  getIdValue(): string {
    return this.id.getValue();
  }
  getClientUsername(): Username {
    return this.ClientUsername;
  }
  getClientUsernameValue(): string {
    return this.ClientUsername.getValue();
  }
  getClientName(): Name {
    return this.ClientName;
  }
  getClientNameValue(): string {
    return this.ClientName.getValue();
  }
  getClientMiddleName(): MiddleName {
    return this.ClientMiddleName;
  }
  getClientMiddleNameValue(): string {
    return this.ClientMiddleName.getValue();
  }
  getClientSurname(): Surname {
    return this.ClientSurname;
  }
  getClientSurnameValue(): string {
    return this.ClientSurname.getValue();
  }
  getProductName(): ProductName {
    return this.ProductName;
  }
  getProductNameValue(): string {
    return this.ProductName.getValue();
  }
  getProductDescription(): ProductDescription {
    return this.ProductDescription;
  }
  getProductDescriptionValue(): string {
    return this.ProductDescription.getValue();
  }
}
