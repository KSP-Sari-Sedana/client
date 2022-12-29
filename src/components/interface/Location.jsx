function Location() {
  return (
    <div>
      <div className="grid grid-cols-3 mx-20">
        <div>
          <img src="/assets/placeholder.svg" alt="" className="mx-auto w-52" />
          <p className="text-xl font-bold text-center mt-3">Cabang Rendang</p>
          <p className="text-center text-sm text-slate-600">
            Jl. Gunung Guning No. 69, Singarata <br /> Rendang, Karangasem, Bali 80863
          </p>
        </div>
        <div>
          <img src="/assets/placeholder.svg" alt="" className="mx-auto w-60" />
          <p className="text-2xl font-bold text-center mt-3">Kantor Pusat Selat</p>
          <p className="text-center text-slate-600">
            Pering Sari, Kec. Selat, Kabupaten <br /> Karangasem, Bali 80862
          </p>
        </div>
        <div>
          <img src="/assets/placeholder.svg" alt="" className="mx-auto w-52" />
          <p className="text-xl font-bold text-center mt-3">Cabang Karangasem</p>
          <p className="text-center text-sm text-slate-600">
            Jl. Veteran, Padang Kerta, Karangasem, <br />
            Bali 80811
          </p>
        </div>
      </div>
    </div>
  );
}

export { Location };
