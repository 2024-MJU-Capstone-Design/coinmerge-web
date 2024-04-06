import AssetSection from "./components/AssetSection";
import PortfolioPieGraph from "./components/AssetSection/PortfolioPieGraph";
import BalanceFlowSection from "./components/BalanceFlowSection";
import ProfitLineGraph from "./components/BalanceFlowSection/ProfitLineGraph";

const Portfolio = () => {
  return (
    <div className="flex flex-col gap-5">
      <BalanceFlowSection />
      <AssetSection />
    </div>
  );
};

export default Portfolio;
