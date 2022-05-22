import React, { useState, useEffect } from "react";

function Drone() {
  const [drones, setDrones] = useState(1);
  const [unitCost, setUnitCost] = useState(10);
  const [meat, setMeat] = useState(0);
  const [productionRate, setproductionRate] = useState(1);
  const [productionCost, setproductionCost] = useState(10);

  function addDrones(e, amount) {
    e.preventDefault();
    setDrones(drones + amount);
    setMeat(meat - amount * unitCost);
  }

  function increaseProductionRate(e) {
    e.preventDefault();
    setDrones(drones - productionCost);
    setproductionCost(productionCost * 10);
    setproductionRate(productionRate * 2);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      var meatProduced = drones * productionRate;
      setMeat(meat + meatProduced);
    }, 1000);
    return () => clearInterval(interval);
  }, [drones, meat, productionRate]);

  var purchasableDrones = Math.floor(meat / unitCost);
  var purchasableDronesQuarter = Math.floor((meat / unitCost) * 0.25);
  return (
    <div className="Drone">
      <div className="info">
        <p>You have {drones} drones.</p>
        <p>They each produce {productionRate} meat per second.</p>
        <p>They produce {drones * productionRate} meat per second in total.</p>
        <p>You have {meat} meat.</p>
        <p>Each new drone costs {unitCost} meat.</p>
        <p>You can create {purchasableDrones} new drones.</p>
        <p>You can double production by sacrificing {productionCost} drones.</p>
      </div>
      <br />
      <div className="button-drawer">
        <div className="add-drones">
          <button onClick={(e) => addDrones(e, 1)} disabled={meat < unitCost}>
            Add 1 drone
          </button>

          <button
            onClick={(e) => addDrones(e, purchasableDronesQuarter)}
            disabled={meat < unitCost}
          >
            Add {purchasableDronesQuarter} drones
          </button>

          <button
            onClick={(e) => addDrones(e, purchasableDrones)}
            disabled={meat < unitCost}
          >
            Add {purchasableDrones} drones
          </button>
        </div>
        <br />
        <div className="production">
          <button
            onClick={increaseProductionRate}
            disabled={drones < productionCost}
          >
            Increase production rate by 2x
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drone;
