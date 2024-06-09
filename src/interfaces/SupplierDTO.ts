export interface SupplierDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  image: {
    file: {
      buffer: any | null;
      mimetype: any | null;
    }
    fileName: string | null;
  };
}