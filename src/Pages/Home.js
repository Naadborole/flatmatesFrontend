import Card from '../Shared/Cards/Card';
import Filters from "../Components/Home/Filters";
import "../Shared/Cards/patternCss.css"

const cardData = {
    firstname: "Naad",
    lastname : "Borole",
    age: 21,
    gender: "Male",
    Institution: "Pune Institute of Computer Technology",
    profession: "Student",
    area: "Bibwewadi",
    city: "Pune",
    rent: 15000,
    vacancy: 2
  }
export default function Home() {
  return (
    <div>
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header> */}
      <main className="bg-transparent">
        <div className="w-full py-6 mt-5 px-5 flex flex-row">
          <div className="realtive sm:w-8/12 w-full">
            <Card {...cardData}></Card>
            <Card {...cardData}></Card>
            <Card {...cardData}></Card>
            <Card {...cardData}></Card>
          </div>
          <div className="relative w-full sm:w-4/12 ml-5">
            <Filters></Filters>
          </div>
        </div>
      </main>
    </div>
  );
}
