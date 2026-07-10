import { DEMO_SHELF, type Product } from "./ingredients";

export const PRODUCT_CATALOG: Product[] = [
  ...DEMO_SHELF,
  { id: "c1", name: "Low pH Good Morning Gel Cleanser", brand: "COSRX", category: "cleanser", ingredientIds: [] },
  { id: "c2", name: "Dear, Klairs Freshly Juiced Vitamin Drop", brand: "Klairs", category: "serum", ingredientIds: ["vitamin_c"] },
  { id: "c3", name: "Niacinamide 10% + Zinc 1%", brand: "The Ordinary", category: "serum", ingredientIds: ["niacinamide"] },
  { id: "c4", name: "Madecassoside Cream", brand: "Dr. Jart+", category: "moisturizer", ingredientIds: ["centella", "ceramides"] },
  { id: "c5", name: "Copper Peptide Serum", brand: "Torriden", category: "serum", ingredientIds: ["peptides"] },
  { id: "c6", name: "Hyaluronic Acid Toner", brand: "Torriden", category: "toner", ingredientIds: ["hyaluronic_acid"] },
  { id: "c7", name: "Retinal 0.1% Micro-Encapsulated", brand: "Medicube", category: "serum", ingredientIds: ["retinol"] },
  { id: "c8", name: "Eye Cream with Peptides", brand: "Isntree", category: "eye", ingredientIds: ["peptides", "hyaluronic_acid"] },
  { id: "c9", name: "Facial Oil — Squalane", brand: "Purito", category: "oil", ingredientIds: [] },
  { id: "c10", name: "Mugwort Cleansing Balm", brand: "Anua", category: "cleanser", ingredientIds: ["centella"] },
  { id: "c11", name: "Aestura Atobarrier 365 Cream", brand: "Aestura", category: "moisturizer", ingredientIds: ["ceramides"] },
  { id: "c12", name: "Salicylic Acid Daily Gentle Cleanser", brand: "COSRX", category: "cleanser", ingredientIds: ["bha"] },
];

export function findProduct(id: string): Product | undefined {
  return PRODUCT_CATALOG.find((p) => p.id === id);
}
