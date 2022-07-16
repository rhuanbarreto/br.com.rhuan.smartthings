import SmartThingsDriver from "../../classes/SmartThings/SmartThingsDriver";

class Driver extends SmartThingsDriver {
  capability = "smokeDetector";
}

module.exports = Driver;
