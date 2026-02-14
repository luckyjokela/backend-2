import { Id } from './variableObjects/IdGenerator';
import { Username, Name, MiddleName, Surname } from './variableObjects/UserBio';
import {
  ProductPrice,
  ProductName,
  ProductDescription,
  ProductImage,
  VendorName,
} from './variableObjects/ProductBio';

export class Product {
  constructor(
    private readonly id: Id,
    private readonly username: Username,
    private readonly clientName: Name,
    private readonly clientMiddleName: MiddleName,
    private readonly clientSurname: Surname,
    private readonly vendorName: VendorName,
    private readonly name: ProductName,
    private readonly description: ProductDescription,
    private readonly price: ProductPrice,
    private readonly image: ProductImage,
  ) {}

  getId(): Id {
    return this.id;
  }

  getIdValue(): string {
    return this.id.getValue();
  }

  getVendorName(): VendorName {
    return this.vendorName;
  }

  getVendorNameValue(): string {
    return this.vendorName.getValue();
  }

  getClientUsername(): Username {
    return this.username;
  }

  getClientUsernameValue(): string {
    return this.username.getValue();
  }

  getClientName(): Name {
    return this.clientName;
  }

  getClientNameValue(): string {
    return this.clientName.getValue();
  }

  getClientMiddleName(): MiddleName {
    return this.clientMiddleName;
  }

  getClientMiddleNameValue(): string {
    return this.clientMiddleName.getValue();
  }

  getClientSurname(): Surname {
    return this.clientSurname;
  }

  getClientSurnameValue(): string {
    return this.clientSurname.getValue();
  }

  getProductName(): ProductName {
    return this.name;
  }

  getProductNameValue(): string {
    return this.name.getValue();
  }

  getProductDescription(): ProductDescription {
    return this.description;
  }

  getProductDescriptionValue(): string {
    return this.description.getValue();
  }

  getProductPrice(): ProductPrice {
    return this.price;
  }

  getProductPriceValue(): number {
    return this.price.getValue();
  }

  getProductImage(): ProductImage {
    return this.image;
  }

  getProductImageView(): string {
    return this.image.getValue();
  }
}
