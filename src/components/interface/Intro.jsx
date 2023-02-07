import { HappyCreditCardArt } from "../art/HappyCreditCardArt";

function Intro() {
  return (
    <div>
      <div>
        <div>
          <p className="font-darkergrotesque text-center text-6xl font-bold mt-40">
            <span className="tracking-tight">
              Koperasi Simpan Pinjam <br /> dengan Pelayanan
            </span>
            <span className="font-black tracking-tight"> PRIMA.</span>
          </p>
        </div>
        <div className="flex items-center justify-center mt-10">
          <HappyCreditCardArt />
        </div>
      </div>
    </div>
  );
}

export { Intro };
