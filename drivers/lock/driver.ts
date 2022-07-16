import SmartThingsDriver from "../../classes/SmartThings/SmartThingsDriver";

class Driver extends SmartThingsDriver {
  capability = "lock";
}

module.exports = Driver;
