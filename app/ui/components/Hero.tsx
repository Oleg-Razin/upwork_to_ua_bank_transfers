import Image from "next/image";
import Container from "./Container";
import Section from "./Section";

const Hero = () => {
  return (
    <Section padding="lg" className="max-md:bg-black">
      <Container>
        <div className="flex gap-5 md:gap-6 flex-col md:flex-row md:items-center md:justify-between md:py-10 md:px-10 md:bg-black">
          <div className="md:w-6/12 space-y-4">
            <h1 className="text-h1-mob md:text-h1 font-mono font-bold text-white">
              Калькулятор для виводу коштів з{" "}
              <span className="text-green-400/80">Upwork</span> в Україну
            </h1>
            <p className="mt-4 text-h3-mob md:text-h3 font-sans text-zinc-200">
              Вираховуйте найвигідніший спосіб виводу коштів з Upwork.
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li className="text-lg-mob md:text-lg font-sans text-zinc-300 list-disc list-inside">
                Розрахунок з урахуванням комісій Upwork
              </li>
              <li className="text-lg-mob md:text-lg font-sans text-zinc-300 list-disc list-inside">
                Порівняння курсів ПриватБанку та Монобанку
              </li>
              <li className="text-lg-mob md:text-lg font-sans text-zinc-300 list-disc list-inside">
                Вираховуйте податок на доходи фізичних осіб (ПДФО) та військовий
                збір
              </li>
            </ul>
          </div>
          <div className="md:w-4/12">
            <div className="bg-white overflow-hidden flex items-center justify-center">
              <Image
                src="/hero.jpg"
                alt="Hero Image"
                width={400}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
