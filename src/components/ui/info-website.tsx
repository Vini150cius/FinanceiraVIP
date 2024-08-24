import Image from "next/image";

import cta_image from "../../assets/icon/LogoFinanceiraVIP_Logo-fundo escuro.svg";
import SectionWrapper from "./section-wrapper";
import NavLink from "./nav-link";

const InfoSite = () => {
  return (
    <SectionWrapper className="overflow-hidden">
      <div className="custom-screen flex flex-col-reverse gap-x-12 justify-between md:flex-row md:items-center">
        <div className="flex-none max-w-xl mt-12 space-y-3 md:mt-0">
          <h2 className="text-gray-800 dark:text-gray-400 text-3xl font-semibold sm:text-4xl">
            Introdução básica sobre o projeto da FinanceiraVIP
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Projeto sobre uma agência que empresta quantias, adicionam o
            contrato no sistema e visualizam todos os contratos ativos.
          </p>
          <div className="pt-1">
            <NavLink
              href="/about"
              className="inline-flex items-center gap-x-2 font-medium text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 "
            >
              Mais sobre
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </NavLink>
          </div>
        </div>
        <div className="flex-none w-full md:max-w-xl">
          <Image
            src={cta_image}
            alt="chart"
            className="w-500 shadow-lg rounded-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default InfoSite;
