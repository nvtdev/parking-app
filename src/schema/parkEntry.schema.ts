import { object, string, TypeOf } from "zod";

const categories = ["A", "B", "C"],
  discountCards = ["SILVER", "GOLD", "PLATINUM"];

export const addParkEntrySchema = object({
  body: object({
    registrationNumber: string({
      required_error: "Registration number is required",
    }),
    category: string({
      required_error: "Category is required",
    }).refine((category) => categories.indexOf(category.toUpperCase()) > -1, {
      message: "Invalid category",
    }),
    discountCard: string()
      .refine(
        (discountCard) =>
          discountCards.indexOf(discountCard.toUpperCase()) > -1,
        {
          message: "Invalid discount card",
        }
      )
      .optional(),
  }),
});

export type addParkEntryType = TypeOf<typeof addParkEntrySchema>;
