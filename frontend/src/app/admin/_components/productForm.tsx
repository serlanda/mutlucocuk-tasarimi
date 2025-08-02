"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { addProduct } from "../_actions/products";
import { PlusIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import FormField from "./FormField";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import ImageUploadField from "./ImageUploadField";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Ürün adı gereklidir";
    } else if (formData.name.length < 2) {
      newErrors.name = "Ürün adı en az 2 karakter olmalıdır";
    }
    
    if (!formData.price) {
      newErrors.price = "Fiyat gereklidir";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Geçerli bir fiyat girin";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Açıklama gereklidir";
    } else if (formData.description.length < 10) {
      newErrors.description = "Açıklama en az 10 karakter olmalıdır";
    }
    
    if (!formData.image.trim()) {
      newErrors.image = "Ürün görseli gereklidir";
    } else {
      try {
        new URL(formData.image);
      } catch {
        newErrors.image = "Geçerli bir URL girin";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    setSuccess(false);
  };

  const handleSubmit = async (formDataObj: FormData) => {
    // Client-side validation
    if (!validateForm()) {
      return;
    }

    try {
      const result = await addProduct(formDataObj);
      
      if (!result) {
        // Success - form was submitted and redirected
        setSuccess(true);
        setFormData({ name: "", price: "", description: "", image: "" });
        setErrors({});
      } else {
        // Validation errors from server
        setErrors(result);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <PlusIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-900">Yeni Ürün Ekle</h2>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">Ürün başarıyla eklendi!</p>
          </div>
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        <FormField
          label="Ürün Adı"
          htmlFor="name"
          required
          error={errors.name}
          helpText="Ürününüzün açıklayıcı bir adını girin"
        >
          <FormInput
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Örn: Çocuk Eğitici Oyuncak Seti"
            error={!!errors.name}
            maxLength={100}
          />
        </FormField>

        <FormField
          label="Fiyat (TL)"
          htmlFor="price"
          required
          error={errors.price}
          helpText="Ürününüzün satış fiyatını TL cinsinden girin"
        >
          <FormInput
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            placeholder="Örn: 149"
            error={!!errors.price}
            min="0"
            step="0.01"
          />
        </FormField>

        <FormField
          label="Ürün Açıklaması"
          htmlFor="description"
          required
          error={errors.description}
          helpText="Ürününüzün özelliklerini ve faydalarını detaylı olarak açıklayın"
        >
          <FormTextarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Ürününüzün özelliklerini, yaş grubunu, malzemesini ve eğitici yönlerini açıklayın..."
            error={!!errors.description}
            rows={4}
            maxLength={500}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.description.length}/500 karakter
          </div>
        </FormField>

        <FormField
          label="Ürün Görseli"
          htmlFor="image"
          required
          error={errors.image}
          helpText="Ürününüzün kaliteli bir fotoğrafını yükleyin veya URL'sini girin"
        >
          <ImageUploadField
            value={formData.image}
            onChange={(value) => handleInputChange("image", value)}
            error={!!errors.image}
            name="image"
          />
        </FormField>

        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {pending ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Ürün Ekleniyor...
        </>
      ) : (
        <>
          <PlusIcon className="w-5 h-5" />
          Ürünü Ekle
        </>
      )}
    </button>
  );
}