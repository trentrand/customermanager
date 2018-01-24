const functions = require('firebase-functions');

exports.createClientKey = functions.firestore
  .document('clients/{clientId}')
  .onCreate(event => {
    // Retrieve the current and previous value
    const data = event.data.data();
    const previousData = event.data.previous.data();

    // Update <last_name_key> only if the last name has changed
    if (data.last_name == previousData.last_name) return;

    // Update the <last_name_key> value
    return event.data.ref.set({
      last_name_key: data.last_name.toLowerCase()
    }, {merge: true});
});

exports.maintainClientKey = functions.firestore
  .document('clients/{clientID}')
  .onWrite(event => {
    // Retrieve the current and previous value
    const data = event.data.data();
    const previousData = event.data.previous.data();

    // Update <last_name_key> only if the last name has changed
    if (data.last_name == previousData.last_name) return;

    // Update the <last_name_key> value
    return event.data.ref.set({
      last_name_key: data.last_name.toLowerCase()
    }, {merge: true});
});
