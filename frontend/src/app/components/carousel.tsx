export default function Carousel() {

return (
    <>
    <div className="overflow-hidden whitespace-nowrap bg-[#FFC8DD] text-[#fff] py-8 text-xl tracking-wide">
      <div className="inline-block animate-loop-scroll">
        {[...Array(10)].map((announcement, index) => {
            return (
                <span key={index} className="mx-[150px] tracking-wider font-bold"> İlk Siparişe Özel "DUNDER10" Kodu ile %10 İndirim! Şimdi Alışverişe Başla! </span>
            )
        })}
        </div>
    </div>
    </>
);
}
