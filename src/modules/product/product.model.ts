export interface ProductInput {
    id?: number;
    name: string;
    description: string;
    priceNet: number;
    priceGross: number;
    categoryId: number;
    brandId: number;
    supplierId: number;
    userId: number;
    attributesValue: [
        {
            attributeId: number;
            value: string;
            description: string;
        }
    ]
}