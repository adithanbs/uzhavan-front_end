export type ProductFormValues = {
  name: string;
  category: string;
  price: string;
  quantity: string;
  location: string;
  phone: string;
  image: string;
  description: string;
};

export const PRODUCT_FORM_DEFAULT_VALUES: ProductFormValues = {
  name: "",
  category: "",
  price: "",
  quantity: "",
  location: "",
  phone: "",
  image: "",
  description: "",
};

export const PRODUCT_FORM_LIMITS = {
  name: 80,
  category: 40,
  quantity: 40,
  location: 60,
  description: 400,
  phoneDigits: 10,
} as const;

export const PRODUCT_FORM_PATTERNS = {
  phone: /^\d{10}$/,
  internalImagePath: /^$|^\/.+/,
} as const;

export const PRODUCT_FORM_LABELS = {
  name: "Product name",
  category: "Category",
  price: "Price",
  quantity: "Quantity details",
  location: "Location",
  phone: "Phone",
  image: "Image URL",
  description: "Description",
  submit: "Post Product",
  submitting: "Posting...",
} as const;

export const PRODUCT_FORM_PLACEHOLDERS = {
  name: "Product name",
  category: "Category",
  price: "Price",
  quantity: "Quantity details",
  location: "Location",
  phone: "10-digit phone number",
  image: "Image URL (optional)",
  description: "Description",
} as const;

export const PRODUCT_FORM_MESSAGES = {
  nameRequired: "Product name is required.",
  nameMax: `Product name must be ${PRODUCT_FORM_LIMITS.name} characters or less.`,
  categoryRequired: "Category is required.",
  categoryMax: `Category must be ${PRODUCT_FORM_LIMITS.category} characters or less.`,
  priceRequired: "Price is required.",
  priceInvalid: "Enter a valid price greater than 0.",
  quantityRequired: "Quantity details are required.",
  quantityMax: `Quantity details must be ${PRODUCT_FORM_LIMITS.quantity} characters or less.`,
  locationRequired: "Location is required.",
  locationMax: `Location must be ${PRODUCT_FORM_LIMITS.location} characters or less.`,
  phoneRequired: "Phone number is required.",
  phoneInvalid: `Enter a valid ${PRODUCT_FORM_LIMITS.phoneDigits}-digit phone number.`,
  imageInvalid: "Use an internal image path starting with /.",
  descriptionMax: `Description must be ${PRODUCT_FORM_LIMITS.description} characters or less.`,
  submitFailed: "Unable to save product.",
  submitUnknown: "Something went wrong while posting the product.",
} as const;

export const PRODUCT_FORM_STYLES = {
  field:
    "min-h-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-emerald-600",
  textarea:
    "rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-emerald-600",
  error: "text-sm text-red-700",
  submitButton:
    "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400 sm:w-auto",
} as const;
