import SmartThingsDriver from "../../classes/SmartThings/SmartThingsDriver";

class LockDriver extends SmartThingsDriver {
  capability = "lock";
}

module.exports = LockDriver;
