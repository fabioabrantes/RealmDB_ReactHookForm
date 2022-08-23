export const OrderSchema = {
  name: "Order",
  properties: {
    _id: "string", // criamos esse _id com underline para ficar diferente do id criado automaticamente.
    patrimony: "string",
    equipment: "string",
    description: "string",
    status: "string",
    created_at: "date",
  },

  primaryKey: "_id",
};
