import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import CreatePool from "./component/CreatePool";
import Unstake from "./component/Unstake";
import ClaimRewards from "./component/ClaimRewards";
// import StakingPoolsComp from "./component/StakingPoolsComp";

configureWeb3Modal();

function App() {

  return (
          
    <div>
      <Header />
          <main className="flex">
          <div><CreatePool /></div>
          <div className="px-4"><Unstake /></div>
          <div className="px-4"><ClaimRewards /></div>
          {/* <StakingPoolsComp/> */}
          </main>   
       
    </div>
      
  );
}

export default App;

