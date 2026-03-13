"use client";
import { Product } from "@/types";
import { categories, inputs } from "@/utils/constants";
import { FC, FormEvent } from "react";
import Field from "./field";
import ImagePreview from "./image-preview";
import { createProduct, updateProduct } from "@/utils/service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  product: Product | null;
}

const ProductForm: FC<Props> = ({ product }) => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // form datası oluştur
    const formData = new FormData(e.currentTarget);
    const productData: any = Object.fromEntries(formData.entries());

    // sayısal değerleri tipine uygun hale getir
    productData.price = Number(productData.price);
    productData.stock = Number(productData.stock);
    productData.rating = Number(productData.rating);
    productData.reviews_count = Number(productData.reviews_count);

    try {
      if (product) {
        // güncelleme
        await updateProduct(product.id, productData as Partial<Product>);
        toast.success("Ürün başarıyla güncellendi");
      } else {
        // oluşturma
        await createProduct(productData as unknown as Omit<Product, "id">);
        toast.success("Ürün başarıyla oluşturuldu");
      }

      // ürünler sayfasına yönlendir
      router.push("/products");
      router.refresh();
    } catch (error) {
      toast.error("İşlem başarısız oldu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sol Sütun */}
        <div className="space-y-6">
          {inputs.map((input, key) => (
            <Field key={key} htmlFor={input.name} label={input.label}>
              <input
                id={input.name}
                name={input.name}
                type={input.type}
                className="input"
                required
                defaultValue={product?.[input.name as keyof Product] || ""}
              />
            </Field>
          ))}

          {/* Kategori Inputu */}
          <Field htmlFor="category" label="Kategori">
            <select
              name="category"
              id="category"
              className="input"
              required
              defaultValue={product?.category}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Sağ Sütun */}
        <div className="space-y-6">
          {/* Resim Inputu */}
          <Field htmlFor="image_url" label="Resim URL">
            <input
              type="text"
              name="image_url"
              id="image_url"
              className="input"
              required
              defaultValue={product?.image_url}
            />
          </Field>

          <ImagePreview initialValue={product?.image_url} />

          {/* Açıklama Inputu*/}
          <Field htmlFor="description" label="Açıklama">
            <textarea
              name="description"
              id="description"
              className="input sm:text-sm md:min-h-[220px]"
              required
              defaultValue={product?.description}
              rows={5}
            ></textarea>
          </Field>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-6 py-2 rounded-md text-white transition-colors bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed"
        >
          {product ? "Güncelle" : "Oluştur"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
