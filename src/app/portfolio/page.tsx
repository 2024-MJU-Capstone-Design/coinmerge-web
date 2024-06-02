import AssetSection from "./components/AssetSection";
import BalanceFlowSection from "./components/BalanceFlowSection";

const Portfolio = () => {
  return (
    <div className="flex flex-col gap-5">
      <BalanceFlowSection />
      <AssetSection />
    </div>
  );
};

export default Portfolio;
