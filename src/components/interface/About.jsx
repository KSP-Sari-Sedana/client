import { CandleArt } from "../art/CandleArt";

function About() {
  return (
    <div id="about">
      <div className="flex items-center justify-center">
        <CandleArt />
      </div>
      <p className="mt-5 text-center">
        Melalui pelayanan <span className="font-bold">PRIMA</span> untuk peningkatan kesejahteraan anggota dan masyarakat
      </p>
      <ol className="relative border-l border-zinc-300 w-2/6 mx-auto mt-7 text-sm">
        <li className="mb-5 ml-4">
          <div className="absolute w-3 h-3 bg-bossanova-900 rounded-full mt-1.5 -left-1.5"></div>
          <time className="mb-1 font-normal leading-none text-gray-400 font-sourcecodepro">10 April 2002</time>
          <div className="flex">
            <p className="text-justify">Didirikan oleh 21 anggota yang bernama Koperasi Kerajinan Sari Sedana</p>
          </div>
        </li>
        <li className="mb-5 ml-4">
          <div className="absolute w-3 h-3 bg-bossanova-900 rounded-full mt-1.5 -left-1.5"></div>
          <time className="mb-1 font-normal leading-none text-gray-400 font-sourcecodepro">16 September 2002</time>
          <div className="flex">
            <p className="text-justify">Pengesahan Badan Hukum Koperasi (BHK) Kopinkra Sari Sedana Nomor:20/BH/KKPUKM/IX/2002</p>
          </div>
        </li>
        <li className="mb-5 ml-4">
          <div className="absolute w-3 h-3 bg-bossanova-900 rounded-full mt-1.5 -left-1.5"></div>
          <time className="mb-1 font-normal leading-none text-gray-400 font-sourcecodepro">20 Oktober 2015</time>
          <div className="flex">
            <p className="text-justify">Badan Hukum 34/BH/PAD/XXVII.6/X/2015 dengan nama KOPERASI SARI SEDANA</p>
          </div>
        </li>
        <li className=" ml-4">
          <div className="absolute w-3 h-3 bg-bossanova-900 rounded-full mt-1.5 -left-1.5"></div>
          <div className="absolute w-3 h-3 bg-bossanova-900 rounded-full mt-1.5 -left-1.5 animate-ping"></div>
          <time className="mb-1 font-normal leading-none text-gray-400 font-sourcecodepro">24 Juli 2021</time>
          <div className="flex">
            <p className="text-justify">Badan Hukum AHU-0002642.AH.01.27.TAHUN 2021 dengan nama KSP Sari Sedana</p>
          </div>
        </li>
      </ol>
    </div>
  );
}

export { About };
