import ReferralForm from "./components/ReferralForm"
import ReferralTableList from "./components/ReferralTableList";

function App() {
  return (
    <div className="xl:container xl:mx-auto p-2 lg:min-h-screen flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xl:gap-8 w-full items-center">
        <ReferralForm />
        <ReferralTableList />
      </div>
    </div>
  )
}

export default App
