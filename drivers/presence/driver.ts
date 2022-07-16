import SmartThingsDriver from "../../classes/SmartThings/SmartThingsDriver";

class Driver extends SmartThingsDriver {
  capability = "presenceSensor";
}

module.exports = Driver;
