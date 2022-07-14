// import { SmartApp } from "@smartthings/smartapp";

// const smartapp = new SmartApp()
//   .enableEventLogging(2) // logs all lifecycle event requests and responses as pretty-printed JSON. Omit in production
//   // Called for both INSTALLED and UPDATED lifecycle events if there is no separate installed() handler
//   .updated(async (context, updateData) => {
//     await context.api.subscriptions.delete() // clear any existing configuration
//     await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact', 'myDeviceEventHandler');
//   })
//   .subscribedEventHandler('myDeviceEventHandler', async (context, event) => {
//     const value = event.value === 'open' ? 'on' : 'off';
//     await context.api.devices.sendCommands(context.config.lights, 'switch', value);
//   });
