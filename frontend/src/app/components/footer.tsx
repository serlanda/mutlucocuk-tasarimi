import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FFC8DD] py-6 mt-6 w-full text-gray-700">
      <div className="flex items-center justify-evenly">
        <SignedOut>
          <div className="flex min-h-[150px] flex-col gap-2">
            <h3 className="mb-2 text-xs font-bold tracking-widest">HESABIM</h3>
            <p>
              <SignInButton>Giriş Yap</SignInButton>
            </p>
            <p>
              <SignUpButton>Kayıt Ol</SignUpButton>
            </p>
          </div>
        </SignedOut>
        <div className="flex min-h-[150px] flex-col gap-2">
          <h3 className="mb-2 text-xs font-bold tracking-widest">
            ÖNEMLİ BAĞLANTILAR
          </h3>
          <p>Gizlilik ve Güvenlik Politikası</p>
          <p>Mesafeli Satış Sözleşmesi</p>
          <p>Kişisel Veriler Politikası</p>
          <p>Tüketici Hakları Cayma İptal İade Koşulları</p>
        </div>
        <div className="flex min-h-[150px] flex-col gap-2">
          <h3 className="mb-2 text-xs font-bold tracking-widest">İLETİŞİM</h3>
          <p>E-posta: admin@mutlucocuk.com</p>
          <p>Telefon: +90 552 228 20 88</p>
          <p>Showroom: Merdivenköy, Günaydın sokak no:17 Kadıköy/İstanbul</p>
        </div>
        <Link href="/" className="">
          <Image
            src="https://utfs.io/f/45734ede-2888-4590-9b27-aedd1929e016-2hrqaw.jpg"
            className="rounded-full"
            width={125}
            height={125}
            alt="mutlucocuk tarasimi"
          ></Image>
        </Link>
      </div>
      <div className="flex flex-col text-xs tracking-widest relative top-4 p-1">
      <span>© 2024, MutluCocuk. Tüm hakları saklıdır.</span>
      </div>
    </footer>
  );
}
