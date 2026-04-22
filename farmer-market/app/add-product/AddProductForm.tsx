"use client";

import type { ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { createProductAction } from "@/app/add-product/actions";
import {
  PRODUCT_CATEGORY_OPTIONS,
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

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        resolve(fileReader.result);
        return;
      }

      reject(new Error(PRODUCT_FORM_MESSAGES.imageProcessingFailed));
    };

    fileReader.onerror = () => {
      reject(new Error(PRODUCT_FORM_MESSAGES.imageProcessingFailed));
    };

    fileReader.readAsDataURL(file);
  });
}

function loadImageSource(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(PRODUCT_FORM_MESSAGES.imageProcessingFailed));
    image.src = src;
  });
}

function getScaledDimensions(width: number, height: number) {
  const longestSide = Math.max(width, height);

  if (longestSide <= PRODUCT_FORM_LIMITS.imageMaxDimension) {
    return { width, height };
  }

  const scale = PRODUCT_FORM_LIMITS.imageMaxDimension / longestSide;

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

async function prepareProductImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error(PRODUCT_FORM_MESSAGES.imageInvalid);
  }

  if (file.size > PRODUCT_FORM_LIMITS.imageUploadMaxBytes) {
    throw new Error(PRODUCT_FORM_MESSAGES.imageTooLarge);
  }

  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImageSource(dataUrl);
  const { width, height } = getScaledDimensions(image.width, image.height);
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error(PRODUCT_FORM_MESSAGES.imageProcessingFailed);
  }

  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", PRODUCT_FORM_LIMITS.imageUploadQuality);
}

export default function AddProductForm() {
  const router = useRouter();
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const [serverError, setServerError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isPreparingImage, setIsPreparingImage] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: PRODUCT_FORM_DEFAULT_VALUES,
  });

  async function onSubmit(form: ProductFormValues) {
    setServerError("");

    try {
      const result = await createProductAction(form);

      if (!result.success) {
        throw new Error(result.error || PRODUCT_FORM_MESSAGES.submitFailed);
      }

      reset(PRODUCT_FORM_DEFAULT_VALUES);
      setImagePreview("");
      router.push("/?status=product-added");
    } catch (submitError) {
      setServerError(getProductSubmitErrorMessage(submitError));
    }
  }

  async function handleImageSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setServerError("");
    setIsPreparingImage(true);

    try {
      const preparedImage = await prepareProductImage(file);

      setValue("image", preparedImage, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      clearErrors("image");
      setImagePreview(preparedImage);
    } catch (imageError) {
      const message = getProductSubmitErrorMessage(imageError);

      setValue("image", "", {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setImagePreview("");
      setError("image", {
        type: "validate",
        message,
      });
    } finally {
      event.target.value = "";
      setIsPreparingImage(false);
    }
  }

  function clearSelectedImage() {
    setValue("image", "", {
      shouldDirty: true,
      shouldTouch: true,
    });
    clearErrors("image");
    setImagePreview("");
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
          <select
            {...register("category", {
              required: PRODUCT_FORM_MESSAGES.categoryRequired,
            })}
            className={PRODUCT_FORM_STYLES.select}
          >
            <option value="">{PRODUCT_FORM_PLACEHOLDERS.category}</option>
            {PRODUCT_CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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
        <div className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Choose From Device
            </button>
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              Take Photo
            </button>
            {imagePreview ? (
              <button
                type="button"
                onClick={clearSelectedImage}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Remove Photo
              </button>
            ) : null}
          </div>

          <p className="text-sm leading-6 text-slate-500">
            Upload a photo from your phone, computer, or open the camera directly on
            supported mobile devices.
          </p>

          <input
            type="hidden"
            {...register("image", {
              required: PRODUCT_FORM_MESSAGES.imageRequired,
              validate: (value) =>
                value.startsWith("data:image/") || PRODUCT_FORM_MESSAGES.imageRequired,
            })}
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelection}
            className="sr-only"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageSelection}
            className="sr-only"
          />

          <div className="overflow-hidden rounded-[1.25rem] border border-dashed border-slate-300 bg-white">
            {imagePreview ? (
              <div className="relative aspect-[4/3]">
                <Image
                  src={imagePreview}
                  alt="Selected product preview"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center px-4 text-center text-sm leading-6 text-slate-500">
                Your selected product photo will appear here before you post it.
              </div>
            )}
          </div>

          {isPreparingImage ? (
            <p className="text-sm text-emerald-700">
              {PRODUCT_FORM_MESSAGES.imageProcessing}
            </p>
          ) : null}
        </div>
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

      {serverError ? (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting || isPreparingImage}
        className={PRODUCT_FORM_STYLES.submitButton}
      >
        {isPreparingImage
          ? PRODUCT_FORM_MESSAGES.imageProcessing
          : isSubmitting
            ? PRODUCT_FORM_LABELS.submitting
            : PRODUCT_FORM_LABELS.submit}
      </button>
    </form>
  );
}
