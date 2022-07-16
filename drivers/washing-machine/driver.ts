import SmartThingsDriver from "../../classes/SmartThings/SmartThingsDriver";

class Driver extends SmartThingsDriver {
  capability = "washerOperatingState";
}

module.exports = Driver;
