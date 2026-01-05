import "./App.css";

function App() {
  return (
    <div className="min-h-screen w-full">
      {/* TITLE */}
      <div className="flex justify-center items-center mt-8">
        <span className="h-1 w-7 bg-[#e8b417] mr-2"></span>
        <h1 className="text-[#EDC84B] font-mono text-[52px] tracking-[1.45px]">
          FAST REACT PIZZA CO.
        </h1>
        <span className="h-1 w-7 bg-[#e8b417] ml-2"></span>
      </div>

      {/* MENU HEADER */}
      <div className="flex flex-col items-center mt-16 gap-3">
        <span className="h-[3px] w-28 bg-[#252525]"></span>
        <h2 className="text-[24px] text-[#252525] tracking-wide">OUR MENU</h2>
        <span className="h-[3px] w-28 bg-[#252525]"></span>
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col items-center mt-8 text-[15px] font-mono text-[#252525]">
        <p>Authentic Italian cuisine. 6 creative dishes to choose from.</p>
        <p>All from our stone oven, all organic, all delicious.</p>
      </div>

      {/* MENU GRID */}
      <div className="mt-12 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {/* MENU ITEM */}
          {[
            {
              img: "focaccia.jpg",
              title: "Focaccia",
              desc: "Italian flatbread with olive oil and rosemary",
              price: "$6",
            },
            {
              img: "margherita.jpg",
              title: "Pizza Margherita",
              desc: "Tomato and mozzarella",
              price: "$8",
            },
            {
              img: "spinaci.jpg",
              title: "Pizza Spinaci",
              desc: "Tomato, mozzarella, spinach, ricotta",
              price: "$10",
            },
            {
              img: "funghi.jpg",
              title: "Pizza Funghi",
              desc: "Tomato, mozzarella, mushrooms, onion",
              price: "$10",
            },
            {
              img: "salamino.jpg",
              title: "Pizza Salamino",
              desc: "Tomato, mozzarella, pepperoni",
              price: "$12",
            },
            {
              img: "prosciutto.jpg",
              title: "Pizza Prosciutto",
              desc: "Tomato, mozzarella, ham, arugula, burrata",
              price: "$13",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-6">
              <img
                src={item.img}
                alt={item.title}
                className="h-[120px] w-[120px] object-cover"
              />

              <div className="flex-1 text-sm font-mono text-[#252525]">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold font-sans">
                    {item.title}
                  </h3>
                  <span className="font-semibold">{item.price}</span>
                </div>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="text-center mt-16 font-mono text-sm text-[#252525]">
        We're open from 12:00 to 22:00. Come visit us or order online.
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="
    bg-amber-300
    text-[#252525]
    font-mono
    text-sm
    px-6
    py-3
   
    hover:bg-amber-400
    transition-colors
    duration-200
    active:scale-95
  "
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default App;
