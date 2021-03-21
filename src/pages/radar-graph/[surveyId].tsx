import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RadarGraph from "../../components/RadarGraph";

const characterData = [
  {
    Strength: 1,
    Intelligence: 250,
    Luck: 1,
    Stealth: 40,
    Charisma: 50,
    "Other Thing": 45,
    "Other Thing 2": 85,
    "Other Thing 3": 22,
    "Other Thing 4": 44,
    "Other Thing 5": 74,
  },
  {
    Strength: 2,
    Intelligence: 300,
    Luck: 2,
    Stealth: 80,
    Charisma: 90,
    "Other Thing": 84,
    "Other Thing 2": 95,
    "Other Thing 3": 82,
    "Other Thing 4": 14,
    "Other Thing 5": 24,
  },
  {
    Strength: 5,
    Intelligence: 225,
    Luck: 3,
    Stealth: 60,
    Charisma: 120,
    "Other Thing": 99,
    "Other Thing 2": 35,
    "Other Thing 3": 42,
    "Other Thing 4": 94,
    "Other Thing 5": 34,
  },
];

function RadarGraphPage() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  const inc = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const timer = setInterval(inc, 300);
    return () => clearInterval(timer);
  }, [count]);

  if (router.query.surveyId) {
    /* Radar graph component */
    return (
      <>
        <h1>Count: {count}</h1>
        <RadarGraph data={characterData} />
      </>
    );
  }
  // Not found
  return <></>;
}

export default RadarGraphPage;
