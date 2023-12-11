import { SearchBar } from "@/components/01-atoms";
import { SwappingShelfs } from "@/components/03-organisms";
import { SwapStation } from "@/components/02-molecules";

export const SwapSection = () => {
  return (
    <div className="xl:w-[1000px] w-full flex flex-col justify-center space-y-6 xl:flex-row xl:space-x-6 xl:space-y-0 mb-16">
      <section className="lg:w-[615px] w-full h-full flex flex-col items-center space-y-6 lg:mx-auto">
        <SearchBar />
        <SwappingShelfs />
      </section>
      <SwapStation />
    </div>
  );
};
