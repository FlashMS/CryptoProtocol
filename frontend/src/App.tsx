import DepositView from "./components/DepositView";
import WithdrawalView from "./components/WithdrawalView";

export default function App() {
  return (
    <div>
      <h1>PrivateMix</h1>
      <DepositView />
      <WithdrawalView />
    </div>
  );
}
