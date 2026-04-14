"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createProductAction } from "@/app/add-product/actions";
import {
  PRODUCT_FORM_DEFAULT_VALUES,
  PRODUCT_FORM_LABELS,
  PRODUCT_FORM_LIMITS,
  PRODUCT_FORM_MESSAGES,
  PRODUCT_FORM_PATTERNS,
  PRODUCT_FORM_PLACEHOLDERS,
  PRODUCT_FORM_STYLES,
  type ProductFormValues,
} from "@/app/add-product/constants";
import {
  getProductSubmitErrorMessage,
  validatePositivePrice,
} from "@/app/add-product/utils";

export default function AddProductForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: PRODUCT_FORM_DEFAULT_VALUES,
  });

  async function onSubmit(form: ProductFormValues) {
    setError("");

    try {
      const result = await createProductAction(form);

      if (!result.success) {
        throw new Error(result.error || PRODUCT_FORM_MESSAGES.submitFailed);
      }

      reset(PRODUCT_FORM_DEFAULT_VALUES);
      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(getProductSubmitErrorMessage(submitError));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4 sm:gap-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">
            {PRODUCT_FORM_LABELS.name}
          </span>
          <input
            {...register("name", {
              required: PRODUCT_FORM_MESSAGES.nameRequired,
              maxLength: {
                value: PRODUCT_FORM_LIMITS.name,
                message: PRODUCT_FORM_MESSAGES.nameMax,
              },
            })}
            placeholder={PRODUCT_FORM_PLACEHOLDERS.name}
            className={PRODUCT_FORM_STYLES.field}
          />
          {errors.name ? (
            <span className={PRODUCT_FORM_STYLES.error}>{errors.name.message}</span>
          ) : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">
            {PRODUCT_FORM_LABELS.category}
          </span>
          <input
            {...register("category", {
              required: PRODUCT_FORM_MESSAGES.categoryRequired,
              maxLength: {
                value: PRODUCT_FORM_LIMITS.category,
                message: PRODUCT_FORM_MESSAGES.categoryMax,
              },
            })}
            placeholder={PRODUCT_FORM_PLACEHOLDERS.category}
            className={PRODUCT_FORM_STYLES.field}
          />
          {errors.category ? (
            <span className={PRODUCT_FORM_STYLES.error}>{errors.category.message}</span>
          ) : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">
            {PRODUCT_FORM_LABELS.price}
          </span>
          <input
            {...register("price", {
              required: PRODUCT_FORM_MESSAGES.priceRequired,
              validate: validatePositivePrice,
            })}
            placeholder={PRODUCT_FORM_PLACEHOLDERS.price}
            inputMode="decimal"
            className={PRODUCT_FORM_STYLES.field}
          />
          {errors.price ? (
            <span className={PRODUCT_FORM_STYLES.error}>{errors.price.message}</span>
          ) : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">
            {PRODUCT_FORM_LABELS.quantity}
          </span>
          <input
            {...register("quantity", {
              required: PRODUCT_FORM_MESSAGES.quantityRequired,
              maxLength: {
                value: PRODUCT_FORM_LIMITS.quantity,
                message: PRODUCT_FORM_MESSAGES.quantityMax,
              },
            })}
            placeholder={PRODUCT_FORM_PLACEHOLDERS.quantity}
            className={PRODUCT_FORM_STYLES.field}
          />
          {errors.quantity ? (
            <span className={PRODUCT_FORM_STYLES.error}>{errors.quantity.message}</span>
          ) : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">
            {PRODUCT_FORM_LABELS.location}
          </span>
          <input
            {...register("location", {
              required: PRODUCT_FORM_MESSAGES.locationRequired,
              maxLength: {
                value: PRODUCT_FORM_LIMITS.location,
                message: PRODUCT_FORM_MESSAGES.locationMax,
              },
            })}
            placeholder={PRODUCT_FORM_PLACEHOLDERS.location}
            className={PRODUCT_FORM_STYLES.field}
          />
          {errors.location ? (
            <span className={PRODUCT_FORM_STYLES.error}>{errors.location.message}</span>
          ) : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">
            {PRODUCT_FORM_LABELS.phone}
          </span>
          <input
            {...register("phone", {
              required: PRODUCT_FORM_MESSAGES.phoneRequired,
              pattern: {
                value: PRODUCT_FORM_PATTERNS.phone,
                message: PRODUCT_FORM_MESSAGES.phoneInvalid,
              },
            })}
            placeholder={PRODUCT_FORM_PLACEHOLDERS.phone}
            inputMode="numeric"
            className={PRODUCT_FORM_STYLES.field}
          />
          {errors.phone ? (
            <span className={PRODUCT_FORM_STYLES.error}>{errors.phone.message}</span>
          ) : null}
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">
          {PRODUCT_FORM_LABELS.image}
        </span>
        <input
          {...register("image", {
            pattern: {
              value: PRODUCT_FORM_PATTERNS.internalImagePath,
              message: PRODUCT_FORM_MESSAGES.imageInvalid,
            },
          })}
          placeholder={PRODUCT_FORM_PLACEHOLDERS.image}
          className={PRODUCT_FORM_STYLES.field}
        />
        {errors.image ? (
          <span className={PRODUCT_FORM_STYLES.error}>{errors.image.message}</span>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">
          {PRODUCT_FORM_LABELS.description}
        </span>
        <textarea
          {...register("description", {
            maxLength: {
              value: PRODUCT_FORM_LIMITS.description,
              message: PRODUCT_FORM_MESSAGES.descriptionMax,
            },
          })}
          placeholder={PRODUCT_FORM_PLACEHOLDERS.description}
          rows={5}
          className={PRODUCT_FORM_STYLES.textarea}
        />
        {errors.description ? (
          <span className={PRODUCT_FORM_STYLES.error}>{errors.description.message}</span>
        ) : null}
      </label>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={PRODUCT_FORM_STYLES.submitButton}
      >
        {isSubmitting ? PRODUCT_FORM_LABELS.submitting : PRODUCT_FORM_LABELS.submit}
      </button>
    </form>
  );
}
