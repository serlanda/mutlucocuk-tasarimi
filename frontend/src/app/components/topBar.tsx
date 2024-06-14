export default function TopBar() {
  return (
    <div className=" hidden items-center justify-between bg-[#fff] py-2 text-[15px] lg:flex">
      <div className="flex gap-5 ml-4">
        <a
          href="https://www.instagram.com/mutlucocuk_tasarimi/?hl=tr"
          target="_blank"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            className="h-6 w-6 transition-colors hover:text-gray-600"
            viewBox="0 0 24 24"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a href="https://api.whatsapp.com/send?phone=905526428452" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-6 w-6 transition-colors hover:text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
        </a>
      </div>
      <div className="tracking-widest font-bold text-[#FFAFCC]">
        Hızlı Teslimat ve 400₺ Üzeri Ücretsiz Kargo
      </div>
      <div className="mr-4">Türkçe</div>
    </div>
  );
}
