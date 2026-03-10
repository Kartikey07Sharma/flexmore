export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  quantity: string;
  message: string;
  createdAt: string;
}

// In-memory store for demo
let inquiriesStore: Inquiry[] = [
  {
    id: "1", name: "Rajesh Kumar", email: "rajesh@textileco.com", phone: "+91 98765 43210",
    company: "Textile Co. Ltd", product: "Premium Round Elastic Cord", quantity: "2000 kg",
    message: "We need bulk elastic cords for our garment factory. Please share pricing.", createdAt: "2024-12-20",
  },
  {
    id: "2", name: "Sarah Johnson", email: "sarah@globalwear.com", phone: "+1 555 0123",
    company: "Global Wear Inc", product: "Flat Braided Elastic", quantity: "5000 kg",
    message: "Looking for a reliable supplier for flat elastic bands. Need samples first.", createdAt: "2024-12-18",
  },
];

export const getInquiries = () => [...inquiriesStore];
export const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => {
  const newInquiry: Inquiry = {
    ...inquiry,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
  };
  inquiriesStore = [newInquiry, ...inquiriesStore];
  return newInquiry;
};
