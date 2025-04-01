import { createContext, useContext, useState, useEffect } from "react";

const CardGameContext = createContext({ themeTest: "false", toggleOpenAndGuessCells: () => {} });

export const CardGameProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeTest, setTheme] = useState(() => {
    const getLocalStorage = localStorage.getItem("openAndGuessCellsForTesting");
    return getLocalStorage ? getLocalStorage : "false";
  });

  useEffect(() => {
    localStorage.setItem("openAndGuessCellsForTesting", themeTest);
    // document.body.className = themeTest;
  }, [themeTest]);

  const toggleOpenAndGuessCells = () => {
    console.log(themeTest);
    setTheme((prev) => (prev === "false" ? "true" : "false"));
  };

  return (
    <CardGameContext.Provider value={{ themeTest, toggleOpenAndGuessCells }}>
      {children}
    </CardGameContext.Provider>
  );
};

export const useCardGame = () => useContext(CardGameContext);

// import { createContext, useContext, useState, useEffect } from "react";

// const CardGameContext = createContext({
//   openAndGuessCellsForTesting: `${false}`,
//   toggleTheme: () => {},
// });

// export const TestGlobalThing = ({ children }: { children: React.ReactNode }) => {
//   const [openAndGuessCellsForTesting, setopenAndGuessCellsForTesting] = useState(() => {
//     return localStorage.getItem("openAndGuessCellsForTesting") || "";
//   });

//   useEffect(() => {
//     localStorage.setItem("openAndGuessCellsForTesting", `${openAndGuessCellsForTesting}`);
//   }, [openAndGuessCellsForTesting]);

//   const toggleOpenAndGuessCellsForTesting = () =>
//     setopenAndGuessCellsForTesting((prev) => (prev === `${false}` ? `${true}` : `${false}`));

//   return (
//     <CardGameContext.Provider
//       value={{(`${openAndGuessCellsForTesting}`, toggleOpenAndGuessCellsForTesting)}}
//     >
//       {children}
//     </CardGameContext.Provider>
//   );
// };

// export const CardGameToggle = () => useContext(CardGameContext);
